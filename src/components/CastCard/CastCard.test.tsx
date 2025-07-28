import { render, screen } from '@testing-library/react';
import { CastCard } from './CastCard';
import { CastMember } from '@/interfaces/CastMemberInterface';

describe('CastCard', () => {
  test('should render all details when all data is provided', () => {
    const mockCastMember: CastMember = {
      id: 1,
      name: 'Zendaya',
      profile_path: '/zendaya.jpg',
      cast_id: 10,
      character: 'Chani',
    };

    render(<CastCard cast={mockCastMember} />);

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

  test('should render a placeholder when profile_path is null', () => {
    // Arrange
    const mockCastMember: CastMember = {
      id: 1,
      name: 'Zendaya',
      profile_path: null,
      cast_id: 10,
      character: 'Chani',
    };

    // Act
    render(<CastCard cast={mockCastMember} />);

    // Assert
    const image = screen.getByRole('img', { name: 'Zendaya' });
    expect(image).toBeInTheDocument();

    // Check that the src is NOT a TMDB URL
    expect(image.getAttribute('src')).not.toContain(
      'https://image.tmdb.org/t/p/'
    );
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

    render(<CastCard cast={mockCastMember} />);

    // Check that the name is present but the character line is not
    expect(screen.getByText('Zendaya')).toBeInTheDocument();
    const characterText = screen.queryByText(/as /);
    expect(characterText).not.toBeInTheDocument();
  });
});
