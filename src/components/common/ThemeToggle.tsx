
import { useState, useEffect } from "react";
import { Moon, Sun, Monitor, Eye } from "lucide-react";

type ThemeMode = "light" | "dark" | "system" | "eye-comfort";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [isOpen, setIsOpen] = useState(false);

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Default to system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    }
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);
  
  // Automatically change to dark mode in the evening
  useEffect(() => {
    if (theme === "system") {
      const hours = new Date().getHours();
      const isEvening = hours >= 19 || hours < 7;
      
      if (isEvening) {
        document.documentElement.classList.add("dark");
      }
    }
  }, [theme]);

  const applyTheme = (newTheme: ThemeMode) => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove("dark", "light", "eye-comfort");
    
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else if (newTheme === "light") {
      // Light theme is default
    } else if (newTheme === "eye-comfort") {
      root.classList.add("dark");
      root.classList.add("eye-comfort");
    } else if (newTheme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        root.classList.add("dark");
      }
    }
    
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="glass glass-dark p-2 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Toggle theme"
      >
        {theme === "light" && <Sun size={20} className="text-foreground" />}
        {theme === "dark" && <Moon size={20} className="text-foreground" />}
        {theme === "system" && <Monitor size={20} className="text-foreground" />}
        {theme === "eye-comfort" && <Eye size={20} className="text-foreground" />}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg glass glass-dark z-50 animate-fade-in">
          <div className="p-2">
            <button
              onClick={() => toggleTheme("light")}
              className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                theme === "light" ? "bg-primary text-primary-foreground" : "hover:bg-secondary/70"
              }`}
            >
              <Sun size={16} className="mr-2" />
              Light Mode
            </button>
            
            <button
              onClick={() => toggleTheme("dark")}
              className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                theme === "dark" ? "bg-primary text-primary-foreground" : "hover:bg-secondary/70"
              }`}
            >
              <Moon size={16} className="mr-2" />
              Dark Mode
            </button>
            
            <button
              onClick={() => toggleTheme("system")}
              className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                theme === "system" ? "bg-primary text-primary-foreground" : "hover:bg-secondary/70"
              }`}
            >
              <Monitor size={16} className="mr-2" />
              System Preference
            </button>
            
            <button
              onClick={() => toggleTheme("eye-comfort")}
              className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                theme === "eye-comfort" ? "bg-primary text-primary-foreground" : "hover:bg-secondary/70"
              }`}
            >
              <Eye size={16} className="mr-2" />
              Eye Comfort
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
