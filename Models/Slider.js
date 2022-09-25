const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema(
  {
    slierCaption: { type: String },
    sliderImage: { type: String },
    sliderurl: { type: String },
    slidertype: { type: String },
  },
  { timestamps: true }
);
const Slider = mongoose.model("Slider", SliderSchema);
module.exports = Slider;
