const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const userRoutes = require("./user");
const levelRoutes = require("./level");
const tokenRoutes = require("./token");
const topicRoutes = require("./topic");
const emailRoutes = require("./email");
const avatarRoutes = require("./avatar");
const subjectRoutes = require("./subject");
const questionRoutes = require("./question");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/level", levelRoutes);
router.use("/token", tokenRoutes);
router.use("/topic", topicRoutes);
router.use("/email", emailRoutes);
router.use("/avatar", avatarRoutes);
router.use("/subject", subjectRoutes);
router.use("/question", questionRoutes);

module.exports = router;
