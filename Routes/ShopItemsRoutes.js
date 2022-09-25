const express = require("express");
const { addShopItem, getShopItem } = require("../Controllers/Shop");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/shop/shopitems");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const route = express.Router();

route.post("/addshopitems", upload.single("image"), addShopItem);
route.get("/shopitems/:shopId", getShopItem);

module.exports = route;
