const Joi = require("joi");

module.exports = {
  questionParamsSchema: Joi.object({
    questionId: Joi.string().length(24).hex().required().messages({
      "string.base": "La question n'est pas valide",
      "string.empty": "La question est requise",
      "string.length": "La question n'est pas valide",
      "string.hex": "La question n'est pas valide",
      "any.required": "La question est requise",
    }),
  }),

  questionBodySchema: Joi.object({
    question: Joi.string().required().messages({
      "string.base": "La question doit être une chaîne de caractères«",
      "string.empty": "La question ne doit pas être vide",
      "any.required": "La question est requise",
    }),
    options: Joi.string()
      .trim()
      .required()
      .custom((value, helpers) => {
        const options = value.split(",");
        const uniqueOptions = new Set(options);
        if (uniqueOptions.size !== options.length) {
          return helpers.message("Les options en double ne sont pas autorisées");
        }
        return value;
      })
      .messages({
        "string.base": "Les options ne sont pas valides",
        "string.empty": "Les options sont obligatoires",
        "any.required": "Les options sont obligatoires",
      }),
    correctOption: Joi.string()
      .required()
      .custom((value, helpers) => {
        const { options } = helpers.state.ancestors[0];
        const optionsArray = options.split(",").map((option) => option.trim());
        if (!optionsArray.includes(value)) {
          return helpers.message("L'option correcte doit être l'une des options");
        }
        return value;
      })
      .messages({
        "string.base": "L'option correcte doit être une chaîne",
        "string.empty": "L'option correcte ne doit pas être vide",
        "any.required": "L'option correcte est demandée",
      }),
    simulatorType: Joi.string().valid("paid", "free").required().messages({
      "string.base": "Le type de simulateur doit être une chaîne",
      "any.only": "Le type de simulateur doit être 'paid' ou 'free'",
      "string.empty": "Le type de simulateur ne doit pas être vide",
      "any.required": "Le type de simulateur est requis",
    }),
    topicId: Joi.when("simulatorType", {
      is: "paid",
      then: Joi.string().length(24).hex().required().messages({
        "string.base": "Le sujet n'est pas valide",
        "string.empty": "Le sujet n'est pas valide",
        "string.length": "Le sujet n'est pas valide",
        "string.hex": "Le sujet n'est pas valide",
        "any.required": "Le sujet n'est pas valide",
      }),
      otherwise: Joi.forbidden().messages({
        "any.unknown": "Topic is not allowed",
      }),
    }),
  }),
};
