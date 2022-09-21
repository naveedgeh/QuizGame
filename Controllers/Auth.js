const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.Login = (req, res) => {
  return res.send("login");
};
exports.singUp = async (req, res) => {
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
  });
  const user = await userObject.save();
  if (user) {
    return res
      .status(201)
      .json({ message: "Successfully Registered", status: 201, data: user });
  }
};
exports.Login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ email: username });
  if (!user) {
    return res.status(401).json({ message: "Email not found" });
  }
  const match = bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Password is not correct" });
  }
  if (user) {
    const privtateKey = process.env.PRIVATE_KEY;
    const token = jwt.sign({ id: user._id, email: user.email }, privtateKey);
    return res.status(200).json({
      message: "Successfuly Login",
      stutus: 200,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        instaUserName: user.instaUserName,
        profileImage: `http://${process.env.HOST_NAME}:${process.env.PORT}/uploads/userProfile/${user.profileImage}`,
      },
      token,
    });
  }
};
exports.profileUpdate = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ message: "user not found", status: 400 });
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
  return res
    .status(200)
    .json({ message: "Successfully updated", data: profile, status: 200 });
};
