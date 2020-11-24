import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

import NotFoundImage from '../../assets/images/image-not-found.png';

const DropdownOption = React.memo(({ movie }) => {
	const { title, poster_path } = movie;
	const history = useHistory();
	const setOptionClicked = useStoreActions(
		(actions) => actions.setOptionClicked
	);
	const setSelectedMovie = useStoreActions(
		(actions) => actions.setSelectedMovie
	);
	const addSearch = useStoreActions((actions) => actions.addSearch);
	const toggleDropdown = useStoreActions((actions) => actions.toggleDropdown);
	const setLocalStorage = useStoreActions((actions) => actions.setLocalStorage);
	const handleNavigation = () =>
		history.location.pathname !== '/preview' && history.push('/preview');

	const handleClick = () => {
		addSearch('');
		setSelectedMovie(movie);
		toggleDropdown();
		setOptionClicked();
		setLocalStorage(movie);
		handleNavigation();
	};

	return (
		<div className='dropdown__item' onClick={handleClick}>
			<div className='dropdown__item--title'>{title}</div>
			<img
				src={
					poster_path === null
						? NotFoundImage
						: `https://image.tmdb.org/t/p/w92${poster_path}`
				}
				alt='movie poster'
				className='dropdown__item--img'
			/>
		</div>
	);
});

export default DropdownOption;
