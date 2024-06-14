import { Action, Thunk } from 'easy-peasy';

import {
	TmdbSearchResultsType,
	TmdbMovieDataType,
	TmdbSearchDataType,
	TmdbVideoDataType,
	OmdbMovieDataType,
	YouTubeVideoType,
	FetchUrlType,
} from './types';

export interface Model {
	// Store
	localStorage: TmdbSearchResultsType[];
	windowWidth: number;
	isMobileSearchInactive: boolean;
	isOptionClicked: boolean;
	isDropdownOpen: boolean;
	search: string;
	pageNum: number;
	tmdbDiscoverData: TmdbSearchResultsType[];
	tmdbSearchData: TmdbSearchDataType;
	tmdbMovieData: TmdbMovieDataType;
	omdbMovieData: OmdbMovieDataType;
	youTubeVideoId: string;
	similarMoviesData: TmdbSearchResultsType[];
	isLoading: {
		tmdbDiscoverData: boolean;
		tmdbSearchData: boolean;
		tmdbMovieData: boolean;
		omdbMovieData: boolean;
		youTubeSearchData: boolean;
	};
	fetchError: boolean;
	// Data fetching
	fetchData: Thunk<Model, FetchUrlType>;
	fetchTmdbDiscoverData: Thunk<Model, number>;
	fetchTmdbSearchData: Thunk<Model, string>;
	fetchAllDataForMovie: Thunk<Model, number>;
	fetchTmdbMovieData: Thunk<Model, number>;
	fetchOmdbMovieData: Thunk<Model, TmdbMovieDataType>;
	fetchVideoData: Thunk<Model, TmdbSearchResultsType>;
	fetchSimilarMoviesData: Thunk<Model, number>;
	// Actions
	addSearch: Action<Model, string>;
	toggleDropdown: Action<Model>;
	setOptionClicked: Action<Model>;
	setMobileSearchInactive: Action<Model, boolean>;
	setWindowWidth: Action<Model, number>;
	setFetchError: Action<Model, boolean>;
	setPageNum: Action<Model, number>;
	setTmdbDiscoverData: Action<Model, TmdbSearchDataType>;
	setTmdbSearchData: Action<Model, TmdbSearchDataType>;
	setTmdbMovieData: Action<Model, TmdbMovieDataType>;
	setOmdbMovieData: Action<Model, OmdbMovieDataType>;
	setTmdbVideoData: Action<Model, TmdbVideoDataType>;
	setYouTubeData: Action<Model, YouTubeVideoType>;
	setSimilarMoviesData: Action<Model, TmdbSearchDataType>;
	clearSimilarMoviesData: Action<Model>;
	clearYouTubeVideoId: Action<Model>;
	setLoading: Action<Model, [string, boolean]>;
	getLocalStorage: Action<Model>;
	setLocalStorage: Action<Model, TmdbSearchResultsType>;
}
