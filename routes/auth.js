import { Router } from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
const User = require("../models/users");
const Exercise = require('../models/exercises');
const isLoggedIn = require('../middleware/isLoggedIn');
const authRouter = Router();
export default authRouter;
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
authRouter.post("/login", passport.authenticate("local", {
    failureRedirect: process.env.URL_HOME,
    // successRedirect: "http://192.168.0.100:3000/",
    failureMessage: true,
}), function (req, res, next) {
    req.login(req.user, err => {
        if (!err) {
            res.send({ user: req.user });
        }
        else {
            console.log(err);
        }
        next();
    });
});
authRouter.get("/", (req, res, next : () => void) => {
    // req.session.destroy();
    console.log(req.signedCookies);
    console.log(req.session);
});
authRouter.get("/logout", isLoggedIn, (req, res, next : () => void) => {
    // req.session.destroy();
    req.logout((err) => {
        if (!err) {
            res.clearCookie('connection.sid', { path: '/' })
                .status(200).redirect(process.env.URL_HOME);
        }
        else {
            console.log(err);
        }
    });
});
authRouter.post("/signup", (req, res) => {
    // make default configs array of current exercises
    // before creating user
    var defaultConfigs = [];
    // lookup exercises
    Exercise.find({}, (err, exercises) => {
        // loop through default configs
        if (!err) {
            exercises.map((exercise, index) => {
                defaultConfigs[index] = {
                    exercise: exercise._id,
                    config: {
                        completed: false,
                        time: exercise.defaultConfigs.time,
                        defaultExercise: exercise.defaultConfigs.defaultExercise
                    }
                };
            });
        }
    });
    // insert default configs in the user config array
    // user registering logic
    var newUser = new User(req.body);
    newUser.configs = defaultConfigs;
    User.register(newUser, req.body.password, (err, user) => {
        if (!err) {
            passport.authenticate("local")(req, res, () => {
                res.redirect(process.env.URL_HOME);
            });
        }
        else {
            console.log(err);
        }
    });
});
module.exports = authRouter;
