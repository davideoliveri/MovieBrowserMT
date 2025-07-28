import { MovieDetailsData } from '@/interfaces/MovieDetailsDataInterface';
import { apiClient } from '../apiClient';

export function getMovieById(id: string): Promise<MovieDetailsData> {
  return apiClient(`/movie/${id}?append_to_response=credits`);
}
