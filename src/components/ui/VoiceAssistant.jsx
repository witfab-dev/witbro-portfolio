import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Volume2, VolumeX, X, Send,
  User, Zap, Code2, Mail, Briefcase, MapPin,
  Bot, Loader2, ChevronRight,
} from 'lucide-react';

// ─── Knowledge base ────────────────────────────────────────────
const KB = {
  personal: {
    name: 'Witness Fabrice',
    email: 'witnessfabrice@gmail.com',
    phone: '+250 783 568 337',
    location: 'Kigali, Rwanda',
  },
  projects: [
    { name: 'Market-Kigali',  impact: '500+ users',        tech: 'React · Node.js · Stripe' },
    { name: 'KATSS Platform', impact: '1000+ students',    tech: 'React · Express · MongoDB' },
    { name: 'Rwanda Explorer',impact: '4.8★ rating',       tech: 'Three.js · WebGL' },
    { name: 'PSSMS',          impact: '200+ slots managed',tech: 'Vue · Python · IoT' },
  ],
  skills: {
    frontend: ['React', 'Next.js', 'Vue', 'Three.js'],
    backend:  ['Node.js', 'Python', 'GraphQL'],
    infra:    ['Docker', 'AWS', 'PostgreSQL'],
  },
};

const ROUTES = {
  skills:    ['skill','tech','stack','code','framework','frontend','backend'],
  projects:  ['project','portfolio','work','built','created','developed'],
  contact:   ['contact','email','phone','hire','reach','connect'],
  greeting:  ['hello','hi','hey','greetings','morning','afternoon','evening'],
  location:  ['location','where','based','country','city','rwanda'],
  education: ['education','school','study','graduate','background'],
};

const RESPONSES = {
  greeting:  () => `Witbri AI ready. I'm your guide to Witness Fabrice's work — ask me about his skills, projects, or how to get in touch.`,
  skills:    () => `Tech stack: Frontend — ${KB.skills.frontend.join(', ')}. Backend — ${KB.skills.backend.join(', ')}. Infra — ${KB.skills.infra.join(', ')}. What interests you?`,
  projects:  () => `${KB.projects.length} projects shipped: ${KB.projects.map(p => `${p.name} (${p.impact})`).join('; ')}. Which one would you like to explore?`,
  contact:   () => `Email: ${KB.personal.email} · Phone: ${KB.personal.phone} · Location: ${KB.personal.location}. Ready to connect!`,
  location:  () => `Witness is based in ${KB.personal.location}, building world-class products from East Africa.`,
  education: () => `Graduated with distinction from Kirehe Adventist TVET School — Best Tech Project & Leadership Excellence awards.`,
  default:   () => `I can help you explore skills, projects, or contact info. What would you like to know about Witness Fabrice?`,
};

const QUICK_ACTIONS = [
  { icon: User,      label: 'About',      cmd: 'who is witness fabrice',scroll: null },
  { icon: Zap,       label: 'Projects',   cmd: 'show projects',         scroll: 'projects' },
  { icon: Code2,     label: 'Stack',      cmd: 'what technologies',     scroll: 'skills' },
  { icon: Mail,      label: 'Contact',    cmd: 'how to contact',        scroll: 'contact' },
  { icon: Briefcase, label: 'Experience', cmd: 'work experience',       scroll: null },
  { icon: MapPin,    label: 'Location',   cmd: 'where is witness',      scroll: null },
];

// ─── Waveform ──────────────────────────────────────────────────
const Waveform = ({ active, color }) => (
  <div className="flex items-center justify-center gap-[3px] h-7">
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        className="w-[2.5px] rounded-full"
        style={{ background: color, height: 28 }}
        animate={active
          ? { scaleY: [0.15, Math.random() * 0.7 + 0.3, 0.15], opacity: [0.5, 1, 0.5] }
          : { scaleY: 0.12, opacity: 0.25 }
        }
        transition={active
          ? { duration: 0.45 + Math.random() * 0.4, repeat: Infinity, delay: (i / 20) * 0.25, ease: 'easeInOut' }
          : { duration: 0.3 }
        }
      />
    ))}
  </div>
);

// ─── Main ──────────────────────────────────────────────────────
export default function VoiceAssistant({ autoOpen = true, onClose }) {
  const [input,      setInput]      = useState('');
  const [messages,   setMessages]   = useState([]); // { role: 'ai'|'user', text }
  const [listening,  setListening]  = useState(false);
  const [speaking,   setSpeaking]   = useState(false);
  const [processing, setProcessing] = useState(false);
  const [muted,      setMuted]      = useState(false);

  const recognitionRef = useRef(null);
  const inputRef       = useRef(null);
  const scrollRef      = useRef(null);
  const typingRef      = useRef(null);

  // ── Typewriter into messages ─────────────────────────────────
  const pushAIMessage = useCallback((fullText) => {
    const id = Date.now();
    setMessages(m => [...m, { id, role: 'ai', text: '' }]);
    let i = 0;
    clearInterval(typingRef.current);
    typingRef.current = setInterval(() => {
      if (i <= fullText.length) {
        setMessages(m => m.map(msg => msg.id === id ? { ...msg, text: fullText.slice(0, i++) } : msg));
      } else {
        clearInterval(typingRef.current);
      }
    }, 16);
  }, []);

  // ── TTS ──────────────────────────────────────────────────────
  const speak = useCallback((str) => {
    pushAIMessage(str);
    if (muted || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(str);
    const voices = window.speechSynthesis.getVoices();
    const v = voices.find(v => v.name.includes('Samantha') || v.name.includes('Google US English'));
    if (v) utt.voice = v;
    utt.rate = 1.05; utt.pitch = 1.0;
    utt.onstart = () => setSpeaking(true);
    utt.onend   = () => setSpeaking(false);
    window.speechSynthesis.speak(utt);
  }, [muted, pushAIMessage]);

  // ── Command processor ─────────────────────────────────────────
  const process = useCallback((q) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setMessages(m => [...m, { id: Date.now(), role: 'user', text: trimmed }]);
    setInput('');
    setProcessing(true);

    const lower = trimmed.toLowerCase();
    let route = 'default', best = 0;
    Object.entries(ROUTES).forEach(([r, kws]) => {
      const score = kws.reduce((a, kw) => a + (lower.includes(kw) ? kw.length : 0), 0);
      if (score > best) { best = score; route = r; }
    });

    const scrollTarget = QUICK_ACTIONS.find(a => a.cmd === trimmed)?.scroll;
    if (scrollTarget) document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      const response = (RESPONSES[route] || RESPONSES.default)();
      setProcessing(false);
      speak(response);
    }, 350);
  }, [speak]);

  // ── Voice recognition ─────────────────────────────────────────
  const toggleListen = useCallback(() => {
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { speak("Voice input isn't supported in this browser. Try typing instead."); return; }
    const rec = new SR();
    rec.lang = 'en-US'; rec.continuous = false; rec.interimResults = true;
    rec.onstart  = () => setListening(true);
    rec.onresult = (e) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join('');
      setInput(t);
      if (e.results[e.results.length - 1].isFinal) process(t);
    };
    rec.onerror = () => setListening(false);
    rec.onend   = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
  }, [listening, process, speak]);

  // ── Welcome ───────────────────────────────────────────────────
  useEffect(() => {
    if (!autoOpen) return;
    const h    = new Date().getHours();
    const greet = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
    const t = setTimeout(() =>
      speak(`${greet}! Witbri AI online. Ask me about Witness Fabrice's work, skills, or how to get in touch.`),
      600
    );
    return () => clearTimeout(t);
  }, [autoOpen]); // eslint-disable-line

  // ── Auto-scroll messages ──────────────────────────────────────
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, processing]);

  // ── Keyboard shortcuts ────────────────────────────────────────
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') onClose?.();
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') { e.preventDefault(); setMuted(m => !m); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  useEffect(() => () => clearInterval(typingRef.current), []);

  const statusColor = listening ? '#ef4444' : speaking ? '#f97316' : '#22c55e';
  const statusLabel = listening ? 'Listening' : speaking ? 'Speaking' : 'Ready';

  return (
    <AnimatePresence>
      {autoOpen && (
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="fixed bottom-28 right-6 z-[998] w-[400px] max-w-[calc(100vw-2rem)]"
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-orange-500/[0.05] blur-2xl" />

          {/* Shell */}
          <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800/70 shadow-2xl shadow-black/20">

            {/* Top accent */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800/60">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative w-9 h-9 shrink-0">
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-orange-500/30 blur-md"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-orange-500">
                    <Bot size={17} className="text-white" />
                  </div>
                  {/* Online dot */}
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white dark:border-[#161513]" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black tracking-tight text-stone-900 dark:text-stone-100">
                      Witbri AI
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest bg-orange-500/10 text-orange-500 border border-orange-500/20">
                      v4
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: statusColor }}
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-[10px] text-stone-400 dark:text-stone-600 uppercase tracking-widest font-medium">
                      {statusLabel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMuted(m => !m)}
                  title="Toggle mute (⌘M)"
                  className="w-8 h-8 flex items-center justify-center rounded-xl border border-stone-200 dark:border-stone-800 text-stone-400 hover:text-orange-500 hover:border-orange-400 transition-all"
                >
                  {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-xl border border-stone-200 dark:border-stone-800 text-stone-400 hover:text-red-500 hover:border-red-400 transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* ── Waveform ── */}
            <div className="px-5 pt-4 pb-2">
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800/60">
                <Waveform active={speaking || listening} color={listening ? '#ef4444' : '#f97316'} />
              </div>
            </div>

            {/* ── Chat messages ── */}
            <div
              ref={scrollRef}
              className="px-5 py-2 space-y-3 max-h-52 overflow-y-auto"
              style={{ scrollbarWidth: 'none' }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar dot */}
                  <div
                    className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5 ${
                      msg.role === 'ai'
                        ? 'bg-orange-500/10 border border-orange-500/20'
                        : 'bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    {msg.role === 'ai'
                      ? <Bot size={11} className="text-orange-500" />
                      : <User size={11} className="text-stone-400" />
                    }
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[78%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-orange-500 text-white rounded-tr-sm'
                        : 'bg-stone-100 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 rounded-tl-sm border border-stone-200 dark:border-stone-700/60'
                    }`}
                  >
                    {msg.text}
                    {msg.role === 'ai' && msg.text && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.55, repeat: Infinity }}
                        className="inline-block w-[5px] h-[11px] ml-0.5 align-middle bg-orange-400 rounded-sm"
                      />
                    )}
                  </div>
                </div>
              ))}

              {/* Processing indicator */}
              {processing && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-orange-500/10 border border-orange-500/20 shrink-0">
                    <Bot size={11} className="text-orange-500" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl rounded-tl-sm bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60">
                    {[0, 0.15, 0.3].map(d => (
                      <motion.span key={d} className="w-1.5 h-1.5 rounded-full bg-orange-400"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: d }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Input ── */}
            <div className="px-5 pt-2 pb-4">
              <div className="relative flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && input.trim()) process(input.trim()); }}
                  placeholder="Ask anything about Witness…"
                  className="flex-1 text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-600
                             px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800/60
                             border border-stone-200 dark:border-stone-700/60
                             focus:outline-none focus:border-orange-400 focus:bg-white dark:focus:bg-stone-800
                             transition-all"
                />

                {/* Send / Mic */}
                <motion.button
                  onClick={() => input.trim() ? process(input.trim()) : toggleListen()}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-xl transition-all ${
                    listening
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                      : input.trim()
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                        : 'bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-400 hover:bg-orange-500 hover:text-white hover:border-orange-500'
                  }`}
                >
                  {listening
                    ? <MicOff size={15} />
                    : input.trim()
                      ? <Send size={15} />
                      : <Mic size={15} />
                  }
                </motion.button>
              </div>
            </div>

            {/* ── Quick actions grid ── */}
            <div className="px-5 pb-4 grid grid-cols-3 gap-2">
              {QUICK_ACTIONS.map(({ icon: Ic, label, cmd }, i) => (
                <motion.button
                  key={label}
                  onClick={() => process(cmd)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex flex-col items-center gap-1.5 py-3 rounded-xl
                             bg-stone-50 dark:bg-stone-800/40
                             border border-stone-100 dark:border-stone-800/60
                             hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10
                             transition-all duration-200"
                >
                  <Ic size={14} className="text-stone-400 group-hover:text-orange-500 transition-colors" />
                  <span className="text-[10px] font-semibold text-stone-400 group-hover:text-orange-500 tracking-wide transition-colors">
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* ── Footer ── */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-stone-100 dark:border-stone-800/60 bg-stone-50 dark:bg-stone-900/30">
              <div className="flex items-center gap-2 text-[9px] text-stone-400 dark:text-stone-600 uppercase tracking-widest">
                <Loader2 size={9} className={speaking || listening ? 'animate-spin' : 'opacity-30'} />
                Portfolio Guide
              </div>
              <div className="flex items-center gap-3 text-[9px] text-stone-300 dark:text-stone-700">
                <span>↵ send</span>
                <span>⌘M mute</span>
                <span>Esc close</span>
              </div>
            </div>

            {/* Bottom accent */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
