// ==========================================
// STARTUP ENGINE PAKISTAN - SHARED TYPES & MODELS
// ==========================================

export type CityTier =
  | 'Karachi'
  | 'Lahore'
  | 'Islamabad / Rawalpindi'
  | 'Faisalabad'
  | 'Multan'
  | 'Peshawar'
  | 'Tier-2 & Tier-3 Nationwide';

export type IndustryVertical =
  | 'eCommerce & D2C'
  | 'FinTech & Digital Payments'
  | 'AgriTech & Rural Supply'
  | 'B2B Supply Chain & Logistics'
  | 'HealthTech & Pharmacy'
  | 'EdTech & Skill Development'
  | 'SaaS & Developer Tools'
  | 'Quick Commerce & Food Delivery';

export type SECTarget =
  | 'SEC A (Affluent & High Tech)'
  | 'SEC B (Middle Class & Small Business)'
  | 'SEC C (Mass Market Retailers)'
  | 'SEC D/E (Low Income / Tier-3)';

export type MonetizationModel =
  | 'Cash-on-Delivery (COD) Physical Goods'
  | 'Prepaid Online (JazzCash / EasyPaisa / 1Link)'
  | 'B2B Credit & Invoice Khata'
  | 'Monthly Subscription (EasyPaisa/JazzCash)'
  | 'Wholesale Margin & Distribution Fee';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  company_name?: string;
  phone_number?: string;
  city?: CityTier | string;
  subscription_tier: 'free' | 'founder_pro' | 'investor_ready';
  created_at: string;
}

export interface StartupIdeaInput {
  title: string;
  description: string;
  industry: IndustryVertical;
  city: CityTier;
  target_sec: SECTarget;
  monetization: MonetizationModel;
  language_preference?: 'english' | 'roman_urdu' | 'both';
  expected_selling_price_pkr?: number;
  estimated_cogs_pkr?: number;
  courier_preference?: string;
}

export interface ValidationInput {
  idea_title: string;
  idea_description: string;
  city: string;
  monetization: string;
  target_sec: string;
  expected_selling_price_pkr?: number;
  estimated_cogs_pkr?: number;
  courier_preference?: string;
  language_mode?: 'en' | 'roman_urdu' | 'both';
  industry?: string;
}

export interface ScorePillars {
  market_demand: number; // out of 25
  unit_economics: number; // out of 25
  payment_friction: number; // out of 25
  competitive_space: number; // out of 25
}

export interface UnitEconomicsData {
  selling_price_pkr: number;
  cogs_pkr: number;
  packaging_pkr: number;
  payment_gateway_fee_pkr: number;
  logistics_forward_pkr: number;
  rto_rate_pct: number;
  rto_loss_provision_pkr?: number;
  rto_deadweight_loss_pkr?: number;
  estimated_cac_pkr: number;
  meta_cpm_usd: number;
  net_contribution_margin_pkr: number;
  net_margin_percentage: number;
  verdict?: 'Healthy' | 'Fragile' | 'Unviable' | 'Exceptional' | string;
}

export interface RTORiskAnalysis {
  rto_risk_level: 'Low' | 'Moderate' | 'High' | 'Severe' | string;
  typical_rejection_rate: string;
  root_causes: string[];
  mitigation_tactics: string[];
  courier_breakdown: {
    courier_name: string;
    avg_delivery_days: string;
    estimated_tariff_pkr: number;
    cash_handling_fee: string;
    rto_return_tariff_pkr: number;
  }[];
}

export interface LocalCompetitor {
  name: string;
  type: string;
  strength?: string;
  threat_level?: string;
  weakness_to_exploit: string;
}

export interface SECPComplianceGuidance {
  recommended_entity: string;
  entity_rationale?: string;
  registration_cost_estimate_pkr: string;
  timeline_days: string;
  provincial_tax_authority?: string;
  fbr_requirements?: {
    ntn_required: boolean;
    strn_required: boolean;
    provincial_tax_authority: string;
    applicable_sales_tax_rate: string;
  };
  sbp_regulations_note: string;
}

export interface MVPPlanStep {
  week: string;
  phase_title: string;
  actions?: string[];
  key_deliverables?: string[];
  recommended_tools?: string[];
  local_tools?: string[];
  estimated_cost_pkr?: string;
}

export interface VCMatchAnalysis {
  overall_investor_readiness_score: number;
  matched_funds: {
    fund_name: string;
    thesis_fit_score: number;
    reasoning?: string;
    typical_check_size?: string;
    focus_sectors?: string[];
    partner_notes?: string;
  }[];
  key_metrics_needed_for_pitch?: string[];
}

export interface ValidationReportData {
  id: string;
  user_id?: string;
  idea_title: string;
  raw_input: any;
  viability_score?: number;
  overall_score?: number;
  score_pillars?: ScorePillars;
  executive_summary?: string;
  summary_one_liner?: string;
  market_sizing: {
    tam_pkr: string;
    tam_usd: string;
    sam_pkr: string;
    som_pkr: string;
    sec_demographics_summary?: string;
    addressable_population?: string;
  };
  unit_economics: UnitEconomicsData;
  rto_analysis: RTORiskAnalysis;
  local_competitors: LocalCompetitor[];
  secp_compliance: SECPComplianceGuidance;
  thirty_day_mvp_plan: MVPPlanStep[];
  vc_thesis_match: VCMatchAnalysis;
  executive_summary_roman_urdu?: string;
  roman_urdu_summary?: string;
  created_at?: string;
}

export interface BankSlipVerificationResult {
  transaction_id: string;
  bank_name: string;
  amount_pkr: number;
  date: string;
  verified: boolean;
  status_message: string;
}
