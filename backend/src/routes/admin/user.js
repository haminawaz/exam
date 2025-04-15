const { Router } = require("express");
const router = Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUsers,
} = require("../../controllers/admin/user");
const { verifyAdminToken } = require("../../middlewares/authMiddleware");
const { bodyValidator } = require("../../middlewares/joi");

router.post("/", verifyAdminToken, bodyValidator("registerSchema"), createUser);

router.get("/", verifyAdminToken, getUsers);

router.put(
  "/:userId",
  verifyAdminToken,
  bodyValidator("updateUserSchema"),
  updateUser
);

router.delete("/:userId", verifyAdminToken, deleteUsers);

module.exports = router;
