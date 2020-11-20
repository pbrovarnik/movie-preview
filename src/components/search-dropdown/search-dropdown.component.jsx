import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import useDebounce from '../use-debounce/use-debounce';

import DropdownOption from '../dropdown-option/dropdown-option.component';

const SearchDropdown = ({ search }) => {
	const isDropdownOpen = useStoreState((state) => state.isDropdownOpen);
	const fetchData = useStoreActions((actions) => actions.fetchData);
	const { results } = useStoreState((state) => state.movieDbSearchData);
	const loading = useStoreState((state) => state.loading);
	const fetchError = useStoreState((state) => state.fetchError);

	const debouncedSearch = useDebounce(search, 500);
	const query = `query=${debouncedSearch || '%00'}`;
	const API_KEY = 'api_key=68475f6c6a3dd0d5fda299f9ce48a964';
	const url = `https://api.themoviedb.org/3/search/movie?${API_KEY}&${query}`;

	React.useEffect(() => {
		fetchData({ movieDbUrl: url });
	}, [url]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			{isDropdownOpen && search && results && results.length ? (
				<div className='dropdown'>
					<div className='dropdown__content dropdown__results'>
						{loading && search ? (
							<div className='dropdown__loading'>Loading...</div>
						) : fetchError ? (
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
