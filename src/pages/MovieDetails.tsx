import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMovieDetails } from '../api/movieById'
import { Layout } from '../components/Layout'
import { useWishlist } from '../store/whislist'

export const MovieDetails: React.FC = () => {
	const { id: movieId } = useParams<{ id: string }>()
	const { movie, loading, error } = useMovieDetails(movieId)
	const { state: entries, dispatch } = useWishlist()
	const [isWishlisted, setIsWishlisted] = useState<boolean>(false)

	useEffect(() => {
		if (!movie) return
		setIsWishlisted(entries.some(entry => entry.id === movie.id))
	}, [movie, entries])

	const addRemoveFromWishlist = () => {
		if (isWishlisted) {
			dispatch({ type: 'REMOVE', id: movie.id })
		} else {
			dispatch({ type: 'ADD', entry: {id: movie.id, dateAdded: Date.now()} })
		}
	}

	return (
		<Layout>
			<main className="movie-details">
				{loading && <p>Loading details…</p>}
				{error && <p className="movie-details__error">Error: {error}</p>}
				{movie && (
					<>
						<h1 className="movie-details__title">{movie.title}</h1>
						<div className="movie-details__info">
							{movie.poster_path && (
								<img
									className="movie-details__poster"
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.title}
								/>
							)}
							<div className="movie-details__meta">
								<p><strong>Release:</strong> {movie.release_date}</p>
								<p><strong>Runtime:</strong> {movie.runtime} min</p>
								<p><strong>Score:</strong> {movie.vote_average.toFixed(1)}</p>
								<h2>Overview</h2>
								<p>{movie.overview}</p>
								<button onClick={addRemoveFromWishlist}>{isWishlisted ? 'Remove from' : 'Add to'} Wishlist</button>
							</div>
						</div>
						{movie.credits.cast.length > 0 && (
							<section className="movie-details__cast">
								<h2>Cast</h2>
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
												<p className="movie-details__cast-member-name">{c.name}</p>
												{c.character &&
													<p className="movie-details__cast-member-character">as {c.character}</p>
												}
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
	)
}