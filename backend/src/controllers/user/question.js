const { default: mongoose } = require("mongoose");
const Test = require("../../models/test");
const Order = require("../../models/order");
const Question = require("../../models/question");
const TopicResult = require("../../models/topicResult");
const { sendMail } = require("../../utils/sendMail.js");

const getAllFreeQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ simulatorType: "free" });
    if (!questions || questions?.lenght < 1) {
      return res.status(404).json({
        message: "No questions found",
        response: null,
        error: "No questions found",
      });
    }

    const data = {
      data: questions,
    };
    return res.status(200).json({
      message: "Questions retrieved successfully",
      response: data,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      response: null,
      error: error.message,
    });
  }
};

const getAccessQuestions = async (req, res) => {
  const user = req.decoded;
  const userId = user._id;

  try {
    const order = await Order.findOne({ userId }).lean();
    if (!order || order?.expiryDate < new Date()) {
      return res.status(404).json({
        message:
          "You haven't purchased any subscription or your access has expired",
        response: null,
        error:
          "You haven't purchased any subscription or your access has expired",
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
        $project: {
          question: 1,
          options: 1,
          correct: 1,
          topicId: 1,
        },
      },
    ]);
    if (questions?.lenght < 1) {
      return res.status(404).json({
        message: "No questions found",
        response: null,
        error: "No questions found",
      });
    }

    const newTest = new Test({
      user: userId,
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
      message: "Questions retrieved successfully",
      response: data,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
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
        ? "Congragulations you have passed the exam"
        : "Better luck next time";

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
            .footer {
              font-size: 14px;
              color: #6b7280;
              text-align: center;
              border-top: 1px solid #e5e7eb;
              padding-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="section">
              <h2>Student Performance Report</h2>
              <div class="grid">
                <p><strong>Student Name:</strong> ${test?.user?.name}</p>
              </div>
            </div>
            <div class="section grid">
              <div class="card">
                <p>Total Score</p>
                <p>${totalScore} / ${totalQuestions}</p>
              </div>
              <div class="card">
                <p>Overall Percentage</p>
                <p>${overallPercentage.toFixed(2)}%</p>
              </div>
            </div>
            <div class="section">
              <h2>Subject-wise Performance</h2>
              ${subjectTopicAggregation.map(
                (subject) =>
                  `<div class="subject">
                  <h4>${subject.topicName}</h4>
                  <p> ${subject.score}/ ${subject.totalQuestions} (${subject.percentage}%)</p>
                  <div class="progress-bar">
                    <div style="width: ${subject.percentage}%; background: {{#if (gte percentage 90)}}#10b981{{else if (gte percentage 80)}}#3b82f6{{else if (gte percentage 70)}}#facc15{{else}}#ef4444{{/if}};"></div>
                  </div>
                </div>
                `
              )}
            </div>
            <div class="section">
              <h2>Remarks</h2>
              <p>${remarks}</p>
            </div>
            <footer class="footer">
              <p>For any queries, contact: academic@school.edu | Phone: (555) 123-4567</p>
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
      message: "Results created successfully",
      response: null,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      response: null,
      error: error.message,
    });
  }
};

module.exports = {
  getAllFreeQuestions,
  getAccessQuestions,
  createResults,
};
