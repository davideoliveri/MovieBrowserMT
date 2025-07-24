import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { MovieDetails } from './pages/MovieDetailsPage';
import { WishlistPage } from './pages/WishlistPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/moviedetails/:id" element={<MovieDetails />} />
      <Route path="/wishlist" element={<WishlistPage />} />
    </Routes>
  );
}
