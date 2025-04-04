import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
	const [isLoggedin, setIsLoggedin] = useState<boolean>(
		!!localStorage.getItem('token')
	);

	if (!isLoggedin) return <Login setIsLoggedIn={setIsLoggedin} />;
	return <Home />;
};

export default App;
