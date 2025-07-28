import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MovieCard } from './MovieCard';
import { MovieDetailsData } from '@/interfaces/MovieDetailsDataInterface';

// Mock the child button component
vi.mock(
  '../AddOrRemoveFromWishlistButton/AddOrRemoveFromWishlistButton',
  () => ({
    AddRemoveFromWishlist: vi.fn(() => <button>Add/Remove Wishlist</button>),
  })
);

describe('MovieCard', () => {
  test('should render movie details and link correctly', () => {
    const mockMovie: MovieDetailsData = {
      id: 123,
      title: 'Awesome Movie Title',
      release_date: '2025-07-27',
      vote_average: 8.5,
      poster_path: '/test-poster.jpg',
    };

    render(
      <MemoryRouter>
        <MovieCard {...mockMovie} />
      </MemoryRouter>
    );

    // Check that the text content is displayed
    expect(screen.getByText('Awesome Movie Title')).toBeInTheDocument();
    expect(screen.getByText('📅 2025-07-27')).toBeInTheDocument();
    expect(screen.getByText('🎖️ 8.5')).toBeInTheDocument();

    // Check the image attributes
    const posterImage = screen.getByRole('img', { name: /poster for/i });
    expect(posterImage).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300/test-poster.jpg'
    );
    expect(posterImage).toHaveAttribute(
      'alt',
      'poster for Awesome Movie Title'
    );

    // Check that the link points to the correct details page
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/moviedetails/123');
  });

  test('Should render a placeholder when no valid poster_path is given', () => {
    const mockMovie: MovieDetailsData = {
      id: 123,
      title: 'Awesome Movie Title',
      release_date: '2025-07-27',
      vote_average: 8.5,
      poster_path: null,
    };

    render(
      <MemoryRouter>
        <MovieCard {...mockMovie} />
      </MemoryRouter>
    );

    // Check the image attributes
    const posterImage = screen.getByRole('img', { name: /poster for/i });
    expect(posterImage.getAttribute('src')).not.toContain(
      'https://image.tmdb.org/t/p/'
    );
  });
});
