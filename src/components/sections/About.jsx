import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  Layers, Globe, Zap, ShieldCheck, Terminal,
  ArrowUpRight, Sparkles, Coffee, Code2,
  BookOpen, Eye, Lightbulb,
} from 'lucide-react';

// ─── 3D Architecture Scene ─────────────────────────────────────
function ArchScene() {
  const mountRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth;
    const H = el.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Scene / Camera
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 7);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const dOrange = new THREE.DirectionalLight(0xf97316, 2.8);
    dOrange.position.set(4, 6, 4);
    scene.add(dOrange);
    const dBlue = new THREE.DirectionalLight(0x3b82f6, 1.8);
    dBlue.position.set(-4, -2, 3);
    scene.add(dBlue);
    const pLight = new THREE.PointLight(0xf97316, 3, 12);
    pLight.position.set(0, 0, 3);
    scene.add(pLight);

    // Materials
    const mOrange = new THREE.MeshStandardMaterial({
      color: 0xf97316, metalness: 0.8, roughness: 0.2,
      emissive: 0xf97316, emissiveIntensity: 0.15,
    });
    const mBlue = new THREE.MeshStandardMaterial({
      color: 0x3b82f6, metalness: 0.9, roughness: 0.1,
      emissive: 0x3b82f6, emissiveIntensity: 0.12,
    });
    const mViolet = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6, metalness: 0.85, roughness: 0.15,
      emissive: 0x8b5cf6, emissiveIntensity: 0.1,
    });
    const mWireO = new THREE.MeshBasicMaterial({ color: 0xf97316, wireframe: true, opacity: 0.12, transparent: true });
    const mWireB = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, opacity: 0.10, transparent: true });
    const mGlass = new THREE.MeshStandardMaterial({
      color: 0xffffff, metalness: 0.1, roughness: 0,
      transparent: true, opacity: 0.07, side: THREE.DoubleSide,
    });

    const group = new THREE.Group();

    // Hex base platform
    const hexGeo = new THREE.CylinderGeometry(1.2, 1.4, 0.12, 6);
    group.add(new THREE.Mesh(hexGeo, mBlue)).position.y = -1.8;
    const hexWire = new THREE.Mesh(hexGeo, mWireB);
    hexWire.position.y = -1.8;
    group.add(hexWire);

    // Main tower
    const towerGeo = new THREE.BoxGeometry(0.7, 2.8, 0.7);
    group.add(new THREE.Mesh(towerGeo, mOrange));
    group.add(new THREE.Mesh(towerGeo, mWireO));

    // Crystal top
    const crystalGeo = new THREE.OctahedronGeometry(0.7, 0);
    const crystal = new THREE.Mesh(crystalGeo, mOrange);
    crystal.position.y = 1.85;
    group.add(crystal);
    const crystalWire = new THREE.Mesh(crystalGeo, mWireO);
    crystalWire.position.y = 1.85;
    group.add(crystalWire);

    // Floating modules
    const moduleData = [
      { x: -1.8, y:  0.6, z:  0,   s: 0.38, m: mViolet, geo: 'tetra'  },
      { x:  1.8, y:  0.3, z:  0.2, s: 0.32, m: mBlue,   geo: 'ico'    },
      { x: -1.4, y: -0.8, z:  0.4, s: 0.28, m: mOrange, geo: 'tetra'  },
      { x:  1.5, y: -0.6, z: -0.3, s: 0.35, m: mViolet, geo: 'ico'    },
      { x:  0.2, y:  1.5, z: -1.2, s: 0.25, m: mBlue,   geo: 'tetra'  },
      { x: -0.4, y: -1.4, z: -0.8, s: 0.22, m: mOrange, geo: 'ico'    },
    ];
    const floaters = [];
    moduleData.forEach(({ x, y, z, s, m, geo }) => {
      const g = geo === 'tetra'
        ? new THREE.TetrahedronGeometry(s, 0)
        : new THREE.IcosahedronGeometry(s, 0);
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(x, y, z);
      mesh.userData = { ox: x, oy: y, oz: z, sp: 0.4 + Math.random() * 0.8, ph: Math.random() * Math.PI * 2 };
      group.add(mesh);
      floaters.push(mesh);
    });

    // Orbital rings
    const rings = [];
    [
      { r: 2.2, tube: 0.012, color: 0xf97316, tilt:  0.4, speed:  0.6  },
      { r: 2.8, tube: 0.009, color: 0x3b82f6, tilt: -0.6, speed: -0.4  },
      { r: 3.4, tube: 0.007, color: 0x8b5cf6, tilt:  1.1, speed:  0.25 },
    ].forEach(({ r, tube, color, tilt, speed }) => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(r, tube, 8, 80),
        new THREE.MeshBasicMaterial({ color, opacity: 0.55, transparent: true })
      );
      mesh.rotation.x = tilt;
      mesh.userData.speed = speed;
      group.add(mesh);
      rings.push(mesh);
    });

    // Particle field
    const pCount = 200;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      const r  = 2.5 + Math.random() * 3;
      pPos[i*3]   = r * Math.sin(ph) * Math.cos(th);
      pPos[i*3+1] = r * Math.sin(ph) * Math.sin(th);
      pPos[i*3+2] = r * Math.cos(ph);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(pGeo,
      new THREE.PointsMaterial({ color: 0xf97316, size: 0.028, transparent: true, opacity: 0.45 })
    );
    group.add(particles);

    // Connecting lines
    const lMat = new THREE.LineBasicMaterial({ color: 0xf97316, opacity: 0.12, transparent: true });
    const lPts = [];
    for (let i = 0; i < 4; i++)
      for (let j = i + 1; j < 4; j++) {
        lPts.push(new THREE.Vector3(moduleData[i].x, moduleData[i].y, moduleData[i].z));
        lPts.push(new THREE.Vector3(moduleData[j].x, moduleData[j].y, moduleData[j].z));
      }
    group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(lPts), lMat));

    // Glass dome
    const dome = new THREE.Mesh(new THREE.SphereGeometry(3.8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2), mGlass);
    dome.position.y = -1.8;
    group.add(dome);

    scene.add(group);

    // Mouse
    let mx = 0, my = 0;
    const onMouse = (e) => {
      const r = el.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      my = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    };
    el.addEventListener('mousemove', onMouse);

    // Resize
    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animate
    let t = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      t += 0.012;

      group.rotation.y  += 0.004;
      group.rotation.x  += (my * 0.25 - group.rotation.x) * 0.05;
      group.rotation.y  += (mx * 0.25 - group.rotation.y) * 0.02;

      const pulse = 1 + 0.06 * Math.sin(t * 2);
      crystal.scale.setScalar(pulse);
      crystalWire.scale.setScalar(pulse * 1.05);

      floaters.forEach(m => {
        m.position.y = m.userData.oy + Math.sin(t * m.userData.sp + m.userData.ph) * 0.18;
        m.rotation.y += 0.008;
        m.rotation.x += 0.005;
      });

      rings.forEach(r => { r.rotation.z += r.userData.speed * 0.01; });
      particles.rotation.y += 0.0015;
      particles.rotation.x += 0.0008;
      pLight.intensity = 2.5 + 1.5 * Math.sin(t * 1.5);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      el.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full cursor-crosshair" style={{ touchAction: 'none' }} />;
}

// ─── Static data ───────────────────────────────────────────────
const TABS = [
  { id: 'story',      labelKey: 'storyTab',      icon: BookOpen },
  { id: 'philosophy', labelKey: 'philosophyTab', icon: Lightbulb },
  { id: 'vision',     labelKey: 'visionTab',     icon: Eye },
];

const TAB_CONTENT = {
  story: (
    <div className="space-y-4 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
      <p>{t('storyContent1')}</p>
      <p>{t('storyContent2')}</p>
      <p>{t('storyContent3')}</p>
    </div>
  ),
  philosophy: (
    <div className="space-y-4 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
      <p>{t('philosophyContent1')}</p>
      <p>{t('philosophyContent2')}</p>
      <p>{t('philosophyContent3')}</p>
    </div>
  ),
  vision: (
    <div className="space-y-4 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
      <p>{t('visionContent1')}</p>
      <p>{t('visionContent2')}</p>
      <p>{t('visionContent3')}</p>
    </div>
  ),
};

const PILLARS = [
  { icon: Zap,    titleKey: 'performanceFirst',    descKey: 'performanceDesc', color: '#f97316' },
  { icon: Layers, titleKey: 'scalableArchitecture', descKey: 'scalableDesc',          color: '#3b82f6' },
  { icon: Code2,  titleKey: 'visualCraft',          descKey: 'visualDesc',        color: '#8b5cf6' },
];

const STATS = [
  { icon: ShieldCheck, labelKey: 'proficiency', valueKey: 'level5'   },
  { icon: Zap,         labelKey: 'focus',       valueKey: 'fullStack' },
  { icon: Globe,       labelKey: 'location',    valueKey: 'kigaliRw' },
];

// ─── Main ──────────────────────────────────────────────────────
export default function About() {  const { t } = useLanguage();  const [activeTab, setActiveTab] = useState('story');

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 overflow-hidden bg-stone-100 dark:bg-[#0c0b0a] transition-colors duration-500">
      <div className="pointer-events-none absolute -top-40 -right-32 w-[420px] h-[420px] rounded-full bg-orange-500/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 w-[360px] h-[360px] rounded-full bg-blue-500/[0.04] blur-3xl" />

      <div className="relative max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
              <span className="block w-5 h-px bg-orange-500" />{t('aboutIdentity')}
            </p>
            <h2 className="text-[clamp(38px,5.5vw,64px)] font-black leading-[0.93] tracking-tight text-stone-900 dark:text-stone-100">
              {t('craftingNextGenWeb')}
            </h2>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden md:block text-sm leading-relaxed text-stone-500 dark:text-stone-500 max-w-xs text-right">
            {t('aboutSubtitle')}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* LEFT — 3D Scene */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square rounded-3xl overflow-hidden border border-stone-800/60 bg-[#080c14]"
            >
              <div className="absolute inset-0"><ArchScene /></div>

              {/* Vignette */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.4) 100%)' }} />

              {/* Label */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 z-10">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-orange-400 opacity-70" />
                  <span className="relative rounded-full h-1.5 w-1.5 bg-orange-500" />
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">{t('architecture3d')}</span>
              </div>

              {/* Float badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-5 right-5 flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl z-10"
              >
                <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
                  <Terminal size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/60">{t('buildingNow')}</p>
                  <p className="text-[11px] font-bold text-white leading-tight">{t('studentManager')}</p>
                </div>
              </motion.div>

              <p className="absolute bottom-5 left-5 text-[9px] font-mono text-white/25 z-10 pointer-events-none">
                {t('moveCursor')}
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {STATS.map(({ icon: Ic, labelKey, valueKey }, i) => (
                <motion.div key={t(labelKey)} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="group flex flex-col items-center gap-1.5 p-4 rounded-2xl text-center bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800/60 hover:border-orange-400 transition-all duration-300">
                  <Ic size={15} className="text-stone-400 group-hover:text-orange-500 transition-colors" />
                  <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-600">{t(labelKey)}</p>
                  <p className="text-[11px] font-black text-stone-900 dark:text-stone-100">{t(valueKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7 flex flex-col gap-8">

            {/* Tabs */}
            <div>
              <div className="flex gap-1 p-1 rounded-xl bg-stone-200/60 dark:bg-stone-800/40 w-fit mb-6">
                {TABS.map(({ id, labelKey, icon: Ic }) => (
                  <button key={id} onClick={() => setActiveTab(id)}
                    className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all duration-250
                      ${activeTab === id ? 'text-white' : 'text-stone-500 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'}`}>
                    {activeTab === id && (
                      <motion.div layoutId="tab-pill" className="absolute inset-0 bg-orange-500 rounded-lg shadow-md shadow-orange-500/25"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                    )}
                    <Ic size={12} className="relative z-10" />
                    <span className="relative z-10">{t(labelKey)}</span>
                  </button>
                ))}
              </div>

              <div className="min-h-[168px]">
                <AnimatePresence mode="wait">
                  <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28 }}>
                    {TAB_CONTENT[activeTab]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Pillars */}
            <div className="grid sm:grid-cols-3 gap-4">
              {PILLARS.map(({ icon: Ic, titleKey, descKey, color }, i) => (
                <motion.div key={t(titleKey)} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group relative p-5 rounded-2xl bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800/60 hover:border-orange-400 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.25)] transition-all duration-300">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <Ic size={16} style={{ color }} />
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-2">{t(titleKey)}</h4>
                  <p className="text-[11px] leading-relaxed text-stone-500 dark:text-stone-500 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors">{t(descKey)}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
              className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800/60 hover:border-orange-400 transition-all duration-300">
              <div className="flex -space-x-2.5 shrink-0">
                {[Coffee, Coffee, Sparkles].map((Ic, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white dark:border-[#161513] bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                    <Ic size={13} className={i === 2 ? 'text-orange-500' : 'text-stone-400'} />
                  </div>
                ))}
              </div>
              <p className="flex-1 text-xs text-stone-500 dark:text-stone-500 text-center sm:text-left">
                <span className="font-bold text-stone-900 dark:text-stone-100">Available for hire</span>{' '}— open to freelance, collaborations, and exciting full-time roles.
              </p>
              <a href="#contact" className="group/cta shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold uppercase tracking-widest transition-all shadow-md shadow-orange-500/20">
                Let&apos;s Talk
                <ArrowUpRight size={13} className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
