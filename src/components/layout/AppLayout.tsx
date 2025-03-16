
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "../ui/NavigationBar";
import ThemeToggle from "../common/ThemeToggle";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={18} className="mr-2" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="pt-16 pb-20">
        <div className="page-transition page-container">
          {children}
        </div>
      </main>
      
      <NavigationBar currentPath={location.pathname} />
    </div>
  );
};

export default AppLayout;
