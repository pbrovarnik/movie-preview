// import React, { useState } from 'react';

// const MobileSearch = () => {
// 	const [isInactive, setInactive] = useState(true);

// 	const handleClick = () => {
// 		setInactive(!isInactive);
// 	};

// 	return (
// 		<div
// 			className={`input-group search pull-right ${isInactive ? 'inactive' : ''}`}
// 		>
// 			<span
// 				className={`input-group-addon opener ${!isInactive ? 'bg-white' : ''}`}
// 			>
// 				<i
// 					className={`material-icons ${!isInactive ? 'icon-color' : ''}`}
// 					onClick={handleClick}
// 				>
// 					{isInactive ? 'search' : 'arrow_back'}
// 				</i>
// 			</span>
// 			<input type='text' className='form-control' placeholder='Search' />
// 		</div>
// 	);
// };

// export default MobileSearch;
