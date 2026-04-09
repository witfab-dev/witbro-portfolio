import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import AnimatedCounter from '../shared/AnimatedCounter';
import Typewriter from '../shared/Typewriter';
import { 
  Github, Linkedin, Twitter, Mail, Download,
  MapPin, Briefcase, ChevronDown, Eye,
  Award, Code2, Heart, Star, Zap, Sparkles,
  Loader2 // Added Loader2 here to fix the ReferenceError
} from 'lucide-react';

import profileImage from '/wit.png';

const Hero = ({ onExplore }) => {
  const { theme } = useTheme();
  const { t } = useLanguage(); 

  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [viewCount, setViewCount] = useState(1247);

  const titles = [
    'Full-Stack Architect',
    'React Specialist',
    'Creative Developer',
    'AI Integrator',
    'UI/UX Enthusiast',
    'Tech Mentor'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('portfolioViews');
    if (saved) setViewCount(Number(saved));
    
    const interval = setInterval(() => {
      setViewCount(prev => {
        const newVal = prev + Math.floor(Math.random() * 2) + 1;
        localStorage.setItem('portfolioViews', newVal);
        return newVal;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const fallbackImage = `https://ui-avatars.com/api/?name=Witness+Fabrice&size=400&background=3b82f6&color=fff&bold=true`;
  const imgSrc = imageError ? fallbackImage : profileImage;

  const socialLinks = [
    { icon: Github, href: 'https://github.com/witfab-dev', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/witnessfabrice', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/witnessfabrice', label: 'Twitter' },
    { icon: Mail, href: 'mailto:witnessfabrice@gmail.com', label: 'Email' }
  ];

  const achievements = [
    { icon: Award, label: t('experience'), value: 3, suffix: '+', color: 'text-yellow-500' },
    { icon: Code2, label: t('projects'), value: 5, suffix: '+', color: 'text-blue-500' },
    { icon: Heart, label: t('satisfaction'), value: 99, suffix: '%', color: 'text-red-500' },
    { icon: Star, label: 'OSS', value: 5, suffix: '+', color: 'text-purple-500' }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#030712] pt-20">
      
      {/* Background Tech Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left space-y-8"
          >
            {/* Live System Tag */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-black/5 dark:border-white/10 dark:bg-white/5 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400">
                {t('portfolioViews')}: <span className="text-blue-500 font-bold">{viewCount.toLocaleString()}</span>
              </span>
            </div>

            <div className="space-y-4">
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-blue-600 dark:text-blue-400 font-mono text-sm tracking-[0.3em] uppercase"
              >
                {t('welcome')}
              </motion.h2>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
                <span className="text-slate-900 dark:text-white">Witness</span><br/>
                <span className="text-blue-600">Fabrice</span>
              </h1>
            </div>

            <div className="h-8">
              <Typewriter
                text={titles[currentTitleIndex]}
                speed={80}
                className="text-xl md:text-2xl font-mono text-gray-500 dark:text-gray-400 italic"
              />
            </div>

            <p className="max-w-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('witnessBio')}
            </p>

            {/* Achievement Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {achievements.map((item, index) => (
                <div key={index} className="p-4 glass-panel border border-black/5 dark:border-white/5 rounded-2xl group hover:border-blue-500/30 transition-colors">
                  <item.icon size={20} className={`${item.color} mb-2 opacity-80`} />
                  <AnimatedCounter 
                    value={item.value} 
                    suffix={item.suffix}
                    className="text-xl font-black text-slate-900 dark:text-white block" 
                  />
                  <span className="text-[10px] uppercase tracking-tighter text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Group */}
            <div className="flex flex-wrap gap-4 items-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-3 transition-all"
              >
                <Rocket className="w-5 h-5" /> {t('viewProjects')}
              </motion.button>

              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, color: "#3b82f6" }}
                    className="p-4 glass-panel border border-black/5 dark:border-white/10 rounded-2xl text-gray-500 hover:text-blue-500 transition-all"
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: CYBER IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
              {/* Spinning Ring */}
              <div className="absolute inset-0 border-[1px] border-dashed border-blue-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
              
              <div className="absolute inset-10 rounded-[3rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-slate-100 dark:bg-white/5 animate-pulse flex items-center justify-center">
                    <Loader2 className="animate-spin text-blue-500" />
                  </div>
                )}
                <img
                  src={imgSrc}
                  alt="Witness"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className={`w-full h-full object-cover transition-transform duration-700 hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>

              {/* Floating Tech Badges */}
              <motion.div 
                animate={{ y: [0, -20, 0] }} 
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 right-10 p-4 glass-panel border border-black/5 dark:border-white/10 rounded-2xl shadow-lg"
              >
                <Code2 className="text-blue-500" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 20, 0] }} 
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-0 p-4 glass-panel border border-black/5 dark:border-white/10 rounded-2xl shadow-lg"
              >
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] font-mono tracking-widest uppercase">{t('exploreMore')}</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  );
};

// Internal Rocket Icon Component
const Rocket = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3"/>
    <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5"/>
  </svg>
);

export default Hero;