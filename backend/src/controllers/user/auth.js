const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { configurations } = require("../../config/config");
const { sendMail } = require("../../utils/sendMail");

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

    const createUserTemplate = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Account Created Successfully</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
          }
          .container {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem;
          }
          .card {
            max-width: 600px;
            background-color: #fff;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          h1 {
            font-size: 2rem;
            color: #4b5563;
            text-align: center;
            margin-bottom: 1.5rem;
          }
          .check-icon {
            width: 4rem;
            height: 4rem;
            margin: 1rem auto;
            background-color: #d1fae5;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
          }
          .section-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #1f2937;
            text-align: center;
            margin-bottom: 1rem;
          }
          .section-text {
            color: #4b5563;
            text-align: center;
          }
          .code-box {
            background-color: #d1fae5;
            padding: 1rem;
            border-radius: 8px;
            font-size: 1.25rem;
            font-weight: bold;
            text-align: center;
            color: #1f2937;
            margin-top: 1rem;
          }
          .footer {
            text-align: center;
            margin-top: 2rem;
          }
          .footer p {
            color: #6b7280;
            font-size: 0.875rem;
          }
          .footer a {
            color: #6b7280;
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <h2 class="section-title">Account Created Successfully</h2>
            <p class="section-text">Dear ${name}, your account has been successfully created!</p>
            <div class="code-box">
              Your login code: <strong>${code}</strong>
            </div>
            <p class="section-text">Use this code to log in and start using your account.</p>
            <div class="footer">
              <p>Need help? Contact our support team</p>
              <p>support@logo.com | +1 (555) 123-4567</p>
              <p>sAll rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;

    const dynamicData = {
      subject: "Account Created Successfully",
      to_email: email,
    };
    await sendMail(createUserTemplate, dynamicData);

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
