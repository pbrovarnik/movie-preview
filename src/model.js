import { action, thunk } from 'easy-peasy';

const model = {
	// Store
	isDropdownOpen: false,
	search: '',
	selectedMovie: {},
	movieDbSearchData: {},
	imdbSearchData: {},
	imdbMovieData: {},
	youTubeVideoId: '',
	loading: false,
	fetchError: null,
	noMatchError: '',
	// Data fetching
	fetchData: thunk(
		async (
			{
				setMovieDbSearchData,
				setImdbSearchData,
				setImdbMovieData,
				setYouTubeData,
				setLoading,
				setFetchError,
			},
			url
		) => {
			setLoading(true);
			setFetchError(null);

			try {
				const response = await fetch(...Object.values(url));
				const data = await response.json();

				if (!response.ok) {
					throw data.error;
				}

				if (data.Error) {
					throw data.Error;
				}

				switch (Object.keys(url)[0]) {
					case 'movieDbUrl':
						setMovieDbSearchData(data);
						break;
					case 'imdbSearchUrl':
						setImdbSearchData(data);
						break;
					case 'imdbMovieUrl':
						setImdbMovieData(data);
						break;
					case 'youtubeUrl':
						setYouTubeData(data);
						break;
					default:
						break;
				}

				setLoading(false);
			} catch (error) {
				console.log(error);
				setFetchError(error);
				setLoading(false);
			}
		}
	),
	// Actions
	setSelectedMovie: action((state, payload) => {
		state.selectedMovie = { ...payload };
	}),
	addSearch: action((state, payload) => {
		state.search = payload;
	}),
	toggleDropdownOpen: action((state) => {
		state.isDropdownOpen = !state.isDropdownOpen;
	}),
	setLoading: action((state, payload) => {
		state.loading = payload;
	}),
	setFetchError: action((state, payload) => {
		state.fetchError = payload;
	}),
	setMovieDbSearchData: action((state, payload) => {
		state.movieDbSearchData = { ...payload };
	}),
	setImdbSearchData: action((state, payload) => {
		const imdbSearchData = payload.Search.filter(
			({ Title, Year }) =>
				Title === state.selectedMovie.title &&
				Year === state.selectedMovie.release_date.split('-')[0]
		).pop();

		if (!imdbSearchData && payload.Search.length) {
			state.noMatchError = 'IMDB id not found';
			return;
		}

		state.imdbSearchData = { ...imdbSearchData };
	}),
	setImdbMovieData: action((state, payload) => {
		state.imdbMovieData = { ...payload };
	}),
	setYouTubeData: action((state, payload) => {
		const youTubeVideoId = payload.items
			.filter((item, idx) => idx < 1)
			.map(({ id }) => id.videoId)
			.pop();

		state.youTubeVideoId = youTubeVideoId;
	}),
};

export default model;
