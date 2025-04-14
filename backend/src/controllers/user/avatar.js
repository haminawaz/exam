const Avatar = require("../../models/avatar");

const getAllAvatars = async (req, res) => {
  try {
    const avatars = await Avatar.find({});
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

module.exports = {
  getAllAvatars,
};
