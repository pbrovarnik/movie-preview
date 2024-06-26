import { useNavigate, useLocation } from 'react-router-dom';

import { useStoreState } from '../../easy-peasy/store-hooks';

import MovieSearch from '../movie-search/movie-search.component';
import filmIcon from '../../assets/icons/film-solid.svg';

const Hero = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const isMobileSearchInactive = useStoreState((state) => state.isMobileSearchInactive);

	const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);

	const handleTitleClick = () => {
		location.pathname !== '/' && navigate('/');
	};

	return (
		<div className="hero">
			<div className="hero__body">
				<div className={`hero__container ${isMobileSearchInactive ? 'z-index-1' : ''}`} {...(isMobile ? { onTouchStart: handleTitleClick } : { onClick: handleTitleClick })}>
					<span className="hero__icon">
						<img src={filmIcon} alt="logo" />
					</span>
					<div className="hero__title">Movie Preview</div>
				</div>
				<MovieSearch />
			</div>
		</div>
	);
};

export default Hero;
