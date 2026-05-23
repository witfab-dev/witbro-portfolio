import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Volume2, VolumeX, X, Send,
  User, Zap, Code2, Mail, Briefcase, MapPin,
  Bot, Loader2, RotateCcw, Sparkles, GraduationCap,
} from 'lucide-react';

// ─── Knowledge Base ─────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Witbri AI, a smart, friendly voice assistant embedded in Witness Fabrice's personal developer portfolio. Your job is to help visitors learn about Witness and potentially hire or connect with him.

Here is everything you know about Witness Fabrice:

PERSONAL:
- Full name: Witness Fabrice
- Email: witnessfabrice@gmail.com
- Phone: +250 783 568 337
- Location: Kigali, Rwanda
- GitHub: github.com/witnessfabrice (inferred)
- LinkedIn: linkedin.com/in/witnessfabrice (inferred)

EDUCATION:
- Graduated with distinction from Kirehe Adventist TVET School
- Awards: Best Tech Project & Leadership Excellence
- Focus: Software Engineering & Web Technologies

SKILLS:
- Frontend: React, Next.js, Vue.js, Three.js, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, Python, Django, GraphQL, REST APIs
- Databases: PostgreSQL, MongoDB, MySQL, Redis
- Infrastructure: Docker, AWS, Vercel, Nginx, CI/CD pipelines
- Other: IoT integration, WebGL, WebSockets, PWA

PROJECTS:
1. Market-Kigali — An e-commerce platform for local Kigali vendors
   - Impact: 500+ active users
   - Stack: React, Node.js, Stripe payments, PostgreSQL
   - Features: Real-time inventory, vendor dashboard, mobile-first

2. KATSS Platform — Academic management system for schools
   - Impact: 1000+ students managed
   - Stack: React, Express.js, MongoDB
   - Features: Grade tracking, attendance, parent portal, notifications

3. Rwanda Explorer — Immersive 3D tourism experience
   - Impact: 4.8★ app store rating
   - Stack: Three.js, WebGL, React
   - Features: 360° virtual tours, interactive maps, cultural content

4. PSSMS — Parking & Slot Management System
   - Impact: 200+ parking slots managed
   - Stack: Vue.js, Python, IoT sensors
   - Features: Real-time availability, automated billing, sensor integration

PERSONALITY TRAITS (for you to reflect in how you describe him):
- Passionate about building impactful tech solutions for Africa
- Detail-oriented and ships high-quality code
- Collaborative, fast learner, thrives in cross-functional teams
- Open to freelance, full-time remote, and relocation opportunities

RESPONSE STYLE:
- Be conversational, warm, and concise (2–4 sentences max unless asked for more detail)
- Use light markdown only for lists when helpful — no headers or bold overuse
- If asked about hiring: enthusiastically recommend reaching out via email
- If you don't know something, say so honestly rather than making it up
- Never go off-topic — gently redirect to Witness-related topics
- Keep responses punchy and suitable for text-to-speech reading aloud`;

// ─── Quick Actions ─────────────────────────────────────────────
const QUICK_ACTIONS = [
  { icon: User,          label: 'About',      cmd: 'Tell me about Witness Fabrice',           color: 'blue' },
  { icon: Zap,           label: 'Projects',   cmd: 'What projects has Witness built?',         color: 'amber' },
  { icon: Code2,         label: 'Skills',     cmd: 'What technologies does Witness know?',     color: 'emerald' },
  { icon: Mail,          label: 'Contact',    cmd: 'How can I contact or hire Witness?',       color: 'rose' },
  { icon: GraduationCap, label: 'Education',  cmd: 'Tell me about his education background',   color: 'violet' },
  { icon: MapPin,        label: 'Location',   cmd: 'Where is Witness based?',                  color: 'cyan' },
];

const COLOR_MAP = {
  blue:    'group-hover:text-blue-400    group-hover:border-blue-500/40    group-hover:bg-blue-500/10',
  amber:   'group-hover:text-amber-400   group-hover:border-amber-500/40   group-hover:bg-amber-500/10',
  emerald: 'group-hover:text-emerald-400 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10',
  rose:    'group-hover:text-rose-400    group-hover:border-rose-500/40    group-hover:bg-rose-500/10',
  violet:  'group-hover:text-violet-400  group-hover:border-violet-500/40  group-hover:bg-violet-500/10',
  cyan:    'group-hover:text-cyan-400    group-hover:border-cyan-500/40    group-hover:bg-cyan-500/10',
};
const ICON_COLOR_MAP = {
  blue:    'group-hover:text-blue-400',
  amber:   'group-hover:text-amber-400',
  emerald: 'group-hover:text-emerald-400',
  rose:    'group-hover:text-rose-400',
  violet:  'group-hover:text-violet-400',
  cyan:    'group-hover:text-cyan-400',
};

// ─── Waveform ──────────────────────────────────────────────────
const BAR_HEIGHTS = Array.from({ length: 24 }, (_, i) => {
  const pos = i / 24;
  return 0.15 + 0.7 * Math.sin(pos * Math.PI);
});

const Waveform = ({ active, color, volume = 0.5 }) => (
  <div className="flex items-end justify-center gap-[2.5px]" style={{ height: 32 }}>
    {BAR_HEIGHTS.map((base, i) => (
      <motion.div
        key={i}
        className="w-[2px] rounded-full origin-bottom"
        style={{ background: color }}
        animate={active
          ? {
              scaleY: [
                base * 0.3,
                base * (0.4 + volume * 1.2 + Math.random() * 0.4),
                base * 0.3,
              ],
              opacity: [0.4, 0.9, 0.4],
            }
          : { scaleY: 0.1, opacity: 0.2 }
        }
        transition={active
          ? {
              duration: 0.3 + (i % 4) * 0.08,
              repeat: Infinity,
              delay: (i / 24) * 0.3,
              ease: 'easeInOut',
            }
          : { duration: 0.4 }
        }
        initial={{ scaleY: 0.1, height: 32 }}
      />
    ))}
  </div>
);

// ─── Typing indicator ──────────────────────────────────────────
const TypingDots = () => (
  <div className="flex items-center gap-1 px-3 py-2.5">
    {[0, 0.18, 0.36].map(d => (
      <motion.span
        key={d}
        className="w-1.5 h-1.5 rounded-full bg-orange-400"
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: d, ease: 'easeInOut' }}
      />
    ))}
  </div>
);

// ─── Main Component ────────────────────────────────────────────
export default function VoiceAssistant({ autoOpen = true, onClose }) {
  const [input,       setInput]      = useState('');
  const [messages,    setMessages]   = useState([]);   // { id, role:'ai'|'user', text, done }
  const [listening,   setListening]  = useState(false);
  const [speaking,    setSpeaking]   = useState(false);
  const [loading,     setLoading]    = useState(false);
  const [muted,       setMuted]      = useState(false);
  const [error,       setError]      = useState(null);
  const [volume,      setVolume]     = useState(0.5);

  const recognitionRef = useRef(null);
  const inputRef       = useRef(null);
  const scrollRef      = useRef(null);
  const synthRef       = useRef(null);
  const volumeTimerRef = useRef(null);
  const historyRef     = useRef([]);   // OpenAI-style message history for context

  // ── Auto-scroll ───────────────────────────────────────────────
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  // ── TTS ───────────────────────────────────────────────────────
  const speak = useCallback((text) => {
    if (muted || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferred = [
      'Google UK English Female', 'Samantha', 'Microsoft Aria Online (Natural)',
      'Karen', 'Google US English', 'Alex',
    ];
    for (const name of preferred) {
      const v = voices.find(v => v.name.includes(name.split(' ')[0]));
      if (v) { utt.voice = v; break; }
    }
    utt.rate = 1.0; utt.pitch = 1.05; utt.volume = 1;
    utt.onstart  = () => { setSpeaking(true); animateVolume(); };
    utt.onend    = () => { setSpeaking(false); setVolume(0.5); clearInterval(volumeTimerRef.current); };
    utt.onerror  = () => { setSpeaking(false); };
    synthRef.current = utt;
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
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      process("Voice input isn't supported in this browser — please type your question instead.");
      return;
    }

    // Pause TTS while listening
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setSpeaking(false);
    }

    const rec = new SR();
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    rec.onstart  = () => setListening(true);
    rec.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
      setInput(transcript);
      if (e.results[e.results.length - 1].isFinal) {
        setListening(false);
        process(transcript);
      }
    };
    rec.onerror  = () => { setListening(false); };
    rec.onend    = () => { setListening(false); };

    recognitionRef.current = rec;
    rec.start();
  }, [listening, process]);

  // ── Stop speaking ─────────────────────────────────────────────
  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    setVolume(0.5);
    clearInterval(volumeTimerRef.current);
  }, []);

  // ── Clear conversation ─────────────────────────────────────────
  const clearChat = useCallback(() => {
    setMessages([]);
    historyRef.current = [];
    stopSpeaking();
    setError(null);
    setTimeout(() => process('Hello! Give me a quick intro.'), 300);
  }, [process, stopSpeaking]);

  // ── Welcome message ────────────────────────────────────────────
  useEffect(() => {
    if (!autoOpen) return;
    const h = new Date().getHours();
    const greet = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
    const t = setTimeout(() => {
      process(`${greet}! Introduce yourself briefly and tell me how you can help.`);
    }, 700);
    return () => clearTimeout(t);
  }, [autoOpen]); // eslint-disable-line

  // ── Keyboard shortcuts ─────────────────────────────────────────
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') onClose?.();
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') { e.preventDefault(); setMuted(m => !m); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') { e.preventDefault(); clearChat(); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose, clearChat]);

  // ── Cleanup ────────────────────────────────────────────────────
  useEffect(() => () => {
    clearInterval(volumeTimerRef.current);
    window.speechSynthesis?.cancel();
  }, []);

  const statusColor = listening ? '#ef4444' : speaking ? '#f97316' : loading ? '#a78bfa' : '#22c55e';
  const statusLabel = listening ? 'Listening…' : speaking ? 'Speaking' : loading ? 'Thinking…' : 'Ready';

  return (
    <AnimatePresence>
      {autoOpen && (
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          className="fixed bottom-28 right-5 z-[998] w-[420px] max-w-[calc(100vw-1.5rem)]"
        >
          {/* Ambient glow */}
          <motion.div
            className="pointer-events-none absolute -inset-8 rounded-[3rem]"
            style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(249,115,22,0.12) 0%, transparent 70%)' }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Shell */}
          <div
            className="relative rounded-3xl overflow-hidden border shadow-2xl"
            style={{
              background: 'linear-gradient(160deg, #1c1917 0%, #0f0e0d 100%)',
              borderColor: 'rgba(255,255,255,0.07)',
              boxShadow: '0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(249,115,22,0.12)',
            }}
          >
            {/* Top shimmer */}
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.6), transparent)' }} />

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative w-9 h-9 shrink-0">
                  <motion.div
                    className="absolute inset-0 rounded-xl blur-md"
                    style={{ background: 'rgba(249,115,22,0.4)' }}
                    animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                  <div
                    className="relative w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
                  >
                    <Bot size={16} className="text-white" />
                  </div>
                  <span
                    className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                    style={{ background: statusColor, borderColor: '#0f0e0d', transition: 'background 0.3s' }}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black tracking-tight text-white" style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.02em' }}>
                      Witbri AI
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest"
                      style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316', border: '1px solid rgba(249,115,22,0.25)' }}>
                      Pro
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: statusColor, transition: 'background 0.3s' }}
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {statusLabel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Clear chat */}
                <button
                  onClick={clearChat}
                  title="Clear chat (⌘L)"
                  className="w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#f97316'; e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                  <RotateCcw size={13} />
                </button>
                {/* Mute */}
                <button
                  onClick={() => { setMuted(m => !m); if (speaking) stopSpeaking(); }}
                  title="Toggle mute (⌘M)"
                  className="w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', color: muted ? '#f97316' : 'rgba(255,255,255,0.3)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                  {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                </button>
                {/* Close */}
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* ── Waveform display ── */}
            <div className="px-5 pt-3 pb-2">
              <div
                className="flex items-center gap-4 px-4 py-2.5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <Waveform
                  active={speaking || listening}
                  color={listening ? '#ef4444' : '#f97316'}
                  volume={volume}
                />
                <div className="flex flex-col ml-auto shrink-0">
                  <span className="text-[9px] uppercase tracking-widest font-bold" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    {listening ? 'Input' : speaking ? 'Output' : 'Standby'}
                  </span>
                  {speaking && (
                    <button
                      onClick={stopSpeaking}
                      className="text-[9px] mt-0.5 font-semibold transition-colors"
                      style={{ color: '#f97316' }}
                    >
                      Stop ▪
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── Messages ── */}
            <div
              ref={scrollRef}
              className="px-4 py-2 space-y-3 overflow-y-auto"
              style={{ maxHeight: 240, scrollbarWidth: 'none' }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Icon */}
                    <div
                      className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5"
                      style={msg.role === 'ai'
                        ? { background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.25)' }
                        : { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }
                      }
                    >
                      {msg.role === 'ai'
                        ? <Bot size={11} style={{ color: '#f97316' }} />
                        : <User size={11} style={{ color: 'rgba(255,255,255,0.5)' }} />
                      }
                    </div>

                    {/* Bubble */}
                    <div
                      className="max-w-[80%] px-3 py-2 rounded-2xl text-[11.5px] leading-relaxed"
                      style={msg.role === 'user'
                        ? {
                            background: 'linear-gradient(135deg, #f97316, #ea580c)',
                            color: 'white',
                            borderRadius: '16px 4px 16px 16px',
                          }
                        : {
                            background: 'rgba(255,255,255,0.06)',
                            color: 'rgba(255,255,255,0.85)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '4px 16px 16px 16px',
                          }
                      }
                    >
                      {msg.text}
                      {msg.role === 'ai' && !msg.done && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="inline-block w-[5px] h-[10px] ml-0.5 align-middle rounded-sm"
                          style={{ background: '#f97316' }}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Loading */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <div
                    className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.25)' }}
                  >
                    <Bot size={11} style={{ color: '#f97316' }} />
                  </div>
                  <div
                    className="rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '4px 16px 16px 16px',
                    }}
                  >
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </div>

            {/* ── Input row ── */}
            <div className="px-4 pt-2 pb-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey && input.trim()) {
                      e.preventDefault();
                      process(input.trim());
                    }
                  }}
                  placeholder="Ask anything about Witness…"
                  disabled={loading}
                  className="flex-1 text-[12px] px-4 py-2.5 rounded-xl transition-all duration-200 outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    color: 'rgba(255,255,255,0.85)',
                    caretColor: '#f97316',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(249,115,22,0.45)'; e.target.style.background = 'rgba(255,255,255,0.07)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
                />

                {/* Mic button */}
                <motion.button
                  onClick={toggleListen}
                  whileTap={{ scale: 0.88 }}
                  disabled={loading}
                  className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl transition-all duration-200"
                  style={listening
                    ? { background: '#ef4444', boxShadow: '0 0 20px rgba(239,68,68,0.5)' }
                    : { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }
                  }
                >
                  {listening
                    ? <MicOff size={14} className="text-white" />
                    : <Mic size={14} />
                  }
                </motion.button>

                {/* Send button */}
                <motion.button
                  onClick={() => input.trim() && process(input.trim())}
                  whileTap={{ scale: 0.88 }}
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl transition-all duration-200"
                  style={input.trim() && !loading
                    ? { background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 4px 16px rgba(249,115,22,0.4)' }
                    : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.2)' }
                  }
                >
                  {loading
                    ? <Loader2 size={14} className="text-white animate-spin" />
                    : <Send size={14} style={{ color: input.trim() ? 'white' : undefined }} />
                  }
                </motion.button>
              </div>
            </div>

            {/* ── Quick actions ── */}
            <div className="px-4 pb-4 grid grid-cols-3 gap-2">
              {QUICK_ACTIONS.map(({ icon: Ic, label, cmd, color }, i) => (
                <motion.button
                  key={label}
                  onClick={() => process(cmd)}
                  disabled={loading}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.25 }}
                  className={`group flex flex-col items-center gap-1.5 py-2.5 rounded-xl transition-all duration-200 ${COLOR_MAP[color]}`}
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <Ic size={13} className={`transition-colors duration-200 ${ICON_COLOR_MAP[color]}`} style={{ color: 'rgba(255,255,255,0.35)' }} />
                  <span className={`text-[9.5px] font-bold uppercase tracking-wider transition-colors duration-200 ${ICON_COLOR_MAP[color]}`} style={{ color: 'rgba(255,255,255,0.35)' }}>
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
              <div className="flex items-center gap-3 text-[9px]" style={{ color: 'rgba(255,255,255,0.15)' }}>
                <span>↵ send</span>
                <span>⌘M mute</span>
                <span>⌘L clear</span>
                <span>Esc close</span>
              </div>
            </div>

            {/* Bottom shimmer */}
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}