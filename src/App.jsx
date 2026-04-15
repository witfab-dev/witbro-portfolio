import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Layout & UI Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import VoiceAssistant from './components/ui/VoiceAssistant';

// Icons
import { 
  Loader2, Bot, Terminal, Code2, ShieldCheck, 
  Database, Sparkles, Target
} from 'lucide-react';

// Lazy load sections for performance
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Projects = lazy(() => import('./components/sections/Projects'));
const SkillsGalaxy = lazy(() => import('./components/sections/SkillsGalaxy'));
const Experience = lazy(() => import('./components/sections/Experience'));
const NewsFeed = lazy(() => import('./components/sections/NewsFeed'));
const Contact = lazy(() => import('./components/sections/Contact'));

const profileImage = '/wit.png'; 

const LoadingScreen = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeText, setWelcomeText] = useState("");
  const [logs, setLogs] = useState(["[SYSTEM] Witness_OS Initialization..."]);
  
  const fullWelcome = "Hello, I am Witness Fabrice. Welcome to my Digital Workspace.";

  const manifesto = {
    category: "WITNESS_MANIFESTO",
    text: "Your career is not just a way to earn a living — it’s a way to leave your mark on the world. Choose growth over comfort. Choose learning over fear. Choose purpose over pressure. Success is not about being perfect; it’s about showing up every day and believing that your work matters. Build skills. Stay curious. Work hard. And never underestimate what you can become."
  };

  // Phase 1: Manifesto Progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setShowWelcome(true), 800);
          return 100;
        }
        return Math.min(oldProgress + Math.random() * 12, 100);
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  // Phase 2: Auto-writing Welcome
  useEffect(() => {
    if (showWelcome && welcomeText.length < fullWelcome.length) {
      const timeout = setTimeout(() => {
        setWelcomeText(fullWelcome.slice(0, welcomeText.length + 1));
      }, 35);
      return () => clearTimeout(timeout);
    } else if (showWelcome && welcomeText.length === fullWelcome.length) {
      setTimeout(onFinished, 2000);
    }
  }, [showWelcome, welcomeText, onFinished]);

  return (
    <motion.div 
      exit={{ opacity: 0, filter: "blur(20px)" }}
      className="fixed inset-0 z-[999] bg-[#030712] flex items-center justify-center overflow-hidden font-mono"
    >
      {/* Background Code Layer (PC Screen Feel) */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1920')" }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showWelcome ? (
          /* STAGE 1: THE MANIFESTO */
          <motion.div 
            key="manifesto"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 w-full max-w-xl px-6"
          >
            <div className="relative p-8 md:p-10 border border-blue-500/10 bg-slate-900/40 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-6 mb-8 border-b border-white/5 pb-8">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/10 p-1 bg-slate-950">
                  <img src={profileImage} alt="Witness" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="grow w-full text-center md:text-left">
                  <h2 className="text-white text-3xl font-black tracking-tighter mb-2 italic">WITNESS Fabrice</h2>
                  <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>

              <div className="relative bg-black/40 rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal size={14} className="text-blue-400" />
                  <span className="text-[10px] text-blue-500/60 font-black tracking-widest uppercase">{manifesto.category}</span>
                </div>
                <p className="text-[13px] md:text-[14px] text-slate-300 font-medium leading-relaxed italic border-l-2 border-blue-500/30 pl-5">
                  "{manifesto.text}"
                </p>
                <div className="mt-4 flex justify-end">
                   <span className="text-[10px] text-slate-500 font-mono">— Witness Fabrice</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* STAGE 2: TERMINAL WELCOME */
          <motion.div 
            key="welcome"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-20 text-center px-8"
          >
            
            <h1 className="text-2xl md:text-5xl font-black text-white tracking-tighter leading-tight max-w-3xl mx-auto">
              {welcomeText}
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="inline-block w-1.5 h-8 md:h-12 bg-blue-500 ml-3 align-middle"
              />
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-grain fixed inset-0 pointer-events-none z-50 opacity-[0.04]" />
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
              <div className="bg-grain fixed inset-0 pointer-events-none z-50 opacity-[0.02]" />
              <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
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
                  <NewsFeed />
                  <Contact />
                </Suspense>
              </main>

              <Footer />

              {!showVoiceAssistant && (
                <motion.button
                  layoutId="assistant-btn"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0, y: [0, -10, 0] }}
                  transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, duration: 0.5 }}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)", rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowVoiceAssistant(true)}
                  className="fixed bottom-8 right-8 p-5 bg-blue-600 text-white rounded-[2rem] shadow-2xl z-40 border border-blue-400/30 group"
                >
                  <div className="relative">
                    <Bot size={28} className="relative z-10" />
                    <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-20 scale-150" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-600" />
                  </div>
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
      <span className="text-[10px] font-mono text-gray-500 tracking-[0.2em]">LOADING_CORE_MODULE</span>
    </div>
  </div>
);

export default App;