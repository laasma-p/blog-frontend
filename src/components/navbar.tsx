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
    <header className="bg-chetwode-blue dark:bg-east-side">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link
          href="#"
          className="text-2xl font-bold tracking-wide text-white-smoke dark:text-nero hover:text-nero dark:hover:text-white-smoke transition duration-300"
        >
          Living Bright
        </Link>
        <nav className="flex space-x-6 flex-wrap justify-center items-center">
          {categories.map((category) => {
            return (
              <Link
                key={category.slug}
                href="#"
                className="text-lg font-medium text-white-smoke dark:text-nero hover:text-nero dark:hover:text-white-smoke transition duration-300"
              >
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
