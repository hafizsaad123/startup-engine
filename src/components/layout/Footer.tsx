import React from 'react';
import { Zap, ShieldCheck, CheckCircle2, Lock, Heart, FileText, HelpCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 text-sm">
      {/* Trust & Regulatory Highlights */}
      <div className="border-b border-slate-900/80 bg-slate-950/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-200">SECP Compliance</p>
              <p className="text-slate-400">SMC-Pvt Ltd & Pvt Ltd draft MOA guidance</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-200">FBR & Provincial Taxes</p>
              <p className="text-slate-400">PRA, SRB, KPRA & BRA thresholds mapped</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-200">Local Gateways</p>
              <p className="text-slate-400">PayFast, JazzCash, EasyPaisa & Raast ready</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-200">100% Native PKR</p>
              <p className="text-slate-400">No fictional US SaaS CPM or Stripe assumptions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-bold">
                <Zap className="h-5 w-5 fill-current" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                STARTUP ENGINE <span className="text-emerald-400">PK</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The end-to-end AI platform designed specifically to guide Pakistani entrepreneurs from raw concept validation to fundraising and regulatory execution. Built for founders in Karachi, Lahore, Islamabad, and across Tier-2 Pakistan.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-400">
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">Karachi</span>
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">Lahore</span>
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">Islamabad</span>
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">Faisalabad</span>
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">Peshawar</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Ecosystem Modules</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('/dashboard/validate')} className="hover:text-emerald-400 transition-colors">Module 1: AI Validator</button></li>
              <li><button onClick={() => onNavigate('/dashboard')} className="hover:text-emerald-400 transition-colors">Module 2: 30-Day MVP Plan</button></li>
              <li><button onClick={() => onNavigate('/dashboard/unit-economics')} className="hover:text-emerald-400 transition-colors">Module 3: Unit Economics</button></li>
              <li><button onClick={() => onNavigate('/dashboard/compliance')} className="hover:text-emerald-400 transition-colors">Module 4: SECP & FBR Hub</button></li>
              <li><button onClick={() => onNavigate('/dashboard')} className="hover:text-emerald-400 transition-colors">Module 5: VC Pitch Deck</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Resources & Local Stack</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('/about')} className="hover:text-emerald-400 transition-colors">Why Silicon Valley Tools Fail</button></li>
              <li><button onClick={() => onNavigate('/pricing')} className="hover:text-emerald-400 transition-colors">JazzCash & EasyPaisa Pricing</button></li>
              <li><span className="text-slate-400">Trax & CallCourier COD API</span></li>
              <li><span className="text-slate-400">SECP eServices Portal</span></li>
              <li><span className="text-slate-400">FBR Iris & PRA Rules</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Pakistani VC Context</h4>
            <p className="text-xs text-slate-400 mb-3">
              Calibrated against investment theses of regional venture capital funds:
            </p>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div>• Indus Valley Capital</div>
              <div>• Sarmayacar</div>
              <div>• Fatima Gobi Ventures</div>
              <div>• Zayn VC & Deosai</div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Startup Engine Pakistan. Built with pride for Pakistani founders.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/about')} className="hover:text-slate-300">About</button>
            <button onClick={() => onNavigate('/pricing')} className="hover:text-slate-300">Pricing in PKR</button>
            <span className="text-slate-400">Version 1.0 (Production Ready)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
