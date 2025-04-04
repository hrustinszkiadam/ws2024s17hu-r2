import React, { useState } from 'react';
import ax from '../ax';

type LoginProps = {
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};
const Login = ({ setIsLoggedIn }: LoginProps) => {
	const [token, setToken] = useState('');

	const handleLogin = async () => {
		const res = await ax.post('/login', {
			token,
		});

		if (res.data.status !== 'success' || !res.data.user.isAdmin) {
			alert(
				'Invalid credentials: This site can only be accessed by admin users'
			);
			return;
		}
		localStorage.setItem('token', token);
		localStorage.setItem('user', JSON.stringify(res.data.user));
		setIsLoggedIn(true);
	};

	return (
		<div className='flex items-center justify-center flex-col w-screen h-screen gap-5'>
			<h1 className='text-5xl'>Login</h1>
			<p className='text-2xl'>Login using your token</p>

			<input
				type='text'
				placeholder='Token'
				className='border-2 border-black py-2 px-4 w-[20%] my-3'
				value={token}
				onChange={(e) => setToken(e.target.value)}
			/>
			<button
				className='btn'
				onClick={handleLogin}
				disabled={token.length !== 9}
			>
				Login
			</button>
		</div>
	);
};

export default Login;
