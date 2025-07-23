import React, { useReducer, useEffect, useRef } from 'react';
import { WishlistEntry } from '../interfaces/WishlistEntryInterface';
import { WishlistContext, Action } from './wishlistContext';

const reducer = (state: WishlistEntry[], action: Action): WishlistEntry[] => {
  // ... (reducer logic is unchanged)
  switch (action.type) {
    case 'ADD':
      return [action.entry, ...state];
    case 'REMOVE':
      return state.filter((entry) => entry.id !== action.id);
    case 'INITIALIZE':
      return action.entries;
    default:
      return state;
  }
};

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, []);
  // Use a ref to track if this is the initial render
  const isInitialMount = useRef(true);

  // This effect for loading from localStorage is correct and can stay.
  useEffect(() => {
    let entries: WishlistEntry[] = [];
    try {
      const json = localStorage.getItem('wishlist');
      if (json) {
        entries = JSON.parse(json);
      }
    } catch {
      // Keep entries as []
    }
    dispatch({ type: 'INITIALIZE', entries });
  }, []);

  // This is the corrected effect for saving to localStorage.
  useEffect(() => {
    // If it's the first render, just mark it as not initial anymore and skip saving.
    // This prevents the re-mount from wiping storage.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Now, this logic will only run on subsequent, real state changes.
    if (state.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(state));
    } else {
      localStorage.removeItem('wishlist');
    }
  }, [state]);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};
