import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Zap,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  KeyRound,
  ArrowRight,
} from 'lucide-react';

interface ForgotPasswordPageProps {
  onNavigate: (path: string) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const { resetPassword, updatePassword, isRecoveryMode } = useAuth();

  // Reset request states
  const [email, setEmail] = useState('');
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);

  // New password update states (when in recovery mode)
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestError(null);
    setRequestLoading(true);

    const result = await resetPassword(email);
    setRequestLoading(false);

    if (result.success) {
      setRequestSuccess(true);
    } else {
      setRequestError(result.message || 'Failed to send reset link. Please check the email entered.');
    }
  };

  const handleSetNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateError(null);

    if (newPassword.length < 8) {
      setUpdateError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setUpdateError('Passwords do not match. Please verify.');
      return;
    }

    setUpdateLoading(true);
    const result = await updatePassword(newPassword);
    setUpdateLoading(false);

    if (result.success) {
      setUpdateSuccess(true);
      setTimeout(() => {
        onNavigate('/login');
      }, 2500);
    } else {
      setUpdateError(result.message || 'Failed to update password. Recovery session may have expired.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md space-y-6">
          {/* Back Navigation */}
          <button
            type="button"
            onClick={() => onNavigate('/login')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </button>

          {/* Heading */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {isRecoveryMode ? 'Set New Founder Password' : 'Reset Account Password'}
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              {isRecoveryMode
                ? 'Your cryptographic recovery token has been verified. Enter your new password below.'
                : 'Enter your registered founder email and Supabase will dispatch a secure recovery token.'}
            </p>
          </div>

          {/* Alert: Error */}
          {(requestError || updateError) && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-semibold text-rose-200">Action Failed</p>
                <p className="text-[11px] text-rose-300/90 leading-relaxed">
                  {requestError || updateError}
                </p>
              </div>
            </div>
          )}

          {/* Recovery Mode: Update Password Form */}
          {isRecoveryMode ? (
            updateSuccess ? (
              <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Password Updated Successfully!</h4>
                <p className="text-xs text-slate-300">
                  Your credentials have been securely refreshed in Supabase. Redirecting to login...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSetNewPassword} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">New Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="new-password"
                      placeholder="Min. 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
                  <label className="block text-slate-300 font-medium mb-1">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="new-password"
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-xs font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={updateLoading}
                  className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 active:scale-[0.99] transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {updateLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                      Updating Credentials in Supabase...
                    </span>
                  ) : (
                    <>
                      <span>Save New Password</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )
          ) : /* Standard Mode: Request Reset Link */
          requestSuccess ? (
            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">Check Your Inbox</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Supabase Auth has dispatched a password reset link to{' '}
                <span className="text-emerald-300 font-semibold">{email}</span>.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 text-left">
                Click the reset link in your email to open the recovery screen and set a new password.
              </div>
              <button
                type="button"
                onClick={() => setRequestSuccess(false)}
                className="text-xs text-slate-400 hover:text-white underline pt-1"
              >
                Send to a different email address
              </button>
            </div>
          ) : (
            <form onSubmit={handleRequestReset} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Registered Founder Email</label>
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

              <button
                type="submit"
                disabled={requestLoading}
                className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 active:scale-[0.99] transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {requestLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    Connecting to Supabase Auth...
                  </span>
                ) : (
                  <>
                    <span>Send Cryptographic Reset Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Security Guarantee */}
          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-center gap-3 text-[11px] text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Supabase Cryptographic Token Verification</span>
          </div>
        </div>
      </div>
    </div>
  );
};
