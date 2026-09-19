import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageToggle: React.FC<{ variant?: 'header' | 'inline' }> = ({ variant = 'header' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`inline-flex items-center rounded-lg bg-slate-900/80 p-1 border border-slate-800 ${variant === 'header' ? 'text-xs' : 'text-sm'}`}>
      <div className="flex items-center gap-1.5 px-2 text-slate-400">
        <Globe className="w-3.5 h-3.5 text-emerald-400" />
      </div>
      <button
        id="lang-btn-en"
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-md font-medium transition-all ${
          language === 'en'
            ? 'bg-emerald-600 text-white shadow-sm'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        English
      </button>
      <button
        id="lang-btn-urdu"
        type="button"
        onClick={() => setLanguage('roman_urdu')}
        className={`px-2.5 py-1 rounded-md font-medium transition-all ${
          language === 'roman_urdu'
            ? 'bg-emerald-600 text-white shadow-sm'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        Roman Urdu
      </button>
    </div>
  );
};
