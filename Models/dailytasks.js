const mongoose = require("mongoose");

const DailyTaskSchema = new mongoose.Schema(
  {
    title: { type: String },
    image: { type: String },
    logo: { type: String },
    socialurl: { type: String },
    user: [String],
    clicked: { type: String },
  },
  { timestamps: true }
);
const DailyTask = mongoose.model("DailyTask", DailyTaskSchema);
module.exports = DailyTask;
