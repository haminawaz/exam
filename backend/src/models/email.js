const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      default: null,
    },
    footer: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const email = mongoose.model("Email", EmailSchema);

module.exports = email;
