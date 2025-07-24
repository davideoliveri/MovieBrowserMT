import { useWishlistMovies } from './useWishlistMovies';
import { UseWishlistMoviesOptions } from '../interfaces/UseWishlistMoviesOptionsInterface';
import { getMovieById } from './getMovieById';
import { getMoviesByGenre } from './getMoviesByGenre';

export const API = {
  getMovieById,
  getWishlistMovies: (opt: UseWishlistMoviesOptions) => {
    return useWishlistMovies(opt);
  },
  getMoviesByGenre,
};
