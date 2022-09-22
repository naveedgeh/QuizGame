const QnA = require("../Models/QnA");
const Quize = require("../Models/Quize");
exports.addQna = async (req, res) => {
  const quizeObject = await Quize.findById(req.body.quize);
  if (!quizeObject) {
    return res.send("invalid quize");
  }
  const QnAObject = new QnA({
    qustion: req.body.question,
    options: req.body.options,
    quize: {
      _id: quizeObject._id,
      title: quizeObject.title,
      time: quizeObject.time,
    },
    answer: req.body.answer,
  });
  const qna = await QnAObject.save();
  if (!qna) {
    res.send("please contact with developer");
  }
  res.send(qna);
};
exports.getQna = async (req, res) => {
  const qna = await QnA.aggregate([{ $sample: { size: 4 } }]);
  if (qna.length != 0) {
    return res.send(qna);
  }
  return res.send("Data not found");
};
exports.getQnaById = (req, res) => {};
exports.deleteQna = async (req, res) => {};
exports.updateQna = async (req, res) => {};
