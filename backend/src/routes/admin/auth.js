const { Router } = require("express");
const router = Router();
const { loginAdmin } = require("../../controllers/admin/auth");
const { bodyValidator } = require("../../middlewares/joi");

router.post("/login", bodyValidator("adminLoginSchema"), loginAdmin);

module.exports = router;
