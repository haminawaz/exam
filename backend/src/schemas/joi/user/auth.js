const Joi = require("joi");

module.exports = {
  registerSchema: Joi.object({
    name: Joi.string()
      .min(2)
      .max(70)
      .pattern(/^[^\p{N}]/u)
      .required()
      .trim()
      .messages({
        "string.base": "Name must be a string",
        "string.pattern.base":
          "Name must start with a letter and can include numbers, spaces, but cannot be entirely numbers",
        "any.required": "Name is required",
        "string.min": "Name must be at least {#limit} characters long",
        "string.max": "Name must not exceed {#limit} characters",
        "string.empty": "Name is not allowed to be empty",
        "string.trim":
          "Name should not contain any spaces at the beginning or end",
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

  loginSchema: Joi.object({
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
    code: Joi.string().length(6).required().uppercase().alphanum().messages({
      "string.length": "Code must be exactly {#limit} characters long",
      "string.empty": "Code is required",
      "any.required": "Code is required",
      "string.alphanum": "Code should only contain letters and numbers",
    }),
  }),
};
