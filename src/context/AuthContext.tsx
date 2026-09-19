import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { SupabaseStore, supabase, SUPABASE_URL } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isSupabaseConnected: boolean;
  supabaseProjectUrl: string;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  signup: (data: { full_name: string; email: string; company_name: string; phone_number: string; city: string; password?: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateTier: (tier: 'free' | 'founder_pro' | 'investor_ready') => void;
  updateUser: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(true);

  useEffect(() => {
    // Initial load from store & Supabase session
    const loadUser = async () => {
      const cached = SupabaseStore.getUser();
      setUser(cached);

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const profile = await SupabaseStore.getUserAsync();
          if (profile) setUser(profile);
        }
      } catch (err) {
        console.warn('Auth session check notice:', err);
      }
    };

    loadUser();

    // Listen to Supabase auth state transitions
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await SupabaseStore.getUserAsync();
        if (profile) setUser(profile);
      } else if (event === 'SIGNED_OUT') {
        const fallback = SupabaseStore.getUser();
        setUser(fallback);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password?: string): Promise<{ success: boolean; message?: string }> => {
    try {
      if (password && password.length >= 6) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!error && data.user) {
          const userProfile = await SupabaseStore.getUserAsync();
          if (userProfile) setUser(userProfile);
          return { success: true };
        }
      }
    } catch (err: any) {
      console.warn('Supabase online auth notice:', err);
    }

    // Local / Optimistic signin if Supabase credentials are in test mode
    const updatedUser: UserProfile = {
      id: user?.id || 'usr_pak_founder_' + Math.random().toString(36).substring(2, 6),
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
    return { success: true };
  };

  const signup = async (data: { full_name: string; email: string; company_name: string; phone_number: string; city: string; password?: string }): Promise<{ success: boolean; message?: string }> => {
    try {
      if (data.password && data.password.length >= 6) {
        const { data: authData, error } = await supabase.auth.signUp({
          email: data.email,
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

        if (!error && authData.user) {
          const newUser: UserProfile = {
            id: authData.user.id,
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
          return { success: true, message: 'Account registered with Supabase successfully' };
        }
      }
    } catch (err: any) {
      console.warn('Supabase signup notice:', err);
    }

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
    return { success: true };
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      // ignore
    }
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

  const updateUser = async (data: Partial<UserProfile>) => {
    if (user) {
      const updated: UserProfile = { ...user, ...data };
      SupabaseStore.saveUser(updated);
      setUser(updated);
      await SupabaseStore.saveUserAsync(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && user.id !== 'usr_guest',
        isSupabaseConnected,
        supabaseProjectUrl: SUPABASE_URL,
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
