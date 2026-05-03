import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, ExternalLink, X, ArrowUpRight,
  Globe, Star, Eye,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

/* Bento sizing: cycles through these for each card in the filtered list */
const bentoLayout = [
  'md:col-span-7',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-7',
  'md:col-span-12',
];

const imgHeight = [
  'h-72',
  'h-64',
  'h-56',
  'h-56',
  'h-52',
];

const Projects = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Market-Kigali',
      description: 'A mobile marketplace app connecting local vendors with customers in Kigali.',
      longDescription:
        'Market-Kigali is a comprehensive e-commerce platform designed specifically for local vendors in Rwanda. It features real-time inventory management, secure payments, and a user-friendly interface.',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop',
      technologies: ['HTML', 'CSS', 'JS'],
      links: { github: 'https://github.com/witfab-dev/ecomerce', demo: 'https://witfab-dev.github.io/ecomerce/' },
      year: '2024',
      featured: true,
    },
    {
      id: 2,
      title: 'KATSS Website',
      description: 'Interactive website for Kirehe Adventist TVET School.',
      longDescription:
        'An interactive website developed for Kirehe Adventist TVET School. Designed to provide school information and improve communication between students, teachers, and the community.',
      category: 'web',
      image: '/images/katss.png',
      technologies: ['HTML', 'JS', 'CSS'],
      links: { github: 'https://github.com/witfab-dev/katss', demo: 'https://witfab-dev.github.io/katss/public' },
      year: '2023',
      featured: true,
    },
    {
      id: 5,
      title: 'Portfolio 2025',
      description: 'Modern interactive portfolio with 3D elements and smooth animations.',
      longDescription:
        'This very portfolio! Built with React, Framer Motion, and Tailwind CSS, featuring 3D card flips and smooth animations.',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop',
      technologies: ['React', 'Tailwind', 'Framer Motion'],
      links: { github: 'https://github.com/witfab-dev/myportfolio', demo: 'https://witfab-dev.github.io/myportfolio/' },
      year: '2025',
      featured: true,
    },
    {
      id: 6,
      title: 'PSSMS',
      description: 'Full-stack Parking Slot Management System with real-time tracking.',
      longDescription:
        'A full-stack parking management solution handling car registration, real-time slot tracking, automated billing (500 RWF/hr), and professional invoice generation.',
      category: 'mobile',
      image: '/images/pssms.jpg',
      technologies: ['React', 'Node.js', 'Tailwind'],
      links: { github: 'https://github.com/witfab-dev/PSSMS', demo: 'https://witfab-dev.github.io/PSSMS/' },
      year: '2025',
      featured: true,
    },
    {
      id: 7,
      title: 'Rwanda Explorer',
      description: 'An educational game taking players on a virtual journey through Rwanda.',
      longDescription:
        "Rwanda Explorer is an educational game that takes players on a virtual journey through the \"Land of a Thousand Hills.\" Explore Rwanda's culture, geography, and history interactively.",
      category: 'web',
      image: 'images/Screenshot 2026-04-15 103058.png',
      technologies: ['Vue', 'CSS'],
      links: { github: 'https://github.com/witfab-dev/rwanda-explorer-game', demo: 'https://rwanda-explorer-game.vercel.app/' },
      year: '2024',
      featured: true,
    },
  ];

  const categories = ['all', 'web', 'mobile'];
  const filteredProjects =
    activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-6 bg-stone-100 dark:bg-[#0c0b0a] overflow-hidden transition-colors duration-500"
    >
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full bg-orange-500/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -left-24 w-[420px] h-[420px] rounded-full bg-blue-500/[0.05] blur-3xl" />

      <div className="relative max-w-[1200px] mx-auto">

        {/* ── Header ─────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {/* Eyebrow */}
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
              <span className="block w-5 h-px bg-orange-500" />
              Selected Works
            </p>

            {/* Headline */}
            <h2 className="text-[clamp(38px,5.5vw,66px)] font-black leading-[0.93] tracking-tight text-stone-900 dark:text-stone-100">
              My{' '}
              <span className="italic text-orange-500 not-italic">Creative</span>
              <br />Projects
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-stone-500 dark:text-stone-500 max-w-xs">
              A curated collection of digital experiences — from mobile apps to high-performance web platforms.
            </p>
          </motion.div>

          {/* Filter pills */}
          <motion.div
            className="flex gap-2 flex-wrap"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {categories.map((cat) => {
              const count = cat === 'all' ? projects.length : projects.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-transparent border-stone-300 dark:border-stone-700 text-stone-400 dark:text-stone-500 hover:border-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}
                >
                  {cat}
                  <span className="ml-1.5 opacity-60 text-[9px]">{count}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* ── Bento Grid ─────────────────────────────── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                onClick={() => setSelectedProject(project)}
                className={`group relative bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800/60 rounded-2xl overflow-hidden cursor-pointer
                  hover:border-orange-400 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.35),0_20px_48px_rgba(0,0,0,0.1)]
                  transition-all duration-300 col-span-1 ${bentoLayout[i % bentoLayout.length]}`}
              >
                {/* ── Image ── */}
                <div className={`relative overflow-hidden ${imgHeight[i % imgHeight.length]}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <span className="flex items-center gap-2 bg-orange-500 text-white text-[11px] font-bold px-4 py-2 rounded-full translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye size={13} /> View Details
                    </span>
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-yellow-400 text-yellow-950 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow">
                      <Star size={9} fill="currentColor" /> Featured
                    </div>
                  )}

                  {/* Category chip */}
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
                    {project.category}
                  </div>
                </div>

                {/* ── Body ── */}
                <div className="p-5">
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-black text-[clamp(15px,1.8vw,20px)] leading-tight tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-orange-500 transition-colors">
                      {project.title}
                    </h3>
                    <span className="shrink-0 text-[11px] font-light text-stone-400 dark:text-stone-600 font-mono mt-0.5">
                      {project.year}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-500 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800/60 text-stone-500 dark:text-stone-400 text-[10px] font-semibold rounded-md border border-stone-200 dark:border-stone-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div
                    className="flex items-center justify-between pt-3.5 border-t border-stone-100 dark:border-stone-800/60"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex gap-2">
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/50 text-stone-400 hover:bg-stone-900 hover:text-white hover:border-stone-900 dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all"
                      >
                        <Github size={13} />
                      </a>
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/50 text-stone-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all"
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-1 text-[11px] font-bold text-orange-500 hover:gap-2 transition-all duration-200"
                    >
                      Details <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Empty state ────────────────────────────── */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-24 text-stone-400 dark:text-stone-600">
            <p className="text-sm font-medium">No projects in this category yet.</p>
          </div>
        )}

        {/* ── Detail Modal ───────────────────────────── */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/75 backdrop-blur-xl"
              />

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-stone-100 dark:bg-[#161513] rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800"
              >
                {/* Hero */}
                <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Close */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-sm border border-white/10"
                  >
                    <X size={17} />
                  </button>

                  {/* Overlay title */}
                  <div className="absolute bottom-6 left-6 right-16">
                    <span className="inline-block px-3 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-2">
                      {selectedProject.category}
                    </span>
                    <h2 className="font-black text-3xl sm:text-4xl text-white leading-tight tracking-tight">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <p className="text-base leading-relaxed text-stone-600 dark:text-stone-400 mb-8">
                    {selectedProject.longDescription}
                  </p>

                  {/* Meta grid */}
                  <div className="grid grid-cols-2 gap-6 mb-8 p-5 bg-stone-200/60 dark:bg-stone-800/40 rounded-2xl">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Tech Stack</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-semibold text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-800 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Year</p>
                      <p className="font-bold text-stone-900 dark:text-stone-100">{selectedProject.year}</p>
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-orange-500/25"
                    >
                      <Globe size={15} /> Live Website
                    </a>
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold py-3.5 rounded-2xl text-sm hover:opacity-80 transition-all"
                    >
                      <Github size={15} /> Source Code
                    </a>
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
