
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "../ui/NavigationBar";
import ThemeToggle from "../common/ThemeToggle";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <main className="pb-20">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <div className="page-transition page-container">
          {children}
        </div>
      </main>
      <NavigationBar currentPath={location.pathname} />
    </div>
  );
};

export default AppLayout;
