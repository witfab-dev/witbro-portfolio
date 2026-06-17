import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import VoiceAssistant from './components/ui/VoiceAssistant';
import ThreeJSErrorBoundary from './components/shared/ThreeJSErrorBoundary';
import { webGLManager } from './hooks/WebGLManager';

import { Loader2, Bot } from 'lucide-react';

// Lazy loaded sections with prefetch hints
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
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('manifesto');
  const [welcomeText, setWelcomeText] = useState('');
  const [done, setDone] = useState(false);

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
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[999] bg-[#0c0b0a] flex items-center justify-center overflow-hidden"
    >
      {/* Ambient Background Effects */}
      <div className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/[0.07] blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/[0.05] blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <AnimatePresence mode="wait">
        {phase === 'manifesto' && (
          <motion.div
            key="manifesto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-lg px-4"
          >
            <div className="bg-gradient-to-br from-[#161513] to-[#1a1815] border border-stone-800/70 rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/5">
              <div className="flex items-center gap-5 p-6 border-b border-stone-800/60">
                <div className="w-16 h-16 shrink-0 rounded-2xl overflow-hidden border-2 border-orange-500/30 shadow-lg">
                  <img src={PROFILE_IMG} alt="Witness" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-black text-xl text-stone-100 tracking-tight">WITNESS Fabrice</h2>
                  <p className="text-[10px] text-orange-500/60 mt-0.5">Full-Stack Developer</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="block w-6 h-px bg-orange-500" />
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-orange-500">Manifesto</p>
                </div>
                <blockquote className="text-sm text-stone-400 leading-relaxed italic border-l-2 border-orange-500/30 pl-4">
                  "{MANIFESTO}"
                </blockquote>
                <p className="mt-4 text-[10px] font-mono text-stone-600 text-right">— Witness Fabrice</p>
              </div>
              <div className="flex items-center justify-center gap-1.5 px-6 pb-5">
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
            transition={{ duration: 0.6 }}
            className="relative z-20 text-center px-6 max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-orange-500/40 shadow-xl shadow-orange-500/20"
            >
              <img src={PROFILE_IMG} alt="Witness" className="w-full h-full object-cover" />
            </motion.div>

            <motion.h1 
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-stone-100 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {welcomeText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[3px] h-8 sm:h-10 md:h-12 bg-gradient-to-t from-orange-500 to-orange-400 ml-2 align-middle rounded-sm"
              />
            </motion.h1>

            {done && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 flex items-center justify-center gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <p className="text-[11px] font-mono tracking-widest uppercase text-green-500/80">
                  Ready to explore
                </p>
              </motion.div>
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
    <div className="min-h-[400px] flex items-center justify-center bg-[#0c0b0a]">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-stone-800 border-t-orange-500 animate-spin" />
          <div className="absolute inset-2 rounded-full bg-orange-500/10 animate-pulse" />
        </div>
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-600 animate-pulse">
          {t('loadingCoreModule', 'Loading')}...
        </span>
      </div>
    </div>
  );
};

// ─── Error Fallback ───────────────────────────────────────────
const ErrorFallback = () => (
  <div className="min-h-[400px] flex items-center justify-center bg-[#0c0b0a]">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <span className="text-3xl">⚠️</span>
      </div>
      <p className="text-sm text-stone-500">Something went wrong loading this section.</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 text-xs font-bold hover:bg-orange-500/30 transition"
      >
        Reload Page
      </button>
    </div>
  </div>
);

// ─── App ──────────────────────────────────────────────────────
function App() {
  const [loading, setLoading] = useState(true);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);

  useEffect(() => {
    // Cleanup WebGL contexts on unmount
    return () => {
      webGLManager.disposeAll();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      const done = sessionStorage.getItem('welcomeDone');
      if (!done) {
        const timer = setTimeout(() => {
          setShowVoiceAssistant(true);
          sessionStorage.setItem('welcomeDone', 'true');
        }, 1800);
        return () => clearTimeout(timer);
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
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-h-screen bg-[#0c0b0a]"
            >
              {/* Ambient Background Gradients */}
              <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute top-0 left-[15%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-orange-500/[0.03] blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-0 right-[5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-blue-500/[0.02] blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-purple-500/[0.01] blur-3xl" />
              </div>

              {/* Subtle Grid Overlay */}
              <div 
                className="pointer-events-none fixed inset-0 opacity-[0.02] z-0"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                  backgroundSize: '80px 80px',
                }}
              />

              {/* AI Voice Assistant */}
              <VoiceAssistant
                autoOpen={showVoiceAssistant}
                onClose={() => setShowVoiceAssistant(false)}
              />

              {/* Header */}
              <Header />

              {/* Main Content */}
              <main className="relative z-10">
                <Suspense fallback={<SectionLoader />}>
                  <ThreeJSErrorBoundary fallback={<ErrorFallback />}>
                    <Hero />
                  </ThreeJSErrorBoundary>
                  <ThreeJSErrorBoundary fallback={<ErrorFallback />}>
                    <About />
                  </ThreeJSErrorBoundary>
                  <ThreeJSErrorBoundary fallback={<ErrorFallback />}>
                    <Projects />
                  </ThreeJSErrorBoundary>
                  <ThreeJSErrorBoundary fallback={<ErrorFallback />}>
                    <SkillsGalaxy />
                  </ThreeJSErrorBoundary>
                  <ThreeJSErrorBoundary fallback={<ErrorFallback />}>
                    <Experience />
                  </ThreeJSErrorBoundary>
                  <ThreeJSErrorBoundary fallback={<ErrorFallback />}>
                    <NewsFeed />
                  </ThreeJSErrorBoundary>
                  <ThreeJSErrorBoundary fallback={<ErrorFallback />}>
                    <Contact />
                  </ThreeJSErrorBoundary>
                </Suspense>
              </main>

              {/* Footer */}
              <Footer />

              {/* Voice Assistant Toggle Button */}
              {!showVoiceAssistant && (
                <motion.button
                  layoutId="assistant-btn"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
                  transition={{
                    scale: { type: 'spring', stiffness: 300, damping: 25 },
                    opacity: { duration: 0.4 },
                    y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
                  }}
                  whileHover={{ scale: 1.12, boxShadow: '0 0 32px rgba(249,115,22,0.5)' }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setShowVoiceAssistant(true)}
                  aria-label="Open AI Assistant"
                  className="fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-2xl shadow-orange-500/40 border border-orange-400/30 transition-all duration-300 group"
                >
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0c0b0a] animate-pulse" />
                  <Bot size={22} className="group-hover:scale-110 transition-transform duration-300" />
                </motion.button>
              )}
              <Analytics />
            </motion.div>
          )}
        </AnimatePresence>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
