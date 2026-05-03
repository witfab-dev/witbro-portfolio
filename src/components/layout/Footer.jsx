import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  Mail, ArrowUp, Github, Linkedin, Twitter,
  Instagram, Copy, CheckCircle2, MapPin, ArrowUpRight,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Vision',   href: '#vision' },
  { label: 'Mission',  href: '#mission' },
  { label: 'News',     href: '#news' },
  { label: 'Contact',  href: '#contact' },
];

const SOCIAL_LINKS = [
  { name: 'GitHub',    url: 'https://github.com/witbri1',                icon: Github,   bg: 'hover:bg-[#24292e]' },
  { name: 'LinkedIn',  url: 'https://linkedin.com/in/witnessfabrice',    icon: Linkedin, bg: 'hover:bg-[#0A66C2]' },
  { name: 'Twitter',   url: 'https://twitter.com/witnessfabrice',        icon: Twitter,  bg: 'hover:bg-[#1DA1F2]' },
  { name: 'Instagram', url: 'https://instagram.com/witbri1',             icon: Instagram,bg: 'hover:bg-[#E4405F]' },
];

const EMAIL = 'witnessfabrice@gmail.com';

export default function Footer() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const dark = theme === 'dark';

  const [time, setTime]     = useState(new Date());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const kigaliTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Kigali',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).format(time);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  /* ─── shared token shorthands ─────────────────────────────── */
  const bg      = dark ? 'bg-[#0c0b0a]'         : 'bg-stone-100';
  const surface = dark ? 'bg-[#161513]'          : 'bg-white';
  const border  = dark ? 'border-stone-800/60'   : 'border-stone-200';
  const ink     = dark ? 'text-stone-100'        : 'text-stone-900';
  const muted   = dark ? 'text-stone-500'        : 'text-stone-400';
  const subtle  = dark ? 'text-stone-400'        : 'text-stone-500';

  return (
    <footer className={`relative overflow-hidden border-t ${bg} ${border} transition-colors duration-500`}>

      {/* ── Ambient blobs ──────────────────────────────────────── */}
      <div className="pointer-events-none absolute -top-40 right-0 w-[420px] h-[420px] rounded-full bg-orange-500/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-blue-500/[0.04] blur-3xl" />

      {/* ══════════════════════════════════════════════════════════
          HERO BAND — large CTA
      ══════════════════════════════════════════════════════════ */}
      <div className={`relative border-b ${border}`}>
        <div className="max-w-[1200px] mx-auto px-6 py-16 sm:py-20 flex flex-col md:flex-row md:items-end justify-between gap-10">

          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className={`flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4`}>
              <span className="block w-4 h-px bg-orange-500" />
              Let's build together
            </p>
            <h2 className={`text-[clamp(36px,5vw,60px)] font-black leading-[0.93] tracking-tight ${ink}`}>
              Have a project
              <br />
              <span className="text-orange-500 italic">in mind?</span>
            </h2>
          </motion.div>

          {/* Right: email CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="group relative max-w-sm w-full md:w-auto"
          >
            {/* Glow ring */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

            <div className={`relative flex items-center gap-4 p-4 pr-3 rounded-2xl border ${surface} ${border} shadow-sm`}>
              {/* Icon */}
              <div className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20">
                <Mail size={18} className="text-orange-400" />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <p className={`text-[9px] font-bold tracking-[0.18em] uppercase mb-0.5 ${muted}`}>Email me</p>
                <p className={`text-sm font-mono truncate ${ink}`}>{EMAIL}</p>
              </div>

              {/* Copy btn */}
              <button
                onClick={copyEmail}
                aria-label="Copy email"
                className={`ml-auto shrink-0 w-9 h-9 flex items-center justify-center rounded-xl border ${border} ${muted} hover:bg-orange-500 hover:text-white hover:border-orange-500 active:scale-90 transition-all`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <CheckCircle2 size={16} className="text-green-400" />
                    </motion.span>
                  ) : (
                    <motion.span key="cp" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Copy size={15} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MAIN FOOTER GRID
      ══════════════════════════════════════════════════════════ */}
      <div className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

        {/* ── Brand col ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Logotype */}
          <div>
            <motion.p
              whileHover={{ skewX: -6 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`font-black text-3xl tracking-tight cursor-default ${ink}`}
            >
              WITNESS
              <span className="text-orange-500">_</span>
              Fabrice
            </motion.p>
            <p className={`mt-3 text-sm leading-relaxed max-w-xs ${subtle}`}>
              Building the future of the web from the heart of{' '}
              <span className={`${ink} border-b border-orange-400/50`}>Rwanda</span>.
              Focused on immersive interfaces and high-performance ecosystems.
            </p>
          </div>

          {/* Location + live time */}
          <div className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border ${surface} ${border} w-fit`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <MapPin size={12} className="text-orange-400" />
            <span className={`text-[11px] font-semibold tracking-wide ${ink}`}>Kigali, Rwanda</span>
            <span className={`text-[10px] font-mono ${muted} pl-1 border-l ${border}`}>{kigaliTime}</span>
          </div>

          {/* Social icons */}
          <div className="flex gap-2.5">
            {SOCIAL_LINKS.map(({ name, url, icon: Icon, bg: hoverBg }) => (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className={`w-10 h-10 flex items-center justify-center rounded-xl border ${border} ${surface} ${muted} ${hoverBg} hover:text-white hover:border-transparent transition-all duration-300`}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ── Spacer ──────────────────────────────────────────── */}
        <div className="hidden lg:block lg:col-span-1" />

        {/* ── Nav col ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="lg:col-span-3"
        >
          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-5 ${muted}`}>Navigation</p>
          <ul className="space-y-3">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`group flex items-center gap-2 text-sm font-medium ${subtle} hover:text-orange-500 transition-colors duration-200`}
                >
                  <span className="block w-0 group-hover:w-3 h-px bg-orange-500 transition-all duration-300" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── Status / availability col ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="lg:col-span-3"
        >
          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-5 ${muted}`}>Status</p>

          {/* Availability card */}
          <div className={`p-4 rounded-2xl border ${surface} ${border} mb-4`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className={`text-[11px] font-bold uppercase tracking-widest text-green-500`}>Available</span>
            </div>
            <p className={`text-xs leading-relaxed ${subtle}`}>
              Open to freelance work, collaborations, and exciting full-time roles.
            </p>
          </div>

          {/* "Hire me" nudge */}
          <a
            href="#contact"
            className="group flex items-center justify-between w-full px-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-all shadow-lg shadow-orange-500/20"
          >
            Get in touch
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BOTTOM BAR
      ══════════════════════════════════════════════════════════ */}
      <div className={`border-t ${border}`}>
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className={`text-[11px] font-mono ${muted}`}>
            © {new Date().getFullYear()}{' '}
            <span className={subtle}>Designed & built by WITDEV</span>
          </p>

          {/* Scroll to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.94 }}
            className={`group flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-widest ${muted} hover:text-orange-500 transition-colors`}
          >
            <span>{t('scrollTop') || 'Back to top'}</span>
            <div className={`w-7 h-7 flex items-center justify-center rounded-full border ${border} group-hover:border-orange-500 group-hover:bg-orange-500 transition-all`}>
              <ArrowUp size={13} className="group-hover:text-white transition-colors group-hover:-translate-y-0.5 duration-200" />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
    </footer>
  );
}
