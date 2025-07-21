import React from 'react'
import { useMoviesByGenre } from '../api/moviesByGenre';
import { Movie } from '../interfaces/MovieInterface';
import { MovieCard } from '../components/movieCard';

enum Genres {
	"Action" = 28,
	"Adventure" = 12,
	"Animation" = 16,
	"Comedy" = 35,
	"Crime" = 80,
	"Documentary" = 99,
	"Drama" = 18,
	"Family" = 10751,
	"Fantasy" = 14,
	"History" = 36,
	"Horror" = 27,
	"Music" = 10402,
	"Mystery" = 9648,
	"Romance" = 10749,
	"Science Fiction" = 878,
	"TV Movie" = 10770,
	"Thriller" = 53,
	"War" = 10752,
	"Western" = 37,
}

type genreKeys = keyof typeof Genres;

interface CarouselProps {
	genreName: genreKeys
}


export const Carousel: React.FC<CarouselProps> = ({ genreName }): React.ReactNode => {
	const genreID: number = Genres[genreName];
	const { movies, loading, error } = useMoviesByGenre(genreID)
	return (
		<section>
			<h2 className='h2 carousel__title'>{genreName} movies</h2>
			<div className='carousel'>
				{loading && <p className="movies-by-genre__status">Loading…</p>}
				{error && <p className="movies-by-genre__status">Error: {error}</p>}
				<ul className="carousel__list">
					{movies.map((m: Movie) => (
						<MovieCard key={m.id} id={m.id} title={m.title} release_date={m.release_date} vote_average={Number(m.vote_average.toFixed(1))} poster_path={m.poster_path}></MovieCard>
					))}
				</ul>
			</div>
		</section>
	)
}