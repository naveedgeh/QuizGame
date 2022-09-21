const dailyTasks = require("../Models/dailytasks");
exports.getDailyTask = async (req, res) => {
  const { id } = req.body.user;
  const { pageNumber, pageSize } = req.query;
  console.log(id);
  const dailyTask = await dailyTasks
    .find({
      user: { $nin: [id] },
      timestamp: {
        $lt: new Date(),
        $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
    })
    .skip((Number(pageNumber) - 1) * Number(pageSize))
    .limit(pageSize)
    .sort({ createdAt: 1 });
  if (dailyTask.length == 0) {
    return res.status(401).json({ status: 401, message: "Data is not found" });
  }
  dailyTask.map((d) => {
    d.image = `http://${process.env.HOST_NAME}:${process.env.PORT}/uploads/dailytask/${d.image}`;
    d.logo = `http://${process.env.HOST_NAME}:${process.env.PORT}/uploads/dailytask/logo/${d.logo}`;
    return d;
  });
  return res
    .status(200)
    .json({ status: 200, data: { dailyTask }, total: dailyTask.length });
};
exports.CreateDailyTask = async (req, res) => {
  const dailyObject = new dailyTasks({
    title: req.body.slierCaption,
    image: req.files.image[0].filename,
    logo: req.files.logo[0].filename,
    socialurl: req.body.socialurl,
  });
  const dailyTask = await dailyObject.save();
  if (dailyTask) {
    return res
      .status(201)
      .json({ message: "Successfully Created", status: 201 });
  }
};
exports.updateDailyTaskByUser = async (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const task = await dailyTasks.updateOne(
    { _id: id },
    { $push: { user: user.id } }
  );
  if (!task) {
    return res.status(400).json({ message: "Task is not found", status: 400 });
  }
  return res
    .status(200)
    .json({ message: "successfully update task", data: task, status: 200 });
};
exports.DailyTaskClicked = () => {};
exports.getDailyTaskById = (req, res) => {};
exports.deleteDailyTask = async (req, res) => {};
exports.updateDailyTask = async (req, res) => {};
