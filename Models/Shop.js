const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema(
  {
    name: { type: String },
    logo: { type: String },
  },
  { timestamps: true }
);
const Shop = mongoose.model("Shop", ShopSchema);
module.exports = Shop;
