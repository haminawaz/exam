const Joi = require("joi");

module.exports = {
  subjectParamsSchema: Joi.object({
    subjectId: Joi.string().length(24).hex().required().messages({
      "string.base": "Subject is invalid",
      "string.empty": "Subject is required",
      "string.length": "Subject is invalid",
      "string.hex": "Subject is invalid",
      "any.required": "Subject is required",
    }),
  }),

  subjectBodySchema: Joi.object({
    subjectName: Joi.string()
      .min(2)
      .max(70)
      .pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
      .required()
      .trim()
      .messages({
        "string.base": "Subject name must be a string",
        "string.pattern.base":
          "Subject name can only contain letters, accented letters, spaces, and hyphens",
        "any.required": "Subject name is required",
        "string.min": "Subject name must be at least {#limit} characters long",
        "string.max": "Subject name must not exceed {#limit} characters",
        "string.empty": "Subject name cannot be empty",
        "string.trim":
          "Subject name should not contain spaces at the beginning or end",
      }),
    levelId: Joi.string().length(24).hex().required().messages({
      "string.base": "Level is invalid",
      "string.empty": "Level is required",
      "string.length": "Level is invalid",
      "string.hex": "Level is invalid",
      "any.required": "Level is required",
    }),
  }),
};
