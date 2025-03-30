const path = require("path");
const Avatar = require("../../models/avatar");
const { imageUpload, imageDelete } = require("../../utils/uploadFile");

const getAllAvatars = async (req, res) => {
  try {
    const avatars = await Avatar.find().select("avatarUrl");
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
      message: "All avatars retrieved successfully",
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

const createAvatar = async (req, res) => {
  try {
    const newAvatar = new Avatar({
      avatarUrl: "",
    });
    const uploadFolder = "choose-avatar";
    await imageUpload(newAvatar._id, req.file, uploadFolder);

    newAvatar.avatarUrl = `/images/${uploadFolder}/level_${
      newAvatar._id
    }${path.extname(req.file.originalname)}`;
    await newAvatar.save();

    return res.status(201).json({
      message: "Avatar created successfully",
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

// const updateAvatar = async (req, res) => {
//   const { levelName, price, difficulty } = req.body;
//   const levelId = req.params.levelId;

//   try {
//     const existingLevel = await Avatar.findById(levelId);
//     if (!existingLevel) {
//       return res.status(404).json({
//         message: "Level not found",
//         response: null,
//         error: "Level not found",
//       });
//     }

//     existingLevel.level = levelName || existingLevel.level;
//     existingLevel.price = price || existingLevel.price;
//     existingLevel.difficulty = difficulty || existingLevel.difficulty;

//     if (req.file) {
//       if (existingLevel?.image) {
//         await imageDelete(existingLevel?.image);
//       }
//       const uploadFolder = "payment";
//       await imageUpload(existingLevel._id, req.file, uploadFolder);
//       existingLevel.image = `/images/${uploadFolder}/level_${
//         existingLevel._id
//       }${path.extname(req.file.originalname)}`;
//     }

//     await existingLevel.save();

//     return res.status(200).json({
//       message: "Level updated successfully",
//       response: null,
//       error: null,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Internal Server Error",
//       response: null,
//       error: error.message,
//     });
//   }
// };

const deleteAvatar = async (req, res) => {
  const avatarId = req.params.avatarId;

  try {
    const existingAvatar = await Avatar.findById(avatarId);
    if (!existingAvatar) {
      return res.status(404).json({
        message: "Avatar not found",
        response: null,
        error: "Avatar not found",
      });
    }
    await imageDelete(existingAvatar?.avatarUrl);

    await Avatar.findByIdAndDelete(avatarId);
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
  getAllAvatars,
  createAvatar,
  // updateLevel,
  deleteAvatar,
};
