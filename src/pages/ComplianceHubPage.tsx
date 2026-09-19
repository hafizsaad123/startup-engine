import React, { useState } from 'react';
import { Scale, ShieldCheck, Check, Building, FileText, AlertCircle, ExternalLink, Download } from 'lucide-react';

export const ComplianceHubPage: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<'smc' | 'pvtltd' | 'sole'>('smc');
  const [activeProvince, setActiveProvince] = useState<'punjab' | 'sindh' | 'kpk' | 'balochistan'>('punjab');

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <Scale className="w-3.5 h-3.5" />
          <span>Module 4: SECP & FBR Legal Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Pakistani Legal Incorporation & Provincial Tax Hub
        </h1>
        <p className="text-xs text-slate-400">
          Incorporation guidance under the SECP Companies Act 2017, provincial sales tax withholding (PRA, SRB, KPRA, BRA), and SBP foreign exchange regulations.
        </p>
      </div>

      {/* Entity Selector Engine */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6 text-xs">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-white">1. Interactive SECP Entity Selection Engine</h2>
          <p className="text-xs text-slate-400 mt-0.5">Select an entity type to compare registration costs, liability protection, and VC compatibility.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setSelectedEntity('sole')}
            className={`p-4 rounded-xl border text-left space-y-2 transition-all ${
              selectedEntity === 'sole'
                ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-200">Sole Proprietorship</h3>
              <span className="text-[10px] text-slate-400">FBR Only</span>
            </div>
            <p className="text-slate-400 text-[11px]">Personal trading entity created directly on FBR Iris portal with individual CNIC.</p>
            <div className="text-[10px] text-slate-300 pt-2 border-t border-slate-800/80 space-y-1">
              <div>• Cost: PKR 3,000 - 5,000</div>
              <div>• Setup: 24 - 48 Hours</div>
              <div className="text-rose-400">• Unlimited personal liability</div>
              <div className="text-rose-400">• Institutional VCs will NOT invest</div>
            </div>
          </button>

          <button
            onClick={() => setSelectedEntity('smc')}
            className={`p-4 rounded-xl border text-left space-y-2 relative transition-all ${
              selectedEntity === 'smc'
                ? 'bg-emerald-950/30 border-emerald-500 ring-1 ring-emerald-500'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="absolute top-2 right-2 text-[9px] bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded font-bold">
              Founder Pick
            </span>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-emerald-400">SMC-Pvt Ltd</h3>
              <span className="text-[10px] text-slate-400">SECP</span>
            </div>
            <p className="text-slate-400 text-[11px]">Single Member Company incorporated under SECP Companies Act 2017 for solo founders.</p>
            <div className="text-[10px] text-slate-300 pt-2 border-t border-slate-800/80 space-y-1">
              <div>• Cost: PKR 14,000 - 18,000</div>
              <div>• Setup: 5 to 7 working days</div>
              <div className="text-emerald-400">• 100% Limited liability protection</div>
              <div className="text-emerald-400">• Open corporate current account</div>
            </div>
          </button>

          <button
            onClick={() => setSelectedEntity('pvtltd')}
            className={`p-4 rounded-xl border text-left space-y-2 transition-all ${
              selectedEntity === 'pvtltd'
                ? 'bg-indigo-950/30 border-indigo-500 ring-1 ring-indigo-500'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-indigo-400">Private Limited (Pvt Ltd)</h3>
              <span className="text-[10px] text-slate-400">SECP 2+ Members</span>
            </div>
            <p className="text-slate-400 text-[11px]">Multi-shareholder corporation with formal board of directors and shareholding split.</p>
            <div className="text-[10px] text-slate-300 pt-2 border-t border-slate-800/80 space-y-1">
              <div>• Cost: PKR 20,000 - 30,000</div>
              <div>• Setup: 7 to 10 working days</div>
              <div className="text-indigo-400">• Required for equity co-founders</div>
              <div className="text-indigo-400">• Mandatory for VC term sheets</div>
            </div>
          </button>
        </div>
      </div>

      {/* Provincial Tax Matrix */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6 text-xs">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-white">2. Provincial Sales Tax (PRA / SRB / KPRA / BRA)</h2>
          <p className="text-xs text-slate-400 mt-0.5">Services taxation in Pakistan is devolved to provincial revenue authorities.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveProvince('punjab')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeProvince === 'punjab' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400'
            }`}
          >
            Punjab (PRA)
          </button>
          <button
            onClick={() => setActiveProvince('sindh')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeProvince === 'sindh' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400'
            }`}
          >
            Sindh (SRB)
          </button>
          <button
            onClick={() => setActiveProvince('kpk')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeProvince === 'kpk' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400'
            }`}
          >
            KPK (KPRA)
          </button>
          <button
            onClick={() => setActiveProvince('balochistan')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeProvince === 'balochistan' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400'
            }`}
          >
            Balochistan (BRA)
          </button>
        </div>

        {/* Selected Province Details */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          {activeProvince === 'punjab' && (
            <>
              <div className="flex justify-between items-center">
                <span className="font-bold text-emerald-400 text-sm">Punjab Revenue Authority (PRA)</span>
                <span className="font-mono text-white font-bold">Standard Rate: 16%</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Applies to digital services, IT consulting, e-commerce commission marketplaces, and logistics operated within Lahore, Rawalpindi, Faisalabad, and Multan. Reduced rate (5%) applicable to specific software export or call center services.
              </p>
            </>
          )}

          {activeProvince === 'sindh' && (
            <>
              <div className="flex justify-between items-center">
                <span className="font-bold text-teal-400 text-sm">Sindh Revenue Board (SRB)</span>
                <span className="font-mono text-white font-bold">Standard Rate: 13%</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Governs service businesses operating in Karachi and Hyderabad. Telecommunication and software services have specific withholding schedules under Sindh Sales Tax on Services Act 2011.
              </p>
            </>
          )}

          {activeProvince === 'kpk' && (
            <>
              <div className="flex justify-between items-center">
                <span className="font-bold text-amber-400 text-sm">Khyber Pakhtunkhwa Revenue Authority (KPRA)</span>
                <span className="font-mono text-white font-bold">Standard Rate: 15%</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Applies to service providers located in Peshawar, Abbottabad, and Swat. Special incentives for tech startups incubated under KPITB.
              </p>
            </>
          )}

          {activeProvince === 'balochistan' && (
            <>
              <div className="flex justify-between items-center">
                <span className="font-bold text-indigo-400 text-sm">Balochistan Revenue Authority (BRA)</span>
                <span className="font-mono text-white font-bold">Standard Rate: 15%</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Governs services in Quetta, Hub industrial zone, and Gwadar special economic zone.
              </p>
            </>
          )}
        </div>
      </div>

      {/* SBP Foreign Exchange Rules */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs">
        <h2 className="text-base font-bold text-white">3. State Bank of Pakistan (SBP) Foreign Exchange (FX) Framework</h2>
        <div className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
          <p>
            Under SBP Circular PR-24 and modern freelance/tech export regulations, tech companies can retain up to 50% of foreign currency earnings in special Exporters Special Foreign Currency Accounts (ESFCA) to pay for AWS, Meta Ads, and foreign SaaS without explicit SBP prior approval.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300">
            ✓ PSEB (Pakistan Software Export Board) registration gives 0.25% export tax final tax regime status under Section 154A of Income Tax Ordinance.
          </div>
        </div>
      </div>
    </div>
  );
};
