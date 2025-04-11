const Joi = require("joi");

module.exports = {
  tokenParamsSchema: Joi.object({
    userId: Joi.string().length(24).hex().required().messages({
      "string.base": "User is invalid",
      "string.empty": "User is required",
      "string.length": "User is invalid",
      "string.hex": "User is invalid",
      "any.required": "User is required",
    }),
  }),

  tokenQuerySchema: Joi.object({
    levelId: Joi.string().length(24).hex().required().messages({
      "string.base": "Level is invalid",
      "string.empty": "Level is required",
      "string.length": "Level is invalid",
      "string.hex": "Level is invalid",
      "any.required": "Level is required",
    }),
  }),
};
