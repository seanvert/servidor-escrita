var express = require('express');
var router = express.Router();
const Quote = require('../models/quote');
const isLoggedIn = require('../middleware/isLoggedIn');


/* GET quotes listing. */
router.get('/', isLoggedIn, function(req, res, next) {
	const filter = {}
	var json = {}
	Quote.find(filter, function(err, quotes) {
		if (!err) {
			json.response = quotes[0];
			res.json(json);
		} else {
			console.log(err);
		}
	});
});

router.get('/new', (req, res, next) => {
	res.send('rota new formulário criar');
});

router.post('/', isLoggedIn, (req, res, next) => {
	console.log(req.body);
	res.send("rota post nova quote");
});

router.get('/:id', isLoggedIn, (req, res, next) => {
	res.send('rota get id mostra quote');
});

router.get('/:id/edit', (req, res, next) => {
	res.send('rota edit formulário de editar quotes');
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
	res.send('rota delete quotes');
});

module.exports = router;
