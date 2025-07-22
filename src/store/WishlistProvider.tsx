import React, { useReducer, useEffect } from 'react';
import { WishlistEntry } from '../interfaces/WishlistEntryInterface';
import { WishlistContext } from './wishlistContext';

type State = WishlistEntry[];
type Action =
  | { type: 'ADD'; entry: WishlistEntry }
  | { type: 'REMOVE'; id: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD':
      return [action.entry, ...state];
    case 'REMOVE':
      return state.filter((entry) => entry.id !== action.id);
    default:
      return state;
  }
};

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, [], () => {
    try {
      const json: string | null = localStorage.getItem('wishlist');
      return json ? (JSON.parse(json) as WishlistEntry[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state));
  }, [state]);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};
