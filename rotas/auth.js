var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const User = require('../models/users');
var router = express.Router();


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// router.post('/login', passport.authenticate('local', {
// 	successReturnToOrRedirect: 'http://192.168.0.100:3000/',
// 	failureRedirect: 'http://192.168.0.100:3000/login',
// }));
const myLogger = function (req, res, next) {
	// console.log(req);
	// console.log(req.params);
	// console.log(req.query);
	// console.log(req.body);
	// console.log(res);
	next();
};

router.use(myLogger);
router.post('/login',
			passport.authenticate('local',
								  { failureRedirect: 'http://192.168.0.100:3000/',
									failureMessage: true }),
			function(req, res) {
				res.cookie('configs',
						   {
							   teste: 'asd',
						   },
						   {
							   // TODO: trocar este número para uma data definida
							   expires: new Date(Date.now() + 9000000000)
						   })
					.json({user: req.user});
			});


// router.post('/login', cors(), passport.authenticate(
// 	'local',
// 	{
// 		failureRedirect: 'http://192.168.0.100:3000/login',
// 		failureMessage: true
// 	}), function(req, res, next) {
// 		console.log("request server");
// 		console.log(req.headers);
// 		console.log(req.body);
// 		console.log("unsigned", req.cookies);
// 		console.log("signed", req.signedCookies);

// 		res.redirect("http://192.168.0.100:3000/");
// 		// res.status(301);

// 	});

router.get('/logout', (req, res, next) => {
	req.logout((err) => {
		if(!err) {
			res.redirect('http://192.168.0.100:3000/');
		} else {
			console.log(err);
		}
	});

});

router.post('/signup', (req, res) => {
	User.register(new User(req.body),
				  req.body.password, (err, user) => {
					  if(!err) {
						  passport.authenticate('local')(req, res, () => {
							  console.log(user);
							  res.send("cadastrado");
						  });
					  } else {
						  console.log(err);
					  }
				  });
});

module.exports = router;
