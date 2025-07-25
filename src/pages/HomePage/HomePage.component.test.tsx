import { render, screen } from '@testing-library/react';
import { useLoaderData, MemoryRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useLoaderData: vi.fn(),
  };
});

describe('HomePage component', () => {
  test('should render a carousel for each genre from the loader data', () => {
    // Arrange: Create mock data that mimics the loader's output
    const mockLoaderData = [
      {
        title: 'Science Fiction',
        movies: [
          {
            id: 1,
            title: 'Dune',
            vote_average: 8.2,
            release_date: '2024-02-28',
            poster_path: '/dune.jpg',
          },
        ],
      },
      {
        title: 'Horror',
        movies: [
          {
            id: 2,
            title: 'The Thing',
            vote_average: 8.1,
            release_date: '1982-06-25',
            poster_path: '/thething.jpg',
          },
        ],
      },
    ];
    // Tell the mocked useLoaderData what to return
    vi.mocked(useLoaderData).mockReturnValue(mockLoaderData);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome back!')).toBeInTheDocument();
    expect(screen.getByText('Science Fiction movies')).toBeInTheDocument();
    expect(screen.getByText('Horror movies')).toBeInTheDocument();
  });
});
