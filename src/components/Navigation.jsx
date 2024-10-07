import { Link, NavLink } from "react-router-dom";

const Navigation = ({ isAuthenticated }) => {
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
