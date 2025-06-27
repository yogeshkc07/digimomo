const mongoose = require("mongoose");
const adminSeeder = require("../adminSeeder");

exports.connectDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Database connected successfully");

  //admin seeding
  adminSeeder();
};
