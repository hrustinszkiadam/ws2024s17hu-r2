import LogoutButton from '../components/LogoutButton';
import ManageTeam from '../components/ManageTeam';

const Home = () => {
	return (
		<div className='w-screen h-screen p-10'>
			<div className='flex justify-between grow items-center pr-10 mb-5'>
				<h1 className='text-5xl font-semibold'>Manage your team</h1>
				<LogoutButton />
			</div>
			<ManageTeam />
			<hr className='my-5 border' />
			<div className='flex justify-between grow items-center pr-10 mb-5'>
				<h2 className='text-5xl font-semibold'>Runners</h2>
				<button
					className='btn'
					onClick={() =>
						window.open('http://stage-planner.localhost', '_blank')
					}
				>
					Stage Planner
				</button>
			</div>
		</div>
	);
};

export default Home;
