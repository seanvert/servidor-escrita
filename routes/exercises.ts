import { Router } from 'express';
import passport from 'passport';
const exercisesRouter = Router();
export default exercisesRouter;
const Exercise = require('../models/exercises');
const isLoggedIn = require('../middleware/isLoggedIn');
const User = require('../models/users');
const exerciseMaker = require("../services/exerciseMaker");

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


exercisesRouter.get('/', isLoggedIn, function(req, res, next) {
	const filter = {};
	var json = {};
	Exercise.find(filter, function(err, exercises) {
		json.response = exercises;
		res.json(json);
	});
});

// router.get('/new', (req, res, next : () => void) => {
// 	res.send('formulário para criar novo exercício');
// });

exercisesRouter.post('/', isLoggedIn, (req, res, next : () => void) => {
	Exercise.create({
		name: req.body.name,
		contents: req.body.contents,
		creator: req.user._id,
		defaultConfigs: {
			time: 10,
		}
	}, function(err, next) {
		if (!err) {
			res.redirect(process.env.URL_HOME);
		} else {
			console.log(err);
		}
	});
});

exercisesRouter.get('/:id', isLoggedIn, (req, res, next : () => void) => {
	var exerciseDescription = {};
	Exercise.findById(req.params.id, function(err, exercise) {
		exerciseDescription.response = exerciseMaker(exercise);
		res.json(exerciseDescription);
	});

});

// router.get('/:id/edit', (req, res, next : () => void) => {
// 	res.send('rota formulário para editar exercício');
// });

// router.put('/:id', (req, res, next : () => void) => {
// 	res.send('rota atualizar exercício');
// });

// router.delete('/:id', (req, res, next : () => void) => {
// 	res.send('rota apagar exercício');
// });

module.exports = exercisesRouter;
