import React from 'react';

import MovieSearch from '../movie-search/movie-search.component';

const Hero = () => (
	<div className='hero'>
		<div className='hero__body'>
			<div className='hero__container'>
				<span className='hero__icon'>
					<i className='fas fa-film'></i>
				</span>
				<div className='hero__title'>Movie Preview</div>
			</div>
			<MovieSearch />
		</div>
	</div>
);

export default Hero;
