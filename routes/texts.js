var express = require('express');
var router = express.Router();
const Text = require('../models/texts');
const User = require('../models/users');

const dayInMs = 1000 * 3600 * 24;
const semester = 7 * 4 * 6;

const myLogger = function (req, res, next) {
	console.log(req);
  next();
};

router.use(myLogger);

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/new', (req, res, next) => {
	res.send('rota new formulário criar texto');
});

function incrementUserActivity(user) {
	// increments user activity at current index position
	var index = user.activity.index;
	if(Boolean(user.activity.activityArray[index])) {
		user.activity.activityArray[index] += 1;
	} else {
		user.activity.activityArray[index] = 0;
		user.activity.activityArray[index] += 1;
	}
	// TODO: save user
};

function updateStackIndex(user, timeElapsedInDays) {
	// This function adds 0s from the last activity date until now
	// it doesn't check if the user was active for the last semester
	// TODO: check if stack size plus time elapsed gets over 6 months
	if (timeElapsedInDays + user.activity.activityArray.length > semester) {
		// trim activity array to fit 6 semesters (168 days)
		// remove the first <timeElapsedInDays> elements from the array
		var updatedActivityArray = user.activity
			.activityArray.slice(timeElapsedInDays, );
		// from element <timeElapsedInDays> nth to <semester> add a 0
		for(var index = timeElapsedInDays; index < semester; index++) {
			updatedActivityArray[index] = 0;
		};
		user.activity.activityArray = updatedActivityArray;
		// updates activity index
		user.activity.index = semester;
	} else {
		// adds 0s
		var finalIndex = user.activity.index + timeElapsedInDays;
		var updatedActivityArray = user.activity.activityArray;
		for(var index = userActivity.index; index < finalIndex; index++) {
			updatedActivityArray[index] = 0;
		};
		user.activity.activityArray = updatedActivityArray;
		// updates index
		user.activity.index += timeElapsedInDays;
	}
	// TODO: save user
};

function resetActivityStack (user) {
	user.activity.index = 0;
	user.activity.activityArray = new Array(semester).fill(0);
	// TODO: save user;
}

function insertActivityStack (user) {
	var now = Date.now();
	// TODO: consertar o ponteiro da stack
	// TODO: ver um jeito de trocar os dias com a meia noite porque vai bugar
	var timeElapsedInDays = now - user.activity.dateLastActive;
	if (timeElapsedInDays < dayInMs) {
		// TODO: check stack size
		incrementUserActivity(user);
	} else if (timeElapsed > semester) {
		updateStackIndex(user);
		incrementUserActivity(user);
	} else {
		// reset stack
		resetActivityStack(user);
		incrementUserActivity(user);
	}

	user.activity.dateLastActive = Date.now();
	// TODO: save User
}

router.post('/', (req, res, next) => {
	User.findById(req.user._id, (err, usuarioEncontrado) => {
		if(!err) {

			Text.create({
				contents: req.body.conteudo,
			}, function(err, text) {
				// console.log("texto:");
				// console.log(text);
				if(!err) {
					usuarioEncontrado.texts.push(text.id);
					usuarioEncontrado.save((err, usuario) => {
						// console.log("usuario:");
						// console.log(usuario);
					});
				} else {
					console.log(err);
				}
			});
		} else {
			console.log(err);
		}
	});

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

