import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { SlipUploadModal } from '../components/reports/SlipUploadModal';
import { CheckCircle2, ShieldCheck, Zap, Sparkles, CreditCard, ArrowRight } from 'lucide-react';

interface PricingPageProps {
  onNavigate: (path: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [targetTier, setTargetTier] = useState<'founder_pro' | 'investor_ready'>('founder_pro');
  const [amountPkr, setAmountPkr] = useState<number>(4999);

  const handleSelectTier = (tier: 'founder_pro' | 'investor_ready', amount: number) => {
    if (!isAuthenticated) {
      onNavigate('/signup');
      return;
    }
    setTargetTier(tier);
    setAmountPkr(amount);
    setModalOpen(true);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <span>100% Pakistani Payment Friendly</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Transparent PKR Pricing For Every Stage
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          No foreign cards required. Direct integration with PayFast, JazzCash, EasyPaisa, and instant 1Link Meezan transfer verification.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier 1: Free */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Free Founder</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white font-mono">PKR 0</span>
              <span className="text-xs text-slate-400">/ forever</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Test the waters and explore the Pakistani validation methodology without entering payment details.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1 Full AI Validation Report</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100-Point Viability Index</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bilingual Roman Urdu toggle</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Basic TAM / SAM in PKR</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onNavigate(isAuthenticated ? '/dashboard' : '/signup')}
            className="w-full py-2.5 rounded-xl border border-slate-700 text-xs font-bold text-slate-200 hover:bg-slate-800 transition-colors"
          >
            {user?.subscription_tier === 'free' ? 'Current Plan' : 'Start Free'}
          </button>
        </div>

        {/* Tier 2: Founder Pro */}
        <div className="p-6 rounded-2xl bg-slate-900 border-2 border-emerald-500 space-y-6 flex flex-col justify-between relative shadow-xl shadow-emerald-950/40">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-emerald-500 text-slate-950 px-3 py-0.5 rounded-full uppercase tracking-wider">
            Founder Favorite
          </span>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Founder Pro</span>
              <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                Monthly
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white font-mono">PKR 4,999</span>
              <span className="text-xs text-slate-400">/ month</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full operating suite for active builders testing products, launching Meta ads, and shipping via Trax/CallCourier.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-200 pt-4 border-t border-slate-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Unlimited</strong> Pakistani Validations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Interactive COD Return-to-Origin Simulator</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>30-Day WhatsApp Commerce Execution Plan</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>SECP SMC-Pvt Ltd & FBR Tax Guidance</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Export PDF Reports & Direct WhatsApp Sharing</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectTier('founder_pro', 4999)}
            className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all shadow-md shadow-emerald-950"
          >
            {user?.subscription_tier === 'founder_pro' ? 'Current Active Plan' : 'Upgrade via JazzCash / EasyPaisa'}
          </button>
        </div>

        {/* Tier 3: Investor Ready */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Investor Ready</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white font-mono">PKR 24,999</span>
              <span className="text-xs text-slate-400">/ one-time</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tailored for startups preparing to raise Pre-Seed / Seed from Pakistani VCs and regional angel syndicates.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Everything in Founder Pro Lifetime</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>10-Slide Investor Pitch Deck Generator</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>VC Alignment Score (Indus Valley, Sarmayacar)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>SECP Draft Memorandum of Association (MOA)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Venture Analyst Direct Slack/WhatsApp Review</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectTier('investor_ready', 24999)}
            className="w-full py-2.5 rounded-xl border border-indigo-500/40 text-xs font-bold text-indigo-300 hover:bg-indigo-950/40 transition-colors"
          >
            {user?.subscription_tier === 'investor_ready' ? 'Current Active Plan' : 'Get Investor Ready'}
          </button>
        </div>
      </div>

      {/* Local Payment Gateway Support Bar */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-xs space-y-4">
        <h4 className="font-bold text-slate-200 text-sm">Supported Local Pakistani Payment Channels</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-300">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="font-bold text-amber-400 block">JazzCash</span>
            <span className="text-slate-400 text-[11px]">Instant Mobile Wallet & QR</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="font-bold text-emerald-400 block">EasyPaisa</span>
            <span className="text-slate-400 text-[11px]">Telenor Microfinance Bank</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="font-bold text-teal-400 block">Meezan Bank & 1Link</span>
            <span className="text-slate-400 text-[11px]">Direct IBAN & Raast Instant</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="font-bold text-indigo-400 block">PayFast / Safepay</span>
            <span className="text-slate-400 text-[11px]">Pakistani Debit / Credit Cards</span>
          </div>
        </div>
      </div>

      {/* Slip Modal */}
      <SlipUploadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        targetTier={targetTier}
        amountPkr={amountPkr}
      />
    </div>
  );
};
