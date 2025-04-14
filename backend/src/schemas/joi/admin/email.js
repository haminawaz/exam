const Joi = require("joi");

module.exports = {
  emailParamsSchema: Joi.object({
    emailId: Joi.string().length(24).hex().required().messages({
      "string.base": "L'e-mail n'est pas valide",
      "string.empty": "L'e-mail est obligatoire",
      "string.length": "L'e-mail n'est pas valide",
      "string.hex": "L'e-mail n'est pas valide",
      "any.required": "L'e-mail est obligatoire",
    }),
  }),

  emailBodySchema: Joi.object({
    header: Joi.string().required().messages({
      "string.base": "L'en-tête doit être une chaîne",
      "string.empty": "L'en-tête ne doit pas être vide",
      "any.required": "L'en-tête est obligatoire",
    }),

    footer: Joi.string().required().messages({
      "string.base": "Le pied de page doit être une chaîne",
      "string.empty": "Le pied de page ne doit pas être vide",
      "any.required": "Le pied de page est obligatoire",
    }),
  }),
};
