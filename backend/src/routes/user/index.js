const express = require("express");
const router = express.Router();

const orderRoutes = require("./order");
const levelRoutes = require("./level");
const avatarRoutes = require("./avatar");
const questionRoutes = require("./question");

router.use("/order", orderRoutes);
router.use("/level", levelRoutes);
router.use("/avatar", avatarRoutes);
router.use("/question", questionRoutes);

module.exports = router;
