const Prize = require("../Models/Prize");

exports.addPrize = async (req, res) => {
  const prizeObject = new Prize({
    image: req.file.originalname,
    imageUrl: req.body.imageurl,
    actionUrl: req.body.actionurl,
  });
  const prize = await prizeObject.save();
  if (!prize) {
    return res.send("sorry try gain");
  }
  return res.send(prize);
};

exports.getPrize = async (req, res) => {
  const { pagenumber, pagesize } = req.query;
  const prizes = await Prize.find({})
    .skip((pagenumber - 1) * pagesize)
    .limit(pagesize);
  if (prizes.length == 0) {
    return res.send("data not found");
  }
  prizes.map((p) =>
    p.image
      ? (p.image = `http://${process.env.HOST_NAME}:${process.env.PORT}/uploads/prize/${p.image}`)
      : ""
  );
  return res.send(prizes);
};
