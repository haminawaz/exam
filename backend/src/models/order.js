const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    levelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: true,
    },
    price: {
      type: Number,
      default: null,
    },
    transactionId: {
      type: String,
      default: null,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded", "gifted"],
      default: "pending",
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", function (next) {
  if (this.paymentDate) {
    const expiryDate = new Date(this.paymentDate);
    expiryDate.setDate(expiryDate.getDate() + 60);
    this.expiryDate = expiryDate;
  }
  next();
});

const order = mongoose.model("Order", orderSchema);

module.exports = order;
