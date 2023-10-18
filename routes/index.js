var express = require('express');
var router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const mongoose = require('mongoose');

const serverStatus = () => {
	return {
		state: 'up',
		dbState: mongoose.STATES[mongoose.connection.readyState]
	};
};
/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
	// TODO: healthcheck da api
	// ver umas coisas para mandar num json

	res.json(serverStatus());
});

router.post('/', function(req, res, next) {
	console.log(req);
});
module.exports = router;
