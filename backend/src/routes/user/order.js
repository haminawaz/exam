const { Router } = require("express");
const router = Router();
const {
  createCheckout,
  checkoutComplete,
} = require("../../controllers/user/order.js");
const { verifyUserToken } = require("../../middlewares/authMiddleware.js");
const { paramsValidator } = require("../../middlewares/joi.js");

router.post(
  "/checkout/:levelId",
  verifyUserToken,
  paramsValidator("orderParamsSchema"),
  createCheckout
);

router.post("/checkout-complete", checkoutComplete);

module.exports = router;
