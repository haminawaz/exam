const { Router } = require("express");
const router = Router();
const {
  getAllFreeQuestions,
  loginUser,
  getAccessQuestions,
  createResults,
} = require("../../controllers/user/question");
const { verifyUserToken } = require("../../middlewares/authMiddleware");
const { bodyValidator } = require("../../middlewares/joi");

router.get("/free", getAllFreeQuestions);

router.post(
  "/login",
  bodyValidator("loginSchema"),
  loginUser
);

router.get(
  "/paid",
  verifyUserToken,
  getAccessQuestions
);

router.post("/results", createResults);

module.exports = router;
