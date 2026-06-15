// components/sections/Contact.jsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import emailjs from '@emailjs/browser';
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
  Award, Target, Heart, Sparkles, Compass,
  Headphones, Video, FileText, ThumbsUp,
} from 'lucide-react';

// ─── EmailJS Configuration (IMPORTANT: Replace with your actual credentials) ───
// Sign up at https://www.emailjs.com/ to get your own credentials
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_r4cj7xg',
  TEMPLATE_ID: 'template_mn5geej',
  PUBLIC_KEY: 'vNc8MXvN5Xl0NLVsy'
};

// Check if EmailJS credentials are valid
const isEmailJSValid = () => {
  return EMAILJS_CONFIG.SERVICE_ID && 
         EMAILJS_CONFIG.TEMPLATE_ID && 
         EMAILJS_CONFIG.PUBLIC_KEY &&
         EMAILJS_CONFIG.SERVICE_ID !== 'service_r4cj7xg' ? true : false;
};

// Initialize EmailJS if credentials are valid
if (isEmailJSValid()) {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

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

// ─── Three.js Globe ────────────────────────────────────────────
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

        globeGroup.add(new THREE.Mesh(
          new THREE.SphereGeometry(1.52, 36, 18),
          new THREE.MeshBasicMaterial({ color: 0xf97316, wireframe: true, transparent: true, opacity: 0.06 })
        ));

        globeGroup.add(new THREE.Mesh(
          new THREE.SphereGeometry(1.6, 32, 32),
          new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.03, side: THREE.BackSide })
        ));

        const toSphere = (lat, lon, r = 1.53) => {
          const phi = (90 - lat) * (Math.PI / 180);
          const theta = (lon + 180) * (Math.PI / 180);
          return new THREE.Vector3(
            -r * Math.sin(phi) * Math.cos(theta),
            r * Math.cos(phi),
            r * Math.sin(phi) * Math.sin(theta)
          );
        };

        const continentData = [
          { count: 120, latRange: [-37.5, 27.5], lonRange: [-5, 45] },
          { count: 80, latRange: [35, 60], lonRange: [-5, 35] },
          { count: 180, latRange: [5, 65], lonRange: [40, 140] },
          { count: 120, latRange: [15, 60], lonRange: [-130, -70] },
          { count: 80, latRange: [-42.5, 12.5], lonRange: [-80, -40] },
          { count: 50, latRange: [-40, -10], lonRange: [110, 150] },
        ];
        const dots = continentData.flatMap(({ count, latRange, lonRange }) =>
          Array.from({ length: count }, () =>
            toSphere(
              latRange[0] + Math.random() * (latRange[1] - latRange[0]),
              lonRange[0] + Math.random() * (lonRange[1] - lonRange[0])
            )
          )
        );
        const dotPos = new Float32Array(dots.length * 3);
        dots.forEach((v, i) => { dotPos[i*3] = v.x; dotPos[i*3+1] = v.y; dotPos[i*3+2] = v.z; });
        const dotGeo = new THREE.BufferGeometry();
        dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3));
        globeGroup.add(new THREE.Points(dotGeo,
          new THREE.PointsMaterial({ color: 0xf97316, size: 0.018, transparent: true, opacity: 0.55 })
        ));

        const pulsingRings = [];
        const cities = [
          { lat: -1.94, lon: 30.06, color: 0xf97316, r: 0.04, name: 'Kigali' },
          { lat: 48.85, lon: 2.35, color: 0x3b82f6, r: 0.025, name: 'Paris' },
          { lat: 51.5, lon: -0.12, color: 0x3b82f6, r: 0.025, name: 'London' },
          { lat: 40.71, lon: -74.0, color: 0x3b82f6, r: 0.025, name: 'New York' },
          { lat: 37.77, lon: -122.4, color: 0x8b5cf6, r: 0.022, name: 'San Francisco' },
          { lat: 35.68, lon: 139.7, color: 0x8b5cf6, r: 0.022, name: 'Tokyo' },
          { lat: -33.87, lon: 151.2, color: 0x10b981, r: 0.022, name: 'Sydney' },
          { lat: 1.35, lon: 103.8, color: 0x10b981, r: 0.022, name: 'Singapore' },
        ];
        cities.forEach(({ lat, lon, color, r, name }) => {
          const pos = toSphere(lat, lon, 1.53);
          const dot = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 8), new THREE.MeshBasicMaterial({ color }));
          dot.position.copy(pos);
          globeGroup.add(dot);
          const ring = new THREE.Mesh(
            new THREE.RingGeometry(r * 1.5, r * 2.2, 16),
            new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
          );
          ring.position.copy(pos);
          ring.lookAt(pos.clone().multiplyScalar(2));
          ring.userData.pulse = Math.random() * Math.PI * 2;
          globeGroup.add(ring);
          pulsingRings.push(ring);
        });

        const kigali = toSphere(-1.94, 30.06, 1.54);
        const targets = [
          toSphere(48.85, 2.35, 1.54),
          toSphere(40.71, -74.0, 1.54),
          toSphere(35.68, 139.7, 1.54),
          toSphere(1.35, 103.8, 1.54),
        ];
        targets.forEach((target, ti) => {
          const pts = Array.from({ length: 51 }, (_, i) => {
            const t = i / 50;
            return new THREE.Vector3().lerpVectors(kigali, target, t).normalize().multiplyScalar(1.58 + Math.sin(t * Math.PI) * 0.2);
          });
          globeGroup.add(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(pts),
            new THREE.LineBasicMaterial({ color: ti === 0 ? 0xf97316 : 0x3b82f6, transparent: true, opacity: 0.22 })
          ));
        });

        const orbitRings = [];
        [
          { r: 1.8, tube: 0.006, color: 0xf97316, tilt: 0.5, speed: 0.3 },
          { r: 2.1, tube: 0.004, color: 0x3b82f6, tilt: -0.8, speed: -0.2 },
          { r: 2.45, tube: 0.003, color: 0x8b5cf6, tilt: 1.2, speed: 0.15 },
        ].forEach(({ r, tube, color, tilt, speed }) => {
          const m = new THREE.Mesh(
            new THREE.TorusGeometry(r, tube, 6, 80),
            new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4 })
          );
          m.rotation.x = tilt;
          m.userData.speed = speed;
          globeGroup.add(m);
          orbitRings.push(m);
        });

        const pCount = 300;
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
          const th = Math.random() * Math.PI * 2;
          const ph = Math.acos(2 * Math.random() - 1);
          const rr = 2.3 + Math.random() * 1.8;
          pPos[i*3] = rr * Math.sin(ph) * Math.cos(th);
          pPos[i*3+1] = rr * Math.sin(ph) * Math.sin(th);
          pPos[i*3+2] = rr * Math.cos(ph);
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const particles = new THREE.Points(pGeo,
          new THREE.PointsMaterial({ color: 0xf97316, size: 0.014, transparent: true, opacity: 0.3 })
        );
        globeGroup.add(particles);

        globeGroup.position.set(2.2, 0, -1);
        scene.add(globeGroup);

        let elapsed = 0;
        startAnimationLoop(() => {
          elapsed += 0.016;
          globeGroup.rotation.y += 0.0018;
          globeGroup.rotation.x = Math.sin(elapsed * 0.15) * 0.08;

          pulsingRings.forEach(r => {
            r.userData.pulse += 0.04;
            const s = 1 + 0.4 * Math.abs(Math.sin(r.userData.pulse));
            r.scale.setScalar(s);
            r.material.opacity = 0.5 * (1 - Math.abs(Math.sin(r.userData.pulse)) * 0.7);
          });

          orbitRings.forEach(r => { r.rotation.z += r.userData.speed * 0.012; });
          particles.rotation.y += 0.0008;
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

// ─── Send email helper ─────────────────────────────────────────
const sendEmailMessage = async (formData, formElement) => {
  if (!isEmailJSValid()) {
    // Demo mode - simulate email sending
    console.log('📧 Demo Mode: Message would be sent:', formData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true, demo: true };
  }
  
  try {
    const result = await emailjs.sendForm(
      EMAILJS_CONFIG.SERVICE_ID, 
      EMAILJS_CONFIG.TEMPLATE_ID, 
      formElement, 
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    return { success: true, data: result };
  } catch (error) {
    console.error('EmailJS error:', error);
    return { success: false, error: error.text || error.message };
  }
};

// ─── Main Contact Component ────────────────────────────────────
export default function Contact() {
  const { t } = useLanguage();
  const formRef = useRef();

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const [focused, setFocused] = useState(null);
  const [activeTab, setActiveTab] = useState('contact');
  const [charCount, setCharCount] = useState(0);

  const contactInfo = useMemo(() => [
    { id: 'email', icon: Mail, label: t('emailLabel', 'Email'), value: 'witnessfabrice@gmail.com', href: 'mailto:witnessfabrice@gmail.com', copyable: true, badge: 'Primary' },
    { id: 'phone', icon: Phone, label: t('phoneLabel', 'Phone'), value: '+250 783 568 337', href: 'tel:+250783568337', copyable: true, badge: 'WhatsApp' },
    { id: 'location', icon: MapPin, label: t('locationLabel', 'Location'), value: 'Kigali, Rwanda', href: 'https://maps.google.com/?q=Kigali+Rwanda', copyable: false, badge: 'East Africa' },
    { id: 'availability', icon: Calendar, label: 'Availability', value: 'Mon – Fri · 08:00 – 18:00 CAT', href: null, copyable: false, badge: 'UTC+2' },
    { id: 'response', icon: Clock, label: 'Response time', value: 'Usually within 24 hours', href: null, copyable: false, badge: 'Fast' },
    { id: 'video', icon: Video, label: 'Video Call', value: 'Available on request', href: null, copyable: false, badge: 'Zoom/Google Meet' },
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

  const quickReplies = [
    { emoji: '💡', text: 'I have a project idea', icon: Lightbulb },
    { emoji: '🤝', text: "Let's collaborate", icon: Handshake },
    { emoji: '📋', text: 'Need a consultation', icon: FileText },
    { emoji: '💼', text: 'Job opportunity', icon: Briefcase },
    { emoji: '☕', text: 'Just saying hi!', icon: Coffee },
  ];

  const stats = [
    { icon: Globe, value: '2+', label: 'Countries served', color: '#f97316' },
    { icon: Award, value: '5+', label: 'Projects shipped', color: '#3b82f6' },
    { icon: Zap, value: '24h', label: 'Avg. response', color: '#8b5cf6' },
    { icon: Users, value: '3+', label: 'Happy clients', color: '#10b981' },
    { icon: Star, value: '100%', label: 'Satisfaction', color: '#ec4899' },
    { icon: ThumbsUp, value: '50+', label: 'Code reviews', color: '#06b6d4' },
  ];

  const collaborationItems = [
    { icon: Coffee, title: 'Coffee Chat', desc: 'Quick 30-min call to discuss your idea — no strings attached.', duration: '30 min', price: 'Free' },
    { icon: MessageSquare, title: 'Project Scoping', desc: 'Detailed breakdown of requirements, timeline & budget estimate.', duration: '2-3 hours', price: 'Fixed' },
    { icon: Users, title: 'Team Augmentation', desc: 'Need an extra pair of skilled hands on your existing team?', duration: 'Ongoing', price: 'Hourly' },
    { icon: Zap, title: 'Rapid Prototype', desc: 'From idea to clickable prototype in 72 hours.', duration: '3 days', price: 'Fixed' },
    { icon: Headphones, title: 'Tech Consulting', desc: 'Expert advice on architecture, scaling, and best practices.', duration: '1 hour', price: 'Hourly' },
    { icon: Compass, title: 'Mentorship', desc: 'Guide junior developers through real-world challenges.', duration: 'Weekly', price: 'Monthly' },
  ];

  const subjectOptions = [
    'Web / App Development',
    'UI / UX Design',
    'Technical Consulting',
    'Team Collaboration',
    'Job Opportunity',
    'Open Source Contribution',
    'Speaking Event',
    'Other',
  ];

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keyMap = { from_name: 'name', reply_to: 'email', phone: 'phone', subject: 'subject', message: 'message' };
    const key = keyMap[name] || name;
    setFormData(prev => ({ ...prev, [key]: value }));
    if (key === 'message') setCharCount(value.length);
  };

  const handleQuickReply = (text) => {
    setFormData(prev => ({ ...prev, message: text }));
    setCharCount(text.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const result = await sendEmailMessage(formData, formRef.current);
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setCharCount(0);
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
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
            <Sparkles size={12} className="animate-pulse" />
            {t('contact', 'Get in touch')}
            <Globe size={12} />
          </motion.div>

          <h2 className="text-[clamp(34px,5vw,72px)] font-black leading-[0.93] tracking-tight text-white mb-4">
            {t('contactHeading', "Let's create something")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 animate-gradient">
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
            {/* Contact Cards */}
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
                { key: 'contact', label: '📝 Contact', icon: MessageSquare },
                { key: 'collaborate', label: '🤝 Collaborate', icon: Users },
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
                  ref={formRef} 
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
                        <User size={10} /> {t('nameLabel', 'Your name')} <span className="text-orange-500">*</span>
                      </label>
                      <input 
                        name="from_name" 
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
                        <Mail size={10} /> {t('emailLabel', 'Email')} <span className="text-orange-500">*</span>
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
                        className={`${inputBase} ${focusCls('email')}`} 
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-white/45 ml-1 flex items-center gap-1">
                        <Phone size={10} /> {t('phoneLabel', 'Phone')}
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
                      <MessageSquare size={10} /> {t('messageLabel', 'Message')} <span className="text-orange-500">*</span>
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
                        {quickReplies.map(({ emoji, text, icon: Icon }, i) => (
                          <button 
                            key={i} 
                            type="button" 
                            onClick={() => handleQuickReply(text)}
                            className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/45 hover:text-white hover:border-orange-400/60 hover:bg-orange-500/10 transition-all flex items-center gap-1"
                          >
                            <span>{emoji}</span> {text}
                          </button>
                        ))}
                      </div>
                      <p className={`text-[10px] tabular-nums shrink-0 font-mono ${charCount > 1000 ? 'text-orange-400' : 'text-white/35'}`}>
                        {charCount}/1000 chars
                      </p>
                    </div>
                  </div>

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
                          {t('loading', 'Sending…')}
                        </motion.span>
                      ) : submitStatus === 'success' ? (
                        <motion.span key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center justify-center gap-2">
                          <Check size={16} /> {t('sendSuccess', 'Message sent!')} ✨
                        </motion.span>
                      ) : submitStatus === 'error' ? (
                        <motion.span key="err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center justify-center gap-2">
                          <AlertCircle size={16} /> {t('sendError', 'Failed — please try again')}
                        </motion.span>
                      ) : (
                        <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2">
                          <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          {t('sendMessage', 'Send Message')}
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

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
