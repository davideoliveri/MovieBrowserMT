import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';

export function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = 'An unexpected error occurred';
  }

  return (
    <Layout>
      <main className="error-page">
        <h1 className="h1">Oops!</h1>
        {errorStatus && (
          <p className="error-page__error-status">{errorStatus}</p>
        )}
        <p className="error-page__message-sorry">Something went wrong.</p>
        <p className="error-page__message-content">
          <i>{errorMessage}</i>
        </p>
        <Link className="error-page__link-home" to="/">
          Go back home
        </Link>
      </main>
    </Layout>
  );
}
