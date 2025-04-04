import db from '../db.js';

const teamId = (req, res, next) => {
	const { teamId } = req.params;
	if (!teamId) {
		return res.status(400).send({
			status: 'error',
			message: 'No teamId found',
		});
	}

	if (Number(teamId) % 1 !== 0) {
		return res.status(400).send({
			status: 'error',
			message: 'TeamId must be of type integer',
		});
	}

	db.query('SELECT * FROM teams WHERE id = ?', Number(teamId), (_, results) => {
		if (!results.length) {
			return res.status(404).send({
				status: 'error',
				message: `Team with an id of ${teamId} not found`,
			});
		}

		req.teamId = Number(teamId);
		next();
	});
};

export default teamId;
