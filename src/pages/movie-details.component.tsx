import React, { useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { useStoreState, useStoreActions } from '../easy-peasy/store-hooks';

import MovieTrailer from '../components/movie-trailer/movie-trailer.component';
import MovieReviews from '../components/movie-reviews/movie-reviews.component';

type MatchParams = {
	movieId: string;
};

const MovieDetailsPage = () => {
	const history = useHistory();
	const {
		params: { movieId },
	} = useRouteMatch<MatchParams>();

	const fetchError = useStoreState((state) => state.fetchError);
	const fetchAllDataForMovie = useStoreActions(
		(actions) => actions.fetchAllDataForMovie
	);

	useEffect(() => {
		fetchAllDataForMovie(parseInt(movieId));
	}, [movieId]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (fetchError) {
			history.location.pathname !== '/' && history.push('/');
		}
	}, [fetchError]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className='movie-details'>
			<MovieTrailer />
			<MovieReviews />
		</div>
	);
};

export default MovieDetailsPage;
