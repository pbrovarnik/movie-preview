import React, { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import MovieSuggestionItem from '../components/movie-suggestion/movie-suggestion-item.component';
import Spinner from '../components/loading/spinner.component';

const MovieSuggestionsPage = () => {
	const fetchData = useStoreActions((actions) => actions.fetchData);
	const isLoading = useStoreState((state) => state.isLoading.tmdbDiscoverData);
	const { results } = useStoreState((state) => state.tmdbDiscoverData);

	const date = new Date();
	const pastDate = new Date();
	pastDate.setMonth(pastDate.getMonth() - 12);

	const dateRange = `
		primary_release_date.gte=${formatDate(pastDate)}&
		primary_release_date.lte=${formatDate(date)}
	`;
	const API_KEY = 'api_key=68475f6c6a3dd0d5fda299f9ce48a964';
	const url = `https://api.themoviedb.org/3/discover/movie?${API_KEY}&${dateRange}&language=en-US&sort_by=popularity.desc&page=1&with_original_language=en`;

	useEffect(() => {
		if (!results) {
			fetchData({ tmdbDiscoverUrl: url });
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	function formatDate(date) {
		const day = date.getDate();
		const month = date.getMonth();
		return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${
			day < 10 ? '0' + day : day
		}`;
	}

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
