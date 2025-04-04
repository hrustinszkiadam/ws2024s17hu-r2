const LogoutButton = () => {
	const handleLogout = () => {
		localStorage.clear();
		window.location.reload();
	};
	return (
		<button
			className='btn'
			onClick={handleLogout}
		>
			Logout
		</button>
	);
};

export default LogoutButton;
