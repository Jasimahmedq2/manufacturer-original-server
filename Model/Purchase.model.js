const mongoose = require("mongoose");
const { Schema } = mongoose;
const purchaseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    email: String,
    phone: String,
    quantity: Number,
    address: String,
    price: Number,
    paid: {
      type: Boolean,
      default: false,
    },
    shipped: {
      type: Boolean,
      default: false,
    },
    transactionId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Purchase", purchaseSchema);
