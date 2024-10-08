import { Link, NavLink, useNavigate } from "react-router-dom";

const Navigation = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const loggingOutHandler = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-chetwode-blue shadow-lg text-nero">
      <Link to="/" className="text-2xl font-bold">
        My Blog
      </Link>
      <div className="flex space-x-4">
        {isAuthenticated ? (
          <>
            <NavLink
              to="/dashboard"
              className="hover:text-white-smoke transition-colors duration-300"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/add-a-post"
              className="hover:text-white-smoke transition-colors duration-300"
            >
              Add A Post
            </NavLink>
            <button
              className="hover:text-white-smoke transition-colors duration-300"
              onClick={loggingOutHandler}
            >
              Log Out
            </button>
          </>
        ) : (
          <NavLink
            to="/"
            className="hover:text-white-smoke transition-colors duration-300"
          >
            Home
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
