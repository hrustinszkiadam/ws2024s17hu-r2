import { useCallback, useEffect, useState } from 'react';
import DeleteButton from './DeleteButton';
import DeletePrompt from './DeletePrompt';
import ax from '../ax';

const ManageTeam = () => {
	const [deleting, setDeleting] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [location, setLocation] = useState('');
	const id = JSON.parse(localStorage.getItem('user')!).teamId;

	const getData = useCallback(async () => {
		const res = await ax.get(`/teams/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});

		if (res.status !== 200) return;

		setName(res.data.name);
		setEmail(res.data.contactEmail);
		setLocation(res.data.location);
	}, [id]);

	useEffect(() => {
		getData();
	}, [getData]);

	const handleSave = async () => {
		const res = await ax.put(
			`/teams/${id}`,
			{
				name,
				location,
				contactEmail: email,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		);

		if (res.status !== 200) return;
		setName(res.data.name);
		setEmail(res.data.contactEmail);
		setLocation(res.data.location);
	};

	return (
		<div className='flex flex-col gap-3 w-[30vw]'>
			<div>
				<label htmlFor='name'>Team name</label>
				<br />
				<input
					type='text'
					className='input w-full m-0'
					id='name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor='email'>Contact email</label>
				<br />
				<input
					type='text'
					className='input w-full'
					id='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor='location'>Location</label>
				<br />
				<input
					type='text'
					className='input w-full'
					id='location'
					value={location}
					onChange={(e) => setLocation(e.target.value)}
				/>
			</div>
			<div className='self-end flex gap-3'>
				<DeleteButton setDeleting={setDeleting} />
				<button
					className='btn'
					onClick={handleSave}
					disabled={!name.length || !email.length || !location.length}
				>
					Save
				</button>
			</div>
			{deleting && <DeletePrompt setDeleting={setDeleting} />}
		</div>
	);
};

export default ManageTeam;
