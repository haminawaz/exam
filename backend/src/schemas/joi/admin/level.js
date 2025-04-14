const Joi = require("joi");

module.exports = {
  levelParamsSchema: Joi.object({
    levelId: Joi.string().length(24).hex().required().messages({
      "string.base": "Le niveau est invalide",
      "string.empty": "Le niveau n'est pas valide",
      "string.length": "Le niveau est invalide",
      "string.hex": "Le niveau est invalide",
      "any.required": "Le niveau n'est pas valide",
    }),
  }),

  levelBodySchema: Joi.object({
    levelName: Joi.number().greater(0).required().messages({
      "number.base": "Le niveau doit être un nombre",
      "number.greater": "Le niveau doit être supérieur à 0",
      "any.required": "Le niveau n'est pas valide",
    }),

    price: Joi.number().greater(0).required().messages({
      "number.base": "Le prix doit être un nombre",
      "number.greater": "Le prix doit être supérieur à 0",
      "any.required": "Le prix est requis",
    }),

    difficulty: Joi.string().valid("facile", "difficile").required().messages({
      "string.base": "La difficulté doit être une chaîne",
      "any.only": "La difficulté doit être 'facile' ou 'difficile'",
      "any.required": "La difficulté est requise",
    }),
  }),
};
