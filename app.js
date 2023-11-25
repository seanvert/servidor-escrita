var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
// TODO: https://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely
// tirar o expreess-session e usar o cookie-session no lugar
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import { addNumbers } from './mathUtils';
const result = addNumbers(2, 3);
console.log(result); // Output: 5
import populateDb from './populateDb';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import textsRouter from './routes/texts';
import authRouter from './routes/auth';
import exercisesRouter from './routes/exercises';
import quotesRouter from './routes/quotes';
require('dotenv').config();
const { DB_USER } = process.env;
const { DB_PASS } = process.env;
const { dburl } = process.env;
const DB_URL = dburl;
const { secretkey } = process.env;
const SECRET_KEY = secretkey;
const { DEBUG } = process.env;
const options = {
    user: DB_USER,
    pass: DB_PASS,
    useNewUrlParser: true,
    autoIndex: false,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
};
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose.connect(DB_URL, options);
        mongoose.connection.useDb('escrita');
    });
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
    preflightContinue: false,
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
