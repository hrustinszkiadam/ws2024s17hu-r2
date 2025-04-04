import { Router } from 'express';
import db from '../db.js';
import teamId from '../middleware/teamId.js';
import teamsRouter from './teamsRouter.js';
import runnersRouter from './runnersRouter.js';

const router = Router();

router.post(
	'/login',
	(req, res, next) => {
		const { token } = req.body;
		if (!token) return next();

		db.query(
			'SELECT * FROM runners WHERE token = ?',
			[token],
			(err, results) => {
				if (err || !results.length) return next();

				return res.send({
					status: 'success',
					user: results[0],
				});
			}
		);
	},
	(_, res) => {
		res.status(401).send({
			status: 'error',
			message: 'Login failed',
		});
	}
);

router.get('/stages', (_, res) => {
	db.query('SELECT * FROM stages', (_, results) => {
		return res.send(results);
	});
});

router.use('/teams/:teamId', teamId, teamsRouter);
router.use('/teams/:teamId/runners', teamId, runnersRouter);

export default router;
