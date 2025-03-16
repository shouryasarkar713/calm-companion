
import React, { useState, useRef, useEffect } from "react";
import { Send, Loader } from "lucide-react";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
};

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hi there, I'm your mental health assistant. How are you feeling today?",
    isUser: false,
  },
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand how you're feeling. What's been on your mind lately?",
        "That's completely valid. Would you like to explore some coping strategies?",
        "I hear you. Remember that it's okay to have these feelings.",
        "Thank you for sharing. Would you like to try a quick breathing exercise?",
        "I'm here to support you. Let's work through this together."
      ];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] glass glass-dark rounded-2xl overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div className={message.isUser ? "chat-bubble-user" : "chat-bubble-ai"}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="chat-bubble-ai">
                <Loader size={20} className="animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSend} className="border-t border-border/50 p-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-background border border-border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-primary text-primary-foreground rounded-full p-2 transition-all hover:bg-primary/90 disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
