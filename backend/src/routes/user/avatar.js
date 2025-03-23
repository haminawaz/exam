const { Router } = require("express");
const router = Router();
const { getAllAvatars } = require("../../controllers/user/avatar.js");

router.get("/", getAllAvatars);

module.exports = router;
