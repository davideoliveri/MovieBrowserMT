import React from 'react'
import { Link } from 'react-router-dom'
import { MovieCardProps } from '../interfaces/MovieCardPropsInterface';
import { AddRemoveFromWishlist } from './addOrRemoveFromWishlistButton';

const basePosterURL: string = "https://image.tmdb.org/t/p/";
const maxThumbnailsize = 300;

export const MovieCard: React.FC<MovieCardProps> = (props): React.ReactNode => {
	return (
		<li className='movie-card'>
			<Link to={`/moviedetails/${props.id}`} className="movie-card">
				<img className="movie-card__poster" src={basePosterURL + `w${maxThumbnailsize}` + props.posterPath} alt={'poster for ' + props.title} />
			</Link>
			<AddRemoveFromWishlist movieId={props.id}></AddRemoveFromWishlist>
			<h3>Title: {props.title}</h3>
			<h3>Release date: {props.releaseDate}</h3>
			<h3>Score: {props.voteAverage}</h3>
			<h2>ID: {props.id}</h2>
		</li>
	)
}