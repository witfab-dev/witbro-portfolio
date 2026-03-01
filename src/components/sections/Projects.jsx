import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  ExternalLink, 
  Code2,
  Smartphone,
  Globe,
  Star,
  Calendar,
  Eye
} from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Simple projects data
  const projects = [
    {
      id: 1,
      title: 'Market-Kigali',
      description: 'A mobile marketplace app connecting local vendors with customers in Kigali.',
      longDescription: 'Market-Kigali is a comprehensive e-commerce platform designed specifically for local vendors in Rwanda. It features real-time inventory management, secure payments, and a user-friendly interface.',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop',
      technologies: ['Flutter', 'Firebase', 'Stripe'],
      links: {
        github: 'https://github.com/witfab-dev/market-kigali',
        demo: 'https://marketkigali.com'
      },
      year: '2024',
      featured: true
    },
    {
      id: 2,
      title: 'Analytics Dashboard',
      description: 'Real-time analytics dashboard for businesses to track API usage and performance.',
      longDescription: 'A powerful SaaS platform that provides real-time analytics, usage monitoring, and performance insights for API-driven businesses.',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      links: {
        github: 'https://github.com/witfab-dev/analytics-hub',
        demo: 'https://analytics.witfab.dev'
      },
      year: '2023',
      featured: true
    },
    {
      id: 3,
      title: 'TaskFlow',
      description: 'Collaborative task management for teams to organize and track their work.',
      longDescription: 'TaskFlow helps teams streamline their workflow with intuitive task boards, real-time collaboration, and powerful automation features.',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
      technologies: ['Next.js', 'TypeScript', 'Prisma'],
      links: {
        github: 'https://github.com/witfab-dev/taskflow',
        demo: 'https://taskflow.demo.com'
      },
      year: '2023'
    },
    {
      id: 4,
      title: 'MediCare Connect',
      description: 'Telemedicine platform connecting patients with healthcare providers.',
      longDescription: 'MediCare Connect revolutionizes healthcare access by providing a secure platform for video consultations, appointment scheduling, and medical record management.',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
      technologies: ['React Native', 'Node.js', 'WebRTC'],
      links: {
        github: 'https://github.com/witfab-dev/medicare-connect'
      },
      year: '2024'
    },
    {
      id: 5,
      title: 'Portfolio 2025',
      description: 'Modern interactive portfolio with 3D elements and animations.',
      longDescription: 'This very portfolio! Built with React, Framer Motion, and Tailwind CSS, featuring 3D card flips and smooth animations.',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop',
      technologies: ['React', 'Framer Motion', 'Tailwind'],
      links: {
        github: 'https://github.com/witfab-dev/portfolio-2025',
        demo: 'https://witnessfabrice.dev'
      },
      year: '2025',
      featured: true
    }
  ];

  // Categories
  const categories = ['all', 'web', 'mobile'];
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter projects
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  // Featured projects
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            My <span className="text-blue-600 dark:text-blue-400">Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one taught me something new.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full capitalize transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Projects Row */}
        {activeCategory === 'all' && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Featured Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedProject(project)}
                  className="cursor-pointer"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border-2 border-yellow-400">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-bold text-lg mb-1">{project.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
                    {project.year}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {project.year}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      View Details <Eye className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedProject(null)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full text-white hover:bg-black/70"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedProject.longDescription}
                </p>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Technologies:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  {selectedProject.links.github && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  {selectedProject.links.demo && (
                    <a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;