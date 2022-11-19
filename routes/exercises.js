var express = require('express');
var router = express.Router();
const Exercise = require('../models/exercises');
const User = require('../models/users');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log(req.body);
	res.send('lista de exercícios');
});

router.get('/new', (req, res, next) => {
	res.send('formulário para criar novo exercício');
});

router.post('/', (req, res, next) => {
	console.log(req.body);
	// TODO: checa se o usuário existe
	// TODO: redirecionar para outra página
	res.send("rota post novo exercício");
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
