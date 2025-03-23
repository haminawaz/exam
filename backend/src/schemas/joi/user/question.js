const Joi = require("joi");

module.exports = {
  accessQuestionSchema: Joi.object({
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
    avatarId: Joi.string().length(24).hex().required().messages({
      "string.base": "Avatar is invalid",
      "string.empty": "Avatar is required",
      "string.length": "Avatar is invalid",
      "string.hex": "Avatar is invalid",
      "any.required": "Avatar is required",
    }),
  }),
};
