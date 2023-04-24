const { Schema, Model } = require("mongoose");

const purchaseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    email: String,
    phone: Number,
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

module.exports = Model("Purchase", purchaseSchema);
