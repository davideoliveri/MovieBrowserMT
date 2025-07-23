import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import { WishlistProvider } from './store/WishlistProvider';

export function render(url: string) {
  const html = renderToString(
    <WishlistProvider>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </WishlistProvider>
  );
  return { html };
}
