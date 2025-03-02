"use client";

import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;

    setTheme(systemTheme || storedTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const systemThemeChangeHandler = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", systemThemeChangeHandler);

    return () =>
      mediaQuery.removeEventListener("change", systemThemeChangeHandler);
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleThemeHandler = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={toggleThemeHandler}>
      {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
}
