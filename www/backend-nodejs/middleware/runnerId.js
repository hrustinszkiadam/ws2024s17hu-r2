import db from '../db.js';

const runnerId = (req, res, next) => {
	const { runnerId } = req.params;
	if (!runnerId) {
		return res.status(400).send({
			status: 'error',
			message: 'No runnerId found',
		});
	}

	if (Number(runnerId) % 1 !== 0) {
		return res.status(400).send({
			status: 'error',
			message: 'runnerId must be of type integer',
		});
	}

	db.query(
		'SELECT * FROM runners WHERE id = ? AND teamId = ?',
		[Number(runnerId), req.teamId],
		(_, results) => {
			if (!results.length) {
				return res.status(404).send({
					status: 'error',
					message: `Runner with an id of ${runnerId} not found`,
				});
			}

			req.runnerId = Number(runnerId);
			next();
		}
	);
};

export default runnerId;
