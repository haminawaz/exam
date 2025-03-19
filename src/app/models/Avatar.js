import mongoose from "mongoose";

const AvatarSchema = new mongoose.Schema(
  {
    avatarUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Avatar || mongoose.model("Avatar", AvatarSchema);
