import { Link } from 'react-router-dom';
import { MovieDetailsData } from '../../interfaces/MovieDetailsDataInterface';
import { AddRemoveFromWishlist } from '../AddOrRemoveFromWishlistButton/AddOrRemoveFromWishlistButton';
import MoviePlaceholder from '../../assets/images/placeholder-movie.svg';

const basePosterURL: string = 'https://image.tmdb.org/t/p/';
const maxThumbnailsize = 300;

export const MovieCard: React.FC<MovieDetailsData> = (
  props
): React.ReactNode => {
  const posterSrc = props.poster_path
    ? `${basePosterURL}w${maxThumbnailsize}${props.poster_path}`
    : MoviePlaceholder;

  return (
    <div className="movie-card">
      <Link to={`/moviedetails/${props.id}`} className="movie-card__link">
        <img
          className="movie-card__poster"
          src={posterSrc}
          alt={'poster for ' + props.title}
        />
      </Link>
      <div className="movie-card__info">
        <AddRemoveFromWishlist
          movieId={props.id}
          movieGenre="base"
        ></AddRemoveFromWishlist>
        <h4 className="h4 movie-card__title">{props.title}</h4>
        <div className="movie-card__meta">
          <h4 className="h5">📅 {props.release_date}</h4>
          <h4 className="h5">🎖️ {props.vote_average}</h4>
        </div>
      </div>
    </div>
  );
};
