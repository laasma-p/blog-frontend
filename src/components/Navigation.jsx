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
    <nav className="flex justify-between items-center p-4 bg-light-purple">
      <Link to="/" className="text-2xl text-nero font-bold">
        My Blog
      </Link>
      <div className="flex space-x-1.5">
        {isAuthenticated ? (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-nero hover:text-white-smoke hover:bg-dark-purple transition-colors duration-300 py-2 px-3 rounded-lg ${
                  isActive ? "bg-dark-purple text-white-smoke" : ""
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/add-a-post"
              className={({ isActive }) =>
                `text-nero hover:text-white-smoke hover:bg-dark-purple transition-colors duration-300 py-2 px-3 rounded-lg ${
                  isActive ? "bg-dark-purple text-white-smoke" : ""
                }`
              }
            >
              Add A Post
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-nero hover:text-white-smoke hover:bg-dark-purple transition-colors duration-300 py-2 px-3 rounded-lg ${
                  isActive ? "bg-dark-purple text-white-smoke" : ""
                }`
              }
            >
              Profile
            </NavLink>
            <button
              className="text-nero hover:text-white-smoke hover:bg-dark-purple transition-colors duration-300 py-2 px-3 rounded-lg"
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
              `text-nero hover:text-white-smoke hover:bg-dark-purple transition-colors duration-300 py-2 px-3 rounded-lg ${
                isActive ? "bg-dark-purple text-white-smoke" : ""
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
