const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Test = require("../../models/test");
const User = require("../../models/user.js");
const Order = require("../../models/order");
const Question = require("../../models/question");
const TopicResult = require("../../models/topicResult");
const Email = require("../../models/email");
const { configurations } = require("../../config/config");
const { sendMail } = require("../../utils/sendMail.js");

const getAllFreeQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ simulatorType: "free" });
    if (!questions || questions?.lenght < 1) {
      return res.status(404).json({
        message: "Aucune question trouvée",
        response: null,
        error: "Aucune question trouvée",
      });
    }

    const data = {
      data: questions,
    };
    return res.status(200).json({
      message: "Toutes les questions ont été récupérées avec succès",
      response: data,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur interne du serveur",
      response: null,
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
        response: null,
        error: "Utilisateur introuvable",
      });
    }
    if (user.code !== code) {
      return res.status(401).json({
        message: "Identifiants non valides",
        response: null,
        error: "Identifiants non valides",
      });
    }

    const order = await Order.findOne({ userId: user._id }).lean();
    if (!order || order?.expiryDate < new Date()) {
      return res.status(404).json({
        message: "Vous n'avez pas acheté d'abonnement ou votre accès a expiré",
        response: null,
        error: "Vous n'avez pas acheté d'abonnement ou votre accès a expiré",
      });
    }

    const token = jwt.sign({ email }, configurations.jwtSecret, {
      expiresIn: "24h",
    });

    const data = {
      data: token,
    };
    return res.status(200).json({
      message: "Vous vous êtes connecté avec succès",
      response: data,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur interne du serveur",
      response: null,
      error: error.message,
    });
  }
};

const getAccessQuestions = async (req, res) => {
  const user = req.decoded;
  const userId = user._id;
  const { name, avatarId } = req.body;

  try {
    const order = await Order.findOne({ userId }).lean();
    if (!order || order?.expiryDate < new Date()) {
      return res.status(404).json({
        message: "Vous n'avez pas acheté d'abonnement ou votre accès a expiré",
        response: null,
        error: "Vous n'avez pas acheté d'abonnement ou votre accès a expiré",
      });
    }

    const levelId = order?.levelId;
    const questions = await Question.aggregate([
      {
        $match: { simulatorType: "paid" },
      },
      {
        $lookup: {
          from: "topics",
          localField: "topicId",
          foreignField: "_id",
          as: "topicDetails",
        },
      },
      {
        $unwind: "$topicDetails",
      },
      {
        $lookup: {
          from: "subjects",
          localField: "topicDetails.subjectId",
          foreignField: "_id",
          as: "subjectsDetails",
        },
      },
      {
        $unwind: "$subjectsDetails",
      },
      {
        $match: {
          "subjectsDetails.levelId": levelId,
        },
      },
      {
        $lookup: {
          from: "levels",
          localField: "subjectsDetails.levelId",
          foreignField: "_id",
          as: "levelDetails",
        },
      },
      {
        $unwind: "$levelDetails",
      },
      {
        $project: {
          question: 1,
          options: 1,
          correct: 1,
          topicId: 1,
          topicName: "$topicDetails.topicName",
          subjectName: "$subjectsDetails.name",
          level: "$levelDetails.level",
        },
      },
      {
        $sort: {
          topicName: 1,
          subjectName: 1,
        },
      },
    ]);
    if (questions?.lenght < 1) {
      return res.status(404).json({
        message: "Aucune question trouvée",
        response: null,
        error: "Aucune question trouvée",
      });
    }

    const newTest = new Test({
      user: userId,
      name,
      avatarId,
      levelId: order?.levelId,
      totalQuestions: questions?.length,
    });
    await newTest.save();

    const data = {
      data: {
        questions,
        testId: newTest?._id,
      },
    };
    return res.status(200).json({
      message: "Toutes les questions ont été récupérées avec succès",
      response: data,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur interne du serveur",
      response: null,
      error: error.message,
    });
  }
};

const createResults = async (req, res) => {
  const { testId, responses } = req.body;

  try {
    const questionIds = responses?.map(
      (res) => new mongoose.Types.ObjectId(res.question)
    );
    const mongoTestId = new mongoose.Types.ObjectId(testId);

    const subjectTopicAggregation = await Question.aggregate([
      { $match: { _id: { $in: questionIds } } },
      {
        $lookup: {
          from: "topics",
          localField: "topicId",
          foreignField: "_id",
          as: "topicData",
        },
      },
      { $unwind: "$topicData" },
      {
        $set: {
          responseArray: Object.entries(
            responses.reduce((acc, res) => {
              acc[res.question.toString()] = res.selectedAnswer;
              return acc;
            }, {})
          ).map(([questionId, answer]) => ({
            questionId: new mongoose.Types.ObjectId(questionId),
            selectedAnswer: answer,
          })),
        },
      },
      {
        $set: {
          responseMatch: {
            $arrayElemAt: [
              {
                $filter: {
                  input: responses.map((res) => ({
                    questionId: new mongoose.Types.ObjectId(res.question),
                    selectedAnswer: res.selectedAnswer,
                  })),
                  as: "resp",
                  cond: { $eq: ["$$resp.questionId", "$_id"] },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $addFields: {
          selectedAnswer: "$responseMatch.selectedAnswer",
          isCorrect: { $eq: ["$responseMatch.selectedAnswer", "$correct"] },
        },
      },
      {
        $group: {
          _id: "$topicData._id",
          topicId: { $first: "$topicData._id" },
          topicName: { $first: "$topicData.topicName" },
          testId: { $first: mongoTestId },
          totalQuestions: { $sum: 1 },
          score: { $sum: { $cond: [{ $eq: ["$isCorrect", true] }, 1, 0] } },
          questions: {
            $push: {
              questionId: "$_id",
              selectedAnswer: "$selectedAnswer",
              isCorrect: "$isCorrect",
            },
          },
        },
      },
      {
        $addFields: {
          percentage: {
            $cond: {
              if: { $eq: ["$totalQuestions", 0] },
              then: 0,
              else: {
                $multiply: [{ $divide: ["$score", "$totalQuestions"] }, 100],
              },
            },
          },
        },
      },
    ]);

    const resultsWithNewIds = subjectTopicAggregation?.map((result) => {
      const newResult = { ...result };
      delete newResult.topicName;
      return {
        ...newResult,
        _id: new mongoose.Types.ObjectId(),
      };
    });

    await TopicResult.insertMany(resultsWithNewIds);

    let totalScore = 0;
    let totalQuestions = 0;

    subjectTopicAggregation.forEach((topic) => {
      totalScore += topic.score;
      totalQuestions += topic.totalQuestions;
    });

    const overallPercentage = totalQuestions
      ? (totalScore / totalQuestions) * 100
      : 0;

    await Test.findByIdAndUpdate(testId, {
      score: totalScore,
      percentage: Number(overallPercentage.toFixed(2)),
    });

    const test = await Test.findById(testId).populate("user");
    const remarks =
      overallPercentage >= 70
        ? "Bravo, tu as réussi. Bonne chance pour l’examen d’admission au secondaire."
        : "Tu peux améliorer ton score. Essaie encore.";

    const emailTemplate = await Email.findOne({ name: "result" });
    const emailHeader = emailTemplate.header || null;
    const emailFooter = emailTemplate.footer || null;
    const emailHeaderWithBreaks = emailHeader.replace(/\n/g, "<br />");
    const emailFooterWithBreaks = emailFooter.replace(/\n/g, "<br />");

    const testResultTemplate = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Student Performance Report</title>
          <style>
            body {
              background-color: #f9fafb;
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 800px;
              margin: 40px auto;
              padding: 20px;
              background: #fff;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .header h1 {
              font-size: 32px;
              color: #4F46E5;
              font-family: 'Pacifico', cursive;
            }
            .header p {
              color: #6b7280;
            }
            .section {
              margin-bottom: 20px;
            }
            .section h2 {
              font-size: 24px;
              font-weight: bold;
            }
            .grid {
              display: flex;
              justify-content: space-between;
            }
            .card {
              background: #f3f4f6;
              padding: 15px;
              border-radius: 8px;
              text-align: center;
              flex: 1;
              margin: 5px;
            }
            .card p {
              margin: 5px 0;
              font-size: 20px;
              font-weight: bold;
              color: #4F46E5;
            }
            .subject {
              background: #fff;
              padding: 10px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              margin-bottom: 10px;
            }
            .subject h4 {
              margin: 0;
              font-size: 18px;
            }
            .progress-bar {
              width: 100%;
              height: 8px;
              background: #e5e7eb;
              border-radius: 4px;
              margin-top: 5px;
              position: relative;
            }
            .progress-bar div {
              height: 100%;
              border-radius: 4px;
            }
            .header-footer {
              font-size: 17px;
              color: #6b7280;
              text-align: start;
              border-top: 1px solid #e5e7eb;
              padding-top: 10px;
              margin: 3% 0px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="section">
              <h2>Rapport de performance de l'élève</h2>
              <header class="header-footer">
                <p>${emailHeaderWithBreaks}</p>
              </header>
              <div class="grid">
                <p><strong>Nom de l'élève :</strong> ${
                  test?.name
                    ? test.name.charAt(0).toUpperCase() + test.name.slice(1)
                    : ""
                }</p>
              </div>
            </div>
            <div class="section grid">
              <div class="card">
                <p>Note totale</p>
                <p>${totalScore} / ${totalQuestions}</p>
              </div>
              <div class="card">
                <p>Pourcentage global</p>
                <p>${overallPercentage.toFixed(2)}%</p>
              </div>
            </div>
            <div class="section">
              <h2>Performance par matière:</h2>
              ${subjectTopicAggregation
                .map((subject) => {
                  const roundedPercentage = parseFloat(
                    subject.percentage.toFixed(1)
                  );
                  let color;
                  if (roundedPercentage >= 90) {
                    color = "#10b981";
                  } else if (roundedPercentage >= 80) {
                    color = "#3b82f6";
                  } else if (roundedPercentage >= 70) {
                    color = "#facc15";
                  } else {
                    color = "#ef4444";
                  }
                  return `
                  <div class="subject">
                    <h4>${subject.topicName}</h4>
                    <p>${subject.score}/${subject.totalQuestions} (${roundedPercentage}%)</p>
                    <div class="progress-bar">
                      <div style="width: ${roundedPercentage}%; background: ${color};"></div>
                    </div>
                  </div>
                `;
                })
                .join("")}
            <div class="section">
              <h2>Remarques:</h2>
              <p>${remarks}</p>
            </div>
            <footer class="header-footer">
              <p>${emailFooterWithBreaks}</p>
            </footer>
          </div>
        </body>
      </html>
    `;
    const dynamicData = {
      subject: "Test Results",
      to_email: test?.user?.email,
    };
    await sendMail(testResultTemplate, dynamicData);

    return res.status(201).json({
      message: "Résultats créés avec succès",
      response: null,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur interne du serveur",
      response: null,
      error: error.message,
    });
  }
};

module.exports = {
  getAllFreeQuestions,
  loginUser,
  getAccessQuestions,
  createResults,
};
