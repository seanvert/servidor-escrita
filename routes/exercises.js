var express = require('express');
var router = express.Router();
const Exercise = require('../models/exercises');
const isLoggedIn = require('../middleware/isLoggedIn');
const User = require('../models/users');
var passport = require("passport");
const exerciseMaker = require("../services/exerciseMaker");

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


router.get('/', isLoggedIn, function(req, res, next) {
	const filter = {};
	var json = {};
	Exercise.find(filter, function(err, exercises) {
		json.response = exercises;
		res.json(json);
	});
});

// router.get('/new', (req, res, next) => {
// 	res.send('formulário para criar novo exercício');
// });

router.post('/', isLoggedIn, (req, res, next) => {
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
	// TODO: checa se o usuário existe
	// TODO: redirecionar para outra página

});

router.get('/:id', isLoggedIn, (req, res, next) => {
	// TODO montar tipos de exercício e colocar eles em funções
	var exerciseDescription = {};
	Exercise.findById(req.params.id, function(err, exercise) {
		exerciseDescription.response = exerciseMaker(exercise);
		console.log(exerciseDescription);
		// TODO aqui vai um switch case pra definir a lógica dos exercícios
		// TODO: montar uma função que pega um exercício e dá uma descrição
		res.json(exerciseDescription);
	});

});

// router.get('/:id/edit', (req, res, next) => {
// 	res.send('rota formulário para editar exercício');
// });

// router.put('/:id', (req, res, next) => {
// 	res.send('rota atualizar exercício');
// });

// router.delete('/:id', (req, res, next) => {
// 	res.send('rota apagar exercício');
// });

module.exports = router;
