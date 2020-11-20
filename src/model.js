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
	isLoading: {
		movieDbSearch: false,
		imdbSearch: false,
		imdbMovieData: false,
		youTubeSearch: false,
	},
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
				setNoMatchError,
			},
			url
		) => {
			const urlKey = Object.keys(url)[0];
			setLoading([urlKey, true]);
			setFetchError(null);
			setNoMatchError();

			try {
				const response = await fetch(...Object.values(url));
				const data = await response.json();

				if (!response.ok) {
					throw data.error;
				}

				if (data.Error) {
					throw data.Error;
				}

				switch (urlKey) {
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
				setLoading([urlKey, false]);
			} catch (error) {
				console.log(error);
				setFetchError(error);
				setLoading([urlKey, false]);
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
	toggleDropdown: action((state) => {
		state.isDropdownOpen = !state.isDropdownOpen;
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
	setLoading: action((state, [urlKey, loading]) => {
		switch (urlKey) {
			case 'movieDbUrl':
				state.isLoading.movieDbSearch = loading;
				break;
			case 'imdbSearchUrl':
				state.isLoading.imdbSearch = loading;
				break;
			case 'imdbMovieUrl':
				state.isLoading.imdbMovieData = loading;
				break;
			case 'youtubeUrl':
				state.isLoading.youTubeSearch = loading;
				break;
			default:
				break;
		}
	}),
	setNoMatchError: action((state) => {
		state.noMatchError = '';
	}),
};

export default model;
