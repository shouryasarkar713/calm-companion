
import { useState } from "react";
import { Calendar, Save, Plus, Trash2 } from "lucide-react";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      title: "Today was challenging",
      content: "I had a difficult meeting at work, but I practiced deep breathing and got through it.",
      date: "2023-08-15",
    },
    {
      id: "2",
      title: "Progress with meditation",
      content: "I've been meditating for a week now, and I'm starting to feel more centered throughout the day.",
      date: "2023-08-12",
    },
  ]);
  
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const handleNewEntry = () => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: "New Entry",
      content: "",
      date: new Date().toISOString().slice(0, 10),
    };
    
    setEntries([newEntry, ...entries]);
    setActiveEntry(newEntry);
    setTitle(newEntry.title);
    setContent(newEntry.content);
  };
  
  const handleSave = () => {
    if (!activeEntry) return;
    
    const updatedEntries = entries.map((entry) =>
      entry.id === activeEntry.id
        ? { ...entry, title, content }
        : entry
    );
    
    setEntries(updatedEntries);
    setActiveEntry({ ...activeEntry, title, content });
  };
  
  const handleDelete = (id: string) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    
    if (activeEntry && activeEntry.id === id) {
      setActiveEntry(null);
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Journal</h2>
          <button 
            onClick={handleNewEntry}
            className="glass glass-dark p-2 rounded-full hover:bg-secondary/50 transition-all"
          >
            <Plus size={20} />
          </button>
        </div>
        
        <div className="space-y-3 max-h-[calc(100vh-15rem)] overflow-y-auto pr-2">
          {entries.map((entry) => (
            <div 
              key={entry.id}
              onClick={() => {
                setActiveEntry(entry);
                setTitle(entry.title);
                setContent(entry.content);
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
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar size={12} className="mr-1" />
                {entry.date}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="md:w-2/3 glass glass-dark rounded-2xl p-6">
        {activeEntry ? (
          <>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full bg-transparent border-b border-border pb-2 mb-4 text-xl font-medium focus:outline-none focus:border-primary transition-colors"
            />
            
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your thoughts..."
              className="w-full h-[calc(100vh-22rem)] bg-transparent resize-none focus:outline-none"
            />
            
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
