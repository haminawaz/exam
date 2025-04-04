const Topic = require("../../models/topic");
const Question = require("../../models/question");

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate({
        path: "topicId",
        select: "topicName subjectId",
        populate: {
          path: "subjectId",
          select: "name levelId",
          populate: { path: "levelId", select: "level" },
        },
      })
      .sort("-createdAt");
    if (!questions || questions?.lenght < 1) {
      return res.status(404).json({
        message: "No questions found",
        response: null,
        error: "No questions found",
      });
    }

    const data = questions.map((question) => ({
      _id: question?._id,
      question: question?.question,
      options: question?.options,
      correctOptions: question?.correct,
      simulatorType: question?.simulatorType,
      topicId: question?.topicId?._id,
      topicName: question?.topicId?.topicName,
      subjectName: question?.topicId?.subjectId?.name,
      level: question?.topicId?.subjectId?.levelId?.level,
    }));
    return res.status(200).json({
      message: "All questions retrieved successfully",
      response: { data },
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

const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find()
      .populate({
        path: "subjectId",
        select: "name levelId",
        populate: { path: "levelId", select: "level" },
      })
      .sort("-createdAt");
    if (!topics || topics?.lenght < 1) {
      return res.status(404).json({
        message: "No topics found",
        response: null,
        error: "No topics found",
      });
    }

    const data = topics.map((topic) => ({
      _id: topic?._id,
      topicName: topic?.topicName,
      subjectName: topic?.subjectId?.name,
      level: topic?.subjectId?.levelId?.level,
    }));
    return res.status(200).json({
      message: "All topics retrieved successfully",
      response: { data },
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

const createQuestion = async (req, res) => {
  const { question, options, correctOption, simulatorType, topicId } = req.body;

  try {
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({
        message: "Topic not found",
        response: null,
        error: "Topic not found",
      });
    }

    const existingQuestion = await Question.findOne({
      question,
      topicId,
    });
    if (existingQuestion) {
      return res.status(400).json({
        message: "Question already exists",
        response: null,
        error: "Question already exists",
      });
    }

    const newQuestion = new Question({
      question,
      options,
      correct: correctOption,
      simulatorType,
      topicId,
    });
    await newQuestion.save();

    return res.status(201).json({
      message: "Question created successfully",
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

const updateQuestion = async (req, res) => {
  const questionId = req.params.questionId;
  const { question, options, correctOption, simulatorType, topicId } = req.body;

  try {
    const existingQuestion = await Question.findById(questionId);
    if (!existingQuestion) {
      return res.status(404).json({
        message: "Question not found",
        response: null,
        error: "Question not found",
      });
    }

    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({
        message: "Topic not found",
        response: null,
        error: "Topic not found",
      });
    }

    const duplicateQuestion = await Question.findOne({
      question,
      topicId,
      _id: { $ne: questionId },
    });
    if (duplicateQuestion) {
      return res.status(404).json({
        message: "Duplicate question not allowed for same topic",
        response: null,
        error: "Duplicate question not allowed for same topic",
      });
    }

    existingQuestion.question = question || existingQuestion.question;
    existingQuestion.options = options || existingTopic.options;
    existingQuestion.correct = correctOption || existingTopic.correct;
    existingQuestion.simulatorType =
      simulatorType || existingTopic.simulatorType;
    existingQuestion.topicId = topicId || existingTopic.topicId;
    await existingQuestion.save();

    return res.status(200).json({
      message: "Question updated successfully",
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

const deleteQuestion = async (req, res) => {
  const questionId = req.params.questionId;

  try {
    const existingQuestion = await Question.findById(questionId);
    if (!existingQuestion) {
      return res.status(404).json({
        message: "Question not found",
        response: null,
        error: "Question not found",
      });
    }

    await Question.findByIdAndDelete(questionId);
    return res.status(200).json({
      message: "Question deleted successfully",
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
  getAllQuestions,
  getAllTopics,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
