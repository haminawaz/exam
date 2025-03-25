require("dotenv").config();

const mongoDbUrl = process.env.MONGODB_URL;
const jwtSecret = process.env.JWT_SECRET;
const backendBaseUrl = process.env.BACKEND_BASE_URL;
const frontendBaseUrl = process.env.FRONTEND_BASE_URL;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const gmailUser = process.env.GMAIL_USER;
const gmailPassword = process.env.GMAIL_PASSWORD;

const configurations = {
  mongoDbUrl,
  jwtSecret,
  frontendBaseUrl,
  backendBaseUrl,
  stripeSecretKey,
  gmailUser,
  gmailPassword,
};

module.exports = {
  configurations,
};
