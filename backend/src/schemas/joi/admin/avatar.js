const Joi = require("joi");

module.exports = {
  avatarParamsSchema: Joi.object({
    avatarId: Joi.string().length(24).hex().required().messages({
      "string.base": "Avatar is invalid",
      "string.empty": "Avatar is required",
      "string.length": "Avatar is invalid",
      "string.hex": "Avatar is invalid",
      "any.required": "Avatar is required",
    }),
  }),
};
