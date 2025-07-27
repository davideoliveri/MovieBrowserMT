import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  test('should render the copyright notice with the correct year', () => {
    // Arrange: Mock the date to control the year in the test
    const mockDate = new Date(2025, 6, 27);
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    // Act
    render(<Footer />);

    // Assert
    expect(screen.getByText('Copyright © 2025')).toBeInTheDocument();

    // Clean up the mock to avoid affecting other tests
    vi.useRealTimers();
  });
});
