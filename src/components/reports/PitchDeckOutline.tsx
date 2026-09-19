import React, { useState } from 'react';
import { ValidationReportData } from '../../types';
import { Presentation, Download, Copy, Check, ExternalLink, X, TrendingUp, DollarSign } from 'lucide-react';

interface PitchDeckOutlineProps {
  report: ValidationReportData;
  isOpen: boolean;
  onClose: () => void;
}

export const PitchDeckOutline: React.FC<PitchDeckOutlineProps> = ({
  report,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const slides = [
    {
      slide_num: 1,
      title: 'Slide 1: Cover & Local Mission',
      content: `${report.idea_title} — Modern solution built for Pakistani consumers & SMEs.`,
      key_bullets: [
        `Target Market: ${report.raw_input.city} & Urban Pakistan`,
        `Monetization: ${report.raw_input.monetization}`,
        `Founder contact & SECP registered status`,
      ],
    },
    {
      slide_num: 2,
      title: 'Slide 2: The Pakistani Market Problem',
      content: 'Current retail and commerce frictions that Silicon Valley templates ignore.',
      key_bullets: [
        '70%+ cash dependency and trust friction among local buyers',
        'High courier return rates (18-25% RTO) draining early-stage merchant margins',
        'Heavy commissions and delayed settlement from legacy incumbents',
      ],
    },
    {
      slide_num: 3,
      title: 'Slide 3: The Solution & WhatsApp-First Loop',
      content: 'Frictionless, native experience adapted to Pakistani smartphone habits.',
      key_bullets: [
        'Direct WhatsApp conversational order confirmation & customer support',
        'Automated Trax / CallCourier API synchronization',
        'Prepayment incentives via EasyPaisa / JazzCash reducing RTO',
      ],
    },
    {
      slide_num: 4,
      title: 'Slide 4: Market Sizing (TAM / SAM / SOM in PKR & USD)',
      content: `Total Addressable Market calibrated to Pakistan's demographics.`,
      key_bullets: [
        `TAM: ${report.market_sizing.tam_pkr} (${report.market_sizing.tam_usd})`,
        `SAM: ${report.market_sizing.sam_pkr}`,
        `SOM: ${report.market_sizing.som_pkr}`,
        `Demographic focus: ${report.raw_input.target_sec} population`,
      ],
    },
    {
      slide_num: 5,
      title: 'Slide 5: Local Unit Economics & Contribution Margin',
      content: 'Real bottom-line profitability after forward freight, return freight, and payment commissions.',
      key_bullets: [
        `Selling Price: PKR ${report.unit_economics.selling_price_pkr}`,
        `COGS + Packaging: PKR ${report.unit_economics.cogs_pkr + report.unit_economics.packaging_pkr}`,
        `Net Contribution Margin: PKR ${report.unit_economics.net_contribution_margin_pkr} (${report.unit_economics.net_margin_percentage}%)`,
        `Estimated CAC: PKR ${report.unit_economics.estimated_cac_pkr} (Meta CPM ~$${report.unit_economics.meta_cpm_usd})`,
      ],
    },
    {
      slide_num: 6,
      title: 'Slide 6: Logistics & COD RTO Mitigation Engine',
      content: 'How we engineer defensibility against delivery rejection losses.',
      key_bullets: [
        `RTO Risk Index: ${report.rto_analysis.rto_risk_level}`,
        'Automated WhatsApp 1-click order re-confirmation pre-dispatch',
        'Courier performance routing (Trax vs CallCourier SLA routing)',
      ],
    },
    {
      slide_num: 7,
      title: 'Slide 7: Competitive Moat vs Incumbents',
      content: 'Why Daraz, manual wholesale markets, or foreign competitors will not displace us.',
      key_bullets: report.local_competitors.map((c) => `${c.name} (${c.type}): We exploit ${c.weakness_to_exploit}`),
    },
    {
      slide_num: 8,
      title: 'Slide 8: 30-Day Go-To-Market Execution',
      content: 'Hyper-local milestone roadmap to acquire first 100 paying customers.',
      key_bullets: report.thirty_day_mvp_plan.map((p) => `${p.week}: ${p.phase_title}`),
    },
    {
      slide_num: 9,
      title: 'Slide 9: Team & Local Ground Execution Edge',
      content: 'Experienced operators with direct access to local supply chains, tech, and marketing.',
      key_bullets: [
        'Domain expertise in Pakistani wholesale distribution & digital acquisition',
        'Direct partnerships with courier aggregators and payment gateways',
        'SECP corporate governance compliant from day one',
      ],
    },
    {
      slide_num: 10,
      title: 'Slide 10: The Ask & Local VC Thesis Alignment',
      content: `Seeking Pre-Seed / Seed funding aligned with regional venture partners.`,
      key_bullets: [
        `Investor Readiness Score: ${report.vc_thesis_match.overall_investor_readiness_score}/100`,
        `Matched Pakistani Funds: ${report.vc_thesis_match.matched_funds.map((f) => f.fund_name).join(', ')}`,
        'Use of funds: 50% localized marketing & CAC, 30% courier float & working capital, 20% engineering',
      ],
    },
  ];

  const handleCopy = () => {
    const fullText = slides
      .map((s) => `${s.title}\n${s.content}\n${s.key_bullets.map((b) => `• ${b}`).join('\n')}\n`)
      .join('\n---\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6 text-slate-100 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">10-Slide Investor Pitch Deck Outline (Pakistani VCs)</h3>
              <p className="text-xs text-slate-400">Structured for Indus Valley Capital, Sarmayacar, Fatima Gobi, & Zayn VC</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Deck' : 'Copy All Slides'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* VC Alignment Banner */}
        <div className="mt-4 p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-indigo-300">VC Thesis Fit Score: {report.vc_thesis_match.overall_investor_readiness_score}/100</span>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Matched with top funds looking for high-margin Pakistani businesses with defensible unit economics.
            </p>
          </div>
          <div className="flex gap-2 text-[10px]">
            {report.vc_thesis_match.matched_funds.map((f, i) => (
              <span key={i} className="px-2 py-1 rounded bg-slate-900 border border-indigo-500/20 text-indigo-200 font-medium">
                {f.fund_name} ({f.thesis_fit_score}%)
              </span>
            ))}
          </div>
        </div>

        {/* Slides Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {slides.map((slide) => (
            <div
              key={slide.slide_num}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">{slide.title}</span>
                <span className="text-[10px] text-slate-400 font-mono">Slide {slide.slide_num}/10</span>
              </div>
              <p className="text-slate-400 text-[11px] italic">{slide.content}</p>
              <ul className="space-y-1 text-[11px] text-slate-300 pt-2 border-t border-slate-800/80">
                {slide.key_bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 leading-none">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-400">Export as formatted text or paste into Google Slides / Pitch.com</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
