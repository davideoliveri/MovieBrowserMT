import { getMoviesByGenre } from './getMoviesByGenre';

describe('Test getMoviesByGenre', () => {
  test('should return movies for a valid genre ID', async () => {
    const movies = await getMoviesByGenre(123);

    expect(movies).toHaveLength(1);

    expect(Array.isArray(movies)).toBe(true);
  });

  test('should throw an error for an invalid Genre ID', async () => {
    await expect(getMoviesByGenre(0)).rejects.toThrow('Failed to fetch movies');
  });
});
