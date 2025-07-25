import { useWishlistMovies } from './useWishlistMovies/useWishlistMovies';
import { UseWishlistMoviesOptions } from '../interfaces/WishlistMoviesOptionsInterface';
import { getMovieById } from './getMovieById/getMovieById';
import { getMoviesByGenre } from './getMoviesByGenre/getMoviesByGenre';

export const API = {
  getMovieById,
  getWishlistMovies: (opt: UseWishlistMoviesOptions) => {
    return useWishlistMovies(opt);
  },
  getMoviesByGenre,
};
