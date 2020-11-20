import React, { useEffect, useRef } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const InputSearch = ({
	placeholder,
	handleChange,
	inputName,
	value,
	handleFocus,
}) => {
	const inputElm = useRef(null);

	const { results } = useStoreState((state) => state.movieDbSearchData);
	const setSelectedMovie = useStoreActions(
		(actions) => actions.setSelectedMovie
	);
	const addSearch = useStoreActions((actions) => actions.addSearch);

	useEffect(() => {
		inputElm.current.focus();
	}, []);

	const handleEnterPress = (e) => {
		if (e.key === 'Enter' && results.length) {
			addSearch('');
			setSelectedMovie(results && results[0]);
			inputElm.current.blur();
		}
	};

	return (
		<input
			className='input-search__field'
			type='search'
			name={inputName}
			placeholder={placeholder}
			onChange={handleChange}
			value={value}
			autoComplete='off'
			onFocus={handleFocus}
			ref={inputElm}
			onKeyDown={handleEnterPress}
		/>
	);
};

export default InputSearch;
