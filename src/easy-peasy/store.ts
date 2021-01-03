import { createStore, action, thunk } from 'easy-peasy';

import { Model } from './model';
import {
	TmdbSearchResultsType,
	TmdbMovieDataType,
	TmdbSearchDataType,
	TmdbVideoResultType,
	TmdbVideoDataType,
	OmdbMovieDataType,
	YouTubeVideoItemType,
	YouTubeVideoType,
} from './types';

export const store = createStore<Model>({
	// Store
	localStorage: [],
	windowWidth: window.innerWidth,
	isMobileSearchInactive: true,
	isOptionClicked: false,
	isDropdownOpen: false,
	search: '',
	pageNum: 1,
	tmdbDiscoverData: [],
	tmdbSearchData: { results: [] },
	tmdbMovieData: {
		backdrop_path: '',
		id: 0,
		overview: '',
		poster_path: '',
		release_date: '',
		title: '',
		imdb_id: '',
	},
	omdbMovieData: { Ratings: [], Metascore: '', imdbRating: '' },
	youTubeVideoId: '',
	similarMoviesData: [],
	isLoading: {
		tmdbDiscoverData: false,
		tmdbSearchData: false,
		tmdbMovieData: false,
		omdbMovieData: false,
		youTubeSearchData: false,
	},
	fetchError: false,
	// Data fetching
	fetchData: thunk(async (actions, url) => {
		const { setLoading, setFetchError } = actions;
		const urlKey = Object.keys(url)[0];
		const urlValue: string = Object.values(url)[0];
		setFetchError(false);
		setLoading([urlKey, true]);
		try {
			const response = await fetch(urlValue);
			const data = await response.json();
			if (!response.ok) {
				throw data.error;
			}
			if (data.Error) {
				throw data.Error;
			}
			return data;
		} catch (error) {
			console.log('FETCH ERROR:', error);
			setFetchError(true);
		} finally {
			setLoading([urlKey, false]);
		}
	}),
	fetchTmdbDiscoverData: thunk(async (actions, pageNum) => {
		const { fetchData, setTmdbDiscoverData } = actions;
		const formatDate = (date: Date) => {
			const day = date.getDate();
			const month = date.getMonth() + 1;
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
		const page = `page=${pageNum}`;
		const url = `${baseUrl}?${API_KEY}&${dateRange}&${sortBy}&${page}&with_original_language=en`;
		const data = await fetchData({ tmdbDiscoverUrl: url });
		setTmdbDiscoverData(data);
	}),
	fetchTmdbSearchData: thunk(async (actions, search) => {
		const { fetchData, setTmdbSearchData } = actions;
		const query = `query=${search || '%00'}`;
		const API_KEY = `api_key=${process.env.REACT_APP_TMDB_KEY}`;
		const url = `https://api.themoviedb.org/3/search/movie?${API_KEY}&${query}`;
		const data = await fetchData({ tmdbSearchUrl: url });
		setTmdbSearchData(data);
	}),
	fetchAllDataForMovie: thunk(async (actions, id) => {
		const {
			fetchTmdbMovieData,
			fetchOmdbMovieData,
			fetchVideoData,
			fetchSimilarMoviesData,
		} = actions;
		const movieData = await fetchTmdbMovieData(id);
		if (movieData) {
			fetchOmdbMovieData(movieData);
			fetchVideoData(movieData);
			fetchSimilarMoviesData(id);
		}
	}),
	fetchTmdbMovieData: thunk(async (actions, id) => {
		const { fetchData, setTmdbMovieData } = actions;
		const tmdbMovieUrl = `https://api.themoviedb.org/3/movie/${id}?&api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`;
		const data = await fetchData({ tmdbMovieUrl });
		setTmdbMovieData(data);
		return data;
	}),
	fetchOmdbMovieData: thunk(async (actions, { imdb_id }) => {
		const { fetchData, setOmdbMovieData } = actions;
		const omdbMovieUrl = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&i=${imdb_id}`;
		const data = await fetchData({ omdbMovieUrl });
		setOmdbMovieData(data);
	}),
	fetchVideoData: thunk(async (actions, { id, title, release_date }) => {
		const { fetchData, setTmdbVideoData, setYouTubeData } = actions;
		const { REACT_APP_TMDB_KEY, REACT_APP_YT_KEY } = process.env;
		const tmdbVideoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${REACT_APP_TMDB_KEY}&language=en-US`;
		const data = await fetchData({ tmdbVideoUrl });
		if (data.results.length) {
			setTmdbVideoData(data);
		} else {
			const query = `${title} ${release_date.split('-')[0]} Official Trailer`;
			const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${REACT_APP_YT_KEY}&q=${query}&type=video&maxResults=1`;
			const ytData = await fetchData({ youtubeUrl });
			setYouTubeData(ytData);
		}
	}),
	fetchSimilarMoviesData: thunk(async (actions, id) => {
		const { fetchData, setSimilarMoviesData } = actions;
		const similarMoviesUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`;
		const data = await fetchData({ similarMoviesUrl });
		setSimilarMoviesData(data);
	}),
	// Actions
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
	setPageNum: action((state, payload) => {
		state.pageNum = payload;
	}),
	setTmdbDiscoverData: action((state, payload: TmdbSearchDataType) => {
		state.tmdbDiscoverData = [...state.tmdbDiscoverData, ...payload.results];
	}),
	setTmdbSearchData: action((state, payload: TmdbSearchDataType) => {
		state.tmdbSearchData = { ...payload };
	}),
	setTmdbMovieData: action((state, payload: TmdbMovieDataType) => {
		state.tmdbMovieData = { ...payload };
	}),
	setOmdbMovieData: action((state, payload: OmdbMovieDataType) => {
		state.omdbMovieData = { ...payload };
	}),
	setTmdbVideoData: action((state, payload: TmdbVideoDataType) => {
		const youTubeVideoId = payload.results
			.filter((item: TmdbVideoResultType, idx: number) => idx < 1)
			.pop();
		if (youTubeVideoId) state.youTubeVideoId = youTubeVideoId.key;
	}),
	setSimilarMoviesData: action((state, payload: TmdbSearchDataType) => {
		const similarMovies = payload.results.filter(
			(item: TmdbSearchResultsType, idx: number) => idx < 2
		);
		state.similarMoviesData = [...similarMovies];
	}),
	setYouTubeData: action((state, payload: YouTubeVideoType) => {
		if (payload) {
			const youTubeVideoId = payload.items
				.filter((item: YouTubeVideoItemType, idx: number) => idx < 1)
				.map(({ id }: YouTubeVideoItemType) => id.videoId)
				.pop();

			if (youTubeVideoId) state.youTubeVideoId = youTubeVideoId;
		}
	}),
	clearSimilarMoviesData: action((state) => {
		state.similarMoviesData = [];
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
		const items = localStorage.getItem('searchedMovies');
		if (items) {
			state.localStorage = [...JSON.parse(items)];
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
});
