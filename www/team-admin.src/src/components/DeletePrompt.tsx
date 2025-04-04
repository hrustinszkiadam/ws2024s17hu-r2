import ax from '../ax';

type DeletePromptProps = {
	setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
};
const DeletePrompt = ({ setDeleting }: DeletePromptProps) => {
	const handleDelete = async () => {
		const id = JSON.parse(localStorage.getItem('user')!).teamId;
		const token = localStorage.getItem('token') as string;

		await ax.delete(`/teams/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		localStorage.clear();
		window.location.reload();
	};

	return (
		<article className='border border-gray-900 w-[35vw] h-[40vh] p-10 text-2xl rounded-2xl absolute-center z-50'>
			<h2 className='text-5xl mb-10 font-semibold'>Are you Sure?</h2>
			<p>
				If you click on the Delete button, your team and all runners belonging
				to your team will be deleted.
			</p>
			<div className='flex justify-between items-center mt-20'>
				<p
					onClick={() => setDeleting(false)}
					className='cursor-default'
				>
					Cancel
				</p>
				<button
					className='btn'
					onClick={handleDelete}
				>
					Delete
				</button>
			</div>
		</article>
	);
};

export default DeletePrompt;
