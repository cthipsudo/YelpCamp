const Review = require("../models/review.js");
const Campground = require("../models/campground.js");

module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash("success", "Your review has been posted!");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // $Pull finds and delete the object
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Your post has been deleted...");
  res.redirect(`/campgrounds/${id}`);
};
