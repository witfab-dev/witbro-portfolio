import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, ExternalLink, Code2, Smartphone, 
  Globe, Star, Calendar, Eye, X, Layers
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Projects = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Market-Kigali',
      description: 'A mobile marketplace app connecting local vendors with customers in Kigali.',
      longDescription: 'Market-Kigali is a comprehensive e-commerce platform designed specifically for local vendors in Rwanda. It features real-time inventory management, secure payments, and a user-friendly interface.',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop',
      technologies: ['HTML', 'CSS', 'JS'],
      links: { github: 'https://github.com/witfab-dev/ecomerce', demo: 'https://witfab-dev.github.io/ecomerce/' },
      year: '2024',
      featured: true
    },
    {
      id: 2,
      title: 'KATSS WEBSITE',
      description: 'This is intearctive websiite for kirehe adventist tvet school.',
      longDescription: 'This is an interactive website developed for Kirehe Adventist TVET School. The website is designed to provide information about the school and improve communication between the school, students, teachers, and the community.',
      category: 'web',
      image: '/images/katss.png',
      technologies: ['HTML', 'JS', 'CSS'],
      links: { github: 'https://github.com/witfab-dev/katss', demo: 'https://witfab-dev.github.io/katss/public' },
      year: '2023',
      featured: true
    },
    {
      id: 5,
      title: 'Portfolio 2025',
      description: 'Modern interactive portfolio with 3D elements and animations.',
      longDescription: 'This very portfolio! Built with React, Framer Motion, and Tailwind CSS, featuring 3D card flips and smooth animations.',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop',
      technologies: ['HTML', 'JS', 'CSS'],
      links: { github: 'https://github.com/witfab-dev/myportfolio', demo: 'https://witfab-dev.github.io/myportfolio/' },
      year: '2025',
      featured: true
    },
     {
      id: 6,
      title: 'PSSMS',
      description: ' Parking System Management System',
      longDescription: 'A full-stack parking management solution. This system handles car registration, real-time slot tracking, automated billing (500 RWF/hr), and professional invoice generation.',
      category: 'mobile',
      image: '/images/pssms.jpg',
      technologies: ['Reactjs', 'Nodejs', 'Tailwindcss'],
      links: { github: 'https://github.com/witfab-dev/PSSMS', demo: 'https://witfab-dev.github.io/PSSMS/' },
      year: '2025',
      featured: true
    },
      {
      id: 7,
      title: 'Rwanda explorer game',
      description: 'Rwanda Explorer is an educational game that takes players on a virtual journey."',
      longDescription: '"Rwanda Explorer is an educational game that takes players on a virtual journey through the "Land of a Thousand Hills." Explore Rwanda"',
      category: 'mobile',
      image: 'images/Screenshot 2026-04-15 103058.png',
      technologies: ['vue', 'CSS'],
      links: { github: 'https://github.com/witfab-dev/rwanda-explorer-game', demo: 'https://rwanda-explorer-game.vercel.app/' },
      year: '2024',
      featured: true
    }
    // ... add your other projects here
  ];

  const categories = ['all', 'web', 'mobile'];
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-4 bg-slate-50 dark:bg-[#030712] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              {t('selectedWorks')} <span className="text-blue-600 dark:text-blue-400">Works</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              A collection of digital experiences I've crafted, ranging from mobile ecosystems to high-performance web apps.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <div className="flex p-1 bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl w-fit">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-lg'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-white hover:text-black transition-all"
                    >
                      <Eye size={18} /> {t('viewCaseStudy')}
                    </button>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Star size={12} fill="currentColor" /> {t('featured')}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold group-hover:text-blue-500 transition-colors">{project.title}</h3>
                    <span className="text-xs font-mono text-gray-400">{project.year}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded-lg border border-blue-100 dark:border-blue-800/50">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex gap-4">
                      <a href={project.links.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <Github size={20} />
                      </a>
                      {project.links.demo && (
                        <a href={project.links.demo} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                    <button onClick={() => setSelectedProject(project)} className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline">
                      Details <Layers size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
              />
              
              <motion.div
                layoutId={`card-${selectedProject.id}`}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-white dark:bg-gray-900 rounded-[2.5rem] max-w-3xl w-full overflow-hidden shadow-2xl border border-white/10"
              >
                <div className="relative h-72 md:h-96">
                  <img src={selectedProject.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent" />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 p-3 bg-black/50 hover:bg-black text-white rounded-full transition-all"
                  >
                    <X size={20} />
                  </button>
                  <div className="absolute bottom-8 left-8">
                     <span className="px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-3 inline-block uppercase tracking-widest">
                       {selectedProject.category}
                     </span>
                     <h2 className="text-3xl md:text-4xl font-black text-white">{selectedProject.title}</h2>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                    {selectedProject.longDescription}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-sm font-black uppercase text-gray-400 mb-3 tracking-widest">Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map(tech => (
                          <span key={tech} className="text-sm font-bold dark:text-white">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase text-gray-400 mb-3 tracking-widest">Year</h4>
                      <p className="font-bold dark:text-white">{selectedProject.year}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href={selectedProject.links.demo} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20">
                      <Globe size={18} /> {t('liveWebsite')}
                    </a>
                    <a href={selectedProject.links.github} className="flex-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-center py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
                      <Github size={18} /> {t('sourceCode')}
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