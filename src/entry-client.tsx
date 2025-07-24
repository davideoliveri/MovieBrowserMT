import { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './router';
import { WishlistProvider } from './store/WishlistProvider';
import './styles/main.scss';

const router = createBrowserRouter(routes);

hydrateRoot(
  document.getElementById('app')!,
  <WishlistProvider>
    <RouterProvider router={router} />
  </WishlistProvider>
);
