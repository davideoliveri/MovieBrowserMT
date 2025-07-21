import { Link } from 'react-router-dom'
import { MovieDetailsData } from '../interfaces/MovieDetailsDataInterface';
import { AddRemoveFromWishlist } from './AddOrRemoveFromWishlistButton';

const basePosterURL: string = "https://image.tmdb.org/t/p/";
const maxThumbnailsize = 300;

export const MovieCard: React.FC<MovieDetailsData> = (props): React.ReactNode => {
	return (
		<li className='movie-card'>
			<Link to={`/moviedetails/${props.id}`} className="movie-card__link">
				<img className="movie-card__poster" src={basePosterURL + `w${maxThumbnailsize}` + props.poster_path} alt={'poster for ' + props.title} />
			</Link>
			<AddRemoveFromWishlist movieId={props.id} movieGenre='base'></AddRemoveFromWishlist>
			<h4 className="h4">{props.title}</h4>
			<h5 className="h5">Release date: {props.release_date}</h5>
			<h4 className="h4">Score: {props.vote_average}</h4>
		</li>
	)
}