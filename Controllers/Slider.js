const Slider = require("../Models/Slider");
exports.getSlider = async (req, res) => {
  const slider = await Slider.find({});
  if (slider.length == 0) {
    return res.status(401).json({ status: 401, message: "Data is not found" });
  }
  slider.map(
    (s) =>
      (s.sliderImage = `http://${process.env.HOST_NAME}:${process.env.PORT}/uploads/slider/${s.sliderImage}`)
  );
  return res.status(200).json({ status: 200, data: { slider } });
};
exports.CreateSlider = async (req, res) => {
  const sliderObject = new Slider({
    slierCaption: req.body.slierCaption,
    sliderImage: req.file.originalname,
    sliderurl: req.body.sliderurl,
  });
  const slider = await sliderObject.save();
  if (slider) {
    return res
      .status(201)
      .json({ message: "Successfully Created", status: 201 });
  }
};
exports.getSliderById = (req, res) => {};
exports.deleteSlider = async (req, res) => {};
exports.updateSlider = async (req, res) => {};
