import { reducer } from './WishlistProvider';
import { WishlistEntry } from '@/interfaces/WishlistEntryInterface';

describe('wishlist reducer', () => {
  const initialState: WishlistEntry[] = [
    { id: 1, dateAdded: 1000 },
    { id: 2, dateAdded: 2000 },
  ];

  test('should handle ADD action', () => {
    const action = {
      type: 'ADD' as const,
      entry: { id: 3, dateAdded: 3000 },
    };
    const newState = reducer(initialState, action);
    expect(newState).toHaveLength(3);
    expect(newState[0].id).toBe(3);
  });

  test('should handle REMOVE action', () => {
    const action = { type: 'REMOVE' as const, id: 1 };
    const newState = reducer(initialState, action);
    expect(newState).toHaveLength(1);
    expect(newState.find((item) => item.id === 1)).toBeUndefined();
  });

  test('should handle INITIALIZE action', () => {
    const newEntries = [{ id: 10, dateAdded: 100 }];
    const action = { type: 'INITIALIZE' as const, entries: newEntries };
    const newState = reducer(initialState, action);
    expect(newState).toEqual(newEntries);
  });
});
