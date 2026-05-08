import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  Github, ExternalLink, X, ArrowUpRight,
  Globe, Star, Eye, Search, Filter,
  LayoutGrid, List, Sparkles, TrendingUp,
  Calendar, Clock, Users, Zap, Award,
  ChevronDown, Code2, Layers, Smartphone,
  Monitor, Maximize2, Minimize2, Heart,
  Share2, Bookmark, SlidersHorizontal,
} from 'lucide-react';

const Projects = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const dark = theme === 'dark';
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('bento'); // bento | grid | list
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // featured | recent | name
  const [showFilters, setShowFilters] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'Market-Kigali',
      description: 'A mobile marketplace app connecting local vendors with customers in Kigali.',
      longDescription:
        'Market-Kigali is a comprehensive e-commerce platform designed specifically for local vendors in Rwanda. It features real-time inventory management, secure payments through MoMo and card integration, multilingual support (English, Kinyarwanda, French), and a user-friendly interface optimized for low-bandwidth connections.',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
      links: { github: 'https://github.com/witfab-dev/ecomerce', demo: 'https://witfab-dev.github.io/ecomerce/' },
      year: '2024',
      featured: true,
      stats: { views: 234, likes: 45 },
      color: '#f97316',
    },
    {
      id: 2,
      title: 'KATSS Website',
      description: 'Interactive website for Kirehe Adventist TVET School with dynamic content management.',
      longDescription:
        'An interactive website developed for Kirehe Adventist TVET School. Designed to provide school information, course catalogs, student portal, and improve communication between students, teachers, and the community. Features include event calendar, announcement board, and downloadable resources.',
      category: 'web',
      image: '/images/katss.png',
      technologies: ['HTML', 'JavaScript', 'CSS', 'UI/UX'],
      links: { github: 'https://github.com/witfab-dev/katss', demo: 'https://witfab-dev.github.io/katss/public' },
      year: '2023',
      featured: true,
      stats: { views: 189, likes: 38 },
      color: '#3b82f6',
    },
    {
      id: 3,
      title: 'Portfolio 2025',
      description: 'Modern interactive portfolio with 3D elements and smooth animations.',
      longDescription:
        'This very portfolio! Built with React, Framer Motion, and Tailwind CSS, featuring 3D card flips, smooth page transitions, dark/light mode, multilingual support, and an interactive 3D globe background. Optimized for performance with lazy loading and code splitting.',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop',
      technologies: ['React', 'Tailwind', 'Framer Motion', 'Three.js'],
      links: { github: 'https://github.com/witfab-dev/myportfolio', demo: 'https://witfab-dev.github.io/myportfolio/' },
      year: '2025',
      featured: true,
      stats: { views: 567, likes: 92 },
      color: '#8b5cf6',
    },
    {
      id: 4,
      title: 'PSSMS',
      description: 'Full-stack Parking Slot Management System with real-time tracking and billing.',
      longDescription:
        'A full-stack parking management solution handling car registration, real-time slot tracking across multiple parking zones, automated billing (500 RWF/hr), professional invoice generation with PDF export, admin dashboard with analytics, and SMS notifications for slot availability.',
      category: 'mobile',
      image: '/images/pssms.jpg',
      technologies: ['React', 'Node.js', 'Tailwind', 'PostgreSQL'],
      links: { github: 'https://github.com/witfab-dev/PSSMS', demo: 'https://witfab-dev.github.io/PSSMS/' },
      year: '2025',
      featured: true,
      stats: { views: 312, likes: 67 },
      color: '#10b981',
    },
    {
      id: 5,
      title: 'Rwanda Explorer',
      description: 'An educational game taking players on a virtual journey through Rwanda.',
      longDescription:
        "Rwanda Explorer is an educational game that takes players on a virtual journey through the \"Land of a Thousand Hills.\" Explore Rwanda's culture, geography, history, and wildlife through interactive quizzes, 3D maps, and gamified learning paths. Features voice narration in Kinyarwanda and English.",
      category: 'web',
      image: 'images/Screenshot 2026-04-15 103058.png',
      technologies: ['Vue.js', 'CSS', 'Game Design', 'Animation'],
      links: { github: 'https://github.com/witfab-dev/rwanda-explorer-game', demo: 'https://rwanda-explorer-game.vercel.app/' },
      year: '2024',
      featured: true,
      stats: { views: 445, likes: 78 },
      color: '#ec4899',
    },
    {
      id: 6,
      title: 'DevConnect',
      description: 'Developer networking platform with real-time chat and project collaboration.',
      longDescription: 'A social platform for developers to connect, share projects, and collaborate in real-time. Features include project showcases, skill endorsements, direct messaging, and team formation tools.',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop',
      technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      links: { github: '#', demo: '#' },
      year: '2025',
      featured: false,
      stats: { views: 156, likes: 34 },
      color: '#06b6d4',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: Layers, count: projects.length },
    { id: 'web', label: 'Web Apps', icon: Monitor, count: projects.filter(p => p.category === 'web').length },
    { id: 'mobile', label: 'Mobile', icon: Smartphone, count: projects.filter(p => p.category === 'mobile').length },
  ];

  const sortOptions = [
    { id: 'featured', label: 'Featured', icon: Star },
    { id: 'recent', label: 'Most Recent', icon: Clock },
    { id: 'name', label: 'A-Z', icon: Filter },
  ];

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = activeCategory === 'all' 
      ? projects 
      : projects.filter(p => p.category === activeCategory);
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    switch(sortBy) {
      case 'recent':
        return [...filtered].sort((a, b) => b.year.localeCompare(a.year));
      case 'name':
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      default: // featured
        return [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [activeCategory, searchTerm, sortBy]);

  return (
    <section
      id="projects"
      className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500 ${
        dark ? 'bg-[#0c0b0a]' : 'bg-stone-50'
      }`}
    >
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-orange-500/[0.03] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/[0.03] blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">

        {/* ── Header Section ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          {/* Stats Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <Code2 size={20} className="text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-black text-orange-500">{projects.length}+</p>
                <p className="text-[10px] uppercase tracking-wider opacity-50">Projects</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20">
                <Award size={20} className="text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-black text-green-500">{projects.filter(p => p.featured).length}</p>
                <p className="text-[10px] uppercase tracking-wider opacity-50">Featured</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <Zap size={20} className="text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-black text-blue-500">{new Set(projects.flatMap(p => p.technologies)).size}</p>
                <p className="text-[10px] uppercase tracking-wider opacity-50">Technologies</p>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
                <span className="block w-5 h-px bg-orange-500" />
                Selected Works
              </p>
              <h2 className={`text-[clamp(38px,5.5vw,72px)] font-black leading-[0.93] tracking-tight ${
                dark ? 'text-stone-100' : 'text-stone-900'
              }`}>
                My{' '}
                <span className="italic text-orange-500">Creative</span>
                <br className="sm:hidden" /> Projects
              </h2>
              <p className="mt-4 text-sm leading-relaxed opacity-60 max-w-md">
                A curated collection of digital experiences — from mobile apps to high-performance web platforms.
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl border ${
                dark ? 'bg-stone-900/50 border-stone-800' : 'bg-white border-stone-200'
              }`}>
                <Search size={14} className="opacity-40" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className={`w-full sm:w-48 bg-transparent text-sm focus:outline-none ${
                    dark ? 'text-white placeholder:text-stone-600' : 'text-stone-900 placeholder:text-stone-400'
                  }`}
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="hover:text-orange-500">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* View Toggle */}
              <div className={`flex rounded-xl border overflow-hidden ${
                dark ? 'border-stone-800' : 'border-stone-200'
              }`}>
                {[
                  { mode: 'bento', icon: LayoutGrid, label: 'Bento' },
                  { mode: 'grid', icon: Maximize2, label: 'Grid' },
                  { mode: 'list', icon: List, label: 'List' },
                ].map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-2.5 transition-all ${
                      viewMode === mode
                        ? 'bg-orange-500 text-white'
                        : 'hover:bg-stone-100 dark:hover:bg-stone-800 opacity-60'
                    }`}
                    title={label}
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                    dark ? 'bg-stone-900/50 border-stone-800 hover:border-stone-700' : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <SlidersHorizontal size={14} className="opacity-60" />
                  <span className="text-[11px] font-bold uppercase tracking-wider opacity-60">
                    Sort: {sortOptions.find(s => s.id === sortBy)?.label}
                  </span>
                  <ChevronDown size={14} className="opacity-40" />
                </button>
                
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute right-0 top-full mt-2 p-2 rounded-xl border shadow-2xl z-50 min-w-[200px] ${
                        dark ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
                      }`}
                    >
                      {sortOptions.map(option => (
                        <button
                          key={option.id}
                          onClick={() => { setSortBy(option.id); setShowFilters(false); }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
                            sortBy === option.id
                              ? 'bg-orange-500/10 text-orange-500'
                              : 'hover:bg-stone-100 dark:hover:bg-stone-800 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <option.icon size={14} />
                          {option.label}
                          {sortBy === option.id && <Star size={12} className="ml-auto" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Category Tabs ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/25'
                  : `border-stone-200 dark:border-stone-800 opacity-60 hover:opacity-100 hover:border-stone-400 dark:hover:border-stone-600 ${
                      dark ? 'text-stone-400' : 'text-stone-600'
                    }`
              }`}
            >
              <cat.icon size={13} />
              {cat.label}
              <span className={`text-[9px] ${activeCategory === cat.id ? 'text-white/70' : 'opacity-40'}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── Projects Display ───────────────────────── */}
        <AnimatePresence mode="wait">
          
          {/* Bento Layout */}
          {viewMode === 'bento' && (
            <motion.div
              key="bento"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min"
            >
              {filteredAndSortedProjects.map((project, i) => {
                const layouts = [
                  'md:col-span-7 md:row-span-2',
                  'md:col-span-5',
                  'md:col-span-5',
                  'md:col-span-7',
                  'md:col-span-12 md:row-span-1',
                ];
                const layout = layouts[i % layouts.length];
                const isLarge = layout.includes('row-span-2');
                
                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    onClick={() => setSelectedProject(project)}
                    className={`group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 ${layout} ${
                      dark 
                        ? 'bg-stone-900/50 border-stone-800 hover:border-orange-500/50' 
                        : 'bg-white border-stone-200 hover:border-orange-400 hover:shadow-2xl'
                    }`}
                  >
                    <div className={`relative overflow-hidden ${isLarge ? 'h-full' : 'h-48 sm:h-56'}`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Featured badge */}
                      {project.featured && (
                        <div className="absolute top-3 left-3 flex items-center gap-1 bg-yellow-400 text-yellow-950 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
                          <Star size={9} fill="currentColor" /> Featured
                        </div>
                      )}
                      
                      {/* Category badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md text-white border border-white/20"
                        style={{ background: `${project.color}40` }}>
                        {project.category}
                      </div>

                      {/* Hover actions */}
                      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="px-4 py-2 bg-orange-500 text-white text-xs font-bold rounded-full hover:bg-orange-600 transition-all shadow-lg flex items-center gap-1.5"
                        >
                          <Eye size={12} /> Live Demo
                        </a>
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="px-4 py-2 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full hover:bg-white/30 transition-all flex items-center gap-1.5 border border-white/20"
                        >
                          <Github size={12} /> Code
                        </a>
                      </div>
                    </div>

                    {!isLarge && (
                      <div className="p-4 sm:p-5">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-black text-sm sm:text-base leading-tight group-hover:text-orange-500 transition-colors ${
                            dark ? 'text-stone-100' : 'text-stone-900'
                          }`}>
                            {project.title}
                          </h3>
                          <span className="text-[10px] font-mono opacity-40">{project.year}</span>
                        </div>
                        <p className={`text-xs leading-relaxed line-clamp-2 mb-3 ${
                          dark ? 'text-stone-500' : 'text-stone-500'
                        }`}>
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 3).map(tech => (
                            <span
                              key={tech}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                                dark 
                                  ? 'bg-stone-800 text-stone-400 border border-stone-700/50' 
                                  : 'bg-stone-100 text-stone-600 border border-stone-200'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold text-orange-500">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.article>
                );
              })}
            </motion.div>
          )}

          {/* Grid Layout */}
          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {filteredAndSortedProjects.map((project, i) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setSelectedProject(project)}
                  className={`group rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 ${
                    dark 
                      ? 'bg-stone-900/50 border-stone-800 hover:border-orange-500/50' 
                      : 'bg-white border-stone-200 hover:shadow-xl hover:border-orange-300'
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {project.featured && (
                        <span className="flex items-center gap-1 bg-yellow-400 text-yellow-950 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                          <Star size={9} fill="currentColor" /> Featured
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full text-white text-[9px] font-bold uppercase tracking-wider backdrop-blur-md"
                        style={{ background: `${project.color}60` }}>
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className={`font-black text-sm mb-2 group-hover:text-orange-500 transition-colors ${
                      dark ? 'text-stone-100' : 'text-stone-900'
                    }`}>{project.title}</h3>
                    <p className="text-xs opacity-60 line-clamp-2 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.technologies.slice(0, 4).map(tech => (
                        <span key={tech} className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          dark ? 'bg-stone-800 text-stone-400' : 'bg-stone-100 text-stone-600'
                        }`}>{tech}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <a href={project.links.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                          className={`p-2 rounded-lg border transition-all ${
                            dark ? 'border-stone-700 text-stone-400 hover:bg-stone-800' : 'border-stone-200 text-stone-500 hover:bg-stone-100'
                          }`}>
                          <Github size={13} />
                        </a>
                        <a href={project.links.demo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                          className="p-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all">
                          <ExternalLink size={13} />
                        </a>
                      </div>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all text-orange-500" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

          {/* List Layout */}
          {viewMode === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {filteredAndSortedProjects.map((project, i) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                  className={`group flex gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    dark 
                      ? 'bg-stone-900/50 border-stone-800 hover:border-orange-500/50' 
                      : 'bg-white border-stone-200 hover:border-orange-300 hover:shadow-lg'
                  }`}
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                        style={{ background: `${project.color}20`, color: project.color }}>
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-yellow-500">
                          <Star size={9} fill="currentColor" /> Featured
                        </span>
                      )}
                      <span className="text-[10px] opacity-40 ml-auto">{project.year}</span>
                    </div>
                    <h3 className={`font-black text-sm sm:text-lg group-hover:text-orange-500 transition-colors mb-1 ${
                      dark ? 'text-stone-100' : 'text-stone-900'
                    }`}>{project.title}</h3>
                    <p className="text-xs opacity-60 line-clamp-2 hidden sm:block mb-2">{project.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map(tech => (
                          <span key={tech} className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            dark ? 'bg-stone-800 text-stone-400' : 'bg-stone-100 text-stone-600'
                          }`}>{tech}</span>
                        ))}
                      </div>
                      <div className="flex gap-2 ml-auto">
                        <a href={project.links.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                          className={`p-2 rounded-lg border transition-all ${
                            dark ? 'border-stone-700 text-stone-400 hover:bg-stone-800' : 'border-stone-200 text-stone-500 hover:bg-stone-100'
                          }`}>
                          <Github size={13} />
                        </a>
                        <a href={project.links.demo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                          className="p-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all">
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Empty State ───────────────────────────── */}
        {filteredAndSortedProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <Search size={40} className="mx-auto mb-4 opacity-20" />
            <p className={`text-lg font-bold opacity-40 ${dark ? 'text-stone-400' : 'text-stone-600'}`}>
              No projects found
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchTerm(''); setSortBy('featured'); }}
              className="mt-4 text-sm font-bold text-orange-500 hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        {/* ── Detail Modal ───────────────────────────── */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${
                  dark ? 'bg-stone-900 border border-stone-800' : 'bg-white'
                }`}
              >
                {/* Hero Image */}
                <div className="relative h-56 sm:h-72 md:h-80 overflow-hidden rounded-t-3xl">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all border border-white/20"
                  >
                    <X size={18} />
                  </button>

                  <div className="absolute bottom-6 left-6 right-16">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
                        style={{ background: `${selectedProject.color}60` }}>
                        {selectedProject.category}
                      </span>
                      {selectedProject.featured && (
                        <span className="flex items-center gap-1 bg-yellow-400 text-yellow-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                          <Star size={9} fill="currentColor" /> Featured
                        </span>
                      )}
                    </div>
                    <h2 className="font-black text-3xl sm:text-4xl text-white leading-tight tracking-tight">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  {/* Description */}
                  <p className={`text-base leading-relaxed mb-8 ${
                    dark ? 'text-stone-300' : 'text-stone-600'
                  }`}>
                    {selectedProject.longDescription}
                  </p>

                  {/* Meta Information */}
                  <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-5 rounded-2xl ${
                    dark ? 'bg-stone-800/50' : 'bg-stone-50'
                  }`}>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Year</p>
                      <p className={`font-black text-lg ${dark ? 'text-stone-100' : 'text-stone-900'}`}>{selectedProject.year}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Category</p>
                      <p className={`font-black text-lg capitalize ${dark ? 'text-stone-100' : 'text-stone-900'}`}>{selectedProject.category}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Views</p>
                      <p className={`font-black text-lg ${dark ? 'text-stone-100' : 'text-stone-900'}`}>{selectedProject.stats.views}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Likes</p>
                      <div className="flex items-center gap-1">
                        <Heart size={16} className="text-red-500 fill-red-500" />
                        <p className={`font-black text-lg ${dark ? 'text-stone-100' : 'text-stone-900'}`}>{selectedProject.stats.likes}</p>
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-8">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-3">Technologies Used</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${
                            dark 
                              ? 'bg-stone-800 text-stone-400 border-stone-700' 
                              : 'bg-white text-stone-600 border-stone-200 shadow-sm'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl text-sm transition-all shadow-lg shadow-orange-500/25"
                    >
                      <Globe size={16} /> View Live Project
                      <ArrowUpRight size={14} />
                    </a>
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 font-bold py-4 rounded-2xl text-sm transition-all ${
                        dark 
                          ? 'bg-stone-100 text-stone-900 hover:bg-white' 
                          : 'bg-stone-900 text-white hover:bg-black'
                      }`}
                    >
                      <Github size={16} /> View Source Code
                    </a>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className={`sm:flex-none flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-2xl text-sm transition-all border ${
                        dark ? 'border-stone-700 text-stone-400 hover:bg-stone-800' : 'border-stone-200 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
