import { useLoaderData } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { AddRemoveFromWishlist } from '../../components/AddOrRemoveFromWishlistButton/AddOrRemoveFromWishlistButton';
import { genreClasses } from '../../enums/genresClasses';
import { API } from '../../api/API';
import { MovieDetailsData } from '../../interfaces/MovieDetailsDataInterface';
import { LoaderFunctionArgs } from 'react-router-dom';
import { CastCard } from '../../components/CastCard/CastCard';

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<MovieDetailsData> {
  const movieId = params.id;
  if (!movieId) {
    throw new Response('Movie ID not found', { status: 404 });
  }
  const movie = await API.getMovieById(movieId);
  return movie;
}

export const MovieDetailsPage: React.FC = () => {
  const movie = useLoaderData() as MovieDetailsData;

  type genreKeys = keyof typeof genreClasses;
  const mainGenreName: genreKeys = movie?.genres?.at(0)?.name || 'Drama';

  const genreClassModifier = genreClasses[mainGenreName] || '';

  return (
    <Layout>
      <main className={`movie-details movie-details--${genreClassModifier}`}>
        {movie && (
          <>
            <div className="movie-details__info">
              {movie.poster_path && (
                <img
                  className="movie-details__poster"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
              <div className="movie-details__meta">
                <h1 className="h1 movie-details__title">{movie.title}</h1>
                <AddRemoveFromWishlist
                  movieId={movie.id}
                  movieGenre={genreClassModifier}
                />
                <p className="movie-details__essential">
                  <strong> {movie.vote_average.toFixed(1)} | </strong>
                  <strong> {movie.release_date.split('-')[0]} |</strong>
                  <strong> {movie.runtime} min </strong>
                </p>
                <p className="movie-details__overview">{movie.overview}</p>
                <div className="movie-details__genres">
                  {movie.genres?.map((genre) => (
                    <span className="movie-details__genre-badge" key={genre.id}>
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {movie.credits?.cast && movie.credits?.cast.length > 0 && (
              <section className="movie-details__cast">
                <h2 className="h2">Cast</h2>
                <ul className="movie-details__cast-list">
                  {movie.credits.cast.map((c) => (
                    <li key={c.cast_id}>
                      <CastCard cast={c} />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </main>
    </Layout>
  );
};
