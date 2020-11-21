import React, { useEffect, useRef, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const InputSearch = ({
	placeholder,
	handleChange,
	inputName,
	value,
	handleFocus,
}) => {
	const inputElm = useRef(null);
	const [isMobileSearchInactive, setMobileSearchInactive] = useState(true);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const { results } = useStoreState((state) => state.movieDbSearchData);
	const setSelectedMovie = useStoreActions(
		(actions) => actions.setSelectedMovie
	);
	const addSearch = useStoreActions((actions) => actions.addSearch);

	useEffect(() => {
		inputElm.current.focus();
	}, []);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [windowWidth]);

	const handleResize = () => {
		setWindowWidth(window.innerWidth);
	};

	const handleEnterPress = (e) => {
		if (e.key === 'Enter' && results && results.length) {
			addSearch('');
			setSelectedMovie(results && results[0]);
			inputElm.current.blur();
		}
	};

	const handleMobileFocus = () => {
		setMobileSearchInactive(false);
		inputElm.current.focus();
	};

	const handleMobileBlur = () => {
		setMobileSearchInactive(true);
		inputElm.current.blur();
	};

	return (
		<>
			{windowWidth > 600 ? (
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
			) : (
				<div
					className={`input-group search pull-right ${
						isMobileSearchInactive ? 'inactive' : ''
					}`}
				>
					<span
						className={`input-group-addon opener ${
							!isMobileSearchInactive ? 'bg-white' : ''
						}`}
					>
						<i
							className={`material-icons ${
								!isMobileSearchInactive ? 'icon-color' : ''
							}`}
							onClick={isMobileSearchInactive ? handleMobileFocus : handleMobileBlur}
						>
							{isMobileSearchInactive ? 'search' : 'arrow_back'}
						</i>
					</span>
					<input
						className='form-control'
						type='search'
						name={inputName}
						placeholder={placeholder}
						onChange={handleChange}
						value={value}
						autoComplete='off'
						onFocus={handleFocus}
						onBlur={handleMobileBlur}
						ref={inputElm}
						onKeyDown={handleEnterPress}
					/>
				</div>
			)}
		</>
	);
};

export default InputSearch;
