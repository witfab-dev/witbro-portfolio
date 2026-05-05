import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import {
  Menu, X, Sun, Moon, Globe, ChevronDown,
  User, Briefcase, Cpu, Calendar, Mail, Home,
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import logoImg from '../images/wit.png';

const NAV_ITEMS = [
  { id: 'home',       label: 'Home',       icon: Home },
  { id: 'about',      label: 'About',      icon: User },
  { id: 'projects',   label: 'Projects',   icon: Briefcase },
  { id: 'skills',     label: 'Skills',     icon: Cpu },
  { id: 'experience', label: 'Experience', icon: Calendar },
  { id: 'contact',    label: 'Contact',    icon: Mail },
];

const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English',     flag: '🇬🇧' },
  { code: 'fr', label: 'FR', name: 'Français',    flag: '🇫🇷' },
  { code: 'rw', label: 'RW', name: 'Kinyarwanda', flag: '🇷🇼' },
];

export default function Header() {
  const { theme, toggleTheme }          = useTheme();
  const { t, changeLanguage, language } = useLanguage();

  const [activeSection,   setActiveSection]   = useState('home');
  const [scrolled,        setScrolled]        = useState(false);
  const [mobileOpen,      setMobileOpen]      = useState(false);
  const [langOpen,        setLangOpen]        = useState(false);
  const langRef = useRef(null);

  const dark = theme === 'dark';

  /* ── scroll tracking ─────────────────────────────────────── */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));

  /* ── active section ──────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const ids = NAV_ITEMS.map(n => n.id);
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('home');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── close lang dropdown on outside click ────────────────── */
  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ── close mobile on resize ──────────────────────────────── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    if (id === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  /* ── shared tokens ───────────────────────────────────────── */
  const surface  = dark ? 'bg-[#161513]'        : 'bg-white';
  const border   = dark ? 'border-stone-800/70'  : 'border-stone-200';
  const ink      = dark ? 'text-stone-100'       : 'text-stone-900';
  const muted    = dark ? 'text-stone-500'       : 'text-stone-400';
  const pillBg   = dark ? 'bg-stone-800/60'      : 'bg-stone-100';

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300`}
      >
        {/* ── floating pill wrapper ── */}
        <div className="max-w-[1200px] mx-auto px-4 pt-3 sm:pt-4">
          <motion.div
            animate={{
              backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
              boxShadow: scrolled
                ? dark
                  ? '0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4)'
                  : '0 0 0 1px rgba(0,0,0,0.07), 0 8px 32px rgba(0,0,0,0.08)'
                : 'none',
            }}
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-between h-14 px-3 rounded-2xl border transition-colors duration-300
              ${scrolled
                ? `${surface} ${border}`
                : 'bg-transparent border-transparent'
              }`}
          >

            {/* ── Logo ───────────────────────────────────────── */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo('home')}
              className="flex items-center gap-2.5 group"
            >
              <div className={`relative w-8 h-8 rounded-xl overflow-hidden ring-1 transition-all
                ${dark ? 'ring-stone-700 group-hover:ring-orange-500/50' : 'ring-stone-200 group-hover:ring-orange-400/60'}`}>
                <img src={logoImg} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className={`hidden sm:block text-sm font-black tracking-tight ${ink}`}>
                Witness<span className="text-orange-500">.</span>Dev
              </span>
            </motion.button>

            {/* ── Desktop nav ────────────────────────────────── */}
            <nav className={`hidden md:flex items-center gap-0.5 p-1 rounded-xl ${pillBg}`}>
              {NAV_ITEMS.map(({ id, label }) => {
                const active = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`relative px-3.5 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-colors duration-200
                      ${active ? 'text-white' : `${muted} hover:${ink}`}`}
                  >
                    {active && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-orange-500 rounded-lg shadow-md shadow-orange-500/25"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{t(id) || label}</span>
                  </button>
                );
              })}
            </nav>

            {/* ── Actions ────────────────────────────────────── */}
            <div className="flex items-center gap-1.5">

              {/* Language switcher */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen(v => !v)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all
                    ${dark
                      ? 'bg-stone-800/60 border-stone-700/60 text-stone-300 hover:border-orange-500/40'
                      : 'bg-stone-100 border-stone-200 text-stone-600 hover:border-orange-400/50'
                    }`}
                >
                  <Globe size={12} className="text-orange-500" />
                  {currentLang.label}
                  <motion.div animate={{ rotate: langOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={11} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className={`absolute top-full right-0 mt-2 w-44 rounded-2xl border shadow-xl overflow-hidden
                        ${dark ? 'bg-[#161513] border-stone-800' : 'bg-white border-stone-200'}`}
                    >
                      <div className="p-1.5">
                        {LANGUAGES.map(lang => (
                          <button
                            key={lang.code}
                            onClick={() => { changeLanguage(lang.code); setLangOpen(false); }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all
                              ${language === lang.code
                                ? 'bg-orange-500 text-white'
                                : dark
                                  ? 'text-stone-400 hover:bg-stone-800 hover:text-stone-100'
                                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                              }`}
                          >
                            <span className="text-base">{lang.flag}</span>
                            <span>{lang.name}</span>
                            {language === lang.code && (
                              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme toggle */}
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={toggleTheme}
                className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all
                  ${dark
                    ? 'bg-stone-800/60 border-stone-700/60 text-yellow-400 hover:border-yellow-400/40'
                    : 'bg-stone-100 border-stone-200 text-indigo-500 hover:border-indigo-400/50'
                  }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {dark ? <Sun size={16} /> : <Moon size={16} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Mobile hamburger */}
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setMobileOpen(v => !v)}
                className={`md:hidden w-9 h-9 flex items-center justify-center rounded-xl border transition-all
                  ${dark
                    ? 'bg-stone-800/60 border-stone-700/60 text-stone-300'
                    : 'bg-stone-100 border-stone-200 text-stone-700'
                  }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={mobileOpen ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {mobileOpen ? <X size={17} /> : <Menu size={17} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ── Mobile drawer ──────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[-1]"
              />

              {/* Drawer panel */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className={`md:hidden mx-4 mt-2 rounded-2xl border shadow-2xl overflow-hidden
                  ${dark ? 'bg-[#161513] border-stone-800' : 'bg-white border-stone-200'}`}
              >
                <div className="p-3 grid grid-cols-2 gap-2">
                  {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
                    const active = activeSection === id;
                    return (
                      <button
                        key={id}
                        onClick={() => scrollTo(id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all
                          ${active
                            ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                            : dark
                              ? 'bg-stone-800/60 text-stone-400 hover:text-stone-100 hover:bg-stone-800'
                              : 'bg-stone-100 text-stone-500 hover:text-stone-900 hover:bg-stone-200'
                          }`}
                      >
                        <Icon size={15} />
                        {t(id) || label}
                      </button>
                    );
                  })}
                </div>

                {/* Divider + footer */}
                <div className={`px-4 py-3 border-t flex items-center justify-between ${dark ? 'border-stone-800' : 'border-stone-100'}`}>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${dark ? 'text-stone-700' : 'text-stone-300'}`}>
                    Witness<span className="text-orange-500">.</span>Dev
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-70" />
                      <span className="relative rounded-full h-1.5 w-1.5 bg-green-500" />
                    </span>
                    <span className={`text-[10px] font-semibold ${dark ? 'text-stone-600' : 'text-stone-400'}`}>Available</span>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer */}
      <div className="h-20 sm:h-24" />
    </>
  );
}
