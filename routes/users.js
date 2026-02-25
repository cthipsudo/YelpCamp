const express = require("express");
const router = express.Router();
const user = require("../controllers/user.js");
const passport = require("passport");
const { storeReturnTo } = require("../middleware.js");

router.route("/register").get(user.renderRegister).post(user.register);

router
  .route("/login")
  .get(user.renderLogin)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    user.login,
  );

router.get("/logout", user.logout);

module.exports = router;
