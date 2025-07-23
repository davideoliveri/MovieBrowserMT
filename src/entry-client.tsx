import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Import the new App
import { WishlistProvider } from './store/WishlistProvider';
import './styles/main.scss';

hydrateRoot(
  document.getElementById('app')!,
  <WishlistProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WishlistProvider>
);
