import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, Sun, Moon, Globe, ChevronDown, User, 
  Briefcase, Cpu, Calendar, Mail, Home, Zap, Sparkles 
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import logoImg from '../images/wit.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
  const { theme, toggleTheme } = useTheme();
  const { t, changeLanguage, language } = useLanguage();
  const { scrollY } = useScroll();

  // Dynamic animations based on scroll depth
  const headerWidth = useTransform(scrollY, [0, 100], ['100%', '92%']);
  const headerY = useTransform(scrollY, [0, 100], [0, 15]);
  const borderRadius = useTransform(scrollY, [0, 100], [0, 24]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
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

  const currentLanguage = languages.find(l => l.code === language) || languages[0];

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: id === 'home' ? 0 : offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.header
        style={{ 
          width: headerWidth, 
          y: headerY, 
          borderRadius,
          left: '50%',
          x: '-50%'
        }}
        className={`fixed top-0 z-50 transition-colors duration-300 border-x border-b ${
          theme === 'dark' 
            ? 'bg-slate-950/80 border-white/10' 
            : 'bg-white/80 border-slate-200'
        } backdrop-blur-xl shadow-2xl overflow-visible`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* LOGO SECTION */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => scrollToSection('home')}
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-blue-500/20 group-hover:ring-blue-500/50 transition-all">
                <img src={logoImg} alt="Logo" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />
              </div>
              <div className="hidden lg:block">
                <h1 className={`text-sm font-black tracking-tighter uppercase italic ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Witness<span className="text-blue-500">.</span>Dev
                </h1>
              </div>
            </motion.div>

            {/* DESKTOP NAVIGATION (Dynamic Indicator) */}
            <nav className={`hidden md:flex items-center gap-1 p-1 rounded-full ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-900/5'}`}>
              {navItems.map((item) => {
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                      active 
                        ? 'text-white' 
                        : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {active && (
                      <motion.div 
                        layoutId="nav-glow"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* ACTION HUD */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-[10px] font-black tracking-widest ${
                    theme === 'dark' 
                    ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
                    : 'bg-slate-900/5 border-slate-900/10 text-slate-900 hover:bg-slate-900/10'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-blue-500" />
                  {currentLanguage.label}
                  <ChevronDown className={`w-3 h-3 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showLanguageDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={`absolute top-full right-0 mt-2 w-40 rounded-2xl border shadow-2xl p-1 overflow-hidden backdrop-blur-2xl ${
                        theme === 'dark' ? 'bg-slate-900/95 border-white/10' : 'bg-white/95 border-slate-200'
                      }`}
                    >
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            changeLanguage(lang.code);
                            setShowLanguageDropdown(false);
                          }}
                          className={`w-full px-3 py-2.5 text-left text-xs rounded-xl flex items-center gap-3 transition-colors ${
                            language === lang.code 
                            ? 'bg-blue-500 text-white' 
                            : theme === 'dark' ? 'hover:bg-white/5 text-slate-300' : 'hover:bg-slate-900/5 text-slate-600'
                          }`}
                        >
                          <span className="text-base">{lang.flag}</span>
                          <span className="font-bold">{lang.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`p-2 rounded-xl border transition-colors ${
                  theme === 'dark' 
                  ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10' 
                  : 'bg-slate-900/5 border-slate-900/10 text-indigo-600 hover:bg-slate-900/10'
                }`}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              {/* Mobile Menu Toggle */}
              <button 
                className={`md:hidden p-2 rounded-xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE NAVIGATION OVERLAY */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-t overflow-hidden ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}
            >
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl font-bold uppercase tracking-tighter text-sm ${
                      activeSection === item.id 
                      ? 'bg-blue-600 text-white' 
                      : theme === 'dark' ? 'text-slate-400 hover:bg-white/5' : 'text-slate-500 hover:bg-slate-900/5'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content jump */}
      <div className="h-24"></div>
    </>
  );
};

export default Header;