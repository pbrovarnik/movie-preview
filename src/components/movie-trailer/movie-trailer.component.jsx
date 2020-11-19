import React, { useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';

import { useStoreState, useStoreActions } from 'easy-peasy';

const MovieTrailer = () => {
	const getYouTubeSearch = useStoreActions(
		(actions) => actions.getYouTubeSearch
	);
	const youTubeId = useStoreState((state) => state.youTubeId);
	const selectedMovie = useStoreState((state) => state.selectedMovie);

	useEffect(() => {
		getYouTubeSearch();
	}, [selectedMovie]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className='movie-trailer'>
			<ReactPlayer
				url={`https://www.youtube.com/watch?v=${youTubeId}`}
				width='100%'
				height='100%'
				controls={true}
				playing={true}
			/>
		</div>
	);
};

export default MovieTrailer;
