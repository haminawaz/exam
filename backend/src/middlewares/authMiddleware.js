const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Admin = require("../models/admin");
const { configurations } = require("../config/config");
const jwtSecret = configurations.jwtSecret;

const verifyUserToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    token = token.replace("Bearer ", "");
    jwt.verify(token, jwtSecret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Jeton invalide ou expiré",
          response: null,
          error: err,
        });
      }
      const email = decoded?.email;
      const user = await User.findOne({ email }).select("email");
      if (!user) {
        return res.status(404).json({
          message: "Utilisateur introuvable",
          response: null,
          error: "Utilisateur introuvable",
          
        });
      }
      req.decoded = user;
      next();
    });
  } else {
    return res.status(401).json({
      message: "Accès refusé",
      response: null,
      error: "Accès refusé,jeton d'authentification manquant",
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
          message: "Jeton invalide ou expiré",
          response: null,
          error: err,
        });
      }
      const email = decoded?.email;
      const user = await User.findOne({ email }).select("email");
      if (!user) {
        return res.status(401).json({
          message: "Jeton invalide ou expiré",
          response: null,
          error: "Jeton invalide ou expiré",
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

const verifyAdminToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token) {
    token = token.replace("Bearer ", "");
    jwt.verify(token, jwtSecret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Jeton invalide ou expiré",
          response: null,
          error: err,
        });
      }
      const email = decoded?.user?.email;
      const admin = await Admin.findOne({ email }).select("email");
      if (!admin) {
        return res.status(404).json({
          message: "Admin introuvable",
          response: null,
          error: "Admin introuvable",
          
        });
      }
      req.decoded = admin;
      next();
    });
  } else {
    return res.status(401).json({
      message: "Accès refusé",
      response: null,
      error: "Accès refusé,jeton d'authentification manquant",
    });
  }
};

module.exports = {
  verifyUserToken,
  decodedUserToken,
  verifyAdminToken,
};
