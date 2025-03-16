
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme on component mount
  useEffect(() => {
    const isDarkMode = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button 
      onClick={toggleTheme}
      className="glass glass-dark p-2 rounded-full transition-all duration-300 hover:scale-110"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Moon size={20} className="text-foreground" />
      ) : (
        <Sun size={20} className="text-foreground" />
      )}
    </button>
  );
};

export default ThemeToggle;
