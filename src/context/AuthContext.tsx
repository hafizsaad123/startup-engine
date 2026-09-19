import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { SupabaseStore, supabase, SUPABASE_URL } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isDemoUser: boolean;
  isLoading: boolean;
  isRecoveryMode: boolean;
  isSupabaseConnected: boolean;
  supabaseProjectUrl: string;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  loginWithMagicLink: (email: string) => Promise<{ success: boolean; message?: string }>;
  loginAsDemo: () => void;
  signup: (data: { full_name: string; email: string; password: string; company_name: string; phone_number: string; city: string }) => Promise<{ success: boolean; message?: string; needsEmailConfirmation?: boolean }>;
  resetPassword: (email: string) => Promise<{ success: boolean; message?: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateTier: (tier: 'free' | 'founder_pro' | 'investor_ready') => void;
  updateUser: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRecoveryMode, setIsRecoveryMode] = useState<boolean>(false);
  const [isSupabaseConnected] = useState<boolean>(true);

  useEffect(() => {
    // Detect password recovery in URL hash or query params
    if (typeof window !== 'undefined') {
      const hash = window.location.hash || '';
      if (hash.includes('type=recovery') || hash.includes('access_token=')) {
        setIsRecoveryMode(true);
      }
    }

    // Initial load from store & Supabase session
    const loadUser = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const profile = await SupabaseStore.getUserAsync();
          if (profile) {
            setUser(profile);
          }
        } else {
          // Check local storage for existing session
          const cached = SupabaseStore.getUser();
          if (cached) {
            setUser(cached);
          }
        }
      } catch (err) {
        console.warn('Auth session check notice:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();

    // Listen to Supabase auth state transitions
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecoveryMode(true);
      }

      if (session?.user) {
        const profile = await SupabaseStore.getUserAsync();
        if (profile) {
          setUser(profile);
        }
      } else if (event === 'SIGNED_OUT') {
        SupabaseStore.clearUser();
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    if (!email || !email.trim()) {
      return { success: false, message: 'Please enter your registered founder email address.' };
    }
    if (!password) {
      return { success: false, message: 'Please enter your account password.' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        // Return clear, user-friendly security error messages
        if (error.message.includes('Invalid login credentials')) {
          return { success: false, message: 'Incorrect email or password. Please verify your credentials.' };
        }
        if (error.message.includes('Email not confirmed')) {
          return { success: false, message: 'Your email has not been confirmed yet. Please check your inbox for the Supabase confirmation link.' };
        }
        return { success: false, message: error.message };
      }

      if (data.user) {
        const profile = await SupabaseStore.getUserAsync();
        if (profile) {
          setUser(profile);
        }
        return { success: true };
      }

      return { success: false, message: 'Unable to authenticate with Supabase. Please check your details.' };
    } catch (err: any) {
      return { success: false, message: err?.message || 'A network error occurred while connecting to Supabase.' };
    }
  };

  const loginWithMagicLink = async (email: string): Promise<{ success: boolean; message?: string }> => {
    if (!email || !email.trim()) {
      return { success: false, message: 'Please enter a valid email address for the Magic Link.' };
    }

    try {
      const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : undefined;
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true, message: 'Secure login link dispatched! Check your inbox to sign in instantly.' };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Failed to dispatch magic link.' };
    }
  };

  const loginAsDemo = () => {
    // Isolated Demo Sandbox Session — explicitly marked as sandbox demo
    const demoUser: UserProfile = {
      id: 'usr_demo_sandbox',
      email: 'demo.founder@pakistanstartup.pk',
      full_name: 'Demo Founder (Sandbox Mode)',
      company_name: 'Stealth Pakistani Venture',
      phone_number: '+92 300 1234567',
      city: 'Lahore',
      subscription_tier: 'founder_pro',
      created_at: new Date().toISOString(),
      is_demo: true,
    };
    SupabaseStore.saveUser(demoUser);
    setUser(demoUser);
  };

  const signup = async (data: {
    full_name: string;
    email: string;
    password: string;
    company_name: string;
    phone_number: string;
    city: string;
  }): Promise<{ success: boolean; message?: string; needsEmailConfirmation?: boolean }> => {
    if (!data.email || !data.email.trim()) {
      return { success: false, message: 'Email address is required.' };
    }
    if (!data.password || data.password.length < 8) {
      return { success: false, message: 'Password must be at least 8 characters long.' };
    }

    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email.trim(),
        password: data.password,
        options: {
          data: {
            full_name: data.full_name,
            company_name: data.company_name,
            phone_number: data.phone_number,
            city: data.city,
          },
        },
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          return { success: false, message: 'An account with this email already exists. Please sign in instead.' };
        }
        return { success: false, message: error.message };
      }

      if (authData.user) {
        const newUser: UserProfile = {
          id: authData.user.id,
          email: data.email.trim(),
          full_name: data.full_name,
          company_name: data.company_name,
          phone_number: data.phone_number,
          city: data.city,
          subscription_tier: 'free',
          created_at: new Date().toISOString(),
          is_demo: false,
        };

        // Persist profile to Supabase public.profiles table
        await SupabaseStore.saveUserAsync(newUser);
        SupabaseStore.saveUser(newUser);

        // Check if email confirmation is required
        if (!authData.session) {
          return {
            success: true,
            needsEmailConfirmation: true,
            message: 'Account created! Supabase has dispatched a verification link to your email. Please verify before signing in.',
          };
        }

        setUser(newUser);
        return { success: true, message: 'Account successfully registered and connected to Supabase.' };
      }

      return { success: false, message: 'Could not complete registration. Please try again.' };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Error occurred while connecting to Supabase.' };
    }
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message?: string }> => {
    if (!email || !email.trim()) {
      return { success: false, message: 'Please enter your registered email address.' };
    }

    try {
      const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/reset-password` : undefined;
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo,
      });

      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true, message: 'Password reset link sent to your email.' };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Failed to send password reset email.' };
    }
  };

  const updatePassword = async (newPassword: string): Promise<{ success: boolean; message?: string }> => {
    if (!newPassword || newPassword.length < 8) {
      return { success: false, message: 'New password must be at least 8 characters.' };
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { success: false, message: error.message };
      }
      setIsRecoveryMode(false);
      return { success: true, message: 'Your password has been successfully updated in Supabase.' };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Failed to update password.' };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      // ignore
    }
    SupabaseStore.clearUser();
    setUser(null);
  };

  const updateTier = (tier: 'free' | 'founder_pro' | 'investor_ready') => {
    const updated = SupabaseStore.updateUserTier(tier);
    if (updated) setUser({ ...updated });
  };

  const updateUser = async (data: Partial<UserProfile>) => {
    if (user) {
      const updated: UserProfile = { ...user, ...data };
      SupabaseStore.saveUser(updated);
      setUser(updated);
      if (!user.is_demo) {
        await SupabaseStore.saveUserAsync(updated);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && !user.is_demo,
        isDemoUser: !!user?.is_demo,
        isLoading,
        isRecoveryMode,
        isSupabaseConnected,
        supabaseProjectUrl: SUPABASE_URL,
        login,
        loginWithMagicLink,
        loginAsDemo,
        signup,
        resetPassword,
        updatePassword,
        logout,
        updateTier,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

