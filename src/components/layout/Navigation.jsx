import React, { useState, useEffect } from 'react';
import { Home, FolderKanban, Layers, Briefcase, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', icon: <Home className="w-5 h-5" />, label: t('home') },
    { id: 'about', icon: <User className="w-5 h-5" />, label: t('about') },
    { id: 'projects', icon: <FolderKanban className="w-5 h-5" />, label: t('projects') },
    { id: 'skills', icon: <Layers className="w-5 h-5" />, label: t('skills') },
    { id: 'experience', icon: <Briefcase className="w-5 h-5" />, label: t('experience') },
    { id: 'contact', icon: <Mail className="w-5 h-5" />, label: t('contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Update active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && scrollPosition >= sections[i].offsetTop) {
          setActiveSection(navItems[i].id);
          break;
        }
      }

      // Update scroll progress
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
    >
      {/* Main Navigation Bar */}
      <div className="relative">
        {/* Glass effect background */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-2xl"></div>
        
        {/* Navigation Items */}
        <div className="relative flex items-center gap-1 px-3 py-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative flex flex-col items-center p-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                    : 'hover:bg-white/5'
                }`}
              >
                {/* Active indicator border */}
                {isActive && (
                  <div className="absolute inset-0 rounded-xl border border-blue-500/30" />
                )}

                {/* Icon */}
                <div className={`transition-colors duration-300 ${
                  isActive
                    ? 'text-blue-400'
                    : 'text-blue-300/60 group-hover:text-blue-300'
                }`}>
                  {item.icon}
                </div>

                {/* Label */}
                <span className={`text-xs mt-1 transition-colors duration-300 ${
                  isActive
                    ? 'text-blue-400 font-medium'
                    : 'text-blue-200/60 group-hover:text-blue-200'
                }`}>
                  {item.label}
                </span>

                {/* Active dot */}
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-400" />
                )}

                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-lg bg-slate-800 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-blue-500/20">
                  {item.label}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 border-r border-b border-blue-500/20"></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-700/50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </motion.nav>
  );
};

export default Navigation;