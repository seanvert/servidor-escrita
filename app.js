const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// TODO: https://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely
// tirar o expreess-session e usar o cookie-session no lugar
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const populateDb = require('./populateDb');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const textsRouter = require('./routes/texts');
const authRouter = require('./routes/auth');
const exercisesRouter = require('./routes/exercises');
const quotesRouter = require('./routes/quotes');
require('dotenv').config();

const { DB_USER } = process.env;
const { DB_PASS } = process.env;
const { DB_URL } = process.env;
const { SECRET_KEY } = process.env;
const { DEBUG } = process.env;
const options = {
  user: DB_USER,
  pass: DB_PASS,
  useNewUrlParser: true,
  autoIndex: false, // Don't build indexes
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

async function dbConnect() {
  mongoose.connect(DB_URL, options);
  mongoose.connection.useDb('escrita');
}
dbConnect();

if (DEBUG) {
  populateDb();
}

// route do healthcheck da api
const serverStatus = () => ({
  state: 'up',
  dbState: mongoose.STATES[mongoose.connection.readyState],
});

const app = express();
app.use(morgan('tiny'));

app.use(cors({
  origin: ['http://192.168.0.100:3000', 'http://192.168.0.101:3000'],
  allowedHeaders: ['Content-Type', 'Authorization',
    'access-control-allow-credentials',
    'upgrade-insecure-requests'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: 'false',
  credentials: true,
}));

app.use(cookieParser(SECRET_KEY));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  // TODO: change secret key
  // TODO: insert an environment variable here
  secret: SECRET_KEY,
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
