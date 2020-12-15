import React from 'react';

type Props = {
	rating: string;
	icon: string;
};

const MovieRating = React.memo(({ rating, icon }: Props) => {
	return (
		<div className='movie-reviews__component'>
			<img
				className='movie-reviews__component--icon'
				src={icon}
				alt='review source icon'
			/>
			<div className='movie-reviews__component--rating'>{rating}</div>
		</div>
	);
});

export default MovieRating;
