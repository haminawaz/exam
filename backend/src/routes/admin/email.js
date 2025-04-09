const { Router } = require("express");
const router = Router();
const { getAllEmails, updateEmail } = require("../../controllers/admin/email");
const { verifyAdminToken } = require("../../middlewares/authMiddleware");
const { bodyValidator, paramsValidator } = require("../../middlewares/joi");

router.get("/", verifyAdminToken, getAllEmails);

router.put(
  "/:emailId",
  verifyAdminToken,
  paramsValidator("emailParamsSchema"),
  bodyValidator("emailBodySchema"),
  updateEmail
);

module.exports = router;
