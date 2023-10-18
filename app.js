const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// TODO: https://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely
// tirar o expreess-session e usar o cookie-session no lugar
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const populateDb = require("./populateDb");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var textsRouter = require('./routes/texts');
var authRouter = require('./routes/auth');
var exercisesRouter = require('./routes/exercises');
var quotesRouter = require('./routes/quotes');
var morgan = require('morgan');

const options = {
	user: "root",
	pass: "example",
	useNewUrlParser: true,
	autoIndex: false, // Don't build indexes
	connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	family: 4 // Use IPv4, skip trying IPv6
};

const DB_URL = "mongodb://localhost:27017";


async function dbConnect() {
	await mongoose.connect(DB_URL, options);
	mongoose.connection.useDb("escrita");
}
dbConnect();

//if (true) {
//	populateDb();
//}

// route do healthcheck da api
const serverStatus = () => {
	return {
		state: 'up',
		dbState: mongoose.STATES[mongoose.connection.readyState]
	};
};

const app = express();
app.use(morgan('tiny'))

app.use(cors({
    origin: ["http://192.168.0.100:3000", "http://192.168.0.101:3000"],
	allowedHeaders: ['Content-Type', 'Authorization',
					 'access-control-allow-credentials',
					'upgrade-insecure-requests'],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: "false",
	credentials: true,
}));

app.use(cookieParser('mysecret that I will change later'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
	// TODO: change secret key
	// TODO: insert an environment variable here
	secret: 'mysecret that I will change later',
	resave: false,
	saveUninitialized: false,
	// TODO: insert sessions into database
}));


app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/exercises', exercisesRouter);
app.use('/auth', authRouter);
app.use('/texts', textsRouter);
app.use('/texts', textsRouter);
app.use('/quotes', quotesRouter);
module.exports = app;

