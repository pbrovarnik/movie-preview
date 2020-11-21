import React, { useEffect, useRef } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import useDebounce from '../use-debounce/use-debounce';

import DropdownOption from '../dropdown-option/dropdown-option.component';

const SearchDropdown = ({ search }) => {
	const isDropdownOpen = useStoreState((state) => state.isDropdownOpen);
	const { results } = useStoreState((state) => state.movieDbSearchData);
	const isLoading = useStoreState((state) => state.isLoading.movieDbUrl);
	const fetchError = useStoreState((state) => state.fetchError);
	const isMobileSearchInactive = useStoreState(
		(state) => state.isMobileSearchInactive
	);
	const windowWidth = useStoreState((state) => state.windowWidth);
	const fetchData = useStoreActions((actions) => actions.fetchData);

	const debouncedSearch = useDebounce(search, 500);
	const query = `query=${debouncedSearch || '%00'}`;
	const API_KEY = 'api_key=68475f6c6a3dd0d5fda299f9ce48a964';
	const url = `https://api.themoviedb.org/3/search/movie?${API_KEY}&${query}`;

	const initialLoad = useRef(true);

	useEffect(() => {
		if (initialLoad.current) {
			initialLoad.current = false;
			return;
		}

		fetchData({ movieDbUrl: url });
	}, [url]); // eslint-disable-line react-hooks/exhaustive-deps

	const hasResults = results && results.length;
	const hideDropdown = !hasResults && search && windowWidth > 600;

	return (
		<>
			{(isDropdownOpen && search) || !isMobileSearchInactive ? (
				<div className='dropdown' hidden={hideDropdown}>
					<div className='dropdown__content dropdown__results'>
						{!hasResults && (
							<div className='dropdown__content--empty-search'>
								Waiting for movie search...
							</div>
						)}
						{isLoading && search ? (
							<div className='dropdown__loading'>Loading search data...</div>
						) : fetchError ? (
							<div className='dropdown__error'>Error occured loading search data.</div>
						) : (
							search &&
							results &&
							results
								.filter((m, idx) => idx < 10)
								.map((movie, i) => <DropdownOption key={movie.id} movie={movie} />)
						)}
					</div>
				</div>
			) : null}
		</>
	);
};

export default SearchDropdown;