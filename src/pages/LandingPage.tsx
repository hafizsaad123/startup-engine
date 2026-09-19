import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  Package,
  Layers,
  Building,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{t('hero.badge', 'Tailored 100% for Pakistan Startup Realities', '100% Pakistani Ground Realities Par Mabni')}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          {t('hero.title_1', 'Validate Your Startup Against', 'Apne Pakistani Startup Ko')}{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            {t('hero.title_2', 'Real Pakistani Ground Realities', 'Asal Ground Realities Par Validate Karein')}
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t(
            'hero.subtitle',
            'Silicon Valley AI advice fails in Pakistan. Our engine calculates real PKR unit economics, 15-25% COD rejection loss (RTO), SECP legal entities, and matches you with Pakistani VCs like Indus Valley & Sarmayacar.',
            'Amriki AI tools Pakistan me fail ho jatay hain. Hamara engine real PKR unit economics, 15-25% Cash on Delivery (COD) nuksan, SECP tax rules, aur local Pakistani VCs ki alignment check karta hai.'
          )}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="hero-validate-btn"
            onClick={() => onNavigate(isAuthenticated ? '/dashboard/validate' : '/signup')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 group"
          >
            <span>{t('hero.cta_primary', 'Validate My Idea in 60s', '60 Seconds Me Idea Check Karein')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            id="hero-sample-btn"
            onClick={() => onNavigate('/dashboard/report/val-lahore-hyperlocal-groceries')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold text-sm hover:bg-slate-850 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <span>{t('hero.cta_secondary', 'Explore Sample Report (PKR)', 'Sample Report Dekhein')}</span>
          </button>
        </div>

        {/* Ground Realities Stat Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">70%+</span>
            <p className="text-xs text-slate-300 font-semibold mt-1">Cash-on-Delivery (COD)</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Physical retail payments requiring courier cash reconciliation.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <span className="text-2xl sm:text-3xl font-black text-teal-400 font-mono">15 - 25%</span>
            <p className="text-xs text-slate-300 font-semibold mt-1">COD RTO Rejection Loss</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Modeled into your P&L so you never run out of float.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <span className="text-2xl sm:text-3xl font-black text-indigo-400 font-mono">$0.50 - $2</span>
            <p className="text-xs text-slate-300 font-semibold mt-1">Local Meta CPMs</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Calibrated customer acquisition cost for Pakistani audiences.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">SECP / FBR</span>
            <p className="text-xs text-slate-300 font-semibold mt-1">Regulatory Mapping</p>
            <p className="text-[11px] text-slate-400 mt-0.5">SMC-Pvt Ltd, PRA, SRB, KPRA, & SBP export compliance.</p>
          </div>
        </div>
      </section>

      {/* Comparison: Why Global Tools Fail vs Startup Engine PK */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Why Silicon Valley Tools Fail Pakistani Founders
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Generic AI advisors assume credit card penetration, US SaaS margins, and frictionless Delaware C-Corps. Pakistan works differently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Global Standard (Fails) */}
          <div className="p-6 rounded-2xl bg-rose-950/10 border border-rose-900/30 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 text-sm font-bold">
              <span>✕</span>
              <span>Global Standard Tools (Ideaproof, ChatGPT Default)</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400">✕</span>
                <span><strong>Stripe / Credit Card Assumption:</strong> Assumes 90% instant online card capture. In Pakistan, online debit card penetration is &lt;3%.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">✕</span>
                <span><strong>Ignores Return-to-Origin (RTO):</strong> Zero accounting for courier return charges when customer refuses delivery at doorstep.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">✕</span>
                <span><strong>US Ad Economics:</strong> Models CAC using $20 CPMs, predicting negative margins for ideas that actually thrive on $1.20 Meta CPMs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">✕</span>
                <span><strong>Irrelevant Regulation:</strong> Quotes GDPR, US Delaware C-Corp, or IRS codes that have zero legal standing with SECP or FBR.</span>
              </li>
            </ul>
          </div>

          {/* Native Pakistani Adaptation */}
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
              <span>✓</span>
              <span>Startup Engine Pakistan (Native Ground Truth)</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span><strong>COD & Wallet Infrastructure:</strong> Analyzes Cash-on-Delivery, EasyPaisa, JazzCash, and Raast transaction clearing delays.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span><strong>Automated RTO Loss Provision:</strong> Factors Trax & CallCourier forward freight (PKR 220) and return freight (PKR 120) into net margins.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span><strong>SEC Class Demographics:</strong> Sizes markets based on SEC A/B/C population purchasing power across Karachi, Lahore, and Tier-2 clusters.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span><strong>SECP & Provincial Tax Engine:</strong> Guides SMC-Pvt Ltd incorporation, PRA/SRB 13-16% sales tax, and local VC investment theses.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4 Lifecycle Steps */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">Complete Journey</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            4 Lifecycle Steps: From Concept to Regional VC Funding
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/20">
              01
            </div>
            <h3 className="font-bold text-base text-white">VALIDATE</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Convert 3 simple inputs (in English or Roman Urdu) into a 100-Point Viability Index with PKR market sizing and local competitive moat.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 font-bold flex items-center justify-center text-sm border border-teal-500/20">
              02
            </div>
            <h3 className="font-bold text-base text-white">BUILD</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate a 30-Day Go-to-Market execution plan connecting Trax courier API, WhatsApp Commerce Bots, and localized Shopify/WooCommerce.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 font-bold flex items-center justify-center text-sm border border-indigo-500/20">
              03
            </div>
            <h3 className="font-bold text-base text-white">SCALE</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Model unit economics factoring in JazzCash gateway fees, courier return charges, and local Meta ad CPM performance.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 font-bold flex items-center justify-center text-sm border border-amber-500/20">
              04
            </div>
            <h3 className="font-bold text-base text-white">FUND</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Populate a 10-slide VC pitch deck outline calibrated against Indus Valley Capital, Sarmayacar, and Fatima Gobi investment criteria.
            </p>
          </div>
        </div>
      </section>

      {/* Target Personas Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Built for Every Pakistani Builder</h2>
            <p className="text-xs text-slate-400 mt-2">Whether you are an engineering student at FAST/LUMS or a wholesale trader in Anarkali.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-semibold text-[10px] border border-emerald-500/30">
                Youth & Students
              </span>
              <h4 className="text-sm font-bold text-slate-200">FAST, NUST, LUMS, IBA, NED</h4>
              <p className="text-slate-400 leading-relaxed">
                Launching D2C, agency, or tech ideas. Needs ultra-low cost, simple Roman Urdu UI, and WhatsApp-friendly summary cards to share with friends.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="px-2 py-0.5 rounded bg-teal-950 text-teal-400 font-semibold text-[10px] border border-teal-500/30">
                Non-Tech Domain Experts
              </span>
              <h4 className="text-sm font-bold text-slate-200">Traders, Doctors, Logisticians</h4>
              <p className="text-slate-400 leading-relaxed">
                Digitizing offline family businesses. Needs no-code guidance, SECP registration walkthroughs, and crystal-clear PKR unit economics without jargon.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 font-semibold text-[10px] border border-indigo-500/30">
                Venture Tech Founders
              </span>
              <h4 className="text-sm font-bold text-slate-200">Regional Seed Seekers</h4>
              <p className="text-slate-400 leading-relaxed">
                Builders seeking seed rounds from local VCs (Indus Valley, Sarmayacar). Needs precise TAM/SAM in PKR & USD and investor-ready data pitch decks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Pricing in PKR */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">Local Pricing</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Transparent Pricing in Pakistani Rupees (PKR)
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            No international credit card required. Pay via PayFast, JazzCash, EasyPaisa, or direct Meezan transfer with AI Slip OCR.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Freemium Tier */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Student Hustler</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white font-mono">PKR 0</span>
                <span className="text-xs text-slate-400">/ forever</span>
              </div>
              <p className="text-xs text-slate-400">Perfect for university students testing their first rough concept.</p>
              
              <ul className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>1 Full AI Validation Report</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100-Point Viability Index</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Roman Urdu summary toggle</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('/signup')}
              className="w-full py-2.5 rounded-xl border border-slate-700 text-xs font-bold text-slate-200 hover:bg-slate-800"
            >
              Start Free
            </button>
          </div>

          {/* Founder Pro Tier */}
          <div className="p-6 rounded-2xl bg-slate-900 border-2 border-emerald-500 space-y-5 flex flex-col justify-between relative shadow-xl shadow-emerald-950/40">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-emerald-500 text-slate-950 px-3 py-0.5 rounded-full uppercase tracking-wider">
              Most Popular
            </span>
            <div className="space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Founder Pro</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white font-mono">PKR 4,999</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-400">For serious builders executing D2C, B2B, or tech ventures.</p>

              <ul className="space-y-2 text-xs text-slate-200 pt-3 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span><strong>Unlimited</strong> Pakistani Validations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Interactive COD RTO Simulator</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>30-Day Trax / WhatsApp Execution Plan</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>SECP & FBR Provincial Tax Generator</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('/pricing')}
              className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400"
            >
              Upgrade via JazzCash / EasyPaisa
            </button>
          </div>

          {/* Investor Ready Tier */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Investor Ready</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white font-mono">PKR 24,999</span>
                <span className="text-xs text-slate-400">/ one-time</span>
              </div>
              <p className="text-xs text-slate-400">For founders raising seed capital from regional angel syndicates.</p>

              <ul className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>Everything in Founder Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>10-Slide VC Pitch Deck Builder</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>Indus Valley & Sarmayacar Thesis Scoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>1-on-1 Venture Analyst Audit</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('/pricing')}
              className="w-full py-2.5 rounded-xl border border-indigo-500/40 text-xs font-bold text-indigo-300 hover:bg-indigo-950/40"
            >
              Get Investor Ready
            </button>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-900/30 via-slate-900 to-indigo-950/30 border border-emerald-500/30 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to Build an Enduring Pakistani Business?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Do not waste PKR 500,000 on unvalidated ad spend or broken logistics. Validate in 60 seconds with real ground truth.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/dashboard/validate')}
              className="px-8 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Validate Your Idea Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
