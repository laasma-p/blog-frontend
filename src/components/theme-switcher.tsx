"use client";

import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [isUserPreferenceSet, setIsUserPreferenceSet] = useState(false);

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    const userPreferenceSet = localStorage.getItem("theme-set") === "true";

    setTheme(systemTheme || storedTheme);
    setIsUserPreferenceSet(userPreferenceSet);

    if (!userPreferenceSet) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const systemThemeChangeHandler = (event: MediaQueryListEvent) => {
        if (!localStorage.getItem("theme-set")) {
          setTheme(event.matches ? "dark" : "light");
        }
      };

      mediaQuery.addEventListener("change", systemThemeChangeHandler);

      return () =>
        mediaQuery.removeEventListener("change", systemThemeChangeHandler);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleThemeHandler = () => {
    const themeSwitch = theme === "light" ? "dark" : "light";
    setTheme(themeSwitch);
    setIsUserPreferenceSet(true);
    localStorage.setItem("theme", themeSwitch);
    localStorage.setItem("theme-set", "true");
  };

  return (
    <button
      onClick={toggleThemeHandler}
      className="text-white-smoke dark:text-nero hover:text-nero dark:hover:text-white-smoke cursor-pointer transition duration-300"
    >
      {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
}
