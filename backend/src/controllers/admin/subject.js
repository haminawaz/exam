const Subject = require("../../models/subject");
const Topic = require("../../models/topic");
const Question = require("../../models/question");
const Level = require("../../models/level");

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate("levelId", "level")
      .select("name levelId")
      .sort("-createdAt");

    if (!subjects || subjects?.lenght < 1) {
      return res.status(404).json({
        message: "Aucun sujet trouvé",
        response: null,
        error: "Aucun sujet trouvé",
      });
    }

    const data = subjects.map((subject) => ({
      _id: subject._id,
      name: subject.name,
      level: subject?.levelId?.level,
      levelId: subject?.levelId?._id,
    }));
    return res.status(200).json({
      message: "Tous les sujets ont été récupérés avec succès",
      response: { data },
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

const createSubject = async (req, res) => {
  const { subjectName, levelId } = req.body;

  try {
    const level = await Level.findById(levelId);
    if (!level) {
      return res.status(404).json({
        message: "Niveau introuvable",
        response: null,
        error: "Niveau introuvable",
      });
    }

    const existingSubject = await Subject.findOne({
      name: subjectName,
      levelId,
    });
    if (existingSubject) {
      return res.status(400).json({
        message: "L'objet existe déjà",
        response: null,
        error: "L'objet existe déjà",
      });
    }

    const newSubject = new Subject({
      levelId,
      name: subjectName,
    });
    await newSubject.save();

    return res.status(201).json({
      message: "Objet créé avec succès",
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

const updateSubject = async (req, res) => {
  const subjectId = req.params.subjectId;
  const { subjectName, levelId } = req.body;

  try {
    const existingSubject = await Subject.findById(subjectId);
    if (!existingSubject) {
      return res.status(404).json({
        message: "Objet introuvable",
        response: null,
        error: "Objet introuvable",
      });
    }

    const duplicateSubject = await Subject.findOne({
      name: subjectName,
      levelId,
      _id: { $ne: subjectId },
    });
    if (duplicateSubject) {
      return res.status(400).json({
        message: "Objet en double non autorisé pour le même niveau",
        response: null,
        error: "Objet en double non autorisé pour le même niveau",
      });
    }

    const level = await Level.findById(levelId);
    if (!level) {
      return res.status(404).json({
        message: "Niveau introuvable",
        response: null,
        error: "Niveau introuvable",
      });
    }

    existingSubject.levelId = levelId || existingSubject.levelId;
    existingSubject.name = subjectName || existingSubject.name;
    await existingSubject.save();

    return res.status(200).json({
      message: "Objet mis à jour avec succès",
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

const deleteSubject = async (req, res) => {
  const subjectId = req.params.subjectId;

  try {
    const existingSubject = await Subject.findById(subjectId);
    if (!existingSubject) {
      return res.status(404).json({
        message: "Objet introuvable",
        response: null,
        error: "Objet introuvable",
      });
    }

    const topics = await Topic.find({ subjectId });
    for (let topic of topics) {
      await Question.deleteMany({ topicId: topic._id });
      await Topic.findByIdAndDelete(topic._id);
    }

    await Subject.findByIdAndDelete(subjectId);
    return res.status(200).json({
      message: "Objet supprimé avec succès",
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
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
};
