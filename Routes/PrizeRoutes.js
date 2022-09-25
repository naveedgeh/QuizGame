const express = require("express");
const multer = require("multer");
const { getPrize, addPrize } = require("../Controllers/Prize");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/prize");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const route = express.Router();

route.get("/prize", getPrize);
route.post("/addprize", upload.single("image"), addPrize);

module.exports = route;
