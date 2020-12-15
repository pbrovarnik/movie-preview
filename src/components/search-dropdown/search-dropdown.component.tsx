import React, { useEffect, useRef } from 'react';

import { useStoreState, useStoreActions } from '../../easy-peasy/store-hooks';
import useDebounce from '../use-debounce/use-debounce.component';

import DropdownOption from '../dropdown-option/dropdown-option.component';
import DropdownOptionSearchHistory from '../dropdown-option/dropdown-option-search-history.component';
import Dots from '../loading/dots.component';

const SearchDropdown = ({ search }: { search: string }) => {
	const isDropdownOpen = useStoreState((state) => state.isDropdownOpen);
	const { results } = useStoreState((state) => state.tmdbSearchData);
	const isLoading = useStoreState((state) => state.isLoading.tmdbSearchData);
	const isMobileSearchInactive = useStoreState(
		(state) => state.isMobileSearchInactive
	);
	const localStorage = useStoreState((state) => state.localStorage);
	const fetchTmdbSearchData = useStoreActions(
		(actions) => actions.fetchTmdbSearchData
	);
	const getLocalStorage = useStoreActions((actions) => actions.getLocalStorage);
	const debouncedSearch = useDebounce(search, 500);
	const initialLoad = useRef(true);

	useEffect(() => {
		if (initialLoad.current) {
			initialLoad.current = false;
			return;
		}

		fetchTmdbSearchData(debouncedSearch);
	}, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

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
			return (
				<div className='dropdown__loading'>
					<Dots />
				</div>
			);
		} else if (results && !results?.length && !!search) {
			return <div className='dropdown__no-results'>Try a different search</div>;
		} else if (results?.length) {
			return results
				?.filter((m, idx) => idx < 10)
				.map((movie, i) => <DropdownOption key={movie.id} {...movie} />);
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
