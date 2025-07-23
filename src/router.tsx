import * as pkg from 'react-router-dom';
const { Routes, Route } = pkg;
// import { Routes, Route } from 'react-router-dom';

import { HomePage } from './pages/Home';
import { MovieDetails } from './pages/MovieDetails';
import { WishlistPage } from './pages/WishlistPage';

export const Router = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="moviedetails/:id" element={<MovieDetails />} />
    </Routes>
  );
};
