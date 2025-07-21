import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { MovieDetails } from './pages/MovieDetails';
import { WishlistPage } from './pages/WishlistPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="moviedetails/:id" element={<MovieDetails />} />
        <Route path="wishlist" element={<WishlistPage />} />
      </Routes>
    </BrowserRouter>
  );
}
