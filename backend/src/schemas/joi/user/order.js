const Joi = require("joi");

module.exports = {
  orderParamsSchema: Joi.object({
    levelId: Joi.string().length(24).hex().required().messages({
      "string.base": "Le niveau est invalide",
      "string.empty": "Le niveau n'est pas valide",
      "string.length": "Le niveau est invalide",
      "string.hex": "Le niveau est invalide",
      "any.required": "Le niveau n'est pas valide",
    }),
  }),

  registerSchema: Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(70)
      .pattern(/^[^\p{N}]/u)
      .required()
      .trim()
      .messages({
        "string.base": "Le prénom doit être une chaîne",
        "string.pattern.base":
          "Prénom doit commencer par une lettre et peut contenir des chiffres et des espaces, mais ne peut pas être entièrement composé de chiffres",
        "any.required": "Le prénom est obligatoire",
        "string.min": "Le prénom doit comporter au moins {#limit} caractères",
        "string.max": "Le prénom ne doit pas dépasser {#limit} caractères",
        "string.empty": "Le prénom ne doit pas être vide",
        "string.trim": "Le prénom ne doit contenir ni espaces ni espaces",
      }),
    lastName: Joi.string()
      .min(2)
      .max(70)
      .pattern(/^[^\p{N}]/u)
      .required()
      .trim()
      .messages({
        "string.base": "Le nom de famille doit être une chaîne",
        "string.pattern.base":
          "Le nom de famille doit commencer par une lettre et peut contenir des chiffres et des espaces, mais ne peut pas être entièrement composé de chiffres",
        "any.required": "Le nom de famille est obligatoire",
        "string.min":
          "Le nom de famille doit comporter au moins {#limit} caractères",
        "string.max":
          "Le nom de famille ne doit pas dépasser {#limit} caractères",
        "string.empty": "Le nom de famille ne doit pas être vide",
        "string.trim":
          "Le nom de famille ne doit contenir ni espaces ni espaces",
      }),
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
    postalCode: Joi.string()
      .pattern(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)
      .required()
      .messages({
        "string.base": "Le code postal doit être une chaîne de caractères",
        "string.empty": "Le code postal ne peut pas être vide",
        "any.required": "Le code postal est obligatoire",
        "string.pattern.base":
          "Le code postal doit être au format canadien valide (ex: A1A 1A1)",
      }),
  }),

  updateUserSchema: Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(70)
      .pattern(/^[^\p{N}]/u)
      .required()
      .trim()
      .messages({
        "string.base": "Le prénom doit être une chaîne",
        "string.pattern.base":
          "Prénom doit commencer par une lettre et peut contenir des chiffres et des espaces, mais ne peut pas être entièrement composé de chiffres",
        "any.required": "Le prénom est obligatoire",
        "string.min": "Le prénom doit comporter au moins {#limit} caractères",
        "string.max": "Le prénom ne doit pas dépasser {#limit} caractères",
        "string.empty": "Le prénom ne doit pas être vide",
        "string.trim": "Le prénom ne doit contenir ni espaces ni espaces",
      }),
    lastName: Joi.string()
      .min(2)
      .max(70)
      .pattern(/^[^\p{N}]/u)
      .required()
      .trim()
      .messages({
        "string.base": "Le nom de famille doit être une chaîne",
        "string.pattern.base":
          "Le nom de famille doit commencer par une lettre et peut contenir des chiffres et des espaces, mais ne peut pas être entièrement composé de chiffres",
        "any.required": "Le nom de famille est obligatoire",
        "string.min":
          "Le nom de famille doit comporter au moins {#limit} caractères",
        "string.max":
          "Le nom de famille ne doit pas dépasser {#limit} caractères",
        "string.empty": "Le nom de famille ne doit pas être vide",
        "string.trim":
          "Le nom de famille ne doit contenir ni espaces ni espaces",
      }),
    code: Joi.string().length(6).required().uppercase().alphanum().messages({
      "string.length": "Le code doit comporter exactement {#limit} caractères",
      "string.empty": "Le code est obligatoire",
      "any.required": "Le code est obligatoire",
      "string.alphanum":
        "Le code ne doit contenir que des lettres et des chiffres",
    }),
    postalCode: Joi.string()
      .pattern(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)
      .required()
      .messages({
        "string.base": "Le code postal doit être une chaîne de caractères",
        "string.empty": "Le code postal ne peut pas être vide",
        "any.required": "Le code postal est obligatoire",
        "string.pattern.base":
          "Le code postal doit être au format canadien valide (ex: A1A 1A1)",
      }),
  }),
};
