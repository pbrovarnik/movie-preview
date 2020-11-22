import React from 'react';
import { useHistory } from 'react-router-dom';

import MovieSearch from '../movie-search/movie-search.component';

const Hero = () => {
	const history = useHistory();

	const handleTitleClick = () =>
		history.location.pathname !== '/' && history.push('/');

	return (
		<div className='hero'>
			<div className='hero__body'>
				<div className='hero__container' onClick={handleTitleClick}>
					<span className='hero__icon'>
						<i className='fas fa-film'></i>
					</span>
					<div className='hero__title'>Movie Preview</div>
				</div>
				<MovieSearch />
			</div>
		</div>
	);
};

export default Hero;
