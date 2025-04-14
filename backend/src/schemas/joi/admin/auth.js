const Joi = require("joi");

module.exports = {
  adminLoginSchema: Joi.object({
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
    password: Joi.string()
      .required()
      .min(6)
      .max(30)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{6,30}$/,
        "strong password"
      )
      .messages({
        "string.pattern.name":
          "Le mot de passe doit contenir au moins une lettre majuscule,une lettre minuscule,un chiffre et un caractère spécial",
        "string.min": "Le mot de passe doit comporter au moins 6 caractères",
        "string.max": "Le mot de passe doit comporter au maximum 30 caractères",
        "any.required": "Le mot de passe est obligatoire",
        "string.empty": "Le mot de passe ne doit pas être vide",
      }),
  }),
};
