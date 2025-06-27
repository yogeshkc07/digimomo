const User = require("../../../model/userModel");

exports.getUsers = async (req, res) => {
  const Userid = req.user.id;
  const users = await User.find({ _id: { $ne: Userid } }).select(["-__v"]);
  if (users.length > 1) {
    res.status(200).json({
      message: "User fetched successfully",
      data: users,
    });
  } else {
    res.status(400).json({
      message: "No user found",
      data: [],
    });
  }
};

//delete user

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400).json({
      message: "please provide User id",
    });
  }
  const user = await User.findById(userId);
  if (!user) {
    res.status(400).json({
      message: "user with tha Id doesnot exist",
    });
  } else {
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      message: "User deleted successfully",
    });
  }
};
