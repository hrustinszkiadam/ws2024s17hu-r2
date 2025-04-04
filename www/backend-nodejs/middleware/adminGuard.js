import db from '../db.js';

const adminGuard = (req, res, next) => {
	const authString = req.headers.authorization;
	if (!authString) return res.sendStatus(403);

	const token = authString.split(' ')[1];
	if (!token.length === 9) return res.sendStatus(403);

	db.query('SELECT * FROM runners WHERE token = ?', [token], (_, results) => {
		if (!results.length) return res.sendStatus(403);

		const user = results[0];
		if (!user.isAdmin || user.teamId !== req.teamId) return res.sendStatus(403);
		req.user = user;
		next();
	});
};

export default adminGuard;
