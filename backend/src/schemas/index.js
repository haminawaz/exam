const { orderParamsSchema, registerSchema } = require("./joi/user/order");

const { accessQuestionSchema, loginSchema } = require("./joi/user/question");

module.exports = {
  registerSchema,
  loginSchema,
  orderParamsSchema,
  accessQuestionSchema,
};
