import React from 'react';

const InputSearch = ({
	placeholder,
	handleChange,
	inputName,
	value,
	handleFocus,
}) => (
	<input
		className='input-search__field'
		type='search'
		name={inputName}
		placeholder={placeholder}
		onChange={handleChange}
		value={value}
		autoComplete='off'
		onFocus={handleFocus}
	/>
);

export default InputSearch;
