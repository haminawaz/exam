const { Router } = require("express");
const router = Router();
const { createToken } = require("../../controllers/admin/token");
const { verifyAdminToken } = require("../../middlewares/authMiddleware");
const { paramsValidator, queryValidator } = require("../../middlewares/joi");

router.post(
  "/:userId",
  verifyAdminToken,
  paramsValidator("tokenParamsSchema"),
  queryValidator("tokenQuerySchema"),
  createToken
);

module.exports = router;
