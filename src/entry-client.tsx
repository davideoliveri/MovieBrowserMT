import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import './styles/main.scss';

hydrateRoot(
  document.getElementById('app')!,
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);
