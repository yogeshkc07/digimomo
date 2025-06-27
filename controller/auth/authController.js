const User = require("../../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const sendEmail = require("../../services/sendEmail");

//register user
exports.registerUser = async (req, res) => {
  const { email, password, phoneNumber, username } = req.body;
  if (!email || !password || !phoneNumber || !username) {
    return res.status(400).json({
      message: "Please provide email,password ,phone number and usernmae",
    });
  }

  //check if that user already registered with that email or not
  const userFound = await User.find({ userEmail: email });
  if (userFound.length > 0) {
    return res.status(400).json({
      message: "User with that email already exists",
    });
  }

  await User.create({
    userEmail: email,
    userPassword: bcrypt.hashSync(password, 12),
    userPhoneNumber: phoneNumber,
    userName: username,
  });

  res.status(200).json({
    message: "user registered successfully",
  });
};

//login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      message: "Please enter email and password",
    });
  }

  const userFound = await User.findOne({ userEmail: email });
  if (!userFound) {
    res.status(404).json({
      message: "User with that email doesnot exist",
    });
  }

  const isMatched = bcrypt.compareSync(password, userFound.userPassword);
  if (isMatched) {
    const token = jwt.sign({ id: userFound._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    res.status(200).json({
      message: "User logged in",
      token,
    });
  } else {
    res.status(400).json({
      message: "Invalid Password",
    });
  }
};

//forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  //checks if user send email or not
  if (!email) {
    return res.status(400).json({
      message: "Please provide email",
    });
  }

  //check if the user exist or not
  const userFound = await User.findOne({ userEmail: email });
  if (!userFound) {
    return res.status(404).json({
      message: "User with that email doesnot exist",
    });
  }

  //generate otp
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  userFound.otp = otp;
  await userFound.save();

  await sendEmail({
    email: email,
    subject: "Your One Time Password for DigitalMomo ",
    message: `Your Otp for DigitalMomo is ${otp}. Don't share with anyone`,
  });
  res.status(200).json({
    message: "OTPs sent successfully",
  });
};

//verify otp

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(404).json({
      message: "Please enter email and otp",
    });
  }

  const userExists = await User.findOne({ userEmail: email });
  if (!userExists) {
    return res.status(400).json({
      message: "Email not registered",
    });
  }
  if (userExists.otp != otp) {
    res.status(400).json({
      message: "Otp incorrect",
    });
  } else {
    userExists.otp = undefined;
    userExists.isVerifiedOtp = true;
    await userExists.save();
    res.status(200).json({
      message: "Otp is correct",
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "Please enter email,new password an confirm password",
    });
  }
  if (newPassword != confirmPassword) {
    return res.status(400).json({
      message: "New password and confirm Password doesnot match",
    });
  }

  const userExists = await User.findOne({ userEmail: email });

  if (!userExists) {
    return res.status(400).json({
      message: "Email is not registered",
    });
  }
  if (!userExists.isVerifiedOtp) {
    return res.status(403).json({
      message: "You are not allowed to do this",
    });
  }
  userExists.userPassword = bcrypt.hashSync(newPassword, 10);
  userExists.isVerifiedOtp = false;
  await userExists.save();
  res.status(200).json({
    message: "Password changed successfully",
  });
};
