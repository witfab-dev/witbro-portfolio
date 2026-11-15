import React from 'react';
import { Eye, Heart, Lightbulb, MapPin } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { philosophy, profile, services, values } from '../../data/portfolio';

const servicesIcons = ['⌘', '◐', '⇄', '✦', '◎', '↥'];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-wide">
        {/* Heading */}
        <Reveal>
          <p className="eyebrow">About</p>
          <h2 className="section-title mt-4 max-w-3xl">
            Behind the Code — <span className="text-gradient">My Story.</span>
          </h2>
          <p className="section-lead">
            A full-stack developer and software development student based in Kigali, Rwanda,
            focused on building applications that are useful, fast and genuinely finished.
          </p>
        </Reveal>

        {/* Who I am / My story */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <div className="card overflow-hidden">
              <img
                src={profile.portrait}
                alt="Witness Fabrice"
                width="600"
                height="720"
                loading="lazy"
                className="aspect-[5/4] w-full object-cover object-top"
              />
              <div className="p-5">
                <p className="font-display text-lg font-semibold text-ink">{profile.name}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                  Full-Stack Developer
                </p>
                <div className="mt-4 space-y-2 text-[13px] text-muted">
                  <p className="flex items-center gap-2">
                    <MapPin size={14} className="text-cyan" /> {profile.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <Lightbulb size={14} className="text-cyan" /> Level 5 Software Development
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'].map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-12">
            <Reveal>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
                A. Who I am
              </h3>
              <p className="mt-4 text-[15px] leading-[1.85] text-slate-300 sm:text-base">
                I&apos;m Witness Fabrice, a software developer passionate about technology,
                innovation and solving real-world problems. My work sits where logic meets
                interface: the backend that has to be reliable, and the screen that has to make
                sense to the person using it.
              </p>
              <p className="mt-4 text-[15px] leading-[1.85] text-muted sm:text-base">
                I&apos;m drawn to work that has a practical outcome — a school that needs one place
                for its information, a parking operator that needs billing it can trust, a local
                vendor who needs to reach customers online. That is the kind of software I want to
                keep building.
              </p>
            </Reveal>

            <Reveal>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
                B. My story
              </h3>
              <div className="mt-4 space-y-4 text-[15px] leading-[1.85] text-muted sm:text-base">
                <p>
                  My interest in technology started with curiosity about how the things on a screen
                  are actually made. That curiosity turned into learning the fundamentals of the web,
                  and then into building with them rather than only reading about them.
                </p>
                <p>
                  I studied software development through TVET, progressing through web development,
                  JavaScript, databases, backend systems and networking, and I&apos;m currently
                  completing Level 5. Alongside my studies I have worked in development roles at
                  Kirehe Adventist TVET School, moving from junior development to frontend
                  engineering and now to full-stack work.
                </p>
                <p>
                  What motivates me is the moment a solution stops being an idea and starts being
                  used. Building that — and building it properly — is what I want to keep doing as
                  my career develops.
                </p>
              </div>
              <blockquote className="mt-6 border-l-2 border-primary/60 pl-5 font-display text-lg leading-snug text-ink">
                &ldquo;Project archaeology — dig into the root of a problem before writing a single
                line of code.&rdquo;
              </blockquote>
            </Reveal>
          </div>
        </div>

        {/* Philosophy */}
        <div className="mt-24">
          <Reveal>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
              C. My development philosophy
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              These are the principles I try to apply to every project, from a landing page to a
              full-stack system.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {philosophy.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <div className="card group h-full p-5 transition-colors duration-300 hover:border-primary/40">
                  <span className="font-mono text-[10px] text-muted/60">
                    0{i + 1}
                  </span>
                  <h4 className="mt-2 font-display text-base font-semibold text-ink">{p.title}</h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Vision and values */}
        <div className="mt-20 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-cyan/10 p-7 sm:p-9">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
              <Eye size={20} className="text-cyan" aria-hidden="true" />
              <h3 className="mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
                D. My vision
              </h3>
              <p className="mt-4 font-display text-xl leading-snug text-ink sm:text-2xl">
                To become an impactful software developer and build technology products that make a
                real difference.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                I want my work to contribute to the growing technology ecosystem in Rwanda and East
                Africa — software built here, for real problems here, at a standard that stands up
                anywhere.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card h-full p-7 sm:p-9">
              <Heart size={20} className="text-cyan" aria-hidden="true" />
              <h3 className="mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
                E. Personal values
              </h3>
              <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {values.map((v) => (
                  <div key={v.title}>
                    <dt className="text-sm font-semibold text-ink">{v.title}</dt>
                    <dd className="mt-1 text-[12.5px] leading-relaxed text-muted">{v.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        {/* What I do */}
        <div className="mt-20">
          <Reveal>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
              F. What I do
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              The capabilities I bring to a project, using the tools I actually work with.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <div className="card group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface font-display text-sm text-cyan">
                    {servicesIcons[i % servicesIcons.length]}
                  </span>
                  <h4 className="mt-4 font-display text-base font-semibold text-ink">{s.title}</h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.text}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.tech.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
