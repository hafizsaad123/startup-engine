import React, { useState } from 'react';
import { SECPComplianceGuidance } from '../../types';
import { ShieldCheck, FileCheck, HelpCircle, Check, ArrowRight, X, Scale } from 'lucide-react';

interface SECPGuideModalProps {
  complianceData?: SECPComplianceGuidance;
  isOpen: boolean;
  onClose: () => void;
}

export const SECPGuideModal: React.FC<SECPGuideModalProps> = ({
  complianceData,
  isOpen,
  onClose,
}) => {
  const [selectedTab, setSelectedTab] = useState<'entity' | 'fbr' | 'checklist'>('entity');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6 text-slate-100 my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Pakistani Legal, SECP & FBR Tax Compliance Engine</h3>
              <p className="text-xs text-slate-400">Official guidance under SECP Companies Act 2017 & Provincial Revenue Authorities</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 mt-4 gap-2 text-xs font-semibold">
          <button
            onClick={() => setSelectedTab('entity')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              selectedTab === 'entity'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            SECP Entity Selection
          </button>
          <button
            onClick={() => setSelectedTab('fbr')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              selectedTab === 'fbr'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            FBR & Provincial Tax (PRA / SRB)
          </button>
          <button
            onClick={() => setSelectedTab('checklist')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              selectedTab === 'checklist'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Founder Step-by-Step Checklist
          </button>
        </div>

        {/* Tab 1: SECP Entity Selection */}
        {selectedTab === 'entity' && (
          <div className="mt-5 space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
              <span className="font-bold text-emerald-400 text-sm block">
                Recommendation: {complianceData?.recommended_entity || 'Single Member Company (SMC-Pvt Ltd)'}
              </span>
              <p className="text-slate-300 mt-1">
                Provides 100% limited personal liability, credibility with corporate clients and couriers, and allows opening a corporate bank account with 100% sole founder ownership.
              </p>
              <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-slate-300 pt-2 border-t border-emerald-500/20">
                <div>
                  <span className="text-slate-400">Estimated Cost: </span>
                  <span className="font-semibold text-white">{complianceData?.registration_cost_estimate_pkr || 'PKR 12,000 - 18,000'}</span>
                </div>
                <div>
                  <span className="text-slate-400">Timeline: </span>
                  <span className="font-semibold text-white">{complianceData?.timeline_days || '5 to 7 days via SECP eServices'}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-200">Sole Proprietorship</h4>
                <p className="text-slate-400 text-[11px]">Best for non-tech traders or bootstrapped testing with zero outside funding.</p>
                <div className="text-[10px] space-y-1 text-slate-300 pt-1">
                  <div>✓ Cost: PKR 3,000 - 5,000</div>
                  <div>✓ Immediate setup on FBR Iris</div>
                  <div className="text-rose-400">✕ Unlimited personal legal liability</div>
                  <div className="text-rose-400">✕ VCs will NOT invest</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-2 relative">
                <span className="absolute top-2 right-2 text-[9px] bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded font-bold">
                  Recommended
                </span>
                <h4 className="font-bold text-emerald-400">SMC-Pvt Ltd</h4>
                <p className="text-slate-400 text-[11px]">Single-founder limited liability corporation registered via SECP.</p>
                <div className="text-[10px] space-y-1 text-slate-300 pt-1">
                  <div>✓ Cost: PKR 14,000 - 20,000</div>
                  <div>✓ Limited liability protects personal assets</div>
                  <div>✓ Clean corporate bank account opening</div>
                  <div>✓ Can convert to Multi-member Pvt Ltd later</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-200">Private Limited (Pvt Ltd)</h4>
                <p className="text-slate-400 text-[11px]">Mandatory if you have 2+ co-founders or seeking VC funding immediately.</p>
                <div className="text-[10px] space-y-1 text-slate-300 pt-1">
                  <div>✓ Required by Indus Valley & Sarmayacar</div>
                  <div>✓ Equity shareholding split with vesting</div>
                  <div>✓ Formal board of directors</div>
                  <div>✕ Annual audit & SECP statutory filings</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: FBR & Provincial Tax */}
        {selectedTab === 'fbr' && (
          <div className="mt-5 space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-200 text-sm">Provincial Sales Tax Mapping</h4>
              <p className="text-slate-400">
                In Pakistan, Sales Tax on Services is devolved to provincial revenue boards, while goods are under FBR.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px]">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="font-bold text-emerald-400 block">PRA (Punjab)</span>
                  <span className="text-slate-400">Lahore / Rawalpindi</span>
                  <span className="block mt-1 font-mono text-white">16% standard</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="font-bold text-teal-400 block">SRB (Sindh)</span>
                  <span className="text-slate-400">Karachi / Hyderabad</span>
                  <span className="block mt-1 font-mono text-white">13% standard</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="font-bold text-amber-400 block">KPRA (KPK)</span>
                  <span className="text-slate-400">Peshawar</span>
                  <span className="block mt-1 font-mono text-white">15% standard</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="font-bold text-indigo-400 block">BRA (Balochistan)</span>
                  <span className="text-slate-400">Quetta</span>
                  <span className="block mt-1 font-mono text-white">15% standard</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-slate-300">
              <span className="font-bold text-white text-xs block">State Bank of Pakistan (SBP) Foreign Exchange Rules</span>
              <p className="text-slate-400 text-[11px]">
                {complianceData?.sbp_regulations_note ||
                  'If accepting overseas cards via Stripe or 2Checkout, you must ensure proceeds are repatriated via SBP PR-24 channels. Domestic founders should prefer PayFast, Safepay, or JazzCash to avoid cross-border holding delays.'}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Step-by-Step Checklist */}
        {selectedTab === 'checklist' && (
          <div className="mt-5 space-y-3 text-xs">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-slate-200">Step 1: Reserve Company Name on SECP eServices</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Cost: PKR 200. Check the name availability index to avoid trademark overlaps.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-slate-200">Step 2: Digital Incorporation & Draft MOA</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Submit Memorandum of Association with principal line of business covering digital tech / logistics services.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-slate-200">Step 3: FBR NTN & STRN Issuance</span>
                <p className="text-slate-400 text-[11px] mt-0.5">SECP now provides automatic 14-digit NTN with the Certificate of Incorporation.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-slate-200">Step 4: Open Corporate Bank Account</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Meezan Bank, Bank Alfalah, or HBL with Form 29 and certified true copies.</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
