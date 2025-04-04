const { adminLoginSchema } = require("./joi/admin/auth");

const { levelBodySchema, levelParamsSchema } = require("./joi/admin/level");

const { avatarParamsSchema } = require("./joi/admin/avatar");

const {
  subjectBodySchema,
  subjectParamsSchema,
} = require("./joi/admin/subject");

const { topicParamsSchema, topicBodySchema } = require("./joi/admin/topic");

const {
  questionBodySchema,
  questionParamsSchema,
} = require("./joi/admin/question");

const { orderParamsSchema, registerSchema } = require("./joi/user/order");

const { accessQuestionSchema, loginSchema } = require("./joi/user/question");

module.exports = {
  registerSchema,
  loginSchema,
  orderParamsSchema,
  accessQuestionSchema,
  adminLoginSchema,
  levelBodySchema,
  levelParamsSchema,
  subjectBodySchema,
  subjectParamsSchema,
  topicBodySchema,
  topicParamsSchema,
  avatarParamsSchema,
  questionBodySchema,
  questionParamsSchema,
};
