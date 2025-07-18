import { useState, useEffect } from 'react'
import { MovieDetailsData } from '../interfaces/MovieDetailsDataInterface'

export function useMovieDetails(id: string | undefined) {
	const [movie, setMovie] = useState<MovieDetailsData>(null!)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string>(null!)

	useEffect(() => {
		if (!id) return

		const controller = new AbortController()
		const apiKey = import.meta.env.VITE_TMDB_API_KEY

		async function fetchDetails() {
			setLoading(true)
			setError(null!)
			try {
				const res = await fetch(
					`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos,images,credits`,
					{ signal: controller.signal }
				)
				if (!res.ok) throw new Error(res.statusText)
				const data: MovieDetailsData = await res.json()
				setMovie(data)
			} catch (err: any) {
				if (err.name !== 'AbortError') setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchDetails()
		return () => { controller.abort() }
	}, [id])

	return { movie, loading, error }
}