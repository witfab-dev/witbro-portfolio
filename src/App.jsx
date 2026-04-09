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
  Zap, Mic
} from 'lucide-react';

// Lazy load sections
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Projects = lazy(() => import('./components/sections/Projects'));
const SkillsGalaxy = lazy(() => import('./components/sections/SkillsGalaxy'));
const Experience = lazy(() => import('./components/sections/Experience'));
const NewsFeed = lazy(() => import('./components/sections/NewsFeed')); // ✅ ADDED NEWSFEED IMPORT
const Contact = lazy(() => import('./components/sections/Contact'));

const profileImage = '/wit.png'; // ✅ DO NOT IMPORT. Use the direct path from the /public folder
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
        const diff = Math.random() * 15; 
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);
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
      exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed inset-0 z-[999] bg-[#030712] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
      
      <div className="relative z-10 w-full max-w-sm px-8 text-center">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative mx-auto w-24 h-24 mb-10"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-blue-500 to-purple-500 animate-spin-slow opacity-20" />
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 glass-panel p-1">
             <img src={profileImage} alt="Loading..." className="w-full h-full object-cover rounded-[1.8rem]" />
          </div>
        </motion.div>

        <h2 className="text-white text-2xl font-black tracking-tighter mb-1">Witness_OS</h2>
        <p className="text-blue-500/60 text-[10px] font-mono mb-8 tracking-[0.3em] uppercase">Booting Digital Identity</p>

        <div className="relative h-[1px] w-full bg-white/10 rounded-full mb-4">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center font-mono text-[9px] text-gray-500 mb-10">
          <span className="flex items-center gap-2">
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping" />
            {Math.round(progress)}% LOADED
          </span>
          <span>SR_v2.6</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentTip}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex items-center justify-center gap-3 text-gray-400 font-medium"
          >
            <CurrentTipIcon size={14} className="text-blue-500" />
            <span className="text-xs">{tips[currentTip].text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);

  useEffect(() => {
    if (!loading) {
      const hasBeenWelcomed = sessionStorage.getItem('welcomeDone');
      if (!hasBeenWelcomed) {
        setTimeout(() => {
          setShowVoiceAssistant(true);
          sessionStorage.setItem('welcomeDone', 'true');
        }, 1800);
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
              transition={{ duration: 1 }}
              className="min-h-screen bg-slate-50 dark:bg-[#030712] relative"
            >
              <div className="bg-grain fixed inset-0 pointer-events-none z-50" />
              <div className="fixed inset-0 pointer-events-none z-[-1]">
                 <div className="absolute top-0 left-[20%] w-[50vw] h-[50vw] bg-blue-600/5 blur-[120px] rounded-full" />
                 <div className="absolute bottom-0 right-[10%] w-[40vw] h-[40vw] bg-purple-600/5 blur-[120px] rounded-full" />
              </div>

              <VoiceAssistant 
                autoOpen={showVoiceAssistant} 
                onClose={() => setShowVoiceAssistant(false)}
              />
              
              <Header />

              <main className="relative z-10">
                <Suspense fallback={<SectionLoader />}>
                  <Hero />
                  <About />
                  <Projects />
                  <SkillsGalaxy />
                  <Experience />
                  <NewsFeed /> {/* ✅ ADDED NEWSFEED COMPONENT HERE */}
                  <Contact />
                </Suspense>
              </main>

              <Footer />

              {!showVoiceAssistant && (
                <motion.button
                  layoutId="assistant-btn"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                  onClick={() => setShowVoiceAssistant(true)}
                  className="fixed bottom-8 right-8 p-5 bg-blue-600 text-white rounded-[2rem] shadow-2xl z-40 transition-colors"
                >
                  <Mic size={24} />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </LanguageProvider>
    </ThemeProvider>
  );
}

const SectionLoader = () => (
  <div className="h-screen flex items-center justify-center bg-transparent">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin opacity-20" />
      <span className="text-[10px] font-mono text-gray-500 tracking-[0.2em]">LOADING_SECTION</span>
    </div>
  </div>
);

export default App;