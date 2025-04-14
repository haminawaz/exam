const Joi = require("joi");

module.exports = {
  avatarParamsSchema: Joi.object({
    avatarId: Joi.string().length(24).hex().required().messages({
      "string.base": "L'avatar n'est pas valide",
      "string.empty": "L'avatar est obligatoire",
      "string.length": "L'avatar n'est pas valide",
      "string.hex": "L'avatar n'est pas valide",
      "any.required": "L'avatar est obligatoire",
    }),
  }),
};
