const Slider = require("../Models/Slider");
exports.getSlider = async (req, res) => {
  const { option } = req.query;
  const slider = await Slider.find({ slidertype: option });
  if (slider.length == 0) {
    return res.send("Data is not found");
  }
  slider.map(
    (s) =>
      (s.sliderImage = `http://${process.env.HOST_NAME}:${process.env.PORT}/uploads/slider/${s.sliderImage}`)
  );
  return res.send(slider);
};
exports.CreateSlider = async (req, res) => {
  const sliderObject = new Slider({
    slierCaption: req.body.slierCaption,
    sliderImage: req.file.originalname,
    sliderurl: req.body.sliderurl,
    slidertype: req.body.slidertype,
  });
  const slider = await sliderObject.save();
  if (slider) {
    return res.send("Successfully Created");
  }
};
exports.getSliderById = (req, res) => {};
exports.deleteSlider = async (req, res) => {};
exports.updateSlider = async (req, res) => {};
