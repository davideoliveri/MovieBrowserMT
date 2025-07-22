import { useMovieById } from './useMovieById';
import { useWishlistMovies } from './useWishlistMovies';
import { useMoviesByGenre } from './useMoviesByGenre';
import { UseWishlistMoviesOptions } from '../interfaces/UseWishlistMoviesOptionsInterface';

export const API = {
  getMovieById: (movieId: string | undefined) => {
    return useMovieById(movieId);
  },
  getWishlistMovies: (opt: UseWishlistMoviesOptions) => {
    return useWishlistMovies(opt);
  },
  getMoviesByGenre: (genreId: number) => {
    return useMoviesByGenre(genreId);
  },
};
