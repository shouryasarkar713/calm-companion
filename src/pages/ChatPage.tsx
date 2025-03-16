
import AppLayout from "../components/layout/AppLayout";
import ChatInterface from "../components/chat/ChatInterface";

const ChatPage = () => {
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">AI Assistant</h1>
      <ChatInterface />
    </AppLayout>
  );
};

export default ChatPage;
