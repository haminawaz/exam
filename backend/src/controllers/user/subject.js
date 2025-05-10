const Subject = require("../../models/subject");

const getAllSubjects = async (req, res) => {
  try {
    const levels = await Subject.aggregate([
      {
        $lookup: {
          from: "levels",
          localField: "levelId",
          foreignField: "_id",
          as: "levelData",
        },
      },
      { $unwind: "$levelData" },
      {
        $group: {
          _id: "$levelData._id",
          price: { $first: "$levelData.price" },
          level: { $first: "$levelData.level" },
          courses: { $push: { subject: "$name", image: "$image" } },
        },
      },
      { $project: { _id: 0 } },
      {
        $sort: {
          level: 1,
        },
      },
    ]);

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
      message: "All levels and subjects retrieved successfully",
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
  getAllSubjects,
};
