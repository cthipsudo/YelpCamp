const express = require('express');
const Router = express.Router();
const Campground = require("../models/campground");
const ExpressError = require("../utils/ExpressError");

const { campgroundSchema } = require("../schemas.js");

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body || {});
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

Router.get("/", async (req, res) => {
  const campgrounds = await Campground.find();
  res.render("campgrounds/index", { campgrounds });
});

Router.post("/", validateCampground, async (req, res, next) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  req.flash('success', 'Successfully made a new campground!');
  res.redirect(`/campgrounds/${campground._id}`);
});

Router.get("/new", (req, res) => {
  res.render("campgrounds/new");
});

Router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id).populate('reviews');
  if(!campground) {
    req.flash('error', 'The campground you are searching for, does not exist');
    return res.redirect('/campgrounds');
  }
  res.render("campgrounds/show", { campground });
});

Router.put("/:id", validateCampground, async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  if(!campground) {
    req.flash('error', 'The campground you are trying to edit, does not exist');
    return res.redirect('/campgrounds');
  }
  req.flash('success', "You've successfully updated the campground!")
  res.redirect(`/campgrounds/${campground._id}`);
});

Router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash('success', "Successfully deleted campground.")
  res.redirect(`/campgrounds`);
});

Router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/edit", { campground });
});

module.exports = Router;