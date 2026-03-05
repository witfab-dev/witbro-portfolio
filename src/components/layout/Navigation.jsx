import React, { useState, useEffect } from 'react';
import { Home, FolderKanban, Layers, Briefcase, Mail, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
      // 1. Update active section with intersection logic
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && scrollPosition >= sections[i].offsetTop) {
          setActiveSection(navItems[i].id);
          break;
        }
      }

      // 2. Update scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for header if any
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.5 }}
      className="fixed bottom-6 left-1/2 z-50 flex flex-col items-center gap-4"
    >
      {/* Tooltip Area (Handled by group-hover on buttons) */}

      <div className="relative group/nav px-2 py-2 bg-slate-950/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-1">
        {/* Animated Background Highlight */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/5 to-purple-500/5 pointer-events-none" />

        {navItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative p-3 md:p-4 rounded-xl transition-all duration-300 group outline-none`}
              aria-label={item.label}
            >
              {/* Sliding Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="nav-glow"
                  className="absolute inset-0 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Icon */}
              <div className={`relative z-10 transition-all duration-300 transform group-hover:scale-110 ${
                isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'
              }`}>
                {item.icon}
              </div>

              {/* Floating Label (Tooltip) */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg border border-white/10 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                {item.label}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-white/10" />
              </div>

              {/* Active Dot */}
              {isActive && (
                <motion.div 
                  layoutId="nav-dot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]" 
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Progress Bar Container */}
      <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        />
      </div>
    </motion.nav>
  );
};

export default Navigation;