const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    levelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const subject = mongoose.model("Subject", SubjectSchema);

module.exports = subject;
