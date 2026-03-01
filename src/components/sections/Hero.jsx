import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import AnimatedCounter from '../shared/AnimatedCounter';
import Typewriter from '../shared/Typewriter';
import { 
  Github, Linkedin, Twitter, Mail, Download,
  MapPin, Briefcase, ChevronDown, Eye,
  Award, Code2, Heart, Star, Zap, Sparkles
} from 'lucide-react';

import profileImage from '../images/wit.png';

const Hero = ({ onExplore }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  // Animated Views Counter
  const [viewCount, setViewCount] = useState(1247);

  useEffect(() => {
    const saved = localStorage.getItem('portfolioViews');
    if (saved) {
      setViewCount(Number(saved));
    } else {
      localStorage.setItem('portfolioViews', 1247);
    }

    const interval = setInterval(() => {
      setViewCount(prev => {
        const newVal = prev + Math.floor(Math.random() * 3) + 1;
        localStorage.setItem('portfolioViews', newVal);
        return newVal;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Cycle through titles for Typewriter
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const titles = [
    'Full-Stack Developer',
    'React Specialist',
    'Flutter Expert',
    'Problem Solver',
    'UI/UX Enthusiast',
    'Tech Mentor'
  ];

  const fallbackImage =
    "https://ui-avatars.com/api/?name=Witness+Fabrice&size=400&background=3b82f6&color=fff&bold=true";

  const imgSrc = imageError ? fallbackImage : profileImage;

  const socialLinks = [
    { icon: Github, href: 'https://github.com/witfab-dev', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/witnessfabrice', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/witnessfabrice', label: 'Twitter' },
    { icon: Mail, href: 'mailto:witnessfabrice@gmail.com', label: 'Email' }
  ];

  const achievements = [
    { icon: Award, label: 'Years', value: 3, suffix: '+', color: 'text-yellow-500' },
    { icon: Code2, label: 'Projects', value: 50, suffix: '+', color: 'text-blue-500' },
    { icon: Heart, label: 'Satisfaction', value: 99, suffix: '%', color: 'text-red-500' },
    { icon: Star, label: 'Open Source', value: 15, suffix: '+', color: 'text-purple-500' }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >

            {/* VIEW COUNTER */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700"
            >
              <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Portfolio Views:
              </span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {viewCount.toLocaleString()}
              </span>
            </motion.div>

            {/* Greeting */}
            <p className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider">
              {t("helloIm") || "Hi, I'm"}
            </p>

            {/* Name */}
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Witness Fabrice
              </span>
            </h1>

            {/* Typewriter Effect - FIXED: using 'text' prop instead of 'texts' */}
            <div className="h-12">
              <Typewriter
                text={titles[currentTitleIndex]}
                speed={100}
                delay={2000}
                className="text-2xl text-gray-700 dark:text-gray-300"
              />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="w-5 h-5" />
              <span>Kigali, Rwanda</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full mx-2"></span>
              <Briefcase className="w-5 h-5" />
              <span>Open to work</span>
            </div>

            {/* Achievements Grid with AnimatedCounter */}
            <div className="grid grid-cols-4 gap-3 pt-4">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                  <AnimatedCounter 
                    value={item.value} 
                    suffix={item.suffix}
                    className="text-xl font-bold text-gray-900 dark:text-white" 
                  />
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Projects
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExplore}
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Explore More
                <ChevronDown className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/Witness_Fabrice_CV.pdf';
                  link.download = 'Witness_Fabrice_Resume.pdf';
                  link.click();
                }}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Resume
              </motion.button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <social.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN - IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              {/* Loading State */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {/* Image with decorative elements */}
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                
               <img
    src={imgSrc}
    alt="Witness Fabrice"
    className={`h-50 w-auto object-cover rounded-2xl border-4 border-white dark:border-gray-800 shadow-xl transition-transform duration-500 group-hover:scale-105 ${
      imageLoaded ? 'opacity-100' : 'opacity-0'
    }`}
    onLoad={() => setImageLoaded(true)}
    onError={() => {
      setImageError(true);
      setImageLoaded(true);
    }}
  />
                
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-blue-600 dark:text-blue-400 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        />
      </motion.div>
    </section>
  );
};

export default Hero;