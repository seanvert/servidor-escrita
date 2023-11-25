import { Router } from 'express';
import mongoose from 'mongoose';
const indexRouter = Router();
export default indexRouter;
const isLoggedIn = require('../middleware/isLoggedIn');
const serverStatus = () => {
    return {
        state: 'up',
        dbState: mongoose.STATES[mongoose.connection.readyState]
    };
};
/* GET home page. */
indexRouter.get('/', isLoggedIn, function (req, res, next) {
    // TODO: healthcheck da api
    // ver umas coisas para mandar num json
    res.json(serverStatus());
});
indexRouter.post('/', function (req, res, next) {
    console.log(req);
});
module.exports = indexRouter;
