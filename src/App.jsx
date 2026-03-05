import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Layout & UI
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import VoiceAssistant from './components/ui/VoiceAssistant';

import { 
  Loader2, CheckCircle2, Sparkles, Palette, Rocket, 
  Zap, Code2, Github, Linkedin, Twitter, Mail, Mic
} from 'lucide-react';

// Lazy load sections
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Projects = lazy(() => import('./components/sections/Projects'));
const SkillsGalaxy = lazy(() => import('./components/sections/SkillsGalaxy'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Contact = lazy(() => import('./components/sections/Contact'));

// Asset logic
const profileImage = new URL('../images/wit.png', import.meta.url).href || `https://ui-avatars.com/api/?name=Witness+Fabrice&background=3b82f6&color=fff`;

const LoadingScreen = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    { icon: Sparkles, text: "Initializing interactive engine..." },
    { icon: Palette, text: "Styling digital environment..." },
    { icon: Rocket, text: "Optimizing asset delivery..." },
    { icon: Zap, text: "Syncing voice intelligence..." },
    { icon: CheckCircle2, text: "Environment Ready." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(onFinished, 500);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 150);
    return () => clearInterval(timer);
  }, [onFinished]);

  useEffect(() => {
    const tipIndex = Math.floor((progress / 100) * tips.length);
    setCurrentTip(Math.min(tipIndex, tips.length - 1));
  }, [progress]);

  const CurrentTipIcon = tips[currentTip].icon;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] bg-[#030712] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />
      
      <div className="relative z-10 w-full max-w-sm px-8 text-center">
        {/* Animated Avatar Box */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative mx-auto w-24 h-24 mb-8"
        >
          <div className="absolute inset-0 rounded-3xl bg-blue-500/20 animate-pulse rotate-6" />
          <div className="absolute inset-0 rounded-3xl bg-purple-500/20 animate-pulse -rotate-6" />
          <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 glass-panel p-1">
             <img src={profileImage} alt="Loading..." className="w-full h-full object-cover rounded-2xl" />
          </div>
        </motion.div>

        <h2 className="text-white text-xl font-bold tracking-tight mb-1">Fabrice Witness</h2>
        <p className="text-blue-400 text-xs font-mono mb-8 tracking-widest uppercase">System Initialization</p>

        {/* Technical Progress Bar */}
        <div className="relative h-[2px] w-full bg-white/5 rounded-full mb-4 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mb-12">
          <span className="flex items-center gap-2">
            <Loader2 className="w-3 h-3 animate-spin" /> {Math.round(progress)}%
          </span>
          <span>STABLE_REVISION_2026</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentTip}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-3 text-gray-400"
          >
            <CurrentTipIcon className="w-4 h-4 text-blue-500" />
            <span className="text-xs italic">{tips[currentTip].text}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Aesthetic Bottom HUD */}
      <div className="absolute bottom-10 w-full flex justify-center gap-8 opacity-20">
         <Code2 size={16} className="text-white" />
         <Mic size={16} className="text-white" />
         <Sparkles size={16} className="text-white" />
      </div>
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);

  useEffect(() => {
    // Setup logic for when app is ready
    if (!loading) {
      const hasVisited = localStorage.getItem('hasVisited');
      if (!hasVisited) {
        setTimeout(() => {
          setShowVoiceAssistant(true);
          localStorage.setItem('hasVisited', 'true');
        }, 1500);
      }
    }
  }, [loading]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen key="loader" onFinished={() => setLoading(false)} />
          ) : (
            <motion.div 
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-screen bg-white dark:bg-[#030712] selection:bg-blue-500 selection:text-white"
            >
              <div className="bg-grain" /> {/* Global Grain Texture */}
              
              <VoiceAssistant 
                autoOpen={showVoiceAssistant} 
                onClose={() => setShowVoiceAssistant(false)}
              />
              
              <Header />

              <main className="relative">
                {/* Visual Ambient Backgrounds */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
                   <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/10 blur-[120px] rounded-full" />
                   <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 blur-[120px] rounded-full" />
                </div>

                <Suspense fallback={<SectionLoader />}>
                  <Hero />
                  <About />
                  <Projects />
                  <SkillsGalaxy />
                  <Experience />
                  <Contact />
                </Suspense>
              </main>

              <Footer />

              {/* Float Action: Voice Assistant */}
              <AnimatePresence>
                {!showVoiceAssistant && (
                  <motion.button
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setShowVoiceAssistant(true)}
                    className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-2xl shadow-2xl shadow-blue-500/40 z-50 group"
                  >
                    <Mic className="w-6 h-6 group-hover:animate-pulse" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </LanguageProvider>
    </ThemeProvider>
  );
}

const SectionLoader = () => (
  <div className="h-[50vh] flex items-center justify-center">
    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
  </div>
);

export default App;