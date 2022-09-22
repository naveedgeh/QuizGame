const Category = require("../Models/Category");
exports.getCategory = async (req, res) => {
  const category = await Category.find({});
  if (category.length == 0) {
    return res.send("Data is not found");
  }
  category.map(
    (c) =>
      (c.categoryImage = `http://${process.env.HOST_NAME}:${process.env.PORT}/uploads/Category/${c.categoryImage}`)
  );
  return res.send(category);
};
exports.createCategory = async (req, res) => {
  const categoryObject = new Category({
    categoryName: req.body.categoryName,
    categoryImage: req.file.originalname,
  });
  const category = await categoryObject.save();
  if (category) {
    return res.sed("Successfully Created");
  }
};
exports.getCategoryById = (req, res) => {};
exports.deleteCategory = async (req, res) => {};
exports.updateCategory = async (req, res) => {};
