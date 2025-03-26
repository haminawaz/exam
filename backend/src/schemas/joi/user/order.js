const Joi = require("joi");

module.exports = {
  orderParamsSchema: Joi.object({
    levelId: Joi.string().length(24).hex().required().messages({
      "string.base": "Level is invalid",
      "string.empty": "Level is required",
      "string.length": "Level is invalid",
      "string.hex": "Level is invalid",
      "any.required": "Level is required",
    }),
  }),

  registerSchema: Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(70)
      .pattern(/^[^\p{N}]/u)
      .required()
      .trim()
      .messages({
        "string.base": "First name must be a string",
        "string.pattern.base":
          "First name must start with a letter and can include numbers, spaces, but cannot be entirely numbers",
        "any.required": "First name is required",
        "string.min": "First name must be at least {#limit} characters long",
        "string.max": "First name must not exceed {#limit} characters",
        "string.empty": "First name is not allowed to be empty",
        "string.trim":
          "First name should not contain any spaces at the beginning or end",
      }),
    lastName: Joi.string()
      .min(2)
      .max(70)
      .pattern(/^[^\p{N}]/u)
      .required()
      .trim()
      .messages({
        "string.base": "Last name must be a string",
        "string.pattern.base":
          "Last name must start with a letter and can include numbers, spaces, but cannot be entirely numbers",
        "any.required": "Last name is required",
        "string.min": "Last name must be at least {#limit} characters long",
        "string.max": "Last name must not exceed {#limit} characters",
        "string.empty": "Last name is not allowed to be empty",
        "string.trim":
          "Last name should not contain any spaces at the beginning or end",
      }),
    email: Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
        tlds: { allow: false },
      })
      .required()
      .messages({
        "string.email": "Enter valid email",
        "any.required": "Email is required",
        "string.empty": "Email is not allowed to be empty",
        "string.trim":
          "Email should not contain any spaces at the beginning or end",
      }),
    address: Joi.string()
      .pattern(
        /^(?!.*\s{2,})(?!.*([,#\-/().'])[\s]*[,#\-/().'])[A-Za-z0-9\s,#\-/().']+$/
      )
      .min(2)
      .max(255)
      .required()
      .trim()
      .messages({
        "string.base": "Address must be a string",
        "any.required": "Address is required",
        "string.empty": "Address cannot be empty",
        "string.min": "Address must be at least {#limit} character long",
        "string.max": "Address must not exceed {#limit} characters",
        "string.pattern.base":
          "Invalid address! Please enter a valid address without extra spaces or special characters",
      }),
  }),
};
