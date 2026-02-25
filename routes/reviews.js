const express = require("express");
const Router = express.Router({ mergeParams: true });
const review = require("../controllers/reviews.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

Router.post("/", isLoggedIn, validateReview, review.createReview);

Router.delete("/:reviewId", isLoggedIn, isReviewAuthor, review.deleteReview);

module.exports = Router;
