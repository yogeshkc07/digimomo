const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({
      message: "please login",
    });
  }
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(400).json({
        message: "Please dont try to do this",
      });
    }

    //check whether the token and id match or not
    const userExists = await User.findOne({ _id: decoded.id });
    if (!userExists) {
      return res.status(400).json({
        message: "User with that token/id not found",
      });
    }
    req.user = userExists;
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = isAuthenticated;
