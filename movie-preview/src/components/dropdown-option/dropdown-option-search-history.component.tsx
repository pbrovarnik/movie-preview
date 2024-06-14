import { useNavigate } from 'react-router-dom';

import { useStoreActions } from '../../easy-peasy/store-hooks';
import { TmdbSearchResultsType } from '../../easy-peasy/types';

const DropdownOptionsSearchHistory = ({ movie: { id, title } }: { movie: TmdbSearchResultsType }) => {
	const navigate = useNavigate();
	const setOptionClicked = useStoreActions((actions) => actions.setOptionClicked);
	const toggleDropdown = useStoreActions((actions) => actions.toggleDropdown);

	const handleClick = () => {
		toggleDropdown();
		setOptionClicked();
		navigate(`/preview/${id}`);
	};
	return (
		<div className="dropdown__item" onClick={handleClick}>
			<div className="dropdown__item-with-icon">
				<i className="material-icons">history</i>
				<div className="dropdown__item--title">{title}</div>
			</div>
			<i className="material-icons">arrow_back</i>
		</div>
	);
};

export default DropdownOptionsSearchHistory;
