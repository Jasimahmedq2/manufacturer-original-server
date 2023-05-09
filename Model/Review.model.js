const mongoose = require("mongoose");
const { Schema } = mongoose;
const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    email: String,
    description: String,
    rate: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
