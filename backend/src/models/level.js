const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema(
  {
    level: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      default: 1,
      min: 0,
    },
    difficulty: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const level = mongoose.model("Level", LevelSchema);

module.exports = level;
