import { useState, useEffect } from 'react';
import { Movie } from '../interfaces/MovieInterface';

export function useMoviesByGenre(genreId: number) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!genreId) return;

    const controller = new AbortController();
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    async function fetchMovies() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = (await res.json()) as { results: Movie[] };
        setMovies(data.results);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    void fetchMovies();
    return () => {
      controller.abort();
    };
  }, [genreId]);

  return { movies, loading, error };
}
