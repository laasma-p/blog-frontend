import { Link } from "react-router-dom";

const NotFound = ({ isAuthenticated }) => {
  return (
    <main
      className="flex flex-col items-center min-h-screen bg-white-smoke text-center"
      role="alert"
    >
      <h2 className="text-3xl font-bold text-nero mt-56 mb-4">404 Not Found</h2>
      <p className="text-lg text-nero mb-4">
        The content you are looking for either does not exist or has been
        removed.
      </p>
      <Link
        to={isAuthenticated ? "/dashboard" : "/"}
        className="text-lg text-dark-purple hover:text-bright-purple transition-colors duration-300"
      >
        Go back to {isAuthenticated ? "dashboard" : "home"}
      </Link>
    </main>
  );
};

export default NotFound;
