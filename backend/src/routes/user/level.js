const { Router } = require("express");
const router = Router();
const { getAllLevels } = require("../../controllers/user/level");
const { decodedUserToken } = require("../../middlewares/authMiddleware");

router.get("/", decodedUserToken, getAllLevels);

module.exports = router;
