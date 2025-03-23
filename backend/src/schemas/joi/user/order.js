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
};
