
import { useEffect, useState } from "react";
import { LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { ArrowUp, ArrowDown, Activity, Calendar, Smile, Moon, Award, Sparkles, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";

// Sample data - in a real app, this would come from an API
const moodData = [
  { day: "Mon", value: 6, anxiety: 3 },
  { day: "Tue", value: 7, anxiety: 4 },
  { day: "Wed", value: 5, anxiety: 7 },
  { day: "Thu", value: 8, anxiety: 2 },
  { day: "Fri", value: 7, anxiety: 3 },
  { day: "Sat", value: 9, anxiety: 1 },
  { day: "Sun", value: 8, anxiety: 2 },
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

const gratitudeData = [
  "Having supportive friends who listen",
  "The beautiful weather today",
  "Making progress on my mental health journey",
];

type WidgetProps = {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  collapsible?: boolean;
};

const Widget = ({ title, children, icon, collapsible = false }: WidgetProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="glass glass-dark rounded-2xl p-6 animate-fade-in transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </h3>
        {collapsible && (
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        )}
      </div>
      
      <div className={`transition-all duration-300 ${isCollapsed ? 'h-0 overflow-hidden opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [recommendedExercise, setRecommendedExercise] = useState("Deep Breathing");
  const [widgets, setWidgets] = useState([
    { id: "mood", order: 1 },
    { id: "sleep", order: 2 },
    { id: "activity", order: 3 },
    { id: "gratitude", order: 4 },
    { id: "upcoming", order: 5 }
  ]);

  useEffect(() => {
    setMounted(true);
    
    // Simulate detecting user patterns
    const highAnxietyDays = moodData.filter(day => day.anxiety > 5).length;
    if (highAnxietyDays >= 2) {
      setRecommendedExercise("Mindfulness Meditation");
    } else if (sleepData.some(day => day.value < 7)) {
      setRecommendedExercise("Evening Wind Down");
    }
  }, []);

  if (!mounted) return null;

  // Allow reordering widgets
  const moveWidgetUp = (id: string) => {
    setWidgets(prev => {
      const newWidgets = [...prev];
      const index = newWidgets.findIndex(w => w.id === id);
      if (index > 0) {
        const temp = newWidgets[index].order;
        newWidgets[index].order = newWidgets[index - 1].order;
        newWidgets[index - 1].order = temp;
      }
      return newWidgets.sort((a, b) => a.order - b.order);
    });
  };

  return (
    <div className="space-y-8">
      {/* Today's Recommendation */}
      <div className="glass glass-dark rounded-2xl p-6 animate-fade-in border-l-4 border-primary">
        <div className="flex items-center">
          <div className="bg-primary/10 p-3 rounded-full mr-4">
            <Sparkles className="text-primary" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-1">Today's Recommendation</h3>
            <p className="text-muted-foreground">Based on your patterns, try a {recommendedExercise} session today</p>
          </div>
          <button className="rounded-full bg-primary/10 text-primary px-4 py-2 flex items-center hover:bg-primary hover:text-primary-foreground transition-colors">
            Try Now <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Mood Tracker */}
      <Widget title="Mood & Emotions" icon={<Smile className="mr-2" size={20} />}>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={moodData}>
              <defs>
                <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="anxietyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff9500" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ff9500" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#moodGradient)"
                strokeWidth={2}
                name="Mood"
                activeDot={{ r: 6 }}
                animationDuration={1500}
              />
              <Area
                type="monotone"
                dataKey="anxiety"
                stroke="#ff9500"
                fillOpacity={1}
                fill="url(#anxietyGradient)"
                strokeWidth={2}
                name="Anxiety"
                activeDot={{ r: 6 }}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between mt-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary mr-1"></div>
            <span>Mood</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
            <span>Anxiety</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-foreground">Weekly Average: 7.1/10</span>
            <ArrowUp size={14} className="ml-1 text-green-500" />
          </div>
        </div>
      </Widget>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sleep Quality */}
        <Widget title="Sleep Quality" icon={<Moon className="mr-2" size={20} />} collapsible>
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
          <div className="mt-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Weekly average</span>
              <span className="font-medium">7.5 hours</span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Tip: Try to maintain a consistent sleep schedule, even on weekends
            </div>
          </div>
        </Widget>
        
        {/* Weekly Activity */}
        <Widget title="Weekly Activity" icon={<Activity className="mr-2" size={20} />} collapsible>
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
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Last activity</span>
              <span className="text-sm font-medium">Deep Breathing, 2 days ago</span>
            </div>
          </div>
        </Widget>
      </div>
      
      {/* Gratitude Journal */}
      <Widget title="Daily Gratitude" icon={<Award className="mr-2" size={20} />} collapsible>
        <div className="space-y-4">
          <div className="bg-secondary/30 rounded-xl p-4">
            <h4 className="text-base font-medium mb-2">What are you grateful for today?</h4>
            <textarea 
              className="w-full bg-background/50 border border-border rounded-lg p-3 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Write something you're grateful for..."
            ></textarea>
            <button className="mt-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Save
            </button>
          </div>
          
          <div>
            <h4 className="text-base font-medium mb-2">Recent gratitude entries</h4>
            <ul className="space-y-2">
              {gratitudeData.map((entry, index) => (
                <li key={index} className="bg-secondary/20 p-3 rounded-lg">
                  {entry}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Widget>
      
      {/* Upcoming Sessions */}
      <Widget title="Upcoming Sessions" icon={<Calendar className="mr-2" size={20} />}>
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
      </Widget>
    </div>
  );
};

export default Dashboard;
