import { render, screen } from '@testing-library/react';
import { CastCard } from './CastCard';
import { CastMember } from '../../interfaces/CastMemberInterface';

describe('CastCard', () => {
  test('should render all details when all data is provided', () => {
    // Arrange
    const mockCastMember: CastMember = {
      id: 1,
      name: 'Zendaya',
      profile_path: '/zendaya.jpg',
      cast_id: 10,
      character: 'Chani',
    };

    // Act
    render(<CastCard cast={mockCastMember} />);

    // Assert
    // Check for the image
    const image = screen.getByRole('img', { name: 'Zendaya' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w185/zendaya.jpg'
    );

    // Check for the name and character
    expect(screen.getByText('Zendaya')).toBeInTheDocument();
    expect(screen.getByText('as Chani')).toBeInTheDocument();
  });

  test('should not render an image if profile_path is null', () => {
    // Arrange
    const mockCastMember: CastMember = {
      id: 1,
      name: 'Zendaya',
      profile_path: null, // No image
      cast_id: 10,
      character: 'Chani',
    };

    // Act
    render(<CastCard cast={mockCastMember} />);

    // Assert
    // Use queryByRole because it returns null instead of throwing an error
    const image = screen.queryByRole('img');
    expect(image).not.toBeInTheDocument();
  });

  test('should not render character name if it is not provided', () => {
    // Arrange
    const mockCastMember: CastMember = {
      id: 1,
      name: 'Zendaya',
      profile_path: '/zendaya.jpg',
      cast_id: 10,
      character: '', // No character name
    };

    // Act
    render(<CastCard cast={mockCastMember} />);

    // Assert
    // Check that the name is present but the character line is not
    expect(screen.getByText('Zendaya')).toBeInTheDocument();
    const characterText = screen.queryByText(/as /); // Look for text starting with "as "
    expect(characterText).not.toBeInTheDocument();
  });
});
