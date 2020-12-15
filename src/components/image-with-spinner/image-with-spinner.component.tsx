import React, { useState } from 'react';

import ImageSpinner from '../loading/image-spinner.component';

type Props = {
	alt: string;
	src: string;
	className?: string;
	height?: string;
	width?: string;
};

const ImageWithSpinner = ({ alt, src, ...props }: Props) => {
	const [loaded, setLoaded] = useState(false);

	const img = document.createElement('img');
	img.src = src;
	img.onload = () => setLoaded(true);

	return (
		<>
			{loaded ? (
				<img src={src} alt={alt} {...props} />
			) : (
				<ImageSpinner {...props} />
			)}
		</>
	);
};

export default ImageWithSpinner;
