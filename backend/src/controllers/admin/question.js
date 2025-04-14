const Topic = require("../../models/topic");
const Question = require("../../models/question");
const { uploadFileS3, deleteFileS3 } = require("../../utils/upload-file");

const parseStringToArray = (str) => (str ? str.split(",") : []);

const getAllQuestions = async (req, res) => {
  try {
    const paidQuestions = await Question.find({ simulatorType: "paid" })
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

    const freeQuestions = await Question.find({ simulatorType: "free" }).sort(
      "-createdAt"
    );

    if (
      !paidQuestions ||
      paidQuestions.length < 1 ||
      !freeQuestions ||
      freeQuestions.length < 1
    ) {
      return res.status(404).json({
        message: "Aucune question trouvée",
        response: null,
        error: "Aucune question trouvée",
      });
    }

    const formattedPaid = paidQuestions.map((question) => ({
      _id: question?._id,
      question: question?.question,
      options: question?.options,
      questionImage: question?.image,
      correctOptions: question?.correct,
      simulatorType: question?.simulatorType,
      topicId: question?.topicId?._id,
      topicName: question?.topicId?.topicName,
      subjectName: question?.topicId?.subjectId?.name,
      level: question?.topicId?.subjectId?.levelId?.level,
    }));

    const formattedFree = freeQuestions.map((question) => ({
      _id: question?._id,
      question: question?.question,
      options: question?.options,
      questionImage: question?.image,
      correctOptions: question?.correct,
      simulatorType: question?.simulatorType,
    }));

    const data = {
      paidQuestions: formattedPaid,
      freeQuestions: formattedFree,
    };

    return res.status(200).json({
      message: "Toutes les questions ont été récupérées avec succès",
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
        message: "Sujet introuvable",
        response: null,
        error: "Sujet introuvable",
      });
    }

    const data = topics.map((topic) => ({
      _id: topic?._id,
      topicName: topic?.topicName,
      subjectName: topic?.subjectId?.name,
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

const createQuestion = async (req, res) => {
  const { question, options, correctOption, simulatorType, topicId } = req.body;

  try {
    if (simulatorType === "paid") {
      const topic = await Topic.findById(topicId);
      if (!topic) {
        return res.status(404).json({
          message: "Sujet introuvable",
          response: null,
          error: "Sujet introuvable",
        });
      }

      const existingQuestion = await Question.findOne({
        question,
        topicId,
      });
      if (existingQuestion) {
        return res.status(400).json({
          message: "La question existe déjà",
          response: null,
          error: "La question existe déjà",
        });
      }
    }

    const optionsArray = parseStringToArray(options);
    const newQuestion = new Question({
      question,
      options: optionsArray,
      correct: correctOption,
      simulatorType,
      topicId: simulatorType === "paid" ? topicId : undefined,
    });
    if (req.file) {
      const uploadedImageUrl = await uploadFileS3(req.file, "question");
      newQuestion.image = uploadedImageUrl;
    }
    await newQuestion.save();

    return res.status(201).json({
      message: "Question créée avec succès",
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

const updateQuestion = async (req, res) => {
  const questionId = req.params.questionId;
  const { question, options, correctOption, simulatorType, topicId } = req.body;

  try {
    const existingQuestion = await Question.findById(questionId);
    if (!existingQuestion) {
      return res.status(404).json({
        message: "Question introuvable",
        response: null,
        error: "Question introuvable",
      });
    }

    if (simulatorType === "paid") {
      const topic = await Topic.findById(topicId);
      if (!topic) {
        return res.status(404).json({
          message: "Sujet introuvable",
          response: null,
          error: "Sujet introuvable",
        });
      }

      const duplicateQuestion = await Question.findOne({
        question,
        topicId,
        _id: { $ne: questionId },
      });
      if (duplicateQuestion) {
        return res.status(404).json({
          message: "Question en double non autorisée pour le même sujet",
          response: null,
          error: "Question en double non autorisée pour le même sujet",
        });
      }
    }

    const optionsArray = parseStringToArray(options);

    existingQuestion.question = question || existingQuestion.question;
    existingQuestion.options = optionsArray || existingTopic.options;
    existingQuestion.correct = correctOption || existingTopic.correct;
    existingQuestion.simulatorType =
      simulatorType || existingTopic.simulatorType;
    existingQuestion.topicId =
      simulatorType === "paid" ? topicId || existingTopic.topicId : undefined;
    if (req.file) {
      let oldFileUrl = null;
      if (
        existingQuestion?.image &&
        existingQuestion?.image.startsWith("https://")
      ) {
        oldFileUrl = existingQuestion.image;
      }
      const uploadedImageUrl = await uploadFileS3(
        req.file,
        "question",
        oldFileUrl
      );
      existingQuestion.image = uploadedImageUrl;
    }
    await existingQuestion.save();

    return res.status(200).json({
      message: "Question mise à jour avec succès",
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

const deleteQuestion = async (req, res) => {
  const questionId = req.params.questionId;

  try {
    const existingQuestion = await Question.findById(questionId);
    if (!existingQuestion) {
      return res.status(404).json({
        message: "Question introuvable",
        response: null,
        error: "Question introuvable",
      });
    }
    if (
      existingQuestion?.image &&
      existingQuestion?.image.startsWith("https://")
    ) {
      await deleteFileS3(existingQuestion.image);
    }

    await Question.findByIdAndDelete(questionId);
    return res.status(200).json({
      message: "Question supprimée successfully",
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
  getAllQuestions,
  getAllTopics,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
