import { Router } from 'express';
import adminGuard from '../middleware/adminGuard.js';
import runnerId from '../middleware/runnerId.js';
import db from '../db.js';

const runnersRouter = Router();

runnersRouter.get('/:runnerId', runnerId, (req, res) => {
	db.query(
		'SELECT * FROM runners WHERE id = ? AND teamId = ?',
		[req.runnerId, req.teamId],
		(_, results) => {
			return res.send({
				...results[0],
				created_at: undefined,
				updated_at: undefined,
			});
		}
	);
});

runnersRouter.post('/', adminGuard, (req, res) => {
	const { firstName, lastName, speed } = req.body;
	if (!firstName || !lastName || !speed) return res.sendStatus(400);

	const now = new Date(Date.now())
		.toISOString()
		.split('.')[0]
		.replace('T', ' ');

	const data = {
		firstName,
		lastName,
		speed,
		isAdmin: false,
		teamId: req.teamId,
		token: 'to_be_generated',
		created_at: now,
		updated_at: now,
	};

	db.query('INSERT INTO runners SET ?', data, (_, results) => {
		let token = '';
		for (let i = 0; i < 9; i++) {
			token += results.insertId.toString();
		}
		console.log(token);

		db.query(
			'UPDATE runners SET ? WHERE id = ?',
			[{ token }, results.insertId],
			() => {
				return res.redirect(
					`/api/v1/teams/${req.teamId}/runners/${results.insertId}`
				);
			}
		);
	});
});

runnersRouter.put('/:runnerId', runnerId, adminGuard, (req, res) => {});
runnersRouter.delete('/:runnerId', runnerId, adminGuard, (req, res) => {});

export default runnersRouter;
