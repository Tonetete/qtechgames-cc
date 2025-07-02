import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-3 mr-auto">
      <button
        className={`flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${
          i18n.language === 'en'
            ? 'border-blue-500 scale-110'
            : 'border-gray-300 opacity-70 hover:opacity-100'
        }`}
        onClick={() => changeLanguage('en')}
        title="English"
      >
        <span className="flag-icon">🇬🇧</span>
      </button>

      <button
        className={`flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${
          i18n.language === 'es'
            ? 'border-blue-500 scale-110'
            : 'border-gray-300 opacity-70 hover:opacity-100'
        }`}
        onClick={() => changeLanguage('es')}
        title="Español"
      >
        <span className="flag-icon">🇪🇸</span>
      </button>
    </div>
  );
};
