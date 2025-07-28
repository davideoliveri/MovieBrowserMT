import { loader } from './MovieDetailsPage';
import { API } from '@/api/API';
import { LoaderFunctionArgs } from 'react-router-dom';
import { MovieDetailsData } from '@/interfaces/MovieDetailsDataInterface';

// Mock the API module
vi.mock('@/api/API');

describe('MovieDetailsPage loader', () => {
  test('should fetch and return movie data for a valid ID', async () => {
    // Arrange: Setup mock data and mock the API function's return value
    const mockMovie = { id: 123, title: 'Mock Movie' } as MovieDetailsData;
    vi.mocked(API.getMovieById).mockResolvedValue(mockMovie);

    const loaderArgs = {
      params: { id: '123' },
    } as unknown as LoaderFunctionArgs;

    // Act: Call the loader function
    const result = await loader(loaderArgs);

    // Assert: Check that the API was called and the result is correct
    expect(API.getMovieById).toHaveBeenCalledWith('123');
    expect(result).toEqual(mockMovie);
  });

  test('should throw a Response when movieId is not found', async () => {
    // Arrange
    const loaderArgs = {
      params: {},
      request: new Request('http://localhost/movies/'),
    } as unknown as LoaderFunctionArgs;

    try {
      // Act
      await loader(loaderArgs);
      throw new Error('The loader function should have thrown a Response.');
    } catch (error) {
      expect(error).toBeInstanceOf(Response);

      // 2. You can now treat it as a Response and check its properties
      const response = error as Response;
      expect(response.status).toBe(404);
      expect(await response.text()).toBe('Movie ID not found');
    }
  });
});
