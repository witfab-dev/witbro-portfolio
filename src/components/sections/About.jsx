// components/sections/About.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
  Layers, Globe, Zap, ShieldCheck, Terminal,
  ArrowUpRight, Sparkles, Coffee, Code2,
  BookOpen, Eye, Lightbulb, User,
} from 'lucide-react';

// ─── 3D Spider-Dot Portrait Component ────────────────────────────
function SpiderDotPortrait() {
  const mountRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mountRef.current) return;

    try {
      // --- 1. SETUP SCENE, CAMERA, & RENDERER ---
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x050a12); // Deep dark blue-black background
      scene.fog = new THREE.FogExp2(0x050a12, 0.008);

      const camera = new THREE.PerspectiveCamera(60, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
      camera.position.set(0, 0.8, 4.5);
      camera.lookAt(0, 0.6, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x050a12, 1);
      mountRef.current.appendChild(renderer.domElement);

      // --- 2. GENERATE ENHANCED PORTRAIT SHAPE (More realistic bust) ---
      const portraitGeometry = new THREE.BufferGeometry();
      const particleCount = 2400; // More particles for better detail
      const positions = new Float32Array(particleCount * 3);
      const colorsArray = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        let x, y, z;
        const randZone = Math.random();

        if (randZone < 0.45) {
          // HEAD: More realistic ellipsoid with facial features
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos((Math.random() * 2) - 1);
          
          // Asymmetric radii for more natural head shape
          let rx = 0.68;
          let ry = 0.92;
          let rz = 0.75;
          
          // Jaw shaping
          const jawEffect = Math.sin(phi * Math.PI) * 0.06;
          rx += jawEffect * 0.08;
          
          x = rx * Math.sin(phi) * Math.cos(theta);
          y = ry * Math.sin(phi) * Math.sin(theta) + 1.15;
          z = rz * Math.cos(phi);
          
          // Nose bridge protrusion
          const noseRegion = Math.abs(theta) < 0.5 && phi > 0.7 && phi < 1.15;
          if (noseRegion) {
            z += 0.07 * (1 - Math.abs(theta) / 0.8);
            x *= 0.97;
          }
          
          // Cheek emphasis
          if (phi > 0.75 && phi < 1.05 && Math.abs(theta) > 0.85 && Math.abs(theta) < 1.6) {
            x += 0.022 * Math.sin(theta * 2);
          }
        } else if (randZone < 0.58) {
          // NECK: Tapered cylinder with forward tilt
          const theta = Math.random() * Math.PI * 2;
          const rNeck = 0.3 * (0.8 + Math.random() * 0.35);
          x = rNeck * Math.cos(theta);
          y = Math.random() * 0.65 + 0.58;
          z = rNeck * Math.sin(theta) * 0.88 - 0.04;
          
          // Forward tilt
          const t = (y - 0.58) / 0.65;
          z -= t * 0.06;
        } else {
          // SHOULDERS / SUIT: Sculpted suit shape
          let rawX = (Math.random() - 0.5) * 3.0;
          let rawY = Math.random() * 1.4 - 0.4;
          
          // Taper effect for suit silhouette
          const taperFactor = Math.max(0, (rawY + 0.4) / 1.4);
          let widthFactor = 1.0;
          if (taperFactor < 0.45) {
            widthFactor = 0.68 + taperFactor * 0.45;
          } else {
            widthFactor = 0.88 + (taperFactor - 0.45) * 0.75;
          }
          
          let xFinal = rawX * widthFactor;
          
          // Clavicle definition
          if (rawY > 0.6 && Math.abs(rawX) > 0.85) {
            xFinal += 0.07 * Math.sin(rawX * 3.5);
          }
          
          x = xFinal;
          y = rawY + 0.45;
          
          // Chest depth
          let zDepth = (Math.random() - 0.5) * 0.72;
          if (y > 0.68 && y < 1.02 && Math.abs(x) < 0.82) {
            zDepth += 0.1;
          }
          z = zDepth * 0.88;
        }
        
        // Add subtle organic noise
        positions[i * 3] = x + (Math.random() - 0.5) * 0.01;
        positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.01;
        positions[i * 3 + 2] = z + (Math.random() - 0.5) * 0.01;
        
        // Vertex colors based on position (warm head, cool suit)
        if (y > 1.05) {
          // Head area - warm skin tones
          colorsArray[i * 3] = 0.85 + Math.random() * 0.12;
          colorsArray[i * 3 + 1] = 0.58 + Math.random() * 0.12;
          colorsArray[i * 3 + 2] = 0.48 + Math.random() * 0.1;
        } else if (y > 0.7) {
          // Neck transition
          colorsArray[i * 3] = 0.68 + Math.random() * 0.1;
          colorsArray[i * 3 + 1] = 0.52 + Math.random() * 0.1;
          colorsArray[i * 3 + 2] = 0.48 + Math.random() * 0.08;
        } else {
          // Suit - deep indigo/charcoal
          colorsArray[i * 3] = 0.28 + Math.random() * 0.12;
          colorsArray[i * 3 + 1] = 0.32 + Math.random() * 0.1;
          colorsArray[i * 3 + 2] = 0.52 + Math.random() * 0.1;
        }
      }

      portraitGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      portraitGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

      // --- 3. CREATE GLOWING PARTICLES ---
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.022,
        vertexColors: true,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending
      });

      const particleSystem = new THREE.Points(portraitGeometry, particleMaterial);
      scene.add(particleSystem);

      // --- 4. CREATE SPIDER-WEB CONNECTIONS ---
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x4a6fa5,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending
      });

      let lineSegmentsMesh = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial);
      scene.add(lineSegmentsMesh);

      // Calculate connections
      function updateSpiderWeb() {
        const posArray = portraitGeometry.attributes.position.array;
        const connections = [];
        const maxDist = 0.27;

        for (let i = 0; i < particleCount; i++) {
          const ix = i * 3;
          const ix1 = posArray[ix];
          const iy1 = posArray[ix + 1];
          const iz1 = posArray[ix + 2];
          
          for (let j = i + 1; j < particleCount; j++) {
            const jx = j * 3;
            const dx = ix1 - posArray[jx];
            const dy = iy1 - posArray[jx + 1];
            const dz = iz1 - posArray[jx + 2];
            const distSq = dx * dx + dy * dy + dz * dz;
            
            if (distSq < maxDist * maxDist) {
              connections.push(
                ix1, iy1, iz1,
                posArray[jx], posArray[jx + 1], posArray[jx + 2]
              );
            }
          }
        }

        const newGeo = new THREE.BufferGeometry();
        newGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(connections), 3));
        scene.remove(lineSegmentsMesh);
        if (lineSegmentsMesh.geometry) lineSegmentsMesh.geometry.dispose();
        lineSegmentsMesh = new THREE.LineSegments(newGeo, lineMaterial);
        scene.add(lineSegmentsMesh);
      }

      // --- 5. BACKGROUND PARTICLES ---
      const bgParticleCount = 600;
      const bgGeo = new THREE.BufferGeometry();
      const bgPositions = new Float32Array(bgParticleCount * 3);
      for (let i = 0; i < bgParticleCount; i++) {
        bgPositions[i * 3] = (Math.random() - 0.5) * 12;
        bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
        bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 6;
      }
      bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));
      const bgParticleMat = new THREE.PointsMaterial({
        color: 0x88aaff,
        size: 0.008,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending
      });
      const bgStars = new THREE.Points(bgGeo, bgParticleMat);
      scene.add(bgStars);

      // --- 6. LIGHTING FOR AMBIENCE ---
      const ambientLight = new THREE.AmbientLight(0x22223b, 0.4);
      scene.add(ambientLight);
      
      const fillLight = new THREE.PointLight(0xffaa66, 0.5);
      fillLight.position.set(2, 2, 2);
      scene.add(fillLight);

      // --- 7. INTERACTION & ANIMATION ---
      const mouse = { x: 0, y: 0 };
      let targetRotationX = 0;
      let targetRotationY = 0;
      let time = 0;

      const onMouseMove = (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        targetRotationY = mouse.x * 0.4;
        targetRotationX = mouse.y * 0.25;
      };
      
      renderer.domElement.addEventListener('mousemove', onMouseMove);

      // Initial web generation
      setTimeout(() => updateSpiderWeb(), 200);

      // Animation loop
      let animationId;
      function animate() {
        animationId = requestAnimationFrame(animate);
        time += 0.016;

        // Smooth camera follow
        particleSystem.rotation.y += (targetRotationY - particleSystem.rotation.y) * 0.06;
        particleSystem.rotation.x += (targetRotationX - particleSystem.rotation.x) * 0.06;
        
        if (lineSegmentsMesh) {
          lineSegmentsMesh.rotation.copy(particleSystem.rotation);
        }

        // Subtle background particle drift
        bgStars.rotation.y += 0.0005;
        bgStars.rotation.x += 0.0003;

        // Pulse particle size slightly
        const pulse = 0.022 + Math.sin(time * 3) * 0.002;
        particleMaterial.size = pulse;

        renderer.render(scene, camera);
      }

      animate();

      // Handle resize
      const handleResize = () => {
        if (!mountRef.current) return;
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      
      window.addEventListener('resize', handleResize);
      setIsReady(true);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        renderer.domElement.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(animationId);
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        if (lineSegmentsMesh && lineSegmentsMesh.geometry) lineSegmentsMesh.geometry.dispose();
        portraitGeometry.dispose();
      };
    } catch (err) {
      console.error('3D Portrait Error:', err);
      setError(err);
    }
  }, []);

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#080c14]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <Code2 size={24} className="text-orange-500 opacity-60" />
          </div>
          <p className="text-[10px] font-mono text-stone-600">3D portrait preview unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={mountRef} className="absolute inset-0 cursor-crosshair" style={{ touchAction: 'none' }}>
      {!isReady && (
        <div className="absolute inset-0 bg-[#080c14] flex items-center justify-center">
          <div className="flex gap-1">
            {[0, 0.15, 0.3].map(d => (
              <motion.span
                key={d}
                className="w-1.5 h-1.5 rounded-full bg-orange-500/50"
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: d }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab content ───────────────────────────────────────────────
const TABS = [
  { id: 'story',      label: 'Story',      icon: BookOpen },
  { id: 'philosophy', label: 'Philosophy', icon: Lightbulb },
  { id: 'vision',     label: 'Vision',     icon: Eye },
];

const TAB_CONTENT = {
  story: (
    <div className="space-y-4 text-sm leading-relaxed text-stone-400">
      <p>
        I&apos;m a{' '}
        <span className="font-bold text-stone-100">Full-Stack Developer</span>
        {' '}and Level 5 Software Student, bridging the gap between complex logic and fluid user
        interfaces. My journey started with a deep curiosity for systems — how things connect,
        communicate, and scale.
      </p>
      <p>
        I mastered the{' '}
        <span className="text-orange-500 font-semibold underline decoration-orange-500/30 underline-offset-4">
          React, Node.js &amp; MySQL
        </span>{' '}
        stack and have since expanded into cloud infrastructure, 3D web experiences, and AI
        integrations. Based in{' '}
        <span className="font-semibold text-stone-100">Kigali, Rwanda</span>,
        building products used across six countries.
      </p>
      <p>
        I believe in &quot;Project Archaeology&quot; — digging into the root of a problem before
        writing a single line of code. Whether it&apos;s a marketplace or a school management
        system, my goal is software that feels genuinely human.
      </p>
    </div>
  ),
  philosophy: (
    <div className="space-y-4 text-sm leading-relaxed text-stone-400">
      <p>
        Great software is invisible. It solves problems so naturally that users never have to
        think about the tool — only the outcome. That philosophy drives every decision I make,
        from API design to micro-animation timing.
      </p>
      <p>
        I build with{' '}
        <span className="font-bold text-stone-100">performance as a constraint</span>,
        not an afterthought. Sub-2.5s LCP, accessible markup, and offline-ready architectures
        are non-negotiable starting points, not bonus features.
      </p>
      <p>
        Collaboration &gt; isolation. The best products emerge from honest feedback loops, clear
        documentation, and a team that challenges each other respectfully. I&apos;d rather ship
        a well-considered v1 than a perfect idea that never ships.
      </p>
    </div>
  ),
  vision: (
    <div className="space-y-4 text-sm leading-relaxed text-stone-400">
      <p>
        My vision is to help East Africa produce world-class software talent and products.
        Rwanda&apos;s tech ecosystem is growing rapidly — I want to be part of the generation
        that puts it on the global map.
      </p>
      <p>
        In the next three years I&apos;m focused on{' '}
        <span className="font-bold text-stone-100">AI-native product development</span>,
        building tools that lower the barrier to entrepreneurship for local founders, and
        mentoring the next generation of developers in my community.
      </p>
      <p>
        Long-term: a venture-backed product studio operating from Kigali — shipping software
        that solves real African problems with world-class execution.
      </p>
    </div>
  ),
};

const PILLARS = [
  {
    icon: Zap,
    title: 'Performance First',
    desc: 'Optimising for sub-2.5s LCP. Speed is a feature and a first principle.',
    color: '#f97316',
  },
  {
    icon: Layers,
    title: 'Scalable Architecture',
    desc: 'MERN + API-first design for systems that grow without breaking.',
    color: '#3b82f6',
  },
  {
    icon: Code2,
    title: 'Visual Craft',
    desc: 'Figma precision married to Three.js & Framer Motion storytelling.',
    color: '#8b5cf6',
  },
];

const STATS = [
  { icon: ShieldCheck, label: 'Proficiency', value: 'Level 5'    },
  { icon: Zap,         label: 'Focus',       value: 'Full-Stack'  },
  { icon: Globe,       label: 'Location',    value: 'Kigali, RW'  },
];

// ─── Main component ────────────────────────────────────────────
export default function About() {
  const [activeTab, setActiveTab] = useState('story');

  return (
    <section
      id="about"
      className="relative py-24 px-4 sm:px-6 overflow-hidden
                 bg-[#0c0b0a] transition-colors duration-500"
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-40 -right-32 w-[420px] h-[420px] rounded-full bg-orange-500/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 w-[360px] h-[360px] rounded-full bg-blue-500/[0.04] blur-3xl" />

      <div className="relative max-w-[1200px] mx-auto">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
              <span className="block w-5 h-px bg-orange-500" />
              Identity 2026
            </p>
            <h2 className="text-[clamp(38px,5.5vw,64px)] font-black leading-[0.93] tracking-tight text-stone-100">
              Crafting the{' '}
              <span className="text-orange-500 italic">Next-Gen</span>
              <br />Web.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden md:block text-sm leading-relaxed text-stone-500 max-w-xs text-right"
          >
            Based in Rwanda, building worldwide. Specialising in robust backend logic
            and immersive frontend motion.
          </motion.p>
        </div>

        {/* ── Main grid ──────────────────────────────────────── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* ── LEFT — 3D Spider-Dot Portrait ─────────────────── */}
          <div className="lg:col-span-5 flex flex-col gap-5">

            {/* 3D card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square rounded-3xl overflow-hidden
                         border border-stone-800/60 bg-[#080c14]"
            >
              <SpiderDotPortrait />

              {/* Vignette */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.4) 100%)' }}
              />

              {/* Corner label */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 z-10 pointer-events-none">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-orange-400 opacity-70" />
                  <span className="relative rounded-full h-1.5 w-1.5 bg-orange-500" />
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">
                  Spider-Dot Portrait
                </span>
              </div>

              {/* Float badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-5 right-5 flex items-center gap-3 px-3.5 py-2.5
                           rounded-2xl bg-white/10 backdrop-blur-md border border-white/20
                           shadow-xl z-10 pointer-events-none"
              >
                <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
                  <User size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/60">Interactive</p>
                  <p className="text-[11px] font-bold text-white leading-tight">3D Portrait</p>
                </div>
              </motion.div>

              <p className="absolute bottom-5 left-5 text-[9px] font-mono text-white/25 z-10 pointer-events-none">
                move cursor to rotate
              </p>
            </motion.div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {STATS.map(({ icon: Ic, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group flex flex-col items-center gap-1.5 p-4 rounded-2xl text-center
                             bg-[#161513]
                             border border-stone-800/60
                             hover:border-orange-400 transition-all duration-300"
                >
                  <Ic size={15} className="text-stone-500 group-hover:text-orange-500 transition-colors" />
                  <p className="text-[9px] font-bold uppercase tracking-widest text-stone-600">{label}</p>
                  <p className="text-[11px] font-black text-stone-100">{value}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — content ───────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col gap-8">

            {/* Tabs */}
            <div>
              <div className="flex gap-1 p-1 rounded-xl bg-stone-800/40 w-fit mb-6">
                {TABS.map(({ id, label, icon: Ic }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px]
                                font-bold uppercase tracking-widest transition-all duration-250
                      ${activeTab === id
                        ? 'text-white'
                        : 'text-stone-500 hover:text-stone-300'
                      }`}
                  >
                    {activeTab === id && (
                      <motion.div
                        layoutId="about-tab-pill"
                        className="absolute inset-0 bg-orange-500 rounded-lg shadow-md shadow-orange-500/25"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Ic size={12} className="relative z-10" />
                    <span className="relative z-10">{label}</span>
                  </button>
                ))}
              </div>

              <div className="min-h-[168px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28 }}
                  >
                    {TAB_CONTENT[activeTab]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Pillars */}
            <div className="grid sm:grid-cols-3 gap-4">
              {PILLARS.map(({ icon: Ic, title, desc, color }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group relative p-5 rounded-2xl
                             bg-[#161513]
                             border border-stone-800/60
                             hover:border-orange-400
                             hover:shadow-[0_0_0_1px_rgba(249,115,22,0.25)]
                             transition-all duration-300"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                  >
                    <Ic size={16} style={{ color }} />
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-stone-100 mb-2">
                    {title}
                  </h4>
                  <p className="text-[11px] leading-relaxed text-stone-500
                                group-hover:text-stone-400 transition-colors">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl
                         bg-[#161513]
                         border border-stone-800/60
                         hover:border-orange-400 transition-all duration-300"
            >
              {/* Avatars */}
              <div className="flex -space-x-2.5 shrink-0">
                {[Coffee, Coffee, Sparkles].map((Ic, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-[#161513]
                               bg-stone-800 flex items-center justify-center"
                  >
                    <Ic size={13} className={i === 2 ? 'text-orange-500' : 'text-stone-500'} />
                  </div>
                ))}
              </div>

              <p className="flex-1 text-xs text-stone-500 text-center sm:text-left">
                <span className="font-bold text-stone-100">Available for hire</span>
                {' '}— open to freelance, collaborations, and exciting full-time roles.
              </p>

              <a
                href="#contact"
                className="group/cta shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-xl
                           bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold
                           uppercase tracking-widest transition-all shadow-md shadow-orange-500/20"
              >
                Let&apos;s Talk
                <ArrowUpRight
                  size={13}
                  className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform"
                />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
