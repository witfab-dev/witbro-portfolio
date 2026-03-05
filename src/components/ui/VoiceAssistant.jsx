import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Terminal, Search, Navigation, Volume2, VolumeX } from 'lucide-react';

const VoiceAssistant = ({ autoOpen, onClose }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Bio & Welcome Content
  const bio = "Witness Fabrice is a Full-Stack Architect specialized in high-performance web experiences. He bridges the gap between cinematic design and robust backend engineering. Currently, he is focused on React ecosystems and AI integration.";
  const welcome = "Welcome to the digital space of Witness Fabrice. I am your system navigator.";

  // 2. The Voice & Typewriter Engine
  const speak = useCallback((text) => {
    if (isMuted) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Voice styling
    utterance.rate = 1.0; 
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    
    // Typewriter effect logic
    let i = 0;
    setDisplayText("");
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [isMuted]);

  // 3. Command & Navigation Logic
  const handleAction = (cmd) => {
    const input = cmd.toLowerCase();
    if (input.includes("project") || input.includes("work")) {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      speak("Navigating to the project gallery. Explore Witness's latest builds.");
    } else if (input.includes("who") || input.includes("witness") || input.includes("about")) {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      speak(bio);
    } else if (input.includes("contact") || input.includes("hire")) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      speak("Opening contact portal. Witness is currently available for selected collaborations.");
    } else {
      speak(`Searching for ${cmd} in system archives...`);
    }
  };

  // 4. Auto-Start Sequence
  useEffect(() => {
    if (autoOpen) {
      const timer = setTimeout(() => {
        speak(`${welcome} ${bio}`);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoOpen]);

  return (
    <AnimatePresence>
      {autoOpen && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-8 right-6 z-[100] w-full max-w-[400px]"
        >
          <div className="glass-panel p-6 rounded-[2.5rem] border-blue-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full" />

            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" />
                <span className="text-[10px] font-mono font-bold text-blue-400 tracking-widest uppercase">Witness_OS v1.0</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsMuted(!isMuted)} className="p-2 hover:bg-white/5 rounded-full text-gray-400">
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-400"><X size={16} /></button>
              </div>
            </div>

            {/* AI Console Display */}
            <div className="bg-black/40 rounded-2xl p-4 mb-4 border border-white/5 min-h-[140px] relative z-10">
              <div className="flex gap-2 text-blue-400 mb-2">
                <Terminal size={14} />
                <span className="text-[10px] font-mono uppercase tracking-tighter">Output</span>
              </div>
              <p className="text-sm text-blue-50/80 font-mono leading-relaxed italic">
                {displayText}
                <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-4 bg-blue-500 ml-1" />
              </p>
            </div>

            {/* Command Search Bar */}
            <div className="relative mb-6 z-10">
              <input 
                type="text"
                placeholder="Ask Witness_OS... (e.g., 'Go to projects')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter') { handleAction(searchQuery); setSearchQuery(""); }}}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-blue-500/50"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500/50" size={14} />
            </div>

            {/* Visualizer & Quick Nav */}
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-center gap-1.5 h-6">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={isSpeaking ? { height: [4, 18, 6, 14, 4] } : { height: 2 }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                    className="w-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-full"
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleAction("about")} className="flex items-center justify-center gap-2 py-2.5 bg-blue-600/10 border border-blue-500/20 rounded-xl text-[10px] text-blue-400 hover:bg-blue-600/20 transition-all">
                  <Navigation size={12} /> Who is Witness?
                </button>
                <button onClick={() => handleAction("projects")} className="flex items-center justify-center gap-2 py-2.5 bg-purple-600/10 border border-purple-500/20 rounded-xl text-[10px] text-purple-400 hover:bg-purple-600/20 transition-all">
                  <Search size={12} /> View Projects
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceAssistant;