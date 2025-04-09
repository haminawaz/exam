const Joi = require("joi");

module.exports = {
  emailParamsSchema: Joi.object({
    emailId: Joi.string().length(24).hex().required().messages({
      "string.base": "Email is invalid",
      "string.empty": "Email is required",
      "string.length": "Email is invalid",
      "string.hex": "Email is invalid",
      "any.required": "Email is required",
    }),
  }),

  emailBodySchema: Joi.object({
    header: Joi.string().required().messages({
      "string.base": "Header must be a string",
      "string.empty": "Header is not allowed to be empty",
      "any.required": "Header is required",
    }),

    footer: Joi.string().required().messages({
      "string.base": "Footer must be a string",
      "string.empty": "Footer is not allowed to be empty",
      "any.required": "Footer is required",
    }),
  }),
};
