import React from 'react';

const ImageSpinner = ({ height = '281', width = '500', className }) => {
	return (
		<div className={`image-spinner-container ${className}`}>
			<svg height={height} width={width}>
				<g>
					<rect fill='#c5e3f8' height='100%' width='100%' />
				</g>
			</svg>
			<div className='spinner'></div>
		</div>
	);
};

export default ImageSpinner;
