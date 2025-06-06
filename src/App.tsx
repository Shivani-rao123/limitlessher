// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import AiAssistant from "./pages/AiAssistant";
import Scholarships from "./pages/Scholarships";
import Careers from "./pages/Careers";
import SuccessStories from "./pages/SuccessStories";
import Events from "./pages/Events";
import Hackathon from "./pages/Hackathon";
import Opportunities from "./pages/opportunities";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-assistant" element={<AiAssistant />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/events" element={<Events />} />
          <Route path="/hackathons" element={<Hackathon />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
