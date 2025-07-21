import { useMovieDetails } from './movieById'
import { UseWishlistMoviesOptions } from '../interfaces/UseWishlistMoviesOptionsInterface'
import { useWishlistMovies } from './wishlistMovies'
import { useMoviesByGenre } from './moviesByGenre'


export const API = {
	getMovieById: (movieId: string | undefined) => {
		return useMovieDetails(movieId)
	},
	getWishlistMovies: (opt: UseWishlistMoviesOptions) => {
		return useWishlistMovies(opt)
	},
	getMoviesByGenre: (genreId: number) => {
		return useMoviesByGenre(genreId)
	}
}

