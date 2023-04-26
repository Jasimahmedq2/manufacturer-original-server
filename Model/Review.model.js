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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
