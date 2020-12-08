import React from 'react';
import { useStoreState } from 'easy-peasy';

import MovieRating from '../movie-rating/movie-rating.component';
import SimilarMovieItem from '../similar-movie/similar-movie-item.component';
import Spinner from '../loading/spinner.component';

import imdbIcon from '../../assets/icons/imdb.png';
import freshTomatoIcon from '../../assets/icons/fresh-tomato.png';
import rottenTomatoIcon from '../../assets/icons/rotten-tomato.png';
import metaCriticIcon from '../../assets/icons/meta-critic.png';

const MovieReviews = () => {
	const tmdbMovieData = useStoreState((state) => state.tmdbMovieData);
	const omdbMovieData = useStoreState((state) => state.omdbMovieData);
	const similarMoviesData = useStoreState((state) => state.similarMoviesData);
	const isLoading = useStoreState((state) => state.isLoading);
	const { title, release_date, overview, poster_path } = tmdbMovieData;
	const ratings = [];

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

	omdbMovieData.imdbRating &&
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
		<div className='movie-review-container'>
			{isLoading.tmdbMovieData || isLoading.omdbMovieData ? (
				<Spinner className='movie-reviews__loading' />
			) : (
				<>
					<div className='movie-reviews'>
						{poster_path && (
							<div className='movie-reviews__poster-container'>
								<img
									className='movie-reviews__poster'
									src={moviePoster}
									alt='movie poster'
								/>
							</div>
						)}
						<div className='movie-reviews__details-container'>
							<div className='movie-reviews__details'>
								<div className='movie-reviews__title'>
									<div>{`${title} (${release_date?.split('-')[0]})`}</div>
								</div>
								<div className='movie-reviews__ratings-container'>
									{omdbMovieData?.Ratings &&
										ratings.map(
											({ Icon, Value }, i) =>
												Value !== 'N/A' && (
													<MovieRating key={i} rating={Value} icon={Icon} />
												)
										)}
								</div>
							</div>
							<p className='movie-reviews__plot'>{overview}</p>
						</div>
					</div>
					<div className='movie-reviews__similar-movies-list'>
						{!!similarMoviesData.length && (
							<div className='movie-reviews__similar-movies-list--title'>
								Similar movies
							</div>
						)}
						{similarMoviesData?.map((movie, idx) => (
							<SimilarMovieItem movie={movie} key={idx} index={idx} />
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default MovieReviews;
