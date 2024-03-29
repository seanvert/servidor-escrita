import { Router } from 'express';
import passport from 'passport';
const usersRouter = Router();
export default usersRouter;
const User = require('../models/users');
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
const isLoggedIn = require('../middleware/isLoggedIn');
/* GET users listing. */
// router.get('/', function(req, res, next) {
// 	console.log(req.body);
// 	res.send('respond with a resource');
// });
// router.get('/new', (req, res, next : () => void) => {
// 	res.send('rota new formulário criar');
// });
// router.post('/', (req, res, next : () => void) => {
// 	console.log(req.body);
// 	res.send("rota post novo usuário");
// });
// router.get('/:id', (req, res, next : () => void) => {
// 	res.send('rota get id mostra perfil');
// });
// router.get('/:id/edit', (req, res, next : () => void) => {
// 	res.send('rota edit formulário de editar perfil');
// });
// TODO descobrir o que é aquele updatedConfigs
usersRouter.put('/:id', isLoggedIn, (req, res, next : () => void) => {
    const updatedUser = req.body.user;
    const filter = {
        _id: req.user._id
    };
    let newUser = User.findOneAndUpdate(filter, updatedUser);
    res.json(newUser);
});
// TODO: implementar o delete na DB
usersRouter.delete('/:id', (req, res, next : () => void) => {
    res.send('rota delete dos usuários');
});
module.exports = usersRouter;
