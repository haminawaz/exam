const Joi = require("joi");

module.exports = {
  questionParamsSchema: Joi.object({
    questionId: Joi.string().length(24).hex().required().messages({
      "string.base": "Question is invalid",
      "string.empty": "Question is required",
      "string.length": "Question is invalid",
      "string.hex": "Question is invalid",
      "any.required": "Question is required",
    }),
  }),

  questionBodySchema: Joi.object({
    question: Joi.string().required().messages({
      "string.base": "Question must be a string",
      "string.empty": "Question is not allowed to be empty",
      "any.required": "Question is required",
    }),
    options: Joi.string()
      .trim()
      .required()
      .custom((value, helpers) => {
        const options = value.split(",");
        const uniqueOptions = new Set(options);
        if (uniqueOptions.size !== options.length) {
          return helpers.message("Duplicate options are not allowed");
        }
        return value;
      })
      .messages({
        "string.base": "Options are not valid",
        "string.empty": "Options are required",
        "any.required": "Options are required",
      }),
    correctOption: Joi.string()
      .required()
      .custom((value, helpers) => {
        const { options } = helpers.state.ancestors[0];
        const optionsArray = options.split(",").map((option) => option.trim());
        if (!optionsArray.includes(value)) {
          return helpers.message("Correct Option must be one of the options");
        }
        return value;
      })
      .messages({
        "string.base": "Correct Option must be a string",
        "string.empty": "Correct Option is not allowed to be empty",
        "any.required": "Correct Option is required",
      }),
    simulatorType: Joi.string().valid("paid", "free").required().messages({
      "string.base": "Simulator Type must be a string",
      "any.only": "Simulator Type must be either 'Paid' or 'Free'",
      "string.empty": "Simulator Type is not allowed to be empty",
      "any.required": "Simulator Type is required",
    }),
    topicId: Joi.string().length(24).hex().required().messages({
      "string.base": "Topic is invalid",
      "string.empty": "Topic is required",
      "string.length": "Topic is invalid",
      "string.hex": "Topic is invalid",
      "any.required": "Topic is required",
    }),
  }),
};
