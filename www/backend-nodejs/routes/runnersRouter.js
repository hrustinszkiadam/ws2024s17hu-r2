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
			return res.send(results[0]);
		}
	);
});

runnersRouter.post('/', adminGuard, (req, res) => {});

runnersRouter.put('/:runnerId', runnerId, adminGuard, (req, res) => {});
runnersRouter.delete('/:runnerId', runnerId, adminGuard, (req, res) => {});

export default runnersRouter;
