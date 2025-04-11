const { Router } = require("express");
const router = Router();
const { getUsers, createUser } = require("../../controllers/admin/user");
const { verifyAdminToken } = require("../../middlewares/authMiddleware");
const { bodyValidator } = require("../../middlewares/joi");

router.post("/", verifyAdminToken, bodyValidator("registerSchema"), createUser);

router.get("/", verifyAdminToken, getUsers);

module.exports = router;
