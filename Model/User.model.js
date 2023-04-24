const { Schema, Model } = require("mongoose");

const userSchema = new Schema(
  {
    email: String,
    role: String,
  },
  { timestamps: true }
);

module.exports = Model("User", userSchema);
