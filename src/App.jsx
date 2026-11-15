import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Bot } from 'lucide-react';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AIAssistant from './components/ui/AIAssistant';
import WhatsAppButton from './components/ui/WhatsAppButton';
import BackToTop from './components/ui/BackToTop';
import { useI18n } from './i18n/LanguageContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const AssistantPage = lazy(() => import('./pages/AssistantPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-line border-t-primary" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export default function App() {
  const { content } = useI18n();
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState(null);

  const openAssistant = useCallback((question = null) => {
    setPendingQuestion(question);
    setAssistantOpen(true);
  }, []);

  useEffect(() => {
    setAssistantOpen(false);
    setPendingQuestion(null);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-night">
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.13),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-cyan/[0.04] blur-[130px]" />
      </div>

      <Navbar />

      <ScrollToTop />

      <div id="main-content" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <Suspense fallback={<PageLoader />}>
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/assistant" element={<AssistantPage onAsk={openAssistant} />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />

      <WhatsAppButton />
      <BackToTop />

      {!assistantOpen && (
        <motion.button
          type="button"
          onClick={() => openAssistant(null)}
          aria-label={content.assistantPage.panelLabel}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 22 }}
          whileHover={reduceMotion ? {} : { scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="group fixed bottom-[92px] right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-primary to-cyan text-white shadow-[0_14px_36px_-10px_rgba(34,211,238,0.65)] sm:bottom-[100px] sm:right-6"
        >
          <Bot size={22} />
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-night bg-emerald-400" />
          <span className="pointer-events-none absolute right-[62px] hidden whitespace-nowrap rounded-lg border border-line bg-surface px-3 py-1.5 text-[11.5px] text-ink opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block">
            {content.assistantPage.panelLabel}
          </span>
        </motion.button>
      )}

      <AIAssistant
        open={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        initialQuestion={pendingQuestion}
        onConsumeInitial={() => setPendingQuestion(null)}
      />
    </div>
  );
}
