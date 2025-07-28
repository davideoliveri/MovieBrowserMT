import { Movie } from '@/interfaces/MovieInterface';
import { apiClient } from '../apiClient';

interface GenreResponse {
  results: Movie[];
}

export async function getMoviesByGenre(genreId: number): Promise<Movie[]> {
  const data = await apiClient<GenreResponse>(
    `/discover/movie?with_genres=${genreId}`
  );
  return data.results;
}
