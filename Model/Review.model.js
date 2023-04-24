const { Schema, Model } = require("mongoose");

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    email: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = Model("Review", reviewSchema);
