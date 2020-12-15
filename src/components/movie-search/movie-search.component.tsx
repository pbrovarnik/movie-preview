import React, { useEffect } from 'react';

import { useStoreState, useStoreActions } from '../../easy-peasy/store-hooks';

import InputSearch from '../input-search/input-search.component';
import SearchDropdown from '../search-dropdown/search-dropdown.component';

const MovieSearch = () => {
	const addSearch = useStoreActions((actions) => actions.addSearch);
	const toggleDropdown = useStoreActions((actions) => actions.toggleDropdown);
	const search = useStoreState((state) => state.search);
	const isDropdownOpen = useStoreState((state) => state.isDropdownOpen);

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});

	const handleClickOutside = (e: MouseEvent) => {
		if (
			(e.target as HTMLInputElement).name !== 'movieSearch' &&
			!(e.target as Element).className.includes('dropdown') &&
			isDropdownOpen
		) {
			toggleDropdown();
		}
	};

	return (
		<>
			<div className='input-search'>
				<InputSearch
					handleChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
						addSearch(target.value)
					}
					placeholder='Search movie'
					inputName='movieSearch'
					value={search}
					handleFocus={() => !isDropdownOpen && toggleDropdown()}
					handleInputClear={() => addSearch('')}
				/>
				<SearchDropdown search={search} />
			</div>
		</>
	);
};

export default MovieSearch;
