import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { useStoreState, useStoreActions } from '../../easy-peasy/store-hooks';

type Props = {
	placeholder: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	inputName: string;
	value: string;
	handleFocus: () => void;
	handleInputClear: () => void;
};

const InputSearch = ({
	placeholder,
	handleChange,
	inputName,
	value,
	handleFocus,
	handleInputClear,
}: Props) => {
	const inputElm = useRef<HTMLInputElement>(null);
	const history = useHistory();

	const { results } = useStoreState((state) => state.tmdbSearchData);
	const isOptionClicked = useStoreState((state) => state.isOptionClicked);
	const isMobileSearchInactive = useStoreState(
		(state) => state.isMobileSearchInactive
	);
	const windowWidth = useStoreState((state) => state.windowWidth);
	const setMobileSearchInactive = useStoreActions(
		(actions) => actions.setMobileSearchInactive
	);
	const addSearch = useStoreActions((actions) => actions.addSearch);
	const setOptionClicked = useStoreActions(
		(actions) => actions.setOptionClicked
	);
	const setWindowWidth = useStoreActions((actions) => actions.setWindowWidth);
	const setLocalStorage = useStoreActions((actions) => actions.setLocalStorage);
	const toggleDropdown = useStoreActions((actions) => actions.toggleDropdown);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [windowWidth]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (isOptionClicked && windowWidth <= 600) {
			handleFocusBlur();
			setOptionClicked();
		}
	}, [isOptionClicked]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleResize = () => {
		setWindowWidth(window.innerWidth);
	};

	const handleEnterPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && results?.length) {
			addSearch('');
			toggleDropdown();
			setOptionClicked();
			setLocalStorage(results?.[0]);
			inputElm.current?.blur();
			history.push(`/preview/${results?.[0].id}`);
		}
	};

	const handleFocusBlur = () => {
		if (isMobileSearchInactive) {
			setMobileSearchInactive(false);
			inputElm.current?.focus();
		} else if (!isMobileSearchInactive) {
			setMobileSearchInactive(true);
			inputElm.current?.blur();
		}
	};

	const mobileSearchInput = () => (
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
					className={`material-icons ${!isMobileSearchInactive ? 'icon-color' : ''}`}
					onClick={handleFocusBlur}
					onTouchStart={handleFocusBlur}
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
				ref={inputElm}
				onKeyDown={handleEnterPress}
			/>
			<span
				className={`input-group-addon ${!isMobileSearchInactive ? 'bg-white' : ''}`}
			>
				<i
					className={`material-icons ${!isMobileSearchInactive ? 'icon-color' : ''}`}
					onClick={handleInputClear}
				>
					clear
				</i>
			</span>
		</div>
	);

	const searchInput = () => (
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

	return <>{windowWidth > 600 ? searchInput() : mobileSearchInput()}</>;
};

export default InputSearch;
