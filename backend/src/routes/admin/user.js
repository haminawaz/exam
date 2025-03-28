const { Router } = require("express");
const router = Router();
const { getUsers } = require("../../controllers/admin/user");
const { verifyAdminToken } = require("../../middlewares/authMiddleware");

router.get("/", verifyAdminToken, getUsers);

module.exports = router;
