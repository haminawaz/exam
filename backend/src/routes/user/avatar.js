const { Router } = require("express");
const router = Router();
const { getAllAvatars } = require("../../controllers/user/avatar.js");
const { bodyValidator } = require("../../middlewares/joi.js");
const { verifyUserToken } = require("../../middlewares/authMiddleware.js");

router.get("/", getAllAvatars);

module.exports = router;
