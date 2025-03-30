const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const userRoutes = require("./user");
const levelRoutes = require("./level");
const topicRoutes = require("./topic");
const avatarRoutes = require("./avatar");
const subjectRoutes = require("./subject");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/level", levelRoutes);
router.use("/topic", topicRoutes);
router.use("/avatar", avatarRoutes);
router.use("/subject", subjectRoutes);

module.exports = router;
