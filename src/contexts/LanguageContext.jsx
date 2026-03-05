import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const LanguageContext = createContext();

// 1. Enhanced Translations Object
const translations = {
  en: {
    home: "Home",
    about: "About",
    welcome: "Welcome",
    projects: "Projects",
    skills: "Skills",
    experience: "Experience",
    contact: "Contact",
    viewProjects: "View Projects",
    exploreMore: "Explore More",
    portfolioViews: "Portfolio Views",
    clients: "Clients",
    satisfaction: "Satisfaction",
    trySaying: "Try saying",
    or: "or",
    theme: "Theme",
    language: "Language",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    english: "English",
    french: "French",
    kinyarwanda: "Kinyarwanda",
    downloadCV: "Download CV",
    hireMe: "Hire Me",
    viewAll: "View All",
    liveDemo: "Live Demo",
    sourceCode: "Source Code",
    technologies: "Technologies",
    role: "Role",
    duration: "Duration",
    achievements: "Achievements",
    sendMessage: "Send Message",
    yourName: "Your Name",
    yourEmail: "Your Email",
    message: "Message",
    submit: "Submit",
    loading: "Loading...",
    success: "Success!",
    error: "Error!",
    connected: "Connected",
    disconnected: "Disconnected",
    online: "Online",
    offline: "Offline"
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
    portfolioViews: "Vues du portfolio",
    clients: "Clients",
    satisfaction: "Satisfaction",
    trySaying: "Essayez de dire",
    or: "ou",
    theme: "Thème",
    language: "Langue",
    darkMode: "Mode sombre",
    lightMode: "Mode clair",
    english: "Anglais",
    french: "Français",
    kinyarwanda: "Kinyarwanda",
    downloadCV: "Télécharger CV",
    hireMe: "Engagez-moi",
    viewAll: "Voir tout",
    liveDemo: "Démo en direct",
    sourceCode: "Code source",
    technologies: "Technologies",
    role: "Rôle",
    duration: "Durée",
    achievements: "Réalisations",
    sendMessage: "Envoyer le message",
    yourName: "Votre nom",
    yourEmail: "Votre email",
    message: "Message",
    submit: "Soumettre",
    loading: "Chargement...",
    success: "Succès !",
    error: "Erreur !",
    connected: "Connecté",
    disconnected: "Déconnecté",
    online: "En ligne",
    offline: "Hors ligne"
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
    portfolioViews: "Abasuye",
    clients: "Abakiriya",
    satisfaction: "Abanyuzwe",
    trySaying: "Gerageza kuvuga",
    or: "cyangwa",
    theme: "Ishusho",
    language: "Ururimi",
    darkMode: "Umukara",
    lightMode: "Umweru",
    english: "Icyongereza",
    french: "Igifaransa",
    kinyarwanda: "Kinyarwanda",
    downloadCV: "Kuramo CV",
    hireMe: "Mpe akazi",
    viewAll: "Reba byose",
    liveDemo: "Yerekane",
    sourceCode: "Kode",
    technologies: "Ikoranabuhanga",
    role: "Umwanya",
    duration: "Igihe",
    achievements: "Ibyagezweho",
    sendMessage: "Ohereza ubutumwa",
    yourName: "Izina ryawe",
    yourEmail: "Imeli yawe",
    message: "Ubutumwa",
    submit: "Ohereza",
    loading: "Biratunganywa...",
    success: "Byakunze!",
    error: "Ikosa!",
    connected: "Bihujwe",
    disconnected: "Byahagaze",
    online: "Kuri murandasi",
    offline: "Ntabwo uri kuri murandasi"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-language') || 'en';
    }
    return 'en';
  });

  // 2. Wrap t function in useCallback to prevent unnecessary re-renders
  const t = useCallback((key) => {
    // Priority: Current Language -> English Fallback -> Key Name
    return translations[language]?.[key] || translations['en'][key] || key;
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('portfolio-language', lang);
    // Add a slight haptic feel by changing the document language attribute
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};