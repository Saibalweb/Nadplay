// constants/api.ts
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
export const API_IMAGE_URL = process.env.EXPO_PUBLIC_Image_URL;
export const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const ENDPOINTS = {
  getMoviesUrl: `${API_BASE_URL}/movies`,
  getMovieDetailsUrl: (id: string) => `${API_BASE_URL}/movies/${id}`,
  fetchMovieUrl: (pageNumber: number) =>
    `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`,
  fetchMovieByGenreUrl: (genreId: number, pageNumber: number) =>
    `${API_BASE_URL}/discover/movie?with_genres=${genreId}&include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`,
  movieDetailsUrl: (movieId: string) =>
    `${API_BASE_URL}/movie/${movieId}?language=en-US`,
};
