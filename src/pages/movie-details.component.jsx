import React from 'react';
import { useStoreState } from 'easy-peasy';

import Hero from '../components/hero/hero.component';
import MovieTrailer from '../components/movie-trailer/movie-trailer.component';
import MovieReviews from '../components/movie-reviews/movie-reviews.component';
import Footer from '../components/footer/footer.component';

const MovieDetailsPage = () => {
	const selectedMovie = useStoreState((state) => state.selectedMovie);
	const { title, release_date } = selectedMovie;

	return (
		<div className='movie-details'>
			<Hero />
			{!!Object.keys(selectedMovie).length && (
				<>
					<MovieTrailer title={title} />
					<MovieReviews selectedMovie={{ title, release_date }} />
				</>
			)}
			{/* <Footer /> */}
		</div>
	);
};

export default MovieDetailsPage;
