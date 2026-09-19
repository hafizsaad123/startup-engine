-- =========================================================================
-- STARTUP ENGINE PAKISTAN - SUPABASE DATABASE SCHEMA
-- Compliant with PostgreSQL + Supabase Auth + Strict Row Level Security (RLS)
-- =========================================================================

-- 1. Enable UUID Extension if not already active
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USERS PROFILE TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone_number VARCHAR(20),
  full_name VARCHAR(120) NOT NULL,
  company_name VARCHAR(150),
  city VARCHAR(80) DEFAULT 'Karachi',
  subscription_tier VARCHAR(30) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'founder_pro', 'investor_ready')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. VALIDATION REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.validations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  idea_title VARCHAR(255) NOT NULL,
  idea_description TEXT NOT NULL,
  target_market VARCHAR(100) NOT NULL,
  score INT NOT NULL CHECK (score >= 0 AND score <= 100),
  raw_ai_response JSONB NOT NULL,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. SUBSCRIPTION PAYMENTS / SLIP VERIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.payment_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  payment_method VARCHAR(50) NOT NULL, -- JazzCash, EasyPaisa, PayFast, Meezan Bank
  transaction_id VARCHAR(100) NOT NULL,
  amount_pkr NUMERIC(10, 2) NOT NULL,
  status VARCHAR(30) DEFAULT 'verified' CHECK (status IN ('pending', 'verified', 'rejected')),
  slip_image_url TEXT,
  verified_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_validations_user_id ON public.validations(user_id);
CREATE INDEX IF NOT EXISTS idx_validations_created_at ON public.validations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payment_receipts_user_id ON public.payment_receipts(user_id);

-- 6. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.validations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_receipts ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES FOR USERS TABLE:
-- Founders can only read and update their own profile
CREATE POLICY "Users can view own profile" 
  ON public.users 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.users 
  FOR UPDATE 
  USING (auth.uid() = id);

-- RLS POLICIES FOR VALIDATIONS TABLE:
-- Users can only SELECT, INSERT, UPDATE, and DELETE their own validation reports
CREATE POLICY "Users can view own validation reports" 
  ON public.validations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own validation reports" 
  ON public.validations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own validation reports" 
  ON public.validations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own validation reports" 
  ON public.validations 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS POLICIES FOR PAYMENT RECEIPTS:
CREATE POLICY "Users can view own payment receipts" 
  ON public.payment_receipts 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can submit payment receipts" 
  ON public.payment_receipts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- 7. TRIGGER: Automatic User Profile Creation on Supabase Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, company_name, phone_number, subscription_tier)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Pakistani Founder'),
    COALESCE(NEW.raw_user_meta_data->>'company_name', 'New Venture PK'),
    COALESCE(NEW.raw_user_meta_data->>'phone_number', '+923000000000'),
    'free'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
