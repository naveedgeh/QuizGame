const Quize = require("../Models/Quize");
const Category = require("../Models/Category");

exports.addQuize = async (req, res) => {
  const cat = await Category.findById(req.body.category);
  if (!cat) {
    return res.send("sorry category is not found");
  }
  const quizeObject = new Quize({
    title: req.body.title,
    category: {
      _id: cat._id,
      name: cat.categoryName,
      image: cat.categoryImage,
    },
    image: req.file.originalname,
    time: req.body.time,
  });
  let quize = await quizeObject.save();
  res.send(quize);
};
exports.getQuize = async (req, res) => {
  const { pagenumber, pagesize } = req.query;
  const quizes = await Quize.find()
    .skip((Number(pagenumber) - 1) * Number(pagesize))
    .limit(pagesize)
    .sort({ createdAt: 1 });
  if (quizes.length == 0) {
    return res.status(401).json({ message: "Data not found" });
  }
  return res.send(quizes);
};
exports.getQuizeById = (req, res) => {};
exports.deleteQuize = async (req, res) => {};
exports.updateQuize = async (req, res) => {};
