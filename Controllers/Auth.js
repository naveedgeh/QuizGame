const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("../Models/dailytasks");

exports.singUp = async (req, res) => {
  const ur = await User.findOne({ email: req.body.email });
  console.log(ur);
  if (ur) return res.send("User already register");
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordhash = bcrypt.hashSync(req.body.password, salt);
  const userObject = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    instaUserName: req.body.instaUserName,
    email: req.body.email,
    password: passwordhash,
    profileImage: req.file.originalname,
    dzcoinPoint: req.body.dzcoinPoint || 0,
  });
  const user = await userObject.save();
  if (user) {
    return res.send(user);
  }
};
exports.Login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ email: username });
  if (!user) {
    return res.send("Email not found");
  }
  const match = bcrypt.compare(password, user.password);
  if (!match) {
    return res.send("Password is not correct");
  }
  if (user) {
    const privtateKey = process.env.PRIVATE_KEY;
    const token = jwt.sign({ id: user._id, email: user.email }, privtateKey);
    return res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      instaUserName: user.instaUserName,
      profileImage: `http://${process.env.HOST_NAME}:${process.env.PORT}/uploads/userProfile/${user.profileImage}`,
      token,
    });
  }
};
exports.profileUpdate = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.send("user not found");
  }
  if (req.body.firstName) {
    user.firstName = req.body.firstName;
  }
  if (req.body.lastName) {
    user.lastName = req.body.lastName;
  }
  if (req.body.email) {
    user.email = req.body.email;
  }
  if (req.body.instaUserName) {
    user.instaUserName = req.body.instaUserName;
  }
  if (req.file) {
    user.profileImage = req.file.originalname;
  }
  const profile = await user.save();
  profile.profileImage = `http://${process.env.HOST_NAME}:${process.env.PORT}/uploads/userProfile/${user.profileImage}`;
  return res.send(profile);
};
exports.getTopUser = async (req, res) => {
  const { pagesize } = req.query;
  const users = await User.find({}).sort({ dzcoinPoint: -1 }).limit(pagesize);

  if (users.length == 0) {
    return res.send("data not found");
  }
  users.profileImage = `http://${process.env.HOST_NAME}:${process.env.PORT}/uploads/userProfile/${users.profileImage}`;
  return res.send(users);
};
