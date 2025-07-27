import { RouteObject } from 'react-router-dom';
import { HomePage, loader as homeLoader } from './pages/HomePage/HomePage';
import {
  MovieDetailsPage,
  loader as movieDetailsLoader,
} from './pages/MovieDetailsPage/MovieDetailsPage';
import { WishlistPage } from './pages/WishlistPage/WishlistPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';

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
    errorElement: <ErrorPage />,
  },
  {
    path: 'wishlist',
    element: <WishlistPage />,
  },
];
