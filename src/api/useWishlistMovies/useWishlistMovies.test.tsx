// src/api/useWishlistMovies.test.ts

import { renderHook, waitFor } from '@testing-library/react';

import { MockWishlistProvider } from '@/mocks/MockWishlistProvider';
import { useWishlistMovies } from './useWishlistMovies';
import { WishlistEntry } from '@/interfaces/WishlistEntryInterface';
import { SortKey, Order } from '@/interfaces/WishlistMoviesOptionsInterface';

describe('useWishlistMovies', () => {
  // Define mock wishlist entries that the context will provide
  const mockEntries: WishlistEntry[] = [
    { id: 101, dateAdded: 2000 }, // Will be the second movie by default sorting (dateAdded desc)
    { id: 102, dateAdded: 3000 }, // Will be the first movie
  ];

  test('should fetch details for wishlist entries and return a sorted list', async () => {
    // Render the hook using the wrapper to provide mock context
    const { result } = renderHook(() => useWishlistMovies(), {
      wrapper: ({ children }) => (
        <MockWishlistProvider entries={mockEntries}>
          {children}
        </MockWishlistProvider>
      ),
    });

    // 1. Initial State Check: On first render, it should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.movies).toHaveLength(0);

    // 2. Final State Check: Wait for the async fetch to complete
    await waitFor(() => {
      // Loading should be false now
      expect(result.current.loading).toBe(false);
      // It should have fetched and processed the two movies
      expect(result.current.movies).toHaveLength(2);
      // Check that the default sort (dateAdded, desc) is applied correctly
      expect(result.current.movies[0].id).toBe(102);
      expect(result.current.movies[1].id).toBe(101);
    });
  });

  test('should return sorted movies by score', async () => {
    // Use the 'rerender' function to test with different options
    const { result, rerender } = renderHook(
      (props) => useWishlistMovies(props),
      {
        initialProps: {
          sortBy: 'dateAdded' as SortKey,
          order: 'desc' as Order,
        },
        wrapper: ({ children }) => (
          <MockWishlistProvider entries={mockEntries}>
            {children}
          </MockWishlistProvider>
        ),
      }
    );

    // Wait for initial fetch
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Rerender the hook with new props for sorting
    rerender({ sortBy: 'score' as SortKey, order: 'asc' as Order });

    // The movies are now sorted by score ascending
    expect(result.current.movies[0].vote_average).toBe(7.5); // Mock score for movie 101
    expect(result.current.movies[1].vote_average).toBe(8.5); // Mock score for movie 102
  });

  test('should handle API errors gracefully', async () => {
    // Force an error response from msw for movie 999
    const errorEntry: WishlistEntry[] = [{ id: 999, dateAdded: 1000 }];

    const { result } = renderHook(() => useWishlistMovies(), {
      wrapper: ({ children }) => (
        <MockWishlistProvider entries={errorEntry}>
          {children}
        </MockWishlistProvider>
      ),
    });

    // Wait for the fetch to fail
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Failed to fetch: 404 Not Found');
      expect(result.current.movies).toHaveLength(0);
    });
  });
});
