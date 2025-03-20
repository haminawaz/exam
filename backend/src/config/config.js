require("dotenv").config();

const mongoDbUrl = process.env.MONGODB_URL;
const jwtSecret = process.env.JWT_SECRET;
const backendBaseUrl = process.env.BACKEND_BASE_URL;
const frontendBaseUrl = process.env.FRONTEND_BASE_URL;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const configurations = {
  mongoDbUrl,
  jwtSecret,
  frontendBaseUrl,
  backendBaseUrl,
  stripeSecretKey,
};

module.exports = {
  configurations,
};
