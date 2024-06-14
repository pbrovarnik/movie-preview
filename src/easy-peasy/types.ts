export interface TmdbSearchResultsType {
	backdrop_path: string;
	id: number;
	overview: string;
	poster_path: string;
	release_date: string;
	title: string;
}

export interface TmdbMovieDataType extends TmdbSearchResultsType {
	imdb_id: string;
}

export interface TmdbSearchDataType {
	results: TmdbSearchResultsType[];
}

export interface TmdbVideoResultType {
	id: string;
	iso_639_1: string;
	iso_3166_1: string;
	key: string;
	name: string;
	official: boolean;
	published_at: string;
	site: string;
	size: number;
	type: string;
}

export interface TmdbVideoDataType {
	id: number;
	results: TmdbVideoResultType[];
}

export interface OmdbRatingType {
	Source: string;
	Value: string;
}

export interface OmdbMovieDataType {
	Ratings: OmdbRatingType[];
	imdbRating: string;
	Metascore: string;
}

export interface YouTubeVideoItemType {
	id: { videoId: string };
}

export interface YouTubeVideoType {
	items: YouTubeVideoItemType[];
}

export interface FetchUrlType {
	[key: string]: string;
}
