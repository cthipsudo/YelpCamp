const express = require('express');
const Router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Review = require("../models/review");
const { reviewSchema } = require("../schemas.js");
const ExpressError = require("../utils/ExpressError");

const validateReview = (req, res, next ) => {
  const { error } = reviewSchema.validate(req.body || {});
  if(error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};


Router.post("/", validateReview, async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id)
  const review = new Review(req.body.review);
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
});

Router.delete("/:reviewId", async (req, res) => {
  const {id, reviewId } = req.params;
  Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}); // $Pull finds and delete the object 
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/campgrounds/${id}`)
  //res.send('DELETE ME!');
  
});

module.exports = Router;