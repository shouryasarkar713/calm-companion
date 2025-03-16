
import { Phone, Calendar, MessageSquare, Shield, AlertTriangle, Heart, UserPlus } from "lucide-react";
import { useState } from "react";

const TherapistConnect = () => {
  const [showEmergency, setShowEmergency] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="glass glass-dark rounded-2xl p-6 animate-fade-in">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Heart className="mr-2 text-primary" size={20} />
          Need professional help?
        </h3>
        <p className="text-muted-foreground mb-6">
          Connect with licensed therapists and mental health professionals for personalized support.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors">
            <Phone size={24} className="mb-2" />
            <span>Call Helpline</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors">
            <Calendar size={24} className="mb-2" />
            <span>Book Session</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors">
            <MessageSquare size={24} className="mb-2" />
            <span>Text Support</span>
          </button>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <button 
            onClick={() => setShowEmergency(!showEmergency)}
            className="text-sm flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <AlertTriangle size={16} className="mr-1" />
            {showEmergency ? "Hide emergency resources" : "Show emergency resources"}
          </button>
          
          <button className="text-sm flex items-center text-primary hover:text-primary/80 transition-colors">
            <UserPlus size={16} className="mr-1" />
            Find therapists near me
          </button>
        </div>
      </div>
      
      {showEmergency && (
        <div className="glass glass-dark rounded-2xl p-6 border-l-4 border-destructive animate-fade-in">
          <div className="flex items-start mb-4">
            <Shield className="mr-3 text-destructive" size={24} />
            <div>
              <h3 className="text-xl font-semibold mb-1">Emergency Resources</h3>
              <p className="text-muted-foreground">
                If you're experiencing a mental health crisis or having thoughts of suicide, please reach out for immediate help.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-background/50 rounded-xl">
              <h4 className="font-medium mb-2">National Suicide Prevention Lifeline</h4>
              <p className="text-sm mb-2">24/7, free and confidential support</p>
              <a href="tel:988" className="flex items-center text-primary hover:underline">
                <Phone size={16} className="mr-2" />
                988
              </a>
            </div>
            
            <div className="p-4 bg-background/50 rounded-xl">
              <h4 className="font-medium mb-2">Crisis Text Line</h4>
              <p className="text-sm mb-2">Text HOME to 741741 to connect with a Crisis Counselor</p>
              <button className="flex items-center text-primary hover:underline">
                <MessageSquare size={16} className="mr-2" />
                Text HOME to 741741
              </button>
            </div>
            
            <div className="p-4 bg-background/50 rounded-xl">
              <h4 className="font-medium mb-2">Emergency Services</h4>
              <p className="text-sm mb-2">For immediate emergency assistance</p>
              <a href="tel:911" className="flex items-center text-primary hover:underline">
                <Phone size={16} className="mr-2" />
                911
              </a>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            These resources are available 24/7 and are staffed by trained professionals who can provide support during a crisis.
          </p>
        </div>
      )}
      
      <div className="glass glass-dark rounded-2xl p-6 animate-fade-in">
        <h3 className="text-xl font-semibold mb-4">Quick Coping Strategies</h3>
        <div className="space-y-3">
          <div className="p-3 bg-secondary/30 rounded-xl">
            <h4 className="font-medium mb-1">5-4-3-2-1 Grounding Technique</h4>
            <p className="text-sm text-muted-foreground">
              Acknowledge 5 things you see, 4 things you can touch, 3 things you hear, 2 things you smell, and 1 thing you taste.
            </p>
          </div>
          
          <div className="p-3 bg-secondary/30 rounded-xl">
            <h4 className="font-medium mb-1">Box Breathing</h4>
            <p className="text-sm text-muted-foreground">
              Inhale for 4 counts, hold for 4 counts, exhale for 4 counts, hold for 4 counts. Repeat.
            </p>
          </div>
          
          <div className="p-3 bg-secondary/30 rounded-xl">
            <h4 className="font-medium mb-1">Progressive Muscle Relaxation</h4>
            <p className="text-sm text-muted-foreground">
              Tense and then relax each muscle group in your body, starting from your toes and working up to your head.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistConnect;
