import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../contexts/LanguageContext';
import { useThreeJS } from '../../hooks/useThreeJS';
import LazyThreeJS from '../shared/LazyThreeJS';
import {
  Mail, Phone, MapPin, Send, Github, Linkedin,
  Twitter, Instagram, Facebook, Check, Copy,
  AlertCircle, ArrowUpRight, Globe, Clock,
  Shield, Zap, Star, Loader2, MessageSquare,
  Users, Coffee, Calendar,
} from 'lucide-react';

// ─── EmailJS Config ────────────────────────────────────────
const SERVICE_ID  = 'service_r4cj7xg';
const TEMPLATE_ID = 'template_mn5geej';
const PUBLIC_KEY  = 'vNc8MXvN5Xl0NLVsy';

// ─── WebGL Detection ───────────────────────────────────────
function isWebGLSupported() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

// ─── CSS Fallback Globe (no WebGL) ────────────────────────
function GlobeFallback() {
  return (
    <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 65% 45%, rgba(249,115,22,0.12) 0%, transparent 55%), radial-gradient(circle at 30% 70%, rgba(59,130,246,0.08) 0%, transparent 50%)',
        }}
      />
      {/* Animated CSS rings */}
      {[160, 220, 280, 340].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-orange-500/10"
          style={{
            width: size,
            height: size,
            top: '50%',
            left: '65%',
            transform: 'translate(-50%, -50%)',
            animation: `pulse ${3 + i * 0.7}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #f97316 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.04); }
        }
      `}</style>
    </div>
  );
}

// ─── Globe Background (Three.js) ──────────────────────────
function GlobeBackground() {
  const {
    mountRef,
    isReady,
    error,
    startAnimationLoop,
    handleResize,
  } = useThreeJS('contact-globe', {
    cameraPosition: [0, 0, 4.5],
    fov: 45,
    enableShadows: false,
    onInit: ({ scene }) => {
      scene.add(new THREE.AmbientLight(0xffffff, 0.15));

      const dOrange = new THREE.DirectionalLight(0xf97316, 1.2);
      dOrange.position.set(5, 3, 5);
      scene.add(dOrange);

      const dBlue = new THREE.DirectionalLight(0x3b82f6, 0.8);
      dBlue.position.set(-5, -3, 3);
      scene.add(dBlue);

      const globeGroup = new THREE.Group();

      // Inner sphere
      globeGroup.add(
        new THREE.Mesh(
          new THREE.SphereGeometry(1.5, 64, 64),
          new THREE.MeshStandardMaterial({
            color: 0x0c0b0a, metalness: 0.3, roughness: 0.8,
            transparent: true, opacity: 0.6,
          })
        )
      );

      // Wireframe grid
      globeGroup.add(
        new THREE.Mesh(
          new THREE.SphereGeometry(1.52, 36, 18),
          new THREE.MeshBasicMaterial({
            color: 0xf97316, wireframe: true, transparent: true, opacity: 0.06,
          })
        )
      );

      // Outer glow
      globeGroup.add(
        new THREE.Mesh(
          new THREE.SphereGeometry(1.6, 32, 32),
          new THREE.MeshBasicMaterial({
            color: 0xf97316, transparent: true, opacity: 0.03, side: THREE.BackSide,
          })
        )
      );

      // Lat/lon → sphere position
      const toSphere = (lat, lon, r = 1.53) => {
        const phi   = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        return new THREE.Vector3(
          -r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        );
      };

      // Continent dot clusters
      const dots = [
        ...Array.from({ length: 120 }, () => toSphere((Math.random() - 0.5) * 65 - 5,  (Math.random() - 0.5) * 50 + 20)),
        ...Array.from({ length: 80  }, () => toSphere(Math.random() * 25 + 35,          (Math.random() - 0.5) * 40 + 15)),
        ...Array.from({ length: 180 }, () => toSphere((Math.random() - 0.5) * 60 + 35,  (Math.random() - 0.5) * 100 + 90)),
        ...Array.from({ length: 120 }, () => toSphere(Math.random() * 45 + 15,          (Math.random() - 0.5) * 60 - 100)),
        ...Array.from({ length: 80  }, () => toSphere((Math.random() - 0.5) * 55 - 15,  (Math.random() - 0.5) * 40 - 60)),
        ...Array.from({ length: 50  }, () => toSphere((Math.random() - 0.5) * 30 - 25,  (Math.random() - 0.5) * 30 + 135)),
      ];
      const dotPos = new Float32Array(dots.length * 3);
      dots.forEach((v, i) => { dotPos[i*3]=v.x; dotPos[i*3+1]=v.y; dotPos[i*3+2]=v.z; });
      const dotGeo = new THREE.BufferGeometry();
      dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3));
      globeGroup.add(new THREE.Points(dotGeo, new THREE.PointsMaterial({
        color: 0xf97316, size: 0.018, transparent: true, opacity: 0.55,
      })));

      // City markers
      const cities = [
        { lat: -1.94,  lon: 30.06,  color: 0xf97316, r: 0.04  }, // Kigali ★
        { lat: 48.85,  lon: 2.35,   color: 0x3b82f6, r: 0.025 }, // Paris
        { lat: 51.5,   lon: -0.12,  color: 0x3b82f6, r: 0.025 }, // London
        { lat: 40.71,  lon: -74.0,  color: 0x3b82f6, r: 0.025 }, // New York
        { lat: 37.77,  lon: -122.4, color: 0x8b5cf6, r: 0.022 }, // San Francisco
        { lat: 35.68,  lon: 139.7,  color: 0x8b5cf6, r: 0.022 }, // Tokyo
        { lat: -33.87, lon: 151.2,  color: 0x10b981, r: 0.022 }, // Sydney
        { lat: 1.35,   lon: 103.8,  color: 0x10b981, r: 0.022 }, // Singapore
        { lat: 25.2,   lon: 55.27,  color: 0x8b5cf6, r: 0.022 }, // Dubai
        { lat: -26.2,  lon: 28.04,  color: 0x10b981, r: 0.022 }, // Johannesburg
        { lat: 6.52,   lon: 3.38,   color: 0xf97316, r: 0.022 }, // Lagos
        { lat: 52.52,  lon: 13.40,  color: 0x3b82f6, r: 0.022 }, // Berlin
      ];

      const pulsingRings = [];
      cities.forEach(({ lat, lon, color, r }) => {
        const pos = toSphere(lat, lon, 1.53);
        globeGroup.add(
          Object.assign(
            new THREE.Mesh(new THREE.SphereGeometry(r, 8, 8), new THREE.MeshBasicMaterial({ color })),
            { position: pos.clone() }
          )
        );
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

      // Arcs from Kigali
      const kigali = toSphere(-1.94, 30.06, 1.54);
      [
        toSphere(48.85, 2.35, 1.54),
        toSphere(40.71, -74.0, 1.54),
        toSphere(35.68, 139.7, 1.54),
        toSphere(1.35, 103.8, 1.54),
        toSphere(25.2, 55.27, 1.54),
        toSphere(-26.2, 28.04, 1.54),
        toSphere(6.52, 3.38, 1.54),
      ].forEach((target, ti) => {
        const pts = Array.from({ length: 51 }, (_, i) => {
          const t = i / 50;
          return new THREE.Vector3()
            .lerpVectors(kigali, target, t)
            .normalize()
            .multiplyScalar(1.58 + Math.sin(t * Math.PI) * 0.2);
        });
        globeGroup.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({
            color: ti === 0 ? 0xf97316 : 0x3b82f6,
            transparent: true, opacity: 0.22,
          })
        ));
      });

      // Orbital rings
      const orbitRings = [];
      [
        { r: 1.8,  tube: 0.006, color: 0xf97316, tilt: 0.5,  speed: 0.3  },
        { r: 2.1,  tube: 0.004, color: 0x3b82f6, tilt: -0.8, speed: -0.2 },
        { r: 2.45, tube: 0.003, color: 0x8b5cf6, tilt: 1.2,  speed: 0.15 },
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

      // Particle cloud
      const pCount = 300;
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const rr = 2.3 + Math.random() * 1.8;
        pPos[i*3]   = rr * Math.sin(ph) * Math.cos(th);
        pPos[i*3+1] = rr * Math.sin(ph) * Math.sin(th);
        pPos[i*3+2] = rr * Math.cos(ph);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
        color: 0xf97316, size: 0.014, transparent: true, opacity: 0.3,
      }));
      globeGroup.add(particles);

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
  });

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

// ─── Determine which globe to show ────────────────────────
function GlobeRenderer() {
  const [webgl] = useState(() => isWebGLSupported());
  if (!webgl) return <GlobeFallback />;
  return (
    <LazyThreeJS
      componentId="contact-globe"
      fallback={<GlobeFallback />}
    >
      <GlobeBackground />
    </LazyThreeJS>
  );
}

// ─── Main Contact Component ────────────────────────────────
export default function Contact() {
  const { t } = useLanguage();
  const formRef = useRef();

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [submitStatus, setSubmitStatus]   = useState(null); // null | 'success' | 'error'
  const [copiedField, setCopiedField]     = useState(null);
  const [focused, setFocused]             = useState(null);
  const [activeTab, setActiveTab]         = useState('contact');
  const [charCount, setCharCount]         = useState(0);

  // ── Static data ──────────────────────────────────────────
  const contactInfo = useMemo(() => [
    {
      id: 'email',
      icon: Mail,
      label: t('emailLabel', 'Email'),
      value: 'witnessfabrice@gmail.com',
      href: 'mailto:witnessfabrice@gmail.com',
      copyable: true,
    },
    {
      id: 'phone',
      icon: Phone,
      label: t('phoneLabel', 'Phone'),
      value: '+250 783 568 337',
      href: 'tel:+250783568337',
      copyable: true,
    },
    {
      id: 'location',
      icon: MapPin,
      label: t('locationLabel', 'Location'),
      value: 'Kigali, Rwanda 🇷🇼',
      href: 'https://maps.google.com/?q=Kigali+Rwanda',
      copyable: false,
    },
    {
      id: 'availability',
      icon: Calendar,
      label: 'Availability',
      value: 'Mon – Fri · 08:00 – 18:00 CAT',
      href: null,
      copyable: false,
    },
    {
      id: 'response',
      icon: Clock,
      label: 'Response time',
      value: 'Usually within 24 hours',
      href: null,
      copyable: false,
    },
  ], [t]);

  const socialLinks = [
    { icon: Github,    href: 'https://github.com/witfab-dev',             label: 'GitHub',    color: 'hover:bg-[#24292e]',  username: 'witfab-dev'      },
    { icon: Linkedin,  href: 'https://linkedin.com/in/witnessfabrice',    label: 'LinkedIn',  color: 'hover:bg-[#0A66C2]',  username: 'witnessfabrice'  },
    { icon: Twitter,   href: 'https://twitter.com/wit_fab',               label: 'Twitter',   color: 'hover:bg-[#1DA1F2]',  username: '@wit_fab'        },
    { icon: Instagram, href: 'https://instagram.com/witbri1',             label: 'Instagram', color: 'hover:bg-[#E4405F]',  username: '@witbri1'        },
    { icon: Facebook,  href: 'https://facebook.com/witbrice',             label: 'Facebook',  color: 'hover:bg-[#1877F2]',  username: 'witbrice'        },
  ];

  const quickReplies = [
    { emoji: '💡', text: 'I have a project idea' },
    { emoji: '🤝', text: "Let's collaborate"      },
    { emoji: '📋', text: 'Need a consultation'    },
    { emoji: '💼', text: 'Job opportunity'         },
    { emoji: '☕', text: 'Just saying hi!'         },
  ];

  const stats = [
    { icon: Globe,         value: '6+',   label: 'Countries served' },
    { icon: Star,          value: '50+',  label: 'Projects shipped' },
    { icon: Zap,           value: '24h',  label: 'Avg. response'    },
    { icon: Users,         value: '30+',  label: 'Happy clients'    },
  ];

  const collaborationItems = [
    { icon: Coffee,        title: 'Coffee Chat',     desc: 'Quick 30-min call to discuss your idea — no strings attached.' },
    { icon: MessageSquare, title: 'Project Scoping', desc: 'Detailed breakdown of requirements, timeline & budget estimate.' },
    { icon: Users,         title: 'Team Augmentation', desc: 'Need an extra pair of skilled hands on your existing team?' },
    { icon: Zap,           title: 'Rapid Prototype',  desc: 'From idea to clickable prototype in 72 hours.' },
  ];

  const subjectOptions = [
    'Web / App Development',
    'UI / UX Design',
    'Technical Consulting',
    'Team Collaboration',
    'Job Opportunity',
    'Open Source',
    'Other',
  ];

  // ── Handlers ─────────────────────────────────────────────
  const copy = (text, id) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Map EmailJS template field names → state keys
    const keyMap = {
      from_name: 'name',
      reply_to:  'email',
      phone:     'phone',
      subject:   'subject',
      message:   'message',
    };
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
      emailjs.init(PUBLIC_KEY);
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setCharCount(0);
    } catch (err) {
      console.error('[Contact] EmailJS error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 6000);
    }
  };

  // ── Shared input style ────────────────────────────────────
  const inputBase =
    'w-full px-4 py-3.5 rounded-xl bg-white/[0.07] backdrop-blur-md border text-white placeholder:text-white/35 focus:outline-none transition-all duration-200 text-sm';
  const focusCls = (f) =>
    focused === f
      ? 'border-orange-400 shadow-[0_0_0_3px_rgba(249,115,22,0.15)]'
      : 'border-white/10 hover:border-white/20';

  // ─────────────────────────────────────────────────────────
  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 px-4 sm:px-6 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Globe background */}
      <GlobeRenderer />

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/70 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">

        {/* ══ HEADER ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-orange-500 mb-5 px-4 py-2 rounded-full bg-orange-500/10 backdrop-blur-sm border border-orange-500/20">
            <Globe size={12} />
            {t('contact', 'Get in touch')}
          </p>

          <h2 className="text-[clamp(34px,5vw,72px)] font-black leading-[0.93] tracking-tight text-white mb-4">
            {t('contactHeading', "Let's create something")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 italic">
              great together.
            </span>
          </h2>

          <p className="text-white/60 text-sm max-w-lg mx-auto leading-relaxed">
            {t('contactSubtitle',
              'Have a project in mind? Drop me a message — I reply within 24 hours, from Kigali to anywhere on the globe.'
            )}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-orange-500/10 backdrop-blur-sm border border-orange-500/20 flex items-center justify-center">
                  <stat.icon size={18} className="text-orange-400" />
                </div>
                <div className="text-white font-black text-lg leading-none">{stat.value}</div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ══ MAIN GRID ═══════════════════════════════════════ */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── LEFT COLUMN ────────────────────────────────── */}
          <div className="space-y-4">

            {/* Contact info cards */}
            {contactInfo.map((info, i) => {
              const Card = info.href ? motion.a : motion.div;
              const cardProps = info.href
                ? { href: info.href, target: info.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' }
                : {};

              return (
                <Card
                  key={info.id}
                  {...cardProps}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group flex items-center gap-4 p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-orange-500/15 border border-orange-500/25 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <info.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-orange-400/80 mb-0.5">
                      {info.label}
                    </p>
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
                </Card>
              );
            })}

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.38 }}
              className="p-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/45 mb-4">
                {t('followMe', 'Follow me')}
              </p>
              <div className="space-y-2">
                {socialLinks.map(({ icon: Icon, href, label, color, username }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/8 text-white/50 ${color} hover:text-white hover:border-transparent transition-all duration-300 bg-white/[0.04]`}
                  >
                    <Icon size={16} />
                    <span className="text-xs font-medium flex-1">{label}</span>
                    <span className="text-[10px] text-white/30 font-mono">{username}</span>
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.46 }}
              className="flex items-center gap-3 px-4 py-3.5 bg-black/40 backdrop-blur-md border border-green-500/20 rounded-2xl"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-55" />
                <span className="relative rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <p className="text-xs text-white/70 leading-snug">
                <span className="font-bold text-green-400">Available</span>{' '}
                for new projects & collaborations
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN (form) ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8"
          >
            {/* Tabs */}
            <div className="flex gap-2 mb-7">
              {[
                { key: 'contact',     label: '✉️  Contact'     },
                { key: 'collaborate', label: '🤝  Collaborate'  },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-all ${
                    activeTab === key
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                      : 'text-white/45 hover:text-white hover:bg-white/5 border border-white/10'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ── TAB: CONTACT FORM ─────────────────────────── */}
            <AnimatePresence mode="wait">
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
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-white/45 ml-1">
                        {t('nameLabel', 'Your name')} <span className="text-orange-500">*</span>
                      </label>
                      <input
                        name="from_name" type="text" required
                        value={formData.name} onChange={handleChange}
                        onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                        placeholder="Witness Fabrice"
                        className={`${inputBase} ${focusCls('name')}`}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-white/45 ml-1">
                        {t('emailLabel', 'Email address')} <span className="text-orange-500">*</span>
                      </label>
                      <input
                        name="reply_to" type="email" required
                        value={formData.email} onChange={handleChange}
                        onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                        placeholder="you@example.com"
                        className={`${inputBase} ${focusCls('email')}`}
                      />
                    </div>
                  </div>

                  {/* Phone + Subject */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-white/45 ml-1">
                        {t('phoneLabel', 'Phone')} <span className="text-white/25 normal-case">(optional)</span>
                      </label>
                      <input
                        name="phone" type="tel"
                        value={formData.phone} onChange={handleChange}
                        onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                        placeholder="+250 783 000 000"
                        className={`${inputBase} ${focusCls('phone')}`}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-white/45 ml-1">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject} onChange={handleChange}
                        onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                        className={`${inputBase} ${focusCls('subject')} appearance-none cursor-pointer`}
                        style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
                      >
                        <option value="" disabled className="bg-[#1a1a1a]">Select a topic…</option>
                        {subjectOptions.map(opt => (
                          <option key={opt} value={opt} className="bg-[#1a1a1a]">{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/45 ml-1">
                      {t('messageLabel', 'Message')} <span className="text-orange-500">*</span>
                    </label>
                    <textarea
                      name="message" required rows={6}
                      value={formData.message} onChange={handleChange}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                      placeholder="Tell me about your project, timeline, budget, or anything else on your mind…"
                      className={`${inputBase} resize-none ${focusCls('message')}`}
                    />
                    {/* Quick replies + char count */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {quickReplies.map(({ emoji, text }, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleQuickReply(text)}
                            className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/45 hover:text-white hover:border-orange-400/60 hover:bg-orange-500/10 transition-all"
                          >
                            {emoji} {text}
                          </button>
                        ))}
                      </div>
                      <p className={`text-[10px] tabular-nums shrink-0 ${charCount > 1000 ? 'text-orange-400' : 'text-white/35'}`}>
                        {charCount} chars
                      </p>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative w-full py-4 font-bold text-sm rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${
                      submitStatus === 'error'
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                        : submitStatus === 'success'
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.span key="loading"
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t('loading', 'Sending…')}
                        </motion.span>
                      ) : submitStatus === 'success' ? (
                        <motion.span key="ok"
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <Check size={16} /> {t('sendSuccess', 'Message sent successfully!')}
                        </motion.span>
                      ) : submitStatus === 'error' ? (
                        <motion.span key="err"
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <AlertCircle size={16} /> {t('sendError', 'Failed to send — please try again')}
                        </motion.span>
                      ) : (
                        <motion.span key="idle"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          {t('sendMessage', 'Send Message')}
                          <ArrowUpRight size={14} className="opacity-55 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  {/* Trust badges */}
                  <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-white/35">
                    <span className="flex items-center gap-1.5">
                      <Shield size={10} className="text-green-400" />
                      Your info is 100% secure
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={10} className="text-orange-400" />
                      Reply within 24 hours
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Zap size={10} className="text-blue-400" />
                      Free initial consultation
                    </span>
                  </div>
                </motion.form>
              )}

              {/* ── TAB: COLLABORATE ───────────────────────── */}
              {activeTab === 'collaborate' && (
                <motion.div
                  key="collaborate-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-lg font-black text-white mb-1">
                      Ways to work together
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Whether you need a full product build, a quick consultation, or an extra hand on an existing project — I'm flexible.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {collaborationItems.map(({ icon: Icon, title, desc }, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="group p-4 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300 cursor-pointer"
                      >
                        <div className="w-10 h-10 mb-3 rounded-xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                          <Icon size={18} />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                        <p className="text-xs text-white/50 leading-relaxed">{desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <a
                      href="mailto:witnessfabrice@gmail.com?subject=Collaboration Inquiry"
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition-all"
                    >
                      <Mail size={15} /> Email me directly
                      <ArrowUpRight size={14} className="opacity-70" />
                    </a>
                    <a
                      href="https://linkedin.com/in/witnessfabrice"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/50 text-white font-bold text-sm transition-all"
                    >
                      <Linkedin size={15} /> Connect on LinkedIn
                    </a>
                  </div>

                  {/* Timezone note */}
                  <p className="text-center text-[11px] text-white/35 pt-1">
                    🕐 Currently in <span className="text-white/60 font-semibold">CAT (UTC+2)</span> · Kigali, Rwanda
                    — available for calls <span className="text-white/60 font-semibold">Mon–Fri 08:00–18:00</span>
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
