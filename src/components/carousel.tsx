import React, { useState } from 'react'
import { useMoviesByGenre, Movie } from '../api/moviesByGenre';
import { MovieCard } from '../components/movieCard';

enum Genres {
	Animation = 16,
	Action = 28,
	Horror= 27,
	Comedy = 35,
	Drama = 18
}

type genreKeys = keyof typeof Genres;

interface CarouselProps {
	genreName: genreKeys
}


export const Carousel: React.FC<CarouselProps> = ({ genreName }): React.ReactNode => {
	const genreID: number = Genres[genreName];
	const [genre, setGenre] = useState<number>(Genres[genreName])
	const { movies, loading, error } = useMoviesByGenre(genreID)
	return <>
		<h2 className='carousel__title'>Carousel - {genreName}</h2>
		<div className='carousel'>
			{loading && <p className="movies-by-genre__status">Loading…</p>}
			{error && <p className="movies-by-genre__status">Error: {error}</p>}
			<ul className="carousel__list">
				{movies.map((m: Movie) => (
					<MovieCard key={m.id} id={m.id} title={m.title} releaseDate={m.release_date} voteAverage={m.vote_average.toFixed(1)} posterPath={m.poster_path}></MovieCard>
				))}
			</ul>
		</div>
	</>
}