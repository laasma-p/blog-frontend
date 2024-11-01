import { Link, NavLink, useNavigate } from "react-router-dom";

const Navigation = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const loggingOutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
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
              className={({ isActive }) =>
                `hover:text-white-smoke transition-colors duration-300 ${
                  isActive ? "text-white-smoke" : ""
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/add-a-post"
              className={({ isActive }) =>
                `hover:text-white-smoke transition-colors duration-300 ${
                  isActive ? "text-white-smoke" : ""
                }`
              }
            >
              Add A Post
            </NavLink>
            <button
              className="hover:text-white-smoke transition-colors duration-300"
              onClick={loggingOutHandler}
              aria-label="Log out"
            >
              Log Out
            </button>
          </>
        ) : (
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-white-smoke transition-colors duration-300 ${
                isActive ? "text-white-smoke" : ""
              }`
            }
          >
            Home
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
