import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Sparkles, Moon, Sun,
  ChevronDown, Globe, User, Briefcase,
  Cpu, Calendar, Mail, Home, Zap
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

import logoImg from '../images/wit.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
  const { theme, toggleTheme } = useTheme();
  const { t, changeLanguage, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map(item => item.id);
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('home') || 'Home', icon: Home },
    { id: 'about', label: t('about') || 'About', icon: User },
    { id: 'projects', label: t('projects') || 'Projects', icon: Briefcase },
    { id: 'skills', label: t('skills') || 'Skills', icon: Cpu },
    { id: 'experience', label: t('experience') || 'Experience', icon: Calendar },
    { id: 'contact', label: t('contact') || 'Contact', icon: Mail },
  ];

  const languages = [
    { code: 'en', label: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'rw', label: 'RW', name: 'Kinyarwanda', flag: '🇷🇼' },
  ];

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const offset = 80;
        const pos = el.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: pos - offset, behavior: 'smooth' });
      } else if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const currentLanguage = languages.find(l => l.code === language) || languages[0];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-2 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 backdrop-blur-xl shadow-lg border-b border-blue-500/20'
          : 'py-4 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 group cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-blue-500/25 border border-blue-500/30 bg-gradient-to-br from-blue-500 to-purple-600">
                  <img
                    src={logoImg}
                    alt="Witness Fabrice"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Witness Fabrice
                </h1>
                <p className="text-xs text-blue-200/80 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-400" />
                  Full Stack Developer
                </p>
              </div>
            </motion.div>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      active
                        ? 'text-white bg-blue-500/20 shadow-lg shadow-blue-500/25'
                        : 'text-blue-100/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-blue-400' : 'text-blue-300/60'}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3">
              {/* LANGUAGE */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium flex items-center gap-2 hover:bg-white/10"
                >
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="text-white">{currentLanguage.label}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${
                    showLanguageDropdown ? 'rotate-180' : ''
                  }`} />
                </button>

                <AnimatePresence>
                  {showLanguageDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 w-48 rounded-xl bg-slate-800 border border-blue-500/20 overflow-hidden"
                    >
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            changeLanguage(lang.code);
                            setShowLanguageDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-sm flex items-center justify-between ${
                            language === lang.code
                              ? 'bg-blue-500/30 text-white'
                              : 'text-blue-100/80 hover:bg-blue-500/20 hover:text-white'
                          }`}
                        >
                          <span>{lang.flag} {lang.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* THEME */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2.5 rounded-lg bg-white/5 border border-white/10"
              >
                {theme === 'dark'
                  ? <Sun className="w-5 h-5 text-yellow-400" />
                  : <Moon className="w-5 h-5 text-blue-300" />
                }
              </motion.button>

              {/* MOBILE MENU */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2.5 rounded-lg bg-white/5 border border-white/10"
              >
                {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="h-20"></div>
    </>
  );
};

export default Header;