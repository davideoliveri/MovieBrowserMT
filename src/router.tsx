import { RouteObject } from 'react-router-dom';
import { HomePage, loader as homeLoader } from './pages/HomePage/HomePage';
import {
  MovieDetailsPage,
  loader as movieDetailsLoader,
} from './pages/MovieDetailsPage/MovieDetailsPage';
import { WishlistPage } from './pages/WishlistPage/WishlistPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
    loader: homeLoader,
  },
  {
    path: 'moviedetails/:id',
    element: <MovieDetailsPage />,
    loader: movieDetailsLoader,
  },
  {
    path: 'wishlist',
    element: <WishlistPage />,
  },
];
