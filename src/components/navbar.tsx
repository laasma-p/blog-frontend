import ThemeSwitcher from "./theme-switcher";
import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <div>
        <Link href="#">Living Bright</Link>
        <nav>
          <Link href="#">Tech</Link>
          <Link href="#">Opinions</Link>
          <Link href="#">Reviews</Link>
          <Link href="#">Thoughts</Link>
          <Link href="#">Lifestyle</Link>
        </nav>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
