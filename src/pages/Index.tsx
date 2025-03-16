
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, BarChart2, BookOpen, CircleHelp } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";

const Index = () => {
  const [greeting, setGreeting] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const hours = new Date().getHours();
    let newGreeting;
    
    if (hours < 12) {
      newGreeting = "Good morning";
    } else if (hours < 18) {
      newGreeting = "Good afternoon";
    } else {
      newGreeting = "Good evening";
    }
    
    setGreeting(newGreeting);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const quickActions = [
    {
      title: "Talk to AI",
      description: "Share what's on your mind",
      icon: <MessageCircle size={24} className="text-primary" />,
      link: "/chat",
    },
    {
      title: "Track Progress",
      description: "View your wellness journey",
      icon: <BarChart2 size={24} className="text-primary" />,
      link: "/dashboard",
    },
    {
      title: "Journal",
      description: "Write your thoughts",
      icon: <BookOpen size={24} className="text-primary" />,
      link: "/journal",
    },
    {
      title: "Get Help",
      description: "Connect with professionals",
      icon: <CircleHelp size={24} className="text-primary" />,
      link: "/exercises",
    },
  ];

  return (
    <AppLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-2">{greeting}</h1>
        <p className="text-muted-foreground">How are you feeling today?</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {["😊 Good", "😐 Neutral", "😔 Down", "😰 Anxious"].map((mood) => (
          <button
            key={mood}
            className="py-3 px-4 glass glass-dark rounded-xl hover:bg-secondary/30 transition-colors"
          >
            {mood}
          </button>
        ))}
      </div>
      
      <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="flex items-center p-4 glass glass-dark rounded-xl hover:bg-secondary/30 transition-colors"
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                {action.icon}
              </div>
              <div>
                <h3 className="font-medium">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-2xl font-semibold mb-4">Daily Inspiration</h2>
        <div className="glass glass-dark rounded-2xl p-6">
          <blockquote className="text-lg italic mb-4">
            "You don't have to control your thoughts. You just have to stop letting them control you."
          </blockquote>
          <cite className="text-sm text-muted-foreground">— Dan Millman</cite>
        </div>
      </div>
      
      <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-2xl font-semibold mb-4">Today's Recommendation</h2>
        <div className="glass glass-dark rounded-2xl p-6 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-medium mb-2">5-Minute Breathing Exercise</h3>
            <p className="text-muted-foreground mb-4">
              Take a moment to reset and calm your mind with this quick breathing technique.
            </p>
            <Link
              to="/exercises/breathing"
              className="inline-flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-full transition-colors hover:bg-primary/90"
            >
              Start Now
            </Link>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-primary/10 -mb-8 -mr-8 animate-pulse-light"></div>
          <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-primary/5 -mt-8 -ml-8"></div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
