import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Presenters from './pages/Presenters';
import NewPricing from './pages/NewPricing';
import Compare from './pages/Compare';
import Generate from './pages/Generate';
import NewStudio from './pages/NewStudio';
import Concierge from './pages/Concierge';
import StudioRecord from './pages/StudioRecord';
import StudioTwin from './pages/StudioTwin';
import Enhance from './pages/Enhance';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import MyReels from './pages/MyReels';
import Billing from './pages/Billing';
import DashboardSettings from './pages/DashboardSettings';
import SalesRepPortal from './pages/SalesRepPortal';
import BrandVoiceAdvisor from './pages/BrandVoiceAdvisor';
import HookGenerator from './pages/HookGenerator';
import LensFlowAssistant from './pages/LensFlowAssistant';
import VideoHookAdvisor from './pages/VideoHookAdvisor';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/presenters" element={<Presenters />} />
      <Route path="/pricing" element={<NewPricing />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/generate" element={<Generate />} />
      <Route path="/studio" element={<NewStudio />} />
      <Route path="/studio/record" element={<StudioRecord />} />
      <Route path="/studio/twin" element={<StudioTwin />} />
      <Route path="/enhance" element={<Enhance />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/reels" element={<MyReels />} />
        <Route path="/dashboard/billing" element={<Billing />} />
        <Route path="/dashboard/settings" element={<DashboardSettings />} />
      </Route>
      <Route path="/concierge" element={<Concierge />} />
      <Route path="/sales-rep-portal" element={<SalesRepPortal />} />
      <Route path="/brand-voice" element={<BrandVoiceAdvisor />} />
      <Route path="/hook-generator" element={<HookGenerator />} />
      <Route path="/assistant" element={<LensFlowAssistant />} />
      <Route path="/video-hooks" element={<VideoHookAdvisor />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App