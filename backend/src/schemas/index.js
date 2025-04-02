const { adminLoginSchema } = require("./joi/admin/auth");

const { levelBodySchema, levelParamsSchema } = require("./joi/admin/level");

const { avatarParamsSchema } = require("./joi/admin/avatar");

const {
  subjectParamsSchema,
  createSubjectParamsSchema,
  updateSubjectBodySchema,
  createSubjectBodySchema,
} = require("./joi/admin/subject");

const {
  topicParamsSchema,
  createTopicParamsSchema,
  createTopicBodySchema,
  updateTopicBodySchema,
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
  createSubjectBodySchema,
  updateSubjectBodySchema,
  createTopicBodySchema,
  updateTopicBodySchema,
  topicParamsSchema,
  createTopicParamsSchema,
  avatarParamsSchema,
};
