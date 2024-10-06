const NotFound = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white-smoke text-center">
      <h2 className="text-3xl font-bold text-nero mt-56 mb-4">404 Not Found</h2>
      <p className="text-lg text-nero mb-4">
        The content you are looking for either does not exist or has been
        removed.
      </p>
      <a
        href="#"
        className="text-lg text-chetwode-blue hover:text-east-side transition-colors duration-300"
      >
        Go back to home
      </a>
    </div>
  );
};

export default NotFound;
