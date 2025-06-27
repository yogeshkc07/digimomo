const express = require("express");
const app = express();

const { connectDatabase } = require("./database/database");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");

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

app.use("/api", authRoute);
app.use("/api", productRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
