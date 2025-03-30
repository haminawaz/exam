const { adminLoginSchema } = require("./joi/admin/auth");

const { levelBodySchema, levelParamsSchema } = require("./joi/admin/level");

const { avatarParamsSchema } = require("./joi/admin/avatar");

const {
  subjectParamsSchema,
  createSubjectParamsSchema,
  subjectBodySchema,
} = require("./joi/admin/subject");

const {
  topicBodySchema,
  topicParamsSchema,
  createTopicParamsSchema,
} = require("./joi/admin/topic");

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
  subjectParamsSchema,
  createSubjectParamsSchema,
  subjectBodySchema,
  topicBodySchema,
  topicParamsSchema,
  createTopicParamsSchema,
  avatarParamsSchema,
};
