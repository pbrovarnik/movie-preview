import React from 'react';
import { useHistory } from 'react-router-dom';

import ImageWithSpinner from '../image-with-spinner/image-with-spinner.component';

import NotFoundImage from '../../assets/images/backdrop-placeholder.png';

const MovieSuggestionItem = React.memo(({ movie }) => {
	const {
		id,
		title,
		release_date,
		overview,
		poster_path,
		backdrop_path,
	} = movie;
	const history = useHistory();

	const handleClick = () => {
		history.push(`/preview/${id}`);
	};

	const moviePoster = `https://image.tmdb.org/t/p/w92${poster_path}`;
	const backdrop = `https://image.tmdb.org/t/p/w500${backdrop_path}`;

	return (
		<div className='movie-suggestion-item' onClick={handleClick}>
			<div className='movie-suggestion-item__thumbnail'>
				<ImageWithSpinner
					src={backdrop_path === null ? NotFoundImage : backdrop}
					alt='movie backdrop'
				/>
			</div>
			<div className='movie-suggestion-item__details'>
				{poster_path && (
					<img
						className='movie-suggestion-item__details--poster'
						src={moviePoster}
						alt='movie poster'
					/>
				)}
				<div className='movie-suggestion-item__details--text-container'>
					<div className='movie-suggestion-item__details--title'>{`${title} (${
						release_date.split('-')[0]
					})`}</div>
					<div className='movie-suggestion-item__details--description'>
						{overview}
					</div>
				</div>
			</div>
		</div>
	);
});

export default MovieSuggestionItem;
