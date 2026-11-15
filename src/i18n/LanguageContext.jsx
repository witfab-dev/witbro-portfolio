import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './en';
import fr from './fr';

const dictionaries = { en, fr };
const STORAGE_KEY = 'witfabrice-locale';
const LanguageContext = createContext(null);

function getInitialLocale() {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && dictionaries[stored]) return stored;
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(getInitialLocale);
  const content = dictionaries[locale];

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = content.htmlLang;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', content.meta.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', content.meta.title);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', content.meta.description);
  }, [locale, content]);

  const setLanguage = useCallback((next) => {
    if (dictionaries[next]) setLocale(next);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLocale((current) => (current === 'en' ? 'fr' : 'en'));
  }, []);

  const value = useMemo(
    () => ({ locale, content, setLanguage, toggleLanguage }),
    [locale, content, setLanguage, toggleLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useI18n must be used inside LanguageProvider');
  return context;
}
