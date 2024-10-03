const Navigation = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-chetwode-blue shadow-lg text-nero">
      <div className="text-2xl font-bold">
        <a href="/">My Blog</a>
      </div>
      <>
        <a
          href="/"
          className="hover:text-white-smoke transition-colors duration-300"
        >
          Home
        </a>
      </>
    </nav>
  );
};

export default Navigation;
