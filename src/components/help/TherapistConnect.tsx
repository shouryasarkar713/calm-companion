
import { Phone, Calendar, MessageSquare } from "lucide-react";

const TherapistConnect = () => {
  return (
    <div className="glass glass-dark rounded-2xl p-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">Need professional help?</h3>
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
    </div>
  );
};

export default TherapistConnect;
