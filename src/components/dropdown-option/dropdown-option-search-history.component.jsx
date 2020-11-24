import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

const DropdownOptionsSearchHistory = ({ movie }) => {
	const history = useHistory();
	const setOptionClicked = useStoreActions(
		(actions) => actions.setOptionClicked
	);
	const setSelectedMovie = useStoreActions(
		(actions) => actions.setSelectedMovie
	);
	const toggleDropdown = useStoreActions((actions) => actions.toggleDropdown);

	const handleNavigation = () =>
		history.location.pathname !== '/preview' && history.push('/preview');

	const handleClick = () => {
		setSelectedMovie(movie);
		toggleDropdown();
		setOptionClicked();
		handleNavigation();
	};
	return (
		<div className='dropdown__item' onClick={handleClick}>
			<div className='dropdown__item-with-icon'>
				<i className='material-icons'>history</i>
				<div className='dropdown__item--title'>{movie.title}</div>
			</div>
			<i className='material-icons'>arrow_back</i>
		</div>
	);
};

export default DropdownOptionsSearchHistory;
