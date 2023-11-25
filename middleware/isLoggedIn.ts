import { Request, Response } from "express";

export function isLoggedIn(req : Request, res : Response, next : () => void) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect(process.env.URL_HOME!);
};

export default isLoggedIn;

module.exports = isLoggedIn;
