const express = require("express");
const Router = express.Router();
const user = require("../controllers/user.js");
const passport = require("passport");
const { storeReturnTo } = require("../middleware.js");

Router.get("/register", user.renderForm);

Router.post("/register", user.createUser);

Router.get("/login", user.renderLogin);

Router.post(
  "/login",
  storeReturnTo,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  user.login,
);

Router.get("/logout", user.logout);

module.exports = Router;
