import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './router';
import { WishlistProvider } from './store/Wishlist/WishlistProvider';
import './styles/main.scss';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <WishlistProvider>
      <RouterProvider router={router} />
    </WishlistProvider>
  </React.StrictMode>
);
