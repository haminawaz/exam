const { Router } = require("express");
const router = Router();
const { getAllSubjects } = require("../../controllers/user/subject.js");
const { bodyValidator } = require("../../middlewares/joi.js");
const { verifyUserToken } = require("../../middlewares/authMiddleware.js");

router.get("/", getAllSubjects);

module.exports = router;
