import { useEffect, useState } from 'react';
import { useWishlist } from '../store/wishlistContext';

interface addRemoveFromWishlistProps {
  movieId: number;
  movieGenre: string;
}

export const AddRemoveFromWishlist: React.FC<addRemoveFromWishlistProps> = ({
  movieId,
  movieGenre,
}): React.ReactNode => {
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const { state: entries, dispatch } = useWishlist();
  let buttonCopy: string = entries.some((entry) => entry.id === movieId)
    ? '❤️ Remove from wishlist'
    : '🤍 Add to wishlist';

  const addRemoveFromWishlist = () => {
    if (isWishlisted) {
      dispatch({ type: 'REMOVE', id: movieId });
    } else {
      dispatch({ type: 'ADD', entry: { id: movieId, dateAdded: Date.now() } });
    }
    console.log('dispatching');
    buttonCopy = isWishlisted
      ? '❤️ Remove from wishlist'
      : '🤍 Add to wishlist';
  };

  useEffect(() => {
    if (!movieId) return;
    setIsWishlisted(entries.some((entry) => entry.id === movieId));
    console.log('form use effect');
  }, [movieId, entries]);

  return (
    <button
      className={`add-to-wishlist-button add-to-wishlist-button--${movieGenre}`}
      onClick={addRemoveFromWishlist}
    >
      {buttonCopy}
    </button>
  );
};
