import React from 'react';
import ReactPlayer from 'react-player/lazy';

import { useStoreState } from 'easy-peasy';

const MovieTrailer = () => {
	const youTubeVideoId = useStoreState((state) => state.youTubeVideoId);

	return (
		<div className='movie-trailer'>
			<ReactPlayer
				url={`https://www.youtube.com/watch?v=${youTubeVideoId}`}
				controls={true}
				playing={true}
			/>
		</div>
	);
};

export default MovieTrailer;
