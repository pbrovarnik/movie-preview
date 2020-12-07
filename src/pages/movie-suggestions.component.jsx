import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import MovieSuggestionItem from '../components/movie-suggestion/movie-suggestion-item.component';
import Spinner from '../components/loading/spinner.component';

const MovieSuggestionsPage = () => {
	const fetchTmdbDiscoverData = useStoreActions(
		(actions) => actions.fetchTmdbDiscoverData
	);
	const isLoading = useStoreState((state) => state.isLoading.tmdbDiscoverData);
	const { results } = useStoreState((state) => state.tmdbDiscoverData);

	useEffect(() => {
		if (!results) {
			fetchTmdbDiscoverData();
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className='movie-suggestions'>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<h2>Recent movies</h2>
					<div className='movie-suggestions-list'>
						{results
							?.filter((movie) => !movie.title.toLowerCase().includes('untitled'))
							.map((movie, idx) => (
								<MovieSuggestionItem movie={movie} key={idx} />
							))}
					</div>
				</>
			)}
		</div>
	);
};

export default MovieSuggestionsPage;
