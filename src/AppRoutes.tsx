import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage/HomePage';
import { MovieDetailsPage } from './pages/MovieDetailsPage/MovieDetailsPage';
import { WishlistPage } from './pages/WishlistPage/WishlistPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/moviedetails/:id" element={<MovieDetailsPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
    </Routes>
  );
}
