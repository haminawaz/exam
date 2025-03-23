const { registerSchema, loginSchema } = require("./joi/user/auth");

const { orderParamsSchema } = require("./joi/user/order");

const { accessQuestionSchema } = require("./joi/user/question");

module.exports = {
  registerSchema,
  loginSchema,
  orderParamsSchema,
  accessQuestionSchema,
};
