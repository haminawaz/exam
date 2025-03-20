const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    topicName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const topic = mongoose.model("Topic", TopicSchema);

module.exports = topic;