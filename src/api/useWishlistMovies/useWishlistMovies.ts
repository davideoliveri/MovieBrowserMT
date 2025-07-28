import { useState, useEffect, useMemo } from 'react';
import { WishlistMovie } from '@/interfaces/WishlistMovieInterface';
import { WishlistEntry } from '@/interfaces/WishlistEntryInterface';
import { useWishlist } from '@/store/Wishlist/wishlistContext';
import { UseWishlistMoviesOptions } from '@/interfaces/WishlistMoviesOptionsInterface';
import { getMovieById } from '../getMovieById/getMovieById';
import { MovieDetailsData } from '@/interfaces/MovieDetailsDataInterface';

interface UseWishlistMoviesResult {
  movies: WishlistMovie[];
  total: number;
  pages: number;
  loading: boolean;
  error: string | null;
}

export function useWishlistMovies(
  opts: UseWishlistMoviesOptions = {}
): UseWishlistMoviesResult {
  // const { state: entries } = useWishlist();
  // const { page = 1, perPage = 20, sortBy = 'dateAdded', order = 'desc' } = opts;

  // const [cache, setCache] = useState<Record<string, WishlistMovie>>({});

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  const { state: entries } = useWishlist();
  const { page = 1, perPage = 20, sortBy = 'dateAdded', order = 'desc' } = opts;
  const [cache, setCache] = useState<Record<string, MovieDetailsData>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchMissingMovies = async () => {
      const missing = entries
        .map((e) => e.id.toString())
        .filter((id) => !(id in cache));

      if (missing.length === 0) return;

      setLoading(true);

      try {
        // The fetching logic is now much cleaner
        const promises = missing.map((id) => getMovieById(id));
        const fetched = await Promise.all(promises);

        if (cancelled) return;

        const updated = { ...cache };
        fetched.forEach((m) => {
          updated[m.id] = m;
        });
        setCache(updated);
      } catch (err: unknown) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMissingMovies();

    return () => {
      cancelled = true;
    };
  }, [entries, cache]);

  const allMovies = useMemo<WishlistMovie[]>(() => {
    return entries
      .map((e: WishlistEntry) => {
        const detail = cache[e.id];
        if (!detail) return null;
        return {
          ...detail,
          dateAdded: e.dateAdded,
        };
      })
      .filter((m): m is WishlistMovie => m != null);
  }, [entries, cache]);

  const sorted = useMemo(() => {
    const arr = [...allMovies];
    arr.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'dateAdded') {
        cmp = a.dateAdded - b.dateAdded;
      } else if (sortBy === 'score') {
        cmp = a.vote_average - b.vote_average;
      } else {
        cmp =
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime();
      }
      return order === 'asc' ? cmp : -cmp;
    });
    return arr;
  }, [allMovies, sortBy, order]);

  const total = sorted.length;
  const pages = Math.ceil(total / perPage);
  const movies = useMemo(() => {
    const start = (page - 1) * perPage;
    return sorted.slice(start, start + perPage);
  }, [sorted, page, perPage]);

  return { movies, total, pages, loading, error };
}
