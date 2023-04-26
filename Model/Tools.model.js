const mongoose = require("mongoose");
const { Schema } = mongoose;

const toolSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    email: String,
    title: String,
    minimum: Number,
    available: Number,
    price: Number,
    image: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tool", toolSchema);