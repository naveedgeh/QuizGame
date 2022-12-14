const express = require("express");
const {
  Login,
  singUp,
  profileUpdate,
  getTopUser,
} = require("../Controllers/Auth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/UserProfile");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const route = express.Router();
route.post("/login", Login);
route.post("/singup", upload.single("profileImage"), singUp);
route.put("/profileudate/:id", upload.single("profileImage"), profileUpdate);
route.get("/topuser", getTopUser);
module.exports = route;
