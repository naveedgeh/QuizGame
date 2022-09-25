const express = require("express");
const { addShop, getShop } = require("../Controllers/Shop");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/shop");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const route = express.Router();

route.post("/addshop", upload.single("logo"), addShop);
route.get("/shop", getShop);

module.exports = route;
