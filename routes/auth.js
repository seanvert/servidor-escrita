var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
const User = require("../models/users");
var router = express.Router();

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const myLogger = function (req, res, next) {
	// console.log(res);
	next();
};


router.use(myLogger);
router.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: process.env.URL_HOME,
		// successRedirect: "http://192.168.0.100:3000/",
		failureMessage: true,
	}),
	function (req, res, next) {
		console.log(req.user);
		req.login(req.user, err =>
			{
				if (!err) {
					res.send({ user: req.user });
				} else {
					console.log(err);
				}
				next();
			});
	}
);

router.get("/", (req, res, next) => {
	// req.session.destroy();
	console.log(req.signedCookies);
	console.log(req.session);
});

router.get("/logout", (req, res, next) => {
	// req.session.destroy();
	req.logout((err) => {
		if (!err) {
			res.redirect(process.env.URL_HOME);
		} else {
			console.log(err);
		}
	});
});

router.post("/signup", (req, res) => {
	User.register(new User(req.body), req.body.password, (err, user) => {
		if (!err) {
			passport.authenticate("local")(req, res, () => {
				res.redirect(process.env.URL_HOME);
			});
		} else {
			console.log(err);
		}
	});
});

module.exports = router;
