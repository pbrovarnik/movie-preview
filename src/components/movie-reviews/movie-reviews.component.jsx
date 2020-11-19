import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import MovieRating from '../movie-rating/movie-rating.component';
import MovieTitle from '../movie-title/movie-title.component';

import imdbIcon from '../../assets/icons/imdb.png';
import freshTomatoIcon from '../../assets/icons/fresh-tomato.png';
import rottenTomatoIcon from '../../assets/icons/rotten-tomato.png';
import metaCriticIcon from '../../assets/icons/meta-critic.png';

const MovieReviews = ({ selectedMovie }) => {
	const movie = useStoreState((state) => state.movie);
	const movieLoading = useStoreState((state) => state.movieLoading);
	const movieError = useStoreState((state) => state.movieError);
	const getMovie = useStoreActions((actions) => actions.getMovie);
	const ratings = [];

	useEffect(() => {
		getMovie(selectedMovie);
	}, [selectedMovie]); // eslint-disable-line react-hooks/exhaustive-deps

	if (movie && movie.Ratings) {
		const filteredRating = movie.Ratings.filter(
			(rating) => rating.Source === 'Rotten Tomatoes'
		)
			.map((rating) =>
				parseInt(rating.Value.replace(/%/, '')) >= 60
					? { ...rating, Icon: freshTomatoIcon }
					: { ...rating, Icon: rottenTomatoIcon }
			)
			.pop();

		filteredRating && ratings.push(filteredRating);

		movie.imdbRating &&
			ratings.push({
				Source: 'IMDB',
				Value: movie.imdbRating,
				Icon: imdbIcon,
			});
		movie.Metascore &&
			ratings.push({
				Source: 'Metascore',
				Value: movie.Metascore,
				Icon: metaCriticIcon,
			});
	}

	return (
		<>
			{movieLoading ? (
				<div className='movie-reviews__loading'>Loading...</div>
			) : movieError ? (
				<div className='movie-reviews__error'>Error occured.</div>
			) : (
				<div className='movie-reviews'>
					<div className='movie-reviews__details'>
						<MovieTitle title={movie.Title} />
						<div className='movie-reviews__ratings-container'>
							{movie &&
								movie.Ratings &&
								ratings.map(
									({ Icon, Source, Value }, i) =>
										Value !== 'N/A' && (
											<MovieRating key={i} name={Source} rating={Value} icon={Icon} />
										)
								)}
						</div>
					</div>
					<p className='movie-reviews__plot'>{movie.Plot}</p>
				</div>
			)}
		</>
	);
};

export default MovieReviews;
