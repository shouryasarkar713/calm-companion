
import { Link } from "react-router-dom";
import { Home, MessageCircle, BarChart2, BookOpen, CircleHelp } from "lucide-react";

interface NavigationBarProps {
  currentPath: string;
}

const NavigationBar = ({ currentPath }: NavigationBarProps) => {
  const navigation = [
    { name: "Home", path: "/", icon: Home },
    { name: "Chat", path: "/chat", icon: MessageCircle },
    { name: "Dashboard", path: "/dashboard", icon: BarChart2 },
    { name: "Journal", path: "/journal", icon: BookOpen },
    { name: "Help", path: "/exercises", icon: CircleHelp },
  ];

  return (
    <nav className="bottom-nav">
      {navigation.map((item) => {
        const isActive = currentPath === item.path;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.name}
            to={item.path}
            className={`nav-item ${isActive ? "active" : ""}`}
          >
            <Icon 
              size={24} 
              className={`${isActive ? "animate-scale-in" : ""}`} 
              strokeWidth={isActive ? 2.5 : 1.5} 
            />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavigationBar;
