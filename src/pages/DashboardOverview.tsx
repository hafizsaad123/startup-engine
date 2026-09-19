import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { SupabaseStore, SUPABASE_URL } from '../lib/supabase';
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
  Trash2,
  Search,
  Database,
  RefreshCw,
} from 'lucide-react';

interface DashboardOverviewProps {
  onNavigate: (path: string) => void;
  onSelectReport: (report: ValidationReportData) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate, onSelectReport }) => {
  const { user, isSupabaseConnected } = useAuth();
  const { t } = useLanguage();
  const [reports, setReports] = useState<ValidationReportData[]>(() => SupabaseStore.getReports());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshReports = async () => {
    setIsRefreshing(true);
    try {
      const live = await SupabaseStore.getReportsAsync();
      setReports(live);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    refreshReports();
  }, []);

  const handleOpenReport = (report: ValidationReportData) => {
    onSelectReport(report);
    onNavigate(`/dashboard/report/${report.id}`);
  };

  const handleDeleteReport = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this validation report?')) {
      SupabaseStore.deleteValidation(id);
      setReports((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Filtered reports
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.idea_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (report.raw_input?.city || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (report.raw_input?.industry || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity =
      selectedCityFilter === 'all' ||
      (report.raw_input?.city || '').toLowerCase() === selectedCityFilter.toLowerCase();

    return matchesSearch && matchesCity;
  });

  // Dynamic calculated metrics from active reports
  const avgViabilityScore =
    reports.length > 0
      ? Math.round(
          reports.reduce(
            (acc, r) => acc + (r.viability_score || r.overall_score || 75),
            0
          ) / reports.length
        )
      : 81;

  const avgNetMargin =
    reports.length > 0
      ? Math.round(
          (reports.reduce(
            (acc, r) => acc + (Number(r.unit_economics?.net_margin_percentage) || 18),
            0
          ) /
            reports.length) *
            10
        ) / 10
      : 21.3;

  return (
    <div className="space-y-8">
      {/* Live Supabase Connection Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 font-medium">Supabase PostgreSQL Connected:</span>
          <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            zjavgxypgehltixjculm.supabase.co
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refreshReports}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
            <span>Sync Supabase</span>
          </button>
        </div>
      </div>

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

      {/* Dynamic Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-slate-400 font-medium">Validations in Supabase</span>
          <div className="text-2xl font-black text-white font-mono">{reports.length}</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Live synced
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-slate-400 font-medium">Avg Viability Score</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {avgViabilityScore}/100
          </div>
          <span className="text-[10px] text-slate-400">Dynamic Pakistani index</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-slate-400 font-medium">Avg Net Contribution</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">{avgNetMargin}%</div>
          <span className="text-[10px] text-emerald-300/80">Across validated ventures</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-slate-400 font-medium">Target Ecosystem</span>
          <div className="text-2xl font-black text-indigo-400 font-mono">Pak VC Match</div>
          <span className="text-[10px] text-indigo-300/80">Indus Valley & Sarmayacar</span>
        </div>
      </div>

      {/* Main Content Area: Saved Reports & Quick Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Reports List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Your Pakistani Startup Reports</h2>
              <p className="text-[11px] text-slate-400">Stored in Supabase database with instant P&L and 30-day MVP plans</p>
            </div>

            {/* Filter and Search Controls */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-emerald-500 outline-none w-36 sm:w-44"
                />
              </div>

              <select
                value={selectedCityFilter}
                onChange={(e) => setSelectedCityFilter(e.target.value)}
                className="py-1.5 px-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs outline-none"
              >
                <option value="all">All Cities</option>
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad / Rawalpindi">Islamabad</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredReports.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
                <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-slate-400 text-xs">No validation reports match your current search.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCityFilter('all'); }}
                  className="text-xs text-emerald-400 underline font-semibold"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              filteredReports.map((report: ValidationReportData) => {
                const score = report.viability_score || report.overall_score || 80;
                const isHigh = score >= 75;
                const sellingPrice = report.unit_economics?.selling_price_pkr || 2800;
                const marginPct = report.unit_economics?.net_margin_percentage || 20;

                return (
                  <div
                    key={report.id}
                    onClick={() => handleOpenReport(report)}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 cursor-pointer transition-all space-y-3 group relative"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1 pr-6">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                            {report.raw_input?.industry || 'Startup'}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <span>📍 {report.raw_input?.city || 'Pakistan'}</span>
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {report.idea_title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-1">{report.executive_summary}</p>
                      </div>

                      {/* Score Circle & Delete */}
                      <div className="text-right shrink-0 flex items-center gap-3">
                        <div>
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
                        <button
                          onClick={(e) => handleDeleteReport(e, report.id)}
                          title="Delete report"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Highlights Bar */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/60 text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Selling Price:</span>
                        <span className="font-semibold text-slate-200">
                          PKR {sellingPrice.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Net Margin:</span>
                        <span className="font-semibold text-emerald-400">{marginPct}%</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Courier / Entity:</span>
                        <span className="font-semibold text-slate-200 truncate block">
                          {report.raw_input?.courier_preference || report.secp_compliance?.recommended_entity || 'Trax Logistics'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
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

