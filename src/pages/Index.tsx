
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  MessageCircle, 
  Brain, 
  Activity, 
  FileText, 
  Star, 
  ArrowRight, 
  Users, 
  Award, 
  Shield, 
  Wind, 
  Clock, 
  BookOpen, 
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import HomepageLayout from "../components/layout/HomepageLayout";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    const handleParallax = () => {
      if (heroRef.current) {
        const scrollValue = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollValue * 0.2}px)`;
      }
    };
    
    window.addEventListener('scroll', handleParallax);
    return () => {
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  if (!mounted) return null;

  const features = [
    {
      title: "AI Chatbot for Emotional Reflection",
      description: "Engage in structured, empathetic conversations to process your emotions and thoughts.",
      icon: <MessageCircle size={32} className="text-blue-500" />,
      link: "/chat"
    },
    {
      title: "Personalized Mental Wellness",
      description: "Get AI-generated insights and personalized recommendations based on your unique needs.",
      icon: <Brain size={32} className="text-indigo-500" />,
      link: "/dashboard"
    },
    {
      title: "Interactive Exercises",
      description: "Access guided meditations, breathing exercises, and evidence-based CBT techniques.",
      icon: <Activity size={32} className="text-purple-500" />,
      link: "/exercises"
    },
    {
      title: "Secure Digital Journal",
      description: "Document your thoughts and track your emotional patterns with AI-powered insights.",
      icon: <FileText size={32} className="text-teal-500" />,
      link: "/journal"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Student",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      quote: "MindfulAI has been a game-changer for managing my anxiety during exams. The breathing exercises and daily check-ins have become an essential part of my routine.",
      rating: 5
    },
    {
      name: "Michael T.",
      role: "Software Engineer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "As someone who was skeptical about AI therapy, I'm amazed at how helpful the conversations with MindfulAI have been. It's like having a therapist in my pocket.",
      rating: 5
    },
    {
      name: "Jessica K.",
      role: "Healthcare Worker",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      quote: "The personalized recommendations and journaling prompts have helped me process work stress in a healthy way. Highly recommend!",
      rating: 4
    }
  ];

  const experts = [
    {
      name: "Dr. Emily Chen",
      role: "Clinical Psychologist",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      quote: "MindfulAI incorporates evidence-based techniques that complement traditional therapy approaches. I often recommend it to my patients."
    },
    {
      name: "Dr. Mark Johnson",
      role: "Psychiatrist",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      quote: "The AI algorithms powering this platform demonstrate a sophisticated understanding of cognitive behavioral techniques."
    }
  ];

  const exercises = [
    {
      title: "Deep Breathing",
      description: "Guided breathing exercises to reduce stress and anxiety in just 5 minutes.",
      icon: <Wind size={28} className="text-blue-500" />,
      duration: "5 min"
    },
    {
      title: "Mindfulness Meditation",
      description: "Learn to stay present and develop a peaceful mind-body awareness.",
      icon: <Brain size={28} className="text-purple-500" />,
      duration: "10 min"
    },
    {
      title: "Guided Journaling",
      description: "Structured prompts to help process emotions and gain personal insights.",
      icon: <BookOpen size={28} className="text-teal-500" />,
      duration: "15 min"
    },
    {
      title: "Sleep Stories",
      description: "Calming narratives designed to help you fall asleep naturally and peacefully.",
      icon: <Clock size={28} className="text-indigo-500" />,
      duration: "20 min"
    }
  ];

  return (
    <HomepageLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10"></div>
        <div 
          className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.2"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        ></div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-balance">
                Your AI-Powered Mental Health Companion
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Get personalized emotional support, guided exercises, and expert-backed tools for a healthier mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/chat">
                  <Button className="cta-button">
                    Start Your Journey
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/#features">
                  <Button variant="outline" className="cta-button-secondary">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center text-muted-foreground">
                <Shield size={18} className="mr-2" />
                <span className="text-sm">Your privacy is our priority. All conversations are confidential.</span>
              </div>
            </div>
            
            <div className="relative hidden lg:block" ref={heroRef}>
              <div className="relative rounded-2xl glassmorphism p-6 max-w-md mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    AI
                  </div>
                  <div className="bg-background rounded-xl p-3 shadow-sm">
                    <p className="text-foreground">Hi there! How are you feeling today?</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users size={16} />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
                    <p>I'm feeling a bit anxious about my presentation tomorrow.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    AI
                  </div>
                  <div className="bg-background rounded-xl p-3 shadow-sm">
                    <p className="text-foreground">I understand presentations can be stressful. Would you like to try a quick breathing exercise to help manage that anxiety?</p>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
              <div className="absolute -z-10 -top-10 -left-10 w-72 h-72 bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <a href="#features" className="text-foreground/60 hover:text-foreground transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </a>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How MindfulAI Supports You</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our AI-powered platform offers a range of features designed to support your mental wellbeing journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover glassmorphism border-0">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Link to={feature.link} className="group flex items-center text-primary font-medium">
                    Learn more
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Users size={20} className="text-primary" />
                <span className="font-medium">10,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={20} className="text-primary" />
                <span className="font-medium">4.8/5 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={20} className="text-primary" />
                <span className="font-medium">Evidence-Based Approach</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Hear from people who have transformed their mental wellbeing with MindfulAI.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-background rounded-2xl p-8 shadow-sm relative overflow-hidden card-hover"
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/20 -mt-10 -mr-10"></div>
                
                <div className="flex items-center mb-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="mb-4 text-balance relative z-10">{testimonial.quote}</p>
                
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Expert Endorsements</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {experts.map((expert, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <img src={expert.avatar} alt={expert.name} className="w-16 h-16 rounded-full" />
                  <div>
                    <p className="italic mb-4 text-balance">{expert.quote}</p>
                    <div>
                      <h4 className="font-medium">{expert.name}</h4>
                      <p className="text-sm text-muted-foreground">{expert.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Exercises Section */}
      <section id="exercises" className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Guided Exercises & Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Evidence-based techniques to help you manage stress, anxiety, and improve your overall wellbeing.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exercises.map((exercise, index) => (
              <div 
                key={index} 
                className="neumorphism rounded-xl p-6 card-hover"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-lg bg-background">
                    {exercise.icon}
                  </div>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Clock size={14} className="mr-1" />
                    {exercise.duration}
                  </span>
                </div>
                <h3 className="text-lg font-medium mb-2">{exercise.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{exercise.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Start Exercise
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/exercises">
              <Button variant="ghost" className="group">
                View All Exercises
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="help" className="section-padding bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Mental Wellbeing?</h2>
              <p className="text-blue-50 mb-8 text-lg">
                Join thousands of others who have discovered a new approach to emotional wellness with AI-powered support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/chat">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-6 py-3">
                    Start Free Trial
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="text-white border-white hover:bg-white/10 rounded-full px-6 py-3">
                    <Phone size={18} className="mr-2" />
                    Talk to a Specialist
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-blue-100">
                No credit card required. Cancel anytime.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-medium mb-6">How We Protect Your Privacy</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Shield className="mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>End-to-end encryption for all conversations</span>
                </li>
                <li className="flex items-start">
                  <Shield className="mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>Anonymous data processing with no identifying information stored</span>
                </li>
                <li className="flex items-start">
                  <Shield className="mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>HIPAA-compliant platform with strict data access controls</span>
                </li>
                <li className="flex items-start">
                  <Shield className="mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>Option to completely delete all your data at any time</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center">
                  <Award size={20} className="mr-2" />
                  <span className="font-medium">Certified by Mental Health Security Alliance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HomepageLayout>
  );
};

export default Index;
