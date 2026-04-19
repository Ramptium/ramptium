import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Infrastructure from "./pages/Infrastructure";
import Developers from "./pages/Developers";
import UseCases from "./pages/UseCases";
import Security from "./pages/Security";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Network from "./pages/Network";
import Status from "./pages/Status";
import ForInvestors from "./pages/ForInvestors";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ApiKeys from "./pages/dashboard/ApiKeys";
import Usage from "./pages/dashboard/Usage";
import Logs from "./pages/dashboard/Logs";
import DashboardSettings from "./pages/dashboard/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/developers" element={<Developers />} />
            {/* Backwards-compat: old /docs links */}
            <Route path="/docs" element={<Navigate to="/developers" replace />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/security" element={<Security />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/network" element={<Network />} />
            <Route path="/status" element={<Status />} />
            <Route path="/for-investors" element={<ForInvestors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/api-keys" element={<ProtectedRoute><ApiKeys /></ProtectedRoute>} />
            <Route path="/dashboard/usage" element={<ProtectedRoute><Usage /></ProtectedRoute>} />
            <Route path="/dashboard/logs" element={<ProtectedRoute><Logs /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><DashboardSettings /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
