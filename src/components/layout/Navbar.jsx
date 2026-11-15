import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navItems, profile } from '../../data/portfolio';
import { useI18n } from '../../i18n/LanguageContext';

function LanguageSwitch({ compact = false }) {
  const { locale, setLanguage, content } = useI18n();

  return (
    <div
      role="group"
      aria-label={content.common.language}
      className={`flex items-center rounded-lg border border-line/80 bg-surface/60 p-0.5 ${
        compact ? 'w-full justify-center' : ''
      }`}
    >
      {['en', 'fr'].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-pressed={locale === code}
          aria-label={code === 'en' ? content.common.english : content.common.french}
          className={`rounded-md px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider transition-colors ${
            locale === code ? 'bg-primary text-white' : 'text-muted hover:text-ink'
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { content } = useI18n();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-line/70 bg-night/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-wide flex h-[72px] items-center justify-between gap-4">
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          aria-label={`${profile.name} — ${content.nav.home}`}
        >
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-line bg-card">
            <img
              src={profile.portrait}
              alt=""
              width="36"
              height="36"
              className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />
          </span>
          <span className="font-display text-[15px] font-semibold tracking-[0.16em] text-ink">
            {profile.brand}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                aria-current={isActive ? 'page' : undefined}
                className={`relative rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
                  isActive ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {content.nav[item.id]}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-x-2.5 -bottom-0.5 h-px bg-gradient-to-r from-primary to-cyan"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitch />
          </div>
          <Link
            to="/contact"
            className="hidden items-center gap-1.5 rounded-xl border border-primary/40 bg-primary/10 px-4 py-2 text-[13px] font-semibold text-blue-200 transition-colors hover:bg-primary hover:text-white sm:inline-flex"
          >
            {content.common.letsTalk}
            <ArrowUpRight size={15} />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? content.common.closeMenu : content.common.menu}
            className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface/60 text-ink transition-colors hover:border-primary/50 lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-px origin-left bg-gradient-to-r from-primary via-cyan to-transparent"
        aria-hidden="true"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line/70 bg-night backdrop-blur-xl lg:hidden"
          >
            <nav className="container-wide flex flex-col py-4" aria-label="Mobile navigation">
              {navItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.03 * i }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-medium transition-colors ${
                        isActive ? 'bg-card text-ink' : 'text-muted hover:bg-surface hover:text-ink'
                      }`}
                    >
                      {content.nav[item.id]}
                      <span className="font-mono text-[10px] text-muted/60">0{i + 1}</span>
                    </Link>
                  </motion.div>
                );
              })}

              <div className="mt-3 sm:hidden">
                <LanguageSwitch compact />
              </div>

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-3 w-full"
              >
                {content.common.startConversation}
                <ArrowUpRight size={16} />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
