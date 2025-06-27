const User = require("./model/userModel");
const bcrypt = require("bcrypt");

const adminSeeder = async () => {
  const isAdminExist = await User.findOne({ userEmail: "admin@gmail.com" });
  if (!isAdminExist) {
    await User.create({
      userEmail: process.env.ADMIN_EMAIL,
      userPassword: bcrypt.hashSync(process.env.ADMIN_PASS, 10),
      userName: "admin",
      userPhoneNumber: 9845211126,
      role: "admin",
    });
    console.log("admin seeded successfully");
  } else {
    console.log("Admin already seeded");
  }
};

module.exports = adminSeeder;
