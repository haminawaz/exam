const { registerSchema, loginSchema } = require("./joi/user/auth");

const { orderParamsSchema } = require("./joi/user/order");

module.exports = {
  registerSchema,
  loginSchema,
  orderParamsSchema,
};
