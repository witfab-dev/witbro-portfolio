import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import { profile, socials, whatsappUrl } from '../data/portfolio';
import { useI18n } from '../i18n/LanguageContext';
import usePageTitle from '../hooks/usePageTitle';

const WEB3FORMS_ACCESS_KEY = '46173eb0-d5ff-41b1-ae8e-81adb5d5b012';

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  'X / Twitter': ArrowUpRight,
  Instagram: ArrowUpRight,
  Email: Mail,
};

const emptyForm = { name: '', email: '', subject: '', message: '' };

function validate(values, messages) {
  const errors = {};
  if (!values.name.trim() || values.name.trim().length < 2) errors.name = messages.name;
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(values.email.trim())) errors.email = messages.email;
  if (!values.subject.trim() || values.subject.trim().length < 3) errors.subject = messages.subject;
  if (!values.message.trim() || values.message.trim().length < 10) errors.message = messages.message;
  return errors;
}

export default function ContactPage() {
  usePageTitle('contact');
  const { content } = useI18n();
  const c = content.contactPage;

  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const nextErrors = validate(values, c.validation);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      setFeedback(c.fixFields);
      return;
    }

    if (honeypot) {
      setStatus('success');
      setFeedback(c.success);
      return;
    }

    setStatus('submitting');
    setFeedback('');

    try {
      const payload = new FormData();
      payload.append('access_key', WEB3FORMS_ACCESS_KEY);
      payload.append('name', values.name.trim());
      payload.append('email', values.email.trim());
      payload.append('subject', values.subject.trim());
      payload.append('message', values.message.trim());
      payload.append('from_name', 'WIT.FAB Portfolio');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFeedback(c.success);
        setValues(emptyForm);
      } else {
        throw new Error(data?.message || 'Message could not be sent');
      }
    } catch {
      setStatus('error');
      setFeedback(c.failure);
    }
  };

  const fieldError = (field) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1.5 text-[11.5px] text-rose-300">
        {errors[field]}
      </p>
    ) : null;

  return (
    <main className="relative pb-24 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-80 bg-gradient-to-t from-primary/[0.07] to-transparent" />

      <div className="container-wide">
        <Reveal>
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="section-title mt-4">
            {c.titleA} <span className="text-gradient">{c.titleB}</span>
          </h1>
          <p className="section-lead">{c.lead}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            <Reveal>
              <a
                href={`mailto:${profile.email}`}
                className="card group flex items-center gap-4 p-5 transition-colors hover:border-primary/40"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-cyan">
                  <Mail size={17} />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {c.emailLabel}
                  </span>
                  <span className="mt-0.5 block truncate text-[13.5px] font-medium text-ink">
                    {profile.email}
                  </span>
                </span>
                <ArrowUpRight size={15} className="ml-auto shrink-0 text-muted transition-colors group-hover:text-ink" />
              </a>
            </Reveal>

            <Reveal delay={0.04}>
              <a
                href={whatsappUrl(content.common.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex items-center gap-4 p-5 transition-colors hover:border-emerald-400/40"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                  <MessageCircle size={17} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {c.whatsappLabel}
                  </span>
                  <span className="mt-0.5 block text-[13.5px] font-medium text-ink">
                    {profile.phoneDisplay}
                  </span>
                </span>
                <ArrowUpRight size={15} className="ml-auto text-muted transition-colors group-hover:text-ink" />
              </a>
            </Reveal>

            <Reveal delay={0.08}>
              <a
                href={`tel:+${profile.phoneIntl}`}
                className="card group flex items-center gap-4 p-5 transition-colors hover:border-primary/40"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-cyan">
                  <Phone size={17} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {c.phoneLabel}
                  </span>
                  <span className="mt-0.5 block text-[13.5px] font-medium text-ink">
                    +250 {profile.phoneDisplay}
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="card flex items-center gap-4 p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-cyan">
                  <MapPin size={17} />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {c.locationLabel}
                  </p>
                  <p className="mt-0.5 text-[13.5px] font-medium text-ink">{profile.location}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="card p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {c.findOnline}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {socials
                    .filter((social) => !social.href.startsWith('mailto'))
                    .map((social) => {
                      const Icon = socialIcons[social.label] || ArrowUpRight;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg border border-line/70 bg-surface/60 px-3 py-2 text-[12px] text-muted transition-colors hover:border-primary/40 hover:text-ink"
                        >
                          <Icon size={14} />
                          {social.label}
                        </a>
                      );
                    })}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div className="card h-full p-6 sm:p-8">
              <h2 className="font-display text-lg font-semibold text-ink">{c.formTitle}</h2>
              <form onSubmit={onSubmit} noValidate className="mt-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="field-label">
                      {c.fullName}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={onChange}
                      placeholder={c.namePlaceholder}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`field ${errors.name ? 'border-rose-400/70' : ''}`}
                    />
                    {fieldError('name')}
                  </div>

                  <div>
                    <label htmlFor="email" className="field-label">
                      {c.email}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={onChange}
                      placeholder={c.emailPlaceholder}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`field ${errors.email ? 'border-rose-400/70' : ''}`}
                    />
                    {fieldError('email')}
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="subject" className="field-label">
                    {c.subject}
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={values.subject}
                    onChange={onChange}
                    placeholder={c.subjectPlaceholder}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    className={`field ${errors.subject ? 'border-rose-400/70' : ''}`}
                  />
                  {fieldError('subject')}
                </div>

                <div className="mt-4">
                  <label htmlFor="message" className="field-label">
                    {c.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={values.message}
                    onChange={onChange}
                    placeholder={c.messagePlaceholder}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`field resize-y ${errors.message ? 'border-rose-400/70' : ''}`}
                  />
                  {fieldError('message')}
                </div>

                <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="botcheck">Leave this field empty</label>
                  <input
                    id="botcheck"
                    name="botcheck"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                  />
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> {c.sending}
                      </>
                    ) : (
                      <>
                        {content.common.send} <Send size={15} />
                      </>
                    )}
                  </button>
                  <p className="text-[11.5px] leading-relaxed text-muted">{c.privacy}</p>
                </div>

                <div aria-live="polite" role="status">
                  {status === 'success' && (
                    <p className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-[12.5px] text-emerald-200">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                      {feedback}
                    </p>
                  )}
                  {status === 'error' && feedback && (
                    <p className="mt-4 flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-[12.5px] text-rose-200">
                      <AlertCircle size={15} className="mt-0.5 shrink-0" />
                      {feedback}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
