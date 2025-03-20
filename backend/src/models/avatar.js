const mongoose = require("mongoose");

const AvatarSchema = new mongoose.Schema(
  {
    avatarUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const avatar = mongoose.model("Avatar", AvatarSchema);

module.exports = avatar;
