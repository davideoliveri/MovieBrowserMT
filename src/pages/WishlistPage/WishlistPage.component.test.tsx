import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { WishlistPage } from './WishlistPage';
import { API } from '../../api/API';

// Mock the entire API module
vi.mock('../../api/API');

describe('WishlistPage', () => {
  // Setup a reusable mock function for the API call
  const mockGetWishlistMovies = vi.fn();

  beforeEach(() => {
    // Before each test, assign the mock function to the API method
    vi.mocked(API.getWishlistMovies).mockImplementation(mockGetWishlistMovies);
  });

  afterEach(() => {
    // Clear mock history after each test
    vi.clearAllMocks();
  });

  test('should display the loading state initially', () => {
    // Arrange: Return a loading state from the mock hook
    mockGetWishlistMovies.mockReturnValue({
      loading: true,
      movies: [],
      pages: 0,
      total: 0,
      error: null,
    });

    // Act
    render(
      <MemoryRouter>
        <WishlistPage />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  test('should display an error message if the hook returns an error', () => {
    // Arrange
    mockGetWishlistMovies.mockReturnValue({
      loading: false,
      movies: [],
      pages: 0,
      total: 0,
      error: 'Something went wrong',
    });

    // Act
    render(
      <MemoryRouter>
        <WishlistPage />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument();
  });

  test('should display movie cards when movies are returned', () => {
    // Arrange
    const mockMovies = [
      {
        id: 1,
        title: 'Wishlist Movie 1',
        vote_average: 8,
        release_date: '2022-01-01',
        poster_path: '/a.jpg',
      },
      {
        id: 2,
        title: 'Wishlist Movie 2',
        vote_average: 7,
        release_date: '2023-01-01',
        poster_path: '/b.jpg',
      },
    ];
    mockGetWishlistMovies.mockReturnValue({
      loading: false,
      movies: mockMovies,
      pages: 1,
      total: 2,
      error: null,
    });

    // Act
    render(
      <MemoryRouter>
        <WishlistPage />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText('Wishlist Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Wishlist Movie 2')).toBeInTheDocument();
  });

  test('should re-fetch data when sort option is changed', async () => {
    // Arrange
    mockGetWishlistMovies.mockReturnValue({
      loading: false,
      movies: [],
      pages: 0,
      total: 0,
      error: null,
    });

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <WishlistPage />
      </MemoryRouter>
    );

    // Assert initial call
    expect(mockGetWishlistMovies).toHaveBeenCalledWith({
      page: 1,
      perPage: 20,
      sortBy: 'dateAdded',
      order: 'desc',
    });

    // Act: User changes the select dropdown to 'Score'
    const select = screen.getByLabelText('Sort by:');
    await user.selectOptions(select, 'score');

    // Assert: Check that the hook was called again with the new sort key
    await waitFor(() => {
      expect(mockGetWishlistMovies).toHaveBeenCalledWith({
        page: 1,
        perPage: 20,
        sortBy: 'score',
        order: 'desc',
      });
    });
  });
});
