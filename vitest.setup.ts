import '@testing-library/jest-dom/vitest';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './src/mocks/node'; // adjust path if needed

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

server.events.on('request:start', ({ request }) => {
  console.log('MSW ▶', request.method, request.url);
});

server.events.on('request:unhandled', ({ request }) => {
  console.warn('🛑  Unhandled:', request.method, request.url);
});
