import { useLoaderData } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { Carousel } from '../../components/Carousel/Carousel';
import { API } from '../../api/API';

const carouselConfig = [
  { title: 'Science Fiction', genreId: 878 },
  { title: 'Horror', genreId: 27 },
  { title: 'Animation', genreId: 16 },
];

export async function loader() {
  const moviePromises = carouselConfig.map((config) =>
    API.getMoviesByGenre(config.genreId)
  );

  const allMovies = await Promise.all(moviePromises);

  const loaderData = carouselConfig.map((config, index) => ({
    title: config.title,
    movies: allMovies[index],
  }));

  return loaderData;
}

export const HomePage: React.FC = () => {
  const carousels = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <Layout>
      <main className="homepage container">
        <h1 className="h1 text-center">Welcome back!</h1>
        {carousels.map(({ title, movies }) => (
          <Carousel key={title} genreName={title} movies={movies} />
        ))}
      </main>
    </Layout>
  );
};
