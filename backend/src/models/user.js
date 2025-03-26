const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      default: null,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("User", UserSchema);

module.exports = user;
