const mongoose = require("mongoose");

const prizeSchema = new mongoose.Schema({
  image: { type: String },
  imageUrl: { type: String },
  actionUrl: { type: String },
});

const Prize = mongoose.model("Prize", prizeSchema);

module.exports = Prize;
