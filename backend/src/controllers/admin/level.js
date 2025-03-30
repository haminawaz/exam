const path = require("path");
const Level = require("../../models/level");
const { imageUpload, imageDelete } = require("../../utils/uploadFile");

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
      const uploadFolder = "payment";
      await imageUpload(newLevel._id, req.file, uploadFolder);

      newLevel.image = `/images/${uploadFolder}/level_${
        newLevel._id
      }${path.extname(req.file.originalname)}`;
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

const getLevel = async (req, res) => {
  const levelId = req.params.levelId;
  try {
    const level = await Level.findById(levelId).select(
      "-createdAt -updatedAt -__v"
    );
    if (!level) {
      return res.status(404).json({
        message: "Level not found",
        response: null,
        error: "Level not found",
      });
    }

    const data = {
      data: level,
    };

    return res.status(200).json({
      message: "Level retrieved successfully",
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
      if (existingLevel?.image) {
        await imageDelete(existingLevel?.image);
      }
      const uploadFolder = "payment";
      await imageUpload(existingLevel._id, req.file, uploadFolder);
      existingLevel.image = `/images/${uploadFolder}/level_${
        existingLevel._id
      }${path.extname(req.file.originalname)}`;
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

    if (existingLevel?.image) {
      await imageDelete(existingLevel?.image);
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
  getLevel,
  updateLevel,
  deleteLevel,
};
