var express = require('express');
var router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');


/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
	// TODO: healthcheck da api
	// ver umas coisas para mandar num json
	res.send('index');
});

router.post('/', function(req, res, next) {
	console.log(req);
});
module.exports = router;
