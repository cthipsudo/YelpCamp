const express = require("express");
const Router = express.Router();
const campgrounds = require("../controllers/campgrounds.js");

const {
  isLoggedIn,
  validateCampground,
  isAuthor,
} = require("../middleware.js");

Router.route("/")
  .get(campgrounds.index)
  .post(isLoggedIn, validateCampground, campgrounds.createCampground);

Router.get("/new", isLoggedIn, campgrounds.renderNewForm);

Router.route("/:id")
  .get(campgrounds.showCampground)
  .put(isLoggedIn, isAuthor, validateCampground, campgrounds.updateCampground)
  .delete(isLoggedIn, isAuthor, campgrounds.deleteCampground);

Router.get("/:id/edit", isLoggedIn, isAuthor, campgrounds.renderEditForm);
module.exports = Router;
