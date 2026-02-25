const express = require("express");
const Router = express.Router();
const campgrounds = require("../controllers/campgrounds.js");

const {
  isLoggedIn,
  validateCampground,
  isAuthor,
} = require("../middleware.js");

Router.get("/", campgrounds.index);

Router.post("/", isLoggedIn, validateCampground, campgrounds.createCampground);

Router.get("/new", isLoggedIn, campgrounds.renderNewForm);

Router.get("/:id", campgrounds.showCampground);

Router.get("/:id/edit", isLoggedIn, isAuthor, campgrounds.renderEditForm);

Router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampground,
  campgrounds.updateCampground,
);

Router.delete("/:id", isLoggedIn, isAuthor, campgrounds.deleteCampground);

module.exports = Router;
