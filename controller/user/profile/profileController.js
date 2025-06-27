const User = require("../../../model/userModel");
const bcrypt = require("bcrypt");

exports.getMyProfile = async (req, res) => {
  const userId = req.user.id;
  const myProfile = await User.findById(userId);
  res.status(200).json({
    message: "Profile fetched successfully",
    data: myProfile,
  });
};

exports.updateMyProfile = async (req, res) => {
  const { userName, userEmail, userPhoneNumber } = req.body;
  const { userId } = req.user.id;
  const updatedData = await User.findByIdAndUpdate(
    userId,
    {
      userName,
      userEmail,
      userPhoneNumber,
    },
    {
      runValidators: true,
      new: true,
    }
  );
  res.status(200).json({
    message: "Profile updated successfully",
    data: updatedData,
  });
};

//delete my profile

exports.deleteMyProfile = async (req, res) => {
  const userId = req.user.id;
  await User.findByIdAndDelete(userId);
  res.status(200).json({
    message: "Profile delete successfully",
    data: null,
  });
};

//update my password
exports.updateMypassword = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.staatus(400).json({
      message: "Please provide oldPassword,new password and confirm Password",
    });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      message: "New password and old Password doesnot matched",
    });
  }

  //taking out the hash of the old password
  const userData = await User.findById(userId);
  const hashedOldPassword = userData.userPassword;

  //check if oldpassword is correct or not
  const isOldPasswordCorrect = bcrypt.compareSync(
    oldPassword,
    hashedOldPassword
  );
  if (!isOldPasswordCorrect) {
    return res.status(400).json({
      message: "Old passsword didnot matched",
    });
  }

  //when matched

  userData.userPassword = bcrypt.hashSync(newPassword, 12);
  await userData.save();
  res.status(200).json({
    message: "Password changed successfully",
  });
};
