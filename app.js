const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var textsRouter = require('./routes/texts');
var authRouter = require('./routes/auth');
var exercisesRouter = require('./routes/exercises');


const options = {
	user: "root",
	pass: "example",
	useNewUrlParser: true,
	autoIndex: false, // Don't build indexes
	// If not connected, return errors immediately rather than waiting for reconnect
	connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	family: 4 // Use IPv4, skip trying IPv6
};

const DB_URL = 'mongodb://localhost:27017';


async function dbConnect() {
	await mongoose.connect(DB_URL, options);
	mongoose.connection.useDb("escrita");
}
dbConnect();

// TODO ver este warning
// liente-escrita-servidor-escrita-1  | Warning: connect.session() MemoryStore is not
// cliente-escrita-servidor-escrita-1  | designed for a production environment, as it will leak
// cliente-escrita-servidor-escrita-1  | memory, and will not scale past a single process.


const serverStatus = () => {
	return {
		state: 'up',
		dbState: mongoose.STATES[mongoose.connection.readyState]
	};
};

const app = express();
const port = 8000;

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

module.exports = app;

