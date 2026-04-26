import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, X, Terminal, Search, Navigation, 
  Volume2, VolumeX, Cpu, Command, Zap 
} from 'lucide-react';

const VoiceAssistant = ({ autoOpen, onClose }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  
  const recognitionRef = useRef(null);

  // 1. System Identity
  const bio = "Witness Fabrice is a Full-Stack Architect specialized in high-performance web experiences. He bridges the gap between cinematic design and robust backend engineering.";
  const welcome = "Witness_OS Online. Systems operational. How may I assist your navigation today?";

  // 2. Advanced Speech Synthesis
  const speak = useCallback((text) => {
    if (isMuted) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05; 
    utterance.pitch = 0.9; // Slightly lower for a more "premium" tech feel

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    
    // Typewriter effect
    let i = 0;
    setDisplayText("");
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [isMuted]);

  // 3. Command Logic
  const handleAction = (cmd) => {
    const input = cmd.toLowerCase();
    if (input.includes("project") || input.includes("work")) {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      speak("Re-routing to the Project Archive. Initializing gallery view.");
    } else if (input.includes("who") || input.includes("about") || input.includes("witness")) {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      speak(bio);
    } else if (input.includes("contact") || input.includes("hire") || input.includes("email")) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      speak("Opening Secure Messaging Protocol. Witness is ready for synchronization.");
    } else {
      speak(`Processing query: "${cmd}". No local matches found. Searching global archives.`);
    }
  };

  // 4. Voice Recognition (Speech-to-Text)
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      speak("Voice recognition is not supported in this browser environment.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onstart = () => setIsListening(true);
    recognitionRef.current.onend = () => setIsListening(false);
    
    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      handleAction(transcript);
    };

    recognitionRef.current.start();
  };

  useEffect(() => {
    if (autoOpen) {
      const timer = setTimeout(() => speak(welcome), 800);
      return () => clearTimeout(timer);
    }
  }, [autoOpen, speak]);

  return (
    <AnimatePresence>
      {autoOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-6 right-6 z-[100] w-full max-w-[380px]"
        >
          <div className="relative group p-[1px] rounded-[2.5rem] bg-gradient-to-b from-blue-500/40 to-transparent backdrop-blur-3xl overflow-hidden shadow-2xl">
            
            {/* Glass Background */}
            <div className="bg-slate-950/90 rounded-[2.5rem] p-6 relative z-10">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-blue-500/20 blur-md rounded-full"
                    />
                    <Cpu size={18} className="text-blue-500 relative z-10" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-blue-500 tracking-[0.3em] uppercase">Witness_OS</span>
                    <span className="text-[8px] text-slate-500 font-mono tracking-tighter uppercase">Status: Neural_Link_Active</span>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <button onClick={() => setIsMuted(!isMuted)} className="p-2 hover:bg-white/5 rounded-full text-slate-400 transition-colors">
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                  <button onClick={onClose} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-full text-slate-400 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Console Display */}
              <div className="bg-black/60 border border-white/5 rounded-3xl p-5 mb-5 min-h-[120px] shadow-inner relative group/console">
                <div className="absolute top-3 right-3 opacity-20 group-hover/console:opacity-100 transition-opacity">
                  <Terminal size={12} className="text-blue-500" />
                </div>
                <p className="text-sm text-blue-100/90 font-mono leading-relaxed italic selection:bg-blue-500/30">
                  <span className="text-blue-600 mr-2">{'>'}</span>
                  {displayText}
                  <motion.span 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }} 
                    className="inline-block w-2 h-4 bg-blue-500 ml-1 align-middle" 
                  />
                </p>
              </div>

              {/* Dynamic Waveform Visualizer */}
              <div className="flex items-center justify-center gap-1.5 h-10 mb-6 px-4">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={isSpeaking ? { 
                      height: [6, 24, 10, 30, 6],
                      backgroundColor: ["#3b82f6", "#22d3ee", "#3b82f6"]
                    } : isListening ? {
                      height: [10, 14, 10],
                      backgroundColor: "#ef4444"
                    } : { 
                      height: 4,
                      backgroundColor: "#1e293b" 
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 0.6, 
                      delay: i * 0.04,
                      ease: "easeInOut"
                    }}
                    className="w-1.5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                  />
                ))}
              </div>

              {/* Smart Input Controls */}
              <div className="relative mb-4">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  {isListening ? (
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="w-2 h-2 bg-red-500 rounded-full" />
                  ) : (
                    <Search className="text-slate-600" size={14} />
                  )}
                </div>
                <input 
                  type="text"
                  placeholder={isListening ? "Listening..." : "Execute Command..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { 
                    if(e.key === 'Enter') { 
                      handleAction(searchQuery); 
                      setSearchQuery(""); 
                    }
                  }}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-10 pr-14 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                />
                <button 
                  onClick={startListening}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white shadow-[0_0_15px_#ef4444]' : 'bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white'}`}
                >
                  <Mic size={16} />
                </button>
              </div>

              {/* Quick Suggestion Chips */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {[
                  { icon: Zap, label: "Projects", cmd: "projects" },
                  { icon: Navigation, label: "About", cmd: "about" },
                  { icon: Command, label: "Contact", cmd: "contact" }
                ].map((chip) => (
                  <button 
                    key={chip.label}
                    onClick={() => handleAction(chip.cmd)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] text-slate-400 whitespace-nowrap hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/20 transition-all"
                  >
                    <chip.icon size={10} /> {chip.label}
                  </button>
                ))}
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceAssistant;