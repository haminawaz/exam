const Level = require("../../models/level");
const Subject = require("../../models/subject");
const Topic = require("../../models/topic");
const Question = require("../../models/question");
const { uploadFileS3, deleteFileS3 } = require("../../utils/upload-file.js");

const getAllLevels = async (req, res) => {
  try {
    const levels = await Level.find()
      .select("-createdAt -updatedAt -__v")
      .sort("-createdAt");
    if (!levels || levels?.lenght < 1) {
      return res.status(404).json({
        message: "No levels found",
        response: null,
        error: "No levels found",
      });
    }

    const data = {
      data: levels,
    };
    return res.status(200).json({
      message: "All levels retrieved successfully",
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

const createLevel = async (req, res) => {
  const { levelName, price, difficulty } = req.body;

  try {
    const existingLevel = await Level.findOne({ level: levelName });
    if (existingLevel) {
      return res.status(400).json({
        message: "Level already exists",
        response: null,
        error: "Level already exists",
      });
    }

    const newLevel = new Level({
      level: levelName,
      price,
      difficulty,
    });
    if (req.file) {
      const uploadedImageUrl = await uploadFileS3(req.file, "level");
      newLevel.image = uploadedImageUrl;
    }
    await newLevel.save();

    return res.status(201).json({
      message: "Level created successfully",
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

const updateLevel = async (req, res) => {
  const { levelName, price, difficulty } = req.body;
  const levelId = req.params.levelId;

  try {
    const existingLevel = await Level.findById(levelId);
    if (!existingLevel) {
      return res.status(404).json({
        message: "Level not found",
        response: null,
        error: "Level not found",
      });
    }

    existingLevel.level = levelName || existingLevel.level;
    existingLevel.price = price || existingLevel.price;
    existingLevel.difficulty = difficulty || existingLevel.difficulty;

    if (req.file) {
      let oldFileUrl = null;
      if (existingLevel?.image && existingLevel?.image.startsWith("https://")) {
        oldFileUrl = existingLevel.image;
      }
      const uploadedImageUrl = await uploadFileS3(
        req.file,
        "level",
        oldFileUrl
      );
      existingLevel.image = uploadedImageUrl;
    }

    await existingLevel.save();

    return res.status(200).json({
      message: "Level updated successfully",
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

const deleteLevel = async (req, res) => {
  const levelId = req.params.levelId;

  try {
    const existingLevel = await Level.findById(levelId);
    if (!existingLevel) {
      return res.status(404).json({
        message: "Level not found",
        response: null,
        error: "Level not found",
      });
    }

    const subjects = await Subject.find({ levelId: levelId });
    for (let subject of subjects) {
      const topics = await Topic.find({ subjectId: subject._id });
      for (let topic of topics) {
        await Question.deleteMany({ topicId: topic._id });
        await Topic.findByIdAndDelete(topic._id);
      }
      await Subject.findByIdAndDelete(subject._id);
    }

    if (existingLevel?.image && existingLevel?.image.startsWith("https://")) {
      await deleteFileS3(existingLevel.image);
    }

    await Level.findByIdAndDelete(levelId);
    return res.status(200).json({
      message: "Level deleted successfully",
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
  getAllLevels,
  createLevel,
  updateLevel,
  deleteLevel,
};
