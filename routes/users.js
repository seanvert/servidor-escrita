const isLoggedIn = require('../middleware/isLoggedIn');
var express = require('express');
var router = express.Router();
const User = require('../models/users');
var passport = require("passport");
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/* GET users listing. */
// router.get('/', function(req, res, next) {
// 	console.log(req.body);
// 	res.send('respond with a resource');
// });

// router.get('/new', (req, res, next) => {
// 	res.send('rota new formulário criar');
// });

// router.post('/', (req, res, next) => {
// 	console.log(req.body);
// 	res.send("rota post novo usuário");
// });

// router.get('/:id', (req, res, next) => {
// 	res.send('rota get id mostra perfil');
// });

// router.get('/:id/edit', (req, res, next) => {
// 	res.send('rota edit formulário de editar perfil');
// });

router.put('/:id', isLoggedIn, (req, res, next) => {
	const updatedUser = req.body.user;
	const filter = {
		_id: req.user._id
	};
	let newUser = User.findOneAndUpdate(filter, updatedConfigs);
	res.json(newUser);
});

// TODO: implementar o delete na DB
router.delete('/:id', (req, res, next) => {
 	res.send('rota delete dos usuários');
});

module.exports = router;
