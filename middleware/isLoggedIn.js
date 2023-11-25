export function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect(process.env.URL_HOME);
}
;
module.exports = isLoggedIn;
