import { Router } from 'express';
import db from '../db.js';

const teamsRouter = Router();

teamsRouter.get('/', (req, res) => {
	db.query('SELECT * FROM teams WHERE id = ?', req.teamId, (_, results) =>
		res.send(results[0])
	);
});

export default teamsRouter;
