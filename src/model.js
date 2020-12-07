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
	tmdbMovieData: {},
	omdbMovieData: {},
	youTubeVideoId: '',
	isLoading: {
		tmdbDiscoverData: false,
		tmdbSearchData: false,
		tmdbMovieData: false,
		omdbMovieData: false,
		youTubeSearchData: false,
	},
	fetchError: null,
	// Data fetching
	fetchData: thunk(async ({ setLoading, setFetchError }, url) => {
		const urlKey = Object.keys(url)[0];
		setLoading([urlKey, true]);
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

			setLoading([urlKey, false]);
			return data;
		} catch (error) {
			console.log('FETCH ERROR:', error);
			setFetchError(error);
			setLoading([urlKey, false]);
		}
	}),
	fetchTmdbDiscoverData: thunk(async ({ fetchData, setTmdbDiscoverData }) => {
		const formatDate = (date) => {
			const day = date.getDate();
			const month = date.getMonth();
			return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${
				day < 10 ? '0' + day : day
			}`;
		};

		const date = new Date();
		const pastDate = new Date();
		pastDate.setMonth(pastDate.getMonth() - 12);

		const baseUrl = 'https://api.themoviedb.org/3/discover/movie';
		const API_KEY = `api_key=${process.env.REACT_APP_TMDB_KEY}`;
		const dateRange = `
			primary_release_date.gte=${formatDate(pastDate)}&
			primary_release_date.lte=${formatDate(date)}
		`;
		const sortBy = 'sort_by=popularity.desc';
		const url = `${baseUrl}?${API_KEY}&${dateRange}&${sortBy}&with_original_language=en&page=1`;
		const data = await fetchData({ tmdbDiscoverUrl: url });
		setTmdbDiscoverData(data);
	}),
	fetchTmdbSearchData: thunk(
		async ({ fetchData, setTmdbSearchData }, search) => {
			const query = `query=${search || '%00'}`;
			const API_KEY = `api_key=${process.env.REACT_APP_TMDB_KEY}`;
			const url = `https://api.themoviedb.org/3/search/movie?${API_KEY}&${query}`;
			const data = await fetchData({ tmdbSearchUrl: url });
			setTmdbSearchData(data);
		}
	),
	fetchAllDataForMovie: thunk(
		async ({ fetchTmdbMovieData, fetchOmdbMovieData, fetchVideoData }, id) => {
			const movieData = await fetchTmdbMovieData(id);
			await fetchOmdbMovieData(movieData);
			await fetchVideoData(movieData);
		}
	),
	fetchTmdbMovieData: thunk(async ({ fetchData, setTmdbMovieData }, id) => {
		const tmdbMovieUrl = `https://api.themoviedb.org/3/movie/${id}?&api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`;
		const data = await fetchData({ tmdbMovieUrl });
		setTmdbMovieData(data);
		return data;
	}),
	fetchOmdbMovieData: thunk(
		async ({ fetchData, setOmdbMovieData }, { imdb_id }) => {
			const omdbMovieUrl = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&i=${imdb_id}`;
			const data = await fetchData({ omdbMovieUrl });
			setOmdbMovieData(data);
		}
	),
	fetchVideoData: thunk(
		async (
			{ fetchData, setTmdbVideoData, setYouTubeData },
			{ id, title, release_date }
		) => {
			const { REACT_APP_TMDB_KEY, REACT_APP_YT_KEY } = process.env;
			const tmdbVideoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${REACT_APP_TMDB_KEY}&language=en-US`;
			const data = await fetchData({ tmdbVideoUrl });

			if (data.results.length) {
				setTmdbVideoData(data);
			} else {
				const numberOfResults = 1;
				const query = `${title} ${release_date.split('-')[0]} Official Trailer`;
				const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${numberOfResults}&q=${query}&key=${REACT_APP_YT_KEY}`;
				const ytData = await fetchData({ youtubeUrl });
				setYouTubeData(ytData);
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
	setTmdbMovieData: action((state, payload) => {
		state.tmdbMovieData = { ...payload };
	}),
	setOmdbMovieData: action((state, payload) => {
		state.omdbMovieData = { ...payload };
	}),
	setTmdbVideoData: action((state, payload) => {
		const youTubeVideoId = payload.results.filter((item, idx) => idx < 1).pop();
		state.youTubeVideoId = youTubeVideoId.key;
	}),
	setYouTubeData: action((state, payload) => {
		if (payload) {
			const youTubeVideoId = payload.items
				.filter((item, idx) => idx < 1)
				.map(({ id }) => id.videoId)
				.pop();

			state.youTubeVideoId = youTubeVideoId;
		}
	}),
	clearYouTubeVideoId: action((state) => {
		state.youTubeVideoId = '';
	}),
	setLoading: action((state, [urlKey, loading]) => {
		switch (urlKey) {
			case 'tmdbDiscoverUrl':
				state.isLoading.tmdbDiscoverData = loading;
				break;
			case 'tmdbSearchUrl':
				state.isLoading.tmdbSearchData = loading;
				break;
			case 'tmdbMovieUrl':
				state.isLoading.tmdbMovieData = loading;
				break;
			case 'omdbMovieUrl':
				state.isLoading.omdbMovieData = loading;
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
};

export default model;
