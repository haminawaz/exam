const Joi = require("joi");

module.exports = {
  levelParamsSchema: Joi.object({
    levelId: Joi.string().length(24).hex().required().messages({
      "string.base": "Level is invalid",
      "string.empty": "Level is required",
      "string.length": "Level is invalid",
      "string.hex": "Level is invalid",
      "any.required": "Level is required",
    }),
  }),

  levelBodySchema: Joi.object({
    levelName: Joi.number().greater(0).required().messages({
      "number.base": "Level must be a number",
      "number.greater": "Level must be greater than 0",
      "any.required": "Level is required",
    }),

    price: Joi.number().greater(0).required().messages({
      "number.base": "Price must be a number",
      "number.greater": "Price must be greater than 0",
      "any.required": "Price is required",
    }),

    difficulty: Joi.string().valid("facile", "difficile").required().messages({
      "string.base": "Difficulty must be a string",
      "any.only": "Difficulty must be either 'facile' or 'difficile'",
      "any.required": "Difficulty is required",
    }),
  }),
};
