const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const subjectRoutes = require("./subject");
const avatarRoutes = require("./avatar");

router.use("/auth", authRoutes);
router.use("/subject", subjectRoutes);
router.use("/avatar", avatarRoutes);

module.exports = router;
