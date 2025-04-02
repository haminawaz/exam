const Topic = require("../../models/topic");
const Question = require("../../models/question");
const Subject = require("../../models/subject");

const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find()
      .populate({
        path: "subjectId",
        select: "name levelId",
        populate: { path: "levelId", select: "level" },
      })
      .select("topicName subjectId")
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
      name: topic?.topicName,
      subject: topic?.subjectId?.name,
      subjectId: topic?.subjectId?._id,
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

const createTopic = async (req, res) => {
  const subjectId = req.params.subjectId;
  const { topicName } = req.body;

  try {
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
        response: null,
        error: "Subject not found",
      });
    }

    const existingTopic = await Topic.findOne({
      subjectId,
      topicName,
    });
    if (existingTopic) {
      return res.status(400).json({
        message: "Topic already exists",
        response: null,
        error: "Topic already exists",
      });
    }

    const newTopic = new Topic({
      subjectId,
      topicName,
    });
    await newTopic.save();

    return res.status(201).json({
      message: "Topic created successfully",
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

const getTopic = async (req, res) => {
  const topicId = req.params.topicId;
  try {
    const topic = await Topic.findById(topicId).populate("subjectId", "name");
    if (!topic) {
      return res.status(404).json({
        message: "Topic not found",
        response: null,
        error: "Topic not found",
      });
    }

    const data = {
      _id: topic._id,
      name: topic.topicName,
      subject: topic.subjectId.name,
    };
    return res.status(200).json({
      message: "Topic retrieved successfully",
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

const updateTopic = async (req, res) => {
  const topicId = req.params.topicId;
  const { topicName, subjectId } = req.body;

  try {
    const existingTopic = await Topic.findById(topicId);
    if (!existingTopic) {
      return res.status(404).json({
        message: "Topic not found",
        response: null,
        error: "Topic not found",
      });
    }
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
        response: null,
        error: "Subject not found",
      });
    }
    const duplicateTopic = await Topic.findOne({
      topicName,
      subjectId,
      _id: { $ne: topicId },
    });
    if (duplicateTopic) {
      return res.status(404).json({
        message: "Duplicate topic not allowed for same subject",
        response: null,
        error: "Duplicate topic not allowed for same subject",
      });
    }

    existingTopic.topicName = topicName || existingTopic.topicName;
    existingTopic.subjectId = subjectId || existingTopic.subjectId;
    await existingTopic.save();

    return res.status(200).json({
      message: "Topic updated successfully",
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

const deleteTopic = async (req, res) => {
  const topicId = req.params.topicId;
  try {
    const existingTopic = await Topic.findById(topicId);
    if (!existingTopic) {
      return res.status(404).json({
        message: "Topic not found",
        response: null,
        error: "Topic not found",
      });
    }

    await Question.deleteMany({ topicId });
    await Topic.findByIdAndDelete(topicId);
    return res.status(200).json({
      message: "Topic deleted successfully",
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
  getAllTopics,
  createTopic,
  getTopic,
  updateTopic,
  deleteTopic,
};
