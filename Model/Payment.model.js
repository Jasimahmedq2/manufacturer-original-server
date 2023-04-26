const mongoose = require("mongoose");
const { Schema } = mongoose;
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

module.exports = mongoose.model("Payment", paymentSchema);
