import { useWishlist } from '../../store/Wishlist/wishlistContext';

interface AddRemoveFromWishlistProps {
  movieId: number;
  movieGenre: string;
}

export const AddRemoveFromWishlist: React.FC<AddRemoveFromWishlistProps> = ({
  movieId,
  movieGenre,
}) => {
  const { state: entries, dispatch } = useWishlist();

  const isWishlisted = entries.some((entry) => entry.id === movieId);

  const buttonCopy = isWishlisted
    ? '❤️ Remove from wishlist'
    : '🤍 Add to wishlist';

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch({ type: 'REMOVE', id: movieId });
    } else {
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
