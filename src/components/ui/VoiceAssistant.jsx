import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, X, Terminal, Volume2, VolumeX, Bot,
  Mail, Phone, Info, Zap, Sparkles, ChevronRight,
  Lightbulb, Code2, Folder, User, MessageSquare, RotateCcw
} from 'lucide-react';

// ─────────────────────────────────────────────
// KNOWLEDGE BASE  (no external API needed)
// ─────────────────────────────────────────────
const KB = {
  person: {
    name: "Witness Fabrice",
    title: "Full-Stack Architect",
    location: "Kirehe, Rwanda",
    email: "witnessfabrice@gmail.com",
    phone: "+250 783 568 337",
    hobbies: ["3D graphics", "music production", "travel"],
    education: "Kirehe Technical Secondary School (KATSS)",
    languages: ["JavaScript", "Python", "PHP"],
    stack: ["React", "Vue", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    soft_skills: ["UI/UX design", "technical leadership", "client communication"],
    availability: "Open to remote and on-site collaborations",
    bio: "Witness Fabrice is a Rwanda-based Full-Stack Architect who graduated from KATSS. He specialises in cinematic user interfaces and robust backend systems, blending engineering precision with visual artistry.",
  },
  projects: [
    {
      id: "market-kigali",
      name: "Market-Kigali",
      type: "E-commerce Platform",
      tags: ["e-commerce", "market", "shop", "buy", "sell", "kigali"],
      desc: "A full-featured e-commerce platform tailored for the Kigali market. Built with React on the frontend and Node.js with MongoDB on the backend, it supports product listings, cart management, and secure checkout.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      status: "Live",
    },
    {
      id: "pssms",
      name: "PSSMS",
      type: "Parking Management System",
      tags: ["parking", "pssms", "slots", "management", "vehicle"],
      desc: "The Parking Spot & Slot Management System handles vehicle registration, real-time slot tracking, and automated billing at 500 RWF per hour. It provides a live dashboard for attendants and an admin panel for reporting.",
      tech: ["Vue", "Node.js", "MongoDB"],
      status: "Production",
    },
    {
      id: "katss-website",
      name: "KATSS Website",
      type: "Institutional Website",
      tags: ["katss", "school", "website", "institution"],
      desc: "The official website for Kirehe Technical Secondary School — showcasing departments, academic news, staff profiles, and student resources with a clean, accessible design.",
      tech: ["React", "Tailwind CSS", "Node.js"],
      status: "Live",
    },
    {
      id: "rwanda-explorer",
      name: "Rwanda Explorer Game",
      type: "Interactive Geography Game",
      tags: ["game", "rwanda", "explorer", "geography", "interactive"],
      desc: "An educational interactive game that guides players through Rwanda's provinces, landmarks, and culture. Built to make geographic learning engaging for students of all ages.",
      tech: ["React", "Canvas API", "Node.js"],
      status: "Beta",
    },
  ],
  faq: [
    {
      triggers: ["experience", "years", "how long", "career"],
      response: "Witness has been crafting digital products for several years, starting with web development during his studies at KATSS and growing into full-stack architecture with a focus on cinematic UI and scalable backends.",
    },
    {
      triggers: ["price", "rate", "cost", "charge", "how much"],
      response: "Rates vary by project scope. The best way to get an accurate quote is to reach out directly via email at witnessfabrice@gmail.com with your project details — Witness typically responds within 24 hours.",
    },
    {
      triggers: ["freelance", "hire", "available", "work together", "collaborate"],
      response: "Witness is open to freelance and contract work, both remote and on-site. Whether it's a startup MVP or a full enterprise platform, you can reach him at witnessfabrice@gmail.com or call +250 783 568 337.",
    },
    {
      triggers: ["timeline", "deadline", "how fast", "turnaround"],
      response: "Project timelines depend on complexity. A simple landing page could take 1–2 weeks, while a full-stack application may need 4–8 weeks. Witness always scopes timelines transparently upfront.",
    },
    {
      triggers: ["design", "ui", "ux", "interface", "figma"],
      response: "Yes — Witness handles both design and development. He creates high-fidelity prototypes and cinematic interfaces before writing a single line of code, ensuring the visual vision is locked before engineering begins.",
    },
  ],
};

// ─────────────────────────────────────────────
// SMART RESPONSE ENGINE
// ─────────────────────────────────────────────
function resolveResponse(input) {
  const q = input.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|howdy|yo)\b/.test(q)) {
    return {
      text: `Hello! I'm Witbri, Witness Fabrice's AI assistant. I can tell you about his background, projects, tech stack, availability, and how to get in touch. What would you like to explore?`,
      action: null,
    };
  }

  // Thank you
  if (/thank|thanks|appreciate/.test(q)) {
    return { text: "You're welcome! Is there anything else I can help you discover about Witness Fabrice?", action: null };
  }

  // Contact / hire
  if (/contact|email|phone|call|hire|reach|message|get in touch/.test(q)) {
    return {
      text: `You can reach Witness Fabrice directly at ${KB.person.email} by email, or call him at ${KB.person.phone}. He's ${KB.person.availability}.`,
      action: "contact",
    };
  }

  // Project — specific match first
  for (const proj of KB.projects) {
    if (proj.tags.some(tag => q.includes(tag))) {
      return {
        text: `${proj.name} — ${proj.type}. ${proj.desc} Built with ${proj.tech.join(", ")}. Status: ${proj.status}.`,
        action: "projects",
      };
    }
  }

  // Projects — general
  if (/project|work|portfolio|build|built|made|create|develop/.test(q)) {
    const list = KB.projects.map(p => p.name).join(", ");
    return {
      text: `Witness has built ${KB.projects.length} notable projects: ${list}. Ask me about any of them for a full breakdown, or tap "Work Vault" below to browse them on the page.`,
      action: "projects",
    };
  }

  // Skills / stack
  if (/skill|tech|stack|language|tool|framework|react|vue|node|mongo/.test(q)) {
    return {
      text: `Witness's core stack covers ${KB.person.stack.join(", ")} on the technical side. He also brings ${KB.person.soft_skills.join(" and ")} to every engagement. Languages include ${KB.person.languages.join(", ")}.`,
      action: null,
    };
  }

  // Education
  if (/education|school|study|graduate|degree|katss/.test(q)) {
    return {
      text: `Witness graduated from ${KB.person.education}, where he laid the foundations of his programming career. The same institution later commissioned him to build their official website — a full-circle moment.`,
      action: "about",
    };
  }

  // Hobbies
  if (/hobby|hobbies|interest|like|passion|fun|free time|outside work/.test(q)) {
    return {
      text: `Outside of engineering, Witness is passionate about ${KB.person.hobbies.join(", ")}. These creative pursuits deeply influence the cinematic quality he brings to his interfaces.`,
      action: null,
    };
  }

  // Location
  if (/location|where|based|live|country|rwanda|kirehe/.test(q)) {
    return {
      text: `Witness is based in ${KB.person.location}. He works both locally and with remote clients globally.`,
      action: null,
    };
  }

  // About / bio / who
  if (/who|about|bio|yourself|background|intro|tell me/.test(q)) {
    return {
      text: KB.person.bio + ` He's currently ${KB.person.availability}.`,
      action: "about",
    };
  }

  // FAQ matching
  for (const faq of KB.faq) {
    if (faq.triggers.some(t => q.includes(t))) {
      return { text: faq.response, action: null };
    }
  }

  // Capabilities — what can you do
  if (/what can you|help me|guide|assist|capable|do for me/.test(q)) {
    return {
      text: `I can help you learn about Witness's background, explore his projects, understand his tech stack, check his availability, or get his contact details. Try asking "Show me his projects" or "How do I hire him?"`,
      action: null,
    };
  }

  // Fallback
  return {
    text: `I didn't quite catch that. I'm best at answering questions about Witness Fabrice — his projects, skills, background, or contact info. Try something like "What has he built?" or "How do I reach him?"`,
    action: null,
  };
}

// ─────────────────────────────────────────────
// QUICK ACTION PROMPTS
// ─────────────────────────────────────────────
const QUICK_ACTIONS = [
  { label: "Who is Witness?",     icon: User,          query: "Tell me about Witness Fabrice" },
  { label: "His Projects",        icon: Folder,         query: "Show me his projects" },
  { label: "Tech Stack",          icon: Code2,          query: "What is his tech stack?" },
  { label: "Hire Him",            icon: Mail,           query: "How do I hire Witness?" },
  { label: "Contact Details",     icon: Phone,          query: "Contact information" },
  { label: "Hobbies & Interests", icon: Lightbulb,      query: "What are his hobbies?" },
];

// ─────────────────────────────────────────────
// TYPEWRITER HOOK
// ─────────────────────────────────────────────
function useTypewriter(text, speed = 18) {
  const [displayed, setDisplayed] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    clearInterval(timerRef.current);
    setDisplayed("");
    if (!text) return;
    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timerRef.current);
    }, speed);
    return () => clearInterval(timerRef.current);
  }, [text, speed]);

  return displayed;
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
const VoiceAssistant = ({ autoOpen, onClose }) => {
  const [isSpeaking, setIsSpeaking]   = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted]         = useState(false);
  const [inputText, setInputText]     = useState("");
  const [currentMsg, setCurrentMsg]   = useState(
    "Witbri AI online — synced with Witness Fabrice's portfolio. Ask me anything or pick a topic below."
  );
  const [showGuide, setShowGuide]     = useState(true);
  const [history, setHistory]         = useState([]);
  const recognitionRef                = useRef(null);
  const inputRef                      = useRef(null);
  const displayed                     = useTypewriter(currentMsg, 16);

  // TTS
  const speak = useCallback((text) => {
    if (isMuted) { window.speechSynthesis?.cancel(); return; }
    window.speechSynthesis?.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate  = 1.05;
    utt.pitch = 0.9;
    utt.onstart = () => setIsSpeaking(true);
    utt.onend   = () => setIsSpeaking(false);
    window.speechSynthesis?.speak(utt);
  }, [isMuted]);

  // Process a query
  const process = useCallback((query) => {
    if (!query.trim()) return;
    const { text, action } = resolveResponse(query);

    setHistory(h => [...h, { role: "user", text: query }, { role: "bot", text }]);
    setCurrentMsg(text);
    setShowGuide(false);
    speak(text);

    // Scroll to section if action provided
    if (action) {
      setTimeout(() => document.getElementById(action)?.scrollIntoView({ behavior: "smooth" }), 400);
    }
  }, [speak]);

  // STT
  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { process("voice recognition not supported"); return; }
    recognitionRef.current = new SR();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.onstart  = () => setIsListening(true);
    recognitionRef.current.onend    = () => setIsListening(false);
    recognitionRef.current.onresult = (e) => {
      const t = e.results[0][0].transcript;
      setInputText(t);
      process(t);
    };
    recognitionRef.current.start();
  };

  const handleSubmit = () => {
    process(inputText);
    setInputText("");
  };

  const clearHistory = () => {
    setHistory([]);
    setCurrentMsg("History cleared. Ask me anything about Witness Fabrice!");
    setShowGuide(true);
  };

  // Welcome on open
  useEffect(() => {
    if (autoOpen) {
      const t = setTimeout(() => speak(currentMsg), 900);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line
  }, [autoOpen]);

  return (
    <AnimatePresence>
      {autoOpen && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.92, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1,    filter: "blur(0px)" }}
          exit={{   opacity: 0, y: 40, scale: 0.94, filter: "blur(8px)" }}
          transition={{ type: "spring", damping: 22, stiffness: 260 }}
          className="fixed bottom-6 right-5 z-[100] w-full max-w-[460px] px-3"
        >
          {/* Glow border */}
          <div className="relative rounded-[2.5rem] p-[1.5px] bg-gradient-to-br from-blue-500/70 via-violet-500/30 to-blue-700/60 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
            
            {/* Panel */}
            <div className="bg-[#03050f]/97 backdrop-blur-3xl rounded-[2.4rem] relative overflow-hidden">
              
              {/* Ambient bg glow */}
              <div className="absolute -top-20 -left-10 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 p-7">

                {/* ── Header ── */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.15, 0.4, 0.15] }}
                        transition={{ duration: 3.5, repeat: Infinity }}
                        className="absolute inset-0 bg-blue-500 blur-xl rounded-full"
                      />
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-violet-700 flex items-center justify-center relative z-10 shadow-lg border border-white/10">
                        <Bot size={22} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-white font-black text-sm tracking-tight">Witbri AI</span>
                        <Sparkles size={10} className="text-blue-400" />
                      </div>
                      <span className="text-[9px] font-mono text-blue-500 tracking-[0.18em] uppercase font-semibold">
                        Witness_OS v2.1 · Local KB
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {history.length > 0 && (
                      <button
                        onClick={clearHistory}
                        title="Clear history"
                        className="p-2 rounded-full text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all"
                      >
                        <RotateCcw size={15} />
                      </button>
                    )}
                    <button
                      onClick={() => setIsMuted(m => !m)}
                      className="p-2 rounded-full text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all"
                    >
                      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>
                    <button
                      onClick={onClose}
                      className="p-2 rounded-full text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>

                {/* ── Terminal display ── */}
                <div className="bg-black/50 border border-white/[0.06] rounded-2xl p-5 mb-5 min-h-[120px] relative">
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-2 h-2 rounded-full bg-red-500/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <div className="w-2 h-2 rounded-full bg-green-500/60" />
                    <span className="text-[9px] font-mono text-slate-600 ml-1 tracking-widest">WITBRI_TERMINAL</span>
                  </div>
                  <p className="text-[13px] text-blue-100/80 font-mono leading-relaxed">
                    <span className="text-blue-500 font-bold mr-1.5">›</span>
                    {displayed}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.7 }}
                      className="inline-block w-[7px] h-[14px] bg-blue-400 ml-0.5 align-middle opacity-90"
                    />
                  </p>
                </div>

                {/* ── Waveform ── */}
                <div className="flex items-end justify-center gap-[3px] h-8 mb-5">
                  {[...Array(28)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={
                        isSpeaking
                          ? { height: [3, 20 + Math.random() * 16, 3], backgroundColor: ["#3b82f6", "#8b5cf6", "#3b82f6"] }
                          : isListening
                          ? { height: [6, 18, 6], backgroundColor: "#ef4444" }
                          : { height: 3, backgroundColor: "#1e293b" }
                      }
                      transition={{ repeat: Infinity, duration: 0.55 + i * 0.01, delay: i * 0.025 }}
                      style={{ width: 3, borderRadius: 2 }}
                    />
                  ))}
                </div>

                {/* ── Conversation history (last 2 exchanges) ── */}
                {history.length > 0 && (
                  <div className="mb-4 space-y-2 max-h-[110px] overflow-y-auto pr-1 scrollbar-none">
                    {history.slice(-4).map((msg, i) => (
                      <div
                        key={i}
                        className={`flex gap-2 items-start ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {msg.role === "bot" && (
                          <div className="w-5 h-5 rounded-full bg-blue-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Bot size={10} className="text-blue-400" />
                          </div>
                        )}
                        <span
                          className={`text-[11px] font-mono rounded-xl px-3 py-1.5 max-w-[80%] leading-relaxed ${
                            msg.role === "user"
                              ? "bg-blue-600/20 text-blue-200 border border-blue-500/20"
                              : "bg-white/5 text-slate-300 border border-white/5"
                          }`}
                        >
                          {msg.text.length > 100 ? msg.text.slice(0, 100) + "…" : msg.text}
                        </span>
                        {msg.role === "user" && (
                          <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <User size={9} className="text-slate-400" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Input bar ── */}
                <div className="relative mb-5">
                  <MessageSquare size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") { handleSubmit(); } }}
                    placeholder={isListening ? "Listening…" : "Ask anything about Witness…"}
                    className="w-full bg-slate-900/70 border border-white/8 rounded-2xl py-4 pl-10 pr-14 text-[12px] text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/15 transition-all font-mono"
                  />
                  <button
                    onClick={startListening}
                    className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                      isListening
                        ? "bg-red-500 text-white animate-pulse shadow-[0_0_16px_rgba(239,68,68,0.35)]"
                        : "bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-600/25"
                    }`}
                  >
                    <Mic size={16} />
                  </button>
                </div>

                {/* ── Guided quick-actions ── */}
                <div className="space-y-2">
                  {showGuide && (
                    <p className="text-[9px] text-slate-600 font-mono uppercase tracking-widest mb-2 px-1">
                      — Try asking —
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    {QUICK_ACTIONS.map(({ label, icon: Icon, query }) => (
                      <button
                        key={label}
                        onClick={() => { process(query); }}
                        className="flex items-center gap-2.5 px-3 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-[10px] text-slate-400 font-semibold tracking-wide hover:bg-blue-600/10 hover:text-blue-300 hover:border-blue-500/25 transition-all text-left group"
                      >
                        <Icon size={12} className="flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                        <span className="truncate">{label}</span>
                        <ChevronRight size={9} className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-60 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Status bar ── */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.04]">
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`w-1.5 h-1.5 rounded-full ${isSpeaking ? "bg-violet-400" : isListening ? "bg-red-400" : "bg-green-500"}`}
                    />
                    <span className="text-[9px] font-mono text-slate-600">
                      {isSpeaking ? "Speaking…" : isListening ? "Listening…" : "Ready"}
                    </span>
                  </div>
              
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceAssistant;
