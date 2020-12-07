import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

import MovieTrailer from '../components/movie-trailer/movie-trailer.component';
import MovieReviews from '../components/movie-reviews/movie-reviews.component';

const MovieDetailsPage = () => {
	const selectedMovie = useStoreState((state) => state.selectedMovie);
	const history = useHistory();

	useEffect(() => {
		if (!Object.keys(selectedMovie).length) {
			history.push('/');
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className='movie-details'>
			{Object.keys(selectedMovie).length && (
				<>
					<MovieTrailer />
					<MovieReviews selectedMovie={selectedMovie} />
				</>
			)}
		</div>
	);
};

export default MovieDetailsPage;
