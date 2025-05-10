const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
    },
    answer: {
      type: String,
      required: true,
    },
    simulatorType: {
      type: String,
    },
  },
  { timestamps: true }
);

const question = mongoose.model("Question", QuestionSchema);

module.exports = question;
