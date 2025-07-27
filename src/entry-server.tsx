import { renderToString } from 'react-dom/server';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';
import type { Request as ExpressRequest } from 'express';
import { routes } from './router';
import { WishlistProvider } from './store/Wishlist/WishlistProvider';

function createFetchRequest(req: ExpressRequest): Request {
  const origin = `${req.protocol}://${req.get('host')}`;
  const url = new URL(req.originalUrl || req.url, origin);
  const controller = new AbortController();
  req.on('close', () => controller.abort());
  const headers = new Headers();
  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) headers.append(key, value);
      } else {
        headers.set(key, values as string);
      }
    }
  }
  const init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : null,
  };
  return new Request(url.href, init);
}

export async function render(req: ExpressRequest) {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(dataRoutes, context);

  const html = renderToString(
    <WishlistProvider>
      <StaticRouterProvider router={router} context={context} />
    </WishlistProvider>
  );

  return { html, context };
}
