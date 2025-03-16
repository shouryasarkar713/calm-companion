
import { useState, useEffect } from "react";
import { Calendar, Save, Plus, Trash2, Mic, Volume2, Tag, BookOpen, Download, Smile, Frown, Clock } from "lucide-react";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  tags?: string[];
  mood?: string;
}

// Sample journal prompts
const journalPrompts = [
  "What made you smile today?",
  "What's one challenge you faced today and how did you handle it?",
  "Write about something you're looking forward to",
  "How did you practice self-care today?",
  "What's one thing you're grateful for right now?",
  "What emotions have you experienced today?",
  "Describe a moment when you felt at peace recently",
  "What would you like to focus on improving tomorrow?",
  "What's something that's been worrying you lately?",
  "Write a letter to your future self"
];

const moodOptions = [
  { value: "happy", label: "Happy", icon: <Smile size={18} className="text-green-500" /> },
  { value: "calm", label: "Calm", icon: <Smile size={18} className="text-blue-500" /> },
  { value: "anxious", label: "Anxious", icon: <Frown size={18} className="text-amber-500" /> },
  { value: "sad", label: "Sad", icon: <Frown size={18} className="text-indigo-500" /> },
  { value: "angry", label: "Angry", icon: <Frown size={18} className="text-red-500" /> }
];

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      title: "Today was challenging",
      content: "I had a difficult meeting at work, but I practiced deep breathing and got through it.",
      date: "2023-08-15",
      tags: ["work", "anxiety"],
      mood: "anxious"
    },
    {
      id: "2",
      title: "Progress with meditation",
      content: "I've been meditating for a week now, and I'm starting to feel more centered throughout the day.",
      date: "2023-08-12",
      tags: ["meditation", "progress"],
      mood: "calm"
    },
  ]);
  
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [mood, setMood] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [journalPrompt, setJournalPrompt] = useState("");
  const [fontFamily, setFontFamily] = useState("sans");
  
  useEffect(() => {
    // Get a random journal prompt
    const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    setJournalPrompt(randomPrompt);
  }, []);
  
  const handleNewEntry = () => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: "New Entry",
      content: "",
      date: new Date().toISOString().slice(0, 10),
      tags: [],
    };
    
    setEntries([newEntry, ...entries]);
    setActiveEntry(newEntry);
    setTitle(newEntry.title);
    setContent(newEntry.content);
    setTags(newEntry.tags || []);
    setMood(newEntry.mood || "");
  };
  
  const handleSave = () => {
    if (!activeEntry) return;
    
    const updatedEntries = entries.map((entry) =>
      entry.id === activeEntry.id
        ? { ...entry, title, content, tags, mood }
        : entry
    );
    
    setEntries(updatedEntries);
    setActiveEntry({ ...activeEntry, title, content, tags, mood });
  };
  
  const handleDelete = (id: string) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    
    if (activeEntry && activeEntry.id === id) {
      setActiveEntry(null);
      setTitle("");
      setContent("");
      setTags([]);
      setMood("");
    }
  };
  
  const handleTagAdd = () => {
    if (newTag.trim() !== "" && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    
    // In a real app, we would integrate with the Web Speech API here
    // For demo purposes, we'll simulate voice input after a delay
    if (!isRecording) {
      setTimeout(() => {
        setContent(prev => prev + "\n\nToday I've been feeling much better after implementing some of the breathing techniques. I find myself more centered and less reactive to stress triggers.");
        setIsRecording(false);
      }, 3000);
    }
  };
  
  const exportJournal = () => {
    // In a real app, we would implement an export function here
    // For demo purposes, we'll just show an alert
    alert("Your journal entries have been exported!");
  };
  
  const getMoodIcon = (moodValue: string) => {
    const option = moodOptions.find(o => o.value === moodValue);
    return option ? option.icon : null;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Journal</h2>
          <div className="flex gap-2">
            <button 
              onClick={exportJournal}
              className="glass glass-dark p-2 rounded-full hover:bg-secondary/50 transition-all"
              title="Export journal"
            >
              <Download size={18} />
            </button>
            <button 
              onClick={handleNewEntry}
              className="glass glass-dark p-2 rounded-full hover:bg-secondary/50 transition-all"
              title="New entry"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
        
        <div className="space-y-3 max-h-[calc(100vh-15rem)] overflow-y-auto pr-2 scrollbar-thin">
          {entries.map((entry) => (
            <div 
              key={entry.id}
              onClick={() => {
                setActiveEntry(entry);
                setTitle(entry.title);
                setContent(entry.content);
                setTags(entry.tags || []);
                setMood(entry.mood || "");
              }}
              className={`journal-card cursor-pointer ${
                activeEntry?.id === entry.id ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium mb-1 truncate">{entry.title}</h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(entry.id);
                  }}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {entry.content}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar size={12} className="mr-1" />
                  {entry.date}
                </div>
                {entry.mood && (
                  <div className="flex items-center">
                    {getMoodIcon(entry.mood)}
                  </div>
                )}
              </div>
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {entry.tags.map(tag => (
                    <span key={tag} className="text-xs bg-secondary/50 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="md:w-2/3 glass glass-dark rounded-2xl p-6">
        {activeEntry ? (
          <>
            <div className="flex justify-between mb-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full bg-transparent border-b border-border pb-2 text-xl font-medium focus:outline-none focus:border-primary transition-colors"
              />
              
              <div className="flex gap-2 ml-4">
                <select 
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="bg-secondary/30 border border-border rounded px-2 text-sm"
                >
                  <option value="sans">Sans-serif</option>
                  <option value="serif">Serif</option>
                  <option value="mono">Monospace</option>
                  <option value="handwriting">Handwriting</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center bg-secondary/30 px-3 py-1 rounded-full">
                <Clock size={14} className="mr-1 text-muted-foreground" />
                <span className="text-xs">{new Date(activeEntry.date).toLocaleDateString()}</span>
              </div>
              
              {tags.map(tag => (
                <div key={tag} className="flex items-center bg-secondary/30 px-3 py-1 rounded-full">
                  <span className="text-xs">{tag}</span>
                  <button 
                    onClick={() => handleTagRemove(tag)}
                    className="ml-1 text-muted-foreground hover:text-destructive"
                  >
                    &times;
                  </button>
                </div>
              ))}
              
              <div className="flex items-center">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTagAdd()}
                  placeholder="Add tag..."
                  className="text-xs bg-secondary/30 px-3 py-1 rounded-full focus:outline-none focus:ring-1 focus:ring-primary/50 w-24"
                />
                {newTag && (
                  <button 
                    onClick={handleTagAdd}
                    className="ml-1 text-primary hover:text-primary/80"
                  >
                    +
                  </button>
                )}
              </div>
              
              <div className="flex-1"></div>
              
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="bg-secondary/30 border border-border rounded px-2 py-1 text-sm"
              >
                <option value="">Select mood...</option>
                {moodOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-start">
                <BookOpen size={16} className="mr-2 text-primary mt-1" />
                <div>
                  <p className="text-sm font-medium text-primary">Today's Prompt</p>
                  <p className="text-sm">{journalPrompt}</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your thoughts..."
                className={`w-full h-[calc(100vh-32rem)] bg-transparent resize-none focus:outline-none p-2 border border-transparent focus:border-primary/20 rounded-lg transition-all ${
                  fontFamily === 'handwriting' ? 'font-handwriting' : 
                  fontFamily === 'serif' ? 'font-serif' : 
                  fontFamily === 'mono' ? 'font-mono' : 'font-sans'
                }`}
              />
              
              <button
                onClick={toggleVoiceRecording}
                className={`absolute bottom-3 right-3 p-2 rounded-full transition-all ${
                  isRecording ? 'bg-primary text-primary-foreground animate-pulse' : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                }`}
                title={isRecording ? "Stop recording" : "Start voice recording"}
              >
                <Mic size={18} />
              </button>
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
                className="flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-full transition-colors hover:bg-primary/90"
              >
                <Save size={16} className="mr-2" />
                Save
              </button>
            </div>
          </>
        ) : (
          <div className="h-[calc(100vh-22rem)] flex flex-col items-center justify-center text-muted-foreground">
            <div className="p-4 rounded-full bg-secondary/30 mb-4">
              <Plus size={24} />
            </div>
            <p>Select an entry or create a new one</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;
