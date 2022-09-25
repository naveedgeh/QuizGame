const mongoose = require("mongoose");

const ShopItemsSchema = new mongoose.Schema(
  {
    name: { type: String },
    image: { type: String },
    actionLink: { type: String },
    price: { type: Number },
    shop: new mongoose.Schema({
      name: { type: String },
    }),
  },
  { timestamps: true }
);
const ShopItems = mongoose.model("ShopItems", ShopItemsSchema);
module.exports = ShopItems;
