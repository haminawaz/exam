const Joi = require("joi");

module.exports = {
  createTopicParamsSchema: Joi.object({
    subjectId: Joi.string().length(24).hex().required().messages({
      "string.base": "Subject is invalid",
      "string.empty": "Subject is required",
      "string.length": "Subject is invalid",
      "string.hex": "Subject is invalid",
      "any.required": "Subject is required",
    }),
  }),

  topicParamsSchema: Joi.object({
    topicId: Joi.string().length(24).hex().required().messages({
      "string.base": "Topic is invalid",
      "string.empty": "Topic is required",
      "string.length": "Topic is invalid",
      "string.hex": "Topic is invalid",
      "any.required": "Topic is required",
    }),
  }),

  topicBodySchema: Joi.object({
    topicName: Joi.string()
      .min(2)
      .max(70)
      .pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
      .required()
      .trim()
      .messages({
        "string.base": "Topic name must be a string",
        "string.pattern.base":
          "Topic name can only contain letters, accented letters, spaces, and hyphens",
        "any.required": "Topic name is required",
        "string.min": "Topic name must be at least {#limit} characters long",
        "string.max": "Topic name must not exceed {#limit} characters",
        "string.empty": "Topic name cannot be empty",
        "string.trim":
          "Topic name should not contain spaces at the beginning or end",
      }),
  }),
};
