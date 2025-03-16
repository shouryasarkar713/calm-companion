
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./button";

const MainNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/#features" },
    { name: "Testimonials", path: "/#testimonials" },
    { name: "Exercises", path: "/#exercises" },
    { name: "Help", path: "/#help" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link 
            key={item.name}
            to={item.path}
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            {item.name}
          </Link>
        ))}
        <Link to="/chat">
          <Button className="cta-button ml-4">Start Your Journey</Button>
        </Link>
      </nav>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="container h-full flex flex-col items-center justify-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu} 
              className="absolute top-4 right-4"
              aria-label="Close menu"
            >
              <X size={24} />
            </Button>
            
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path}
                  className="text-xl font-medium text-foreground/80 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/chat" onClick={toggleMenu}>
                <Button className="cta-button mt-4">Start Your Journey</Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MainNav;
