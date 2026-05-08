import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Search, Calendar, ArrowUpRight, Clock, 
  TrendingUp, Globe, X, ExternalLink, 
  BookOpen, Share2, Bookmark, MapPin,
  ChevronRight, ArrowLeft, Filter, 
  SlidersHorizontal, Star, Sparkles,
  Grid3X3, List, Maximize2, Minimize2,
  Mail, Bell, Zap, Award,
} from 'lucide-react';

/* ─── GLOBAL SOURCE REGISTRY ────────────────────────────────── */
const SOURCES = {
  BLOOMBERG: { name: 'Bloomberg', origin: 'New York, USA', color: '#0000ff', logo: 'B' },
  WIRED: { name: 'Wired', origin: 'San Francisco, USA', color: '#ff0000', logo: 'W' },
  REUTERS: { name: 'Reuters', origin: 'London, UK', color: '#ff8000', logo: 'R' },
  VERGE: { name: 'The Verge', origin: 'Washington D.C., USA', color: '#e91e63', logo: 'V' },
  TECHCRUNCH: { name: 'TechCrunch', origin: 'San Francisco, USA', color: '#00d300', logo: 'T' },
  GITHUB_BLOG: { name: 'GitHub Blog', origin: 'Remote', color: '#6e5494', logo: 'G' }
};

const NEWS_DATA = [
  {
    id: 1,
    source: SOURCES.WIRED,
    category: 'Development',
    title: 'The Rise of AI-First Frameworks in 2026',
    excerpt: 'The shift from imperative coding to declarative intent is here. New frameworks leverage native LLM hooks to predict user needs before they even click.',
    content: `In the second quarter of 2026, the global development community witnessed a seismic shift. Traditional UI frameworks have begun integrating "Neural Hooks" directly into the kernel. 
    
    This transition means developers no longer write explicit event listeners. Instead, they define "Intent States" that the underlying LLM-driven compiler interprets in real-time. This has reduced boilerplate by 70% while increasing application performance by leveraging binary-streamed CSS. 
    
    "We are moving from building tools to guiding intelligence," says the Lead Architect at Vercel. The implications for accessibility and internationalization are profound, as the framework now handles local context shifts natively.`,
    references: [
      { site: 'Wired Tech', url: 'https://wired.com', type: 'Primary Source' },
      { site: 'MIT Technology Review', url: '#', type: 'Peer Review' }
    ],
    date: 'May 05, 2026',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    accent: '#f97316',
    featured: true,
    trending: true,
  },
  {
    id: 2,
    source: SOURCES.REUTERS,
    category: 'Tech',
    title: 'Post-Quantum Encryption for PERN Stacks',
    excerpt: 'As quantum supremacy approaches, securing your Node.js infrastructure requires entirely new cryptographic standards.',
    content: `London researchers have successfully demonstrated a 'Shor's Algorithm' variant capable of decrypting standard RSA-2048 in under 12 minutes. The response from the open-source community has been swift. 
    
    New updates to the PERN stack (PostgreSQL, Express, React, Node) now include lattice-based cryptography as a default security layer. This transition, dubbed "The Great Hardening," is expected to be the most significant infrastructure update of the decade.`,
    references: [
      { site: 'Reuters Security', url: 'https://reuters.com', type: 'News Desk' },
      { site: 'NIST Standards', url: '#', type: 'Technical Doc' }
    ],
    date: 'May 02, 2026',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    accent: '#8b5cf6',
    featured: false,
    trending: true,
  },
  {
    id: 3,
    source: SOURCES.TECHCRUNCH,
    category: 'Design',
    title: 'Dopamine Design & High-Energy Palettes',
    excerpt: 'Neo-brutalism meets organic gradients. Why 2026 is abandoning bland-core minimalism in favour of bold, expressive interfaces.',
    content: 'The design world is experiencing a renaissance of color and expression...',
    references: [
      { site: 'TechCrunch Design', url: '#', type: 'Primary' },
    ],
    date: 'Apr 28, 2026',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
    accent: '#ec4899',
    featured: false,
    trending: false,
  },
  {
    id: 4,
    source: SOURCES.GITHUB_BLOG,
    category: 'Development',
    title: 'Tailwind 5.0: The End of Runtime CSS?',
    excerpt: 'Exploring the new engine that compiles styles directly into binary streams for sub-millisecond paint times.',
    content: 'A new era of CSS optimization is here...',
    references: [
      { site: 'GitHub Blog', url: '#', type: 'Primary' },
    ],
    date: 'Apr 20, 2026',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800',
    accent: '#06b6d4',
    featured: false,
    trending: true,
  },
];

const TRENDING_TOPICS = [
  { label: 'React Server Components', readers: '7.2k', icon: Zap },
  { label: 'Web3.0 Rebirth',          readers: '5.8k', icon: Globe },
  { label: 'Neural Branding',          readers: '4.3k', icon: Sparkles },
  { label: 'Edge Computing',           readers: '3.9k', icon: Award },
];

const CATEGORIES = ['All', 'Development', 'Tech', 'Design'];

/* ─── ARTICLE READER (MODAL) ────────────────────────────────── */
const FullNewsModal = ({ article, onClose, dark }) => {
  if (!article) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-0"
      style={{ background: dark ? 'rgba(12,11,10,0.98)' : 'rgba(245,243,238,0.98)', backdropFilter: 'blur(30px)' }}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 40 }} 
        animate={{ scale: 1, y: 0 }} 
        exit={{ scale: 0.95, y: 40 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`w-full h-full md:h-[90vh] md:max-w-5xl overflow-y-auto rounded-none md:rounded-[2.5rem] shadow-2xl relative ${
          dark ? 'bg-[#121110] text-stone-100 border border-stone-800/50' : 'bg-white text-stone-900 border border-stone-200'
        }`}
      >
        {/* Sticky Navigation */}
        <div className="sticky top-0 z-50 flex items-center justify-between p-4 sm:p-6 bg-inherit/80 backdrop-blur-md border-b border-stone-500/10">
          <button 
            onClick={onClose} 
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-orange-500 transition-all"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="p-2 rounded-xl hover:bg-stone-500/10 transition-all" title="Share">
              <Share2 size={17} className="opacity-50 hover:opacity-100" />
            </button>
            <button className="p-2 rounded-xl hover:bg-stone-500/10 transition-all" title="Bookmark">
              <Bookmark size={17} className="opacity-50 hover:opacity-100" />
            </button>
            <button onClick={onClose} className="p-2 rounded-xl bg-stone-500/10 hover:bg-orange-500 hover:text-white transition-all">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-8 md:p-12 lg:p-16">
          {/* Article Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-12 gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-lg"
                style={{ background: article.source.color }}
              >
                {article.source.logo}
              </div>
              <div>
                <h4 className="font-black text-base sm:text-lg">{article.source.name}</h4>
                <p className="text-[10px] sm:text-xs opacity-50 flex items-center gap-1 font-medium">
                  <MapPin size={11} className="text-orange-500" /> {article.source.origin}
                </p>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-8 text-[9px] sm:text-[10px] font-black uppercase tracking-widest opacity-40">
              <div className="flex flex-col">
                <span className="not-italic opacity-50 mb-1">Published</span>
                {article.date}
              </div>
              <div className="flex flex-col">
                <span className="not-italic opacity-50 mb-1">Read</span>
                {article.readTime}
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-10 leading-[1.05] tracking-tight max-w-4xl">
            {article.title}
          </h1>

          {/* Featured Image */}
          <div className="relative mb-8 sm:mb-12 rounded-xl sm:rounded-[2rem] overflow-hidden h-48 sm:h-64 md:h-[400px]">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent" />
            {article.featured && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full backdrop-blur-sm flex items-center gap-1.5">
                <Star size={10} /> Featured
              </div>
            )}
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed font-medium mb-6 sm:mb-8 text-orange-500/90 italic border-l-4 border-orange-500 pl-4 sm:pl-6">
              {article.excerpt}
            </p>
            <div className="prose prose-stone dark:prose-invert prose-base sm:prose-lg max-w-none mb-12 sm:mb-16 opacity-80 leading-relaxed whitespace-pre-line">
              {article.content}
            </div>

            {/* References Section */}
            <div className={`p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] border ${
              dark ? 'bg-stone-900/40 border-stone-800' : 'bg-stone-50 border-stone-200'
            }`}>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen size={20} className="text-orange-500" />
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-[0.2em]">References & Sources</h3>
              </div>
              <div className="grid gap-3">
                {article.references.map((ref, i) => (
                  <a 
                    key={i} 
                    href={ref.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`group flex items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all ${
                      dark 
                        ? 'bg-stone-950/50 border-stone-800 hover:border-orange-500/50' 
                        : 'bg-white border-stone-200 hover:shadow-xl hover:border-orange-300'
                    }`}
                  >
                    <div>
                      <p className="text-[10px] font-bold uppercase text-orange-500 mb-1">{ref.type}</p>
                      <p className="text-sm font-bold">{ref.site}</p>
                    </div>
                    <ExternalLink size={16} className="opacity-20 group-hover:opacity-100 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── NEWSLETTER SIGNUP ──────────────────────────────────────── */
const NewsletterSection = ({ dark }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] ${
        dark 
          ? 'bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800' 
          : 'bg-gradient-to-br from-orange-50 to-amber-50 border border-stone-200'
      }`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-orange-500/10">
            <Mail size={20} className="text-orange-500" />
          </div>
          <div>
            <h3 className="font-black text-lg sm:text-xl">Stay Updated</h3>
            <p className="text-xs opacity-50">Weekly digest of tech insights</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {subscribed ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-4 px-5 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-sm font-bold"
            >
              ✓ Successfully subscribed!
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-1 px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-orange-500 transition-colors ${
                  dark ? 'bg-stone-800 border-stone-700 text-white' : 'bg-white border-stone-200'
                }`}
              />
              <button 
                type="submit"
                className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-orange-500/25 active:scale-95"
              >
                Subscribe
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ─── MAIN COMPONENT ────────────────────────────────────────── */
export default function NewsApp() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const dark = theme === 'dark';
  
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [showFilters, setShowFilters] = useState(false);

  const filteredNews = useMemo(() => 
    NEWS_DATA.filter(article => {
      const catMatch = filter === 'All' || article.category === filter;
      const searchMatch = !searchTerm || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return catMatch && searchMatch;
    }),
  [filter, searchTerm]);

  const featuredArticles = filteredNews.filter(a => a.featured);
  const regularArticles = filteredNews.filter(a => !a.featured);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${
      dark ? 'bg-[#0c0b0a] text-stone-100' : 'bg-stone-50 text-stone-900'
    }`}>
      
      {/* Full News Reader Overlay */}
      <AnimatePresence>
        {selectedArticle && (
          <FullNewsModal 
            article={selectedArticle} 
            onClose={() => setSelectedArticle(null)} 
            dark={dark} 
          />
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-orange-500 font-black text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4 flex items-center gap-3">
                <span className="w-8 sm:w-12 h-px bg-orange-500" /> 
                Global Tech {new Date().getFullYear()}
              </p>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85]">
                The <br className="sm:hidden" /><span className="text-orange-500 italic">Dispatch.</span>
              </h1>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-4 sm:gap-6">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-black text-orange-500">{NEWS_DATA.length}</p>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest opacity-50">Articles</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-black text-orange-500">{Object.keys(SOURCES).length}</p>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest opacity-50">Sources</p>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-orange-500 transition-colors ${
                  dark ? 'bg-stone-900 border-stone-800 text-white' : 'bg-white border-stone-200'
                }`}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:text-orange-500">
                  <X size={14} />
                </button>
              )}
            </div>
            
            <div className="flex gap-2">
              {/* Category Filter */}
              <div className="flex rounded-xl border overflow-hidden text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3 sm:px-4 py-2.5 transition-all ${
                      filter === cat
                        ? 'bg-orange-500 text-white'
                        : 'hover:bg-stone-100 dark:hover:bg-stone-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex rounded-xl border overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-all ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'hover:bg-stone-100 dark:hover:bg-stone-800'}`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-all ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'hover:bg-stone-100 dark:hover:bg-stone-800'}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              
              {/* Grid View */}
              {viewMode === 'grid' && (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Featured Articles */}
                  {featuredArticles.length > 0 && (
                    <div className="mb-10">
                      <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 mb-4 flex items-center gap-2">
                        <Star size={12} /> Featured Stories
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                        {featuredArticles.map((article) => (
                          <motion.article
                            key={article.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedArticle(article)}
                            className="group cursor-pointer"
                          >
                            <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] aspect-[4/3] mb-4">
                              <img 
                                src={article.image} 
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                              <div className="absolute top-4 left-4 flex gap-2">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                                  {article.category}
                                </span>
                                {article.trending && (
                                  <span className="px-3 py-1 bg-orange-500/50 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-1">
                                    <TrendingUp size={10} /> Trending
                                  </span>
                                )}
                              </div>
                              <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">
                                  {article.source.name}
                                </p>
                                <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
                                  {article.title}
                                </h2>
                              </div>
                            </div>
                          </motion.article>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Regular Articles Grid */}
                  <div>
                    {regularArticles.length > 0 && (
                      <h2 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-4">
                        Latest News
                      </h2>
                    )}
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                      {regularArticles.map((article, index) => (
                        <motion.article
                          key={article.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -5 }}
                          onClick={() => setSelectedArticle(article)}
                          className={`group cursor-pointer p-4 sm:p-5 rounded-2xl sm:rounded-[2rem] border transition-all ${
                            dark 
                              ? 'bg-stone-900/50 border-stone-800 hover:border-orange-500/50' 
                              : 'bg-white border-stone-200 hover:shadow-xl hover:border-orange-300'
                          }`}
                        >
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <div 
                                  className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black text-white"
                                  style={{ background: article.source.color }}
                                >
                                  {article.source.logo}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                                  {article.source.name}
                                </span>
                              </div>
                              <h3 className="font-black text-sm sm:text-base leading-tight mb-2 group-hover:text-orange-500 transition-colors">
                                {article.title}
                              </h3>
                              <p className="text-xs opacity-50 line-clamp-2 hidden sm:block">
                                {article.excerpt}
                              </p>
                              <div className="flex items-center gap-3 mt-2 text-[10px] font-bold uppercase tracking-widest opacity-40">
                                <span className="flex items-center gap-1">
                                  <Clock size={10} /> {article.readTime}
                                </span>
                                <span>{article.date}</span>
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  </div>

                  {/* Empty State */}
                  {filteredNews.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20"
                    >
                      <Search size={40} className="mx-auto mb-4 opacity-20" />
                      <p className="text-lg font-bold opacity-50">No articles found</p>
                      <button 
                        onClick={() => { setFilter('All'); setSearchTerm(''); }}
                        className="mt-4 text-sm font-bold text-orange-500 hover:underline"
                      >
                        Clear all filters
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {filteredNews.map((article, index) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedArticle(article)}
                      className={`group cursor-pointer p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] border transition-all flex gap-4 sm:gap-6 items-center ${
                        dark 
                          ? 'bg-stone-900/50 border-stone-800 hover:border-orange-500/50' 
                          : 'bg-white border-stone-200 hover:shadow-xl hover:border-orange-300'
                      }`}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden shrink-0">
                        <img src={article.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                            style={{ background: article.accent + '20', color: article.accent }}>
                            {article.category}
                          </span>
                          <span className="text-[10px] opacity-40">•</span>
                          <span className="text-[10px] font-bold opacity-40">{article.source.name}</span>
                        </div>
                        <h3 className="font-black text-sm sm:text-lg leading-tight group-hover:text-orange-500 transition-colors truncate">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-2 text-[10px] font-bold uppercase tracking-widest opacity-40">
                          <span className="flex items-center gap-1">
                            <Clock size={10} /> {article.readTime}
                          </span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                      <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all shrink-0" />
                    </motion.article>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] border ${
                dark ? 'bg-stone-900/50 border-stone-800' : 'bg-white border-stone-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-stone-500/10">
                <TrendingUp size={16} className="text-orange-500" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Trending Topics</h3>
              </div>
              <div className="space-y-3">
                {TRENDING_TOPICS.map((topic, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-500/5 transition-colors cursor-pointer group">
                    <span className="text-xs font-black opacity-30 w-6">0{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold group-hover:text-orange-500 transition-colors truncate">
                        {topic.label}
                      </p>
                      <p className="text-[10px] opacity-40">{topic.readers} readers</p>
                    </div>
                    <topic.icon size={14} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: topic.color }} />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Newsletter */}
            <NewsletterSection dark={dark} />

            {/* Source Filter */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] border ${
                dark ? 'bg-stone-900/50 border-stone-800' : 'bg-white border-stone-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-stone-500/10">
                <Globe size={16} className="text-orange-500" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">News Sources</h3>
              </div>
              <div className="space-y-2">
                {Object.values(SOURCES).map((source, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-500/5 transition-colors">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black text-white"
                      style={{ background: source.color }}
                    >
                      {source.logo}
                    </div>
                    <div>
                      <p className="text-xs font-bold">{source.name}</p>
                      <p className="text-[10px] opacity-40 flex items-center gap-1">
                        <MapPin size={9} /> {source.origin}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </aside>
        </div>
      </main>
    </div>
  );
}
