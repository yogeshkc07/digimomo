const express = require("express");
const app = express();

const { connectDatabase } = require("./database/database");

const authRoute = require("./routes/auth/authRoute");
const productRoute = require("./routes/admin/productRoute");
const adminUserRoute = require("./routes/admin/adminUserRoute");
const userReviewRoute = require("./routes/user/userReviewRoute");
const profileRoute = require("./routes/user/profileRoute");

require("dotenv").config();
connectDatabase();

//to parse the JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//tell node to give acess to upload folder
app.use(express.static("uploads"));

//to check whether API is working or not
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is working",
  });
});

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/admin", adminUserRoute);
app.use("/api/reviews", userReviewRoute);
app.use("/api/profile", profileRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
