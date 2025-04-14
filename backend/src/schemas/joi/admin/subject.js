const Joi = require("joi");

module.exports = {
  subjectParamsSchema: Joi.object({
    subjectId: Joi.string().length(24).hex().required().messages({
      "string.base": "L'objet n'est pas valide",
      "string.empty": "L'objet est obligatoire",
      "string.length": "L'objet n'est pas valide",
      "string.hex": "L'objet n'est pas valide",
      "any.required": "L'objet est obligatoire",
    }),
  }),

  subjectBodySchema: Joi.object({
    subjectName: Joi.string()
      .min(2)
      .max(70)
      .pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
      .required()
      .trim()
      .messages({
        "string.base": "Le nom de l'objet doit être une chaîne",
        "string.pattern.base":
          "Le nom du sujet ne peut contenir que des lettres, des accents, des espaces et des tirets",
        "any.required": "Le nom du sujet est obligatoire",
        "string.min": "Le nom du sujet doit comporter au moins {#limit} caractères",
        "string.max": "Le nom du sujet ne doit pas dépasser {#limit}  caractères",
        "string.empty": "Le nom du sujet ne doit pas être vide",
        "string.trim":
          "Le nom du sujet ne doit contenir ni espaces ni espaces au début ni à la fin",
      }),
    levelId: Joi.string().length(24).hex().required().messages({
      "string.base": "Le niveau est invalide",
      "string.empty": "Le niveau n'est pas valide",
      "string.length": "Le niveau est invalide",
      "string.hex": "Le niveau est invalide",
      "any.required": "Le niveau n'est pas valide",
    }),
  }),
};
