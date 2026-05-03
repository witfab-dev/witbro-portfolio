import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  Search, Calendar, ArrowUpRight, Clock,
  TrendingUp, ChevronRight, Rss, X,
} from 'lucide-react';

const NEWS_DATA = [
  {
    id: 1,
    category: 'Development',
    title: 'The Rise of AI-First Frameworks in 2026',
    excerpt: 'The shift from imperative coding to declarative intent is here. New frameworks are leveraging native LLM hooks to predict user needs before they even click.',
    date: 'Apr 05, 2026',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    accent: '#f97316',
    featured: true,
  },
  {
    id: 2,
    category: 'Design',
    title: 'Dopamine Design & High-Energy Palettes',
    excerpt: 'Neo-brutalism meets organic gradients. Why 2026 is abandoning bland-core minimalism in favour of bold, expressive interfaces.',
    date: 'Apr 02, 2026',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
    accent: '#ec4899',
    featured: false,
  },
  {
    id: 3,
    category: 'Tech',
    title: 'Post-Quantum Encryption for PERN Stacks',
    excerpt: 'As quantum supremacy approaches, securing your Node.js infrastructure requires entirely new cryptographic standards.',
    date: 'Mar 28, 2026',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    accent: '#8b5cf6',
    featured: false,
  },
  {
    id: 4,
    category: 'Development',
    title: 'Tailwind 5.0: The End of Runtime CSS?',
    excerpt: 'Exploring the new engine that compiles styles directly into binary streams for sub-millisecond paint times.',
    date: 'Mar 20, 2026',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800',
    accent: '#06b6d4',
    featured: false,
  },
];

const TRENDING = [
  { label: 'React Server Components', readers: '7.2k' },
  { label: 'Web3.0 Rebirth',          readers: '5.8k' },
  { label: 'Neural Branding',          readers: '4.3k' },
  { label: 'Edge Computing',           readers: '3.9k' },
];

const CATEGORIES = ['All', 'Development', 'Design', 'Tech'];

/* ─── tiny helpers ─────────────────────────────────────────── */
const CategoryDot = ({ color }) => (
  <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: color }} />
);

export default function NewsFeed() {
  const { theme } = useTheme();
  const { t }     = useLanguage();
  const dark = theme === 'dark';

  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [email,  setEmail]  = useState('');
  const [subbed, setSubbed] = useState(false);

  /* token shorthands */
  const bg      = dark ? 'bg-[#0c0b0a]'        : 'bg-stone-100';
  const surface = dark ? 'bg-[#161513]'         : 'bg-white';
  const border  = dark ? 'border-stone-800/60'  : 'border-stone-200';
  const ink     = dark ? 'text-stone-100'       : 'text-stone-900';
  const muted   = dark ? 'text-stone-500'       : 'text-stone-400';
  const subtle  = dark ? 'text-stone-400'       : 'text-stone-500';

  const filteredNews = useMemo(() =>
    NEWS_DATA.filter(n => {
      const catOk = filter === 'All' || n.category === filter;
      const srchOk = n.title.toLowerCase().includes(search.toLowerCase()) ||
                     n.excerpt.toLowerCase().includes(search.toLowerCase());
      return catOk && srchOk;
    }),
  [filter, search]);

  const featured    = filteredNews.find(n => n.featured);
  const secondary   = filteredNews.filter(n => !n.featured);

  return (
    <section
      id="news"
      className={`relative min-h-screen py-24 px-4 sm:px-6 overflow-hidden transition-colors duration-500 ${bg}`}
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-40 right-0 w-[420px] h-[420px] rounded-full bg-orange-500/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-blue-500/[0.04] blur-3xl" />

      <div className="relative max-w-[1200px] mx-auto">

        {/* ══ HEADER ═══════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
              <span className="block w-5 h-px bg-orange-500" />
              Latest updates
            </p>
            <h2 className={`text-[clamp(38px,5.5vw,64px)] font-black leading-[0.93] tracking-tight ${ink}`}>
              News &amp;{' '}
              <span className="text-orange-500 italic">Insights</span>
            </h2>
            <p className={`mt-3 text-sm leading-relaxed max-w-xs ${subtle}`}>
              Curated deep-dives into development, design, and emerging tech.
            </p>
          </motion.div>

          {/* Search + filters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto"
          >
            {/* Search input */}
            <div className={`relative group flex items-center gap-2 px-4 py-2.5 rounded-xl border ${surface} ${border} w-full sm:w-64`}>
              <Search size={14} className={`shrink-0 ${muted} group-focus-within:text-orange-400 transition-colors`} />
              <input
                type="text"
                placeholder="Search articles…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={`w-full text-sm bg-transparent focus:outline-none ${ink} placeholder:${muted}`}
              />
              {search && (
                <button onClick={() => setSearch('')} className={`shrink-0 ${muted} hover:text-orange-500 transition-colors`}>
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className={`flex gap-1.5 p-1 rounded-xl border ${surface} ${border}`}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-250 ${
                    filter === cat
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                      : `${subtle} hover:${ink}`
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ══ GRID ═════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── Main feed ──────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-5">
            <AnimatePresence mode="popLayout">

              {/* Featured hero card */}
              {featured && (
                <motion.article
                  key={featured.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className={`group relative overflow-hidden rounded-2xl border ${surface} ${border} cursor-pointer
                    hover:border-orange-400 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.3),0_16px_40px_rgba(0,0,0,0.1)]
                    transition-all duration-300`}
                >
                  {/* Image */}
                  <div className="relative h-64 sm:h-80 overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Featured label */}
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      <Rss size={9} /> Featured
                    </div>

                    {/* Overlay meta */}
                    <div className="absolute bottom-5 left-5 right-5">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/70 mb-2`}>
                        <CategoryDot color={featured.accent} /> {featured.category}
                      </span>
                      <h3 className="font-black text-2xl sm:text-3xl text-white leading-tight tracking-tight group-hover:text-orange-300 transition-colors">
                        {featured.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 sm:p-6 flex items-end justify-between gap-4">
                    <p className={`text-sm leading-relaxed line-clamp-2 ${subtle} flex-1`}>
                      {featured.excerpt}
                    </p>
                    <div className="shrink-0 flex items-center gap-4">
                      <div className={`flex items-center gap-1 text-[11px] font-mono ${muted}`}>
                        <Clock size={11} /> {featured.readTime}
                      </div>
                      <div className={`flex items-center gap-1 text-[11px] font-mono ${muted}`}>
                        <Calendar size={11} /> {featured.date}
                      </div>
                      <div className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-xl border ${border} ${muted}
                        group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all`}>
                        <ArrowUpRight size={15} />
                      </div>
                    </div>
                  </div>
                </motion.article>
              )}

              {/* Secondary cards — horizontal list style */}
              {secondary.map((news, i) => (
                <motion.article
                  key={news.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className={`group flex gap-0 overflow-hidden rounded-2xl border ${surface} ${border} cursor-pointer
                    hover:border-orange-400 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.25),0_12px_32px_rgba(0,0,0,0.08)]
                    transition-all duration-300`}
                >
                  {/* Image */}
                  <div className="relative w-32 sm:w-48 shrink-0 overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col justify-between p-4 sm:p-5 flex-1 min-w-0">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider`}
                          style={{ color: news.accent }}>
                          <CategoryDot color={news.accent} /> {news.category}
                        </span>
                      </div>
                      <h3 className={`font-black text-base sm:text-lg leading-tight tracking-tight ${ink} group-hover:text-orange-500 transition-colors line-clamp-2 mb-2`}>
                        {news.title}
                      </h3>
                      <p className={`text-xs leading-relaxed line-clamp-2 ${subtle} hidden sm:block`}>
                        {news.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-100 dark:border-stone-800/50">
                      <div className="flex items-center gap-3">
                        <span className={`flex items-center gap-1 text-[10px] font-mono ${muted}`}>
                          <Clock size={10} /> {news.readTime}
                        </span>
                        <span className={`flex items-center gap-1 text-[10px] font-mono ${muted}`}>
                          <Calendar size={10} /> {news.date}
                        </span>
                      </div>
                      <div className={`w-7 h-7 flex items-center justify-center rounded-lg border ${border} ${muted}
                        group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all`}>
                        <ArrowUpRight size={12} />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}

              {/* Empty state */}
              {filteredNews.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed ${border} ${muted} text-center`}
                >
                  <Search size={28} className="mb-3 opacity-40" />
                  <p className="text-sm font-medium">No articles match your search.</p>
                  <button
                    onClick={() => { setSearch(''); setFilter('All'); }}
                    className="mt-3 text-[11px] font-bold text-orange-500 hover:underline"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Sidebar ────────────────────────────────────── */}
          <aside className="lg:col-span-4 space-y-5">

            {/* Trending */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`p-5 rounded-2xl border ${surface} ${border}`}
            >
              <div className={`flex items-center gap-2 mb-5 pb-4 border-b ${border}`}>
                <TrendingUp size={15} className="text-orange-500" />
                <h4 className={`text-[10px] font-black uppercase tracking-[0.22em] ${ink}`}>
                  Trending
                </h4>
              </div>

              <ul className="space-y-4">
                {TRENDING.map((item, i) => (
                  <li key={i} className="group flex items-center gap-3 cursor-pointer">
                    <span className={`font-mono text-xs font-bold ${muted} group-hover:text-orange-500 transition-colors shrink-0`}>
                      0{i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold ${ink} group-hover:text-orange-500 transition-colors truncate`}>
                        {item.label}
                      </p>
                      <span className={`text-[10px] ${muted}`}>{item.readers} readers</span>
                    </div>
                    <ArrowUpRight size={13} className={`shrink-0 ${muted} opacity-0 group-hover:opacity-100 group-hover:text-orange-500 transition-all`} />
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter signup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`relative overflow-hidden p-5 rounded-2xl border ${border}`}
              style={{ background: dark ? 'linear-gradient(135deg,#1a1008 0%,#161513 100%)' : 'linear-gradient(135deg,#fff7ed 0%,#ffffff 100%)' }}
            >
              {/* Decorative blob */}
              <div className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full bg-orange-500/10 blur-2xl" />

              <Rss size={20} className="text-orange-500 mb-3" />
              <h5 className={`font-black text-base mb-1 ${ink}`}>
                Stay in the loop
              </h5>
              <p className={`text-xs leading-relaxed mb-4 ${subtle}`}>
                Get the freshest articles delivered straight to your inbox. No noise, just signal.
              </p>

              <AnimatePresence mode="wait">
                {subbed ? (
                  <motion.div
                    key="thanks"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 py-3 px-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold"
                  >
                    ✓ You're subscribed!
                  </motion.div>
                ) : (
                  <motion.div key="form" className="flex gap-2">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && email && setSubbed(true)}
                      className={`flex-1 min-w-0 px-3 py-2.5 text-xs rounded-xl border ${surface} ${border} ${ink} focus:outline-none focus:border-orange-400 transition-colors`}
                    />
                    <button
                      onClick={() => email && setSubbed(true)}
                      className="shrink-0 w-9 h-9 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all shadow-md shadow-orange-500/25 active:scale-95"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Article count badge */}
            <div className={`flex items-center justify-between px-4 py-3 rounded-xl border ${surface} ${border}`}>
              <span className={`text-xs font-medium ${subtle}`}>
                Showing <span className={`font-bold ${ink}`}>{filteredNews.length}</span> of {NEWS_DATA.length} articles
              </span>
              {(filter !== 'All' || search) && (
                <button
                  onClick={() => { setFilter('All'); setSearch(''); }}
                  className="text-[10px] font-bold text-orange-500 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
