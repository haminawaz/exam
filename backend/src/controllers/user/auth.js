const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { configurations } = require("../../config/config");
const { configs } = require("../../config/email-config.js");
const { sendMail } = require("../../utils/sendMail.js");

const registerUser = async (req, res) => {
  const { name, email, avatarId } = req.body;
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        response: null,
        error: "User already exists",
      });
    }

    await User.create({
      name,
      email,
      avatarId,
      code,
    });

    const dynamicData = {
      userName: name,
      loginCode: code,
      to_email: email,
    };
    await sendMail(configs.templates.accesSecUserCreation, dynamicData);

    return res.status(201).json({
      message: "User created successfully",
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

const loginUser = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        response: null,
        error: "User not found",
      });
    }
    if (user.code !== code) {
      return res.status(401).json({
        message: "Invalid credentials",
        response: null,
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign({ email }, configurations.jwtSecret, {
      expiresIn: "24h",
    });

    const data = {
      data: token,
    };
    return res.status(200).json({
      message: "You've successfully logged in",
      response: data,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      response: null,
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
