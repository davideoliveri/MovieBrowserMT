import { useMovieById } from './movieById';
import { useWishlistMovies } from './wishlistMovies';
import { useMoviesByGenre } from './moviesByGenre';
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
