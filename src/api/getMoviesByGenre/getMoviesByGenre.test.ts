import { getMoviesByGenre } from './getMoviesByGenre';

describe('Test getMoviesByGenre', () => {
  // This test is fine
  test('should return movies for a valid genre ID', async () => {
    const movies = await getMoviesByGenre(123);
    expect(movies).toHaveLength(1);
    expect(Array.isArray(movies)).toBe(true);
  });

  test('should throw an error for an invalid Genre ID', async () => {
    // CHANGE THIS LINE: Update the expected error message
    await expect(getMoviesByGenre(0)).rejects.toThrow(
      'Failed to fetch: 404 Not Found'
    );
  });
});
