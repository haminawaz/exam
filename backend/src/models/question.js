const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      default: null,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    correct: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    simulatorType: {
      type: String,
      required: true,
      enum: ['free', 'paid'],
    },
  },
  { timestamps: true }
);

const question = mongoose.model("Question", QuestionSchema);

module.exports = question;
