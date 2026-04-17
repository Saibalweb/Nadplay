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

export const ENDPOINTS = {
  getMoviesUrl,
  getMovieDetailsUrl,
  fetchMovieUrl,
  fetchMovieByGenreUrl,
  movieDetailsUrl,
};
