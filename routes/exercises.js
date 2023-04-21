var express = require('express');
var router = express.Router();
const Exercise = require('../models/exercises');
const isLoggedIn = require('../middleware/isLoggedIn');
const User = require('../models/users');
var passport = require("passport");

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
	const filter = {};
	var json = {};
	Exercise.find(filter, function(err, exercises) {
		json.response = exercises;
		console.log(json);
		res.json(json);
	});
});

router.get('/new', (req, res, next) => {
	res.send('formulário para criar novo exercício');
});

router.post('/', (req, res, next) => {
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

router.get('/:id', (req, res, next) => {
	res.send('rota get exercício');
});

router.get('/:id/edit', (req, res, next) => {
	res.send('rota formulário para editar exercício');
});

router.put('/:id', (req, res, next) => {
	res.send('rota atualizar exercício');
});

router.delete('/:id', (req, res, next) => {
	res.send('rota apagar exercício');
});

module.exports = router;
