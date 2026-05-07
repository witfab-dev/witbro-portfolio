import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import emailjs from '@emailjs/browser';
import {
  Mail, Phone, MapPin, Send, Github, Linkedin,
  Twitter, Instagram, Facebook, Check, Copy,
  AlertCircle, ArrowUpRight, Globe, Clock,
  Shield, Zap, Star,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const SERVICE_ID  = 'service_r4cj7xg';
const TEMPLATE_ID = 'template_mn5geej';
const PUBLIC_KEY  = 'vNc8MXvN5Xl0NLVsy';

function GlobeBackground() {
  const mountRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    scene.add(new THREE.AmbientLight(0xffffff, 0.15));
    const dOrange = new THREE.DirectionalLight(0xf97316, 1.2);
    dOrange.position.set(5, 3, 5);
    scene.add(dOrange);
    const dBlue = new THREE.DirectionalLight(0x3b82f6, 0.8);
    dBlue.position.set(-5, -3, 3);
    scene.add(dBlue);

    const globeGroup = new THREE.Group();

    const innerGeo = new THREE.SphereGeometry(1.5, 64, 64);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x0c0b0a,
      metalness: 0.3,
      roughness: 0.8,
      transparent: true,
      opacity: 0.6,
    });
    globeGroup.add(new THREE.Mesh(innerGeo, innerMat));

    const gridGeo = new THREE.SphereGeometry(1.52, 36, 18);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    globeGroup.add(new THREE.Mesh(gridGeo, gridMat));

    const glowGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.03,
      side: THREE.BackSide,
    });
    globeGroup.add(new THREE.Mesh(glowGeo, glowMat));

    const toSphere = (lat, lon, r = 1.53) => {
      const phi   = (90 - lat)  * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
         r * Math.cos(phi),
         r * Math.sin(phi) * Math.sin(theta)
      );
    };

    const continentClusters = [
      ...Array.from({ length: 120 }, () => toSphere(
        (Math.random() - 0.5) * 65 - 5,
        (Math.random() - 0.5) * 50 + 20
      )),
      ...Array.from({ length: 80 }, () => toSphere(
        Math.random() * 25 + 35,
        (Math.random() - 0.5) * 40 + 15
      )),
      ...Array.from({ length: 180 }, () => toSphere(
        (Math.random() - 0.5) * 60 + 35,
        (Math.random() - 0.5) * 100 + 90
      )),
      ...Array.from({ length: 120 }, () => toSphere(
        Math.random() * 45 + 15,
        (Math.random() - 0.5) * 60 - 100
      )),
      ...Array.from({ length: 80 }, () => toSphere(
        (Math.random() - 0.5) * 55 - 15,
        (Math.random() - 0.5) * 40 - 60
      )),
      ...Array.from({ length: 50 }, () => toSphere(
        (Math.random() - 0.5) * 30 - 25,
        (Math.random() - 0.5) * 30 + 135
      )),
    ];

    const dotGeo = new THREE.BufferGeometry();
    const dotPos = new Float32Array(continentClusters.length * 3);
    continentClusters.forEach((v, i) => {
      dotPos[i * 3]     = v.x;
      dotPos[i * 3 + 1] = v.y;
      dotPos[i * 3 + 2] = v.z;
    });
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0xf97316, size: 0.018,
      transparent: true, opacity: 0.55,
    });
    globeGroup.add(new THREE.Points(dotGeo, dotMat));

    const markerPositions = [
      { lat: -1.94,  lon: 30.06, color: 0xf97316, r: 0.04 },
      { lat: 48.85,  lon: 2.35,  color: 0x3b82f6, r: 0.025 },
      { lat: 51.5,   lon: -0.12, color: 0x3b82f6, r: 0.025 },
      { lat: 40.71,  lon: -74.0, color: 0x3b82f6, r: 0.025 },
      { lat: 37.77,  lon: -122.4,color: 0x8b5cf6, r: 0.022 },
      { lat: 35.68,  lon: 139.7, color: 0x8b5cf6, r: 0.022 },
      { lat: -33.87, lon: 151.2, color: 0x10b981, r: 0.022 },
      { lat: 1.35,   lon: 103.8, color: 0x10b981, r: 0.022 },
      { lat: 25.2,   lon: 55.27, color: 0x8b5cf6, r: 0.022 },
    ];

    markerPositions.forEach(({ lat, lon, color, r }) => {
      const pos  = toSphere(lat, lon, 1.53);

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(r, 8, 8),
        new THREE.MeshBasicMaterial({ color })
      );
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
    });

    const kigali = toSphere(-1.94, 30.06, 1.54);
    const arcTargets = [
      toSphere(48.85, 2.35,   1.54),
      toSphere(40.71, -74.0,  1.54),
      toSphere(35.68, 139.7,  1.54),
      toSphere(1.35,  103.8,  1.54),
      toSphere(25.2,  55.27,  1.54),
    ];

    arcTargets.forEach((target, ti) => {
      const points = [];
      const segments = 50;
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const interp = new THREE.Vector3().lerpVectors(kigali, target, t).normalize().multiplyScalar(1.58 + Math.sin(t * Math.PI) * 0.2);
        points.push(interp);
      }
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: ti === 0 ? 0xf97316 : 0x3b82f6,
        transparent: true,
        opacity: 0.25,
      });
      globeGroup.add(new THREE.Line(arcGeo, arcMat));
    });

    const orbitRings = [];
    [
      { r: 1.8,  tube: 0.006, color: 0xf97316, tilt:  0.5,  speed:  0.3 },
      { r: 2.1,  tube: 0.004, color: 0x3b82f6, tilt: -0.8,  speed: -0.2 },
      { r: 2.45, tube: 0.003, color: 0x8b5cf6, tilt:  1.2,  speed:  0.15 },
    ].forEach(({ r, tube, color, tilt, speed }) => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(r, tube, 6, 80),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4 })
      );
      mesh.rotation.x = tilt;
      mesh.userData.speed = speed;
      globeGroup.add(mesh);
      orbitRings.push(mesh);
    });

    const pCount = 300;
    const pPos   = new Float32Array(pCount * 3);
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
    const particles = new THREE.Points(pGeo,
      new THREE.PointsMaterial({ color: 0xf97316, size: 0.014, transparent: true, opacity: 0.3 })
    );
    globeGroup.add(particles);

    // Position globe at center for full visibility
    globeGroup.position.set(0, 0, 0);
    scene.add(globeGroup);

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let t = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      t += 0.008;

      globeGroup.rotation.y += 0.0018;
      globeGroup.rotation.x = Math.sin(t * 0.15) * 0.08;

      globeGroup.children.forEach(child => {
        if (child.userData.pulse !== undefined) {
          child.userData.pulse += 0.04;
          const s = 1 + 0.4 * Math.abs(Math.sin(child.userData.pulse));
          child.scale.setScalar(s);
          child.material.opacity = 0.5 * (1 - Math.abs(Math.sin(child.userData.pulse)) * 0.7);
        }
      });

      orbitRings.forEach(r => { r.rotation.z += r.userData.speed * 0.012; });
      particles.rotation.y += 0.0008;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}

export default function Contact() {
  const { t } = useLanguage();
  const formRef = useRef();

  const [formData,     setFormData]     = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [copiedField,  setCopiedField]  = useState(null);
  const [focused,      setFocused]      = useState(null);
  const [activeTab,    setActiveTab]    = useState('contact');

  const contactInfo = [
    { id: 'email',    icon: Mail,   label: 'Email',    value: 'witnessfabrice@gmail.com', href: 'mailto:witnessfabrice@gmail.com' },
    { id: 'phone',    icon: Phone,  label: 'Phone',    value: '+250 783 568 337',          href: 'tel:+250783568337' },
    { id: 'location', icon: MapPin, label: 'Location', value: 'Kigali, Rwanda',            href: 'https://maps.google.com/?q=Kigali+Rwanda' },
  ];

  const socialLinks = [
    { icon: Github,    href: 'https://github.com/witfab-dev',          label: 'GitHub',    color: 'hover:bg-[#24292e]' },
    { icon: Linkedin,  href: 'https://linkedin.com/in/witnessfabrice', label: 'LinkedIn',  color: 'hover:bg-[#0A66C2]' },
    { icon: Twitter,   href: 'https://twitter.com/wit-fab',            label: 'Twitter',   color: 'hover:bg-[#1DA1F2]' },
    { icon: Instagram, href: 'https://instagram.com/witbri1',          label: 'Instagram', color: 'hover:bg-[#E4405F]' },
    { icon: Facebook,  href: 'https://facebook.com/witbrice',          label: 'Facebook',  color: 'hover:bg-[#1877F2]' },
  ];

  const quickReplies = [
    'I have a project idea',
    'Let\'s collaborate',
    'Need a consultation',
    'Job opportunity',
  ];

  const stats = [
    { icon: Globe, value: '15+', label: 'Countries' },
    { icon: Star, value: '50+', label: 'Projects' },
    { icon: Zap, value: '24h', label: 'Response' },
  ];

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const handleChange = (e) => {
    const key = e.target.name === 'from_name' ? 'name'
              : e.target.name === 'reply_to'  ? 'email'
              : e.target.name === 'subject'   ? 'subject'
              : 'message';
    setFormData(p => ({ ...p, [key]: e.target.value }));
  };

  const handleQuickReply = (message) => {
    setFormData(p => ({ ...p, message }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      emailjs.init(PUBLIC_KEY);
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const inputBase =
    'w-full px-4 py-3.5 rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur-sm border text-white placeholder:text-white/50 focus:outline-none transition-all duration-200 text-sm';

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 px-4 sm:px-6 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Full visible globe background */}
      <GlobeBackground />

      {/* Subtle overlay for readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="relative max-w-[1200px] mx-auto">

        {/* ══ HEADER ═══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
            <Globe size={12} />
            Get in touch
          </p>
          <h2 className="text-[clamp(36px,5vw,72px)] font-black leading-[0.93] tracking-tight text-white mb-4">
            Let's build something
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 italic">
              great together.
            </span>
          </h2>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Have a project in mind? Drop me a message — I reply within 24 hours, from Kigali to anywhere on the globe.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <stat.icon size={18} className="text-orange-500" />
                </div>
                <div className="text-white font-black text-lg">{stat.value}</div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ══ MAIN CONTENT ═════════════════════════════════════ */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── LEFT: Contact Info & Quick Links ────────────── */}
          <div className="space-y-6">

            {/* Contact cards */}
            {contactInfo.map((info, i) => (
              <motion.a
                key={info.id}
                href={info.href}
                target={info.id === 'location' ? '_blank' : undefined}
                rel={info.id === 'location' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center gap-4 p-4
                           bg-white/5 backdrop-blur-md
                           border border-white/10 rounded-2xl
                           hover:bg-orange-500/10 hover:border-orange-500/30
                           transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <info.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-orange-400 mb-0.5">{info.label}</p>
                  <p className="text-sm font-medium text-white truncate">{info.value}</p>
                </div>
                <Copy
                  size={14}
                  className={`shrink-0 text-white/30 group-hover:text-orange-400 transition-all cursor-pointer ${copiedField === info.id ? 'text-green-400' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    copy(info.value, info.id);
                  }}
                />
              </motion.a>
            ))}

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/50 mb-4">Follow me</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3, scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className={`w-11 h-11 flex items-center justify-center rounded-xl border border-white/10 text-white/50 ${color} hover:text-white hover:border-transparent transition-all duration-300`}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 px-4 py-3
                         bg-white/5 backdrop-blur-md
                         border border-white/10 rounded-2xl"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <p className="text-xs text-white/60">
                <span className="font-bold text-green-400">Available</span> for new projects & collaborations
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT: Contact Form ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-md
                       border border-white/10 rounded-2xl
                       p-6 sm:p-8"
          >
            {/* Form tabs */}
            <div className="flex gap-2 mb-6">
              {['contact', 'collaborate'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === tab
                      ? 'bg-orange-500 text-white'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-white/50 ml-1">
                    Your name
                  </label>
                  <input
                    name="from_name" type="text" required
                    value={formData.name} onChange={handleChange}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    placeholder="John Doe"
                    className={`${inputBase} ${focused === 'name'
                      ? 'border-orange-400 shadow-[0_0_0_3px_rgba(249,115,22,0.15)]'
                      : 'border-white/10'}`}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-white/50 ml-1">
                    Email address
                  </label>
                  <input
                    name="reply_to" type="email" required
                    value={formData.email} onChange={handleChange}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                    placeholder="you@example.com"
                    className={`${inputBase} ${focused === 'email'
                      ? 'border-orange-400 shadow-[0_0_0_3px_rgba(249,115,22,0.15)]'
                      : 'border-white/10'}`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-white/50 ml-1">
                  Subject
                </label>
                <input
                  name="subject" type="text"
                  value={formData.subject} onChange={handleChange}
                  onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                  placeholder="Project collaboration inquiry"
                  className={`${inputBase} ${focused === 'subject'
                    ? 'border-orange-400 shadow-[0_0_0_3px_rgba(249,115,22,0.15)]'
                    : 'border-white/10'}`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-white/50 ml-1">
                  Message
                </label>
                <textarea
                  name="message" required rows={5}
                  value={formData.message} onChange={handleChange}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                  placeholder="Tell me about your project…"
                  className={`${inputBase} resize-none ${focused === 'message'
                    ? 'border-orange-400 shadow-[0_0_0_3px_rgba(249,115,22,0.15)]'
                    : 'border-white/10'}`}
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {quickReplies.map((reply, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleQuickReply(reply)}
                        className="text-[10px] px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-orange-400 transition-all"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-white/40">
                    {formData.message.length} characters
                  </p>
                </div>
              </div>

              <button
                type="submit" disabled={isSubmitting}
                className={`group relative w-full py-4 font-bold text-sm rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed
                  ${submitStatus === 'error'   ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                  : submitStatus === 'success' ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25'}`}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.span key="loading" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…
                    </motion.span>
                  ) : submitStatus === 'success' ? (
                    <motion.span key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="flex items-center justify-center gap-2">
                      <Check size={16} /> Message sent successfully!
                    </motion.span>
                  ) : submitStatus === 'error' ? (
                    <motion.span key="err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="flex items-center justify-center gap-2">
                      <AlertCircle size={16} /> Failed to send — try again
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

              <div className="flex items-center justify-center gap-4 text-[10px] text-white/40">
                <span className="flex items-center gap-1">
                  <Shield size={10} /> Your info is secure
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={10} /> Reply within 24 hours
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
