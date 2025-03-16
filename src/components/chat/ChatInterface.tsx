
import React, { useState, useRef, useEffect } from "react";
import { Send, Loader, Mic, Volume2, VolumeX, Image, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type MessageType = "text" | "suggestion" | "exercise" | "image";
type EmotionTone = "neutral" | "positive" | "negative" | "anxious" | "calm";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  type?: MessageType;
  emotionTone?: EmotionTone;
  imageUrl?: string;
};

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hi there, I'm your mental health assistant. How are you feeling today?",
    isUser: false,
    type: "text",
    emotionTone: "neutral"
  },
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionTone>("neutral");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Detect emotion based on input text - simple implementation
  const detectEmotion = (text: string): EmotionTone => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes("happy") || lowerText.includes("great") || lowerText.includes("good")) {
      return "positive";
    } else if (lowerText.includes("sad") || lowerText.includes("depressed") || lowerText.includes("unhappy")) {
      return "negative";
    } else if (lowerText.includes("anxious") || lowerText.includes("stressed") || lowerText.includes("worried")) {
      return "anxious";
    } else if (lowerText.includes("calm") || lowerText.includes("relaxed") || lowerText.includes("peaceful")) {
      return "calm";
    }
    
    return "neutral";
  };

  // Speech recognition functionality
  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      // In a real app, we would integrate with the Web Speech API here
      // For demo purposes, we'll simulate voice input after a delay
      setTimeout(() => {
        setInput("I'm feeling a bit anxious today");
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  // Text-to-speech functionality
  const speakMessage = (message: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(!isSpeaking);
      
      if (!isSpeaking) {
        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
      } else {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const detectedEmotion = detectEmotion(input);
    setCurrentEmotion(detectedEmotion);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      type: "text",
      emotionTone: detectedEmotion
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response based on detected emotion
    setTimeout(() => {
      let aiResponse: Message;
      
      if (detectedEmotion === "anxious") {
        aiResponse = {
          id: Date.now().toString(),
          content: "I notice you're feeling anxious. Would you like to try a quick breathing exercise to help calm your mind?",
          isUser: false,
          type: "suggestion",
          emotionTone: "calm"
        };
      } else if (detectedEmotion === "negative") {
        aiResponse = {
          id: Date.now().toString(),
          content: "I'm sorry you're feeling down. Sometimes writing about your feelings can help. Would you like to open the journal?",
          isUser: false,
          type: "suggestion",
          emotionTone: "neutral"
        };
      } else {
        const responses = [
          "I understand how you're feeling. What's been on your mind lately?",
          "That's completely valid. Would you like to explore some coping strategies?",
          "I hear you. Remember that it's okay to have these feelings.",
          "Thank you for sharing. Would you like to try a quick mindfulness exercise?",
          "I'm here to support you. Let's work through this together."
        ];
        
        aiResponse = {
          id: Date.now().toString(),
          content: responses[Math.floor(Math.random() * responses.length)],
          isUser: false,
          type: "text",
          emotionTone: "neutral"
        };
      }
      
      setMessages((prev) => [...prev, aiResponse]);
      
      // For anxious users, also suggest a breathing exercise after a short delay
      if (detectedEmotion === "anxious") {
        setTimeout(() => {
          const exerciseSuggestion: Message = {
            id: Date.now().toString(),
            content: "Try this breathing exercise: Breathe in for 4 counts, hold for 2, exhale for 6. This helps activate your parasympathetic nervous system.",
            isUser: false,
            type: "exercise",
            emotionTone: "calm",
            imageUrl: "/placeholder.svg" // In a real app, this would be a GIF or image showing the exercise
          };
          
          setMessages((prev) => [...prev, exerciseSuggestion]);
        }, 1000);
      }
      
      setIsLoading(false);
    }, 1500);
  };

  // Get appropriate bubble style based on message type and emotion
  const getBubbleStyle = (message: Message) => {
    const baseStyles = message.isUser ? "chat-bubble-user" : "chat-bubble-ai";
    
    // Add emotion-based styling
    if (!message.isUser) {
      if (message.type === "suggestion") {
        return cn(baseStyles, "bg-primary/20 border border-primary/30");
      } else if (message.type === "exercise") {
        return cn(baseStyles, "bg-green-500/20 border border-green-500/30 dark:bg-green-500/10");
      } else {
        return baseStyles;
      }
    }
    
    // Add emotion-based styling for user messages
    if (message.emotionTone === "positive") {
      return cn(baseStyles, "bg-green-500 dark:bg-green-600");
    } else if (message.emotionTone === "negative") {
      return cn(baseStyles, "bg-blue-500 dark:bg-blue-600");
    } else if (message.emotionTone === "anxious") {
      return cn(baseStyles, "bg-amber-500 dark:bg-amber-600");
    } else if (message.emotionTone === "calm") {
      return cn(baseStyles, "bg-indigo-500 dark:bg-indigo-600");
    }
    
    return baseStyles;
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
              <div className={getBubbleStyle(message)}>
                {message.content}
                
                {message.imageUrl && (
                  <div className="mt-2">
                    <img src={message.imageUrl} alt="Exercise visualization" className="rounded-lg max-w-full h-auto" />
                  </div>
                )}
                
                {!message.isUser && (
                  <div className="flex items-center justify-end mt-2 space-x-2">
                    <button 
                      onClick={() => speakMessage(message.content)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={isSpeaking ? "Stop speaking" : "Read message aloud"}
                    >
                      {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>
                )}
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
        <button
          type="button"
          onClick={toggleListening}
          className={cn(
            "rounded-full p-2 transition-all",
            isListening
              ? "bg-primary text-primary-foreground animate-pulse"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
          )}
          aria-label={isListening ? "Stop voice input" : "Start voice input"}
        >
          <Mic size={20} />
        </button>
        
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
