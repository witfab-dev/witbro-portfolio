import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, MicOff, Volume2, VolumeX, X, Send,
  User, Zap, Code2, Mail, Briefcase, MapPin,
  Bot, Loader2, RotateCcw, Sparkles, GraduationCap,
  Lightbulb, Handshake, Coffee, Award, Target,
} from "lucide-react";

// ─── Enhanced Knowledge Base ─────────────────────────────────────────────
const KNOWLEDGE_BASE = {
  personal: {
    name: "Witness Fabrice",
    email: "witnessfabrice@gmail.com",
    phone: "+250 783 568 337",
    location: "Kigali, Rwanda",
    github: "github.com/witfab-dev",
    linkedin: "linkedin.com/in/witness-fabrice",
    title: "Full-Stack Developer",
    level: "Level 5 Software Student",
  },
  education: {
    school: "Kirehe Adventist TVET School (KATSS)",
    distinction: "Graduated with distinction",
    awards: ["Best Tech Project", "Leadership Excellence"],
    focus: "Software Engineering & Web Technologies",
    year: "2023",
  },
  skills: {
    frontend: ["React", "Next.js", "Vue.js", "Three.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express", "Python", "Django", "GraphQL", "REST APIs"],
    databases: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
    infrastructure: ["Docker", "AWS", "Vercel", "Nginx", "CI/CD pipelines"],
    other: ["IoT integration", "WebGL", "WebSockets", "PWA"],
  },
  projects: [
    {
      name: "Market-Kigali",
      description: "E-commerce platform for local Kigali vendors",
      details: "500+ active users | React, Node.js, Stripe, PostgreSQL",
      features: "Real-time inventory, vendor dashboard, mobile-first",
      impact: "Empowered local businesses to sell online",
    },
    {
      name: "KATSS Platform",
      description: "Academic management system for schools",
      details: "1000+ students managed | React, Express.js, MongoDB",
      features: "Grade tracking, attendance, parent portal, notifications",
      impact: "Streamlined school administration",
    },
    {
      name: "Rwanda Explorer",
      description: "Immersive 3D tourism experience",
      details: "4.8★ app store rating | Three.js, WebGL, React",
      features: "360° virtual tours, interactive maps, cultural content",
      impact: "Showcasing Rwanda's beauty to the world",
    },
    {
      name: "PSSMS",
      description: "Parking & Slot Management System",
      details: "200+ slots managed | Vue.js, Python, IoT sensors",
      features: "Real-time availability, automated billing, sensor integration",
      impact: "Reduced parking congestion in Kigali",
    },
  ],
  personality: [
    "Passionate about impactful tech solutions for Africa",
    "Detail-oriented, ships high-quality code",
    "Collaborative, fast learner, cross-functional team player",
    "Open to freelance, full-time remote, and relocation",
  ],
  achievements: {
    awards: ["Best Tech Project 2023", "Leadership Excellence Award"],
    certifications: ["AWS Certified Developer", "Meta Backend Developer"],
    yearsOfExperience: 3,
    projectsDelivered: 12,
    countriesServed: 6,
  },
};

// ─── Enhanced Intelligent Response Generator ─────────────────────────────
const generateResponse = (userInput, conversationHistory = []) => {
  const input = userInput.toLowerCase().trim();
  
  // Extract context from conversation history
  const lastUserMessages = conversationHistory
    .filter(msg => msg.role === "user")
    .slice(-3)
    .map(msg => msg.content.toLowerCase());
  
  const allHistory = lastUserMessages.join(" ");
  
  // ─── Greetings with context awareness ─────────────────────────
  if (input.match(/\b(hi|hello|hey|greetings|sup|howdy|good morning|good afternoon|good evening)\b/)) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    
    // Check if returning visitor
    const isReturning = conversationHistory.length > 2;
    const returnMsg = isReturning ? " Welcome back! " : " ";
    
    return `${greeting}!${returnMsg}I'm Witbri AI, your virtual guide to Witness Fabrice's portfolio. ${isReturning ? "Ready to dive deeper into his work?" : "Ask me about his skills, projects, background, or how to hire him!"}`;
  }
  
  // ─── About / Who is ─────────────────────────────────────────────
  if (input.match(/\b(about|who is|tell me about|introduce|background|bio)\b/) && 
      input.match(/\b(witness|fabrice|him|he|developer|programmer)\b/)) {
    const name = KNOWLEDGE_BASE.personal.name;
    const title = KNOWLEDGE_BASE.personal.title;
    const level = KNOWLEDGE_BASE.personal.level;
    const location = KNOWLEDGE_BASE.personal.location;
    const personality = KNOWLEDGE_BASE.personality.slice(0, 2).join(" ");
    
    return `${name} is a ${title} and ${level} based in ${location}. ${personality}. He specializes in creating impactful tech solutions for Africa with expertise in React, Node.js, and cloud infrastructure. Would you like to know more about his specific skills or projects?`;
  }
  
  // ─── Skills / Technologies with detailed breakdown ─────────────
  if (input.match(/\b(skills|technologies|tech stack|programming|languages|frameworks|tools|expertise|knows|uses)\b/)) {
    const frontend = KNOWLEDGE_BASE.skills.frontend.slice(0, 4).join(", ");
    const backend = KNOWLEDGE_BASE.skills.backend.slice(0, 3).join(", ");
    const databases = KNOWLEDGE_BASE.skills.databases.slice(0, 2).join(", ");
    const infra = KNOWLEDGE_BASE.skills.infrastructure.slice(0, 3).join(", ");
    
    return `Witness has a diverse tech stack. For frontend, he works with ${frontend}. On the backend, he uses ${backend}. He's also proficient with ${databases} databases and ${infra} for infrastructure. His skill set makes him a versatile full-stack developer capable of handling end-to-end projects.`;
  }
  
  // ─── Projects with more detail ──────────────────────────────────
  if (input.match(/\b(projects|built|created|developed|portfolio|work|made|build|applications)\b/)) {
    const projects = KNOWLEDGE_BASE.projects;
    const projectList = projects.map(p => p.name).join(", ");
    const featured = projects[0];
    return `Witness has built ${projects.length} impressive projects including ${projectList}. His flagship project "${featured.name}" serves ${featured.details} and has ${featured.impact}. He's passionate about creating solutions that make a real difference. Which project would you like to know more about?`;
  }
  
  // ─── Specific project details with context ──────────────────────
  for (const project of KNOWLEDGE_BASE.projects) {
    if (input.includes(project.name.toLowerCase())) {
      return `"${project.name}": ${project.description}. ${project.details}. Key features include ${project.features}. The impact has been ${project.impact}. This showcases Witness's ability to deliver practical, high-impact solutions.`;
    }
  }
  
  // ─── Education with achievements ───────────────────────────────
  if (input.match(/\b(education|study|studied|school|college|university|degree|diploma|graduated|academic|learning|course)\b/)) {
    const edu = KNOWLEDGE_BASE.education;
    const name = KNOWLEDGE_BASE.personal.name;
    return `${name} ${edu.distinction} from ${edu.school}, focusing on ${edu.focus}. He received awards for ${edu.awards.join(" and ")}. His academic excellence is reflected in his practical work. Would you like to hear about his professional experience?`;
  }
  
  // ─── Contact / Hire with enthusiasm ─────────────────────────────
  if (input.match(/\b(contact|hire|email|reach|connect|work with|freelance|job|opportunity|collaborate|contract|collaboration)\b/)) {
    const name = KNOWLEDGE_BASE.personal.name;
    const email = KNOWLEDGE_BASE.personal.email;
    const github = KNOWLEDGE_BASE.personal.github;
    const linkedin = KNOWLEDGE_BASE.personal.linkedin;
    return `Absolutely! You can reach ${name} at ${email}. He's actively open to freelance work, full-time remote positions, and relocation opportunities. Check out his code at ${github} or professional network at ${linkedin}. What kind of project are you thinking about?`;
  }
  
  // ─── Location with context ──────────────────────────────────────
  if (input.match(/\b(location|based|where|city|country|rwanda|kigali|live|reside|from)\b/)) {
    return `${KNOWLEDGE_BASE.personal.name} is based in ${KNOWLEDGE_BASE.personal.location}, Rwanda — the heart of East Africa. He's building software solutions for local and international clients, contributing to the growing tech ecosystem in the region.`;
  }
  
  // ─── Experience / Journey ──────────────────────────────────────
  if (input.match(/\b(experience|journey|career|path|history|background|started|begin)\b/)) {
    const edu = KNOWLEDGE_BASE.education;
    const name = KNOWLEDGE_BASE.personal.name;
    const years = KNOWLEDGE_BASE.achievements.yearsOfExperience;
    return `${name} started his journey at ${edu.school} where he discovered his passion for web technologies. Over ${years}+ years, he's built ${KNOWLEDGE_BASE.achievements.projectsDelivered}+ production applications serving users across ${KNOWLEDGE_BASE.achievements.countriesServed} countries. His career is driven by a mission to create impactful solutions for Africa.`;
  }
  
  // ─── Personality / Work style ──────────────────────────────────
  if (input.match(/\b(personality|work style|ethic|passionate|approach|attitude|values|driven)\b/)) {
    return KNOWLEDGE_BASE.personality.join(" ") + " This is reflected in his commitment to delivering high-quality, collaborative solutions that make a real difference.";
  }
  
  // ─── Achievements / Awards ─────────────────────────────────────
  if (input.match(/\b(achievements|awards|recognition|certifications|accomplishments)\b/)) {
    const awards = KNOWLEDGE_BASE.achievements.awards.join(" and ");
    const certs = KNOWLEDGE_BASE.achievements.certifications.join(" and ");
    return `Witness has earned prestigious recognition including ${awards}. He also holds ${certs}, demonstrating his commitment to professional growth and excellence in software engineering.`;
  }
  
  // ─── What can you do / Features ──────────────────────────────────
  if (input.match(/\b(help|what can you do|capabilities|features|function|purpose|abilities)\b/)) {
    return `I can help you learn about Witness Fabrice in many ways! You can ask me about:
• His skills and technologies (React, Node.js, Three.js)
• His projects (Market-Kigali, KATSS Platform, Rwanda Explorer)
• His background and education
• How to contact or hire him
• His achievements and awards
Try asking something like "What projects has he built?" or "How can I hire him?"`;
  }
  
  // ─── Thank you with warmth ──────────────────────────────────────
  if (input.match(/\b(thank|thanks|appreciate|grateful|awesome|great)\b/)) {
    const responses = [
      "You're very welcome! Is there anything else you'd like to know about Witness?",
      "My pleasure! I'm here to help. What else can I tell you about?",
      "Anytime! Witness is truly an inspiring developer. Would you like to hear about another aspect of his work?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // ─── Goodbye / Exit ─────────────────────────────────────────────
  if (input.match(/\b(bye|goodbye|see you|farewell|exit|quit)\b/)) {
    return "It was great chatting with you! Feel free to come back anytime you want to learn more about Witness Fabrice. Have a wonderful day! 👋";
  }
  
  // ─── Follow-up / Contextual responses ──────────────────────────
  if (allHistory.includes("skills") && input.match(/\b(more|else|other|additionally)\b/)) {
    const otherSkills = KNOWLEDGE_BASE.skills.other.join(", ");
    return `Beyond the core stack, Witness also works with ${otherSkills}. This allows him to build complete, modern applications including IoT integrations, real-time features, and progressive web apps.`;
  }
  
  if (allHistory.includes("projects") && input.match(/\b(details|more|specific|explain)\b/)) {
    const project = KNOWLEDGE_BASE.projects[0];
    return `Let me tell you more about "${project.name}". ${project.description}. ${project.details}. The impact has been ${project.impact}. Would you like me to tell you about another project?`;
  }
  
  if (allHistory.includes("hire") && input.match(/\b(rate|cost|pricing|budget)\b/)) {
    return `Witness's rates are competitive and based on project scope. For a detailed quote, it's best to contact him directly at ${KNOWLEDGE_BASE.personal.email}. He's transparent about pricing and flexible with budgets!`;
  }
  
  // ─── Default / Catch-all with helpful suggestion ──────────────
  return `I'm Witbri AI, here to help you learn about Witness Fabrice. You can ask me about his skills (React, Node.js, Three.js), his projects (Market-Kigali, KATSS Platform), his background, or how to contact him for work. What specific aspect of his work interests you? I'm happy to dive deeper into any topic!`;
};

// ─── Quick Actions ─────────────────────────────────────────────
const QUICK_ACTIONS = [
  { icon: User,          label: "About",     cmd: "Tell me about Witness Fabrice",          color: "blue"    },
  { icon: Zap,           label: "Projects",  cmd: "What projects has Witness built?",        color: "amber"   },
  { icon: Code2,         label: "Skills",    cmd: "What technologies does Witness use?",     color: "emerald" },
  { icon: Mail,          label: "Contact",   cmd: "How can I contact or hire Witness?",      color: "rose"    },
  { icon: GraduationCap, label: "Education", cmd: "Tell me about his education background",  color: "violet"  },
  { icon: MapPin,        label: "Location",  cmd: "Where is Witness based?",                 color: "cyan"    },
  { icon: Award,         label: "Achievements", cmd: "What awards has Witness received?",    color: "amber"  },
  { icon: Target,        label: "Experience", cmd: "Tell me about his work experience",      color: "emerald" },
];

const COLOR_HOVER = {
  blue:    { text: "#60a5fa", border: "rgba(96,165,250,0.35)",    bg: "rgba(59,130,246,0.08)"  },
  amber:   { text: "#fbbf24", border: "rgba(251,191,36,0.35)",    bg: "rgba(245,158,11,0.08)"  },
  emerald: { text: "#34d399", border: "rgba(52,211,153,0.35)",    bg: "rgba(16,185,129,0.08)"  },
  rose:    { text: "#fb7185", border: "rgba(251,113,133,0.35)",   bg: "rgba(239,68,68,0.08)"   },
  violet:  { text: "#a78bfa", border: "rgba(167,139,250,0.35)",   bg: "rgba(139,92,246,0.08)"  },
  cyan:    { text: "#22d3ee", border: "rgba(34,211,238,0.35)",    bg: "rgba(6,182,212,0.08)"   },
};

// ─── Waveform ──────────────────────────────────────────────────
const BAR_PROFILE = Array.from({ length: 28 }, (_, i) => {
  const t = i / 27;
  return 0.12 + 0.76 * Math.sin(t * Math.PI);
});

const Waveform = ({ active, color, volume = 0.5 }) => (
  <div className="flex items-end justify-center gap-[2px]" style={{ height: 28, flex: 1 }}>
    {BAR_PROFILE.map((base, i) => (
      <motion.div
        key={i}
        className="rounded-full origin-bottom"
        style={{ width: 2, height: 28, background: color }}
        animate={
          active
            ? {
                scaleY: [base * 0.25, base * (0.5 + volume * 1.1), base * 0.25],
                opacity: [0.35, 0.95, 0.35],
              }
            : { scaleY: 0.08, opacity: 0.18 }
        }
        transition={
          active
            ? { duration: 0.32 + (i % 5) * 0.07, repeat: Infinity, delay: (i / 28) * 0.28, ease: "easeInOut" }
            : { duration: 0.4 }
        }
      />
    ))}
  </div>
);

// ─── Typing dots ───────────────────────────────────────────────
const TypingDots = () => (
  <div className="flex items-center gap-1 px-3 py-2.5">
    {[0, 0.16, 0.32].map((d, i) => (
      <motion.span
        key={i}
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "#f97316" }}
        animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
        transition={{ duration: 0.65, repeat: Infinity, delay: d, ease: "easeInOut" }}
      />
    ))}
  </div>
);

// ─── Main Component ────────────────────────────────────────────
export default function VoiceAssistant({ autoOpen = true, onClose }) {
  const [input,     setInput]    = useState("");
  const [messages,  setMessages] = useState([]);
  const [listening, setListening]= useState(false);
  const [speaking,  setSpeaking] = useState(false);
  const [loading,   setLoading]  = useState(false);
  const [muted,     setMuted]    = useState(false);
  const [volume,    setVolume]   = useState(0.5);
  const [error,     setError]    = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [typingIndicator, setTypingIndicator] = useState(false);

  const recognitionRef  = useRef(null);
  const inputRef        = useRef(null);
  const scrollRef       = useRef(null);
  const volumeTimerRef  = useRef(null);
  const historyRef      = useRef([]);
  const hasGreetedRef   = useRef(false);
  const responseTimeoutRef = useRef(null);

  // ── Auto-scroll ───────────────────────────────────────────────
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // ── TTS ───────────────────────────────────────────────────────
  const speak = useCallback((text) => {
    if (muted || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const clean = text.replace(/[*_`#•\-]/g, "").replace(/\n+/g, " ").trim();
    const utt   = new SpeechSynthesisUtterance(clean);

    const loadVoice = () => {
      const voices   = window.speechSynthesis.getVoices();
      const preferred = ["Google UK English Female", "Samantha", "Microsoft Aria", "Karen", "Google US English", "Alex"];
      for (const name of preferred) {
        const v = voices.find(v => v.name.includes(name.split(" ")[0]));
        if (v) { utt.voice = v; break; }
      }
    };
    loadVoice();
    if (!utt.voice) window.speechSynthesis.onvoiceschanged = loadVoice;

    utt.rate   = 1.0;
    utt.pitch  = 1.05;
    utt.volume = 1;

    utt.onstart = () => {
      setSpeaking(true);
      clearInterval(volumeTimerRef.current);
      volumeTimerRef.current = setInterval(() => setVolume(0.25 + Math.random() * 0.75), 110);
    };
    utt.onend  = () => { setSpeaking(false); setVolume(0.5); clearInterval(volumeTimerRef.current); };
    utt.onerror= () => { setSpeaking(false); clearInterval(volumeTimerRef.current); };

    window.speechSynthesis.speak(utt);
  }, [muted]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    setVolume(0.5);
    clearInterval(volumeTimerRef.current);
  }, []);

  // ── Enhanced AI Response ─────────────────────────────────────
  const getAIResponse = useCallback(async (userText) => {
    // Add to history
    historyRef.current.push({
      role: "user",
      content: userText,
    });

    if (historyRef.current.length > 30) {
      historyRef.current = historyRef.current.slice(-30);
    }

    // Show typing indicator
    setTypingIndicator(true);

    // Simulate thinking time based on query complexity
    const thinkingTime = 400 + Math.random() * 400;
    await new Promise(resolve => setTimeout(resolve, thinkingTime));
    
    // Generate intelligent response with context
    const response = generateResponse(userText, historyRef.current);
    
    // Add to history
    historyRef.current.push({
      role: "assistant",
      content: response,
    });
    
    // Generate follow-up suggestions
    const suggestions = generateSuggestions(userText);
    setSuggestions(suggestions);
    
    setTypingIndicator(false);
    return response;
  }, []);

  // ─── Generate follow-up suggestions ──────────────────────────
  const generateSuggestions = (userInput) => {
    const input = userInput.toLowerCase();
    const suggestions = [];
    
    if (input.match(/\b(skills|technologies|frameworks)\b/)) {
      suggestions.push("Tell me about his projects");
      suggestions.push("What's his background?");
    } else if (input.match(/\b(projects|built|portfolio)\b/)) {
      suggestions.push("What technologies does he use?");
      suggestions.push("How can I hire him?");
    } else if (input.match(/\b(about|who|background)\b/)) {
      suggestions.push("What skills does he have?");
      suggestions.push("Tell me about his projects");
    } else if (input.match(/\b(hire|contact|email|reach)\b/)) {
      suggestions.push("What projects has he built?");
      suggestions.push("Tell me about his experience");
    } else if (input.match(/\b(education|study|school)\b/)) {
      suggestions.push("What skills does he have?");
      suggestions.push("Tell me about his career journey");
    } else {
      suggestions.push("Tell me about Witness");
      suggestions.push("What projects has he built?");
      suggestions.push("How can I hire him?");
    }
    
    return suggestions.slice(0, 3);
  };

  // ── Push / update message ─────────────────────────────────────
  const pushMsg = useCallback((id, role, text, done = true) => {
    setMessages(m => {
      const exists = m.find(msg => msg.id === id);
      if (exists) return m.map(msg => msg.id === id ? { ...msg, text, done } : msg);
      return [...m, { id, role, text, done }];
    });
  }, []);

  // ── Process query ─────────────────────────────────────────────
  const process = useCallback(async (query) => {
    const trimmed = query.trim();
    if (!trimmed || loading) return;

    setInput("");
    setError(null);
    setLoading(true);
    stopSpeaking();

    const userId = `u-${Date.now()}`;
    pushMsg(userId, "user", trimmed);

    const aiId = `a-${Date.now() + 1}`;
    try {
      const aiText = await getAIResponse(trimmed);

      // Typewriter reveal with variable speed
      pushMsg(aiId, "ai", "", false);
      let i = 0;
      const STEP = 2;
      const baseDelay = 12;
      const tick = setInterval(() => {
        i += STEP;
        if (i >= aiText.length) {
          clearInterval(tick);
          pushMsg(aiId, "ai", aiText, true);
          speak(aiText);
        } else {
          pushMsg(aiId, "ai", aiText.slice(0, i), false);
        }
      }, baseDelay + Math.random() * 4);
      
      // Store timeout for cleanup
      responseTimeoutRef.current = tick;
    } catch (err) {
      const msg = "Sorry, I hit a snag. Please try again in a moment!";
      pushMsg(aiId, "ai", msg, true);
      setError(err.message);
      speak(msg);
    } finally {
      setLoading(false);
    }
  }, [loading, getAIResponse, pushMsg, speak, stopSpeaking]);

  // ── Quick action handler ──────────────────────────────────────
  const handleQuickAction = useCallback((cmd) => {
    setInput(cmd);
    process(cmd);
  }, [process]);

  // ── Voice recognition ─────────────────────────────────────────
  const toggleListen = useCallback(() => {
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { 
      process("Voice input isn't supported here — please type your question."); 
      return; 
    }

    stopSpeaking();

    const rec = new SR();
    rec.lang            = "en-US";
    rec.continuous      = false;
    rec.interimResults  = true;
    rec.maxAlternatives = 3;

    rec.onstart  = () => setListening(true);
    rec.onresult = (e) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join("");
      setInput(t);
      if (e.results[e.results.length - 1].isFinal) {
        setListening(false);
        process(t);
      }
    };
    rec.onerror = (err) => {
      console.error("Speech recognition error:", err);
      setListening(false);
      if (err.error === "not-allowed") {
        process("Please allow microphone access to use voice input.");
      }
    };
    rec.onend   = () => setListening(false);

    recognitionRef.current = rec;
    rec.start();
  }, [listening, process, stopSpeaking]);

  // ── Clear chat ────────────────────────────────────────────────
  const clearChat = useCallback(() => {
    setMessages([]);
    historyRef.current  = [];
    hasGreetedRef.current = false;
    setSuggestions([]);
    stopSpeaking();
    setError(null);
    if (responseTimeoutRef.current) {
      clearInterval(responseTimeoutRef.current);
      responseTimeoutRef.current = null;
    }
  }, [stopSpeaking]);

  // ── Welcome with personality ───────────────────────────────────
  useEffect(() => {
    if (!autoOpen || hasGreetedRef.current) return;
    hasGreetedRef.current = true;
    const h = new Date().getHours();
    const greet = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
    const timer = setTimeout(() => {
      const welcomeMsg = `${greet}! 👋 I'm Witbri AI, your intelligent assistant. I can tell you about Witness Fabrice's skills, projects, background, and how to hire him. What would you like to know about this amazing developer?`;
      const welcomeId = `w-${Date.now()}`;
      pushMsg(welcomeId, "ai", welcomeMsg, true);
      speak(welcomeMsg);
      setSuggestions([
        "Tell me about Witness",
        "What projects has he built?",
        "What are his skills?",
        "How can I hire him?"
      ]);
    }, 500);
    return () => clearTimeout(timer);
  }, [autoOpen, pushMsg, speak]);

  // ── Keyboard shortcuts ────────────────────────────────────────
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose?.();
      if ((e.ctrlKey || e.metaKey) && e.key === "m") { e.preventDefault(); setMuted(m => !m); }
      if ((e.ctrlKey || e.metaKey) && e.key === "l") { e.preventDefault(); clearChat(); }
      if (e.key === "Enter" && !e.shiftKey && document.activeElement === inputRef.current) {
        e.preventDefault();
        if (input.trim()) process(input);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, clearChat, input, process]);

  // ── Cleanup ───────────────────────────────────────────────────
  useEffect(() => () => {
    clearInterval(volumeTimerRef.current);
    window.speechSynthesis?.cancel();
    if (responseTimeoutRef.current) {
      clearInterval(responseTimeoutRef.current);
    }
  }, []);

  const statusColor = listening ? "#ef4444" : speaking ? "#f97316" : loading ? "#a78bfa" : "#22c55e";
  const statusLabel = listening ? "Listening…"  : speaking ? "Speaking"   : loading ? "Thinking…"  : "Ready";

  return (
    <AnimatePresence>
      {autoOpen && (
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.93 }}
          animate={{ opacity: 1, y: 0,  scale: 1     }}
          exit={{   opacity: 0, y: 20,  scale: 0.95  }}
          transition={{ type: "spring", stiffness: 340, damping: 30 }}
          className="fixed bottom-28 right-5 z-[998] w-[420px] max-w-[calc(100vw-1.25rem)]"
        >
          {/* Ambient glow */}
          <motion.div
            className="pointer-events-none absolute -inset-10 rounded-[3rem]"
            style={{ background: "radial-gradient(ellipse at 50% 65%, rgba(249,115,22,0.10) 0%, transparent 68%)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4.5, repeat: Infinity }}
          />

          {/* Shell */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(158deg, #1c1917 0%, #0d0c0b 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 28px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(249,115,22,0.10)",
            }}
          >
            {/* Top line accent */}
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent 5%, rgba(249,115,22,0.55) 50%, transparent 95%)" }} />

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative w-9 h-9 shrink-0">
                  <motion.div
                    className="absolute inset-0 rounded-xl blur-md"
                    style={{ background: "rgba(249,115,22,0.38)" }}
                    animate={{ opacity: [0.28, 0.65, 0.28], scale: [0.88, 1.12, 0.88] }}
                    transition={{ duration: 2.6, repeat: Infinity }}
                  />
                  <div className="relative w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(140deg, #f97316, #c2410c)" }}>
                    <Bot size={16} className="text-white" />
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                    style={{ background: statusColor, borderColor: "#0d0c0b", transition: "background 0.3s" }} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-black tracking-tight text-white" style={{ letterSpacing: "-0.025em" }}>
                      Witbri AI
                    </span>
                    <span className="px-1.5 py-[2px] rounded-md text-[8.5px] font-bold uppercase tracking-widest"
                      style={{ background: "rgba(249,115,22,0.13)", color: "#f97316", border: "1px solid rgba(249,115,22,0.22)" }}>
                      Live
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-[2px]">
                    <motion.span className="w-1.5 h-1.5 rounded-full"
                      style={{ background: statusColor, transition: "background 0.3s" }}
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.1, repeat: Infinity }} />
                    <span className="text-[9px] uppercase tracking-[0.14em] font-semibold" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {statusLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                {[
                  { icon: RotateCcw, action: clearChat,                  title: "Clear (⌘L)", hoverColor: "#f97316" },
                  { icon: muted ? VolumeX : Volume2, action: () => { setMuted(m => !m); if (speaking) stopSpeaking(); }, title: "Mute (⌘M)", hoverColor: "#f97316", active: muted },
                  { icon: X, action: onClose, title: "Close (Esc)", hoverColor: "#ef4444" },
                ].map(({ icon: Ic, action, title, hoverColor, active }, i) => (
                  <button key={i} onClick={action} title={title}
                    className="w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200"
                    style={{ border: "1px solid rgba(255,255,255,0.08)", color: active ? hoverColor : "rgba(255,255,255,0.28)" }}
                    onMouseEnter={e => { e.currentTarget.style.color = hoverColor; e.currentTarget.style.borderColor = hoverColor + "55"; e.currentTarget.style.background = hoverColor + "12"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = active ? hoverColor : "rgba(255,255,255,0.28)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "transparent"; }}>
                    <Ic size={13} />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Quick Actions ── */}
            <div className="px-4 pt-3 pb-1">
              <div className="flex flex-wrap gap-1.5">
                {QUICK_ACTIONS.map(({ icon: Icon, label, cmd, color }) => (
                  <button
                    key={label}
                    onClick={() => handleQuickAction(cmd)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      background: COLOR_HOVER[color].bg,
                      border: `1px solid ${COLOR_HOVER[color].border}`,
                      color: COLOR_HOVER[color].text,
                    }}
                  >
                    <Icon size={10} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Waveform bar ── */}
            <div className="px-5 pt-2 pb-2">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.055)" }}>
                <Waveform active={speaking || listening} color={listening ? "#ef4444" : "#f97316"} volume={volume} />
                <div className="flex flex-col items-end shrink-0 min-w-[48px]">
                  <span className="text-[8.5px] uppercase tracking-widest font-bold" style={{ color: "rgba(255,255,255,0.18)" }}>
                    {listening ? "Input" : speaking ? "Output" : "Standby"}
                  </span>
                  {speaking && (
                    <button onClick={stopSpeaking} className="text-[9px] mt-0.5 font-semibold" style={{ color: "#f97316" }}>
                      Stop ▪
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── Messages ── */}
            <div ref={scrollRef} className="px-4 py-1.5 space-y-2.5 overflow-y-auto" style={{ maxHeight: 232, scrollbarWidth: "none" }}>
              <AnimatePresence initial={false}>
                {messages.length === 0 && !loading && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-6 gap-2"
                  >
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                      style={{ background: "rgba(249,115,22,0.10)", border: "1px solid rgba(249,115,22,0.18)" }}>
                      <Sparkles size={16} style={{ color: "#f97316" }} />
                    </div>
                    <p className="text-[11px] text-center" style={{ color: "rgba(255,255,255,0.28)", maxWidth: 240 }}>
                      Ask me anything about Witness — his projects, skills, background, or how to hire him.
                    </p>
                  </motion.div>
                )}

                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.18 }}
                    className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Icon */}
                    <div className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5"
                      style={msg.role === "ai"
                        ? { background: "rgba(249,115,22,0.13)", border: "1px solid rgba(249,115,22,0.22)" }
                        : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
                      {msg.role === "ai"
                        ? <Bot size={11} style={{ color: "#f97316" }} />
                        : <User size={11} style={{ color: "rgba(255,255,255,0.45)" }} />}
                    </div>

                    {/* Bubble */}
                    <div
                      className="max-w-[78%] px-3 py-2 text-[11.5px] leading-relaxed"
                      style={msg.role === "user"
                        ? { background: "linear-gradient(135deg, #f97316, #c2410c)", color: "white", borderRadius: "14px 3px 14px 14px" }
                        : { background: "rgba(255,255,255,0.055)", color: "rgba(255,255,255,0.82)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "3px 14px 14px 14px" }}
                    >
                      {msg.text}
                      {msg.role === "ai" && !msg.done && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.48, repeat: Infinity }}
                          className="inline-block w-[5px] h-[10px] ml-0.5 align-middle rounded-sm"
                          style={{ background: "#f97316" }}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {typingIndicator && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2"
                  >
                    <div className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(249,115,22,0.13)", border: "1px solid rgba(249,115,22,0.22)" }}>
                      <Bot size={11} style={{ color: "#f97316" }} />
                    </div>
                    <div className="rounded-[3px_14px_14px_14px]"
                      style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <TypingDots />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Loading bubble */}
              {loading && !typingIndicator && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                  <div className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(249,115,22,0.13)", border: "1px solid rgba(249,115,22,0.22)" }}>
                    <Bot size={11} style={{ color: "#f97316" }} />
                  </div>
                  <div className="rounded-[3px_14px_14px_14px]"
                    style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </div>

            {/* ── Suggestions ── */}
            {suggestions.length > 0 && !loading && messages.length > 0 && (
              <div className="px-4 pb-1">
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(suggestion)}
                      className="text-[9px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/45 hover:text-white hover:border-orange-400/60 hover:bg-orange-500/10 transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Input row ── */}
            <div className="px-4 pt-1 pb-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey && input.trim()) { e.preventDefault(); process(input); } }}
                  placeholder={listening ? "Listening…" : "Ask anything about Witness…"}
                  disabled={loading}
                  className="flex-1 text-[12px] px-4 py-2.5 rounded-xl transition-all duration-200 outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                />
                <button
                  onClick={toggleListen}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${listening ? "animate-pulse" : ""}`}
                  style={{ background: listening ? "#ef4444" : "rgba(249,115,22,0.85)", border: "none" }}
                >
                  <Mic size={14} className="text-white" />
                </button>
                <button
                  onClick={() => process(input)}
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background: input.trim() && !loading ? "rgba(249,115,22,0.85)" : "rgba(255,255,255,0.08)", border: "none", opacity: input.trim() && !loading ? 1 : 0.4 }}
                >
                  <Send size={13} className={input.trim() && !loading ? "text-white" : "text-gray-500"} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
