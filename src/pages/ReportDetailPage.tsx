import React, { useState } from 'react';
import { ValidationReportData } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { RTOProfitSimulator } from '../components/reports/RTOProfitSimulator';
import { SECPGuideModal } from '../components/reports/SECPGuideModal';
import { PitchDeckOutline } from '../components/reports/PitchDeckOutline';
import {
  Sparkles,
  Printer,
  Share2,
  TrendingUp,
  Scale,
  Calendar,
  Layers,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  DollarSign,
  Package,
  Building,
  Presentation,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

interface ReportDetailPageProps {
  report: ValidationReportData;
  onNavigate: (path: string) => void;
}

export const ReportDetailPage: React.FC<ReportDetailPageProps> = ({ report, onNavigate }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'economics' | 'mvp' | 'compliance' | 'competitors' | 'vc'>('economics');
  const [secpModalOpen, setSecpModalOpen] = useState(false);
  const [pitchModalOpen, setPitchModalOpen] = useState(false);

  const score = report.viability_score ?? report.overall_score ?? 80;
  const isHigh = score >= 75;

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = `Startup Engine PK Validation Report for *${report.idea_title}*:\n` +
      `Viability Score: ${report.viability_score}/100\n` +
      `Target City: ${report.raw_input.city}\n` +
      `Net Margin: ${report.unit_economics.net_margin_percentage}%\n` +
      `SECP Recommendation: ${report.secp_compliance.recommended_entity}\n` +
      `Executive Summary: ${report.executive_summary}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <button
          onClick={() => onNavigate('/dashboard')}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareWhatsApp}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-600/30 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Share via WhatsApp</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-800 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Hero Report Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 uppercase">
                {report.raw_input.industry}
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                📍 {report.raw_input.city}
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                👥 {report.raw_input.target_sec}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {report.idea_title}
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              {report.executive_summary}
            </p>
          </div>

          {/* Viability Index Badge */}
          <div className="text-center p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shrink-0 md:w-44">
            <div className="text-xs text-slate-400 font-semibold mb-1">Viability Index</div>
            <div
              className={`text-3xl sm:text-4xl font-black font-mono ${
                isHigh ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {score}
              <span className="text-xs font-normal text-slate-400">/100</span>
            </div>
            <span
              className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isHigh
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              }`}
            >
              {isHigh ? 'High Feasibility' : 'Moderate (RTO Risk)'}
            </span>
          </div>
        </div>

        {/* Roman Urdu Khulasa Box */}
        {report.executive_summary_roman_urdu && (
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs space-y-1">
            <span className="font-bold text-emerald-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <span>🇵🇰 Roman Urdu Khulasa (Executive Summary)</span>
            </span>
            <p className="text-slate-300 italic leading-relaxed">
              "{report.executive_summary_roman_urdu}"
            </p>
          </div>
        )}
      </div>

      {/* Key Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-slate-400 font-medium">TAM (Pakistan)</span>
          <div className="text-base sm:text-lg font-black text-white font-mono truncate">
            {report.market_sizing.tam_pkr}
          </div>
          <span className="text-[10px] text-slate-500 block truncate">({report.market_sizing.tam_usd})</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-slate-400 font-medium">Net Contribution Margin</span>
          <div className="text-base sm:text-lg font-black text-emerald-400 font-mono">
            PKR {report.unit_economics.net_contribution_margin_pkr?.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-400/80 font-medium">
            {report.unit_economics.net_margin_percentage}% margin after RTO
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-slate-400 font-medium">Customer Acquisition (CAC)</span>
          <div className="text-base sm:text-lg font-black text-slate-200 font-mono">
            PKR {report.unit_economics.estimated_cac_pkr?.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400">Meta CPM: ~${report.unit_economics.meta_cpm_usd}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-slate-400 font-medium">SECP Entity Fit</span>
          <div className="text-base sm:text-lg font-bold text-teal-400 truncate">
            {report.secp_compliance.recommended_entity.split(' ')[0]}
          </div>
          <span className="text-[10px] text-slate-400 truncate block">
            {report.secp_compliance.registration_cost_estimate_pkr}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-2 sm:gap-4 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('economics')}
          className={`pb-3 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'economics'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Unit Economics & RTO Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('mvp')}
          className={`pb-3 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'mvp'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>30-Day Go-To-Market Plan</span>
        </button>

        <button
          onClick={() => setActiveTab('compliance')}
          className={`pb-3 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'compliance'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>SECP & FBR Compliance</span>
        </button>

        <button
          onClick={() => setActiveTab('competitors')}
          className={`pb-3 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'competitors'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Local Competitors & Moat</span>
        </button>

        <button
          onClick={() => setActiveTab('vc')}
          className={`pb-3 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'vc'
              ? 'border-emerald-500 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Presentation className="w-4 h-4" />
          <span>VC Match & Pitch Deck</span>
        </button>
      </div>

      {/* Tab 1: Economics & RTO Simulator */}
      {activeTab === 'economics' && (
        <div className="space-y-6">
          <RTOProfitSimulator
            initialEconomics={report.unit_economics}
            rtoAnalysis={report.rto_analysis}
          />

          {/* RTO Risk Recommendations */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs">
            <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Recommended Pakistani Logistics Safeguards</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {(report.rto_analysis.mitigation_tactics || (report.rto_analysis as any).rto_mitigation_tactics || []).map((tactic: string, idx: number) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <span className="font-bold text-slate-200 block">Tactic {idx + 1}</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{tactic}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 30-Day MVP Plan */}
      {activeTab === 'mvp' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 text-xs">
            <h3 className="font-bold text-white text-sm">30-Day Native Go-To-Market Execution Blueprint</h3>
            <p className="text-slate-400 mt-0.5">
              Phased to validate consumer demand, integrate Trax / CallCourier COD APIs, launch Meta ads, and acquire first 100 paying customers without premature burn.
            </p>
          </div>

          <div className="space-y-4">
            {(report.thirty_day_mvp_plan || []).map((phase: any, idx: number) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                      {phase.week}
                    </span>
                    <h4 className="font-bold text-white text-sm">{phase.phase_title}</h4>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Est. Budget: <span className="text-emerald-400 font-mono font-semibold">{phase.estimated_cost_pkr || 'PKR 25,000'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-300 block">Key Action Deliverables:</span>
                    <ul className="space-y-1.5 text-[11px] text-slate-400">
                      {(phase.actions || phase.key_deliverables || []).map((act: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-300 block">Recommended Tools & Gateways:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(phase.recommended_tools || phase.local_tools || []).map((tool: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-300 font-mono"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: SECP & Compliance */}
      {activeTab === 'compliance' && (
        <div className="space-y-5">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">SECP Entity Match</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{report.secp_compliance.recommended_entity}</h3>
              </div>
              <button
                onClick={() => setSecpModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold hover:bg-emerald-500/30 transition-all flex items-center gap-1.5"
              >
                <span>Open Full SECP & FBR Tax Guide</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-slate-300 leading-relaxed">
              {report.secp_compliance.entity_rationale}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Estimated Incorporation Cost:</span>
                <span className="font-bold text-white">{report.secp_compliance.registration_cost_estimate_pkr}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Timeline via eServices:</span>
                <span className="font-bold text-white">{report.secp_compliance.timeline_days}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Provincial Authority:</span>
                <span className="font-bold text-emerald-400">{report.secp_compliance.provincial_tax_authority}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-slate-200">Foreign Exchange & State Bank (SBP) Compliance</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {report.secp_compliance.sbp_regulations_note}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Local Competitors & Incumbents */}
      {activeTab === 'competitors' && (
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
            <h3 className="font-bold text-white text-sm">Pakistani Competitive Landscape & Moat Strategy</h3>
            <p className="text-slate-400 mt-0.5">
              How to beat incumbents like Daraz, manual wholesale markets, or foreign software clones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(report.local_competitors || []).map((comp: any, idx: number) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">{comp.name}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {comp.type}
                  </span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div>
                    <span className="text-slate-400">Threat Level: </span>
                    <span
                      className={`font-semibold ${
                        comp.threat_level === 'High'
                          ? 'text-rose-400'
                          : comp.threat_level === 'Medium'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {comp.threat_level}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Weakness to Exploit: </span>
                    <span className="text-emerald-300 font-medium">{comp.weakness_to_exploit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
            <h4 className="font-bold text-emerald-400 text-sm">Strategic Defensibility in Pakistan</h4>
            <ul className="space-y-1 text-slate-300">
              <li>• <strong>WhatsApp conversational friction reduction:</strong> Building trust before requiring payment details.</li>
              <li>• <strong>Courier SLA optimization:</strong> Dynamically toggling Trax vs CallCourier depending on Tier-1 vs Tier-2 destination routing.</li>
              <li>• <strong>Wholesale direct sourcing:</strong> Bypassing middle distributors in Lahore or Karachi wholesale centers.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 5: VC Thesis & Pitch Deck */}
      {activeTab === 'vc' && (
        <div className="space-y-5 text-xs">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-900/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Pakistani VC Alignment</span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Readiness Score: {report.vc_thesis_match.overall_investor_readiness_score}/100
                </h3>
              </div>
              <button
                onClick={() => setPitchModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-semibold hover:bg-indigo-500/30 transition-all flex items-center gap-1.5"
              >
                <Presentation className="w-3.5 h-3.5" />
                <span>Open 10-Slide Investor Deck Outline</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {(report.vc_thesis_match.matched_funds || []).map((fund: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">{fund.fund_name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                      {fund.thesis_fit_score}% Fit
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{fund.reasoning || fund.partner_notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <SECPGuideModal
        isOpen={secpModalOpen}
        onClose={() => setSecpModalOpen(false)}
        complianceData={report.secp_compliance}
      />

      <PitchDeckOutline
        isOpen={pitchModalOpen}
        onClose={() => setPitchModalOpen(false)}
        report={report}
      />
    </div>
  );
};
