const express = require("express");
const Router = express.Router();
const campgrounds = require("../controllers/campgrounds.js");
const multer = require("multer");
const { storage } = require("../cloudinary"); // node automatically looks for index.js
const upload = multer({ storage });

const {
  isLoggedIn,
  validateCampground,
  isAuthor,
  saveSession,
} = require("../middleware.js");

Router.route("/")
  .get(campgrounds.index)
  // .post(isLoggedIn, validateCampground, campgrounds.createCampground)
  .post(upload.array("image"), (req, res) => {
    console.log(req.body, req.files);
    res.send("It worked!");
  });

Router.get("/new", isLoggedIn, campgrounds.renderNewForm);

Router.route("/:id")
  .get(saveSession, campgrounds.showCampground)
  .put(isLoggedIn, isAuthor, validateCampground, campgrounds.updateCampground)
  .delete(isLoggedIn, isAuthor, campgrounds.deleteCampground);

Router.get("/:id/edit", isLoggedIn, isAuthor, campgrounds.renderEditForm);
module.exports = Router;
