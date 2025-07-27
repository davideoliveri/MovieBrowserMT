import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddRemoveFromWishlist } from './AddOrRemoveFromWishlistButton';
import { WishlistContext } from '../../store/Wishlist/wishlistContext';
import { WishlistEntry } from '../../interfaces/WishlistEntryInterface';

// Create a reusable wrapper component to provide the mock context
const MockWishlistProvider = ({
  mockState,
  mockDispatch,
  children,
}: {
  mockState: WishlistEntry[];
  mockDispatch: ReturnType<typeof vi.fn>;
  children: React.ReactNode;
}) => (
  <WishlistContext.Provider
    value={{ state: mockState, dispatch: mockDispatch }}
  >
    {children}
  </WishlistContext.Provider>
);

describe('AddRemoveFromWishlist Button', () => {
  test('should display "Add to wishlist" and dispatch ADD action when clicked', async () => {
    // Arrange
    const mockDispatch = vi.fn();
    const user = userEvent.setup();
    render(
      <MockWishlistProvider mockState={[]} mockDispatch={mockDispatch}>
        <AddRemoveFromWishlist movieId={123} movieGenre="base" />
      </MockWishlistProvider>
    );

    // Act: Find the button and click it
    const addButton = screen.getByText('🤍 Add to wishlist');
    await user.click(addButton);

    // Assert: Check that the correct action was dispatched
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD',
      entry: { id: 123, dateAdded: expect.any(Number) },
    });
  });

  test('should display "Remove from wishlist" and dispatch REMOVE action when clicked', async () => {
    // Arrange
    const mockDispatch = vi.fn();
    const user = userEvent.setup();
    // Provide a state where the movie is already in the wishlist
    const mockStateWithMovie = [{ id: 123, dateAdded: Date.now() }];
    render(
      <MockWishlistProvider
        mockState={mockStateWithMovie}
        mockDispatch={mockDispatch}
      >
        <AddRemoveFromWishlist movieId={123} movieGenre="base" />
      </MockWishlistProvider>
    );

    // Act
    const removeButton = screen.getByText('❤️ Remove from wishlist');
    await user.click(removeButton);

    // Assert
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'REMOVE', id: 123 });
  });
});
