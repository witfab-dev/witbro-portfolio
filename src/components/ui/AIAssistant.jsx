import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp, Bot, MessageSquarePlus, Sparkles, X } from 'lucide-react';
import { answerQuestion } from '../../lib/localAssistant';
import { useI18n } from '../../i18n/LanguageContext';

export default function AIAssistant({ open, onClose, initialQuestion, onConsumeInitial }) {
  const { content, locale } = useI18n();
  const a = content.assistantPage;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const sendRef = useRef(null);
  const timerRef = useRef(null);
  const handledRef = useRef(null);

  const send = (raw) => {
    const text = raw.trim();
    if (!text || busy) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setBusy(true);

    // Replies are built locally from the portfolio data — nothing is sent over the network.
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: answerQuestion(text, locale) },
      ]);
      setBusy(false);
    }, 420);
  };

  sendRef.current = send;

  useEffect(() => {
    if (!open) return;
    if (initialQuestion && handledRef.current !== initialQuestion) {
      handledRef.current = initialQuestion;
      sendRef.current?.(initialQuestion);
      onConsumeInitial?.();
    }
    const timer = setTimeout(() => inputRef.current?.focus(), 250);
    return () => clearTimeout(timer);
  }, [open, initialQuestion, onConsumeInitial]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy, open]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const reset = () => {
    clearTimeout(timerRef.current);
    setMessages([]);
    setInput('');
    setBusy(false);
    handledRef.current = null;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label={a.panelLabel}
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-24 z-[70] flex h-[min(560px,calc(100svh-8rem))] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] sm:inset-x-auto sm:right-6 sm:h-[min(600px,72vh)] sm:w-[400px]"
        >
          <div className="flex items-center gap-3 border-b border-line/80 bg-card/80 px-4 py-3">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-cyan text-white">
              <Bot size={17} />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-400" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-[13.5px] font-semibold text-ink">WIT.FAB AI</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-cyan">
                {a.online}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <button
                type="button"
                onClick={reset}
                aria-label={a.newChat}
                title={a.newChat}
                className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <MessageSquarePlus size={16} />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label={content.common.closeAssistant}
                className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            <Bubble role="assistant">
              <p className="whitespace-pre-line">{a.welcome}</p>
            </Bubble>

            {messages.length === 0 && (
              <div className="pt-1">
                <p className="mb-2 flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">
                  <Sparkles size={11} className="text-cyan" /> {a.tryAsking}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {a.suggestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => send(question)}
                      className="rounded-full border border-line bg-card/70 px-2.5 py-1.5 text-left text-[11px] text-muted transition-colors hover:border-primary/50 hover:text-ink"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <Bubble key={`${message.role}-${index}`} role={message.role}>
                <p className="whitespace-pre-line">{message.content}</p>
              </Bubble>
            ))}

            {busy && (
              <Bubble role="assistant">
                <span className="flex items-center gap-1.5 py-0.5" aria-label={a.typingLabel}>
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={dot}
                      className="h-1.5 w-1.5 rounded-full bg-cyan/80"
                      animate={reduceMotion ? {} : { opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: dot * 0.15 }}
                    />
                  ))}
                </span>
              </Bubble>
            )}

          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
            className="border-t border-line/80 bg-card/60 p-3"
          >
            <div className="flex items-end gap-2 rounded-xl border border-line bg-night/60 p-2 focus-within:border-primary/60">
              <label htmlFor="assistant-input" className="sr-only">
                {a.inputPlaceholder}
              </label>
              <textarea
                id="assistant-input"
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    send(input);
                  }
                }}
                placeholder={a.inputPlaceholder}
                className="max-h-24 flex-1 resize-none bg-transparent px-1.5 py-2 text-[13px] text-ink placeholder:text-muted/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label={content.common.send}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-white transition-opacity disabled:opacity-40"
              >
                <ArrowUp size={15} />
              </button>
            </div>
            <p className="mt-2 px-1 text-center font-mono text-[9px] text-muted/60">{a.disclaimer}</p>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Bubble({ role, children }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-relaxed ${
          isUser
            ? 'rounded-br-md bg-primary text-white'
            : 'rounded-bl-md border border-line/70 bg-card/80 text-slate-200'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
