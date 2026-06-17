import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  Github, ExternalLink, X, ArrowUpRight,
  Globe, Star, Search, Filter,
  LayoutGrid, List, Zap, Award,
  ChevronDown, Code2, Layers, Smartphone,
  Monitor, Heart, SlidersHorizontal,
} from 'lucide-react';

// ─── Constants ───────────────────────────────────────────
const PROJECTS_DATA = [
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
      'This very portfolio! Built with React, Framer Motion, and Tailwind CSS, featuring 3D card flips, smooth page transitions, multilingual support, and an interactive 3D globe background. Optimized for performance with lazy loading and code splitting.',
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

const CATEGORIES = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: 'web', label: 'Web Apps', icon: Monitor },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
];

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured', icon: Star },
  { id: 'recent', label: 'Most Recent', icon: Zap },
  { id: 'name', label: 'A-Z', icon: Filter },
];

const VIEW_OPTIONS = [
  { mode: 'grid', icon: LayoutGrid, label: 'Grid' },
  { mode: 'list', icon: List, label: 'List' },
];

// ─── Sub-Components ──────────────────────────────────────

const ProjectStats = ({ projects }) => {
  const { t } = useLanguage();
  const stats = useMemo(() => ({
    total: projects.length,
    featured: projects.filter(p => p.featured).length,
    technologies: new Set(projects.flatMap(p => p.technologies)).size,
  }), [projects]);

  const statItems = [
    { value: `${stats.total}+`, label: t('projects', 'Projects'), color: 'orange', icon: Code2 },
    { value: stats.featured, label: t('featured', 'Featured'), color: 'green', icon: Award },
    { value: stats.technologies, label: t('technologies', 'Technologies'), color: 'blue', icon: Zap },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-8 mb-8">
      {statItems.map(({ value, label, color, icon: Icon }) => (
        <div key={label} className="flex items-center gap-3">
          <div className={`p-2 rounded-xl bg-${color}-500/10 border border-${color}-500/20`}>
            <Icon size={20} className={`text-${color}-500`} />
          </div>
          <div>
            <p className={`text-2xl font-black text-${color}-500`}>{value}</p>
            <p className="text-[10px] uppercase tracking-wider text-stone-500">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const SearchBar = ({ value, onChange, onClear }) => {
  const { t } = useLanguage();
  
  return (
    <div className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-stone-900/50 border-stone-800">
      <Search size={14} className="text-stone-500" />
      <input
        type="text"
        placeholder={t('searchProjects', 'Search projects...')}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full sm:w-48 bg-transparent text-sm focus:outline-none text-white placeholder:text-stone-600"
      />
      {value && (
        <button onClick={onClear} className="text-stone-400 hover:text-orange-500 transition-colors">
          <X size={14} />
        </button>
      )}
    </div>
  );
};

const ViewToggle = ({ currentView, onViewChange }) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex rounded-xl border overflow-hidden border-stone-800">
      {VIEW_OPTIONS.map(({ mode, icon: Icon, label }) => (
        <button
          key={mode}
          onClick={() => onViewChange(mode)}
          className={`p-2.5 transition-all ${
            currentView === mode
              ? 'bg-orange-500 text-white'
              : 'bg-stone-900/50 text-stone-500 hover:bg-stone-800'
          }`}
          title={t(label.toLowerCase(), label)}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
};

const SortDropdown = ({ currentSort, onSortChange }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all bg-stone-900/50 border-stone-800 hover:border-stone-700"
      >
        <SlidersHorizontal size={14} className="text-stone-500" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
          {t('sort', 'Sort')}: {t(SORT_OPTIONS.find(s => s.id === currentSort)?.label || '')}
        </span>
        <ChevronDown size={14} className={`text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 top-full mt-2 p-2 rounded-xl border shadow-2xl z-50 min-w-[200px] bg-stone-900 border-stone-800"
          >
            {SORT_OPTIONS.map(option => (
              <button
                key={option.id}
                onClick={() => { onSortChange(option.id); setIsOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  currentSort === option.id
                    ? 'bg-orange-500/10 text-orange-500'
                    : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                }`}
              >
                <option.icon size={14} />
                {t(option.label, option.label)}
                {currentSort === option.id && <Star size={12} className="ml-auto" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CategoryTabs = ({ active, onCategoryChange, projects }) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {CATEGORIES.map(cat => {
        const count = cat.id === 'all' 
          ? projects.length 
          : projects.filter(p => p.category === cat.id).length;
          
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest border transition-all duration-300 ${
              active === cat.id
                ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/25'
                : 'border-stone-800 text-stone-500 hover:border-stone-600 hover:text-stone-300'
            }`}
          >
            <cat.icon size={13} />
            {t(cat.label, cat.label)}
            <span className={`text-[9px] ${active === cat.id ? 'text-white/70' : 'text-stone-600'}`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const ProjectCard = ({ project, onClick }) => {
  const { t } = useLanguage();
  
  return (
    <motion.article
      layoutId={`project-${project.id}`}
      onClick={() => onClick(project)}
      className="group rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 bg-stone-900/50 border-stone-800 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/5"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {project.featured && (
            <span className="flex items-center gap-1 bg-yellow-400 text-yellow-950 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
              <Star size={9} fill="currentColor" /> {t('featured', 'Featured')}
            </span>
          )}
          <span 
            className="px-2 py-0.5 rounded-full text-white text-[9px] font-bold uppercase tracking-wider backdrop-blur-md"
            style={{ background: `${project.color}60` }}
          >
            {t(project.category, project.category)}
          </span>
        </div>
      </div>
      
      <div className="p-4 sm:p-5">
        <h3 className="font-black text-sm mb-2 text-stone-100 group-hover:text-orange-500 transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="text-xs text-stone-500 line-clamp-2 mb-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.technologies.slice(0, 4).map(tech => (
            <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-800 text-stone-400">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-800 text-stone-400">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <a 
              href={project.links.github} 
              target="_blank" 
              rel="noreferrer" 
              onClick={e => e.stopPropagation()}
              className="p-2 rounded-lg border border-stone-700 text-stone-400 hover:bg-stone-800 hover:text-orange-400 transition-all"
            >
              <Github size={13} />
            </a>
            <a 
              href={project.links.demo} 
              target="_blank" 
              rel="noreferrer" 
              onClick={e => e.stopPropagation()}
              className="p-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/25"
            >
              <ExternalLink size={13} />
            </a>
          </div>
          <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all text-orange-500" />
        </div>
      </div>
    </motion.article>
  );
};

const ProjectListItem = ({ project, onClick }) => {
  const { t } = useLanguage();
  
  return (
    <motion.article
      layoutId={`project-${project.id}`}
      onClick={() => onClick(project)}
      className="group flex gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 bg-stone-900/50 border-stone-800 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/5"
    >
      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span 
            className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
            style={{ background: `${project.color}20`, color: project.color }}
          >
            {t(project.category, project.category)}
          </span>
          {project.featured && (
            <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-yellow-500">
              <Star size={9} fill="currentColor" /> {t('featured', 'Featured')}
            </span>
          )}
          <span className="text-[10px] text-stone-600 ml-auto">{project.year}</span>
        </div>
        
        <h3 className="font-black text-sm sm:text-lg text-stone-100 group-hover:text-orange-500 transition-colors mb-1 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-xs text-stone-500 line-clamp-2 hidden sm:block mb-2">{project.description}</p>
        
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map(tech => (
              <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-800 text-stone-400">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-800 text-stone-400">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
          
          <div className="flex gap-2 ml-auto">
            <a 
              href={project.links.github} 
              target="_blank" 
              rel="noreferrer" 
              onClick={e => e.stopPropagation()}
              className="p-2 rounded-lg border border-stone-700 text-stone-400 hover:bg-stone-800 hover:text-orange-400 transition-all"
            >
              <Github size={13} />
            </a>
            <a 
              href={project.links.demo} 
              target="_blank" 
              rel="noreferrer" 
              onClick={e => e.stopPropagation()}
              className="p-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/25"
            >
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const ProjectModal = ({ project, onClose }) => {
  const { t } = useLanguage();
  
  if (!project) return null;
  
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl bg-stone-900 border border-stone-800 scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-transparent"
      >
        <div className="relative h-56 sm:h-72 md:h-80 overflow-hidden rounded-t-3xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all border border-white/20"
          >
            <X size={18} />
          </button>

          <div className="absolute bottom-6 left-6 right-16">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span 
                className="px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
                style={{ background: `${project.color}60` }}
              >
                {t(project.category, project.category)}
              </span>
              {project.featured && (
                <span className="flex items-center gap-1 bg-yellow-400 text-yellow-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                  <Star size={9} fill="currentColor" /> {t('featured', 'Featured')}
                </span>
              )}
            </div>
            <h2 className="font-black text-3xl sm:text-4xl text-white leading-tight tracking-tight">
              {project.title}
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-base leading-relaxed mb-8 text-stone-300">
            {project.longDescription}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-5 rounded-2xl bg-stone-800/50">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-1">{t('year', 'Year')}</p>
              <p className="font-black text-lg text-stone-100">{project.year}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-1">{t('category', 'Category')}</p>
              <p className="font-black text-lg text-stone-100 capitalize">{t(project.category, project.category)}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-1">{t('views', 'Views')}</p>
              <p className="font-black text-lg text-stone-100">{project.stats.views}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-1">{t('likes', 'Likes')}</p>
              <div className="flex items-center gap-1">
                <Heart size={16} className="text-red-500 fill-red-500" />
                <p className="font-black text-lg text-stone-100">{project.stats.likes}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-3">{t('technologiesUsed', 'Technologies Used')}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold border bg-stone-800 text-stone-300 border-stone-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl text-sm transition-all shadow-lg shadow-orange-500/25"
            >
              <Globe size={16} /> {t('viewLive', 'View Live Project')}
              <ArrowUpRight size={14} />
            </a>
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 font-bold py-4 rounded-2xl text-sm transition-all bg-stone-100 text-stone-900 hover:bg-white"
            >
              <Github size={16} /> {t('viewSource', 'View Source Code')}
            </a>
            <button
              onClick={onClose}
              className="sm:flex-none flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-2xl text-sm transition-all border border-stone-700 text-stone-400 hover:bg-stone-800"
            >
              {t('close', 'Close')}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Main Component ─────────────────────────────────────

const Projects = () => {
  const { t } = useLanguage();
  
  // State
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Memoized filtered and sorted projects
  const filteredProjects = useMemo(() => {
    let filtered = activeCategory === 'all' 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category === activeCategory);
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.technologies.some(tech => tech.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [activeCategory, searchTerm]);

  const sortedProjects = useMemo(() => {
    const projects = [...filteredProjects];
    
    switch(sortBy) {
      case 'recent':
        return projects.sort((a, b) => b.year.localeCompare(a.year));
      case 'name':
        return projects.sort((a, b) => a.title.localeCompare(b.title));
      default: // featured
        return projects.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProjects, sortBy]);

  // Handlers
  const handleClearFilters = useCallback(() => {
    setActiveCategory('all');
    setSearchTerm('');
    setSortBy('featured');
  }, []);

  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  }, []);

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0c0b0a]"
    >
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-orange-500/[0.03] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/[0.03] blur-3xl" />
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <ProjectStats projects={PROJECTS_DATA} />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
                <span className="block w-5 h-px bg-orange-500" />
                {t('selectedWorks', 'Selected Works')}
              </p>
              <h2 className="text-[clamp(38px,5.5vw,72px)] font-black leading-[0.93] tracking-tight text-stone-100">
                {t('my', 'My')}{' '}
                <span className="italic text-orange-500">{t('creative', 'Creative')}</span>
                <br className="sm:hidden" /> {t('projects', 'Projects')}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-500 max-w-md">
                {t('A curated collection of digital experiences — from mobile apps to high-performance web platforms.')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <SearchBar 
                value={searchTerm}
                onChange={setSearchTerm}
                onClear={() => setSearchTerm('')}
              />
              <ViewToggle 
                currentView={viewMode}
                onViewChange={setViewMode}
              />
              <SortDropdown 
                currentSort={sortBy}
                onSortChange={setSortBy}
              />
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <CategoryTabs 
          active={activeCategory}
          onCategoryChange={setActiveCategory}
          projects={PROJECTS_DATA}
        />

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          {sortedProjects.length > 0 ? (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
                : 'space-y-3'
              }
            >
              {sortedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  {viewMode === 'grid' ? (
                    <ProjectCard project={project} onClick={handleProjectClick} />
                  ) : (
                    <ProjectListItem project={project} onClick={handleProjectClick} />
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <Search size={40} className="mx-auto mb-4 text-stone-600" />
              <p className="text-lg font-bold text-stone-500">
                {t('noProjects', 'No projects found')}
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 text-sm font-bold text-orange-500 hover:underline transition-all"
              >
                {t('clearFilters', 'Clear all filters')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={handleModalClose} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
