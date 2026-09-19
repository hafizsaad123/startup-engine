import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { SlipUploadModal } from '../components/reports/SlipUploadModal';
import { CityTier } from '../types';
import { Settings, User, Building, Phone, MapPin, ShieldCheck, CreditCard, Sparkles, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { language, setLanguage } = useLanguage();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [companyName, setCompanyName] = useState(user?.company_name || '');
  const [phone, setPhone] = useState(user?.phone_number || '');
  const [city, setCity] = useState<CityTier>((user?.city as CityTier) || 'Lahore');
  const [saved, setSaved] = useState(false);
  const [slipModalOpen, setSlipModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || '');
      setCompanyName(user.company_name || '');
      setPhone(user.phone_number || '');
      if (user.city) setCity(user.city as CityTier);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({
      full_name: fullName.trim(),
      company_name: companyName.trim(),
      phone_number: phone.trim(),
      city,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Founder Account & Settings</h1>
        <p className="text-xs text-slate-400">Manage your Pakistani startup profile, localized billing, and notification preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left 2 Cols: Profile Form */}
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-200 text-sm pb-2 border-b border-slate-800">Founder Details</h3>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Startup / Company Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">WhatsApp / Phone</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:border-emerald-500 outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Base Operating City</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value as CityTier)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:border-emerald-500 outline-none"
                >
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad / Rawalpindi">Islamabad / Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Tier-2 & Tier-3 Nationwide">Tier-2 & Tier-3 Nationwide</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Default Platform Language</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`p-2 rounded-xl border font-semibold ${
                    language === 'en'
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  English (Default)
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('roman_urdu')}
                  className={`p-2 rounded-xl border font-semibold ${
                    language === 'roman_urdu'
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  Roman Urdu
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              {saved && (
                <span className="text-emerald-400 text-xs flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Saved successfully!
                </span>
              )}
              <button
                type="submit"
                className="ml-auto px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Right 1 Col: Billing Status Card */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-200 text-sm">Subscription Plan</h3>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px] block">Current Status</span>
              <div className="text-base font-bold text-emerald-400 uppercase">
                {user?.subscription_tier === 'investor_ready'
                  ? 'Investor Ready'
                  : user?.subscription_tier === 'founder_pro'
                  ? 'Founder Pro'
                  : 'Free Founder'}
              </div>
              <span className="text-[10px] text-slate-500">Auto-renews or lifetime license active</span>
            </div>

            <button
              type="button"
              onClick={() => setSlipModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-300 hover:bg-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <CreditCard className="w-4 h-4" />
              <span>Verify JazzCash / Bank Slip</span>
            </button>
          </div>

          {/* Supabase Database Connection Card */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-200 text-sm">Supabase Database</h3>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Connected
              </span>
            </div>
            <div className="space-y-2 p-3 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-[11px]">
              <div>
                <span className="text-slate-500 block text-[10px]">Project URL:</span>
                <span className="text-slate-300 truncate block">https://zjavgxypgehltixjculm.supabase.co</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Tables Provisioned:</span>
                <span className="text-emerald-400">profiles, validations, slip_verifications</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Security:</span>
                <span className="text-slate-300">RLS (Row Level Security) Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SlipUploadModal
        isOpen={slipModalOpen}
        onClose={() => setSlipModalOpen(false)}
        targetTier="founder_pro"
        amountPkr={4999}
      />
    </div>
  );
};
