import { UserProfile, ValidationReportData, BankSlipVerificationResult } from '../types';

// Mock/LocalStorage DB Key
const STORAGE_KEY_USER = 'startup_engine_pk_user';
const STORAGE_KEY_VALIDATIONS = 'startup_engine_pk_validations';

// Initial pre-seeded Pakistani startup validation reports
export const INITIAL_REPORTS: ValidationReportData[] = [
  {
    id: 'val-lahore-hyperlocal-groceries',
    user_id: 'user-demo-founder',
    idea_title: 'DukaanPay: WhatsApp Commerce + COD Trax Courier Sync for Wholesale',
    raw_input: {
      idea_title: 'DukaanPay: WhatsApp Commerce + COD Trax Courier Sync for Wholesale',
      idea_description: 'A no-code WhatsApp conversational ordering bot for Karachi Tariq Road & Bolton Market wholesalers to take orders, print automated courier booking labels with Trax/CallCourier, and reconcile COD cash return.',
      city: 'Karachi',
      monetization: 'COD E-commerce',
      target_sec: 'SEC B',
      expected_selling_price_pkr: 3200,
      estimated_cogs_pkr: 1800,
      courier_preference: 'Trax Logistics',
      language_mode: 'en',
    },
    overall_score: 84,
    score_pillars: {
      market_demand: 22,
      unit_economics: 21,
      payment_friction: 19,
      competitive_space: 22,
    },
    summary_one_liner: 'High-margin niche solving offline Karachi trader trust friction with native WhatsApp ordering and automated courier booking.',
    market_sizing: {
      tam_pkr: 'PKR 450 Billion',
      tam_usd: '$1.61 Billion',
      sam_pkr: 'PKR 85 Billion (Karachi & Lahore Wholesale Clusters)',
      som_pkr: 'PKR 2.4 Billion (Year 1-2 Serviceable Capturable)',
      sec_demographics_summary: 'Targeting 180,000 registered & informal SME retail traders across Karachi, Lahore, and Rawalpindi.',
      addressable_population: '1.2M SME traders in urban Pakistan',
    },
    unit_economics: {
      selling_price_pkr: 3200,
      cogs_pkr: 1800,
      packaging_pkr: 80,
      payment_gateway_fee_pkr: 47, // 1% COD charge + gateway
      logistics_forward_pkr: 220,
      rto_rate_pct: 14.5,
      rto_loss_provision_pkr: 125,
      estimated_cac_pkr: 280, // Meta CPM $1.10
      meta_cpm_usd: 1.15,
      net_contribution_margin_pkr: 648,
      net_margin_percentage: 20.25,
      verdict: 'Healthy',
    },
    rto_analysis: {
      rto_risk_level: 'Moderate',
      typical_rejection_rate: '14 - 18% in Urban Tier-1 (vs 28% in Interior Sindh)',
      root_causes: [
        'Fake orders / impulse booking without commitment',
        'Customer uncontactable during rider delivery attempt',
        'Delayed dispatch beyond 72 hours leading to buyer remorse',
      ],
      mitigation_tactics: [
        'Mandatory automated WhatsApp confirmation bot before dispatch',
        'Offer PKR 100 discount for advance EasyPaisa/JazzCash prepayment',
        'Rider geo-tracking integration with CallCourier / Trax API',
      ],
      courier_breakdown: [
        {
          courier_name: 'Trax Logistics',
          avg_delivery_days: '24 - 48 Hours',
          estimated_tariff_pkr: 210,
          cash_handling_fee: '1.2% or PKR 25 min',
          rto_return_tariff_pkr: 110,
        },
        {
          courier_name: 'CallCourier',
          avg_delivery_days: '24 - 36 Hours',
          estimated_tariff_pkr: 225,
          cash_handling_fee: '1.0% flat',
          rto_return_tariff_pkr: 120,
        },
        {
          courier_name: 'Leopards Courier',
          avg_delivery_days: '36 - 60 Hours',
          estimated_tariff_pkr: 250,
          cash_handling_fee: '1.5%',
          rto_return_tariff_pkr: 140,
        },
      ],
    },
    local_competitors: [
      {
        name: 'Daraz Seller Center',
        type: 'Incumbent',
        strength: 'Massive brand trust, captive logistics (DEX), integrated payment gateway.',
        weakness_to_exploit: 'Exorbitant 12-18% commission fees, 14-day payment settlement delay, no direct customer WhatsApp relationship.',
      },
      {
        name: 'Manual WhatsApp & Paper Khata',
        type: 'Informal / Bazari Competitor',
        strength: 'Zero learning curve, deeply entrenched relationship with local buyers.',
        weakness_to_exploit: 'Manual order entry errors, lost inventory, zero automated courier booking.',
      },
      {
        name: 'Dastgyr / Retailo (Pivoted)',
        type: 'Funded Startup',
        strength: 'Raised large seed/Series A capital.',
        weakness_to_exploit: 'Heavy asset burn, warehouse overhead, shifted focus away from purely asset-light SaaS.',
      },
    ],
    secp_compliance: {
      recommended_entity: 'Single Member Company (SMC-Pvt Ltd)',
      registration_cost_estimate_pkr: 'PKR 12,500 - 18,000 via SECP eServices',
      timeline_days: '5 to 8 working days',
      fbr_requirements: {
        ntn_required: true,
        strn_required: true,
        provincial_tax_authority: 'SRB (Sindh)',
        applicable_sales_tax_rate: '13% Sales Tax on IT Services (exempt under certain PSEB schemes)',
      },
      sbp_regulations_note: 'Subject to SBP PR-12 for merchant aggregators if holding escrow funds. Best to pass funds directly via Raast / PayFast.',
    },
    thirty_day_mvp_plan: [
      {
        week: 'Week 1',
        phase_title: 'Corporate Foundation & SECP Filing',
        key_deliverables: [
          'File SMC-Pvt Ltd on SECP eServices portal',
          'Open corporate bank account with Meezan or Bank Alfalah',
          'Sign Trax & CallCourier corporate merchant agreements',
        ],
        local_tools: ['SECP eServices', 'Meezan Corporate', 'Trax Portal'],
      },
      {
        week: 'Week 2',
        phase_title: 'WhatsApp Catalog & No-Code Bot Setup',
        key_deliverables: [
          'Setup WhatsApp Cloud API via WATI or native Meta Business Suite',
          'Upload 30 high-frequency wholesale SKUs with transparent PKR pricing',
          'Deploy automated COD confirmation template message',
        ],
        local_tools: ['Meta Business Manager', 'Trax API Webhook', 'Google Sheets Khata'],
      },
      {
        week: 'Week 3',
        phase_title: 'Hyperlocal Meta Ad Testing in Karachi',
        key_deliverables: [
          'Run localized Meta feed ads targeting Bolton Market & Saddar geotags',
          'Target local CPM ($0.80 - $1.40) with Urdu / Roman Urdu ad copy',
          'Achieve sub-PKR 250 WhatsApp chat acquisition cost',
        ],
        local_tools: ['Meta Ads Manager (PKR billing)', 'Canva Pro', 'WhatsApp Business'],
      },
      {
        week: 'Week 4',
        phase_title: 'First 100 Orders & COD Reconciliation',
        key_deliverables: [
          'Fulfill 100 orders with same-day rider dispatch',
          'Track RTO rate and verify courier reimbursement cycle',
          'Survey buyers on EasyPaisa 5% prepayment incentive',
        ],
        local_tools: ['Trax Merchant App', 'EasyPaisa Merchant QR', 'Customer Feedback Form'],
      },
    ],
    vc_thesis_match: {
      overall_investor_readiness_score: 78,
      matched_funds: [
        {
          fund_name: 'Indus Valley Capital',
          thesis_fit_score: 82,
          typical_check_size: '$300k - $1M (Pre-Seed/Seed)',
          focus_sectors: ['B2B Digitization', 'Commerce Infrastructure', 'Fintech'],
          partner_notes: 'Loves digitizing unorganized Pakistani merchant markets without capital-intensive physical warehousing.',
        },
        {
          fund_name: 'Sarmayacar',
          thesis_fit_score: 80,
          typical_check_size: '$500k - $2M',
          focus_sectors: ['Tech Enablement', 'Logistics Infrastructure'],
          partner_notes: 'Seeks strong unit economics with realistic RTO provision under 16% and sustainable contribution margin.',
        },
        {
          fund_name: 'Fatima Gobi Ventures',
          thesis_fit_score: 75,
          typical_check_size: '$200k - $1M',
          focus_sectors: ['Digital Commerce', 'Fintech Enablers'],
          partner_notes: 'Keen on regional scalability potential to GCC / MENAP.',
        },
      ],
      key_metrics_needed_for_pitch: [
        'Net Contribution Margin > 18% after COD courier return costs',
        'RTO rate consistently maintained below 15%',
        '30-day merchant retention cohort above 45%',
      ],
    },
    roman_urdu_summary: 'Yeh idea Karachi ke wholesale traders ke liye bohot solid hai. 70% log abhi bhi COD use karte hain, is liye Trax aur CallCourier ke sath automated WhatsApp confirmation lagana zaroori hai taake RTO 15% se kam rahay. SECP me SMC-Pvt Ltd banayein.',
    created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  {
    id: 'val-lahore-edtech-skills',
    user_id: 'user-demo-founder',
    idea_title: 'HunarGhar: Micro-Vocational Tech Apprenticeships in Roman Urdu',
    raw_input: {
      idea_title: 'HunarGhar: Micro-Vocational Tech Apprenticeships in Roman Urdu',
      idea_description: 'Affordable high-impact tech training (Shopify, AI Video Creation, Amazon VA) specifically delivered in Roman Urdu and local voice notes, targeting college students in Gujranwala, Sialkot, and Faisalabad with micro-installments via JazzCash & EasyPaisa.',
      city: 'Lahore',
      monetization: 'Services / WhatsApp Commerce',
      target_sec: 'SEC C',
      expected_selling_price_pkr: 4500,
      estimated_cogs_pkr: 1200,
      courier_preference: 'Digital Delivery',
      language_mode: 'roman_urdu',
    },
    overall_score: 89,
    score_pillars: {
      market_demand: 24,
      unit_economics: 23,
      payment_friction: 22,
      competitive_space: 20,
    },
    summary_one_liner: 'Zero-logistics digital product model riding the massive youth freelancer wave with JazzCash/EasyPaisa micro-installments.',
    market_sizing: {
      tam_pkr: 'PKR 120 Billion',
      tam_usd: '$430 Million',
      sam_pkr: 'PKR 28 Billion (Tier-2 Punjab College Youth)',
      som_pkr: 'PKR 950 Million',
      sec_demographics_summary: 'Targeting 2.5 million tier-2/3 Pakistani youth seeking remote digital income.',
      addressable_population: '4.8M youth enrolled in intermediate/diploma colleges',
    },
    unit_economics: {
      selling_price_pkr: 4500,
      cogs_pkr: 1200,
      packaging_pkr: 0,
      payment_gateway_fee_pkr: 112, // 2.5% JazzCash fee
      logistics_forward_pkr: 0,
      rto_rate_pct: 0,
      rto_loss_provision_pkr: 0,
      estimated_cac_pkr: 650, // Local TikTok / Meta Ad CPM
      meta_cpm_usd: 0.85,
      net_contribution_margin_pkr: 2538,
      net_margin_percentage: 56.4,
      verdict: 'Exceptional',
    },
    rto_analysis: {
      rto_risk_level: 'Low',
      typical_rejection_rate: '0% (Digital Course Delivery via WhatsApp & Portal)',
      root_causes: ['Payment drop-off on 3G connections', 'Lack of debit card ownership'],
      mitigation_tactics: [
        'Direct JazzCash Till ID / EasyPaisa QR code screenshot submission',
        'Automated AI OCR slip verification within 60 seconds',
        '2-part installment payment split (PKR 2,250 + PKR 2,250)',
      ],
      courier_breakdown: [],
    },
    local_competitors: [
      {
        name: 'Extreme Commerce / Enablers',
        type: 'Incumbent',
        strength: 'Huge historical brand recognition and video libraries.',
        weakness_to_exploit: 'High upfront fees (PKR 50k - 100k), outdated curricula, lack of micro-cohort 1-on-1 mentorship.',
      },
      {
        name: 'YouTube Free Content',
        type: 'Informal / Bazari Competitor',
        strength: '100% free.',
        weakness_to_exploit: 'Overwhelming, zero accountability, zero placement pipeline or local freelance clients.',
      },
    ],
    secp_compliance: {
      recommended_entity: 'Sole Proprietorship',
      registration_cost_estimate_pkr: 'PKR 3,500 - 5,000 (FBR NTN + Bank Account)',
      timeline_days: '2 to 3 days',
      fbr_requirements: {
        ntn_required: true,
        strn_required: false, // Under threshold for digital services
        provincial_tax_authority: 'PRA (Punjab)',
        applicable_sales_tax_rate: 'Exempt for PSEB-registered IT training export enablers',
      },
      sbp_regulations_note: 'Clean domestic flows. Qualifies for IT exporter tax holiday benefits if students earn FX via Freelance PR-Export accounts.',
    },
    thirty_day_mvp_plan: [
      {
        week: 'Week 1',
        phase_title: 'Curriculum & Video Snippets in Roman Urdu',
        key_deliverables: [
          'Record 10 practical 7-minute lessons on CapCut & Shopify store setup',
          'Create private WhatsApp community and welcome audio guide',
        ],
        local_tools: ['CapCut', 'Loom', 'WhatsApp Community'],
      },
      {
        week: 'Week 2',
        phase_title: 'Landing Page & JazzCash Payment Flow',
        key_deliverables: [
          'Build high-speed mobile-first page with student proof testimonials',
          'Integrate JazzCash / EasyPaisa payment QR + AI Slip Upload reader',
        ],
        local_tools: ['Next.js / Vite', 'PayFast', 'JazzCash Merchant'],
      },
      {
        week: 'Week 3',
        phase_title: 'TikTok & Instagram Reels Organic Sprint',
        key_deliverables: [
          'Post 15 student breakdown reels explaining "How to earn $15 on Fiverr"',
          'Collect 500 WhatsApp inbound leads with zero paid ad spend',
        ],
        local_tools: ['TikTok Creator', 'Meta Creator Studio', 'ManyChat'],
      },
      {
        week: 'Week 4',
        phase_title: 'Onboard 50 Paid Students & First Live Project',
        key_deliverables: [
          'Close 50 paid enrollments at PKR 4,500 each (PKR 225,000 revenue)',
          'Assist top 10 students in landing first local Pakistani client',
        ],
        local_tools: ['Zoom / Google Meet', 'EasyPaisa', 'Google Classroom'],
      },
    ],
    vc_thesis_match: {
      overall_investor_readiness_score: 85,
      matched_funds: [
        {
          fund_name: 'Zayn VC',
          thesis_fit_score: 88,
          typical_check_size: '$100k - $500k',
          focus_sectors: ['Future of Work', 'EdTech', 'Financial Inclusion'],
          partner_notes: 'Extremely bullish on Pakistan youth demographic dividend and export-earning enablement.',
        },
        {
          fund_name: 'Deosai Ventures',
          thesis_fit_score: 82,
          typical_check_size: '$150k - $400k',
          focus_sectors: ['Talent Platforms', 'B2B Services'],
          partner_notes: 'Prefers founders with strong organic social distribution in Tier-2/3 cities.',
        },
      ],
      key_metrics_needed_for_pitch: [
        'Customer Acquisition Cost (CAC) under PKR 700',
        'Student completion rate above 65%',
        'Percentage of students earning income within 60 days',
      ],
    },
    roman_urdu_summary: 'Bohat behtareen unit economics hain kyun ke koi physical courier ya COD ka jhanjhat nahi hai! EasyPaisa aur JazzCash se payment lena aasan hai. Punjab ke college youth ko target karein Roman Urdu me.',
    created_at: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
  },
];

// Supabase Local Store Helper
export const SupabaseStore = {
  getUser(): UserProfile | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    // Default demo user
    const defaultUser: UserProfile = {
      id: 'usr_pak_founder_01',
      email: 'founder@pakistanstartup.pk',
      full_name: 'Saad Ahmed',
      company_name: 'VentureScale Pakistan',
      phone_number: '+92 300 8472910',
      city: 'Lahore',
      subscription_tier: 'founder_pro',
      created_at: new Date().toISOString(),
    };
    this.saveUser(defaultUser);
    return defaultUser;
  },

  saveUser(user: UserProfile) {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch {
      // ignore
    }
  },

  getValidations(): ValidationReportData[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_VALIDATIONS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    this.saveValidations(INITIAL_REPORTS);
    return INITIAL_REPORTS;
  },

  getReports(): ValidationReportData[] {
    return this.getValidations();
  },

  getValidationById(id: string): ValidationReportData | undefined {
    const list = this.getValidations();
    return list.find((v) => v.id === id);
  },

  getReportById(id: string): ValidationReportData | undefined {
    return this.getValidationById(id);
  },

  saveValidations(validations: ValidationReportData[]) {
    try {
      localStorage.setItem(STORAGE_KEY_VALIDATIONS, JSON.stringify(validations));
    } catch {
      // ignore
    }
  },

  saveReport(report: ValidationReportData) {
    return this.addValidation(report);
  },

  addValidation(validation: ValidationReportData) {
    const existing = this.getValidations();
    const updated = [validation, ...existing.filter(v => v.id !== validation.id)];
    this.saveValidations(updated);
    return validation;
  },

  generateMockValidation(input: any): ValidationReportData {
    return {
      id: 'val-' + Date.now(),
      user_id: 'user-demo-founder',
      idea_title: input.title || input.idea_title || 'Pakistani Venture',
      raw_input: {
        idea_title: input.title || input.idea_title || 'Pakistani Venture',
        idea_description: input.description || input.idea_description || 'High-potential Pakistani venture',
        city: input.city || 'Lahore',
        monetization: input.monetization || 'Cash-on-Delivery (COD) Physical Goods',
        target_sec: input.target_sec || 'SEC B',
        expected_selling_price_pkr: 3200,
        estimated_cogs_pkr: 1400,
        courier_preference: 'Trax Logistics',
        language_mode: input.language_preference || 'both',
      },
      overall_score: 82,
      viability_score: 82,
      executive_summary: 'Promising localized model with healthy unit economics when WhatsApp re-confirmation is applied.',
      score_pillars: {
        market_demand: 22,
        unit_economics: 20,
        payment_friction: 19,
        competitive_space: 21,
      },
      summary_one_liner: 'Promising localized model with healthy unit economics when WhatsApp re-confirmation is applied.',
      market_sizing: {
        tam_pkr: 'PKR 320 Billion',
        tam_usd: '$1.14 Billion',
        sam_pkr: 'PKR 45 Billion',
        som_pkr: 'PKR 1.2 Billion',
        sec_demographics_summary: `Directly targets ${input.target_sec || 'SEC B'} urban consumers in ${input.city || 'Pakistan'}.`,
        addressable_population: '8.5 Million Pakistani urban households',
      },
      unit_economics: {
        selling_price_pkr: 3200,
        cogs_pkr: 1400,
        packaging_pkr: 90,
        payment_gateway_fee_pkr: 48,
        logistics_forward_pkr: 220,
        rto_rate_pct: 16.0,
        rto_loss_provision_pkr: 140,
        estimated_cac_pkr: 300,
        meta_cpm_usd: 1.2,
        net_contribution_margin_pkr: 680,
        net_margin_percentage: 21.25,
        verdict: 'Healthy',
      },
      rto_analysis: {
        rto_risk_level: 'Moderate',
        typical_rejection_rate: '15 - 18% in Urban Centers',
        root_causes: [
          'Impulse ordering without advance commitment',
          'Customer unavailable during rider arrival window',
          'Absence of doorstep dispatch notifications',
        ],
        mitigation_tactics: [
          'Automated WhatsApp bot confirmation before dispatch',
          'Incentivize EasyPaisa/JazzCash prepayment with PKR 150 discount',
          'Tier-based courier routing (Trax for Tier-1, CallCourier for Tier-2)',
        ],
        courier_breakdown: [
          {
            courier_name: 'Trax Logistics',
            avg_delivery_days: '24 - 48 Hours',
            estimated_tariff_pkr: 220,
            rto_return_tariff_pkr: 110,
            cash_handling_fee: '1% of COD value',
          },
          {
            courier_name: 'CallCourier',
            avg_delivery_days: '48 Hours',
            estimated_tariff_pkr: 210,
            rto_return_tariff_pkr: 105,
            cash_handling_fee: '1.2% of COD value',
          },
          {
            courier_name: 'M&P / Leopards',
            avg_delivery_days: '24 - 72 Hours',
            estimated_tariff_pkr: 250,
            rto_return_tariff_pkr: 125,
            cash_handling_fee: '1.5% of COD value',
          },
        ],
      },
      thirty_day_mvp_plan: [
        {
          week: 'Week 1',
          phase_title: 'Demand Testing & WhatsApp Funnel Setup',
          actions: [
            'Create Shopify / WooCommerce storefront configured in PKR',
            'Connect WhatsApp Business API via Wati or AiSensy for instant automated order confirmation',
            'Set up Meta Business Manager targeting Karachi/Lahore with $30 test budget',
          ],
          recommended_tools: ['WhatsApp Business API', 'Shopify PK', 'Meta Ads Manager'],
          estimated_cost_pkr: 'PKR 15,000 - 25,000',
        },
        {
          week: 'Week 2',
          phase_title: 'Courier API Integration & Inventory Buffer',
          actions: [
            'Open Trax Logistics corporate merchant portal account with corporate NTN',
            'Integrate automated shipping label generation directly from store checkout',
            'Secure initial small-batch inventory from local wholesale center',
          ],
          recommended_tools: ['Trax Merchant Portal', 'CallCourier API', 'Excel Khata'],
          estimated_cost_pkr: 'PKR 40,000 - 60,000',
        },
        {
          week: 'Week 3',
          phase_title: 'Paid Meta Ads Scaling & RTO Reduction Testing',
          actions: [
            'Launch high-converting Video ads filmed in conversational Urdu',
            'Test advance prepayment discount (PKR 150 off for EasyPaisa/JazzCash)',
            'Monitor COD return rates and call customers within 15 minutes of ordering',
          ],
          recommended_tools: ['CapCut', 'Meta Advantage+ Ads', 'JazzCash Merchant QR'],
          estimated_cost_pkr: 'PKR 50,000 - 80,000',
        },
        {
          week: 'Week 4',
          phase_title: 'First 100 Delivered Orders & Cash Reconciliation',
          actions: [
            'Audit courier COD cash return timeline (check 7-10 day remittance bank clearing)',
            'Review net contribution margin per delivered order',
            'Initiate SECP SMC-Pvt Ltd incorporation via eServices',
          ],
          recommended_tools: ['Meezan Corporate Banking', 'SECP eServices Portal'],
          estimated_cost_pkr: 'PKR 25,000 - 35,000',
        },
      ],
      secp_compliance: {
        recommended_entity: 'Single Member Company (SMC-Pvt Ltd)',
        entity_rationale: 'Protects personal assets from commercial and supplier liabilities while retaining 100% solo founder ownership and enabling corporate banking.',
        registration_cost_estimate_pkr: 'PKR 14,000 - 18,000',
        timeline_days: '5 to 7 working days via SECP eServices',
        provincial_tax_authority: 'PRA (Punjab Revenue Authority) 16% / SRB (Sindh) 13%',
        sbp_regulations_note: 'Ensure local card processing is routed through PayFast or Safepay to avoid cross-border foreign currency restrictions.',
      },
      local_competitors: [
        {
          name: 'Daraz Marketplace',
          type: 'Incumbent Marketplace',
          threat_level: 'Medium',
          weakness_to_exploit: 'High seller commissions (15-22%), delayed merchant payouts (14 days), and impersonal customer interaction.',
        },
        {
          name: 'Traditional Wholesale Markets (Bolton / Shah Alam)',
          type: 'Offline Wholesale',
          threat_level: 'High',
          weakness_to_exploit: 'Physical travel required, zero digital tracking, manual cash friction, and non-transparent pricing.',
        },
      ],
      vc_thesis_match: {
        overall_investor_readiness_score: 79,
        matched_funds: [
          {
            fund_name: 'Indus Valley Capital',
            thesis_fit_score: 83,
            reasoning: 'Strong alignment with Pakistani supply chain digitization and digital-first consumption.',
          },
          {
            fund_name: 'Sarmayacar',
            thesis_fit_score: 80,
            reasoning: 'Matches thesis on tech-enabled commerce and scalable B2B/D2C unit economics.',
          },
          {
            fund_name: 'Fatima Gobi Ventures',
            thesis_fit_score: 74,
            reasoning: 'Attractive regional scale potential with sustainable contribution margins.',
          },
        ],
      },
    };
  },

  deleteValidation(id: string) {
    const existing = this.getValidations();
    const updated = existing.filter(v => v.id !== id);
    this.saveValidations(updated);
  },

  updateUserTier(tier: 'free' | 'founder_pro' | 'investor_ready') {
    const user = this.getUser();
    if (user) {
      user.subscription_tier = tier;
      this.saveUser(user);
    }
    return user;
  }
};
