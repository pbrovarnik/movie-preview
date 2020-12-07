import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

const DropdownOption = React.memo(({ movie }) => {
	const { title, poster_path } = movie;
	const history = useHistory();
	const setOptionClicked = useStoreActions(
		(actions) => actions.setOptionClicked
	);
	const setSelectedMovie = useStoreActions(
		(actions) => actions.setSelectedMovie
	);
	const clearYouTubeVideoId = useStoreActions(
		(actions) => actions.clearYouTubeVideoId
	);
	const addSearch = useStoreActions((actions) => actions.addSearch);
	const toggleDropdown = useStoreActions((actions) => actions.toggleDropdown);
	const setLocalStorage = useStoreActions((actions) => actions.setLocalStorage);
	const fetchAllDataForMovie = useStoreActions(
		(actions) => actions.fetchAllDataForMovie
	);

	const handleClick = () => {
		clearYouTubeVideoId();
		addSearch('');
		fetchAllDataForMovie(movie.id);
		setSelectedMovie(movie);
		toggleDropdown();
		setOptionClicked();
		setLocalStorage(movie);
		history.location.pathname !== '/preview' && history.push('/preview');
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
