import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

const DropdownOptionsSearchHistory = ({ movie: { id, title } }) => {
	const history = useHistory();
	const setOptionClicked = useStoreActions(
		(actions) => actions.setOptionClicked
	);
	const toggleDropdown = useStoreActions((actions) => actions.toggleDropdown);

	const handleClick = () => {
		toggleDropdown();
		setOptionClicked();
		history.push(`/preview/${id}`);
	};
	return (
		<div className='dropdown__item' onClick={handleClick}>
			<div className='dropdown__item-with-icon'>
				<i className='material-icons'>history</i>
				<div className='dropdown__item--title'>{title}</div>
			</div>
			<i className='material-icons'>arrow_back</i>
		</div>
	);
};

export default DropdownOptionsSearchHistory;
