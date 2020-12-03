import { action, thunk } from 'easy-peasy';

const model = {
	// Store
	localStorage: [],
	windowWidth: window.innerWidth,
	isMobileSearchInactive: true,
	isOptionClicked: false,
	isDropdownOpen: false,
	search: '',
	selectedMovie: {},
	tmdbDiscoverData: {},
	tmdbSearchData: {},
	imdbSearchData: {},
	imdbMovieData: {},
	youTubeVideoId: '',
	isLoading: {
		tmdbDiscoverData: false,
		tmdbSearchData: false,
		imdbSearchData: false,
		imdbMovieData: false,
		youTubeSearchData: false,
	},
	fetchError: null,
	noMatchError: '',
	// Data fetching
	fetchData: thunk(
		async (
			{
				setTmdbDiscoverData,
				setTmdbSearchData,
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
					case 'tmdbDiscoverUrl':
						setTmdbDiscoverData(data);
						break;
					case 'tmdbSearchUrl':
						setTmdbSearchData(data);
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
	setOptionClicked: action((state) => {
		state.isOptionClicked = !state.isOptionClicked;
	}),
	setMobileSearchInactive: action((state, payload) => {
		state.isMobileSearchInactive = payload;
	}),
	setWindowWidth: action((state, payload) => {
		state.windowWidth = payload;
	}),
	setFetchError: action((state, payload) => {
		state.fetchError = payload;
	}),
	setTmdbDiscoverData: action((state, payload) => {
		state.tmdbDiscoverData = { ...payload };
	}),
	setTmdbSearchData: action((state, payload) => {
		state.tmdbSearchData = { ...payload };
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
		// payload.items[0].snippet.thumbnails
		const youTubeVideoId = payload.items
			.filter((item, idx) => idx < 1)
			.map(({ id }) => id.videoId)
			.pop();

		state.youTubeVideoId = youTubeVideoId;
	}),
	setLoading: action((state, [urlKey, loading]) => {
		switch (urlKey) {
			case 'tmdbDiscoverUrl':
				state.isLoading.tmdbDiscoverData = loading;
				break;
			case 'tmdbSearchUrl':
				state.isLoading.tmdbSearchData = loading;
				break;
			case 'imdbSearchUrl':
				state.isLoading.imdbSearchData = loading;
				break;
			case 'imdbMovieUrl':
				state.isLoading.imdbMovieData = loading;
				break;
			case 'youtubeUrl':
				state.isLoading.youTubeSearchData = loading;
				break;
			default:
				break;
		}
	}),
	getLocalStorage: action((state) => {
		if (localStorage.getItem('searchedMovies')) {
			state.localStorage = [...JSON.parse(localStorage.getItem('searchedMovies'))];
		} else {
			localStorage.setItem('searchedMovies', JSON.stringify([]));
		}
	}),
	setLocalStorage: action((state, payload) => {
		if (state.localStorage.some((movie) => movie.title === payload.title)) {
			return;
		}
		const localStorageItems = [...state.localStorage, payload];
		if (localStorageItems.length > 10) {
			localStorageItems.shift();
		}
		if (localStorage.getItem('searchedMovies')) {
			localStorage.setItem('searchedMovies', JSON.stringify(localStorageItems));
		}
	}),
	setNoMatchError: action((state) => {
		state.noMatchError = '';
	}),
};

export default model;
