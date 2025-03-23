const { Router } = require("express");
const router = Router();
const {
  registerUser,
  loginUser,
} = require("../../controllers/user/auth.js");
const { bodyValidator } = require("../../middlewares/joi.js");

router.post(
  "/register",
  bodyValidator("registerSchema"),
  registerUser
);
router.post(
  "/login",
  bodyValidator("loginSchema"),
  loginUser
);

module.exports = router;
