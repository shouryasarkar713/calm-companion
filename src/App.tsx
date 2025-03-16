
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ChatPage from "./pages/ChatPage";
import DashboardPage from "./pages/DashboardPage";
import JournalPage from "./pages/JournalPage";
import ExercisesPage from "./pages/ExercisesPage";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import HomepageLayout from "./components/layout/HomepageLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chat" element={
            <AppLayout>
              <ChatPage />
            </AppLayout>
          } />
          <Route path="/dashboard" element={
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          } />
          <Route path="/journal" element={
            <AppLayout>
              <JournalPage />
            </AppLayout>
          } />
          <Route path="/exercises" element={
            <AppLayout>
              <ExercisesPage />
            </AppLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
