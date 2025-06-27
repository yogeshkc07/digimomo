const Product = require("../../../model/productModel");
const Review = require("../../../model/reviewModel");

exports.createReview = async (req, res) => {
  const userId = req.user.id;
  const { rating, message } = req.body;
  const productId = req.params.id;

  if (!rating || !message || !productId) {
    return res.status(400).json({
      message: "Please provide rating, message and product Id",
    });
  }

  const productExist = await Product.findById(productId);
  if (!productExist) {
    return res
      .status(400)
      .json({ message: "Product does not exist with that Id" });
  }
  await Review.create({
    rating,
    message,
    userId,
    productId,
  });
  res.status(201).json({
    message: "Review added successfully",
  });
};

// exports.getProductReview = async (req, res) => {
//   const productId = req.params.id;
//   if (!productId) {
//     res.status(400).json({
//       message: "Please provide product id",
//     });
//   }
//   const productExist = await Product.findById(productId);
//   if (!productExist) {
//     return res
//       .status(400)
//       .json({ message: "Product does not exist with that Id" });
//   }
//   const reviews = await Review.find({ productId }).populate("userId");
//   res.status(200).json({
//     message: "Review fetched successfully",
//     data: reviews,
//   });
// };

exports.getMyReviews = async (req, res) => {
  const userId = req.user.id;
  const reviews = await Review.find({ userId });
  if (reviews.length == 0) {
    res.status(400).json({
      message: "You haven't given review to any products yet",
      data: [],
    });
  } else {
    res.status(20).json({
      message: "Review Fetched successfully",
      data: reviews,
    });
  }
};

exports.deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  //check if that user created this review

  const userId = req.user.id;
  const review = await Review.findById(reviewId);
  const ownerIdOfReview = review.userId;
  if (ownerIdOfReview !== userId) {
    return res.status(400).json({
      message: "You dont have permission to delete this review",
    });
  }

  if (!reviewId) {
    res.status(400).json({
      message: "Please provide review Id",
    });
  }
  await Review.findByIdAndDelete(reviewId);
  res.status(200).json({
    message: "Review deleted successfully",
  });
};
