import * as pkg from 'react-router-dom';
const { useParams } = pkg;
// import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { AddRemoveFromWishlist } from '../components/AddOrRemoveFromWishlistButton';
import { genreClasses } from '../enums/genresClasses';
import { API } from '../api/API';

export const MovieDetails: React.FC = () => {
  const { id: movieId } = useParams<{ id: string }>();
  const { movie, loading, error } = API.getMovieById(movieId);

  type genreKeys = keyof typeof genreClasses;
  const mainGenreName: genreKeys = movie?.genres?.at(0)?.name || 'Drama';

  let genreClassModifier;

  if (mainGenreName) {
    genreClassModifier = genreClasses[mainGenreName];
  } else {
    genreClassModifier = '';
  }

  return (
    <Layout>
      <main className={`movie-details movie-details--${genreClassModifier}`}>
        {loading && <p>Loading details…</p>}
        {error && <p className="movie-details__error">Error: {error}</p>}
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
                  {movie.genres?.map((genre) => {
                    return (
                      <span
                        className="movie-details__genre-badge"
                        key={genre.id}
                      >
                        {genre.name}{' '}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            {movie.credits?.cast && movie.credits?.cast.length > 0 && (
              <section className="movie-details__cast">
                <h2 className="h2">Cast</h2>
                <ul className="movie-details__cast-list">
                  {movie.credits.cast.map((c) => (
                    <li key={c.cast_id} className="movie-details__cast-member">
                      {c.profile_path && (
                        <img
                          className="movie-details__cast-member-photo"
                          src={`https://image.tmdb.org/t/p/w185${c.profile_path}`}
                          alt={c.name}
                        />
                      )}
                      <div className="movie-details__cast-member-info">
                        <p className="movie-details__cast-member-name">
                          {c.name}
                        </p>
                        {c.character && (
                          <p className="movie-details__cast-member-character">
                            as {c.character}
                          </p>
                        )}
                      </div>
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
