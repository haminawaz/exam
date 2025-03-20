const Avatar = require("../../models/avatar");

const getAllAvatars = async (req, res) => {
  try {
    const avatars = await Avatar.find({});
    if (!avatars || avatars?.lenght < 1) {
      return res.status(404).json({
        message: "No avatars found",
        response: null,
        error: "No avatars found",
      });
    }

    const data = {
      data: avatars,
    };
    return res.status(200).json({
      message: "Avatars retrieved successfully",
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

module.exports = {
  getAllAvatars,
};
