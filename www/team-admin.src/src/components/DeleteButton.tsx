type DeleteButtonProps = {
	setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
};
const DeleteButton = ({ setDeleting }: DeleteButtonProps) => {
	return (
		<button
			className='btn red'
			onClick={() => setDeleting(true)}
		>
			Delete team
		</button>
	);
};

export default DeleteButton;
