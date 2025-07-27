import { renderHook, act } from '@testing-library/react';
import { WishlistProvider } from './WishlistProvider';
import { useWishlist } from './wishlistContext';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('WishlistProvider', () => {
  beforeEach(() => {
    // Clear mocks and localStorage before each test
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  test('should initialize state from localStorage', () => {
    // Arrange: Put mock data into localStorage before the test
    const initialEntries = [{ id: 123, dateAdded: 1000 }];
    localStorage.setItem('wishlist', JSON.stringify(initialEntries));

    // Act: Render a hook that uses the provider
    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider,
    });

    // Assert: Check that the state was initialized correctly
    expect(result.current.state).toEqual(initialEntries);
  });

  test('should update localStorage when an item is added', () => {
    // Act
    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider,
    });

    // Dispatch an ADD action
    act(() => {
      result.current.dispatch({
        type: 'ADD',
        entry: { id: 456, dateAdded: 2000 },
      });
    });

    // Assert
    const stored = JSON.parse(localStorage.getItem('wishlist') || '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe(456);
  });
});
