"use client";

import { useEffect, useState } from "react";
import ThemeSwitcher from "./theme-switcher";
import Link from "next/link";

export default function Navbar() {
  const [categories, setCategories] = useState<
    { name: string; slug: string }[]
  >([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("http://localhost:3000/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <header>
      <div>
        <Link href="#">Living Bright</Link>
        <nav>
          {categories.map((category) => {
            return (
              <Link key={category.slug} href="#">
                {category.name}
              </Link>
            );
          })}
        </nav>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
