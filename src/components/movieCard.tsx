import React from 'react'
import { Link } from 'react-router-dom'

interface MovieCardProps {
	title: string;
	releaseDate: string;
	voteAverage: string;
	posterPath: string | null;
	id: number
}
const basePosterURL: string = "https://image.tmdb.org/t/p/";
const maxThumbnailsize = 300;

export const MovieCard: React.FC<MovieCardProps> = (props): React.ReactNode => {
	return (
		<Link to={`/moviedetails/${props.id}`} className="movie-card">
			<li className='movie-card'>
				<img className="movie-card__poster" src={basePosterURL + `w${maxThumbnailsize}` + props.posterPath} alt={'poster for ' + props.title} />
				<h3>Title: {props.title}</h3>
				<h3>Release date: {props.releaseDate}</h3>
				<h3>Score: {props.voteAverage}</h3>
				<h2>ID: {props.id}</h2>
			</li>
		</Link>
	)
}