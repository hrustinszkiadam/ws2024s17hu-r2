import { createPool } from 'mysql';

const db = createPool({
	host: 'db',
	database: 'ub2023',
	user: 'root',
	password: 'password',
});

export default db;
