import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { MovieCard } from '@/components/MovieCard/MovieCard';

import { SortKey, Order } from '@/interfaces/WishlistMoviesOptionsInterface';
import { API } from '@/api/API';
import { PageTitle } from '@/components/common/PageTitle/PageTitle';

export const WishlistPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortKey>('dateAdded');
  const [order, setOrder] = useState<Order>('desc');

  const { movies, total, pages, loading, error } = API.getWishlistMovies({
    page,
    perPage: 20,
    sortBy,
    order,
  });

  useEffect(() => {
    if (page > pages) {
      setPage(pages > 0 ? pages : 1);
    }
  }, [pages, page]);

  return (
    <Layout>
      <PageTitle>{`Your Wishlist (${total} movies)`}</PageTitle>
      <main className="wishlist-page">
        <h1 className="h1 wishlist-page__title">Your Wishlist</h1>

        <div className="wishlist-page__controls">
          <label>
            Sort by:
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="wishlist-page__select"
            >
              <option value="dateAdded">Date Added</option>
              <option value="score">Score</option>
              <option value="releaseDate">Release Date</option>
            </select>
          </label>
          <button
            className="wishlist-page__toggle-order"
            onClick={() => setOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
          >
            {order === 'asc' ? '↑' : '↓'}
          </button>
        </div>

        {loading && <p className="wishlist-page__status">Loading…</p>}
        {error && <p className="wishlist-page__error">Error: {error}</p>}
        {!loading && !error && movies.length === 0 && (
          <p className="wishlist-page__status">No movies in your wishlist.</p>
        )}
        <section className="wishlist-page__content">
          <ul className="wishlist-page__grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={Number(movie.id)}
                title={movie.title}
                poster_path={movie.poster_path}
                release_date={movie.release_date}
                vote_average={Number(movie.vote_average.toFixed(1))}
              />
            ))}
          </ul>
        </section>

        {pages > 1 && (
          <div className="wishlist-page__pagination">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="wishlist-page__btn"
            >
              Prev
            </button>
            <span className="wishlist-page__page-info">
              Page {page} of {pages} ({total} total)
            </span>
            <button
              disabled={page >= pages}
              onClick={() => setPage((p) => p + 1)}
              className="wishlist-page__btn"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </Layout>
  );
};
