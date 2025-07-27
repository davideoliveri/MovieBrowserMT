import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

describe('Header', () => {
  test('should render navigation links with correct href attributes', () => {
    // Arrange & Act
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Assert
    // check the number of links
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);

    // find the link by its accessible name (the text content)
    const homeLink = screen.getByRole('link', { name: /home/i });
    const wishlistLink = screen.getByRole('link', { name: /wishlist/i });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(wishlistLink).toHaveAttribute('href', '/wishlist');
  });
});
