import { useState, useEffect, useMemo } from 'react';
import { WishlistMovie } from '@/interfaces/WishlistMovieInterface';
import { WishlistEntry } from '@/interfaces/WishlistEntryInterface';
import { useWishlist } from '@/store/Wishlist/wishlistContext';
import { UseWishlistMoviesOptions } from '@/interfaces/WishlistMoviesOptionsInterface';

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
  const { state: entries } = useWishlist();
  const { page = 1, perPage = 20, sortBy = 'dateAdded', order = 'desc' } = opts;

  const [cache, setCache] = useState<Record<string, WishlistMovie>>({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const missing = entries
      .map((e) => e.id.toString())
      .filter((id) => !(id in cache));

    if (missing.length === 0) return;

    setLoading(true);
    Promise.all(
      missing.map((id) =>
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        ).then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json() as Promise<WishlistMovie>;
        })
      )
    )
      .then((fetched) => {
        if (cancelled) return;
        const updated = { ...cache };
        fetched.forEach((m) => {
          updated[m.id] = m;
        });
        setCache(updated);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : String(err);
          setError(message);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

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
