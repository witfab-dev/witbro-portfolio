import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, Volume2, VolumeX, X, Send,
  User, Code2, Mail, MapPin, Bot,
  RotateCcw, Sparkles, GraduationCap,
} from "lucide-react";

// ─── System Prompt ─────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Witbri AI, an intelligent, warm, and professional voice assistant embedded in Witness Fabrice's personal developer portfolio. Your purpose is to help visitors learn about Witness and potentially hire or collaborate with him.

You have deep knowledge of Witness Fabrice:

PERSONAL:
- Full name: Witness Fabrice
- Email: witnessfabrice@gmail.com
- Phone: +250 783 568 337
- Location: Kigali, Rwanda
- GitHub: github.com/witfab-dev
- LinkedIn: linkedin.com/in/witness-fabrice

EDUCATION:
- Graduated with distinction from Kirehe Adventist TVET School (KATSS)
- Awards: Best Tech Project & Leadership Excellence
- Focus: Software Engineering & Web Technologies

SKILLS:
- Frontend: React, Next.js, Vue.js, Three.js, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, Python, Django, GraphQL, REST APIs
- Databases: PostgreSQL, MongoDB, MySQL, Redis
- Infrastructure: Docker, AWS, Vercel, Nginx, CI/CD pipelines
- Other: IoT integration, WebGL, WebSockets, PWA development

PROJECTS:
1. Market-Kigali — E-commerce platform for local Kigali vendors. 500+ active users. Stack: React, Node.js, Stripe, PostgreSQL. Features: real-time inventory, vendor dashboard, mobile-first.
2. KATSS Platform — Academic management system. 1000+ students managed. Stack: React, Express.js, MongoDB. Features: grade tracking, attendance, parent portal, notifications.
3. Rwanda Explorer — Immersive 3D tourism experience. 4.8 star app store rating. Stack: Three.js, WebGL, React. Features: 360 degree virtual tours, interactive maps, cultural content.
4. PSSMS — Parking and Slot Management System. 200+ slots managed. Stack: Vue.js, Python, IoT sensors. Features: real-time availability, automated billing, sensor integration.

PERSONALITY & AVAILABILITY:
- Passionate about building impactful tech solutions for Africa
- Detail-oriented, ships high-quality code with strong eye for UX
- Collaborative, fast learner, thrives in cross-functional teams
- Open to freelance, full-time remote positions, and relocation

RESPONSE RULES:
- Be warm, conversational, and thorough — like a knowledgeable colleague
- Give complete, helpful answers. Don't truncate.
- Use natural flowing prose, no markdown symbols, no bullet dashes
- Vary phrasing — never repeat the same sentence structure twice
- For hiring questions, enthusiastically direct to witnessfabrice@gmail.com
- If asked something outside your knowledge of Witness, be honest and redirect warmly
- Responses should sound great when read aloud`;

// ─── Quick Actions ──────────────────────────────────────────────
const QUICK_ACTIONS = [
  { icon: User,          label: "About",     cmd: "Tell me about Witness Fabrice",                        color: "#60a5fa" },
  { icon: Sparkles,      label: "Projects",  cmd: "What projects has Witness built?",                     color: "#fbbf24" },
  { icon: Code2,         label: "Skills",    cmd: "What technologies does Witness specialize in?",         color: "#34d399" },
  { icon: Mail,          label: "Hire",      cmd: "How can I hire or collaborate with Witness?",           color: "#fb7185" },
  { icon: GraduationCap, label: "Education", cmd: "Tell me about his education and achievements",          color: "#a78bfa" },
  { icon: MapPin,        label: "Location",  cmd: "Where is Witness based and is he open to relocation?",  color: "#22d3ee" },
];

// ─── Waveform ───────────────────────────────────────────────────
const BAR_COUNT = 34;
const BAR_SHAPE = Array.from({ length: BAR_COUNT }, (_, i) => {
  const t = i / (BAR_COUNT - 1);
  return 0.07 + 0.86 * Math.sin(t * Math.PI) * (0.65 + 0.35 * Math.sin(t * Math.PI * 2.8));
});

function Waveform({ active, color, volume = 0.5 }) {
  return (
    <div className="flex items-end justify-center" style={{ height: 34, gap: 2.5, flex: 1 }}>
      {BAR_SHAPE.map((base, i) => (
        <motion.div
          key={i}
          style={{ width: 2.5, height: 34, background: color, borderRadius: 99 }}
          className="origin-bottom"
          animate={
            active
              ? { scaleY: [base * 0.18, base * (0.5 + volume * 1.15), base * 0.18], opacity: [0.28, 1, 0.28] }
              : { scaleY: 0.05, opacity: 0.13 }
          }
          transition={
            active
              ? { duration: 0.26 + (i % 6) * 0.052, repeat: Infinity, delay: (i / BAR_COUNT) * 0.3, ease: "easeInOut" }
              : { duration: 0.5 }
          }
        />
      ))}
    </div>
  );
}

// ─── Thinking animation ─────────────────────────────────────────
function ThinkingDots() {
  return (
    <div className="flex items-center gap-1.5 px-3.5 py-3">
      {[0, 0.2, 0.4].map((d, i) => (
        <motion.span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#f97316", display: "block" }}
          animate={{ opacity: [0.18, 1, 0.18], scale: [0.65, 1.25, 0.65], y: [0, -5, 0] }}
          transition={{ duration: 0.76, repeat: Infinity, delay: d, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── Blinking cursor ────────────────────────────────────────────
function Cursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.52, repeat: Infinity }}
      style={{ display: "inline-block", width: 4, height: 12, marginLeft: 2, verticalAlign: "middle", borderRadius: 2, background: "#f97316" }}
    />
  );
}

// ─── Main Component ─────────────────────────────────────────────
export default function VoiceAssistant({ autoOpen = true, onClose }) {
  const [input,     setInput]     = useState("");
  const [messages,  setMessages]  = useState([]);
  const [listening, setListening] = useState(false);
  const [speaking,  setSpeaking]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [muted,     setMuted]     = useState(false);
  const [volume,    setVolume]    = useState(0.5);
  const [error,     setError]     = useState(null);
  const [quicksHidden, setQuicksHidden] = useState(false);

  const inputRef      = useRef(null);
  const scrollRef     = useRef(null);
  const volTimerRef   = useRef(null);
  const historyRef    = useRef([]);
  const hasGreetedRef = useRef(false);
  const recRef        = useRef(null);

  // auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // TTS
  const speak = useCallback((text) => {
    if (muted || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/[*_`#•]/g, "").replace(/\n+/g, " ").trim();
    const utt = new SpeechSynthesisUtterance(clean);
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const pref = ["Google UK English Female", "Samantha", "Microsoft Aria", "Karen", "Moira", "Google US English"];
      for (const p of pref) {
        const v = voices.find(v => v.name.startsWith(p.split(" ")[0]));
        if (v) { utt.voice = v; break; }
      }
    };
    pickVoice();
    if (!utt.voice) window.speechSynthesis.onvoiceschanged = pickVoice;
    utt.rate = 0.97; utt.pitch = 1.04; utt.volume = 1;
    utt.onstart = () => { setSpeaking(true); clearInterval(volTimerRef.current); volTimerRef.current = setInterval(() => setVolume(0.2 + Math.random() * 0.8), 115); };
    utt.onend   = () => { setSpeaking(false); setVolume(0.5); clearInterval(volTimerRef.current); };
    utt.onerror = () => { setSpeaking(false); clearInterval(volTimerRef.current); };
    window.speechSynthesis.speak(utt);
  }, [muted]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false); setVolume(0.5); clearInterval(volTimerRef.current);
  }, []);

  // Claude API call (built-in, no external key needed)
  const callClaude = useCallback(async (userText) => {
    historyRef.current.push({ role: "user", content: userText });
    if (historyRef.current.length > 30) historyRef.current = historyRef.current.slice(-28);

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: historyRef.current,
      }),
    });

    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const text = data.content.filter(b => b.type === "text").map(b => b.text).join("").trim();
    historyRef.current.push({ role: "assistant", content: text });
    return text;
  }, []);

  // push/update message
  const pushMsg = useCallback((id, role, text, done = true) => {
    setMessages(prev => {
      const idx = prev.findIndex(m => m.id === id);
      if (idx !== -1) return prev.map(m => m.id === id ? { ...m, text, done } : m);
      return [...prev, { id, role, text, done }];
    });
  }, []);

  // typewriter reveal
  const typewriter = useCallback((id, full, onDone) => {
    let i = 0;
    const tick = setInterval(() => {
      i += 4;
      if (i >= full.length) { clearInterval(tick); pushMsg(id, "ai", full, true); onDone?.(); }
      else pushMsg(id, "ai", full.slice(0, i), false);
    }, 11);
    return tick;
  }, [pushMsg]);

  // process
  const process = useCallback(async (query) => {
    const q = query.trim();
    if (!q || loading) return;
    setInput(""); setError(null); setLoading(true); setQuicksHidden(true); stopSpeaking();
    const uid = `u-${Date.now()}`;
    const aid = `a-${Date.now() + 1}`;
    pushMsg(uid, "user", q);
    try {
      const reply = await callClaude(q);
      pushMsg(aid, "ai", "", false);
      typewriter(aid, reply, () => speak(reply));
    } catch (err) {
      const fb = "I hit a small snag. Please try again in a moment!";
      pushMsg(aid, "ai", fb, true); setError(err.message); speak(fb);
    } finally {
      setLoading(false);
    }
  }, [loading, callClaude, pushMsg, typewriter, speak, stopSpeaking]);

  // voice
  const toggleListen = useCallback(() => {
    if (listening) { recRef.current?.stop(); setListening(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { process("Voice input isn't supported here — please type your question."); return; }
    stopSpeaking();
    const rec = new SR();
    rec.lang = "en-US"; rec.continuous = false; rec.interimResults = true;
    rec.onstart  = () => setListening(true);
    rec.onresult = (e) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join("");
      setInput(t);
      if (e.results[e.results.length - 1].isFinal) { setListening(false); process(t); }
    };
    rec.onerror = () => setListening(false);
    rec.onend   = () => setListening(false);
    recRef.current = rec; rec.start();
  }, [listening, process, stopSpeaking]);

  // clear
  const clearChat = useCallback(() => {
    setMessages([]); historyRef.current = []; hasGreetedRef.current = false;
    setLoading(false); setError(null); setQuicksHidden(false); stopSpeaking();
  }, [stopSpeaking]);

  // greeting
  useEffect(() => {
    if (!autoOpen || hasGreetedRef.current) return;
    hasGreetedRef.current = true;
    const h = new Date().getHours();
    const g = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
    const id = `w-${Date.now()}`;
    const msg = `${g}! I'm Witbri AI, Witness Fabrice's personal assistant powered by Claude. I can answer any question about his skills, projects, background, or how to work with him. What would you like to know?`;
    const t = setTimeout(() => { pushMsg(id, "ai", msg, true); speak(msg); }, 650);
    return () => clearTimeout(t);
  }, [autoOpen, pushMsg, speak]);

  // keyboard shortcuts
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose?.();
      if ((e.ctrlKey || e.metaKey) && e.key === "m") { e.preventDefault(); setMuted(m => !m); if (speaking) stopSpeaking(); }
      if ((e.ctrlKey || e.metaKey) && e.key === "l") { e.preventDefault(); clearChat(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, clearChat, speaking, stopSpeaking]);

  useEffect(() => () => { clearInterval(volTimerRef.current); window.speechSynthesis?.cancel(); }, []);

  const statusColor = listening ? "#ef4444" : speaking ? "#f97316" : loading ? "#a78bfa" : "#22c55e";
  const statusLabel = listening ? "Listening…" : speaking ? "Speaking" : loading ? "Thinking…" : "Ready";
  const showQuicks  = !quicksHidden && messages.length <= 1;

  return (
    <AnimatePresence>
      {autoOpen && (
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.9 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{   opacity: 0, y: 24,  scale: 0.93 }}
          transition={{ type: "spring", stiffness: 310, damping: 27 }}
          style={{ position: "fixed", bottom: 88, right: 16, zIndex: 998, width: 436, maxWidth: "calc(100vw - 1.5rem)" }}
        >
          {/* Ambient glow */}
          <motion.div
            style={{ pointerEvents: "none", position: "absolute", inset: -48, borderRadius: "3.5rem",
              background: "radial-gradient(ellipse at 50% 68%, rgba(249,115,22,0.13) 0%, transparent 62%)" }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1.03, 0.95] }}
            transition={{ duration: 5.5, repeat: Infinity }}
          />

          {/* Shell */}
          <div style={{
            position: "relative", borderRadius: 26, overflow: "hidden",
            background: "linear-gradient(168deg, #1a1714 0%, #0f0d0b 52%, #090807 100%)",
            border: "1px solid rgba(255,255,255,0.062)",
            boxShadow: "0 36px 80px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.055), 0 0 0 1px rgba(249,115,22,0.08)",
          }}>

            {/* Top line */}
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent 6%, rgba(249,115,22,0.62) 48%, transparent 94%)" }} />

            {/* ── Header ── */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px 12px", borderBottom: "1px solid rgba(255,255,255,0.045)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Avatar */}
                <div style={{ position: "relative", width: 40, height: 40, flexShrink: 0 }}>
                  <motion.div style={{ position: "absolute", inset: 0, borderRadius: 14, background: "rgba(249,115,22,0.42)", filter: "blur(10px)" }}
                    animate={{ opacity: [0.18, 0.6, 0.18], scale: [0.8, 1.16, 0.8] }}
                    transition={{ duration: 2.9, repeat: Infinity }} />
                  <div style={{ position: "relative", width: 40, height: 40, borderRadius: 14, background: "linear-gradient(138deg, #fb923c 0%, #ea580c 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Bot size={17} color="white" strokeWidth={2.2} />
                  </div>
                  <motion.span style={{ position: "absolute", top: -2, right: -2, width: 12, height: 12, borderRadius: "50%", background: statusColor, border: "2.5px solid #0f0d0b", transition: "background 0.35s" }}
                    animate={{ scale: [1, 1.35, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 900, color: "white", letterSpacing: "-0.03em" }}>Witbri AI</span>
                    <span style={{ padding: "2px 6px", borderRadius: 6, fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", background: "rgba(249,115,22,0.13)", color: "#f97316", border: "1px solid rgba(249,115,22,0.22)" }}>
                      Powered by Claude
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                    <motion.span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor, transition: "background 0.3s" }}
                      animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.3, repeat: Infinity }} />
                    <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, color: "rgba(255,255,255,0.26)" }}>{statusLabel}</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div style={{ display: "flex", gap: 4 }}>
                {[
                  { Ic: RotateCcw,               fn: clearChat,                              title: "Clear (⌘L)",  hc: "#f97316" },
                  { Ic: muted ? VolumeX : Volume2, fn: () => { setMuted(m => !m); if (speaking) stopSpeaking(); }, title: "Mute (⌘M)",   hc: "#f97316", active: muted },
                  { Ic: X,                        fn: onClose,                               title: "Close (Esc)", hc: "#ef4444" },
                ].map(({ Ic, fn, title, hc, active }, i) => (
                  <button key={i} onClick={fn} title={title}
                    style={{ width: 32, height: 32, border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: active ? hc : "rgba(255,255,255,0.24)", transition: "all 0.18s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = hc; e.currentTarget.style.borderColor = hc + "44"; e.currentTarget.style.background = hc + "12"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = active ? hc : "rgba(255,255,255,0.24)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "transparent"; }}>
                    <Ic size={13} strokeWidth={2.3} />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Waveform ── */}
            <div style={{ padding: "12px 16px 8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderRadius: 14, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.048)" }}>
                <Waveform active={speaking || listening} color={listening ? "#ef4444" : "#f97316"} volume={volume} />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", flexShrink: 0, minWidth: 52 }}>
                  <span style={{ fontSize: 8, textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 700, color: "rgba(255,255,255,0.18)" }}>
                    {listening ? "Mic In" : speaking ? "Output" : "Idle"}
                  </span>
                  {speaking && (
                    <button onClick={stopSpeaking} style={{ fontSize: 9, fontWeight: 700, color: "#f97316", background: "none", border: "none", cursor: "pointer", marginTop: 4, padding: 0 }}>
                      Stop ▪
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── Quick actions ── */}
            <AnimatePresence>
              {showQuicks && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: "hidden", padding: "0 16px 8px" }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {QUICK_ACTIONS.map(({ icon: Ic, label, cmd, color }) => (
                      <button key={label} onClick={() => process(cmd)}
                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 12, fontSize: 10.5, fontWeight: 600, cursor: "pointer", background: "rgba(255,255,255,0.038)", border: "1px solid rgba(255,255,255,0.075)", color: "rgba(255,255,255,0.48)", transition: "all 0.18s" }}
                        onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color + "44"; e.currentTarget.style.background = color + "11"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.48)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.075)"; e.currentTarget.style.background = "rgba(255,255,255,0.038)"; }}>
                        <Ic size={10} strokeWidth={2.4} />
                        {label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Messages ── */}
            <div ref={scrollRef} style={{ padding: "4px 16px 4px", maxHeight: 252, overflowY: "auto", scrollbarWidth: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              <AnimatePresence initial={false}>
                {messages.length === 0 && !loading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 0", gap: 12 }}>
                    <motion.div style={{ width: 44, height: 44, borderRadius: 16, background: "rgba(249,115,22,0.09)", border: "1px solid rgba(249,115,22,0.16)", display: "flex", alignItems: "center", justifyContent: "center" }}
                      animate={{ scale: [1, 1.07, 1] }} transition={{ duration: 2.6, repeat: Infinity }}>
                      <Sparkles size={17} color="#f97316" />
                    </motion.div>
                    <p style={{ fontSize: 11.5, textAlign: "center", lineHeight: 1.6, color: "rgba(255,255,255,0.24)", maxWidth: 265 }}>
                      Ask me anything — I'm a real AI with full knowledge of Witness's work, skills, and availability.
                    </p>
                  </motion.div>
                )}

                {messages.map((msg) => (
                  <motion.div key={msg.id}
                    initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.2 }}
                    style={{ display: "flex", gap: 8, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                    <div style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2,
                      ...(msg.role === "ai"
                        ? { background: "rgba(249,115,22,0.11)", border: "1px solid rgba(249,115,22,0.2)" }
                        : { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }) }}>
                      {msg.role === "ai" ? <Bot size={11} color="#f97316" strokeWidth={2.2} /> : <User size={11} color="rgba(255,255,255,0.5)" strokeWidth={2.2} />}
                    </div>
                    <div style={{ maxWidth: "80%", padding: "10px 14px", fontSize: 12, lineHeight: 1.65,
                      ...(msg.role === "user"
                        ? { background: "linear-gradient(135deg, #fb923c 0%, #dc2626 100%)", color: "white", borderRadius: "14px 3px 14px 14px", boxShadow: "0 4px 16px rgba(249,115,22,0.25)" }
                        : { background: "rgba(255,255,255,0.048)", color: "rgba(255,255,255,0.86)", border: "1px solid rgba(255,255,255,0.065)", borderRadius: "3px 14px 14px 14px" }) }}>
                      {msg.text}
                      {msg.role === "ai" && !msg.done && <Cursor />}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", gap: 8 }}>
                  <div style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 9, background: "rgba(249,115,22,0.11)", border: "1px solid rgba(249,115,22,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Bot size={11} color="#f97316" />
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.048)", border: "1px solid rgba(255,255,255,0.065)", borderRadius: "3px 14px 14px 14px" }}>
                    <ThinkingDots />
                  </div>
                </motion.div>
              )}
            </div>

            {/* ── Error ── */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ margin: "0 16px 6px", padding: "8px 12px", borderRadius: 12, fontSize: 10.5, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "rgba(252,165,165,0.8)" }}>
                  Connection issue — check your network and try again.
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input ── */}
            <div style={{ padding: "6px 16px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey && input.trim()) { e.preventDefault(); process(input); } }}
                  placeholder={listening ? "Listening…" : "Ask anything about Witness…"}
                  disabled={loading}
                  style={{ flex: 1, fontSize: 12, padding: "10px 16px", borderRadius: 13, outline: "none", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.088)", color: "rgba(255,255,255,0.9)", transition: "all 0.2s" }}
                  onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,0.42)"; e.target.style.background = "rgba(255,255,255,0.07)"; }}
                  onBlur={e  => { e.target.style.borderColor = "rgba(255,255,255,0.088)"; e.target.style.background = "rgba(255,255,255,0.05)"; }}
                />

                {/* Mic button */}
                <motion.button onClick={toggleListen} whileTap={{ scale: 0.88 }}
                  style={{ width: 40, height: 40, borderRadius: 13, border: `1px solid ${listening ? "#ef4444" : "rgba(249,115,22,0.3)"}`, background: listening ? "rgba(239,68,68,0.85)" : "rgba(249,115,22,0.16)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                  animate={listening ? { boxShadow: ["0 0 0 0 rgba(239,68,68,0.5)", "0 0 0 10px rgba(239,68,68,0)", "0 0 0 0 rgba(239,68,68,0)"] } : {}}
                  transition={listening ? { duration: 1.5, repeat: Infinity } : {}}>
                  <Mic size={14} color={listening ? "white" : "#f97316"} strokeWidth={2.2} />
                </motion.button>

                {/* Send button */}
                <motion.button onClick={() => process(input)} whileTap={{ scale: 0.88 }}
                  disabled={!input.trim() || loading}
                  style={{ width: 40, height: 40, borderRadius: 13, border: input.trim() && !loading ? "1px solid rgba(249,115,22,0.5)" : "1px solid rgba(255,255,255,0.07)", background: input.trim() && !loading ? "rgba(249,115,22,0.88)" : "rgba(255,255,255,0.055)", cursor: input.trim() && !loading ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: !input.trim() || loading ? 0.4 : 1, transition: "all 0.2s" }}>
                  <Send size={13} color={input.trim() && !loading ? "white" : "rgba(255,255,255,0.35)"} strokeWidth={2.2} />
                </motion.button>
              </div>
              <p style={{ textAlign: "center", fontSize: 9, marginTop: 10, color: "rgba(255,255,255,0.13)" }}>
                Enter to send · ⌘M mute · ⌘L clear
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
