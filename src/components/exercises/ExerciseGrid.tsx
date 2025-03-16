
import { Wind, BookOpen, Brain, Heart, Footprints, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import TherapistConnect from "../help/TherapistConnect";

interface ExerciseCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  link: string;
}

const ExerciseCard = ({ title, description, icon, duration, link }: ExerciseCardProps) => {
  return (
    <Link to={link} className="exercise-card transition-all duration-300 hover:scale-[1.02]">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <div className="flex items-center justify-between">
        <div className="text-xs px-2 py-1 bg-secondary rounded-full">
          {duration}
        </div>
      </div>
    </Link>
  );
};

const ExerciseGrid = () => {
  const exercises = [
    {
      title: "Deep Breathing",
      description: "Calm your mind with guided breathing exercises",
      icon: <Wind size={24} className="text-primary" />,
      duration: "5 mins",
      link: "/exercises/breathing",
    },
    {
      title: "Journaling",
      description: "Express your thoughts and emotions through writing",
      icon: <BookOpen size={24} className="text-primary" />,
      duration: "10 mins",
      link: "/journal",
    },
    {
      title: "CBT Techniques",
      description: "Challenge negative thought patterns",
      icon: <Brain size={24} className="text-primary" />,
      duration: "15 mins",
      link: "/exercises/cbt",
    },
    {
      title: "Mindfulness",
      description: "Bring awareness to the present moment",
      icon: <Heart size={24} className="text-primary" />,
      duration: "10 mins",
      link: "/exercises/mindfulness",
    },
    {
      title: "Grounding",
      description: "Connect with your surroundings when anxious",
      icon: <Footprints size={24} className="text-primary" />,
      duration: "5 mins",
      link: "/exercises/grounding",
    },
    {
      title: "Self-Compassion",
      description: "Practice kindness and understanding toward yourself",
      icon: <Leaf size={24} className="text-primary" />,
      duration: "10 mins",
      link: "/exercises/compassion",
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Guided Exercises</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={index}
            title={exercise.title}
            description={exercise.description}
            icon={exercise.icon}
            duration={exercise.duration}
            link={exercise.link}
          />
        ))}
      </div>
      
      <div className="mt-10">
        <TherapistConnect />
      </div>
    </div>
  );
};

export default ExerciseGrid;
