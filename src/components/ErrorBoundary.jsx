import { Link, useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();
  const message = error?.statusText || error?.message || "Something went wrong.";

  return (
    <div className="page">
      <h1>Something went wrong</h1>
      <p className="lede">{message}</p>
      <Link className="back" to="/">
        Behind the bar
      </Link>
    </div>
  );
};

export default ErrorBoundary;
