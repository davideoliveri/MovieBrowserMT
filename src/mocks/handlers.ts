import { http, HttpResponse } from 'msw';

const TMDB = 'https://api.themoviedb.org/3';

export const handlers = [
  // GET /movie/:id
  http.get(`${TMDB}/movie/:id*`, ({ params }) => {
    const { id } = params;
    const parsedId = parseInt(String(id));

    const isValidID = !Number.isNaN(parsedId);
    if (isValidID) {
      switch (parsedId) {
        case 101:
          return HttpResponse.json({
            id: parsedId,
            title: 'Test Movie',
            vote_average: 7.5,
            poster_path: '/x.png',
            release_date: '2024-01-01',
          });
        case 102:
          return HttpResponse.json({
            id: parsedId,
            title: 'Test Movie',
            vote_average: 8.5,
            poster_path: '/x.png',
            release_date: '2024-01-01',
          });
        case 999:
          return new HttpResponse('Failed to fetch movie', { status: 404 });
      }
      return HttpResponse.json({
        id: Number(id),
        title: 'Test Movie',
        vote_average: 8.4,
        poster_path: '/x.png',
        release_date: '2024-01-01',
      });
    }
    return new HttpResponse('Failed to fetch movie', { status: 404 });
  }),

  // GET /discover/movie
  http.get(`${TMDB}/discover/movie`, ({ request }) => {
    const url = new URL(request.url);
    const genreId: string | null = url.searchParams.get('with_genres');

    if (genreId && genreId === '0') {
      return new HttpResponse('Failed to fetch movie', { status: 404 });
    }
    return HttpResponse.json({
      results: [
        { id: 1, title: 'Sci-fi 1', poster_path: '/sf.png', vote_average: 7.1 },
      ],
    });
  }),
];
