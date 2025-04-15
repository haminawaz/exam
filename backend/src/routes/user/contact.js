const { Router } = require("express");
const router = Router();
const { sendContactMessage } = require("../../controllers/user/contact");

router.post("/", sendContactMessage);

module.exports = router;
