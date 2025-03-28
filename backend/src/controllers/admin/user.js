const User = require("../../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "userId",
          as: "ordersInfo",
        },
      },
      {
        $lookup: {
          from: "levels",
          localField: "ordersInfo.levelId",
          foreignField: "_id",
          as: "levelInfo",
        },
      },
      {
        $unwind: {
          path: "$levelInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          address: 1,
          level: "$levelInfo.level",
          ordersInfo: {
            paymentDate: 1,
            expiryDate: 1,
            paymentStatus: 1,
          },
        },
      },
    ]);

    if (users.length === 0) {
      return res.status(404).json({
        message: "No users found",
        response: null,
        error: "No users found",
      });
    }

    const data = {
      data: users,
    };
    return res.status(200).json({
      message: "Successfully fetched users",
      response: data,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      message: "Internal server error",
      response: null,
      error: error.message,
    });
  }
};

module.exports = {
  getUsers,
};
