import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    welcome: "Welcome",
    projects: "Projects",
    skills: "Skills",
    experience: "Experience",
    contact: "Contact",
    
    // UI Elements
    viewProjects: "View Projects",
    exploreMore: "Explore More",
    trySaying: "Try saying",
    or: "or",
    theme: "Theme",
    language: "Language",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    downloadCV: "Download CV",
    hireMe: "Hire Me",
    
    // Voice Assistant / Intro (New)
    aiAssistant: "Witness_OS Assistant",
    aiGreeting: "Hello! I am Witness's digital assistant. How can I help you today?",
    witnessBio: "Witness Fabrice is a Full-Stack Architect specialized in high-performance web experiences. He bridges the gap between cinematic design and robust backend engineering.",
    navigatingTo: "Navigating to",
    
    // Form & Status
    sendMessage: "Send Message",
    yourName: "Your Name",
    yourEmail: "Your Email",
    message: "Message",
    submit: "Submit",
    loading: "Loading...",
    success: "Success!",
    error: "Error!",
    online: "System Online",
    offline: "Connection Lost"
  },
  fr: {
    home: "Accueil",
    about: "À propos",
    welcome: "Bienvenue",
    projects: "Projets",
    skills: "Compétences",
    experience: "Expérience",
    contact: "Contact",
    viewProjects: "Voir les projets",
    exploreMore: "Explorer plus",
    trySaying: "Essayez de dire",
    or: "ou",
    theme: "Thème",
    language: "Langue",
    darkMode: "Mode sombre",
    lightMode: "Mode clair",
    downloadCV: "Télécharger le CV",
    hireMe: "Engagez-moi",
    
    // Voice Assistant / Intro
    aiAssistant: "Assistant Witness_OS",
    aiGreeting: "Bonjour! Je suis l'assistant numérique de Witness. Comment puis-je vous aider?",
    witnessBio: "Witness Fabrice est un architecte Full-Stack spécialisé dans les expériences web haute performance. Il fait le pont entre le design cinématographique et l'ingénierie backend.",
    navigatingTo: "Navigation vers",

    sendMessage: "Envoyer le message",
    yourName: "Votre nom",
    yourEmail: "Votre e-mail",
    message: "Message",
    submit: "Envoyer",
    loading: "Chargement...",
    success: "Succès !",
    error: "Erreur !",
    online: "Système en ligne",
    offline: "Connexion perdue"
  },
  rw: {
    home: "Ahabanza",
    about: "Ibijyanye",
    welcome: "Murakaza neza",
    projects: "Imishinga",
    skills: "Ubuhanga",
    experience: "Ubunararibonye",
    contact: "Twandikire",
    viewProjects: "Reba imishinga",
    exploreMore: "Shakisha byinshi",
    trySaying: "Gerageza kuvuga",
    or: "cyangwa",
    theme: "Ishusho",
    language: "Ururimi",
    darkMode: "Umukara",
    lightMode: "Umweru",
    downloadCV: "Kuramo CV",
    hireMe: "Mpe akazi",
    
    // Voice Assistant / Intro
    aiAssistant: "Umuhamagazi wa Witness_OS",
    aiGreeting: "Muraho! Ndi umufasha wa Witness mu buryo bw'ikoranabuhanga. Nagufasha iki uyu munsi?",
    witnessBio: "Witness Fabrice ni umuhanga mu kubaka imbuga za internet (Full-Stack). Akora ibijyanye n'ishusho ndetse na kode zikomeye zicunga imbuga.",
    navigatingTo: "Turajya kuri",

    sendMessage: "Ohereza ubutumwa",
    yourName: "Izina ryawe",
    yourEmail: "Imeli yawe",
    message: "Ubutumwa",
    submit: "Ohereza",
    loading: "Biratunganywa...",
    success: "Byakunze!",
    error: "Ikosa!",
    online: "Birakora",
    offline: "Murandasi yakatse"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-language') || 'en';
    }
    return 'en';
  });

  // t function: Priority: Language -> English -> Key
  const t = useCallback((key) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('portfolio-language', lang);
    document.documentElement.lang = lang;
  };

  // Sync Voice Assistant Language Accent
  useEffect(() => {
    const speech = window.speechSynthesis;
    if (speech) {
      speech.cancel(); // Stop any speaking when language changes
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};