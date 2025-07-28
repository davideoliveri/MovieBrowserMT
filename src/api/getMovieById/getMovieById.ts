import { MovieDetailsData } from '@/interfaces/MovieDetailsDataInterface';

export async function getMovieById(id: string): Promise<MovieDetailsData> {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits`
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch movie (${res.status})`);
  }
  return res.json() as Promise<MovieDetailsData>;
}
