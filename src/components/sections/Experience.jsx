import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { Briefcase, Calendar, MapPin, Star } from 'lucide-react';

const experiences = [
  {
    company: "Kirehe adventist tvet school",
    role: "Senior Full-Stack Developer",
    period: "2025 - Present",
    location: "Kigali, Rwanda",
    description: "Architecting scalable microservices and leading the frontend migration to Next.js. Improved system performance by 40%.",
    skills: ["React", "Go", "AWS", "Docker"]
  },
  {
    company: "Kirehe adventist tvet school",
    role: "Frontend Engineer",
    period: "2024 - 2025",
    location: "Kigali, Rwanda",
    description: "Developed interactive dashboards for data visualization. Integrated AI voice commands into web applications.",
    skills: ["TypeScript", "D3.js", "Tailwind CSS"]
  },
  {
    company: "Kirehe adventist tvet school",
    role: "Junior Developer",
    period: "2023 - 2024",
    location: "Kigali, Rwanda",
    description: "Built responsive landing pages and managed CMS integrations for international clients.",
    skills: ["JavaScript", "PHP", "WordPress"]
  }
];

const ExperienceCard = ({ exp, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className={`relative flex flex-col md:flex-row gap-8 mb-24 ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Date/Side Info */}
      <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-mono mb-2">
          <Calendar size={14} />
          {exp.period}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
        <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
        <div className={`flex items-center gap-1 mt-2 text-gray-500 text-sm ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
          <MapPin size={14} />
          {exp.location}
        </div>
      </div>

      {/* The Center Node */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl glass-panel border-blue-500/50 flex items-center justify-center z-10 bg-slate-50 dark:bg-[#030712]">
          <Briefcase size={18} className="text-blue-500" />
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-1">
        <div className="glass-panel p-6 rounded-3xl border-white/5 hover:border-blue-500/30 transition-colors group">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {exp.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {exp.skills.map((skill, sIdx) => (
              <span key={sIdx} className="px-2 py-1 text-[10px] rounded-md bg-slate-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-transparent group-hover:border-blue-500/20 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" ref={containerRef} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-gradient">{t('experience')}</h2>
          <p className="text-gray-500 mt-4 font-mono uppercase tracking-widest text-xs">{t('letsCreate')}</p>
        </div>

        <div className="relative">
          {/* Vertical Line Background */}
          <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-white/5" />
          
          {/* Animated Glow Line */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-400 z-0 shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
          />

          {experiences.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} index={idx} />
          ))}
        </div>

        {/* Final Achievement Node */}
        <motion.div 
           initial={{ opacity: 0, scale: 0 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="relative z-10 flex flex-col items-center mt-12"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Star className="text-white fill-white" size={20} />
          </div>
          <p className="mt-4 text-blue-500 font-mono text-xs font-bold">What's Next?</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;