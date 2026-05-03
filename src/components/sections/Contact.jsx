import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  Mail, Phone, MapPin, Send, Github, Linkedin,
  Twitter, Instagram, Facebook, Check, Copy, AlertCircle, ArrowUpRight,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const SERVICE_ID  = 'service_r4cj7xg';
const TEMPLATE_ID = 'template_mn5geej';
const PUBLIC_KEY  = 'vNc8MXvN5Xl0NLVsy';

export default function Contact() {
  const { t } = useLanguage();
  const formRef = useRef();

  const [formData, setFormData]       = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const [copiedField, setCopiedField]   = useState(null);
  const [focused, setFocused]           = useState(null);

  const contactInfo = [
    { id: 'email',    icon: Mail,    label: 'Email',    value: 'witnessfabrice@gmail.com', copyable: true },
    { id: 'phone',    icon: Phone,   label: 'Phone',    value: '+250 783 568 337',          copyable: true },
    { id: 'location', icon: MapPin,  label: 'Location', value: 'Kigali, Rwanda',            copyable: false },
  ];

  const socialLinks = [
    { icon: Github,    href: 'https://github.com/witfab-dev',             label: 'GitHub',    hover: 'hover:bg-[#24292e]' },
    { icon: Linkedin,  href: 'https://linkedin.com/in/witnessfabrice',    label: 'LinkedIn',  hover: 'hover:bg-[#0A66C2]' },
    { icon: Twitter,   href: 'https://twitter.com/wit-fab',               label: 'Twitter',   hover: 'hover:bg-[#1DA1F2]' },
    { icon: Instagram, href: 'https://instagram.com/witbri1',             label: 'Instagram', hover: 'hover:bg-[#E4405F]' },
    { icon: Facebook,  href: 'https://facebook.com/witbrice',             label: 'Facebook',  hover: 'hover:bg-[#1877F2]' },
  ];

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name === 'from_name' ? 'name' : e.target.name === 'reply_to' ? 'email' : 'message']: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      emailjs.init(PUBLIC_KEY);
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  /* ── shared tokens ───────────────────────────────────────── */
  const inputBase =
    'w-full px-4 py-3.5 rounded-xl bg-stone-100 dark:bg-stone-800/60 border text-stone-900 dark:text-stone-100 text-sm placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none transition-all duration-200';

  return (
    <section
      id="contact"
      className="relative py-24 px-4 sm:px-6 overflow-hidden bg-stone-100 dark:bg-[#0c0b0a] transition-colors duration-500"
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-40 -right-32 w-[420px] h-[420px] rounded-full bg-orange-500/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 w-[360px] h-[360px] rounded-full bg-blue-500/[0.04] blur-3xl" />

      <div className="relative max-w-[1100px] mx-auto">

        {/* ══ HEADER ═══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
            <span className="block w-5 h-px bg-orange-500" />
            Get in touch
          </p>
          <h2 className="text-[clamp(36px,5vw,62px)] font-black leading-[0.93] tracking-tight text-stone-900 dark:text-stone-100">
            Let's build something
            <br />
            <span className="text-orange-500 italic">great together.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-stone-500 dark:text-stone-500 max-w-sm">
            Have a project in mind? Drop me a message and I'll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* ══ GRID ═════════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── LEFT: info + socials ──────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Contact info cards */}
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group flex items-center gap-4 p-4 bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800/60 rounded-2xl hover:border-orange-400 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.25)] transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500">
                  <info.icon size={18} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-orange-500 mb-0.5">{info.label}</p>
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">{info.value}</p>
                </div>

                {/* Copy btn */}
                {info.copyable && (
                  <button
                    type="button"
                    onClick={() => copy(info.value, info.id)}
                    aria-label={`Copy ${info.label}`}
                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-stone-200 dark:border-stone-700 text-stone-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 active:scale-90 transition-all"
                  >
                    {copiedField === info.id
                      ? <Check size={13} className="text-green-400" />
                      : <Copy size={13} />}
                  </button>
                )}
              </motion.div>
            ))}

            {/* Socials card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28, duration: 0.4 }}
              className="p-5 bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800/60 rounded-2xl"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500 mb-4">Follow me</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ icon: Icon, href, label, hover }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3, scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl border border-stone-200 dark:border-stone-700/60 text-stone-400 dark:text-stone-500 ${hover} hover:text-white hover:border-transparent transition-all duration-300`}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability nudge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.34, duration: 0.4 }}
              className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800/60 rounded-2xl"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative rounded-full h-2 w-2 bg-green-500" />
              </span>
              <p className="text-xs text-stone-500 dark:text-stone-500">
                <span className="font-bold text-green-500">Available</span> for new projects &amp; collaborations
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT: form ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800/60 rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Name + Email row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 ml-1">
                    Your name
                  </label>
                  <input
                    name="from_name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    placeholder="John Doe"
                    className={`${inputBase} ${
                      focused === 'name'
                        ? 'border-orange-400 bg-orange-50/40 dark:bg-orange-500/5 shadow-[0_0_0_3px_rgba(249,115,22,0.1)]'
                        : 'border-stone-200 dark:border-stone-700/60'
                    }`}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 ml-1">
                    Email address
                  </label>
                  <input
                    name="reply_to"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="you@example.com"
                    className={`${inputBase} ${
                      focused === 'email'
                        ? 'border-orange-400 bg-orange-50/40 dark:bg-orange-500/5 shadow-[0_0_0_3px_rgba(249,115,22,0.1)]'
                        : 'border-stone-200 dark:border-stone-700/60'
                    }`}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  placeholder="Tell me about your project…"
                  className={`${inputBase} resize-none ${
                    focused === 'message'
                      ? 'border-orange-400 bg-orange-50/40 dark:bg-orange-500/5 shadow-[0_0_0_3px_rgba(249,115,22,0.1)]'
                      : 'border-stone-200 dark:border-stone-700/60'
                  }`}
                />
                {/* Char hint */}
                <p className="text-[10px] text-stone-400 dark:text-stone-600 text-right pr-1">
                  {formData.message.length} characters
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full py-4 font-bold text-sm rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed
                  ${submitStatus === 'error'
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                    : submitStatus === 'success'
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                  }`}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.span key="loading" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </motion.span>
                  ) : submitStatus === 'success' ? (
                    <motion.span key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="flex items-center justify-center gap-2">
                      <Check size={16} /> Message sent!
                    </motion.span>
                  ) : submitStatus === 'error' ? (
                    <motion.span key="err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="flex items-center justify-center gap-2">
                      <AlertCircle size={16} /> Failed — try again
                    </motion.span>
                  ) : (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="flex items-center justify-center gap-2">
                      <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      Send Message
                      <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <p className="text-center text-[10px] text-stone-400 dark:text-stone-600">
                I typically reply within <span className="font-semibold text-stone-500 dark:text-stone-400">24 hours</span> ·  Your info is never shared.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
