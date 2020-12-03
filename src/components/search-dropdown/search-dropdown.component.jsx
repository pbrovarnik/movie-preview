import React, { useEffect, useRef } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import useDebounce from '../use-debounce/use-debounce';

import DropdownOption from '../dropdown-option/dropdown-option.component';
import DropdownOptionSearchHistory from '../dropdown-option/dropdown-option-search-history.component';

const SearchDropdown = ({ search }) => {
	const isDropdownOpen = useStoreState((state) => state.isDropdownOpen);
	const { results } = useStoreState((state) => state.tmdbSearchData);
	const isLoading = useStoreState((state) => state.isLoading.tmdbSearchData);
	const isMobileSearchInactive = useStoreState(
		(state) => state.isMobileSearchInactive
	);
	const localStorage = useStoreState((state) => state.localStorage);
	const fetchData = useStoreActions((actions) => actions.fetchData);
	const getLocalStorage = useStoreActions((actions) => actions.getLocalStorage);

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

		fetchData({ tmdbSearchUrl: url });
	}, [url]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		getLocalStorage();
	}, [isDropdownOpen]); // eslint-disable-line react-hooks/exhaustive-deps

	const searchHistory = [...localStorage].reverse();

	const showDropdownHistory = () => {
		if (searchHistory.length) {
			return searchHistory.map((movie, idx) => (
				<DropdownOptionSearchHistory key={idx} movie={movie} />
			));
		} else {
			return (
				<div className='dropdown__content--empty-search'>
					Waiting for movie search...
				</div>
			);
		}
	};

	const showDropdownSearchResults = () => {
		if (isLoading || !debouncedSearch) {
			return <div className='dropdown__loading'>Loading...</div>;
		} else if (results && !results?.length && !!search) {
			return <div className='dropdown__no-results'>Try a different search</div>;
		} else if (results?.length) {
			return results
				?.filter((m, idx) => idx < 10)
				.map((movie, i) => <DropdownOption key={movie.id} movie={movie} />);
		}
	};

	return (
		<>
			{isDropdownOpen || !isMobileSearchInactive ? (
				<div className='dropdown'>
					<div className='dropdown__content dropdown__results'>
						{!search ? showDropdownHistory() : showDropdownSearchResults()}
					</div>
				</div>
			) : null}
		</>
	);
};

export default SearchDropdown;
