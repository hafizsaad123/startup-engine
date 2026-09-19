import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Zap, TrendingUp, AlertTriangle, ArrowRight, CheckCircle2, Building, Scale, BookOpen } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <span>Our Ground-Truth Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Empowering Native Pakistani Builders With Real Ground Context
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          For years, Pakistani entrepreneurs relied on advice formulated for San Francisco or London: Stripe auto-billings, 90% credit card penetration, frictionless Delaware incorporation, and $20 Facebook ad CPMs. When applied in Karachi or Lahore, those assumptions lead straight to insolvency.
        </p>
      </div>

      {/* The 3 Fatal Traps in Pakistan */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center">
          The 3 Fatal Traps That Drown Pakistani Startups
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-200">The Cash-on-Delivery (COD) Float Abyss</h3>
            <p className="text-slate-400 leading-relaxed">
              70%+ of retail e-commerce in Pakistan is Cash-on-Delivery. Couriers like Trax, CallCourier, or Leopards take 7 to 14 days to reconcile and return cash to your bank. If your monthly orders spike, you run out of working capital before courier remittances arrive.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-200">The 18-25% RTO Deadweight Loss</h3>
            <p className="text-slate-400 leading-relaxed">
              Customers order on impulse and reject packages at the door when riders arrive. You still pay full forward freight (PKR 220) plus return freight (PKR 120), turning an apparent 30% gross margin into a net cash loss per sale.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-200">The Provincial Tax & SECP Labyrinth</h3>
            <p className="text-slate-400 leading-relaxed">
              Founders start as unregistered Sole Proprietorships, get hit with unexpected 16% PRA or 13% SRB provincial sales tax withholding, and realize institutional investors like Indus Valley or Sarmayacar cannot invest in an un-audited, un-incorporated entity.
            </p>
          </div>
        </div>
      </div>

      {/* Post-Mortem Learnings */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4 text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <BookOpen className="w-4 h-4" />
          <span>Learnings from Pakistani Startup Post-Mortems (Airlift, Jugnu, etc.)</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          The 2021-2022 funding boom proved that hyper-growth fueled by heavy discounting and warehouse burn collapses when foreign capital tightens. Enduring Pakistani businesses—from D2C brands in Lahore to B2B software agencies in Karachi—win on cash flow discipline, WhatsApp low-friction engagement, and razor-sharp unit economics in PKR.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-8 border-t border-slate-900">
        <h3 className="text-lg font-bold text-white mb-2">Test Your Concept with Ground Truth</h3>
        <p className="text-xs text-slate-400 mb-5">Join hundreds of founders validating ideas before spending hard-earned rupees.</p>
        <button
          onClick={() => onNavigate('/dashboard/validate')}
          className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all inline-flex items-center gap-2"
        >
          <span>Start Validation Wizard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
