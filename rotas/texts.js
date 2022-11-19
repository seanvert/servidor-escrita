var express = require('express');
var router = express.Router();
const Text = require('../models/texts');
const User = require('../models/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', (req, res, next) => {
	res.send('rota new formulário criar texto');
});

router.post('/', (req, res, next) => {
	User.findById(req.user._id, (err, usuarioEncontrado) => {
		if(!err) {
			Text.create({
				contents: req.body.conteudo,
			}, function(err, text) {
				console.log("texto:");
				console.log(text);
				if(!err) {
					usuarioEncontrado.texts.push(text.id);
					usuarioEncontrado.save((err, usuario) => {
						console.log("usuario:");
						console.log(usuario);
					})
				} else {
					console.log(err);
				}
			})
		} else {
			console.log(err);
		}
	})

	res.redirect('http://192.168.0.100:3000/');
});

router.get('/:id', (req, res, next) => {
	Text.findById(req.params.id, (err, textoEncontrado) => {
		if(!err) {
			console.log(textoEncontrado);
			console.log(textoEncontrado.toString());
		} else {
			console.log(err);
		}
	});
	res.send("textoEncontrado");
});

router.get('/:id/edit', (req, res, next) => {
	res.send('rota edit formulário de editar perfil');
});

router.put('/:id', (req, res, next) => {
	res.send('rota update dos textos');
});

router.delete('/:id', (req, res, next) => {
	res.send('rota delete dos textos');
});

module.exports = router;

