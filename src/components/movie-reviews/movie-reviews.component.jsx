import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import MovieRating from '../movie-rating/movie-rating.component';

import imdbIcon from '../../assets/icons/imdb.png';
import freshTomatoIcon from '../../assets/icons/fresh-tomato.png';
import rottenTomatoIcon from '../../assets/icons/rotten-tomato.png';
import metaCriticIcon from '../../assets/icons/meta-critic.png';

const MovieReviews = ({ selectedMovie: { title, release_date } }) => {
	const imdbSearchData = useStoreState((state) => state.imdbSearchData);
	const imdbMovieData = useStoreState((state) => state.imdbMovieData);
	const isLoading = useStoreState((state) => state.isLoading);
	const fetchError = useStoreState((state) => state.fetchError);
	const fetchData = useStoreActions((actions) => actions.fetchData);
	const ratings = [];

	const baseUrl = 'https://www.omdbapi.com';
	const API_KEY = 'apikey=4a682a75';

	useEffect(() => {
		if (title) {
			const query = `s=${title}`;
			const url = `${baseUrl}/?${API_KEY}&${query}`;
			fetchData({ imdbSearchUrl: url });
		}
	}, [title]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (Object.keys(imdbSearchData || {}).length) {
			const url = `${baseUrl}/?${API_KEY}&i=${imdbSearchData.imdbID}`;
			fetchData({ imdbMovieUrl: url });
		}
	}, [imdbSearchData]); // eslint-disable-line react-hooks/exhaustive-deps

	if (imdbMovieData && imdbMovieData.Ratings) {
		const filteredRating = imdbMovieData.Ratings.filter(
			(rating) => rating.Source === 'Rotten Tomatoes'
		)
			.map((rating) =>
				parseInt(rating.Value.replace(/%/, '')) >= 60
					? { ...rating, Icon: freshTomatoIcon }
					: { ...rating, Icon: rottenTomatoIcon }
			)
			.pop();

		filteredRating && ratings.push(filteredRating);

		imdbMovieData.imdbRating &&
			ratings.push({
				Source: 'IMDB',
				Value: imdbMovieData.imdbRating,
				Icon: imdbIcon,
			});
		imdbMovieData.Metascore &&
			ratings.push({
				Source: 'Metascore',
				Value: imdbMovieData.Metascore,
				Icon: metaCriticIcon,
			});
	}

	return (
		<div className='movie-reviews'>
			{isLoading.imdbSearch || isLoading.imdbMovieData ? (
				<div className='movie-reviews__loading'>Loading reviews...</div>
			) : fetchError ? (
				<div className='movie-reviews__error'>Error occured loading reviews.</div>
			) : (
				<>
					<div className='movie-reviews__img-container'>
						<img
							className='movie-reviews__img'
							src={imdbMovieData.Poster}
							alt='movie poster'
						/>
					</div>
					<div className='movie-reviews__container'>
						<div className='movie-reviews__details'>
							<div className='movie-reviews__title'>
								<h1>{imdbMovieData.Title}</h1>
							</div>
							<div className='movie-reviews__ratings-container'>
								{imdbMovieData &&
									imdbMovieData.Ratings &&
									ratings.map(
										({ Icon, Source, Value }, i) =>
											Value !== 'N/A' && (
												<MovieRating key={i} name={Source} rating={Value} icon={Icon} />
											)
									)}
							</div>
						</div>
						<p className='movie-reviews__plot'>{imdbMovieData.Plot}</p>
					</div>
				</>
			)}
		</div>
	);
};

export default MovieReviews;
