import ThemeSwitcher from "./theme-switcher";

export default function Navbar() {
  return (
    <header>
      <div>
        <a href="#">Living Bright</a>
        <nav>
          <a href="#">Tech</a>
          <a href="#">Opinions</a>
          <a href="#">Reviews</a>
          <a href="#">Thoughts</a>
          <a href="#">Lifestyle</a>
        </nav>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
