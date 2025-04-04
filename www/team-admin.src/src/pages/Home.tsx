import LogoutButton from '../components/LogoutButton';
import ManageTeam from '../components/ManageTeam';

const Home = () => {
	return (
		<div className='w-screen h-screen p-10'>
			<div className='flex justify-between grow items-center pr-10'>
				<h1 className='text-5xl font-semibold mb-5'>Manage your team</h1>
				<LogoutButton />
			</div>
			<ManageTeam />
			<hr className='my-5 border' />
		</div>
	);
};

export default Home;
