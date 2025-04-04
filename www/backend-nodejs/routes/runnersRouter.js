import { Router } from 'express';
import adminGuard from '../middleware/adminGuard.js';
import runnerId from '../middleware/runnerId.js';
import db from '../db.js';
import getNow from '../utils/getNow.js';

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

	const now = getNow();

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

runnersRouter.put('/:runnerId', runnerId, adminGuard, (req, res) => {
	const { firstName, lastName, speed } = req.body;
	if (!firstName || !lastName || !speed) return res.sendStatus(400);

	const data = {
		updated_at: getNow(),
		firstName,
		lastName,
		speed,
	};
	db.query('UPDATE runners SET ? WHERE id = ?', [data, req.runnerId], () => {
		return res.redirect(`/api/v1/teams/${req.teamId}/runners/${req.runnerId}`);
	});
});

runnersRouter.delete('/:runnerId', runnerId, adminGuard, (req, res) => {
	db.query('DELETE FROM runners WHERE id = ? AND teamId = ?', [
		req.runnerId,
		req.teamId,
	]);

	return res.send({
		success: true,
	});
});

export default runnersRouter;
