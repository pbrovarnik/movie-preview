import spinner from '../../assets/icons/spinner.svg';

const Spinner = (props: { className?: string }) => {
	const className = props?.className ? `spinner-container ${props.className}` : 'spinner-container';

	return (
		<div className={className}>
			<img src={spinner} alt="logo" />
		</div>
	);
};

export default Spinner;
