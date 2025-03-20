const { Router } = require("express");
const router = Router();
const {
  registerUser,
  loginUser,
} = require("../../controllers/user/auth.js");
const { bodyValidator } = require("../../middlewares/joi.js");

router.post(
  "/register",
  bodyValidator("buyerRegisterSchema"),
  registerUser
);
router.post(
  "/login",
  bodyValidator("merchantRegisterSchema"),
  loginUser
);

module.exports = router;
