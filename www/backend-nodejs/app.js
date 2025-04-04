import express from 'express';
import cors from 'cors';
import router from './routes/router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/v1', (_, res) => {
	res.send('Backend Application - Hrustinszki Ádám');
});

app.use('/api/v1', router);

app.listen(80);
