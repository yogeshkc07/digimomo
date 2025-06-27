const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A review must belongs to User"],
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "A review must be done to Product"],
  },
  rating: {
    type: Number,
    default: 3,
  },
  message: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
