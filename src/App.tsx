import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesIndexPage } from './pages/ServicesIndexPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProjectsIndexPage } from './pages/ProjectsIndexPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Demos
import { PowerAppsDemo } from './demos/powerapps/PowerAppsDemo';
import { ServiceNowDemo } from './demos/servicenow/ServiceNowDemo';
import { AiAgentDemo } from './demos/ai-agent/AiAgentDemo';
import { DataEngineeringDemo } from './demos/data-engineering/DataEngineeringDemo';
import { FullStackDemo } from './demos/fullstack/FullStackDemo';
import { FrontendDashboardDemo } from './demos/frontend/FrontendDashboardDemo';

// Scroll to top helper on route transition
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Website Layout with Navbar & Footer
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        
        {/* Live Standalone Demonstrations (Rendered in custom enterprise app shells) */}
        <Route path="/demo/powerapps-crm" element={<PowerAppsDemo />} />
        <Route path="/demo/servicenow" element={<ServiceNowDemo />} />
        <Route path="/demo/ai-agent" element={<AiAgentDemo />} />
        <Route path="/demo/data-engineering" element={<DataEngineeringDemo />} />
        <Route path="/demo/fullstack" element={<FullStackDemo />} />
        <Route path="/demo/frontend" element={<FrontendDashboardDemo />} />

        {/* Standard Website Pages with Navigation & Footer */}
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
        
        {/* Services */}
        <Route path="/services" element={<MainLayout><ServicesIndexPage /></MainLayout>} />
        <Route path="/services/:slug" element={<MainLayout><ServiceDetailPage /></MainLayout>} />
        
        {/* Projects / Case Studies */}
        <Route path="/projects" element={<MainLayout><ProjectsIndexPage /></MainLayout>} />
        <Route path="/projects/:slug" element={<MainLayout><ProjectDetailPage /></MainLayout>} />

        {/* Inquiries & Legal */}
        <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
        <Route path="/privacy" element={<MainLayout><PrivacyPage /></MainLayout>} />
        <Route path="/terms" element={<MainLayout><TermsPage /></MainLayout>} />

        {/* 404 Route */}
        <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
