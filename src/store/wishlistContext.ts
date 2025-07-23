// src/store/wishlistContext.ts

import { createContext, useContext } from 'react';
import { WishlistEntry } from '../interfaces/WishlistEntryInterface';

// Define types that both the provider and consumers will use
type State = WishlistEntry[];
export type Action =
  | { type: 'ADD'; entry: WishlistEntry }
  | { type: 'REMOVE'; id: number }
  | { type: 'INITIALIZE'; entries: WishlistEntry[] };

// Create the context that the provider will import
export const WishlistContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: [], dispatch: () => null });

// Export the hook that all components will use to access the context
export const useWishlist = () => useContext(WishlistContext);
