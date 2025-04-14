const Joi = require("joi");

module.exports = {
  tokenParamsSchema: Joi.object({
    userId: Joi.string().length(24).hex().required().messages({
      "string.base": "Utilisateur non valide",
      "string.empty": "Utilisateur obligatoire",
      "string.length": "Utilisateur non valide",
      "string.hex": "Utilisateur non valide",
      "any.required": "Utilisateur obligatoire",
    }),
  }),

  tokenQuerySchema: Joi.object({
    levelId: Joi.string().length(24).hex().required().messages({
      "string.base": "Le niveau est invalide",
      "string.empty": "Le niveau n'est pas valide",
      "string.length": "Le niveau est invalide",
      "string.hex": "Le niveau est invalide",
      "any.required": "Le niveau n'est pas valide",
    }),
  }),
};
