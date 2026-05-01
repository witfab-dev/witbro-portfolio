import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Mic, X, Terminal, Search, Navigation, 
  Volume2, VolumeX, Cpu, Sparkles, Zap, Bot, Mail, Phone, Info
} from 'lucide-react';

const VoiceAssistant = ({ autoOpen, onClose }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const recognitionRef = useRef(null);

  // 1. Witness Fabrice's Core Data
  const personalData = {
    name: "Witness Fabrice",
    email: "witnessfabrice@gmail.com",
    phone: "+250 783568337",
    location: "Kirehe, Rwanda",
    hobbies: "3D graphics, music, and travel",
    education: "Kirehe Technical Secondary School (KATSS)",
    stack: "React, Node.js, MongoDB, and Vue",
    projects: [
      "Market-Kigali (E-commerce)", 
      "PSSMS (Parking Management)", 
      "KATSS Website", 
      "Rwanda Explorer Game"
    ]
  };

  const bio = `Witness Fabrice is a Rwanda-based Full-Stack Architect and ${personalData.education} graduate. He specializes in ${personalData.stack}, focusing on cinematic UI and robust backends.`;

  // 2. Voice Engine (TTS)
  const speak = useCallback((text) => {
    if (isMuted) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05; 
    utterance.pitch = 0.95; 

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    
    // Typewriter effect for the terminal display
    let i = 0;
    setDisplayText("");
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [isMuted]);

  // 3. Command Processor (The Brain)
  const handleAction = (cmd) => {
    const input = cmd.toLowerCase().trim();

    // Skills showcase
    if (input.includes("skill") || input.includes("expertise") || input.includes("tech")) {
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      speak(`Witness is proficient in ${personalData.stack}. He's also experienced with Docker, AWS, and modern DevOps practices. Want to learn more about specific technologies?`);
    }
    // Experience timeline
    else if (input.includes("experience") || input.includes("background") || input.includes("history")) {
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      speak(`Witness has experience building full-stack applications with a focus on performance optimization and cinematic user interfaces. Let me show you his career timeline.`);
    }
    // Contact Logic
    else if (input.includes("contact") || input.includes("email") || input.includes("phone") || input.includes("hire") || input.includes("reach")) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      speak(`Ready to connect! You can email Witness at ${personalData.email} or call ${personalData.phone}. Alternatively, you can fill out the contact form below.`);
    } 
    // Project Intelligence
    else if (input.includes("project") || input.includes("work") || input.includes("build") || input.includes("portfolio")) {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      speak(`I've found ${personalData.projects.length} featured projects. ${personalData.projects[0]}, ${personalData.projects[1]}, and more innovative solutions. Which interests you?`);
    }
    // Specific Project: PSSMS
    else if (input.includes("parking") || input.includes("pssms")) {
      speak("The PSSMS is an intelligent parking management system with real-time slot tracking, automated billing, and mobile integration. It manages capacity at 500 RWF per hour.");
    }
    // About - Bio/Personal Info
    else if (input.includes("who") || input.includes("about") || input.includes("witness") || input.includes("bio")) {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      speak(bio);
    }
    else if (input.includes("hobby") || input.includes("like") || input.includes("interest") || input.includes("passion")) {
      speak(`Outside of engineering, Witness enjoys ${personalData.hobbies}. He's passionate about creating immersive digital experiences.`);
    }
    // Location info
    else if (input.includes("location") || input.includes("where") || input.includes("based")) {
      speak(`Witness is based in ${personalData.location}, Rwanda. Building world-class digital solutions from East Africa.`);
    }
    // Default Fallback with suggestions
    else {
      const suggestions = ["check my projects", "learn about my skills", "see my experience", "get in touch"];
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      speak(`I didn't quite catch that. Try saying "${randomSuggestion}" or feel free to use the quick action buttons below.`);
    }
  };

  // 4. Speech Recognition (STT)
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return speak(t('voiceAssistantNotSupported'));

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';
    
    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setDisplayText('Listening... 👂');
    };
    
    recognitionRef.current.onend = () => setIsListening(false);
    
    recognitionRef.current.onerror = (event) => {
      speak(`Error: ${event.error}. Please try again.`);
      setIsListening(false);
    };
    
    recognitionRef.current.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setSearchQuery(transcript);
      if (event.results[event.results.length - 1].isFinal) {
        handleAction(transcript);
      }
    };
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // 5. Initial Welcome Trigger
  useEffect(() => {
    if (autoOpen) {
      const welcomeMsg = t('voiceAssistantOnline') + " Systems synchronized with Witness Fabrice's professional portfolio. How may I assist your navigation?";
      const timer = setTimeout(() => speak(welcomeMsg), 1000);
      return () => clearTimeout(timer);
    }
  }, [autoOpen, speak, t]);

  return (
    <AnimatePresence>
      {autoOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
          className="fixed bottom-8 right-6 z-[100] w-full max-w-[440px] px-4"
        >
          {/* Animated Border Wrapper */}
          <div className={`relative p-[1px] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${theme === 'dark' ? 'bg-gradient-to-tr from-blue-600 via-white/20 to-purple-600' : 'bg-gradient-to-tr from-slate-300 via-white/70 to-slate-400'}`}>
            
            {/* Main Glass Panel */}
            <div className={`backdrop-blur-2xl rounded-[3rem] p-8 relative z-10 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#030712]/95 text-white' : 'bg-white/95 text-slate-900'}`}>
              
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute inset-0 bg-blue-500 blur-xl rounded-full"
                    />
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center relative z-10 border border-white/20 shadow-lg">
                      <Bot size={24} className="text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h4 className={`font-black text-sm uppercase tracking-tighter flex items-center gap-2 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      Witbri AI <Sparkles size={12} className="text-blue-400" />
                    </h4>
                    <span className="text-[9px] font-mono text-blue-500 font-bold uppercase tracking-[0.2em]">Witness_OS v2.0</span>
                  </div>
                </div>

              {/* Terminal Terminal Display */}
              <div className={`rounded-[2rem] p-6 mb-6 min-h-[150px] relative overflow-hidden group transition-colors duration-500 ${theme === 'dark' ? 'bg-black/60 border border-white/5' : 'bg-slate-100 border border-slate-200'}`}>
                <div className="absolute top-4 left-4 opacity-20 group-hover:opacity-50 transition-opacity">
                  <Terminal size={14} className="text-blue-500" />
                </div>
                <p className={`text-[14px] font-mono leading-relaxed italic pl-6 pt-2 transition-colors duration-300 ${theme === 'dark' ? 'text-blue-100/90' : 'text-slate-700'}`}>
                  <span className="text-blue-600 mr-2 font-bold tracking-widest">»</span>
                  {displayText}
                  <motion.span 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }} 
                    className="inline-block w-2 h-4 bg-blue-500 ml-1 align-middle shadow-[0_0_8px_#3b82f6]" 
                  />
                </p>
              </div>

              {/* Neural Frequency Visualizer */}
              <div className="flex items-end justify-center gap-1.5 h-12 mb-8 px-8">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={isSpeaking ? { 
                      height: [4, 40, 8, 48, 4],
                      backgroundColor: ["#3b82f6", "#a855f7", "#3b82f6"]
                    } : isListening ? {
                      height: [10, 25, 10],
                      backgroundColor: "#ef4444"
                    } : { 
                      height: 3,
                      backgroundColor: "#1e293b" 
                    }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.03 }}
                    className="w-1.5 rounded-full shadow-sm"
                  />
                ))}
              </div>

              {/* Interaction Bar */}
              <div className="relative mb-6">
                <input 
                  type="text"
                  placeholder={isListening ? t('voiceAssistantListening') : t('voiceAssistantExecutePlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { 
                    if(e.key === 'Enter') { 
                      handleAction(searchQuery); 
                      setSearchQuery(""); 
                    }
                  }}
                  className={`w-full rounded-2xl py-5 pl-6 pr-14 text-xs focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-inner ${theme === 'dark' ? 'bg-slate-900/80 border border-white/10 text-white placeholder:text-slate-600' : 'bg-white border border-slate-200 text-slate-900 placeholder:text-slate-500'}`}
                />
                <button 
                  onClick={isListening ? stopListening : startListening}
                  title={isListening ? "Click to stop listening" : "Click to start listening"}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
                      : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20'
                  }`}
                >
                  <Mic size={20} />
                </button>
              </div>

              {/* Smart Quick-Action Grid */}
              <div className="grid grid-cols-2 gap-3">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleAction("about");
                    speak("Let me tell you about Witness.");
                  }}
                  className={`flex items-center justify-center gap-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-white/5 border border-white/5 text-slate-400 hover:bg-blue-600/10 hover:text-blue-400 hover:border-blue-500/20' : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900'}`}
                >
                  <Info size={14} /> {t('voiceAssistantProfile')}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleAction("projects");
                    speak("Displaying featured works.");
                  }}
                  className={`flex items-center justify-center gap-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-white/5 border border-white/5 text-slate-400 hover:bg-purple-600/10 hover:text-purple-400 hover:border-purple-500/20' : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900'}`}
                >
                  <Zap size={14} /> {t('voiceAssistantWorkVault')}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleAction("email");
                    speak("Opening contact form.");
                  }}
                  className={`flex items-center justify-center gap-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-white/5 border border-white/5 text-slate-400 hover:bg-blue-600/10 hover:text-blue-400 hover:border-blue-500/20' : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900'}`}
                >
                  <Mail size={14} /> {t('voiceAssistantSendEmail')}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleAction("skills");
                    speak("Showcasing technical expertise.");
                  }}
                  className={`flex items-center justify-center gap-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-white/5 border border-white/5 text-slate-400 hover:bg-blue-600/10 hover:text-blue-400 hover:border-blue-500/20' : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900'}`}
                >
                  <Cpu size={14} /> {t('skills')}
                </motion.button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceAssistant;