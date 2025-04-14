const Avatar = require("../../models/avatar");
const { uploadFileS3, deleteFileS3 } = require("../../utils/upload-file.js");

const getAllAvatars = async (req, res) => {
  try {
    const avatars = await Avatar.find().select("avatarUrl");
    if (!avatars || avatars?.lenght < 1) {
      return res.status(404).json({
        message: "Aucun avatar n'a été trouvé",
        response: null,
        error: "Aucun avatar n'a été trouvé",
      });
    }

    const data = {
      data: avatars,
    };
    return res.status(200).json({
      message: "Les avatars ont été récupérés avec succès",
      response: data,
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

const createAvatar = async (req, res) => {
  try {
    const newAvatar = new Avatar({
      avatarUrl: "",
    });
    const uploadedImageUrl = await uploadFileS3(req.file, "avatar");
    newAvatar.avatarUrl = uploadedImageUrl;
    await newAvatar.save();

    return res.status(201).json({
      message: "Avatar créé avec succès",
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

const deleteAvatar = async (req, res) => {
  const avatarId = req.params.avatarId;

  try {
    const existingAvatar = await Avatar.findById(avatarId);
    if (!existingAvatar) {
      return res.status(404).json({
        message: "Aucun avatar n'a été trouvé",
        response: null,
        error: "Aucun avatar n'a été trouvé",
      });
    }
    if (
      existingAvatar?.avatarUrl &&
      existingAvatar?.avatarUrl.startsWith("https://")
    ) {
      await deleteFileS3(existingAvatar.avatarUrl);
    }

    await Avatar.findByIdAndDelete(avatarId);
    return res.status(200).json({
      message: "L'avatar a été supprimé avec succès",
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
  getAllAvatars,
  createAvatar,
  deleteAvatar,
};
