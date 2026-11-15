import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/LanguageContext';

export default function NotFoundPage() {
  const { content } = useI18n();

  return (
    <main className="container-wide flex min-h-[70svh] flex-col items-center justify-center py-32 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
        {content.common.notFoundTitle}
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{content.common.notFoundText}</p>
      <Link to="/" className="btn-primary mt-7">
        <ArrowLeft size={16} /> {content.common.backHome}
      </Link>
    </main>
  );
}
