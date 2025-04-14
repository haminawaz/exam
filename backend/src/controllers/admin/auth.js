const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/admin.js");
const { configurations } = require("../../config/config.js");

const jwtSecret = configurations.jwtSecret;
const salt = configurations.salt;

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        message: "E-mail ou mot de passe non valide",
        response: null,
        error: "E-mail ou mot de passe non valide",
      });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "E-mail ou mot de passe non valide",
        response: null,
        error: "E-mail ou mot de passe non valide",
      });
    }

    const token = jwt.sign({ user: { id: admin._id, email } }, jwtSecret, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      message: "Vous vous êtes connecté avec succès",
      response: {
        token,
        data: {
          email,
          firstName: admin.firstName,
          lastName: admin.lastName,
        },
      },
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

const updateProfile = async (req, res) => {
  try {
    const admin = req.decoded;
    const { firstName, lastName } = req.body;

    await Admin.findByIdAndUpdate(admin._id, { firstName, lastName });

    const data = {
      firstName,
      lastName,
      email: user.email,
    };

    return res.status(200).json({
      message: "Le profil a été mis à jour avec succès",
      response: data,
      error: null,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur interne du serveur",
      response: null,
      error: err.message,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const admin = req.decoded;
    const { currentPassword, newPassword } = req.body;

    await Admin.findById(admin._id).select("password");

    const passwordMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Le mot de passe actuel ne correspond pas",
        response: null,
        error: "Le mot de passe actuel ne correspond pas",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await Admin.findByIdAndUpdate(admin._id, { password: hashedPassword });

    return res.status(200).json({
      message: "Le mot de passe a été créé avec succès",
      response: null,
      error: null,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur interne du serveur",
      response: null,
      error: err.message,
    });
  }
};

module.exports = {
  loginAdmin,
  updateProfile,
  updatePassword,
};
