// components/sections/Contact.jsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { useLanguage } from '../../contexts/LanguageContext';
import { useThreeJS } from '../../hooks/useThreeJS';
import LazyThreeJS from '../shared/LazyThreeJS';
import ThreeJSErrorBoundary from '../shared/ThreeJSErrorBoundary';
import {
  Mail, Phone, MapPin, Send, Github, Linkedin,
  Twitter, Instagram, Facebook, Check, Copy,
  AlertCircle, ArrowUpRight, Globe, Clock,
  Shield, Zap, Star, Loader2, MessageSquare,
  Users, Coffee, Calendar, Briefcase, Code2,
  Smartphone, Palette, Server, Database, Cloud,
  Award, Target, Heart, Headphones, User,
  Lightbulb, Handshake, Clipboard,
} from 'lucide-react';

// ─── Web3Forms Configuration ────────────────────────────────────
const WEB3FORMS_ACCESS_KEY = '46173eb0-d5ff-41b1-ae8e-81adb5d5b012';

// ─── WebGL detection ───────────────────────────────────────────
function isWebGLSupported() {
  if (typeof window === 'undefined') return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch { return false; }
}

// ─── CSS Fallback Globe ────────────────────────────────────────
function GlobeFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] to-[#050505] overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage:
          'radial-gradient(circle at 65% 45%, rgba(249,115,22,0.12) 0%, transparent 55%), ' +
          'radial-gradient(circle at 30% 70%, rgba(59,130,246,0.08) 0%, transparent 50%)',
      }} />
      {[180, 240, 300, 360].map((size, i) => (
        <div key={i} className="absolute rounded-full border border-orange-500/10"
          style={{
            width: size, height: size,
            top: '50%', left: '65%',
            transform: 'translate(-50%, -50%)',
            animation: `pulse-ring ${3 + i * 0.7}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }} />
      ))}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #f97316 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />
      <style>{`
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 0.4; transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>
    </div>
  );
}

// ─── Three.js Globe (simplified for brevity) ───────────────────
function GlobeBackground() {
  const { mountRef, isReady, error, startAnimationLoop, handleResize } = useThreeJS(
    'contact-globe',
    {
      cameraPosition: [0, 0, 4.5],
      fov: 45,
      enableShadows: false,
      onInit: ({ scene }) => {
        scene.add(new THREE.AmbientLight(0xffffff, 0.15));
        const dOrange = new THREE.DirectionalLight(0xf97316, 1.2);
        dOrange.position.set(5, 3, 5); scene.add(dOrange);
        const dBlue = new THREE.DirectionalLight(0x3b82f6, 0.8);
        dBlue.position.set(-5, -3, 3); scene.add(dBlue);

        const globeGroup = new THREE.Group();
        globeGroup.add(new THREE.Mesh(
          new THREE.SphereGeometry(1.5, 64, 64),
          new THREE.MeshStandardMaterial({ color: 0x0c0b0a, metalness: 0.3, roughness: 0.8, transparent: true, opacity: 0.6 })
        ));
        globeGroup.position.set(2.2, 0, -1);
        scene.add(globeGroup);

        let elapsed = 0;
        startAnimationLoop(() => {
          elapsed += 0.016;
          globeGroup.rotation.y += 0.0018;
          globeGroup.rotation.x = Math.sin(elapsed * 0.15) * 0.08;
        });
      },
    }
  );

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  if (error) return <GlobeFallback />;

  return (
    <div ref={mountRef} className="absolute inset-0">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
          <Loader2 size={24} className="animate-spin text-orange-500/50" />
        </div>
      )}
    </div>
  );
}

// ─── Globe renderer ────────────────────────────────────────────
function GlobeRenderer() {
  const [webgl] = useState(() => isWebGLSupported());
  if (!webgl) return <GlobeFallback />;
  return (
    <ThreeJSErrorBoundary fallback={<GlobeFallback />}>
      <LazyThreeJS componentId="contact-globe" rootMargin="200px" fallback={<GlobeFallback />}>
        <GlobeBackground />
      </LazyThreeJS>
    </ThreeJSErrorBoundary>
  );
}

// ─── Main Contact Component ────────────────────────────────────
export default function Contact() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    subject: '', 
    message: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const [copiedField, setCopiedField] = useState(null);
  const [focused, setFocused] = useState(null);
  const [activeTab, setActiveTab] = useState('contact');
  const [charCount, setCharCount] = useState(0);

  const contactInfo = useMemo(() => [
    { id: 'email', icon: Mail, label: 'Email', value: 'witnessfabrice@gmail.com', href: 'mailto:witnessfabrice@gmail.com', copyable: true, badge: 'Primary' },
    { id: 'phone', icon: Phone, label: 'Phone', value: '+250 783 568 337', href: 'tel:+250783568337', copyable: true, badge: 'WhatsApp' },
    { id: 'location', icon: MapPin, label: 'Location', value: 'Kigali, Rwanda', href: 'https://maps.google.com/?q=Kigali+Rwanda', copyable: false, badge: 'East Africa' },
    { id: 'availability', icon: Calendar, label: 'Availability', value: 'Mon – Fri · 08:00 – 18:00 CAT', href: null, copyable: false, badge: 'UTC+2' },
    { id: 'response', icon: Clock, label: 'Response time', value: 'Usually within 24 hours', href: null, copyable: false, badge: 'Fast' },
  ], [t]);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/witfab-dev', label: 'GitHub', color: 'hover:bg-[#24292e]', username: 'witfab-dev', followers: '15+ repos' },
    { icon: Linkedin, href: 'https://linkedin.com/in/witness-fabrice', label: 'LinkedIn', color: 'hover:bg-[#0A66C2]', username: 'witnessfabrice', followers: '500+ connections' },
    { icon: Twitter, href: 'https://twitter.com/wit_fab', label: 'Twitter', color: 'hover:bg-[#1DA1F2]', username: '@wit_fab', followers: '1k+ followers' },
    { icon: Instagram, href: 'https://instagram.com/witbri1', label: 'Instagram', color: 'hover:bg-[#E4405F]', username: '@witbri1', followers: '2k+ followers' },
  ];

  const expertiseAreas = [
    { icon: Code2, title: 'Web Development', desc: 'React, Next.js, Node.js, Django', color: '#f97316' },
    { icon: Smartphone, title: 'Mobile Apps', desc: 'React Native, Flutter, PWA', color: '#3b82f6' },
    { icon: Palette, title: 'UI/UX Design', desc: 'Figma, Tailwind, Framer Motion', color: '#8b5cf6' },
    { icon: Server, title: 'Backend', desc: 'PostgreSQL, MongoDB, Redis', color: '#10b981' },
    { icon: Database, title: 'DevOps', desc: 'Docker, AWS, CI/CD', color: '#ec4899' },
    { icon: Cloud, title: 'Cloud', desc: 'Vercel, Netlify, Cloudflare', color: '#06b6d4' },
  ];

  // Quick replies with Lucide icons
  const quickReplies = [
    { icon: Lightbulb, text: 'I have a project idea', color: '#f97316' },
    { icon: Handshake, text: "Let's collaborate", color: '#3b82f6' },
    { icon: Clipboard, text: 'Need a consultation', color: '#8b5cf6' },
    { icon: Briefcase, text: 'Job opportunity', color: '#10b981' },
    { icon: Coffee, text: 'Just saying hi!', color: '#ec4899' },
  ];

  const stats = [
    { icon: Globe, value: '2+', label: 'Countries served', color: '#f97316' },
    { icon: Award, value: '5+', label: 'Projects shipped', color: '#3b82f6' },
    { icon: Zap, value: '24h', label: 'Avg. response', color: '#8b5cf6' },
    { icon: Users, value: '3+', label: 'Happy clients', color: '#10b981' },
  ];

  const collaborationItems = [
    { icon: Coffee, title: 'Coffee Chat', desc: 'Quick 30-min call to discuss your idea — no strings attached.', duration: '30 min', price: 'Free' },
    { icon: MessageSquare, title: 'Project Scoping', desc: 'Detailed breakdown of requirements, timeline & budget estimate.', duration: '2-3 hours', price: 'Fixed' },
    { icon: Users, title: 'Team Augmentation', desc: 'Need an extra pair of skilled hands on your existing team?', duration: 'Ongoing', price: 'Hourly' },
    { icon: Zap, title: 'Rapid Prototype', desc: 'From idea to clickable prototype in 72 hours.', duration: '3 days', price: 'Fixed' },
  ];

  const subjectOptions = [
    'Web / App Development',
    'UI / UX Design',
    'Technical Consulting',
    'Team Collaboration',
    'Job Opportunity',
    'Open Source Contribution',
    'Other',
  ];

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'message') setCharCount(value.length);
  };

  const handleQuickReply = (text) => {
    setFormData(prev => ({ ...prev, message: text }));
    setCharCount(text.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');
    
    try {
      const formPayload = new FormData();
      formPayload.append('access_key', WEB3FORMS_ACCESS_KEY);
      formPayload.append('name', formData.name);
      formPayload.append('email', formData.email);
      formPayload.append('phone', formData.phone || 'Not provided');
      formPayload.append('subject', formData.subject || 'New Contact Form Submission');
      formPayload.append('message', formData.message);
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formPayload
      });

      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus('success');
        setSubmitMessage('Message sent successfully! I will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setCharCount(0);
      } else {
        setSubmitStatus('error');
        setSubmitMessage('Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setSubmitStatus('error');
      setSubmitMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage('');
      }, 5000);
    }
  };

  const inputBase = 'w-full px-4 py-3.5 rounded-xl bg-white/[0.07] backdrop-blur-md border text-white placeholder:text-white/35 focus:outline-none transition-all duration-200 text-sm';
  const focusCls = (f) => focused === f
    ? 'border-orange-400 shadow-[0_0_0_3px_rgba(249,115,22,0.15)]'
    : 'border-white/10 hover:border-white/20';

  return (
    <section id="contact" className="relative min-h-screen py-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#050505]">

      {/* Globe Background */}
      <GlobeRenderer />

      {/* Readability overlays */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-transparent to-[#0a0a0a]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">

        {/* ── Header Section ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-orange-500 mb-5 px-5 py-2.5 rounded-full bg-orange-500/10 backdrop-blur-sm border border-orange-500/20"
          >
            <Globe size={12} className="animate-pulse" />
            {t('contact', 'Get in touch')}
          </motion.div>

          <h2 className="text-[clamp(34px,5vw,72px)] font-black leading-[0.93] tracking-tight text-white mb-4">
            {t('contactHeading', "Let's create something")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400">
              great together.
            </span>
          </h2>

          <p className="text-white/60 text-sm max-w-lg mx-auto leading-relaxed">
            {t('contactSubtitle', 'Have a project in mind? Drop me a message — I reply within 24 hours, from Kigali to anywhere on the globe.')}
          </p>

          {/* Expertise Areas */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {expertiseAreas.map((area, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/40 transition-all cursor-pointer group"
              >
                <area.icon size={12} style={{ color: area.color }} />
                <span className="text-[10px] font-medium text-white/70 group-hover:text-white transition">{area.title}</span>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-10">
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 12 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.06 }}
                className="text-center group"
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 backdrop-blur-sm border border-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon size={18} style={{ color: stat.color }} />
                </div>
                <div className="text-white font-black text-lg leading-none">{stat.value}</div>
                <div className="text-white/40 text-[9px] uppercase tracking-wider mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Main Grid ───────────────────────────────────────── */}
        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN - Contact Info */}
          <div className="lg:col-span-4 space-y-4">
            {contactInfo.map((info, i) => {
              const Tag = info.href ? motion.a : motion.div;
              const extra = info.href
                ? { href: info.href, target: info.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' }
                : {};
              return (
                <Tag key={info.id} {...extra}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="group flex items-center gap-4 p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/15 to-orange-600/5 border border-orange-500/25 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <info.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-orange-400/80 mb-0.5">{info.label}</p>
                      {info.badge && (
                        <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/40">{info.badge}</span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-white truncate">{info.value}</p>
                  </div>
                  {info.copyable && (
                    <button 
                      aria-label={`Copy ${info.label}`}
                      onClick={(e) => { e.preventDefault(); copy(info.value, info.id); }}
                      className="shrink-0 p-1.5 rounded-lg hover:bg-white/10 transition-all"
                    >
                      {copiedField === info.id
                        ? <Check size={13} className="text-green-400" />
                        : <Copy size={13} className="text-white/30 group-hover:text-orange-400 transition-colors" />
                      }
                    </button>
                  )}
                </Tag>
              );
            })}

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.42 }}
              className="p-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/45 mb-4 flex items-center gap-2">
                <Heart size={10} className="text-orange-400" /> 
                {t('followMe', 'Follow me')}
              </p>
              <div className="space-y-2">
                {socialLinks.map(({ icon: Icon, href, label, color, username, followers }) => (
                  <motion.a 
                    key={label} 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={label}
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/8 text-white/50 ${color} hover:text-white hover:border-transparent transition-all duration-300 bg-white/[0.04] group`}
                  >
                    <Icon size={16} className="group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium flex-1">{label}</span>
                    <div className="text-right">
                      <span className="text-[9px] text-white/30 font-mono block">{username}</span>
                      <span className="text-[8px] text-white/20">{followers}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability Status */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.46 }}
              className="flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-green-500/10 to-emerald-500/5 backdrop-blur-md border border-green-500/20 rounded-2xl"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <p className="text-xs text-white/80">
                <span className="font-bold text-green-400">Available for hire</span>
                {' — '}
                <span className="text-white/60">Open to new projects & collaborations</span>
              </p>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-8 bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8"
          >
            {/* Tabs */}
            <div className="flex gap-2 mb-7 border-b border-white/10 pb-4">
              {[
                { key: 'contact', label: 'Contact', icon: MessageSquare },
                { key: 'collaborate', label: 'Collaborate', icon: Users },
              ].map(({ key, label, icon: Icon }) => (
                <button 
                  key={key} 
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                      : 'text-white/45 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Contact Form */}
              {activeTab === 'contact' && (
                <motion.form 
                  key="contact-form" 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }} 
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-5"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-white/45 ml-1 flex items-center gap-1">
                        <User size={10} /> Your name <span className="text-orange-500">*</span>
                      </label>
                      <input 
                        name="name" 
                        type="text" 
                        required 
                        value={formData.name} 
                        onChange={handleChange}
                        onFocus={() => setFocused('name')} 
                        onBlur={() => setFocused(null)}
                        placeholder="Witness Fabrice" 
                        className={`${inputBase} ${focusCls('name')}`} 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-white/45 ml-1 flex items-center gap-1">
                        <Mail size={10} /> Email <span className="text-orange-500">*</span>
                      </label>
                      <input 
                        name="email" 
                        type="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange}
                        onFocus={() => setFocused('email')} 
                        onBlur={() => setFocused(null)}
                        placeholder="you@example.com" 
                        className={`${inputBase} ${focusCls('email')}`} 
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-white/45 ml-1 flex items-center gap-1">
                        <Phone size={10} /> Phone
                      </label>
                      <input 
                        name="phone" 
                        type="tel" 
                        value={formData.phone} 
                        onChange={handleChange}
                        onFocus={() => setFocused('phone')} 
                        onBlur={() => setFocused(null)}
                        placeholder="+250 783 000 000" 
                        className={`${inputBase} ${focusCls('phone')}`} 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-white/45 ml-1 flex items-center gap-1">
                        <Briefcase size={10} /> Subject
                      </label>
                      <select 
                        name="subject" 
                        value={formData.subject} 
                        onChange={handleChange}
                        onFocus={() => setFocused('subject')} 
                        onBlur={() => setFocused(null)}
                        className={`${inputBase} ${focusCls('subject')} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled className="bg-[#1a1a1a]">Select a topic…</option>
                        {subjectOptions.map(opt => <option key={opt} value={opt} className="bg-[#1a1a1a]">{opt}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/45 ml-1 flex items-center gap-1">
                      <MessageSquare size={10} /> Message <span className="text-orange-500">*</span>
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
                      className={`${inputBase} resize-none ${focusCls('message')}`} 
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {quickReplies.map(({ icon: Icon, text, color }, i) => (
                          <button 
                            key={i} 
                            type="button" 
                            onClick={() => handleQuickReply(text)}
                            className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/45 hover:text-white hover:border-orange-400/60 hover:bg-orange-500/10 transition-all flex items-center gap-1.5"
                          >
                            <Icon size={10} style={{ color }} />
                            <span>{text}</span>
                          </button>
                        ))}
                      </div>
                      <p className={`text-[10px] tabular-nums shrink-0 font-mono ${charCount > 1000 ? 'text-orange-400' : 'text-white/35'}`}>
                        {charCount}/1000 chars
                      </p>
                    </div>
                  </div>

                  {/* Status Message */}
                  <AnimatePresence>
                    {submitMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-3 rounded-xl text-sm ${
                          submitStatus === 'success' 
                            ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                            : 'bg-red-500/20 border border-red-500/30 text-red-400'
                        }`}
                      >
                        {submitMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`group relative w-full py-4 font-bold text-sm rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${
                      submitStatus === 'error' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' :
                      submitStatus === 'success' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' :
                      'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-lg shadow-orange-500/20'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.span key="loading" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </motion.span>
                      ) : submitStatus === 'success' ? (
                        <motion.span key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center justify-center gap-2">
                          <Check size={16} /> Message sent!
                        </motion.span>
                      ) : submitStatus === 'error' ? (
                        <motion.span key="err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center justify-center gap-2">
                          <AlertCircle size={16} /> Failed — please try again
                        </motion.span>
                      ) : (
                        <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2">
                          <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          Send Message
                          <ArrowUpRight size={14} className="opacity-55 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-[10px] text-white/35">
                    <span className="flex items-center gap-1.5"><Shield size={10} className="text-green-400" />Your info is secure</span>
                    <span className="flex items-center gap-1.5"><Clock size={10} className="text-orange-400" />Reply within 24h</span>
                    <span className="flex items-center gap-1.5"><Zap size={10} className="text-blue-400" />Free consultation</span>
                  </div>
                </motion.form>
              )}

              {/* Collaborate Tab */}
              {activeTab === 'collaborate' && (
                <motion.div 
                  key="collaborate-tab" 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }} 
                  transition={{ duration: 0.25 }} 
                  className="space-y-6"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-black text-white mb-2">Ways to work together</h3>
                    <p className="text-white/50 text-sm">Flexible collaboration models tailored to your needs</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {collaborationItems.map(({ icon: Icon, title, desc, duration, price }, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 12 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: i * 0.05 }}
                        className="group p-4 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300 cursor-pointer"
                      >
                        <div className="w-10 h-10 mb-3 rounded-xl bg-gradient-to-br from-orange-500/15 to-orange-600/5 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                          <Icon size={18} />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                        <p className="text-xs text-white/50 leading-relaxed mb-2">{desc}</p>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                          <span className="text-[9px] text-white/40 flex items-center gap-1">
                            <Clock size={8} /> {duration}
                          </span>
                          <span className="text-[9px] font-bold text-orange-400">{price}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <a 
                      href="mailto:witnessfabrice@gmail.com?subject=Collaboration Inquiry"
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/20"
                    >
                      <Mail size={15} /> Email me directly <ArrowUpRight size={14} />
                    </a>
                    <a 
                      href="https://calendly.com/witnessfabrice" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-orange-500/20 hover:border-orange-500/40 text-white font-bold text-sm transition-all"
                    >
                      <Calendar size={15} /> Schedule a call
                    </a>
                  </div>

                  <p className="text-center text-[11px] text-white/35 pt-2 flex items-center justify-center gap-2">
                    <span>🕐 Currently in <span className="text-white/60 font-semibold">CAT (UTC+2)</span> · Kigali, Rwanda</span>
                    <span>•</span>
                    <span>📅 Available <span className="text-white/60 font-semibold">Mon–Fri 08:00–18:00</span></span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
