import React, { useEffect, useRef } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import MovieSuggestionItem from '../components/movie-suggestion/movie-suggestion-item.component';
import Spinner from '../components/loading/spinner.component';
import Dots from '../components/loading/dots.component';

const MovieSuggestionsPage = () => {
	const fetchTmdbDiscoverData = useStoreActions(
		(actions) => actions.fetchTmdbDiscoverData
	);
	const setPageNum = useStoreActions((actions) => actions.setPageNum);
	const pageNum = useStoreState((state) => state.pageNum);
	const isLoading = useStoreState((state) => state.isLoading.tmdbDiscoverData);
	const results = useStoreState((state) => state.tmdbDiscoverData);

	const isMounted = useRef(false);

	useEffect(() => {
		if (!results.length) {
			fetchTmdbDiscoverData(pageNum);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (isMounted.current && pageNum < 500) {
			fetchTmdbDiscoverData(pageNum);
		} else {
			isMounted.current = true;
		}
	}, [pageNum]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className='movie-suggestions'>
			{isLoading && !results.length ? (
				<Spinner />
			) : (
				<>
					<h2 className='movie-suggestions__heading'>Recent movies</h2>
					<div className='movie-suggestions-list'>
						{results
							?.filter((movie) => !movie.title.toLowerCase().includes('untitled'))
							.map((movie, idx) => (
								<MovieSuggestionItem movie={movie} key={idx} />
							))}
					</div>
					{isLoading ? (
						<div className='movie-suggestions__dots'>
							<Dots />
						</div>
					) : (
						<button
							className='btn btn-primary movie-suggestions__load-btn'
							onClick={() => setPageNum(pageNum + 1)}
						>
							Load more
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default MovieSuggestionsPage;
