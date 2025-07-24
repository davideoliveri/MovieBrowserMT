import { Movie } from '../interfaces/MovieInterface';

export async function getMoviesByGenre(genreId: number): Promise<Movie[]> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
  );
  if (!res.ok) {
    throw new Response('Failed to fetch movies by genre', {
      status: res.status,
    });
  }
  const data = (await res.json()) as { results: Movie[] };
  return data.results;
}
