import React from 'react';
import { ArrowUpRight, Bot, BrainCircuit, Code2, FolderKanban, Mail, Sparkles, Wrench } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { assistantSuggestions } from '../../data/portfolio';

const capabilities = [
  {
    icon: FolderKanban,
    title: 'Project explorer',
    text: 'What each project does, the problem behind it, the approach and the technologies used.',
  },
  {
    icon: Code2,
    title: 'Technical skills',
    text: 'The languages, frameworks, databases and tools listed in the skills section.',
  },
  {
    icon: Wrench,
    title: 'Services',
    text: 'The development services actually offered, and what a project with me looks like.',
  },
  {
    icon: Mail,
    title: 'Contact support',
    text: 'How to get in touch by email or WhatsApp, and what to include in a first message.',
  },
];

export default function Assistant({ onAsk }) {
  return (
    <section id="assistant" className="section">
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow">AI Assistant</p>
            <h2 className="section-title mt-4">
              Meet <span className="text-gradient">WIT.FAB AI.</span>
            </h2>
            <p className="section-lead">
              An assistant built into this portfolio. Ask it about Witness Fabrice&apos;s
              background, projects, technical skills or how to get in touch — it answers from the
              information published on this page.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => onAsk(null)} className="btn-primary">
                <Bot size={17} /> Open the assistant
              </button>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary"
              >
                Contact directly <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="mt-8 rounded-xl border border-line/70 bg-surface/50 p-4">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
                <BrainCircuit size={13} /> How it works
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                Requests are sent to a secure server endpoint, which calls the AI service with a
                server-side key. No API key is exposed in the browser. The assistant is instructed
                to use only the verified information on this portfolio, and to say so when a
                question falls outside it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card overflow-hidden">
              <div className="flex items-center gap-3 border-b border-line/70 bg-card/70 px-5 py-4">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-cyan text-white">
                  <Bot size={17} />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-ink">WIT.FAB AI</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-300">
                    Online
                  </p>
                </div>
                <Sparkles size={15} className="ml-auto text-cyan" />
              </div>

              <div className="space-y-4 p-5">
                <p className="text-[13px] leading-relaxed text-slate-300">
                  I can help you explore the projects, technical skills, professional background and
                  development capabilities on this portfolio. What would you like to discover?
                </p>

                <div className="grid gap-2 sm:grid-cols-2">
                  {capabilities.map((c) => (
                    <div key={c.title} className="rounded-xl border border-line/70 bg-surface/50 p-3">
                      <c.icon size={14} className="text-cyan" />
                      <p className="mt-2 text-[12px] font-semibold text-ink">{c.title}</p>
                      <p className="mt-1 text-[11px] leading-snug text-muted">{c.text}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">
                    Try asking
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {assistantSuggestions.slice(0, 4).map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => onAsk(q)}
                        className="rounded-full border border-line bg-card/70 px-2.5 py-1.5 text-left text-[10.5px] text-muted transition-colors hover:border-primary/50 hover:text-ink"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
