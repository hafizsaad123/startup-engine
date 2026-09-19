import React, { useState } from 'react';
import { UnitEconomicsData, RTORiskAnalysis } from '../../types';
import { AlertTriangle, TrendingUp, DollarSign, Package, Truck, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

interface RTOProfitSimulatorProps {
  initialEconomics: UnitEconomicsData;
  rtoAnalysis?: RTORiskAnalysis;
}

export const RTOProfitSimulator: React.FC<RTOProfitSimulatorProps> = ({
  initialEconomics,
  rtoAnalysis,
}) => {
  const [monthlyOrders, setMonthlyOrders] = useState<number>(300);
  const [sellingPrice, setSellingPrice] = useState<number>(initialEconomics.selling_price_pkr || 2800);
  const [cogs, setCogs] = useState<number>(initialEconomics.cogs_pkr || 1200);
  const [rtoRate, setRtoRate] = useState<number>(initialEconomics.rto_rate_pct || 18);
  const [forwardFreight, setForwardFreight] = useState<number>(initialEconomics.logistics_forward_pkr || 220);
  const [returnFreight, setReturnFreight] = useState<number>(120);
  const [cac, setCac] = useState<number>(initialEconomics.estimated_cac_pkr || 280);

  // Calculations
  const packaging = Math.round(sellingPrice * 0.035);
  const gatewayCodFee = Math.round(sellingPrice * 0.012 + 10);
  
  const deliveredOrders = Math.round(monthlyOrders * (1 - rtoRate / 100));
  const rejectedOrders = monthlyOrders - deliveredOrders;

  // Total Gross Revenue from delivered orders
  const grossDeliveredRevenue = deliveredOrders * sellingPrice;

  // COGS only on delivered goods (assuming rejected goods return to inventory, though repackaging cost PKR 40 each)
  const totalCogsDelivered = deliveredOrders * cogs;
  const totalPackagingAll = monthlyOrders * packaging;

  // Courier Costs:
  // Forward freight paid on ALL orders (both delivered and rejected)
  const totalForwardFreight = monthlyOrders * forwardFreight;
  // Return freight paid on REJECTED orders
  const totalReturnFreight = rejectedOrders * returnFreight;
  // Total COD handling & payment fee on delivered orders
  const totalGatewayFee = deliveredOrders * gatewayCodFee;
  // Repackaging loss on returned items (damaged boxes/polybags)
  const repackagingLoss = rejectedOrders * 60;
  // Total Marketing CAC spent across all orders
  const totalCacSpend = monthlyOrders * cac;

  // Net Profit in PKR
  const totalCosts = totalCogsDelivered + totalPackagingAll + totalForwardFreight + totalReturnFreight + totalGatewayFee + repackagingLoss + totalCacSpend;
  const netMonthlyProfit = grossDeliveredRevenue - totalCosts;
  const profitPerDeliveredOrder = deliveredOrders > 0 ? Math.round(netMonthlyProfit / deliveredOrders) : 0;
  const netMarginPct = grossDeliveredRevenue > 0 ? Math.round((netMonthlyProfit / grossDeliveredRevenue) * 1000) / 10 : 0;

  // Total RTO Dead-Loss
  const totalRtoDeadLoss = totalReturnFreight + (rejectedOrders * forwardFreight) + repackagingLoss;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">Interactive COD Return-to-Origin (RTO) Simulator</h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Pakistani Logistics Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate realistic bottom-line PKR profit after factoring in forward shipping, courier return charges, and typical Pakistani COD customer cancellations.
          </p>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-slate-400">Net Margin Status</div>
          <div className={`text-sm font-bold ${netMarginPct >= 18 ? 'text-emerald-400' : netMarginPct >= 8 ? 'text-amber-400' : 'text-rose-400'}`}>
            {netMarginPct >= 18 ? 'Viable (Healthy)' : netMarginPct >= 8 ? 'Vulnerable' : 'Critical (Unviable)'}
          </div>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Monthly Orders */}
        <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Monthly Order Volume</span>
            <span className="font-bold text-slate-200">{monthlyOrders.toLocaleString()} Orders</span>
          </div>
          <input
            type="range"
            min="50"
            max="2500"
            step="50"
            value={monthlyOrders}
            onChange={(e) => setMonthlyOrders(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>50 orders</span>
            <span>2,500 orders</span>
          </div>
        </div>

        {/* RTO Rejection Rate */}
        <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <span>COD RTO Rejection Rate</span>
              <span className="text-amber-400 font-mono">⚠️</span>
            </span>
            <span className={`font-bold ${rtoRate > 20 ? 'text-rose-400' : rtoRate > 15 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {rtoRate}% ({rejectedOrders} Returns)
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="40"
            step="1"
            value={rtoRate}
            onChange={(e) => setRtoRate(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>5% (Best Class)</span>
            <span>20% (Typical PK)</span>
            <span>40% (Worst)</span>
          </div>
        </div>

        {/* Selling Price in PKR */}
        <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Retail Price (PKR)</span>
            <span className="font-bold text-emerald-400">PKR {sellingPrice.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="800"
            max="15000"
            step="200"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>PKR 800</span>
            <span>PKR 15,000</span>
          </div>
        </div>
      </div>

      {/* Secondary Slider Inputs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800">
          <span className="text-slate-400 block text-[10px]">COGS per Unit</span>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-slate-400">PKR</span>
            <input
              type="number"
              value={cogs}
              onChange={(e) => setCogs(Number(e.target.value))}
              className="w-full bg-transparent font-semibold text-slate-200 outline-none text-xs"
            />
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800">
          <span className="text-slate-400 block text-[10px]">Forward Freight (Trax/CallCourier)</span>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-slate-400">PKR</span>
            <input
              type="number"
              value={forwardFreight}
              onChange={(e) => setForwardFreight(Number(e.target.value))}
              className="w-full bg-transparent font-semibold text-slate-200 outline-none text-xs"
            />
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800">
          <span className="text-slate-400 block text-[10px]">Return Freight Charge</span>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-slate-400">PKR</span>
            <input
              type="number"
              value={returnFreight}
              onChange={(e) => setReturnFreight(Number(e.target.value))}
              className="w-full bg-transparent font-semibold text-slate-200 outline-none text-xs"
            />
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800">
          <span className="text-slate-400 block text-[10px]">Meta Ad CAC (PKR)</span>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-slate-400">PKR</span>
            <input
              type="number"
              value={cac}
              onChange={(e) => setCac(Number(e.target.value))}
              className="w-full bg-transparent font-semibold text-slate-200 outline-none text-xs"
            />
          </div>
        </div>
      </div>

      {/* Real P&L Output Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Net Monthly Profit */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden">
          <div className="text-xs text-slate-400">Net Monthly P&L</div>
          <div className={`text-xl sm:text-2xl font-black mt-1 ${netMonthlyProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            PKR {netMonthlyProfit.toLocaleString()}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>Margin:</span>
            <span className="font-semibold text-slate-200">{netMarginPct}%</span>
          </div>
        </div>

        {/* Real Profit Per Delivered Order */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-xs text-slate-400">Profit / Delivered Order</div>
          <div className={`text-xl sm:text-2xl font-black mt-1 ${profitPerDeliveredOrder >= 0 ? 'text-white' : 'text-rose-400'}`}>
            PKR {profitPerDeliveredOrder.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Delivered: <span className="font-medium text-emerald-400">{deliveredOrders}</span> / {monthlyOrders}
          </div>
        </div>

        {/* Direct RTO Dead Loss */}
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40">
          <div className="text-xs text-amber-400 font-medium">Total RTO Courier Loss</div>
          <div className="text-xl sm:text-2xl font-black mt-1 text-amber-300">
            PKR {totalRtoDeadLoss.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] text-amber-400/80">
            {rejectedOrders} returned shipments
          </div>
        </div>

        {/* Gross Revenue */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-xs text-slate-400">Gross Realized Sales</div>
          <div className="text-xl sm:text-2xl font-black mt-1 text-slate-200">
            PKR {grossDeliveredRevenue.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            CAC Spend: PKR {totalCacSpend.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Courier Comparison Breakdown */}
      {rtoAnalysis?.courier_breakdown && rtoAnalysis.courier_breakdown.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <h4 className="text-xs font-semibold text-slate-300 mb-3 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pakistani Courier Tariff & Return Policy Matrix</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {rtoAnalysis.courier_breakdown.map((courier, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1">
                <div className="font-bold text-slate-200 flex items-center justify-between">
                  <span>{courier.courier_name}</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    {courier.avg_delivery_days}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px] pt-1">
                  <span>Forward Tariff:</span>
                  <span className="text-slate-200 font-mono">PKR {courier.estimated_tariff_pkr}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>RTO Return Fee:</span>
                  <span className="text-rose-300 font-mono">PKR {courier.rto_return_tariff_pkr}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>COD Charge:</span>
                  <span className="text-slate-300">{courier.cash_handling_fee}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
