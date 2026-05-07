import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Search, Calendar, ArrowUpRight, Clock, 
  TrendingUp, Globe, X, ExternalLink, 
  BookOpen, Share2, Bookmark, MapPin,
  ChevronRight, ArrowLeft
} from 'lucide-react';

/* ─── GLOBAL SOURCE REGISTRY ────────────────────────────────── */
const SOURCES = {
  BLOOMBERG: { name: 'Bloomberg', origin: 'New York, USA', color: '#0000ff' },
  WIRED: { name: 'Wired', origin: 'San Francisco, USA', color: '#ff0000' },
  REUTERS: { name: 'Reuters', origin: 'London, UK', color: '#ff8000' },
  VERGE: { name: 'The Verge', origin: 'Washington D.C., USA', color: '#e91e63' }
};

const NEWS_DATA = [
  {
    id: 1,
    source: SOURCES.WIRED,
    category: 'Development',
    title: 'The Rise of AI-First Frameworks in 2026',
    excerpt: 'The shift from imperative coding to declarative intent is here. New frameworks leverage native LLM hooks.',
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
  },
  {
    id: 2,
    source: SOURCES.REUTERS,
    category: 'Tech',
    title: 'Post-Quantum Encryption for PERN Stacks',
    excerpt: 'As quantum supremacy approaches, securing Node.js infrastructure requires new cryptographic standards.',
    content: `London researchers have successfully demonstrated a 'Shor’s Algorithm' variant capable of decrypting standard RSA-2048 in under 12 minutes. The response from the open-source community has been swift. 
    
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
  }
];

/* ─── ARTICLE READER (MODAL) ────────────────────────────────── */
const FullNewsModal = ({ article, onClose, dark }) => {
  if (!article) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/90 backdrop-blur-xl p-0 sm:p-4"
    >
      <motion.div 
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`w-full h-full max-w-5xl md:h-[95vh] overflow-y-auto rounded-none md:rounded-[2.5rem] shadow-2xl relative ${
          dark ? 'bg-[#121110] text-stone-100 border border-stone-800' : 'bg-white text-stone-900'
        }`}
      >
        {/* Top Navigation Bar */}
        <div className="sticky top-0 z-50 flex items-center justify-between p-6 bg-inherit/80 backdrop-blur-md border-b border-stone-500/10">
          <button onClick={onClose} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
            <ArrowLeft size={16} /> Back to Feed
          </button>
          <div className="flex items-center gap-4">
            <Share2 size={18} className="cursor-pointer opacity-50 hover:opacity-100" />
            <Bookmark size={18} className="cursor-pointer opacity-50 hover:opacity-100" />
            <button onClick={onClose} className="p-2 rounded-full bg-stone-500/10 hover:bg-orange-500 hover:text-white transition-all">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 md:p-16">
          {/* Origin Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20">
                {article.source.name[0]}
              </div>
              <div>
                <h4 className="font-black text-lg">{article.source.name}</h4>
                <p className="text-xs opacity-50 flex items-center gap-1 font-medium italic">
                  <MapPin size={12} className="text-orange-500" /> {article.source.origin}
                </p>
              </div>
            </div>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-40">
              <div className="flex flex-col italic"><span className="not-italic opacity-50">Published</span>{article.date}</div>
              <div className="flex flex-col italic"><span className="not-italic opacity-50">Reading Time</span>{article.readTime}</div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-10 leading-[1.05] tracking-tight max-w-4xl">
            {article.title}
          </h1>

          <img src={article.image} alt="" className="w-full h-[300px] md:h-[500px] object-cover rounded-[2rem] mb-12 shadow-2xl" />

          <div className="max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl leading-relaxed font-medium mb-8 text-orange-500/90 italic">
              {article.excerpt}
            </p>
            <div className="prose prose-stone dark:prose-invert prose-lg max-w-none mb-16 opacity-80 leading-loose whitespace-pre-line">
              {article.content}
            </div>

            {/* Origin & References Section */}
            <div className={`p-8 rounded-[2rem] border ${dark ? 'bg-stone-900/40 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen size={20} className="text-orange-500" />
                <h3 className="text-sm font-black uppercase tracking-[0.2em]">Primary References</h3>
              </div>
              <div className="grid gap-3">
                {article.references.map((ref, i) => (
                  <a key={i} href={ref.url} target="_blank" rel="noreferrer" className={`group flex items-center justify-between p-5 rounded-2xl border transition-all ${
                    dark ? 'bg-stone-950/50 border-stone-800 hover:border-orange-500/50' : 'bg-white border-stone-200 hover:shadow-xl'
                  }`}>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-orange-500 mb-1">{ref.type}</p>
                      <p className="text-sm font-bold">{ref.site}</p>
                    </div>
                    <ExternalLink size={16} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
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

/* ─── MAIN COMPONENT ────────────────────────────────────────── */
export default function NewsApp() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className={`min-h-screen font-sans selection:bg-orange-500/30 ${dark ? 'bg-[#0c0b0a] text-stone-100' : 'bg-stone-50 text-stone-900'}`}>
      
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

      <main className="max-w-7xl mx-auto px-6 py-20">
        <header className="mb-20">
          <p className="text-orange-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
            <span className="w-12 h-px bg-orange-500" /> Global Intel 2026
          </p>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85]">
            The <br /><span className="text-orange-500 italic">Dispatch.</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {NEWS_DATA.map((article) => (
            <motion.article
              key={article.id}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] mb-6">
                <img src={article.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20">
                  {article.category}
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-widest opacity-40">
                <Globe size={12} /> {article.source.name} • {article.source.origin}
              </div>
              <h2 className="text-3xl font-black leading-tight group-hover:text-orange-500 transition-colors mb-4">
                {article.title}
              </h2>
              <div className="flex items-center gap-4 text-xs font-bold opacity-60">
                <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime}</span>
                <ChevronRight size={16} className="text-orange-500 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.article>
          ))}
        </div>
      </main>
    </div>
  );
}
