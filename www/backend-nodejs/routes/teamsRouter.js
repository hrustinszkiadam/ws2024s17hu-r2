import { Router } from 'express';
import db from '../db.js';
import adminGuard from '../middleware/adminGuard.js';

const teamsRouter = Router();

teamsRouter.get('/', (req, res) => {
	db.query('SELECT * FROM teams WHERE id = ?', req.teamId, (_, results) =>
		res.send(results[0])
	);
});

teamsRouter.put('/', adminGuard, (req, res) => {
	const { name, location, contactEmail } = req.body;
	if (!name || !location || !contactEmail) return res.sendStatus(400);

	const data = {
		name,
		location,
		contactEmail,
	};
	db.query('UPDATE teams SET ? WHERE id = ?', [data, req.teamId]);

	return res.redirect(`/api/v1/teams/${req.teamId}`);
});

teamsRouter.delete('/', adminGuard, (req, res) => {
	db.query('DELETE FROM runners WHERE teamId = ?', [req.teamId]);
	db.query('DELETE FROM teams WHERE id = ?', [req.teamId]);

	return res.send({
		success: true,
	});
});

export default teamsRouter;
