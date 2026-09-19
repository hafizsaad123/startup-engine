import React, { useState, useEffect } from 'react';
import { RTOProfitSimulator } from '../components/reports/RTOProfitSimulator';
import { UnitEconomicsData, ValidationReportData } from '../types';
import { SupabaseStore } from '../lib/supabase';
import { Calculator, DollarSign, Clock, ShieldAlert, TrendingUp, Info, Layers, RefreshCw } from 'lucide-react';

export const UnitEconomicsPage: React.FC = () => {
  const [reports, setReports] = useState<ValidationReportData[]>(() => SupabaseStore.getReports());
  const [selectedReportId, setSelectedReportId] = useState<string>('default');

  const [courierLagDays, setCourierLagDays] = useState<number>(10);
  const [dailyOrderVolume, setDailyOrderVolume] = useState<number>(25);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(3200);

  // Dynamic initial values for Pakistan D2C
  const [currentEconomics, setCurrentEconomics] = useState<UnitEconomicsData>({
    selling_price_pkr: 3200,
    cogs_pkr: 1350,
    packaging_pkr: 110,
    logistics_forward_pkr: 220,
    payment_gateway_fee_pkr: 50,
    estimated_cac_pkr: 320,
    rto_rate_pct: 18,
    rto_deadweight_loss_pkr: 468,
    net_contribution_margin_pkr: 682,
    net_margin_percentage: 21.3,
    meta_cpm_usd: 1.2,
  });

  useEffect(() => {
    SupabaseStore.getReportsAsync().then((live) => {
      setReports(live);
    });
  }, []);

  const handleSelectReport = (id: string) => {
    setSelectedReportId(id);
    if (id === 'default') {
      setCurrentEconomics({
        selling_price_pkr: 3200,
        cogs_pkr: 1350,
        packaging_pkr: 110,
        logistics_forward_pkr: 220,
        payment_gateway_fee_pkr: 50,
        estimated_cac_pkr: 320,
        rto_rate_pct: 18,
        rto_deadweight_loss_pkr: 468,
        net_contribution_margin_pkr: 682,
        net_margin_percentage: 21.3,
        meta_cpm_usd: 1.2,
      });
      setAvgOrderValue(3200);
      return;
    }

    const found = reports.find((r) => r.id === id);
    if (found && found.unit_economics) {
      setCurrentEconomics(found.unit_economics);
      setAvgOrderValue(found.unit_economics.selling_price_pkr || 2800);
    }
  };

  // Working Capital Float calculation
  // Outstanding cash locked with couriers during the lag period
  const totalLockedFloatPkr = dailyOrderVolume * avgOrderValue * courierLagDays;
  const cogsOutflowRequired = dailyOrderVolume * ((currentEconomics.cogs_pkr || 1200) + 110 + (currentEconomics.logistics_forward_pkr || 220)) * courierLagDays;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <Calculator className="w-3.5 h-3.5" />
            <span>Module 3: Unit Economics & Cashflow Simulator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Pakistani Unit Economics & Working Capital Float Engine
          </h1>
          <p className="text-xs text-slate-400">
            Simulate real contribution margins accounting for 18% COD rejection loss and courier cash reconciliation lag (Trax, CallCourier, Leopards).
          </p>
        </div>

        {/* Dynamic Venture Selector */}
        <div className="shrink-0">
          <label className="block text-[11px] text-slate-400 font-medium mb-1">
            Load Economics from Supabase Venture:
          </label>
          <select
            value={selectedReportId}
            onChange={(e) => handleSelectReport(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-medium focus:border-emerald-500 outline-none w-full sm:w-64"
          >
            <option value="default">Default Model (PKR 3,200 D2C Chappals)</option>
            {reports.map((r) => (
              <option key={r.id} value={r.id}>
                {r.idea_title} (PKR {r.unit_economics?.selling_price_pkr?.toLocaleString()})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Simulator 1: Interactive RTO & Net Margin */}
      <RTOProfitSimulator initialEconomics={currentEconomics} />

      {/* Simulator 2: Working Capital & Courier Float Buffer */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Courier Float & Working Capital Stress Test</h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                Cash Flow Survival
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Couriers hold customer COD cash for 7 to 14 days before remitting to your bank. If you scale orders too fast, you run out of cash for new stock.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Daily Orders */}
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Daily Dispatched Orders</span>
              <span className="font-bold text-slate-200">{dailyOrderVolume} / day</span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              step="5"
              value={dailyOrderVolume}
              onChange={(e) => setDailyOrderVolume(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>5 / day</span>
              <span>150 / day</span>
            </div>
          </div>

          {/* Courier Reconciliation Lag (Days) */}
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Courier Remittance Lag</span>
              <span className="font-bold text-amber-400">{courierLagDays} Days</span>
            </div>
            <input
              type="range"
              min="3"
              max="21"
              step="1"
              value={courierLagDays}
              onChange={(e) => setCourierLagDays(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>3 days (Fast)</span>
              <span>10-14 days (Average)</span>
              <span>21 days (Slow)</span>
            </div>
          </div>

          {/* Average Basket Value */}
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Average Order Value (AOV)</span>
              <span className="font-bold text-emerald-400">PKR {avgOrderValue.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="10000"
              step="250"
              value={avgOrderValue}
              onChange={(e) => setAvgOrderValue(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>PKR 1,000</span>
              <span>PKR 10,000</span>
            </div>
          </div>
        </div>

        {/* Float Output Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
            <span className="text-xs text-amber-400 font-semibold flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Cash Locked in Courier Pipeline
            </span>
            <div className="text-2xl font-black text-amber-300 font-mono">
              PKR {totalLockedFloatPkr.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400">
              Gross revenue currently in transit with delivery riders across Pakistan.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/30 space-y-1">
            <span className="text-xs text-rose-400 font-semibold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              Minimum Working Capital Buffer Needed
            </span>
            <div className="text-2xl font-black text-rose-300 font-mono">
              PKR {cogsOutflowRequired.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400">
              You must have this cash in bank to pay suppliers and couriers before COD cash reaches your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
