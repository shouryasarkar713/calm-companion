
import { Wind, BookOpen, Brain, Heart, Footprints, Leaf, Play, Info, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import TherapistConnect from "../help/TherapistConnect";

interface ExerciseCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  link: string;
  difficulty?: string;
  category?: string;
  featured?: boolean;
  completedCount?: number;
}

const ExerciseCard = ({ 
  title, 
  description, 
  icon, 
  duration, 
  link,
  difficulty = "Beginner",
  category,
  featured = false,
  completedCount = 0
}: ExerciseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      to={link} 
      className={`exercise-card transition-all duration-300 hover:scale-[1.02] relative overflow-hidden ${
        featured ? 'border-l-4 border-primary' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {featured && (
        <div className="absolute top-2 right-2">
          <Star size={16} className="fill-primary text-primary" />
        </div>
      )}
    
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      
      <h3 className="text-lg font-medium mb-1 group flex items-center">
        {title}
        {isHovered && (
          <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Play size={16} className="text-primary" />
          </div>
        )}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-xs px-2 py-1 bg-secondary rounded-full flex items-center">
            <Clock size={12} className="mr-1" />
            {duration}
          </div>
          
          {category && (
            <div className="text-xs px-2 py-1 bg-secondary/50 rounded-full">
              {category}
            </div>
          )}
        </div>
        
        {completedCount > 0 && (
          <div className="text-xs text-muted-foreground">
            Completed {completedCount} {completedCount === 1 ? 'time' : 'times'}
          </div>
        )}
      </div>
      
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-background/90 flex items-end justify-center pb-6 opacity-0 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-full flex items-center">
          <Play size={16} className="mr-2" />
          Start Exercise
        </button>
      </div>
    </Link>
  );
};

const ExerciseGrid = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const exercises = [
    {
      title: "Deep Breathing",
      description: "Calm your mind with guided breathing exercises",
      icon: <Wind size={24} className="text-primary" />,
      duration: "5 mins",
      link: "/exercises/breathing",
      category: "Anxiety",
      featured: true,
      completedCount: 3,
    },
    {
      title: "Journaling",
      description: "Express your thoughts and emotions through writing",
      icon: <BookOpen size={24} className="text-primary" />,
      duration: "10 mins",
      link: "/journal",
      category: "Reflection",
      completedCount: 1,
    },
    {
      title: "CBT Techniques",
      description: "Challenge negative thought patterns",
      icon: <Brain size={24} className="text-primary" />,
      duration: "15 mins",
      link: "/exercises/cbt",
      category: "Cognitive",
      difficulty: "Intermediate",
    },
    {
      title: "Mindfulness",
      description: "Bring awareness to the present moment",
      icon: <Heart size={24} className="text-primary" />,
      duration: "10 mins",
      link: "/exercises/mindfulness",
      category: "Meditation",
      completedCount: 2,
    },
    {
      title: "Grounding",
      description: "Connect with your surroundings when anxious",
      icon: <Footprints size={24} className="text-primary" />,
      duration: "5 mins",
      link: "/exercises/grounding",
      category: "Anxiety",
    },
    {
      title: "Self-Compassion",
      description: "Practice kindness and understanding toward yourself",
      icon: <Leaf size={24} className="text-primary" />,
      duration: "10 mins",
      link: "/exercises/compassion",
      category: "Self-care",
      difficulty: "Beginner",
    },
  ];
  
  const categories = ["All", "Anxiety", "Meditation", "Cognitive", "Reflection", "Self-care"];
  
  const filteredExercises = exercises.filter(exercise => {
    const matchesFilter = filter === "all" || exercise.category?.toLowerCase() === filter.toLowerCase();
    const matchesSearch = exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-semibold">Guided Exercises</h2>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 pl-8 bg-secondary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-thin">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category.toLowerCase())}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              filter === category.toLowerCase() || (filter === "all" && category === "All")
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {filteredExercises.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
            <Info size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No exercises found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
          <button 
            onClick={() => {
              setFilter("all");
              setSearchQuery("");
            }}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-full"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((exercise, index) => (
            <ExerciseCard
              key={index}
              title={exercise.title}
              description={exercise.description}
              icon={exercise.icon}
              duration={exercise.duration}
              link={exercise.link}
              category={exercise.category}
              difficulty={exercise.difficulty}
              featured={exercise.featured}
              completedCount={exercise.completedCount}
            />
          ))}
        </div>
      )}
      
      <div className="mt-10">
        <TherapistConnect />
      </div>
    </div>
  );
};

export default ExerciseGrid;
