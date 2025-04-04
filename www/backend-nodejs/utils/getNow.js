const getNow = () => {
	return new Date(Date.now()).toISOString().split('.')[0].replace('T', ' ');
};

export default getNow;
