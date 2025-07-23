// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { WishlistProvider } from './store/WishlistProvider';
import './styles/main.scss';

// Use createRoot for client-side rendering
ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <WishlistProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WishlistProvider>
  </React.StrictMode>
);
