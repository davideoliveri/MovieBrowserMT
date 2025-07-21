import { createContext, useContext } from 'react';
import { WishlistEntry } from '../interfaces/WishlistEntryInterface';

type State = WishlistEntry[];
type Action =
  | { type: 'ADD'; entry: WishlistEntry }
  | { type: 'REMOVE'; id: number };

export const WishlistContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: [], dispatch: () => null });

export const useWishlist = () => useContext(WishlistContext);
