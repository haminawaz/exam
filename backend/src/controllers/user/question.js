const { default: mongoose } = require("mongoose");
const Test = require("../../models/test");
const Order = require("../../models/order");
const Question = require("../../models/question");
const TopicResult = require("../../models/topicResult");
const { configs } = require("../../config/email-config.js");
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

    const dynamicData = {
      studentName: test?.user?.name,
      totalMarks: totalQuestions,
      score: totalScore,
      percentage: Number(overallPercentage.toFixed(2)),
      remarks,
      subjects: subjectTopicAggregation.map((result) => ({
        topicName: result?.topicName,
        score: result.score,
        totalQuestions: result.totalQuestions,
        percentage: ((result.score / result.totalQuestions) * 100).toFixed(2),
      })),
      to_email: test?.user?.email,
    };
    await sendMail(configs.templates.accessSecResult, dynamicData);

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
