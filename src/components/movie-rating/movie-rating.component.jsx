import React from 'react';

const MovieRating = React.memo(({ name, rating, icon }) => {
	return (
		<div className='movie-reviews__component'>
			<img
				className='movie-reviews__component--icon'
				src={icon}
				alt='review icon'
			/>
			<div className='movie-reviews__component--rating'>{rating}</div>
		</div>
	);
});

export default MovieRating;
