import { Router } from 'express';
import passport from 'passport';
import { IUser } from '../models/users';
const isLoggedIn = require('../middleware/isLoggedIn');
const Text = require('../models/texts');
const User = require('../models/users');

const textsRouter = Router();
export default textsRouter;


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const dayInMs = 1000 * 3600 * 24;
const semester = 7 * 4 * 6;

textsRouter.get('/', isLoggedIn, function(req, res, next : () => void) {
	console.log("req user id", req.user._id);
	console.log("session", req.session);
	const filter = {
		owner: req.user._id,
	};
	var json = {};
	Text.find(filter, function(err, texts) {
		json.response = texts;
		console.log(texts);
		res.json(json);
	});
});

// textsRouter.get('/new', (req, res, next : () => void) => {
// 	res.send('rota new formulário criar texto');
// });

function incrementUserActivity(user : IUser) {
	// increments user activity at current index position
	var index = user.activity!.index;
	if(Boolean(user.activity?.activityArray[index])) {
		user.activity!.activityArray[index] += 1;
	} else {
		user.activity!.activityArray[index] = 1;
	}
	// TODO: save user
};

function updateStackIndex(user : IUser, timeElapsedInDays : number) {
	// This function adds 0s from the last activity date until now
	// it doesn't check if the user was active for the last semester
	// TODO: check if stack size plus time elapsed gets over 6 months
	if (timeElapsedInDays + user.activity!.activityArray.length > semester) {
		// trim activity array to fit 6 semesters (168 days)
		// remove the first <timeElapsedInDays> elements from the array
		var updatedActivityArray = user.activity!
			.activityArray.slice(timeElapsedInDays, );
		// from element <timeElapsedInDays> nth to <semester> add a 0
		for(var index = timeElapsedInDays; index < semester; index++) {
			updatedActivityArray[index] = 0;
		};
		user.activity!.activityArray = updatedActivityArray;
		// updates activity index
		user.activity!.index = semester;
	} else {
		// adds 0s
		var finalIndex = user.activity!.index + timeElapsedInDays;
		var updatedActivityArray = user.activity!.activityArray;
		for(var index = user.activity!.index; index < finalIndex; index++) {
			updatedActivityArray[index] = 0;
		};
		user.activity!.activityArray = updatedActivityArray;
		// updates index
		user.activity!.index += timeElapsedInDays;
	}
	// TODO: save user
};

function resetActivityStack (user : IUser) {
	user.activity!.index = 0;
	user.activity!.activityArray = new Array(semester).fill(0);
	// TODO: save user;
};

function insertActivityStack (user : IUser) {
	var now = Date.now();
	// TODO: consertar o ponteiro da stack
	// TODO: ver um jeito de trocar os dias com a meia noite porque vai bugar
	var timeElapsedInDays = now - user.activity!.dateLastActive.getTime();
	if (timeElapsedInDays < dayInMs) {
		// TODO: check stack size
		incrementUserActivity(user);
	} else if (timeElapsedInDays > semester) {
		updateStackIndex(user, timeElapsedInDays);
		incrementUserActivity(user);
	} else {
		// reset stack
		resetActivityStack(user);
		incrementUserActivity(user);
	}

	user.activity!.dateLastActive = new Date;
	// TODO: save User
};



textsRouter.post('/', isLoggedIn, (req, res, next : () => void) => {
	User.findById(req.user!._id, (err, usuarioEncontrado) => {
		if(!err) {
			Text.create({
				owner: usuarioEncontrado._id,
				contents: req.body.contents,
			}, function(err, text) {
				if(!err) {
					usuarioEncontrado.texts.push(text.id);
					usuarioEncontrado.save((err, usuario) => {
						if (!err) {
							console.log("usuario salvo", usuario.texts);
						}
					});
				} else {
					console.log(err);
				}
			});
		} else {
			console.log(err);
		}
	});

	res.redirect(process.env.URL_HOME);
});

textsRouter.get('/:id', isLoggedIn, (req, res, next : () => void) => {
	Text.findById(req.params.id, (err, textoEncontrado) => {
		if(!err) {
			console.log("--------------------");
			// console.log(textoEncontrado);
			// console.log(textoEncontrado.toString());
		} else {
			console.log(err);
		}
	});
	res.send("textoEncontrado");
});

// textsRouter.get('/:id/edit', (req, res, next : () => void) => {
// 	res.send('rota edit formulário de editar perfil');
// });

// textsRouter.put('/:id', (req, res, next : () => void) => {
// 	res.send('rota update dos textos');
// });

// textsRouter.delete('/:id', (req, res, next : () => void) => {
// 	res.send('rota delete dos textos');
// });

module.exports = textsRouter;

