const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { configurations } = require("../config/config");
const jwtSecret = configurations.jwtSecret;

const verifyUserToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    token = token.replace("Bearer ", "");
    jwt.verify(token, jwtSecret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token or expired",
          response: null,
          error: err,
        });
      }
      const email = decoded?.email;
      const user = await User.findOne({ email }).select("email");
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          response: null,
          error: "User not found",
        });
      }
      req.decoded = user;
      next();
    });
  } else {
    return res.status(401).json({
      message: "Access denied",
      response: null,
      error: "Access denied, authentication token missing",
    });
  }
};

const decodedUserToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    token = token.replace("Bearer ", "");
    jwt.verify(token, jwtSecret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token or expired",
          response: null,
          error: err,
        });
      }
      const email = decoded?.email;
      const user = await User.findOne({ email }).select("email");
      if (!user) {
        return res.status(401).json({
          message: "Invalid token or expired",
          response: null,
          error: "Invalid token or expired",
        });
      }
      req.decoded = user;
      next();
    });
  } else {
    req.decoded = null;
    next();
  }
};

module.exports = {
  verifyUserToken,
  decodedUserToken,
};
