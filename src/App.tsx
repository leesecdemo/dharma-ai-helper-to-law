
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicRegister from "./pages/public/Register";
import CaseDiscussion from "./pages/case-discussion";

// Authentication Pages
import PoliceLogin from "./pages/police/Login";
import LawyerLogin from "./pages/lawyer/Login";
import JudgeLogin from "./pages/judge/Login";
import AdminLogin from "./pages/admin/Login";

// Dashboard Pages
import PoliceDashboard from "./pages/police/Dashboard";
import LawyerDashboard from "./pages/lawyer/Dashboard";
import JudgeDashboard from "./pages/judge/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import PublicDashboard from "./pages/public/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Public User Routes */}
            <Route path="/public/register" element={<PublicRegister />} />
            <Route path="/public/dashboard" element={<PublicDashboard />} />
            <Route path="/public/case/:caseId" element={<CaseDiscussion />} />
            
            {/* Police Routes */}
            <Route path="/police/login" element={<PoliceLogin />} />
            <Route path="/police/dashboard" element={<PoliceDashboard />} />
            <Route path="/police/case/:caseId" element={<CaseDiscussion />} />
            
            {/* Lawyer Routes */}
            <Route path="/lawyer/login" element={<LawyerLogin />} />
            <Route path="/lawyer/dashboard" element={<LawyerDashboard />} />
            <Route path="/lawyer/case/:caseId" element={<CaseDiscussion />} />
            
            {/* Judge Routes */}
            <Route path="/judge/login" element={<JudgeLogin />} />
            <Route path="/judge/dashboard" element={<JudgeDashboard />} />
            <Route path="/judge/case/:caseId" element={<CaseDiscussion />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/case/:caseId" element={<CaseDiscussion />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
