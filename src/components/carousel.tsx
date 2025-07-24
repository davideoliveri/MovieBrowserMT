import { MovieCard } from './MovieCard';
import { Movie } from '../interfaces/MovieInterface';
interface CarouselProps {
  genreName: string;
  movies: Movie[];
}

export const Carousel: React.FC<CarouselProps> = ({ genreName, movies }) => {
  return (
    <section>
      <h2 className="h2 carousel__title">{genreName} movies</h2>
      <div className="carousel">
        <ul className="carousel__list">
          {movies.map((m) => (
            <MovieCard
              key={m.id}
              id={m.id}
              title={m.title}
              release_date={m.release_date}
              vote_average={Number(m.vote_average.toFixed(1))}
              poster_path={m.poster_path}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
