import { action, thunk } from 'easy-peasy';

const model = {
	// Store
	search: '',
	selectedMovie: {},
	isDropdownOpen: false,
	searchedMovies: [],
	movie: {},
	youTubeId: '',
	movieLoading: false,
	searchLoading: false,
	youTubeSearchLoading: false,
	movieError: null,
	searchError: null,
	youTubeSearchError: null,
	// Data fetching
	getYouTubeSearch: thunk(
		async (
			{ setYouTubeId, setYouTubeSearchLoading, setYouTubeSearchError },
			payload = 'movie trailers',
			{ getState }
		) => {
			const {
				selectedMovie: { title, release_date },
			} = getState();
			const numberOfResults = payload === 'movie trailers' ? 10 : 1;
			const query = `${title} ${release_date.split('-')[0]} Official Trailer`;
			const API_KEY = 'AIzaSyAzfm1mH_Na72MR_G7zeAq7QPSUiBD4nCI';
			const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${numberOfResults}&q=${query}&key=${API_KEY}`;
			setYouTubeSearchLoading(true);
			setYouTubeSearchError(null);

			try {
				const youTubeResponse = await fetch(url);
				const youTubeData = await youTubeResponse.json();

				if (!youTubeResponse.ok) {
					throw new Error(youTubeData.error);
				}

				console.log('resp', youTubeData);

				const videoId = youTubeData.items
					.filter((item, idx) => idx < 1)
					.map(({ id }) => id.videoId);

				setYouTubeId(videoId[0]);
				setYouTubeSearchLoading(false);
			} catch (error) {
				console.log(error);
				setYouTubeSearchError(error);
				setYouTubeSearchLoading(false);
			}
		}
	),
	getMoviesSearch: thunk(
		async ({ setMoviesSearch, setSearchLoading, setSearchError }, searchTerm) => {
			const query = `query=${searchTerm || '%00'}`;
			const API_KEY = 'api_key=68475f6c6a3dd0d5fda299f9ce48a964';
			setSearchLoading(true);
			setSearchError(null);

			try {
				const searchResponse = await fetch(
					`https://api.themoviedb.org/3/search/movie?${API_KEY}&${query}`
				);
				const searchData = await searchResponse.json();

				if (!searchResponse.ok) {
					throw new Error(searchData.error);
				}

				setMoviesSearch(searchData);
				setSearchLoading(false);
			} catch (error) {
				console.log(error);
				setSearchError(error);
				setSearchLoading(false);
			}
		}
	),
	getMovie: thunk(
		async (
			{ setMovie, setMovieLoading, setMovieError },
			{ title, release_date }
		) => {
			const query = `s=${title}`;
			const API_KEY = 'apikey=4a682a75';
			setMovieLoading(true);
			setMovieError(null);

			try {
				const imdbSeachResponse = await fetch(
					`https://www.omdbapi.com/?${API_KEY}&${query}`
				);
				const imdbSearchData = await imdbSeachResponse.json();

				if (!imdbSeachResponse.ok) {
					throw new Error(imdbSearchData.errors);
				}

				if (imdbSearchData.Error) {
					throw new Error(imdbSearchData.Error);
				}

				const filteredSearchData = imdbSearchData.Search.filter(
					({ Title, Year }) => Title === title && Year === release_date.split('-')[0]
				).pop();

				if (!filteredSearchData) {
					throw new Error('IMDB id not found');
				}

				const imdbGetMovieResponse = await fetch(
					`https://www.omdbapi.com/?${API_KEY}&i=${filteredSearchData.imdbID}`
				);
				const imdbMovieData = await imdbGetMovieResponse.json();

				if (!imdbGetMovieResponse.ok) {
					throw new Error(imdbMovieData.error);
				}

				if (imdbMovieData.Error) {
					throw new Error(imdbMovieData.Error);
				}

				setMovie(imdbMovieData);
				setMovieLoading(false);
			} catch (error) {
				console.log(error);
				setMovieError(error);
				setMovieLoading(false);
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
	setMovieLoading: action((state, payload) => {
		state.movieLoading = payload;
	}),
	setSearchLoading: action((state, payload) => {
		state.searchLoading = payload;
	}),
	setYouTubeSearchLoading: action((state, payload) => {
		state.youTubeSearchLoading = payload;
	}),
	setMovieError: action((state, payload) => {
		state.movieError = payload;
	}),
	setSearchError: action((state, payload) => {
		state.searchError = payload;
	}),
	setYouTubeSearchError: action((state, payload) => {
		state.youTubeSearchError = payload;
	}),
	setMoviesSearch: action((state, payload) => {
		state.searchedMovies = [...payload.results];
	}),
	setMovie: action((state, payload) => {
		state.movie = { ...payload };
	}),
	setYouTubeId: action((state, payload) => {
		state.youTubeId = payload;
	}),
};

export default model;
