const Subject = require("../../models/subject");
const Level = require("../../models/level");

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate("levelId", "level")
      .select("name levelId")
      .sort("-createdAt");

    if (!subjects || subjects?.lenght < 1) {
      return res.status(404).json({
        message: "No subjects found",
        response: null,
        error: "No subjects found",
      });
    }

    const data = subjects.map((subject) => ({
      _id: subject._id,
      name: subject.name,
      level: subject.levelId.level,
    }));
    return res.status(200).json({
      message: "All subjects retrieved successfully",
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

const createSubject = async (req, res) => {
  const levelId = req.params.levelId;
  const { subjectName } = req.body;

  try {
    const level = await Level.findById(levelId);
    if (!level) {
      return res.status(404).json({
        message: "Level not found",
        response: null,
        error: "Level not found",
      });
    }

    const existingSubject = await Subject.findOne({
      name: subjectName,
      levelId,
    });
    if (existingSubject) {
      return res.status(400).json({
        message: "Subject already exists",
        response: null,
        error: "Subject already exists",
      });
    }

    const newSubject = new Subject({
      levelId,
      name: subjectName,
    });
    await newSubject.save();

    return res.status(201).json({
      message: "Subject created successfully",
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

const getSubject = async (req, res) => {
  const subjectId = req.params.subjectId;
  try {
    const subject = await Subject.findById(subjectId).populate(
      "levelId",
      "level"
    );
    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
        response: null,
        error: "Subject not found",
      });
    }

    const data = {
      _id: subject._id,
      name: subject.name,
      level: subject.levelId.level,
    };
    return res.status(200).json({
      message: "Subject retrieved successfully",
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

const updateSubject = async (req, res) => {
  const subjectId = req.params.subjectId;
  const { subjectName } = req.body;

  try {
    const existingSubject = await Subject.findById(subjectId);
    if (!existingSubject) {
      return res.status(404).json({
        message: "Subject not found",
        response: null,
        error: "Subject not found",
      });
    }
    existingSubject.name = subjectName || existingSubject.name;
    await existingSubject.save();

    return res.status(200).json({
      message: "Subject updated successfully",
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

const deleteSubject = async (req, res) => {
  const subjectId = req.params.subjectId;

  try {
    const existingSubject = await Subject.findById(subjectId);
    if (!existingSubject) {
      return res.status(404).json({
        message: "Subject not found",
        response: null,
        error: "Subject not found",
      });
    }

    await Subject.findByIdAndDelete(subjectId);
    return res.status(200).json({
      message: "Subject deleted successfully",
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
  getAllSubjects,
  createSubject,
  getSubject,
  updateSubject,
  deleteSubject,
};
