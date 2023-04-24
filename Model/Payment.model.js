const { Schema, Model } = require("mongoose");

const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    email: String,
    transactionId: String,
  },
  { timestamps: true }
);

module.exports = Model("Payment", paymentSchema);
