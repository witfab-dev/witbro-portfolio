import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { navItems, profile, socials } from '../../data/portfolio';
import { useI18n } from '../../i18n/LanguageContext';

export default function Footer() {
  const { content } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line/70 bg-surface/40">
      <div className="container-wide py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-[15px] font-semibold tracking-[0.16em] text-ink">
              {profile.brand}
            </p>
            <p className="mt-1.5 text-[11.5px] text-muted">
              {profile.name} · <span className="font-mono text-cyan">{profile.nickname}</span>
            </p>
            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-muted">
              {content.footer.tagline}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-blue-200 transition-colors hover:text-white"
            >
              {profile.email}
              <ArrowUpRight size={13} />
            </a>
          </div>

          <nav aria-label={content.footer.sections}>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              {content.footer.sections}
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className="text-[12.5px] text-muted transition-colors hover:text-ink"
                  >
                    {content.nav[item.id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              {content.footer.elsewhere}
            </p>
            <ul className="mt-3 space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="inline-flex items-center gap-1.5 text-[12.5px] text-muted transition-colors hover:text-ink"
                  >
                    {s.label}
                    <ArrowUpRight size={11} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] text-muted">
            © {year} {profile.name}. {content.footer.rights}
          </p>
          <p className="font-mono text-[10px] text-muted">{content.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
