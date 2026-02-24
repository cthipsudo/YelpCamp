const express = require('express');
const Router = express.Router({mergeParams: true});
const Campground = require("../models/campground.js");
const Review = require("../models/review.js");
const { validateReview } = require("../middleware.js");



Router.post("/", validateReview, async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id)
  const review = new Review(req.body.review);
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash('success', "Your review has been posted!")
  res.redirect(`/campgrounds/${campground._id}`);
});

Router.delete("/:reviewId", async (req, res) => {
  const {id, reviewId } = req.params;
  Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}); // $Pull finds and delete the object 
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', "Your post has been deleted...")
  res.redirect(`/campgrounds/${id}`);
  
});

module.exports = Router;