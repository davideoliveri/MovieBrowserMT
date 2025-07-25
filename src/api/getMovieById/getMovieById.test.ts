import { getMovieById } from './getMovieById';

test('should return movie data for a valid ID', async () => {
  const movie = await getMovieById('123');
  expect(movie.title).toBe('Test Movie');
});

test('should throw an error for an invalid ID', async () => {
  await expect(getMovieById('invalid_id')).rejects.toThrow(
    'Failed to fetch movie'
  );
});
