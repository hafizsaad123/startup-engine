import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { PricingPage } from './pages/PricingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

// Protected / App Pages
import { DashboardOverview } from './pages/DashboardOverview';
import { ValidationWizard } from './pages/ValidationWizard';
import { ReportDetailPage } from './pages/ReportDetailPage';
import { UnitEconomicsPage } from './pages/UnitEconomicsPage';
import { ComplianceHubPage } from './pages/ComplianceHubPage';
import { SettingsPage } from './pages/SettingsPage';

import { ValidationReportData } from './types';
import { SupabaseStore } from './lib/supabase';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname && window.location.pathname !== '' ? window.location.pathname : '/';
  });

  const [selectedReport, setSelectedReport] = useState<ValidationReportData | null>(null);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    try {
      window.history.pushState({}, '', path);
    } catch {
      // In sandboxed environments where pushState might fail, fallback gracefully
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If path is a report detail URL: `/dashboard/report/[id]`
  const isReportDetail = currentPath.startsWith('/dashboard/report/');
  const isDashboardRoute = currentPath.startsWith('/dashboard');

  // Load report data if viewing a report URL
  useEffect(() => {
    if (isReportDetail) {
      const reportId = currentPath.replace('/dashboard/report/', '');
      const found = SupabaseStore.getReportById(reportId);
      if (found) {
        setSelectedReport(found);
      } else {
        // Fallback to sample or first report
        const all = SupabaseStore.getReports();
        if (all.length > 0) {
          setSelectedReport(all[0]);
        }
      }
    }
  }, [currentPath, isReportDetail]);

  // Route Rendering Logic
  const renderPage = () => {
    // Protected Dashboard routes
    if (isDashboardRoute) {
      // If user is accessing dashboard but not logged in, we let them proceed as demo founder
      return (
        <DashboardLayout currentPath={currentPath} onNavigate={navigate}>
          {currentPath === '/dashboard' && (
            <DashboardOverview
              onNavigate={navigate}
              onSelectReport={(rep) => setSelectedReport(rep)}
            />
          )}

          {currentPath === '/dashboard/validate' && (
            <ValidationWizard
              onNavigate={navigate}
              onReportGenerated={(rep) => setSelectedReport(rep)}
            />
          )}

          {currentPath === '/dashboard/unit-economics' && <UnitEconomicsPage />}

          {currentPath === '/dashboard/compliance' && <ComplianceHubPage />}

          {currentPath === '/dashboard/settings' && <SettingsPage />}

          {isReportDetail && selectedReport && (
            <ReportDetailPage report={selectedReport} onNavigate={navigate} />
          )}

          {isReportDetail && !selectedReport && (
            <div className="p-12 text-center text-slate-400">
              <p>Loading Pakistani Feasibility Report...</p>
            </div>
          )}
        </DashboardLayout>
      );
    }

    // Public Routes (Wrapped in standard Navbar + Footer)
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500/20 selection:text-emerald-300">
        <Navbar currentPath={currentPath} onNavigate={navigate} />
        <div className="flex-1">
          {currentPath === '/' && <LandingPage onNavigate={navigate} />}
          {currentPath === '/about' && <AboutPage onNavigate={navigate} />}
          {currentPath === '/pricing' && <PricingPage onNavigate={navigate} />}
          {currentPath === '/login' && <LoginPage onNavigate={navigate} />}
          {currentPath === '/signup' && <SignupPage onNavigate={navigate} />}
          {(currentPath === '/forgot-password' || currentPath === '/reset-password') && <ForgotPasswordPage onNavigate={navigate} />}
        </div>
        <Footer onNavigate={navigate} />
      </div>
    );
  };

  return <>{renderPage()}</>;
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
