const Subject = require("../../models/subject");
const Order = require("../../models/order");

const getAllLevels = async (req, res) => {
  const user = req.decoded;
  try {
    let levels;
    levels = await Subject.aggregate([
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
          image: { $first: "$levelData.image" },
          difficulty: { $first: "$levelData.difficulty" },
          courses: { $push: { subject: "$name" } },
        },
      },
      {
        $sort: {
          level: 1,
        },
      },
    ]);

    if (user) {
      const userOrders = await Order.find({ userId: user._id });

      levels = levels.map((level) => ({
        ...level,
        buy: userOrders.some((order) => order.levelId >= level._id),
      }));
    }

    if (!levels || levels?.lenght < 1) {
      return res.status(404).json({
        message: "Aucun niveau n'a été détecté",
        response: null,
        error: "Aucun niveau n'a été détecté",
      });
    }

    const data = {
      data: levels,
    };
    return res.status(200).json({
      message: "Tous les niveaux et sujets ont été récupérés avec succès",
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
  getAllLevels,
};
