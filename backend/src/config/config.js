require("dotenv").config();

const mongoDbUrl = process.env.MONGODB_URL;
const jwtSecret = process.env.JWT_SECRET;
const backendBaseUrl = process.env.BACKEND_BASE_URL;
const frontendBaseUrl = process.env.FRONTEND_BASE_URL;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const gmailUser = process.env.GMAIL_USER;
const gmailPassword = process.env.GMAIL_PASSWORD;

const bucketName = process.env.AWS_BUCKET_NAME;
const awsAccessKey = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const awsRegion = process.env.AWS_REGION;

const configurations = {
  mongoDbUrl,
  jwtSecret,
  frontendBaseUrl,
  backendBaseUrl,
  stripeSecretKey,
  gmailUser,
  gmailPassword,
  awsRegion,
  bucketName,
  awsAccessKey,
  awsSecretAccessKey,
};

module.exports = {
  configurations,
};
