import React from 'react';
import { useStoreState } from 'easy-peasy';

import MovieTrailer from '../components/movie-trailer/movie-trailer.component';
import MovieReviews from '../components/movie-reviews/movie-reviews.component';
// import Footer from '../components/footer/footer.component';

const MovieDetailsPage = () => {
	const selectedMovie = useStoreState((state) => state.selectedMovie);
	const noMatchError = useStoreState((state) => state.noMatchError);
	const { title, release_date } = selectedMovie;

	return (
		<div className='movie-details'>
			{Object.keys(selectedMovie).length && !noMatchError ? (
				<>
					<MovieTrailer title={title} />
					<MovieReviews selectedMovie={{ title, release_date }} />
				</>
			) : (
				<div>{noMatchError}</div>
			)}
			{/* <Footer /> */}
		</div>
	);
};

export default MovieDetailsPage;
