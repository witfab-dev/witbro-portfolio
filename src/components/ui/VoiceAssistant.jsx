import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const Icon = {
  Mic: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" y1="19" x2="12" y2="22"/></svg>,
  VolumeOn: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>,
  VolumeOff: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>,
  X: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  Send: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
  User: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Zap: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Code: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Mail: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Briefcase: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
  MapPin: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Spin: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>,
};

// ─── Knowledge base ───────────────────────────────────────────────────────────
const KB = {
  personal: { name: "Witness Fabrice", email: "witnessfabrice@gmail.com", phone: "+250 783568337", location: "Kirehe, Rwanda" },
  projects: [
    { name: "Market-Kigali", impact: "500+ users", tech: "React · Node.js · Stripe" },
    { name: "KATSS Platform", impact: "1000+ students", tech: "React · Express · MongoDB" },
    { name: "Rwanda Explorer", impact: "4.8★ rating", tech: "Three.js · WebGL" },
    { name: "PSSMS", impact: "200+ slots managed", tech: "Vue · Python · IoT" },
  ],
  skills: { frontend: ["React", "Next.js", "Vue", "Three.js"], backend: ["Node.js", "Python", "GraphQL"], infra: ["Docker", "AWS", "PostgreSQL"] }
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
  greeting:  () => `Witbri AI initialized. I'm your guide to Witness Fabrice's work — ask me anything about his skills, projects, or how to reach him.`,
  skills:    () => `Tech matrix: Frontend — ${KB.skills.frontend.join(', ')}. Backend — ${KB.skills.backend.join(', ')}. Infrastructure — ${KB.skills.infra.join(', ')}. What would you like to explore?`,
  projects:  () => `${KB.projects.length} projects in the vault. Highlights: ${KB.projects.map(p => `${p.name} (${p.impact})`).join('; ')}. Which one interests you?`,
  contact:   () => `Direct line: ${KB.personal.phone}. Email: ${KB.personal.email}. Based in ${KB.personal.location}. Ready to connect.`,
  location:  () => `Witness is based in ${KB.personal.location}, building world-class solutions from East Africa.`,
  education: () => `Graduated with distinction from Kirehe Technical Secondary School (KATSS) — Best Tech Project & Leadership Excellence awards.`,
  default:   (q) => `I can help you explore skills, projects, or contact info. What would you like to know about Witness Fabrice?`,
};

const QUICK = [
  { icon: 'User',      label: 'About',      cmd: 'who is witness fabrice',   scroll: null },
  { icon: 'Zap',       label: 'Projects',   cmd: 'show projects',            scroll: 'projects' },
  { icon: 'Code',      label: 'Stack',      cmd: 'what technologies',        scroll: 'skills' },
  { icon: 'Mail',      label: 'Contact',    cmd: 'how to contact',           scroll: 'contact' },
  { icon: 'Briefcase', label: 'Experience', cmd: 'work experience',          scroll: null },
  { icon: 'MapPin',    label: 'Location',   cmd: 'where is witness',         scroll: null },
];

// ─── Waveform bars ────────────────────────────────────────────────────────────
const Waveform = ({ active, color = '#3b82f6' }) => {
  const bars = 28;
  return (
    <div className="flex items-center justify-center gap-[2px] h-8">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full"
          style={{ background: color, opacity: active ? 1 : 0.2 }}
          animate={active ? {
            scaleY: [0.2, Math.random() * 0.8 + 0.4, 0.2],
            opacity: [0.4, 1, 0.4],
          } : { scaleY: 0.15 }}
          transition={active ? {
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            delay: (i / bars) * 0.3,
            ease: 'easeInOut',
          } : { duration: 0.3 }}
          style={{ height: 28, background: color }}
        />
      ))}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function VoiceAssistant({ autoOpen = true, onClose }) {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [muted, setMuted] = useState(false);
  const [history, setHistory] = useState([]);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);
  const typingRef = useRef(null);

  // ── Typewriter ──────────────────────────────────────────────────────────────
  const typewrite = useCallback((str) => {
    clearInterval(typingRef.current);
    setText('');
    let i = 0;
    typingRef.current = setInterval(() => {
      if (i <= str.length) { setText(str.slice(0, i++)); }
      else clearInterval(typingRef.current);
    }, 18);
  }, []);

  // ── TTS ─────────────────────────────────────────────────────────────────────
  const speak = useCallback((str) => {
    typewrite(str);
    if (muted || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(str);
    const voices = window.speechSynthesis.getVoices();
    const v = voices.find(v => v.name.includes('Samantha') || v.name.includes('Google US English'));
    if (v) utt.voice = v;
    utt.rate = 1.05; utt.pitch = 1.0;
    utt.onstart = () => setSpeaking(true);
    utt.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utt);
  }, [muted, typewrite]);

  // ── Command processor ───────────────────────────────────────────────────────
  const process = useCallback((q) => {
    const lower = q.toLowerCase().trim();
    setProcessing(true);
    setInput('');

    let route = 'default';
    let best = 0;
    Object.entries(ROUTES).forEach(([r, kws]) => {
      const score = kws.reduce((a, kw) => a + (lower.includes(kw) ? kw.length : 0), 0);
      if (score > best) { best = score; route = r; }
    });

    const response = (RESPONSES[route] || RESPONSES.default)(q);
    setHistory(h => [...h.slice(-6), { q, a: response }]);

    const scrollTarget = QUICK.find(a => a.cmd === q)?.scroll;
    if (scrollTarget) document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => { speak(response); setProcessing(false); }, 300);
  }, [speak]);

  // ── Voice recognition ───────────────────────────────────────────────────────
  const toggleListen = useCallback(() => {
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { speak("Voice input isn't supported in this browser. Try typing instead."); return; }
    const rec = new SR();
    rec.lang = 'en-US'; rec.continuous = false; rec.interimResults = true;
    rec.onstart = () => { setListening(true); typewrite('Listening…'); };
    rec.onresult = (e) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join('');
      setInput(t);
      if (e.results[e.results.length - 1].isFinal) process(t);
    };
    rec.onerror = () => { setListening(false); };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
  }, [listening, process, speak, typewrite]);

  // ── Welcome ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!autoOpen) return;
    const h = new Date().getHours();
    const greet = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
    const t = setTimeout(() => speak(`${greet}! Witbri AI online. Ask me about Witness Fabrice's work, skills, or how to get in touch.`), 700);
    return () => clearTimeout(t);
  }, [autoOpen, speak]);

  // ── Keyboard ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') onClose?.();
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') { e.preventDefault(); setMuted(m => !m); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  useEffect(() => () => clearInterval(typingRef.current), []);

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {autoOpen && (
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="fixed bottom-6 right-6 z-[999] w-[420px] max-w-[calc(100vw-2rem)]"
          style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
        >
          {/* Ambient glow */}
          <div className="absolute -inset-4 rounded-[2.5rem] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 60% 80%, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />

          {/* Shell */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #0b1120 0%, #060c1a 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset',
            }}
          >
            {/* Top accent line */}
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.6) 40%, rgba(139,92,246,0.4) 70%, transparent 100%)' }} />

            <div className="p-5">
              {/* ── Header ── */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative w-9 h-9 flex-shrink-0">
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{ background: 'radial-gradient(circle, #3b82f6, #8b5cf6)', filter: 'blur(6px)' }}
                    />
                    <div className="relative w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #1e3a8a, #4c1d95)', border: '1px solid rgba(255,255,255,0.12)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08A3 3 0 0 1 3 14.5a3.5 3.5 0 0 1 6.5-1.5"/>
                        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08A3 3 0 0 0 21 14.5a3.5 3.5 0 0 0-6.5-1.5"/>
                      </svg>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-white tracking-tight">Witbri AI</span>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)' }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" style={{ boxShadow: '0 0 4px #60a5fa' }} />
                        <span className="text-[9px] text-blue-400 tracking-widest">ONLINE</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 tracking-wider mt-0.5">Neural OS v4 · Portfolio Guide</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button onClick={() => setMuted(m => !m)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-white/8 text-slate-500 hover:text-slate-300"
                    title="Toggle mute (⌘M)">
                    {muted
                      ? <Icon.VolumeOff width={14} height={14} />
                      : <Icon.VolumeOn  width={14} height={14} />}
                  </button>
                  <button onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-red-500/15 text-slate-500 hover:text-red-400">
                    <Icon.X width={14} height={14} />
                  </button>
                </div>
              </div>

              {/* ── Display ── */}
              <div className="relative rounded-2xl p-4 mb-4 min-h-[96px]"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                {/* waveform */}
                <div className="mb-3">
                  <Waveform active={speaking || listening} color={listening ? '#ef4444' : '#3b82f6'} />
                </div>

                {/* text output */}
                <p className="text-[12px] text-slate-300 leading-relaxed min-h-[1.5rem]">
                  {processing ? (
                    <span className="text-blue-400 animate-pulse">Processing…</span>
                  ) : (
                    <>
                      {text}
                      {text && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="inline-block w-[7px] h-[13px] ml-0.5 align-middle"
                          style={{ background: '#3b82f6', borderRadius: 1 }}
                        />
                      )}
                    </>
                  )}
                </p>
              </div>

              {/* ── Conversation history (last 2 exchanges) ── */}
              {history.length > 0 && (
                <div className="mb-3 space-y-1.5 max-h-24 overflow-y-auto pr-1"
                  style={{ scrollbarWidth: 'none' }}>
                  {history.slice(-2).map((h, i) => (
                    <div key={i} className="text-[10px] text-slate-600 leading-relaxed">
                      <span className="text-blue-500/60">you › </span>
                      <span>{h.q.length > 50 ? h.q.slice(0, 50) + '…' : h.q}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Input ── */}
              <div className="relative mb-4">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && input.trim()) process(input.trim()); }}
                  placeholder="Ask anything about Witness…"
                  className="w-full text-[12px] text-white placeholder:text-slate-600 rounded-xl px-4 py-3 pr-[4.5rem] transition-all focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    caretColor: '#3b82f6',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />

                {/* Mic button */}
                <motion.button
                  onClick={toggleListen}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
                  style={{
                    background: listening
                      ? 'linear-gradient(135deg, #dc2626, #ef4444)'
                      : 'linear-gradient(135deg, #1d4ed8, #4f46e5)',
                    color: 'white',
                    boxShadow: listening ? '0 0 16px rgba(239,68,68,0.4)' : '0 0 12px rgba(59,130,246,0.25)',
                  }}
                >
                  <Icon.Mic width={12} height={12} />
                  {input.trim()
                    ? <Icon.Send width={12} height={12} onClick={e => { e.stopPropagation(); if (input.trim()) process(input.trim()); }} />
                    : null}
                </motion.button>
              </div>

              {/* ── Quick actions ── */}
              <div className="grid grid-cols-3 gap-2">
                {QUICK.map((a, i) => {
                  const Ic = Icon[a.icon] || Icon.Zap;
                  return (
                    <motion.button
                      key={a.label}
                      onClick={() => process(a.cmd)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all cursor-pointer"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.08)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                    >
                      <Ic width={15} height={15} style={{ color: '#60a5fa' }} />
                      <span className="text-[10px] text-slate-400 font-medium tracking-wide">{a.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="flex items-center justify-between px-5 py-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(0,0,0,0.2)' }}>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ background: listening ? '#ef4444' : speaking ? '#3b82f6' : '#22c55e' }}
                />
                <span className="text-[9px] text-slate-600 tracking-widest uppercase">
                  {listening ? 'Listening' : speaking ? 'Speaking' : 'Ready'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[9px] text-slate-700">
                <span>Enter to send</span>
                <span>⌘M mute</span>
                <span>Esc close</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
