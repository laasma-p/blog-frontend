"use client";

import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.add(storedTheme);
    }
  }, []);

  const toggleThemeHandler = () => {
    const themeSwitch = theme === "light" ? "dark" : "light";
    setTheme(themeSwitch);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(themeSwitch);
    localStorage.setItem("theme", themeSwitch);
  };

  return (
    <button onClick={toggleThemeHandler}>
      {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
}
