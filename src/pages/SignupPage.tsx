import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CityTier } from '../types';
import {
  Zap,
  ArrowRight,
  Lock,
  Mail,
  User,
  Building,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Check,
  X,
} from 'lucide-react';

interface SignupPageProps {
  onNavigate: (path: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
  const { signup, isAuthenticated } = useAuth();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState<CityTier>('Lahore');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ message: string; needsConfirmation: boolean } | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      onNavigate('/dashboard');
    }
  }, [isAuthenticated, onNavigate]);

  // Password strength calculation
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  
  const strengthScore = [hasMinLength, hasNumber, hasMixedCase, hasSpecial].filter(Boolean).length;
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!hasMinLength) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter your confirmation password.');
      return;
    }

    setLoading(true);
    const result = await signup({
      full_name: fullName.trim(),
      email: email.trim(),
      password,
      company_name: companyName.trim() || 'New Venture PK',
      phone_number: phone.trim() ? (phone.startsWith('+92') ? phone.trim() : `+92 ${phone.trim()}`) : '+92 300 0000000',
      city,
    });
    setLoading(false);

    if (result.success) {
      if (result.needsEmailConfirmation) {
        setSuccessInfo({
          message: result.message || 'Supabase has sent a verification link to your email address.',
          needsConfirmation: true,
        });
      } else {
        onNavigate('/dashboard/validate');
      }
    } else {
      setErrorMessage(result.message || 'Could not complete registration. Please try again.');
    }
  };

  // If email confirmation screen is needed
  if (successInfo?.needsConfirmation) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <Mail className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">Verify Your Email</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              We have dispatched a cryptographic verification link from Supabase Auth to{' '}
              <span className="text-emerald-400 font-semibold">{email}</span>.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 text-left space-y-1.5">
            <p className="font-semibold text-slate-300">Next Steps:</p>
            <p>1. Open your email inbox (and spam/promotions tab if needed).</p>
            <p>2. Click the Supabase verification link to activate your founder credentials.</p>
            <p>3. Return here and sign in to access your dashboard.</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/login')}
            className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all shadow-lg"
          >
            Go to Founder Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6">
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2 cursor-pointer mb-1 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-bold group-hover:bg-emerald-400 transition-colors">
                <Zap className="h-5 w-5 fill-current" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">STARTUP ENGINE PK</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Create Founder Account</h2>
            <p className="text-xs text-slate-400">
              Join Pakistani founders validating with real COD margins, RTO buffers & SECP guidelines
            </p>
          </div>

          {/* Alert: Error */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-semibold text-rose-200">Registration Error</p>
                <p className="text-[11px] text-rose-300/90 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Saad Ahmed"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">WhatsApp / Phone</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="0300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Founder Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="founder@venture.pk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Startup / Idea Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. KhaasPay"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Base City</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value as CityTier)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-xs"
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
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-950 border ${
                      confirmPassword.length > 0
                        ? passwordsMatch
                          ? 'border-emerald-500/60'
                          : 'border-rose-500/60'
                        : 'border-slate-800'
                    } text-slate-200 placeholder:text-slate-600 focus:outline-none text-xs font-mono`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Strength Meter */}
            {password.length > 0 && (
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800/80 space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Password Security:</span>
                  <span
                    className={`font-semibold ${
                      strengthScore <= 1
                        ? 'text-rose-400'
                        : strengthScore <= 2
                        ? 'text-amber-400'
                        : strengthScore === 3
                        ? 'text-emerald-400'
                        : 'text-emerald-300'
                    }`}
                  >
                    {strengthScore <= 1
                      ? 'Weak'
                      : strengthScore <= 2
                      ? 'Moderate'
                      : strengthScore === 3
                      ? 'Strong'
                      : 'Very Strong'}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 h-1.5">
                  <div
                    className={`rounded-full ${
                      strengthScore >= 1 ? 'bg-rose-500' : 'bg-slate-800'
                    }`}
                  ></div>
                  <div
                    className={`rounded-full ${
                      strengthScore >= 2 ? 'bg-amber-500' : 'bg-slate-800'
                    }`}
                  ></div>
                  <div
                    className={`rounded-full ${
                      strengthScore >= 3 ? 'bg-emerald-500' : 'bg-slate-800'
                    }`}
                  ></div>
                  <div
                    className={`rounded-full ${
                      strengthScore >= 4 ? 'bg-emerald-400' : 'bg-slate-800'
                    }`}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400 pt-1">
                  <span className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {hasMinLength ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} At least 8 chars
                  </span>
                  <span className={`flex items-center gap-1 ${hasNumber ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {hasNumber ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Has a number
                  </span>
                  <span className={`flex items-center gap-1 ${hasMixedCase ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {hasMixedCase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Upper & lower case
                  </span>
                  <span
                    className={`flex items-center gap-1 ${
                      passwordsMatch ? 'text-emerald-400' : 'text-slate-500'
                    }`}
                  >
                    {passwordsMatch ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Passwords match
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 active:scale-[0.99] transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  Securing Credentials in Supabase...
                </span>
              ) : (
                <>
                  <span>Create Registered Founder Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center text-xs text-slate-400">
            Already registered?{' '}
            <button
              type="button"
              onClick={() => onNavigate('/login')}
              className="text-emerald-400 font-semibold hover:text-emerald-300 hover:underline transition-colors"
            >
              Sign In to Your Account
            </button>
          </div>

          {/* Security Guarantee */}
          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-center gap-4 text-[11px] text-slate-500 font-medium">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Supabase PBKDF2/Bcrypt Security</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-700"></div>
            <span>Row-Level Security (RLS) Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
