import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import MovieSuggestionItem from '../components/movie-suggestion/movie-suggestion-item.component';

const MovieSuggestionsListPage = () => {
	const fetchData = useStoreActions((actions) => actions.fetchData);
	const isLoading = useStoreState((state) => state.isLoading.tmdbDiscoverData);
	const { results } = useStoreState((state) => state.tmdbDiscoverData);
	const API_KEY = 'api_key=68475f6c6a3dd0d5fda299f9ce48a964';
	const url = `https://api.themoviedb.org/3/discover/movie?${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&primary_release_year=2020&with_original_language=en`;

	useEffect(() => {
		if (!results) {
			fetchData({ tmdbDiscoverUrl: url });
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			{isLoading ? (
				<div className='dropdown__loading'>Loading...</div>
			) : (
				<>
					<h2>Movies of 2020</h2>
					<div className='movie-suggestions-list'>
						{results?.map((movie, idx) => (
							<MovieSuggestionItem movie={movie} key={idx} />
						))}
					</div>
				</>
			)}
		</>
	);
};

export default MovieSuggestionsListPage;
