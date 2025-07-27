import { render, screen } from '@testing-library/react';
import { Carousel } from './Carousel';
import { MovieCard } from '../MovieCard/MovieCard';

// Mock the child MovieCard component
vi.mock('../MovieCard/MovieCard', () => ({
  MovieCard: vi.fn((props) => {
    // The mock can render a simple element for debugging
    return <div data-testid="movie-card">{props.title}</div>;
  }),
}));

describe('Carousel', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render a title and a MovieCard for each movie', () => {
    // Arrange
    const mockMovies = [
      {
        id: 1,
        title: 'Movie 1',
        vote_average: 8,
        release_date: '2022-01-01',
        poster_path: '/a.jpg',
      },
      {
        id: 2,
        title: 'Movie 2',
        vote_average: 7,
        release_date: '2023-01-01',
        poster_path: '/b.jpg',
      },
    ];

    // Act
    render(<Carousel genreName="Action" movies={mockMovies} />);

    // Assert
    // Check that the title is rendered correctly
    expect(screen.getByText('Action movies')).toBeInTheDocument();
    // Check that MovieCard was called for each movie
    expect(MovieCard).toHaveBeenCalledTimes(2);

    // Get the arguments from the last call to the mock
    const lastCallArgs = vi.mocked(MovieCard).mock.calls.at(-1);

    // Assert that the first argument (props) contains the expected data
    expect(lastCallArgs![0]).toEqual(
      expect.objectContaining({
        title: 'Movie 2',
        id: 2,
      })
    );
  });

  test('should render correctly with an empty list of movies', () => {
    // Arrange & Act
    render(<Carousel genreName="Comedy" movies={[]} />);

    // Assert
    // The title should still be rendered
    expect(screen.getByText('Comedy movies')).toBeInTheDocument();

    // MovieCard should not have been called
    expect(MovieCard).not.toHaveBeenCalled();
  });
});
