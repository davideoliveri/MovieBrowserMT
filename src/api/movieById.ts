import { useState, useEffect } from 'react'

export interface CastMember {
	id: number
	name: string
	profile_path: string | null
	cast_id: number
	character: string
}

export interface MovieDetailsData {
	id: number
	title: string
	overview: string
	poster_path: string | null
	release_date: string
	vote_average: number
	runtime: number,
	credits: { cast: CastMember[] }
}

export function useMovieDetails(id: string | undefined) {
	const [movie, setMovie] = useState<MovieDetailsData | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!id) return

		const controller = new AbortController()
		const apiKey = import.meta.env.VITE_TMDB_API_KEY

		async function fetchDetails() {
			setLoading(true)
			setError(null)
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