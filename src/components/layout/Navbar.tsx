import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageToggle } from '../common/LanguageToggle';
import { Zap, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav('/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-md shadow-emerald-900/30 ring-1 ring-emerald-400/20 group-hover:scale-105 transition-transform">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight text-white font-sans">
                STARTUP ENGINE <span className="text-emerald-400">PK</span>
              </span>
              <span className="rounded-full bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                100% NATIVE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-none">Pakistan Startup Validator & Ecosystem</p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
          <button
            id="nav-home-btn"
            onClick={() => handleNav('/')}
            className={`px-3 py-2 rounded-lg transition-colors ${currentPath === '/' ? 'text-emerald-400 bg-slate-900/60' : 'hover:text-white hover:bg-slate-900/40'}`}
          >
            {t('nav.home', 'Home', 'Home')}
          </button>
          <button
            id="nav-about-btn"
            onClick={() => handleNav('/about')}
            className={`px-3 py-2 rounded-lg transition-colors ${currentPath === '/about' ? 'text-emerald-400 bg-slate-900/60' : 'hover:text-white hover:bg-slate-900/40'}`}
          >
            {t('nav.about', 'Why Pakistan?', 'Kyun Pakistan?')}
          </button>
          <button
            id="nav-pricing-btn"
            onClick={() => handleNav('/pricing')}
            className={`px-3 py-2 rounded-lg transition-colors ${currentPath === '/pricing' ? 'text-emerald-400 bg-slate-900/60' : 'hover:text-white hover:bg-slate-900/40'}`}
          >
            {t('nav.pricing', 'PKR Pricing', 'PKR Qeemat')}
          </button>
          {isAuthenticated && (
            <button
              id="nav-dashboard-link"
              onClick={() => handleNav('/dashboard')}
              className={`px-3 py-2 rounded-lg transition-colors ${currentPath.startsWith('/dashboard') ? 'text-emerald-400 bg-slate-900/60' : 'hover:text-white hover:bg-slate-900/40'}`}
            >
              {t('nav.dashboard', 'Dashboard', 'Dashboard')}
            </button>
          )}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle variant="header" />
          
          {isAuthenticated ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
              <button
                id="header-dashboard-cta"
                onClick={() => handleNav('/dashboard')}
                className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition-all shadow-sm"
              >
                Dashboard
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                id="header-logout-btn"
                onClick={async () => {
                  await logout();
                  handleNav('/login');
                }}
                className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="nav-login-btn"
                onClick={() => handleNav('/login')}
                className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {t('nav.login', 'Login', 'Login')}
              </button>
              <button
                id="nav-signup-cta"
                onClick={() => handleNav('/signup')}
                className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition-all shadow-sm"
              >
                {t('nav.signup', 'Get Started', 'Muft Shuru Karein')}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle variant="header" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-3">
          <button
            onClick={() => handleNav('/')}
            className="block w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900"
          >
            {t('nav.home', 'Home', 'Home')}
          </button>
          <button
            onClick={() => handleNav('/about')}
            className="block w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900"
          >
            {t('nav.about', 'Why Pakistan?', 'Kyun Pakistan?')}
          </button>
          <button
            onClick={() => handleNav('/pricing')}
            className="block w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900"
          >
            {t('nav.pricing', 'PKR Pricing', 'PKR Qeemat')}
          </button>
          {isAuthenticated ? (
            <button
              onClick={() => handleNav('/dashboard')}
              className="block w-full text-left px-3 py-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
            >
              Dashboard
            </button>
          ) : (
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => handleNav('/login')}
                className="w-full py-2.5 rounded-xl text-center text-sm font-medium border border-slate-700 text-slate-200"
              >
                Login
              </button>
              <button
                onClick={() => handleNav('/signup')}
                className="w-full py-2.5 rounded-xl text-center text-sm font-semibold bg-emerald-500 text-slate-950"
              >
                Get Started Free
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
