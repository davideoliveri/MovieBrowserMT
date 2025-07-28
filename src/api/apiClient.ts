const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function apiClient<T>(endpoint: string): Promise<T> {
  const separator = endpoint.includes('?') ? '&' : '?';

  const res = await fetch(
    `${API_BASE_URL}${endpoint}${separator}api_key=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
