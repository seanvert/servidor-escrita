import { Router } from 'express';

const quotesRouter = Router();
export default quotesRouter;
const Quote = require('../models/quote');
const isLoggedIn = require('../middleware/isLoggedIn');


/* GET quotes listing. */
quotesRouter.get('/', isLoggedIn, function(req, res, next : () => void) {
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

quotesRouter.get('/new', (req, res, next : () => void) => {
	res.send('rota new formulário criar');
});

quotesRouter.post('/', isLoggedIn, (req, res, next : () => void) => {
	console.log(req.body);
	res.send("rota post nova quote");
});

quotesRouter.get('/:id', isLoggedIn, (req, res, next : () => void) => {
	res.send('rota get id mostra quote');
});

quotesRouter.get('/:id/edit', (req, res, next : () => void) => {
	res.send('rota edit formulário de editar quotes');
});

quotesRouter.put('/:id', (req, res, next : () => void) => {
	const updatedUser = req.body.user;
	const filter = {
		_id: req.user._id
	};
	let newUser = User.findOneAndUpdate(filter, updatedConfigs);
	res.json(newUser);
});

quotesRouter.delete('/:id', (req, res, next : () => void) => {
	res.send('rota delete quotes');
});

module.exports = quotesRouter;
