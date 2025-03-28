const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const userRoutes = require("./user");
const levelRoutes = require("./level");
const topicRoutes = require("./topic");
const subjectRoutes = require("./subject");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/level", levelRoutes);
router.use("/subject", subjectRoutes);
router.use("/topic", topicRoutes);

module.exports = router;
