-- Supabase SQL Schema for Startup Engine Pakistan
-- Project: https://zjavgxypgehltixjculm.supabase.co
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/zjavgxypgehltixjculm/sql)

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  company_name TEXT,
  phone_number TEXT,
  city TEXT,
  subscription_tier TEXT DEFAULT 'founder_pro',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Validations Table
CREATE TABLE IF NOT EXISTS public.validations (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  idea_title TEXT NOT NULL,
  overall_score NUMERIC DEFAULT 80,
  viability_score NUMERIC DEFAULT 80,
  raw_input JSONB DEFAULT '{}'::jsonb,
  score_pillars JSONB DEFAULT '{}'::jsonb,
  market_sizing JSONB DEFAULT '{}'::jsonb,
  unit_economics JSONB DEFAULT '{}'::jsonb,
  rto_analysis JSONB DEFAULT '{}'::jsonb,
  local_competitors JSONB DEFAULT '[]'::jsonb,
  secp_compliance JSONB DEFAULT '{}'::jsonb,
  thirty_day_mvp_plan JSONB DEFAULT '[]'::jsonb,
  vc_thesis_match JSONB DEFAULT '{}'::jsonb,
  roman_urdu_summary TEXT,
  summary_one_liner TEXT,
  executive_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Slip Verifications Table
CREATE TABLE IF NOT EXISTS public.slip_verifications (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  transaction_id TEXT,
  bank_name TEXT,
  amount_pkr NUMERIC,
  verified BOOLEAN DEFAULT TRUE,
  status_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) & Public Access Policies for Publishable Key
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.validations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slip_verifications ENABLE ROW LEVEL SECURITY;

-- Allow anon read/write with publishable key
CREATE POLICY "Allow public read on profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public write on profiles" ON public.profiles FOR ALL USING (true);

CREATE POLICY "Allow public read on validations" ON public.validations FOR SELECT USING (true);
CREATE POLICY "Allow public write on validations" ON public.validations FOR ALL USING (true);

CREATE POLICY "Allow public read on slip_verifications" ON public.slip_verifications FOR SELECT USING (true);
CREATE POLICY "Allow public write on slip_verifications" ON public.slip_verifications FOR ALL USING (true);
