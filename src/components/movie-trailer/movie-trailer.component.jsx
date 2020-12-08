import React, { useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';

import { useStoreState, useStoreActions } from 'easy-peasy';

const MovieTrailer = () => {
	const clearYouTubeVideoId = useStoreActions(
		(actions) => actions.clearYouTubeVideoId
	);
	const youTubeVideoId = useStoreState((state) => state.youTubeVideoId);

	useEffect(() => {
		return () => {
			clearYouTubeVideoId();
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className='movie-trailer'>
			{!youTubeVideoId ? (
				<div className='movie-trailer--loading' />
			) : (
				<ReactPlayer
					url={`https://www.youtube.com/watch?v=${youTubeVideoId}`}
					controls={true}
					playing={true}
					config={{
						youtube: {
							playerVars: { modestbranding: 1 },
						},
					}}
				/>
			)}
		</div>
	);
};

export default MovieTrailer;
