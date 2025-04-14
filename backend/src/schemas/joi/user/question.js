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
        "string.base": "Le nom doit être une chaîne",
        "string.pattern.base":
          "Le nom doit commencer par une lettre et peut inclure des chiffres et des espaces, mais ne peut pas être entièrement composé de chiffres",
        "any.required": "Le nom est obligatoire",
        "string.min": "Le nom doit comporter au moins {#limit} caractères",
        "string.max": "Le nom ne doit pas dépasser {#limit} caractères",
        "string.empty": "Le nom ne doit pas être vide",
        "string.trim":
          "Le nom ne doit contenir ni espaces ni espaces",
      }),
    avatarId: Joi.string().length(24).hex().required().messages({
      "string.base": "L'avatar n'est pas valide",
      "string.empty": "L'avatar est obligatoire",
      "string.length": "L'avatar n'est pas valide",
      "string.hex": "L'avatar n'est pas valide",
      "any.required": "L'avatar est obligatoire",
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
        "string.email": "Entrez une adresse e-mail valide",
        "any.required": "L'e-mail est obligatoire",
        "string.empty": "L'e-mail ne doit pas être vide",
        "string.trim":
          "L'e-mail ne doit pas contenir d'espace au début ou à la fin",
      }),
    code: Joi.string().length(6).required().uppercase().alphanum().messages({
      "string.length": "Le code doit comporter exactement {#limit} caractères",
      "string.empty": "Le code est obligatoire",
      "any.required": "Le code est obligatoire",
      "string.alphanum": "Le code ne doit contenir que des lettres et des chiffres",
    }),
  }),
};
