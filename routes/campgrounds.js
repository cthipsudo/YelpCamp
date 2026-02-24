const express = require('express');
const Router = express.Router();
const Campground = require("../models/campground");
const { isLoggedIn, validateCampground, isAuthor  } = require('../middleware.js')

Router.get("/", async (req, res) => {
  const campgrounds = await Campground.find();
  res.render("campgrounds/index", { campgrounds });
});

Router.post("/", isLoggedIn, validateCampground, async (req, res, next) => {
  const campground = new Campground(req.body.campground);
  campground.author = req.user._id; // req.user is added by passport
  await campground.save();
  req.flash('success', 'Successfully made a new campground!');
  res.redirect(`/campgrounds/${campground._id}`);
});

Router.get("/new", isLoggedIn,(req, res) => {
  res.render("campgrounds/new");
});

Router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id).populate('reviews').populate('author');
  console.log(campground);
  if(!campground) {
    req.flash('error', 'The campground you are searching for, does not exist');
    return res.redirect('/campgrounds');
  }
  res.render("campgrounds/show", { campground });
});

Router.get("/:id/edit", isLoggedIn, isAuthor, async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if(!campground){
    req.flash("error", "cannot find that campground");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/edit", { campground });
});

Router.put("/:id", isLoggedIn,isAuthor,validateCampground, async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  req.flash('success', "You've successfully updated the campground!")
  res.redirect(`/campgrounds/${campground._id}`);
});

Router.delete("/:id", isLoggedIn, isAuthor, async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash('success', "Successfully deleted campground.")
  res.redirect(`/campgrounds`);
});

module.exports = Router;