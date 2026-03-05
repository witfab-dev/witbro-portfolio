import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MicOff, Volume2, VolumeX, Navigation, Home, User, Code2, 
  Briefcase, Mail, Award, Globe, HelpCircle, X, Sparkles, Zap, 
  Settings, Command, Languages, MessageSquare
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const VoiceAssistant = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, changeLanguage, language } = useLanguage();
  
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [showAssistant, setShowAssistant] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [visualizerBars, setVisualizerBars] = useState(new Array(15).fill(0));
  
  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;

  // 1. IMPROVED COMMAND SYSTEM
  const commands = [
    { 
      id: 'nav_home',
      keywords: ['home', 'start', 'habanza', 'accueil'], 
      action: () => scrollToSection('home'),
      res: () => t('home_voice_res') || "Navigating home",
      icon: Home 
    },
    { 
      id: 'nav_projects',
      keywords: ['projects', 'work', 'imishinga', 'projets'], 
      action: () => scrollToSection('projects'),
      res: () => t('projects_voice_res') || "Opening my portfolio",
      icon: Briefcase 
    },
    { 
      id: 'theme_toggle',
      keywords: ['theme', 'dark', 'light', 'umukara', 'umweru', 'mode'], 
      action: () => toggleTheme(),
      res: () => `Switching to ${theme === 'dark' ? 'light' : 'dark'} mode`,
      icon: Zap 
    },
    {
      id: 'lang_rw',
      keywords: ['kinyarwanda', 'rwanda', 'rwandan'],
      action: () => changeLanguage('rw'),
      res: () => "Ubu ndimo kuvuga Ikinyarwanda",
      icon: Globe
    },
    {
      id: 'lang_en',
      keywords: ['english', 'ingereza'],
      action: () => changeLanguage('en'),
      res: () => "Switching to English",
      icon: Globe
    },
    {
      id: 'contact_me',
      keywords: ['contact', 'email', 'message', 'twandikire'],
      action: () => scrollToSection('contact'),
      res: () => "Opening contact form",
      icon: Mail
    }
  ];

  // 2. INITIALIZE SPEECH ENGINE
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language === 'rw' ? 'en-US' : language; // Kinyarwanda fallback to EN for better pick-up

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const resultTranscript = event.results[current][0].transcript.toLowerCase();
        setTranscript(resultTranscript);

        if (event.results[current].isFinal) {
          handleVoiceAction(resultTranscript);
        }
      };

      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, [language]);

  // 3. VOICE VISUALIZER ANIMATION
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setVisualizerBars(prev => prev.map(() => Math.random() * 100));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setVisualizerBars(new Array(15).fill(0));
    }
  }, [isListening]);

  const handleVoiceAction = (text) => {
    let found = false;
    commands.forEach(cmd => {
      if (cmd.keywords.some(key => text.includes(key))) {
        cmd.action();
        const msg = cmd.res();
        setResponse(msg);
        speak(msg);
        found = true;
      }
    });

    if (!found) {
      const errorMsg = "I couldn't find that command. Try 'projects' or 'change theme'.";
      setResponse(errorMsg);
      speak(errorMsg);
    }
  };

  const speak = (text) => {
    if (!synth) return;
    synth.cancel(); // Stop current speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.1;
    utterance.rate = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synth.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      
      <AnimatePresence>
        {showAssistant && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`w-80 rounded-3xl overflow-hidden shadow-2xl border ${
              theme === 'dark' ? 'bg-slate-900/95 border-white/10' : 'bg-white/95 border-slate-200'
            } backdrop-blur-xl`}
          >
            {/* Header / Aura Section */}
            <div className="p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 relative">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-ping' : 'bg-blue-500'}`} />
                  <span className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    AI Assistant
                  </span>
                </div>
                <button onClick={() => setShowAssistant(false)} className="hover:rotate-90 transition-transform">
                  <X className="w-4 h-4 opacity-50" />
                </button>
              </div>

              {/* Visualizer */}
              <div className="flex items-end justify-center gap-1 h-12 mb-4">
                {visualizerBars.map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: isListening ? `${h}%` : '4px' }}
                    className="w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
                  />
                ))}
              </div>

              <p className={`text-center text-xs italic ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {transcript || "Listening for command..."}
              </p>
            </div>

            {/* Response Section */}
            {response && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 py-4 border-t border-white/5 bg-blue-500/5">
                <div className="flex gap-3 items-start">
                  <Sparkles className="w-4 h-4 text-blue-500 mt-1 shrink-0" />
                  <p className={`text-xs leading-relaxed font-medium ${theme === 'dark' ? 'text-blue-100' : 'text-blue-900'}`}>
                    {response}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Quick Actions Grid */}
            <div className="p-4 grid grid-cols-2 gap-2">
              {commands.slice(0, 4).map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                    setResponse(cmd.res());
                    speak(cmd.res());
                  }}
                  className={`flex items-center gap-2 p-2 rounded-xl text-[10px] font-bold uppercase transition-all ${
                    theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-slate-300' : 'bg-slate-900/5 hover:bg-slate-900/10 text-slate-700'
                  }`}
                >
                  <cmd.icon className="w-3 h-3 text-blue-500" />
                  {cmd.keywords[0]}
                </button>
              ))}
            </div>

            {/* Footer Control */}
            <div className="p-4 bg-black/5 flex justify-center">
              <button 
                onClick={toggleListening}
                className={`p-4 rounded-full transition-all ${
                  isListening ? 'bg-red-500 scale-110 shadow-lg shadow-red-500/40' : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isListening ? <MicOff /> : <Mic />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      {!showAssistant && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAssistant(true)}
          className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 text-white"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full border-2 border-blue-600" />
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default VoiceAssistant;