import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStoreActions } from '../../easy-peasy/store-hooks';
import { TmdbSearchResultsType } from '../../easy-peasy/types';

const DropdownOption = memo((movie: TmdbSearchResultsType) => {
	const { title, poster_path } = movie;
	const navigate = useNavigate();
	const setOptionClicked = useStoreActions((actions) => actions.setOptionClicked);
	const addSearch = useStoreActions((actions) => actions.addSearch);
	const toggleDropdown = useStoreActions((actions) => actions.toggleDropdown);
	const setLocalStorage = useStoreActions((actions) => actions.setLocalStorage);

	const handleClick = () => {
		addSearch('');
		toggleDropdown();
		setOptionClicked();
		setLocalStorage(movie);
		navigate(`/preview/${movie.id}`);
	};

	const moviePoster = `https://image.tmdb.org/t/p/w92${poster_path}`;

	return (
		<div className="dropdown__item" onClick={handleClick}>
			<div className="dropdown__item--title">{title}</div>
			{poster_path && <img src={moviePoster} alt="movie poster" className="dropdown__item--img" />}
		</div>
	);
});

export default DropdownOption;
