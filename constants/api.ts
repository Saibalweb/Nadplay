// constants/api.ts
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
export const API_IMAGE_URL = process.env.EXPO_PUBLIC_Image_URL;
export const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const getMoviesUrl = `${API_BASE_URL}/movies`;

export const getMovieDetailsUrl = (id: string) => `${API_BASE_URL}/movies/${id}`;

export const fetchMovieUrl = (pageNumber: number) =>
  `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`;

export const fetchMovieByGenreUrl = (genreId: number, pageNumber: number) =>
  `${API_BASE_URL}/discover/movie?with_genres=${genreId}&include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`;

export const movieDetailsUrl = (movieId: string) =>
  `${API_BASE_URL}/movie/${movieId}?language=en-US`;

export const movieCreditsUrl = (movieId: string) =>
  `${API_BASE_URL}/movie/${movieId}/credits?language=en-US`;

export const searchMoviesUrl = (query: string, pageNumber: number = 1) =>
  `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${pageNumber}`;

export const fetchTrendingUrl = (pageNumber: number = 1) =>
  `${API_BASE_URL}/trending/movie/day?language=en-US&page=${pageNumber}`;

export const fetchGenreListUrl = () =>
  `${API_BASE_URL}/genre/movie/list?language=en-US`;

export const fetchMoviesByLanguageUrl = (languageCode: string, pageNumber: number = 1) =>
  `${API_BASE_URL}/discover/movie?with_original_language=${languageCode}&include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`;

export const ENDPOINTS = {
  getMoviesUrl,
  getMovieDetailsUrl,
  fetchMovieUrl,
  fetchMovieByGenreUrl,
  movieDetailsUrl,
  searchMoviesUrl,
  fetchTrendingUrl,
  fetchGenreListUrl,
  fetchMoviesByLanguageUrl,
};
