import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import useDebounce from '../use-debounce/use-debounce';

import DropdownOption from '../dropdown-option/dropdown-option.component';

const SearchDropdown = ({ search }) => {
	const isDropdownOpen = useStoreState((state) => state.isDropdownOpen);
	const getMoviesSearch = useStoreActions((actions) => actions.getMoviesSearch);
	const results = useStoreState((state) => state.searchedMovies);
	const searchLoading = useStoreState((state) => state.searchLoading);
	const searchError = useStoreState((state) => state.searchError);

	const debouncedSearch = useDebounce(search, 500);

	React.useEffect(() => {
		getMoviesSearch(debouncedSearch);
	}, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			{isDropdownOpen && search && results && results.length ? (
				<div className='dropdown'>
					<div className='dropdown__content dropdown__results'>
						{searchLoading && search ? (
							<div className='dropdown__loading'>Loading...</div>
						) : searchError ? (
							<div className='dropdown__error'>Error occured.</div>
						) : (
							search &&
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
