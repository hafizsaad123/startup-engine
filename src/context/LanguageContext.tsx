import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'roman_urdu';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultEn?: string, romanUrdu?: string) => string;
}

const translations: Record<string, { en: string; roman_urdu: string }> = {
  // Nav
  'nav.home': { en: 'Home', roman_urdu: 'Home' },
  'nav.about': { en: 'Why Pakistan?', roman_urdu: 'Kyun Pakistan?' },
  'nav.pricing': { en: 'PKR Pricing', roman_urdu: 'PKR Qeemat' },
  'nav.dashboard': { en: 'Dashboard', roman_urdu: 'Dashboard' },
  'nav.validate': { en: 'Validate Idea', roman_urdu: 'Idea Check Karein' },
  'nav.login': { en: 'Login', roman_urdu: 'Login Karein' },
  'nav.signup': { en: 'Get Started Free', roman_urdu: 'Muft Shuru Karein' },

  // Hero
  'hero.badge': { en: 'Tailored 100% for Pakistan Startup Realities', roman_urdu: '100% Pakistani Ground Realities Par Mabni' },
  'hero.title_1': { en: 'Validate Your Startup Against', roman_urdu: 'Apne Pakistani Startup Ko' },
  'hero.title_2': { en: 'Real Pakistani Ground Realities', roman_urdu: 'Asal Ground Realities Par Validate Karein' },
  'hero.subtitle': { 
    en: 'Silicon Valley AI advice fails in Pakistan. Our engine calculates real PKR unit economics, 15-25% COD rejection loss (RTO), SECP legal entities, and matches you with Pakistani VCs like Indus Valley & Sarmayacar.', 
    roman_urdu: 'Amriki AI tools Pakistan me fail ho jatay hain. Hamara engine real PKR unit economics, 15-25% Cash on Delivery (COD) nuksan, SECP tax rules, aur local Pakistani VCs ki alignment check karta hai.' 
  },
  'hero.cta_primary': { en: 'Validate My Idea in 60s', roman_urdu: '60 Seconds Me Idea Check Karein' },
  'hero.cta_secondary': { en: 'Explore Sample Report (PKR)', roman_urdu: 'Sample Report Dekhein' },

  // Trust badges
  'trust.secp': { en: 'SECP Compliant Guidance', roman_urdu: 'SECP Company Guidance' },
  'trust.fbr': { en: 'FBR NTN & Sales Tax Rules', roman_urdu: 'FBR Tax aur STRN Checklist' },
  'trust.cod': { en: 'Trax / CallCourier COD Calibrated', roman_urdu: 'Local Courier COD RTO Model' },
  'trust.vc': { en: 'Pakistani VC Alignment Matrix', roman_urdu: 'Local VCs Se Alignment' },

  // Common buttons
  'btn.new_validation': { en: 'Start New Validation', roman_urdu: 'Naya Idea Validate Karein' },
  'btn.view_report': { en: 'View Full Report', roman_urdu: 'Mukammal Report Dekhein' },
  'btn.download_pdf': { en: 'Download PDF Report', roman_urdu: 'PDF Report Download Karein' },
  'btn.share_whatsapp': { en: 'Share to WhatsApp', roman_urdu: 'WhatsApp Par Bhejein' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('startup_engine_lang') as Language;
    if (saved === 'en' || saved === 'roman_urdu') {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('startup_engine_lang', lang);
  };

  const t = (key: string, defaultEn?: string, romanUrdu?: string): string => {
    if (translations[key]) {
      return language === 'roman_urdu' ? translations[key].roman_urdu : translations[key].en;
    }
    if (language === 'roman_urdu' && romanUrdu) return romanUrdu;
    return defaultEn || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
