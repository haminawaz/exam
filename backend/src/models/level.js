const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema(
  {
    level: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const level = mongoose.model("Level", LevelSchema);

module.exports = level;
