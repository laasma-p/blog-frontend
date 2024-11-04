const Footer = () => {
  return (
    <footer className="py-4 text-center bg-light-pink">
      <p className="text-nero">
        &copy; {new Date().getUTCFullYear()} My Blog. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
