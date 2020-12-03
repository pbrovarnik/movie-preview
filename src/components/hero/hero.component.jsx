import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

import MovieSearch from '../movie-search/movie-search.component';
import filmIcon from '../../assets/icons/film-solid.svg';

const Hero = () => {
	const history = useHistory();
	const isMobileSearchInactive = useStoreState(
		(state) => state.isMobileSearchInactive
	);

	const handleTitleClick = () => {
		history.location.pathname !== '/' && history.push('/');
	};

	return (
		<div className='hero'>
			<div className='hero__body'>
				<div
					className={`hero__container ${isMobileSearchInactive ? 'z-index-1' : ''}`}
					onClick={handleTitleClick}
				>
					<span className='hero__icon'>
						<img src={filmIcon} alt='logo' />
					</span>
					<div className='hero__title'>Movie Preview</div>
				</div>
				<MovieSearch />
			</div>
		</div>
	);
};

export default Hero;
