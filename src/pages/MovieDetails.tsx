import React from 'react'
import { useParams } from 'react-router-dom'
import { useMovieDetails, MovieDetailsData } from '../api/movieById'
import { Layout } from '../components/Layout'

export const MovieDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const { movie, loading, error } = useMovieDetails(id)

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
								<p><strong>Score:</strong> {movie.vote_average}/10</p>
							</div>
						</div>
						<section className="movie-details__overview">
							<h2>Overview</h2>
							<p>{movie.overview}</p>
						</section>
						{movie.credits.cast.length > 0 && (
							<section className="movie-details__cast">
								<h2>Cast</h2>
								<ul className="movie-details__cast-list">
									{movie.credits.cast.slice(0, 8).map((c) => (
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
												<p className="movie-details__cast-member-character">as {c.character}</p>
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