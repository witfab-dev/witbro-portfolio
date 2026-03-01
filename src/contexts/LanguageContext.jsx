import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const translations = {
  en: {
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
    welcome: "Murakaza neza",
    projects: "Porogaramu",
    skills: "Ubuhanga",
    experience: "Ubuyobozi",
    contact: "Twandikire",
    viewProjects: "Reba porogaramu",
    exploreMore: "Sobanukirwa byinshi",
    portfolioViews: "Kureba portfolio",
    clients: "Abakiriya",
    satisfaction: "Gushimishwa",
    trySaying: "Gerageza kuvuga",
    or: "cyangwa",
    theme: "Ishusho",
    language: "Ururimi",
    darkMode: "Uburyo bwirabura",
    lightMode: "Uburyo bwerurutso",
    english: "Icyongereza",
    french: "Igifaransa",
    kinyarwanda: "Kinyarwanda",
    downloadCV: "Kuramo CV",
    hireMe: "Mpaye",
    viewAll: "Reba byose",
    liveDemo: "Demo y'ubuzima",
    sourceCode: "Kode y'ingingo",
    technologies: "Ikoranabuhanga",
    role: "Umwanya",
    duration: "Igihe",
    achievements: "Ibyagezweho",
    sendMessage: "Ohereza ubutumwa",
    yourName: "Izina ryawe",
    yourEmail: "Email yawe",
    message: "Ubutumwa",
    submit: "Ohereza",
    loading: "Birangira...",
    success: "Byakunze!",
    error: "Ikosa!",
    connected: "Byahuwe",
    disconnected: "Byahakanye",
    online: "Kuri interineti",
    offline: "Ntabwo kuri interineti"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('portfolio-language');
    return savedLang || 'en';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-language', language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};