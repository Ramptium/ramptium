import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/api-keys" element={<ApiKeys />} />
          <Route path="/dashboard/usage" element={<Usage />} />
          <Route path="/dashboard/logs" element={<Logs />} />
          <Route path="/dashboard/settings" element={<DashboardSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
