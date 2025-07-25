// A helper for tests that need a mock WishlistProvider
import { WishlistContext } from '../store/wishlistContext';
import { WishlistEntry } from '../interfaces/WishlistEntryInterface';

export const MockWishlistProvider = ({
  entries,
  children,
}: {
  entries: WishlistEntry[];
  children: React.ReactNode;
}) => {
  return (
    <WishlistContext.Provider value={{ state: entries, dispatch: () => {} }}>
      {children}
    </WishlistContext.Provider>
  );
};
