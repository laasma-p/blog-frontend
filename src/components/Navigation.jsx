import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-chetwode-blue shadow-lg text-nero">
      <Link to="/" className="text-2xl font-bold">
        My Blog
      </Link>
      <NavLink
        to="/"
        className="hover:text-white-smoke transition-colors duration-300"
      >
        Home
      </NavLink>
    </nav>
  );
};

export default Navigation;
