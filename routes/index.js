var express = require('express');
var router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');


/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
	// console.log(req);
	// TODO: healthcheck da api
	res.send('index');
});

router.post('/', function(req, res, next) {
	console.log(req);
});
module.exports = router;
