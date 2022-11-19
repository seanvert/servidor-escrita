var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
const User = require("../models/users");
var router = express.Router();

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const myLogger = function (req, res, next) {
  next();
};

router.use(myLogger);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "http://192.168.0.100:3000/",
    failureMessage: true,
  }),
  function (req, res) {
    res.json({ user: req.user });
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (!err) {
      res.redirect("http://192.168.0.100:3000/");
    } else {
      console.log(err);
    }
  });
});

router.post("/signup", (req, res) => {
  User.register(new User(req.body), req.body.password, (err, user) => {
    if (!err) {
      passport.authenticate("local")(req, res, () => {
        console.log(user);
        res.send("cadastrado");
      });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
