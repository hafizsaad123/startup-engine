import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageToggle } from '../common/LanguageToggle';
import {
  LayoutDashboard,
  Sparkles,
  Calculator,
  Scale,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface DashboardLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ currentPath, onNavigate, children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    onNavigate('/login');
  };

  const navItems = [
    {
      label: t('nav.dashboard', 'Overview', 'Overview'),
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: t('nav.validate', 'New AI Validation', 'Naya Idea Validate Karein'),
      path: '/dashboard/validate',
      icon: Sparkles,
      highlight: true,
    },
    {
      label: 'Unit Economics (P&L)',
      path: '/dashboard/unit-economics',
      icon: Calculator,
    },
    {
      label: 'SECP & FBR Compliance',
      path: '/dashboard/compliance',
      icon: Scale,
    },
    {
      label: 'Settings & Billing',
      path: '/dashboard/settings',
      icon: Settings,
    },
  ];

  const getTierBadge = () => {
    switch (user?.subscription_tier) {
      case 'investor_ready':
        return { label: 'Investor Ready', bg: 'bg-indigo-950 text-indigo-300 border-indigo-500/40' };
      case 'founder_pro':
        return { label: 'Founder Pro', bg: 'bg-emerald-950 text-emerald-300 border-emerald-500/40' };
      default:
        return { label: 'Freemium', bg: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  const badge = getTierBadge();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between border-b border-slate-800/80 bg-slate-950/90 px-4 py-3 sticky top-0 z-40">
        <div 
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-bold">
            <Zap className="h-4 w-4 fill-current" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white">STARTUP ENGINE PK</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle variant="header" />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-800/80 bg-slate-950/95 p-4 flex flex-col justify-between transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Logo */}
          <div 
            onClick={() => { onNavigate('/'); setSidebarOpen(false); }}
            className="flex items-center gap-3 px-2 cursor-pointer group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-slate-950 font-bold shadow-md shadow-emerald-900/30">
              <Zap className="h-5 w-5 fill-current text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-white">STARTUP ENGINE</span>
                <span className="text-xs font-bold text-emerald-400">PK</span>
              </div>
              <p className="text-[10px] text-slate-400">Pakistani Ecosystem Platform</p>
            </div>
          </div>

          {/* Founder Profile Card */}
          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-200 truncate">{user?.full_name || 'Saad Ahmed'}</p>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-md border font-medium ${badge.bg}`}>
                {badge.label}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate mt-0.5">{user?.company_name || 'Pakistani Venture'}</p>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/60">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Local Stack Sync
              </span>
              <span>{user?.city || 'Lahore'}</span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : item.highlight
                      ? 'bg-emerald-500/5 text-slate-200 hover:bg-emerald-500/10 border border-emerald-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : item.highlight ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && !isActive && (
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Info & Actions */}
        <div className="space-y-3 pt-4 border-t border-slate-900">
          <div className="p-3 rounded-xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 text-[11px] space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Pakistani VC Alignment</span>
            </div>
            <p className="text-slate-400 leading-tight">
              Reports calibrated to Indus Valley Capital, Sarmayacar, & Fatima Gobi parameters.
            </p>
            <button
              onClick={() => { onNavigate('/dashboard/validate'); setSidebarOpen(false); }}
              className="w-full mt-1 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 text-center font-medium flex items-center justify-center gap-1 text-[10px]"
            >
              Run Local Assessment
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-slate-200 transition-colors"
            >
              Public Home
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 hover:text-rose-400 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar for desktop */}
        <div className="hidden md:flex items-center justify-between h-16 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold text-slate-200">
              {currentPath === '/dashboard' && 'Founder Command Center'}
              {currentPath === '/dashboard/validate' && 'AI Idea Validation Wizard (Module 1)'}
              {currentPath === '/dashboard/unit-economics' && 'Localized Unit Economics & Financial Planner (Module 3)'}
              {currentPath === '/dashboard/compliance' && 'SECP & FBR Compliance Engine (Module 4)'}
              {currentPath === '/dashboard/settings' && 'Account Settings & Local Billing'}
              {currentPath.startsWith('/dashboard/report/') && 'Comprehensive Pakistani Feasibility Report'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <LanguageToggle variant="header" />
            
            {currentPath !== '/dashboard/validate' && (
              <button
                id="btn-quick-validate"
                onClick={() => onNavigate('/dashboard/validate')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-semibold text-xs transition-all shadow-sm shadow-emerald-950"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>+ Validate Idea</span>
              </button>
            )}

            <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
              <div className="h-7 w-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-emerald-400">
                {user?.full_name?.charAt(0) || 'P'}
              </div>
              <span className="text-xs text-slate-300 font-medium">{user?.full_name?.split(' ')[0] || 'Founder'}</span>
            </div>
          </div>
        </div>

        {/* Child Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
