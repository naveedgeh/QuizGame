const jwt = require("jsonwebtoken");
const verifyUser = (req, res, next) => {
  const token = req.headers.authentication;
  if (!token) {
    return res.status(401).json({ message: "unauthorized", status: 401 });
  }

  const user = jwt.verify(token, process.env.PRIVATE_KEY);
  if (!user) {
    return res.status(401).json({ message: "invalid token", status: 401 });
  }
  req.body.user = user;
  next();
};
module.exports = verifyUser;
