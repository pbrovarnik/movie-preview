import React, { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router-dom';

import ImageWithSpinner from '../image-with-spinner/image-with-spinner.component';

import NotFoundImage from '../../assets/images/backdrop-placeholder.png';

const SimilarMovieItem = ({ movie, index }) => {
	const { backdrop_path, title } = movie;
	const history = useHistory();
	const fetchAllDataForMovie = useStoreActions(
		(actions) => actions.fetchAllDataForMovie
	);
	const clearYouTubeVideoId = useStoreActions(
		(action) => action.clearYouTubeVideoId
	);
	const clearSimilarMoviesData = useStoreActions(
		(action) => action.clearSimilarMoviesData
	);

	useEffect(() => {
		return () => {
			clearSimilarMoviesData();
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleClick = () => {
		fetchAllDataForMovie(movie.id);
		clearYouTubeVideoId();
		history.push(`/preview/${movie.id}`);
	};

	const backdrop = `https://image.tmdb.org/t/p/w500${backdrop_path}`;

	return (
		<div
			onClick={handleClick}
			className={`movie-reviews__similar-movie item-${index}`}
		>
			<ImageWithSpinner
				src={backdrop_path === null ? NotFoundImage : backdrop}
				alt='movie backdrop'
			/>
			<div className='movie-reviews__similar-movie--title'>{title}</div>
		</div>
	);
};

export default SimilarMovieItem;
