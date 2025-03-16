
import { useEffect, useState } from "react";
import { LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUp, ArrowDown, Activity, Calendar, Smile, Moon } from "lucide-react";

// Sample data - in a real app, this would come from an API
const moodData = [
  { day: "Mon", value: 6 },
  { day: "Tue", value: 7 },
  { day: "Wed", value: 5 },
  { day: "Thu", value: 8 },
  { day: "Fri", value: 7 },
  { day: "Sat", value: 9 },
  { day: "Sun", value: 8 },
];

const sleepData = [
  { day: "Mon", value: 7.5 },
  { day: "Tue", value: 6.8 },
  { day: "Wed", value: 8.0 },
  { day: "Thu", value: 7.2 },
  { day: "Fri", value: 6.5 },
  { day: "Sat", value: 8.5 },
  { day: "Sun", value: 7.8 },
];

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-8">
      <div className="glass glass-dark rounded-2xl p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center">
            <Smile className="mr-2" size={20} />
            Mood Tracker
          </h3>
          <span className="flex items-center text-sm bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
            <ArrowUp size={14} className="mr-1" />
            15% better
          </span>
        </div>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis domain={[0, 10]} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--background)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass glass-dark rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium flex items-center">
              <Moon className="mr-2" size={20} />
              Sleep Quality
            </h3>
            <span className="flex items-center text-sm bg-red-500/10 text-red-500 px-2 py-1 rounded-full">
              <ArrowDown size={14} className="mr-1" />
              5% less
            </span>
          </div>
          
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis domain={[0, 10]} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--background)',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass glass-dark rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-lg font-medium flex items-center mb-4">
            <Activity className="mr-2" size={20} />
            Weekly Activity
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Meditation</span>
              <div className="w-2/3 bg-secondary h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "85%" }}></div>
              </div>
              <span className="text-sm font-medium">85%</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Journaling</span>
              <div className="w-2/3 bg-secondary h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "60%" }}></div>
              </div>
              <span className="text-sm font-medium">60%</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Exercises</span>
              <div className="w-2/3 bg-secondary h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "40%" }}></div>
              </div>
              <span className="text-sm font-medium">40%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass glass-dark rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <h3 className="text-lg font-medium flex items-center mb-4">
          <Calendar className="mr-2" size={20} />
          Upcoming Sessions
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center p-3 border border-border rounded-xl hover:bg-secondary/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Calendar size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Guided Meditation</h4>
              <p className="text-sm text-muted-foreground">Tomorrow, 9:00 AM</p>
            </div>
            <button className="text-xs px-3 py-1 border border-primary text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
              Join
            </button>
          </div>
          
          <div className="flex items-center p-3 border border-border rounded-xl hover:bg-secondary/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <Calendar size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Stress Relief Workshop</h4>
              <p className="text-sm text-muted-foreground">Fri, 11:00 AM</p>
            </div>
            <button className="text-xs px-3 py-1 border border-primary text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
