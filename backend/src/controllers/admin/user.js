const User = require("../../models/user");

const createUser = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "L'utilisateur existe déjà",
        response: null,
        error: "L'utilisateur existe déjà",
      });
    }

    await User.create({
      firstName,
      lastName,
      email,
      address,
      code,
    });

    return res.status(201).json({
      message: "Utilisateur créé avec succès",
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
          code: 1,
          level: "$levelInfo.level",
          ordersInfo: {
            paymentDate: 1,
            expiryDate: 1,
          },
          createdAt: 1,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    if (users.length === 0) {
      return res.status(404).json({
        message: "Aucun utilisateur trouvé",
        response: null,
        error: "Aucun utilisateur trouvé",
      });
    }

    const data = {
      data: users,
    };
    return res.status(200).json({
      message: "Tous les utilisateurs ont été récupérés avec succès",
      response: data,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      message: "Erreur interne du serveur",
      response: null,
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { firstName, lastName, address, code } = req.body;
  const userId = req.params.userId;

  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(400).json({
        message: "Aucun utilisateur trouvé",
        response: null,
        error: "Aucun utilisateur trouvé",
      });
    }

    existingUser.firstName = firstName || existingUser.firstName;
    existingUser.lastName = lastName || existingUser.lastName;
    existingUser.address = address || existingUser.address;
    existingUser.code = code || existingUser.code;
    await existingUser.save();

    return res.status(201).json({
      message: "Utilisateur mis jour avec succès",
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

const deleteUsers = async (req, res) => {
  const userId = req.params.userId;

  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({
        message: "Aucun utilisateur trouvé",
        response: null,
        error: "Aucun utilisateur trouvé",
      });
    }

    await User.findByIdAndDelete(userId);
    return res.status(200).json({
      message: "L'utilisateur a été supprimé avec succès",
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
  createUser,
  getUsers,
  updateUser,
  deleteUsers,
};
