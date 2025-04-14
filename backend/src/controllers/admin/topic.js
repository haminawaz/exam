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
        message: "Aucun sujet trouvé",
        response: null,
        error: "Aucun sujet trouvé",
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

const createTopic = async (req, res) => {
  const { topicName, subjectId } = req.body;

  try {
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({
        message: "Objet introuvable",
        response: null,
        error: "Objet introuvable",
      });
    }

    const existingTopic = await Topic.findOne({
      subjectId,
      topicName,
    });
    if (existingTopic) {
      return res.status(400).json({
        message: "Le sujet existe déjà",
        response: null,
        error: "Le sujet existe déjà",
      });
    }

    const newTopic = new Topic({
      subjectId,
      topicName,
    });
    await newTopic.save();

    return res.status(201).json({
      message: "Sujet créé avec succès",
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

const updateTopic = async (req, res) => {
  const topicId = req.params.topicId;
  const { topicName, subjectId } = req.body;

  try {
    const existingTopic = await Topic.findById(topicId);
    if (!existingTopic) {
      return res.status(404).json({
        message: "Sujet introuvable",
        response: null,
        error: "Sujet introuvable",
      });
    }
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({
        message: "Objet introuvable",
        response: null,
        error: "Objet introuvable",
      });
    }
    const duplicateTopic = await Topic.findOne({
      topicName,
      subjectId,
      _id: { $ne: topicId },
    });
    if (duplicateTopic) {
      return res.status(404).json({
        message: "Sujet en double non autorisé pour le même sujet",
        response: null,
        error: "Sujet en double non autorisé pour le même sujet",
      });
    }

    existingTopic.topicName = topicName || existingTopic.topicName;
    existingTopic.subjectId = subjectId || existingTopic.subjectId;
    await existingTopic.save();

    return res.status(200).json({
      message: "Sujet mis à jour avec succès",
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

const deleteTopic = async (req, res) => {
  const topicId = req.params.topicId;
  try {
    const existingTopic = await Topic.findById(topicId);
    if (!existingTopic) {
      return res.status(404).json({
        message: "Sujet introuvable",
        response: null,
        error: "Sujet introuvable",
      });
    }

    await Question.deleteMany({ topicId });
    await Topic.findByIdAndDelete(topicId);
    return res.status(200).json({
      message: "Sujet supprimé avec succès",
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
  getAllTopics,
  createTopic,
  updateTopic,
  deleteTopic,
};
