// constants/api.ts
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
export const API_IMAGE_URL = process.env.EXPO_PUBLIC_Image_URL;
export const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const ENDPOINTS = {
  getMovies: `${API_BASE_URL}/movies`,
  getMovieDetails: (id: string) => `${API_BASE_URL}/movies/${id}`,
};
