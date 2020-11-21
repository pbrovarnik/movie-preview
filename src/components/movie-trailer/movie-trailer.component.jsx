import React, { useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';

import { useStoreState, useStoreActions } from 'easy-peasy';

const MovieTrailer = React.memo(() => {
	const fetchData = useStoreActions((actions) => actions.fetchData);
	const isLoading = useStoreState((state) => state.isLoading.youTubeSearch);
	const fetchError = useStoreState((state) => state.fetchError);
	const youTubeVideoId = useStoreState((state) => state.youTubeVideoId);
	const { title, release_date } = useStoreState((state) => state.selectedMovie);

	const numberOfResults = 1;
	const query = `${title} ${release_date.split('-')[0]} Official Trailer`;
	const API_KEY = 'AIzaSyAzfm1mH_Na72MR_G7zeAq7QPSUiBD4nCI';
	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${numberOfResults}&q=${query}&key=${API_KEY}`;

	useEffect(() => {
		fetchData({ youtubeUrl: url });
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			{/* {isLoading ? (
				<div className='movie-reviews__loading'>Loading video player...</div>
			) : fetchError ? (
				<div className='movie-reviews__error'>
					Error occured loading video player.
				</div>
			) : ( */}
			<div className='movie-trailer'>
				<ReactPlayer
					url={`https://www.youtube.com/watch?v=${youTubeVideoId}`}
					width='100%'
					height='100%'
					controls={true}
					// playing={true}
				/>
			</div>
			{/* )} */}
		</>
	);
});

export default MovieTrailer;