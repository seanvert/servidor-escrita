var express = require('express');
var router = express.Router();
const User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log(req.body);
	res.send('respond with a resource');
});

router.get('/new', (req, res, next) => {
	res.send('rota new formulário criar');
});

router.post('/', (req, res, next) => {
	console.log(req.body);
	// TODO: checa se o usuário existe
	// TODO: redirecionar para outra página
	res.send("rota post novo usuário");
});

router.get('/:id', (req, res, next) => {
	res.send('rota get id mostra perfil');
});

router.get('/:id/edit', (req, res, next) => {
	res.send('rota edit formulário de editar perfil');
});

router.put('/:id', (req, res, next) => {
	const updatedUser = req.body.user;
	const filter = {
		_id: req.user._id
	};
	let newUser = User.findOneAndUpdate(filter, updatedConfigs);
	res.json(newUser);
});

router.delete('/:id', (req, res, next) => {
	res.send('rota delete dos usuários');
});

module.exports = router;
