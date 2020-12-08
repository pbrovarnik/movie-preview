import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

const DropdownOption = React.memo(({ movie }) => {
	const { title, poster_path } = movie;
	const history = useHistory();
	const setOptionClicked = useStoreActions(
		(actions) => actions.setOptionClicked
	);
	const addSearch = useStoreActions((actions) => actions.addSearch);
	const toggleDropdown = useStoreActions((actions) => actions.toggleDropdown);
	const setLocalStorage = useStoreActions((actions) => actions.setLocalStorage);

	const handleClick = () => {
		addSearch('');
		toggleDropdown();
		setOptionClicked();
		setLocalStorage(movie);
		history.push(`/preview/${movie.id}`);
	};

	const moviePoster = `https://image.tmdb.org/t/p/w92${poster_path}`;

	return (
		<div className='dropdown__item' onClick={handleClick}>
			<div className='dropdown__item--title'>{title}</div>
			{poster_path && (
				<img src={moviePoster} alt='movie poster' className='dropdown__item--img' />
			)}
		</div>
	);
});

export default DropdownOption;
