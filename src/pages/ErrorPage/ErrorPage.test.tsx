import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';

describe('ErrorPage', () => {
  // 1. Make the test function async
  test('should display status and text for a Response error', async () => {
    // Arrange: Create a router that throws a Response error
    const routes = [
      {
        path: '/',
        element: <div>This should not render</div>,
        loader: () => {
          throw new Response(null, { status: 404, statusText: 'Not Found' });
        },
        errorElement: <ErrorPage />,
      },
    ];

    const router = createMemoryRouter(routes);

    // Act
    render(<RouterProvider router={router} />);

    // Assert: Use await and findBy... to wait for the content to appear
    expect(await screen.findByText('404')).toBeInTheDocument();
    expect(await screen.findByText(/Not Found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go back home/i })).toHaveAttribute(
      'href',
      '/'
    );
  });

  // ---

  // Also update this test to be async for consistency
  test('should display the message for a standard Error', async () => {
    // Arrange
    const routes = [
      {
        path: '/',
        element: <div>This should not render</div>,
        loader: () => {
          throw new Error('Something went wrong!');
        },
        errorElement: <ErrorPage />,
      },
    ];

    const router = createMemoryRouter(routes);

    // Act
    render(<RouterProvider router={router} />);

    // Assert
    expect(screen.queryByText('404')).not.toBeInTheDocument();
    expect(
      await screen.findByText(/Something went wrong!/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go back home/i })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
