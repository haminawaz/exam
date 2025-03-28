const Topic = require("../../models/topic");
const Subject = require("../../models/subject");

const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find()
      .populate("subjectId", "subject")
      .select("topicName subjectId");
    if (!topics || topics?.lenght < 1) {
      return res.status(404).json({
        message: "No topics found",
        response: null,
        error: "No topics found",
      });
    }

    const data = topics.map((topic) => ({
      _id: topic._id,
      name: topic.topicName,
      subject: topic.subjectId.name,
    }));
    return res.status(200).json({
      message: "All topics retrieved successfully",
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
    const topic = await Topic.findById(topicId).populate("levelId", "level");
    if (!topic) {
      return res.status(404).json({
        message: "Topic not found",
        response: null,
        error: "Topic not found",
      });
    }

    const data = {
      _id: topic._id,
      name: topic.name,
      level: topic.levelId.level,
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
  const { topicName } = req.body;

  try {
    const existingTopic = await Topic.findById(topicId);
    if (!existingTopic) {
      return res.status(404).json({
        message: "Topic not found",
        response: null,
        error: "Topic not found",
      });
    }
    existingTopic.topicName = topicName || existingTopic.topicName;
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
