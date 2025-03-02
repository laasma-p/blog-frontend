"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  const toggleThemeHandler = () => {
    const themeSwitch = theme === "light" ? "dark" : "light";
    setTheme(themeSwitch);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(themeSwitch);
  };

  return (
    <button onClick={toggleThemeHandler}>
      {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
}
