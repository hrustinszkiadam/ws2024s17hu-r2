import axios from 'axios';

const ax = axios.create({
	baseURL: 'http://backend-2.localhost/api/v1',
});

export default ax;
