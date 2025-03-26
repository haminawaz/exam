const { Router } = require("express");
const router = Router();
const {
  createCheckout,
  checkoutComplete,
} = require("../../controllers/user/order.js");
const { paramsValidator, bodyValidator } = require("../../middlewares/joi.js");

router.post(
  "/checkout/:levelId",
  paramsValidator("orderParamsSchema"),
  bodyValidator("registerSchema"),
  createCheckout
);

router.post("/checkout-complete", checkoutComplete);

module.exports = router;
