import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Search, Calendar, ArrowUpRight, Newspaper, 
  Clock, TrendingUp, ChevronRight, Share2 
} from 'lucide-react';

const NEWS_DATA = [
  {
    id: 1,
    category: 'Development',
    title: 'The Rise of AI-First Frameworks in 2026',
    excerpt: 'The shift from imperative coding to declarative intent is here. New frameworks are leveraging native LLM hooks to predict user needs before they even click.',
    date: 'April 05, 2026',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    color: '#3B82F6',
    featured: true
  },
  {
    id: 2,
    category: 'Design',
    title: 'Dopamine Design & High-Energy Palettes',
    excerpt: 'Neo-brutalism meets organic gradients. Why the 2026 aesthetic is abandoning the "bland-core" minimalism of the early 20s.',
    date: 'April 02, 2026',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
    color: '#EC4899',
    featured: false
  },
  {
    id: 3,
    category: 'Tech',
    title: 'Post-Quantum Encryption for PERN Stacks',
    excerpt: 'As quantum supremacy approaches, securing your MySQL and Node.js infrastructure requires new cryptographic standards.',
    date: 'March 28, 2026',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    color: '#8B5CF6',
    featured: false
  },
  {
    id: 4,
    category: 'Development',
    title: 'Tailwind 5.0: The End of Runtime CSS?',
    excerpt: 'Exploring the new engine that compiles styles directly into binary streams for sub-millisecond paint times.',
    date: 'March 20, 2026',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800',
    color: '#06B6D4',
    featured: false
  }
];

const NewsFeed = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Development', 'Design', 'Tech'];
  
  const filteredNews = useMemo(() => {
    return NEWS_DATA.filter(news => {
      const matchesCategory = filter === 'All' || news.category === filter;
      const matchesSearch = news.title.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  return (
    <section className="min-h-screen bg-[#020617] text-white py-20 px-4 md:px-10 font-sans selection:bg-blue-500/30">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- Navigation & Search Bar --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Newspaper className="text-blue-500" size={24} />
              </div>
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-500">{t('newsFeedSubtitle')}</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
              {t('newsFeedTitle')}
            </h2>
          </motion.div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={20} />
              <input 
                type="text"
                placeholder={t('searchPlaceholder')}
                className="w-full sm:w-80 bg-slate-900/40 border-b-2 border-white/5 py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-all font-mono text-sm"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 bg-slate-900/30 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    filter === cat ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* --- Main Content Area --- */}
          <div className="lg:col-span-8 space-y-10">
            <AnimatePresence mode="popLayout">
              {filteredNews.map((news, idx) => (
                <motion.article
                  key={news.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`group relative flex flex-col overflow-hidden bg-slate-900/20 border border-white/5 rounded-3xl transition-all hover:bg-slate-900/40 ${
                    news.featured ? 'md:flex-row' : ''
                  }`}
                >
                  {/* Image Section */}
                  <div className={`relative overflow-hidden ${news.featured ? 'md:w-1/2 h-80 md:h-auto' : 'h-64'}`}>
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                  </div>

                  {/* Text Section */}
                  <div className="p-8 md:p-10 flex flex-col justify-between grow">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-blue-400">
                          {news.category}
                        </span>
                        <div className="flex gap-4 text-slate-500">
                          <div className="flex items-center gap-1 text-[10px] font-bold uppercase"><Clock size={12}/> {news.readTime}</div>
                        </div>
                      </div>
                      <h3 className={`font-black mb-4 leading-[1.1] group-hover:text-blue-400 transition-colors uppercase ${
                        news.featured ? 'text-3xl md:text-5xl' : 'text-2xl'
                      }`}>
                        {news.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-8">
                        {news.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase">
                        <Calendar size={14} /> {news.date}
                      </div>
                      <button className="p-3 rounded-full bg-white/5 hover:bg-blue-600 transition-all text-white group/btn">
                        <ArrowUpRight size={20} className="group-hover/btn:rotate-45 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* --- Sidebar (Trending & Info) --- */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl sticky top-10">
              <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                <TrendingUp size={18} className="text-pink-500" />
                <h4 className="text-xs font-black uppercase tracking-[0.3em]">{t('trendingDossiers')}</h4>
              </div>
              
              <ul className="space-y-6">
                {['React Server Components', 'Web3.0 Rebirth', 'Neural Branding', 'Edge Computing'].map((item, i) => (
                  <li key={i} className="group flex items-start gap-4 cursor-pointer">
                    <span className="text-slate-700 font-mono text-xl group-hover:text-blue-500 transition-colors">0{i+1}</span>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold uppercase group-hover:underline underline-offset-4">{item}</p>
                      <span className="text-[10px] text-slate-500 font-black tracking-widest uppercase">7.2k Readers</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20">
                <h5 className="text-sm font-black mb-2 uppercase italic">{t('subscribeTitle')}</h5>
                <p className="text-xs text-slate-400 mb-6">{t('subscribeText')}</p>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="name@domain.tech"
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-blue-500"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-400 hover:text-white transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
};

export default NewsFeed;