import { MovieCard } from './MovieCard';
import { API } from '../api/API';
import { Genres, CarouselProps } from '../interfaces/CarouselPropsInterface'

export const Carousel: React.FC<CarouselProps> = ({ genreName }): React.ReactNode => {
	const genreID: number = Genres[genreName];
	const { movies, loading, error } = API.getMoviesByGenre(genreID)
	return (
		<section>
			<h2 className='h2 carousel__title'>{genreName} movies</h2>
			<div className='carousel'>
				{loading && <p className="movies-by-genre__status">Loading…</p>}
				{error && <p className="movies-by-genre__status">Error: {error}</p>}
				<ul className="carousel__list">
					{movies.map((m) => (
						<MovieCard key={m.id} id={m.id} title={m.title} release_date={m.release_date} vote_average={Number(m.vote_average.toFixed(1))} poster_path={m.poster_path}></MovieCard>
					))}
				</ul>
			</div>
		</section>
	)
}