import { render, screen } from '@testing-library/react';
import { MovieDetailsPage } from './MovieDetailsPage';
import { MovieDetailsData } from '@/interfaces/MovieDetailsDataInterface';
import { useLoaderData, MemoryRouter } from 'react-router-dom';

// Mock the react-router-dom module
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual, // Keep all original exports
    useLoaderData: vi.fn(), // Mock just the useLoaderData hook
  };
});

// Mock the AddRemoveFromWishlistButton to avoid testing its implementation here
vi.mock(
  '../components/AddOrRemoveFromWishlistButton/AddOrRemoveFromWishlistButton',
  () => ({
    AddRemoveFromWishlist: () => <button>Wishlist Button</button>,
  })
);

describe('MovieDetailsPage component', () => {
  test('should render movie details correctly', () => {
    // Arrange: Create mock movie data
    const mockMovie: MovieDetailsData = {
      id: 1,
      title: 'Dune: Part Two',
      overview: 'A stunning sci-fi epic.',
      vote_average: 8.2,
      release_date: '2024-02-28',
      runtime: 166,
      poster_path: '/d5NXSklXo0qyIY2VhrhF2l62bF9.jpg',
      genres: [{ id: 878, name: 'Science Fiction' }],
      credits: {
        cast: [
          {
            cast_id: 1,
            id: 1,
            name: 'Timothée Chalamet',
            character: 'Paul Atreides',
            profile_path: '/t3C2H6fIq1l7T7c04zPE34M34p.jpg',
          },
        ],
      },
    };

    // Tell the mocked useLoaderData what to return
    vi.mocked(useLoaderData).mockReturnValue(mockMovie);

    // Act: Render the component
    render(
      <MemoryRouter>
        <MovieDetailsPage />
      </MemoryRouter>
    );

    // Assert: Check that the data is displayed on the screen
    expect(screen.getByText('Dune: Part Two')).toBeInTheDocument();
    expect(screen.getByText('A stunning sci-fi epic.')).toBeInTheDocument();
    expect(screen.getByText('Timothée Chalamet')).toBeInTheDocument();
    expect(screen.getByText('as Paul Atreides')).toBeInTheDocument();
    expect(screen.getByText('8.2 |')).toBeInTheDocument();
  });
});
