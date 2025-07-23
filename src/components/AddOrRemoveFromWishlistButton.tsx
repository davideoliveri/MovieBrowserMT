import { useWishlist } from '../store/wishlistContext';

interface AddRemoveFromWishlistProps {
  movieId: number;
  movieGenre: string;
}

export const AddRemoveFromWishlist: React.FC<AddRemoveFromWishlistProps> = ({
  movieId,
  movieGenre,
}) => {
  const { state: entries, dispatch } = useWishlist();

  // 1. Derive the state directly from context on every render. No useEffect or useState needed.
  const isWishlisted = entries.some((entry) => entry.id === movieId);

  // 2. Determine the button's text from the derived state.
  const buttonCopy = isWishlisted
    ? '❤️ Remove from wishlist'
    : '🤍 Add to wishlist';

  // 3. The click handler also uses the derived state.
  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch({ type: 'REMOVE', id: movieId });
    } else {
      // Note: We only need id and dateAdded for the wishlist entry.
      dispatch({ type: 'ADD', entry: { id: movieId, dateAdded: Date.now() } });
    }
  };

  return (
    <button
      className={`add-to-wishlist-button add-to-wishlist-button--${movieGenre}`}
      onClick={handleWishlistToggle}
    >
      {buttonCopy}
    </button>
  );
};
