import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { SupabaseStore } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (data: { full_name: string; email: string; company_name: string; phone_number: string; city: string }) => Promise<boolean>;
  logout: () => void;
  updateTier: (tier: 'free' | 'founder_pro' | 'investor_ready') => void;
  updateUser: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Load from local Supabase store
    const existing = SupabaseStore.getUser();
    setUser(existing);
  }, []);

  const login = async (email: string): Promise<boolean> => {
    // Simulate quick Supabase auth
    const updatedUser: UserProfile = {
      id: user?.id || 'usr_pak_founder_01',
      email: email || 'founder@pakistanstartup.pk',
      full_name: user?.full_name || 'Saad Ahmed',
      company_name: user?.company_name || 'VentureScale Pakistan',
      phone_number: user?.phone_number || '+92 300 8472910',
      city: user?.city || 'Lahore',
      subscription_tier: user?.subscription_tier || 'founder_pro',
      created_at: user?.created_at || new Date().toISOString(),
    };
    SupabaseStore.saveUser(updatedUser);
    setUser(updatedUser);
    return true;
  };

  const signup = async (data: { full_name: string; email: string; company_name: string; phone_number: string; city: string }): Promise<boolean> => {
    const newUser: UserProfile = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email: data.email,
      full_name: data.full_name,
      company_name: data.company_name,
      phone_number: data.phone_number,
      city: data.city,
      subscription_tier: 'free',
      created_at: new Date().toISOString(),
    };
    SupabaseStore.saveUser(newUser);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    // Create guest/free user or clear
    const guestUser: UserProfile = {
      id: 'usr_guest',
      email: 'guest@startupengine.pk',
      full_name: 'Guest Founder',
      company_name: 'Stealth Venture',
      subscription_tier: 'free',
      created_at: new Date().toISOString(),
    };
    SupabaseStore.saveUser(guestUser);
    setUser(guestUser);
  };

  const updateTier = (tier: 'free' | 'founder_pro' | 'investor_ready') => {
    const updated = SupabaseStore.updateUserTier(tier);
    if (updated) setUser({ ...updated });
  };

  const updateUser = (data: Partial<UserProfile>) => {
    if (user) {
      const updated: UserProfile = { ...user, ...data };
      SupabaseStore.saveUser(updated);
      setUser(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && user.id !== 'usr_guest',
        login,
        signup,
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
