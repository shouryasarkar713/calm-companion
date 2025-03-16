
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";
import MainNav from "../ui/MainNav";
import Footer from "../ui/Footer";

interface HomepageLayoutProps {
  children: React.ReactNode;
}

const HomepageLayout = ({ children }: HomepageLayoutProps) => {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">MindfulAI</h1>
          </div>
          <div className="flex items-center gap-6">
            <MainNav />
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default HomepageLayout;
