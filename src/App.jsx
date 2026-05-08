import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './components/contexts/ThemeContext';
import { LanguageProvider, useLanguage } from '.components//contexts/LanguageContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import VoiceAssistant from './components/ui/VoiceAssistant';
import ThreeJSErrorBoundary from './components/shared/ThreeJSErrorBoundary';
import { webGLManager } from './components/hooks/WebGLManager';

import { Loader2, Bot } from 'lucide-react';

// Lazy loaded sections
const Hero        = lazy(() => import('./components/sections/Hero'));
const About       = lazy(() => import('./components/sections/About'));
const Projects    = lazy(() => import('./components/sections/Projects'));
const SkillsGalaxy= lazy(() => import('./components/sections/SkillsGalaxy'));
const Experience  = lazy(() => import('./components/sections/Experience'));
const NewsFeed    = lazy(() => import('./components/sections/NewsFeed'));
const Contact     = lazy(() => import('./components/sections/Contact'));

const PROFILE_IMG = '/wit.png';

const MANIFESTO =
  "Your career is not just a way to earn a living — it's a way to leave your mark on the world. " +
  "Choose growth over comfort. Choose learning over fear. Choose purpose over pressure. " +
  "Build skills. Stay curious. Work hard. And never underestimate what you can become.";

const WELCOME_TEXT = "Hello, I'm Witness Fabrice. Welcome to my Digital Workspace.";

// ─── Loading Screen ───────────────────────────────────────────
const LoadingScreen = ({ onFinished }) => {
  const [progress,     setProgress]     = useState(0);
  const [phase,        setPhase]        = useState('manifesto');
  const [welcomeText,  setWelcomeText]  = useState('');
  const [done,         setDone]         = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + Math.random() * 10, 100);
        if (next >= 100) {
          clearInterval(id);
          setTimeout(() => setPhase('welcome'), 600);
        }
        return next;
      });
    }, 130);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (phase !== 'welcome') return;
    if (welcomeText.length < WELCOME_TEXT.length) {
      const id = setTimeout(
        () => setWelcomeText(WELCOME_TEXT.slice(0, welcomeText.length + 1)),
        32
      );
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => { setDone(true); setTimeout(onFinished, 600); }, 1600);
    return () => clearTimeout(id);
  }, [phase, welcomeText, onFinished]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(16px)' }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-[999] bg-[#0c0b0a] flex items-center justify-center overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/[0.05] blur-3xl" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <AnimatePresence mode="wait">
        {phase === 'manifesto' && (
          <motion.div
            key="manifesto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full max-w-lg px-4"
          >
            <div className="bg-[#161513] border border-stone-800/70 rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-5 p-6 border-b border-stone-800/60">
                <div className="w-16 h-16 shrink-0 rounded-2xl overflow-hidden border border-stone-700">
                  <img src={PROFILE_IMG} alt="Witness" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-black text-xl text-stone-100 tracking-tight">WITNESS Fabrice</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="block w-3 h-px bg-orange-500" />
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-orange-500">Manifesto</p>
                </div>
                <blockquote className="text-sm text-stone-400 leading-relaxed italic border-l-2 border-orange-500/30 pl-4">
                  "{MANIFESTO}"
                </blockquote>
                <p className="mt-3 text-[10px] font-mono text-stone-600 text-right">— Witness Fabrice</p>
              </div>
              <div className="flex items-center gap-1.5 px-6 pb-5">
                {[0, 0.15, 0.3].map((d, i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-orange-500/50"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: d }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-20 text-center px-6 max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="w-16 h-16 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-orange-500/40 shadow-lg shadow-orange-500/10"
            >
              <img src={PROFILE_IMG} alt="Witness" className="w-full h-full object-cover" />
            </motion.div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-stone-100 tracking-tight leading-tight">
              {welcomeText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.55 }}
                className="inline-block w-[3px] h-8 sm:h-10 md:h-12 bg-orange-500 ml-2 align-middle rounded-sm"
              />
            </h1>

            {done && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-[11px] font-mono tracking-widest uppercase text-stone-600"
              >
                ✓ Ready
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Section Loader ───────────────────────────────────────────
const SectionLoader = () => {
  const { t } = useLanguage();
  return (
    <div className="h-screen flex items-center justify-center bg-stone-100 dark:bg-[#0c0b0a]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-stone-200 dark:border-stone-800 border-t-orange-500 animate-spin" />
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-400 dark:text-stone-600">
          {t('loadingCoreModule', 'Loading…')}
        </span>
      </div>
    </div>
  );
};

// ─── App ──────────────────────────────────────────────────────
function App() {
  const [loading, setLoading] = useState(true);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [webGLError, setWebGLError] = useState(false);

  // Initialize WebGL Manager
  useEffect(() => {
    // Check WebGL support globally
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported - 3D features will use fallbacks');
      setWebGLError(true);
    }

    // Cleanup on unmount
    return () => {
      webGLManager.disposeAll();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      const done = sessionStorage.getItem('welcomeDone');
      if (!done) {
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
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative min-h-screen bg-stone-100 dark:bg-[#0c0b0a] transition-colors duration-500"
            >
              {/* Global ambient blobs */}
              <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute top-0 left-[15%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-orange-500/[0.04] blur-3xl" />
                <div className="absolute bottom-0 right-[5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-blue-500/[0.04] blur-3xl" />
              </div>

              <VoiceAssistant
                autoOpen={showVoiceAssistant}
                onClose={() => setShowVoiceAssistant(false)}
              />

              <Header />

              <main className="relative z-10">
                <Suspense fallback={<SectionLoader />}>
                  <ThreeJSErrorBoundary>
                    <Hero />
                  </ThreeJSErrorBoundary>
                  
                  <ThreeJSErrorBoundary>
                    <About />
                  </ThreeJSErrorBoundary>
                  
                  <ThreeJSErrorBoundary>
                    <Projects />
                  </ThreeJSErrorBoundary>
                  
                  <ThreeJSErrorBoundary>
                    <SkillsGalaxy webGLEnabled={!webGLError} />
                  </ThreeJSErrorBoundary>
                  
                  <ThreeJSErrorBoundary>
                    <Experience webGLEnabled={!webGLError} />
                  </ThreeJSErrorBoundary>
                  
                  <ThreeJSErrorBoundary>
                    <NewsFeed />
                  </ThreeJSErrorBoundary>
                  
                  <ThreeJSErrorBoundary>
                    <Contact webGLEnabled={!webGLError} />
                  </ThreeJSErrorBoundary>
                </Suspense>
              </main>

              <Footer />

              {/* ── Floating AI assistant button ── */}
              {!showVoiceAssistant && (
                <motion.button
                  layoutId="assistant-btn"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
                  transition={{
                    scale:   { type: 'spring', stiffness: 260, damping: 20 },
                    opacity: { duration: 0.3 },
                    y:       { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
                  }}
                  whileHover={{ scale: 1.1, boxShadow: '0 0 28px rgba(249,115,22,0.4)' }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setShowVoiceAssistant(true)}
                  aria-label="Open AI Assistant"
                  className="fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center
                             bg-orange-500 hover:bg-orange-600 text-white rounded-2xl shadow-xl
                             shadow-orange-500/30 border border-orange-400/30 transition-colors"
                >
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-stone-100 dark:border-[#0c0b0a]" />
                  <Bot size={22} />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
