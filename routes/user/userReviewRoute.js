const {
  createReview,
  deleteReview,
  getMyReviews,
} = require("../../controller/user/review/reviewController");
const isAuthenticated = require("../../middleware/isAuthenticated");
const catchAsync = require("../../services/catchAsync");

const router = require("express").Router();

router
  .route("/:id")
  .delete(isAuthenticated, catchAsync(deleteReview))
  .post(isAuthenticated, catchAsync(createReview));

router.route("/").get(isAuthenticated, catchAsync(getMyReviews));

module.exports = router;
