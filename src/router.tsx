import { RouteObject } from 'react-router-dom';
import { HomePage, loader as homeLoader } from './pages/Home';
import {
  MovieDetails,
  loader as movieDetailsLoader,
} from './pages/MovieDetails';
import { WishlistPage } from './pages/WishlistPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
    loader: homeLoader,
  },
  {
    path: 'moviedetails/:id',
    element: <MovieDetails />,
    loader: movieDetailsLoader,
  },
  {
    path: 'wishlist',
    element: <WishlistPage />,
  },
];
