const express = require("express");
const path = require("path");
const {
  getDailyTask,
  CreateDailyTask,
  getDailyTaskById,
  deleteDailyTask,
  updateDailyTask,
  updateDailyTaskByUser,
} = require("../Controllers/dailytasks");
const multer = require("multer");
const verifyUser = require("../Middleware/userverify");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "image") {
      cb(null, "uploads/dailytask");
    } else {
      cb(null, "uploads/dailytask/logo");
    }
  },
  filename: function (req, file, cb) {
    if (file.fieldname == "image") {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    } else {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
  },
});
const upload = multer({ storage: storage });
const route = express.Router();
route.get("/dailytask", verifyUser, getDailyTask);
route.post(
  "/dailytask-create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  CreateDailyTask
);
route.get("dailytask/:id", getDailyTaskById);
route.delete("dailytask/:id", deleteDailyTask);
// route.put("dailytask/:id", updateDailyTask);
route.put("/dailytaskbyuser/:id", verifyUser, updateDailyTaskByUser);
module.exports = route;
//
