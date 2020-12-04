import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import MovieRating from '../movie-rating/movie-rating.component';
import Spinner from '../loading/spinner.component';

import imdbIcon from '../../assets/icons/imdb.png';
import freshTomatoIcon from '../../assets/icons/fresh-tomato.png';
import rottenTomatoIcon from '../../assets/icons/rotten-tomato.png';
import metaCriticIcon from '../../assets/icons/meta-critic.png';

const MovieReviews = ({ selectedMovie }) => {
	const { title, release_date, overview, poster_path } = selectedMovie;
	const omdbSearchData = useStoreState((state) => state.omdbSearchData);
	const omdbMovieData = useStoreState((state) => state.omdbMovieData);
	const isLoading = useStoreState((state) => state.isLoading);
	const fetchData = useStoreActions((actions) => actions.fetchData);
	const ratings = [];

	const baseUrl = 'https://www.omdbapi.com';
	const API_KEY = `apikey=${process.env.REACT_APP_OMDB_KEY}`;

	useEffect(() => {
		if (title) {
			const query = `s=${title}`;
			const url = `${baseUrl}/?${API_KEY}&${query}`;
			fetchData({ omdbSearchUrl: url });
		}
	}, [title]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (Object.keys(omdbSearchData || {}).length) {
			const url = `${baseUrl}/?${API_KEY}&i=${omdbSearchData.imdbID}`;
			fetchData({ omdbMovieUrl: url });
		}
	}, [omdbSearchData]); // eslint-disable-line react-hooks/exhaustive-deps

	const moviePoster = `https://image.tmdb.org/t/p/w92${poster_path}`;

	const filteredRating = omdbMovieData?.Ratings?.filter(
		(rating) => rating.Source === 'Rotten Tomatoes'
	)
		.map((rating) =>
			parseInt(rating.Value.replace(/%/, '')) >= 60
				? { ...rating, Icon: freshTomatoIcon }
				: { ...rating, Icon: rottenTomatoIcon }
		)
		.pop();

	filteredRating && ratings.push(filteredRating);

	omdbMovieData.omdbRating &&
		ratings.push({
			Source: 'IMDB',
			Value: omdbMovieData.imdbRating,
			Icon: imdbIcon,
		});

	omdbMovieData.Metascore &&
		ratings.push({
			Source: 'Metascore',
			Value: omdbMovieData.Metascore,
			Icon: metaCriticIcon,
		});

	return (
		<div className='movie-reviews'>
			{isLoading.omdbSearchData || isLoading.omdbMovieData ? (
				<Spinner className='movie-reviews__loading' />
			) : (
				<>
					{poster_path && (
						<div className='movie-reviews__poster-container'>
							<img
								className='movie-reviews__poster'
								src={moviePoster}
								alt='movie poster'
							/>
						</div>
					)}
					<div className='movie-reviews__container'>
						<div className='movie-reviews__details'>
							<div className='movie-reviews__title'>
								<div>{`${title} (${release_date.split('-')[0]})`}</div>
							</div>
							<div className='movie-reviews__ratings-container'>
								{omdbMovieData?.Ratings &&
									ratings.map(
										({ Icon, Value }, i) =>
											Value !== 'N/A' && <MovieRating key={i} rating={Value} icon={Icon} />
									)}
							</div>
						</div>
						<p className='movie-reviews__plot'>{overview}</p>
					</div>
				</>
			)}
		</div>
	);
};

export default MovieReviews;
