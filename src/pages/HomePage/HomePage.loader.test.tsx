import { loader } from './HomePage';
import { API } from '../../api/API';
import { Movie } from '../../interfaces/MovieInterface';
// Mock the API module
vi.mock('../../api/API');

describe('HomePage loader', () => {
  test('should fetch movies for each genre and return structured data', async () => {
    // Arrange: Provide different mock return values for each call to the API
    const mockSciFi = [
      {
        id: 1,
        title: 'Dune',
        vote_average: 7,
        poster_path: '/x.png',
        release_date: 20000,
      },
    ] as unknown as Movie[];
    const mockHorror = [
      {
        id: 2,
        title: 'The Thing',
        vote_average: 7,
        poster_path: '/x.png',
        release_date: 20000,
      },
    ] as unknown as Movie[];
    const mockAnimation = [
      {
        id: 3,
        title: 'Spirited Away',
        vote_average: 7,
        poster_path: '/x.png',
        release_date: 20000,
      },
    ] as unknown as Movie[];

    vi.mocked(API.getMoviesByGenre)
      .mockResolvedValueOnce(mockSciFi)
      .mockResolvedValueOnce(mockHorror)
      .mockResolvedValueOnce(mockAnimation);

    // Act: Run the loader function
    const result = await loader();

    // Assert:
    // 1. Check that the API was called for each genre ID from the config
    expect(API.getMoviesByGenre).toHaveBeenCalledWith(878); // Science Fiction
    expect(API.getMoviesByGenre).toHaveBeenCalledWith(27); // Horror
    expect(API.getMoviesByGenre).toHaveBeenCalledWith(16); // Animation
    expect(API.getMoviesByGenre).toHaveBeenCalledTimes(3);

    // 2. Check that the returned data has the correct shape
    expect(result).toHaveLength(3);
    expect(result[0].title).toBe('Science Fiction');
    expect(result[0].movies).toEqual(mockSciFi);
    expect(result[2].title).toBe('Animation');
    expect(result[2].movies).toEqual(mockAnimation);
  });
});
