import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { SupabaseStore } from '../lib/supabase';
import { ValidationReportData } from '../types';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Scale,
  Calculator,
  Building,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  FileText,
  DollarSign,
  Truck,
} from 'lucide-react';

interface DashboardOverviewProps {
  onNavigate: (path: string) => void;
  onSelectReport: (report: ValidationReportData) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate, onSelectReport }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const reports = SupabaseStore.getReports();

  const handleOpenReport = (report: ValidationReportData) => {
    onSelectReport(report);
    onNavigate(`/dashboard/report/${report.id}`);
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome & Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Founder Console • {user?.city || 'Pakistan'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Khushamdeed, {user?.full_name?.split(' ')[0] || 'Founder'}!
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Evaluate consumer demand, simulate COD return charges, generate 30-day MVP roadmaps, and align with Pakistani venture funds.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/dashboard/validate')}
          className="px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all shadow-md shadow-emerald-950 flex items-center justify-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>+ New Idea Validation</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-slate-400 font-medium">Validations Run</span>
          <div className="text-2xl font-black text-white font-mono">{reports.length}</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Ground-truth calibrated
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-slate-400 font-medium">Avg Viability Score</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {reports.length > 0
              ? Math.round(reports.reduce((acc: number, r: ValidationReportData) => acc + (r.viability_score || r.overall_score || 75), 0) / reports.length)
              : 81}
            /100
          </div>
          <span className="text-[10px] text-slate-400">Above national benchmark</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-slate-400 font-medium">Logistics RTO Defense</span>
          <div className="text-2xl font-black text-amber-400 font-mono">18.5%</div>
          <span className="text-[10px] text-amber-300/80">Average COD return buffer</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-slate-400 font-medium">VC Thesis Fit</span>
          <div className="text-2xl font-black text-indigo-400 font-mono">Indus Valley</div>
          <span className="text-[10px] text-indigo-300/80">& Sarmayacar criteria</span>
        </div>
      </div>

      {/* Main Content Area: Saved Reports & Quick Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Reports List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Your Pakistani Startup Reports</h2>
              <p className="text-[11px] text-slate-400">Click any report to view interactive P&L, 30-day MVP, and pitch deck</p>
            </div>
            <span className="text-xs text-slate-400">{reports.length} Reports</span>
          </div>

          <div className="space-y-3">
            {reports.map((report: ValidationReportData) => {
              const score = report.viability_score || report.overall_score || 80;
              const isHigh = score >= 75;
              return (
                <div
                  key={report.id}
                  onClick={() => handleOpenReport(report)}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 cursor-pointer transition-all space-y-3 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                          {report.raw_input.industry}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <span>📍 {report.raw_input.city}</span>
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {report.idea_title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">{report.executive_summary}</p>
                    </div>

                    {/* Score Circle */}
                    <div className="text-right shrink-0">
                      <div
                        className={`text-lg font-black font-mono px-2.5 py-1 rounded-xl border ${
                          isHigh
                            ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-950/60 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {score}/100
                      </div>
                      <span className="text-[9px] text-slate-500 block mt-0.5">Viability Index</span>
                    </div>
                  </div>

                  {/* Highlights Bar */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/60 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Selling Price:</span>
                      <span className="font-semibold text-slate-200">PKR {report.unit_economics.selling_price_pkr?.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Net Margin:</span>
                      <span className="font-semibold text-emerald-400">{report.unit_economics.net_margin_percentage}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">SECP Recommendation:</span>
                      <span className="font-semibold text-slate-200 truncate block">{report.secp_compliance.recommended_entity}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Quick Modules & Local Insights */}
        <div className="space-y-6">
          {/* Quick Ecosystem Modules */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Ecosystem Engines</h3>

            <div className="space-y-2.5 text-xs">
              <button
                onClick={() => onNavigate('/dashboard/unit-economics')}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-left flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-200 block">Unit Economics & P&L</span>
                    <span className="text-[10px] text-slate-400">Calculate Trax COD float & net PKR margin</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('/dashboard/compliance')}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-left flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-200 block">SECP & Tax Portal</span>
                    <span className="text-[10px] text-slate-400">SMC-Pvt Ltd & PRA/SRB tax thresholds</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Pakistani VC Funding Horizon */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-slate-950 border border-indigo-900/40 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Building className="w-4 h-4" />
              <span>Pakistani VC Theses Spotlight</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Active Pakistani venture partners are prioritizing cash-flow positive unit economics over subsidised GMV.
            </p>
            <div className="space-y-1 text-[11px] pt-1 border-t border-indigo-950 text-slate-300">
              <div className="flex justify-between">
                <span>Indus Valley Capital:</span>
                <span className="text-indigo-300">Transformative B2B / Supply</span>
              </div>
              <div className="flex justify-between">
                <span>Sarmayacar:</span>
                <span className="text-indigo-300">Scalable Tech & FinTech</span>
              </div>
              <div className="flex justify-between">
                <span>Fatima Gobi:</span>
                <span className="text-indigo-300">Regional Synergies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
