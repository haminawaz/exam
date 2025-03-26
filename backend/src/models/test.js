const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Avatar",
      required: true,
    },
    levelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    percentage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const test = mongoose.model("Test", TestSchema);
module.exports = test;
