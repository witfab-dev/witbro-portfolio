// components/sections/About.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
  Layers, Globe, Zap, ShieldCheck, Terminal,
  ArrowUpRight, Sparkles, Coffee, Code2,
  BookOpen, Eye, Lightbulb, User, Laptop, Monitor,
} from 'lucide-react';

// ─── 3D Realistic Developer Portrait Component ────────────────────────────
function RealisticDeveloperPortrait() {
  const mountRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mountRef.current) return;

    try {
      // --- 1. SETUP SCENE, CAMERA, & RENDERER ---
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x050a12);
      scene.fog = new THREE.FogExp2(0x050a12, 0.006);

      const camera = new THREE.PerspectiveCamera(55, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
      camera.position.set(0, 1.2, 5.2);
      camera.lookAt(0, 0.9, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x050a12, 1);
      mountRef.current.appendChild(renderer.domElement);

      // --- 2. CREATE A MORE REALISTIC HUMAN BUST WITH DETAILS ---
      const portraitGeometry = new THREE.BufferGeometry();
      const particleCount = 3500;
      const positions = new Float32Array(particleCount * 3);
      const colorsArray = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        let x, y, z;
        const randZone = Math.random();

        if (randZone < 0.42) {
          // HEAD - More anatomically accurate
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos((Math.random() * 2) - 1);
          
          // Anatomically correct proportions
          let rx = 0.72;
          let ry = 0.96;
          let rz = 0.78;
          
          // Jaw definition
          const jawEffect = Math.sin(phi * Math.PI) * 0.07;
          rx += jawEffect * 0.1;
          
          // Forehead shaping
          const foreheadEffect = Math.sin(phi * Math.PI * 1.5) * 0.03;
          ry += foreheadEffect;
          
          x = rx * Math.sin(phi) * Math.cos(theta);
          y = ry * Math.sin(phi) * Math.sin(theta) + 1.22;
          z = rz * Math.cos(phi) * 0.96;
          
          // Nose bridge (more pronounced)
          const noseRegion = Math.abs(theta) < 0.55 && phi > 0.68 && phi < 1.18;
          if (noseRegion) {
            z += 0.09 * (1 - Math.abs(theta) / 0.85);
            x *= 0.96;
          }
          
          // Cheekbones
          if (phi > 0.72 && phi < 1.08 && Math.abs(theta) > 0.9 && Math.abs(theta) < 1.7) {
            x += 0.028 * Math.sin(theta * 2.5);
            z -= 0.015;
          }
          
          // Chin definition
          if (phi > 1.25 && phi < 1.55 && Math.abs(theta) < 0.8) {
            z += 0.035;
            y -= 0.02;
          }
        } else if (randZone < 0.55) {
          // NECK - Muscular/defined neck
          const theta = Math.random() * Math.PI * 2;
          const rNeck = 0.34 * (0.82 + Math.random() * 0.32);
          x = rNeck * Math.cos(theta);
          y = Math.random() * 0.68 + 0.58;
          z = rNeck * Math.sin(theta) * 0.85 - 0.06;
          
          // Forward tilt for natural posture
          const t = (y - 0.58) / 0.68;
          z -= t * 0.09;
          
          // Adam's apple hint
          if (Math.abs(theta) < 0.4 && y > 0.85 && y < 1.05) {
            z += 0.025;
          }
        } else {
          // SHOULDERS & TORSO - Athletic developer build with laptop posture
          let rawX = (Math.random() - 0.5) * 3.2;
          let rawY = Math.random() * 1.5 - 0.45;
          
          // Taper effect for athletic build
          const taperFactor = Math.max(0, (rawY + 0.45) / 1.5);
          let widthFactor = 1.0;
          if (taperFactor < 0.5) {
            widthFactor = 0.65 + taperFactor * 0.5;
          } else {
            widthFactor = 0.9 + (taperFactor - 0.5) * 0.7;
          }
          
          let xFinal = rawX * widthFactor;
          
          // Shoulder definition
          if (rawY > 0.55 && Math.abs(rawX) > 1.1) {
            xFinal += 0.09 * Math.sin(rawX * 3);
          }
          
          // Chest definition
          if (rawY > 0.4 && rawY < 0.95 && Math.abs(rawX) < 0.9) {
            xFinal *= 0.95;
          }
          
          x = xFinal;
          y = rawY + 0.48;
          
          // Chest depth
          let zDepth = (Math.random() - 0.5) * 0.78;
          if (y > 0.55 && y < 1.08 && Math.abs(x) < 0.85) {
            zDepth += 0.12;
          }
          z = zDepth * 0.92;
        }
        
        // Organic noise
        positions[i * 3] = x + (Math.random() - 0.5) * 0.012;
        positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.012;
        positions[i * 3 + 2] = z + (Math.random() - 0.5) * 0.012;
        
        // Sophisticated vertex colors
        if (y > 1.08) {
          // Head - warm skin with subtle variation
          colorsArray[i * 3] = 0.88 + Math.random() * 0.1;
          colorsArray[i * 3 + 1] = 0.62 + Math.random() * 0.1;
          colorsArray[i * 3 + 2] = 0.52 + Math.random() * 0.08;
        } else if (y > 0.75) {
          // Neck transition
          colorsArray[i * 3] = 0.72 + Math.random() * 0.09;
          colorsArray[i * 3 + 1] = 0.58 + Math.random() * 0.09;
          colorsArray[i * 3 + 2] = 0.52 + Math.random() * 0.07;
        } else {
          // Professional attire - dark navy with subtle sheen
          colorsArray[i * 3] = 0.25 + Math.random() * 0.1;
          colorsArray[i * 3 + 1] = 0.30 + Math.random() * 0.08;
          colorsArray[i * 3 + 2] = 0.48 + Math.random() * 0.1;
        }
      }

      portraitGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      portraitGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

      // --- 3. PARTICLES WITH GLOW EFFECT ---
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.019,
        vertexColors: true,
        transparent: true,
        opacity: 0.94,
        blending: THREE.AdditiveBlending
      });

      const particleSystem = new THREE.Points(portraitGeometry, particleMaterial);
      scene.add(particleSystem);

      // --- 4. ENHANCED SPIDER-WEB CONNECTIONS (Like neural network) ---
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x5a8fcf,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending
      });

      let lineSegmentsMesh = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial);
      scene.add(lineSegmentsMesh);

      function updateSpiderWeb() {
        const posArray = portraitGeometry.attributes.position.array;
        const connections = [];
        const maxDist = 0.29;

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

      // --- 5. CODE RAIN EFFECT (Developer vibe) ---
      const codeRainCount = 150;
      const codeRainPositions = new Float32Array(codeRainCount * 3);
      const codeRainSpeeds = [];
      for (let i = 0; i < codeRainCount; i++) {
        codeRainPositions[i * 3] = (Math.random() - 0.5) * 8;
        codeRainPositions[i * 3 + 1] = Math.random() * 5 - 1;
        codeRainPositions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3;
        codeRainSpeeds.push(0.005 + Math.random() * 0.015);
      }
      const codeRainGeo = new THREE.BufferGeometry();
      codeRainGeo.setAttribute('position', new THREE.BufferAttribute(codeRainPositions, 3));
      const codeRainMat = new THREE.PointsMaterial({
        color: 0x00ff88,
        size: 0.008,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
      });
      const codeRain = new THREE.Points(codeRainGeo, codeRainMat);
      scene.add(codeRain);

      // --- 6. BACKGROUND TECH PARTICLES ---
      const bgParticleCount = 800;
      const bgGeo = new THREE.BufferGeometry();
      const bgPositions = new Float32Array(bgParticleCount * 3);
      for (let i = 0; i < bgParticleCount; i++) {
        bgPositions[i * 3] = (Math.random() - 0.5) * 14;
        bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 5;
      }
      bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));
      const bgParticleMat = new THREE.PointsMaterial({
        color: 0x4a9eff,
        size: 0.006,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending
      });
      const bgStars = new THREE.Points(bgGeo, bgParticleMat);
      scene.add(bgStars);

      // --- 7. AMBIENT LIGHTING ---
      const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.5);
      scene.add(ambientLight);
      
      const keyLight = new THREE.PointLight(0xff9966, 0.8);
      keyLight.position.set(3, 4, 3);
      scene.add(keyLight);
      
      const fillLight = new THREE.PointLight(0x4466cc, 0.5);
      fillLight.position.set(-2, 2, 4);
      scene.add(fillLight);
      
      const rimLight = new THREE.PointLight(0xff66cc, 0.4);
      rimLight.position.set(1, 1, -3);
      scene.add(rimLight);

      // --- 8. FLOATING CODE SNIPPETS (spheres representing tech) ---
      const techOrbs = [];
      const techColors = [0xff4444, 0x44ff44, 0x4444ff, 0xffaa44, 0xff44ff];
      for (let i = 0; i < 30; i++) {
        const orb = new THREE.Mesh(
          new THREE.SphereGeometry(0.04 + Math.random() * 0.06, 8, 8),
          new THREE.MeshStandardMaterial({
            color: techColors[Math.floor(Math.random() * techColors.length)],
            emissiveIntensity: 0.3,
            emissive: 0xffffff
          })
        );
        orb.position.set(
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 3 + 0.5,
          (Math.random() - 0.5) * 4 - 2
        );
        orb.userData = {
          speedX: (Math.random() - 0.5) * 0.005,
          speedY: (Math.random() - 0.5) * 0.005,
          speedZ: (Math.random() - 0.5) * 0.005,
          radius: 0.5 + Math.random() * 1.5
        };
        scene.add(orb);
        techOrbs.push(orb);
      }

      // --- 9. INTERACTION & ANIMATION ---
      const mouse = { x: 0, y: 0 };
      let targetRotationX = 0;
      let targetRotationY = 0;
      let time = 0;

      const onMouseMove = (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        targetRotationY = mouse.x * 0.35;
        targetRotationX = mouse.y * 0.2;
      };
      
      renderer.domElement.addEventListener('mousemove', onMouseMove);

      setTimeout(() => updateSpiderWeb(), 200);

      let animationId;
      function animate() {
        animationId = requestAnimationFrame(animate);
        time += 0.016;

        // Smooth rotation
        particleSystem.rotation.y += (targetRotationY - particleSystem.rotation.y) * 0.07;
        particleSystem.rotation.x += (targetRotationX - particleSystem.rotation.x) * 0.07;
        
        if (lineSegmentsMesh) {
          lineSegmentsMesh.rotation.copy(particleSystem.rotation);
        }

        // Code rain animation
        const positionsAttr = codeRain.geometry.attributes.position.array;
        for (let i = 0; i < codeRainCount; i++) {
          positionsAttr[i * 3 + 1] -= codeRainSpeeds[i];
          if (positionsAttr[i * 3 + 1] < -1.5) {
            positionsAttr[i * 3 + 1] = 3.5;
            positionsAttr[i * 3] = (Math.random() - 0.5) * 8;
            positionsAttr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3;
          }
        }
        codeRain.geometry.attributes.position.needsUpdate = true;

        // Orbiting tech particles
        bgStars.rotation.y += 0.0003;
        bgStars.rotation.x += 0.0002;
        
        // Floating orbs animation
        techOrbs.forEach(orb => {
          orb.position.x += Math.sin(time * 0.5) * 0.001;
          orb.position.y += Math.cos(time * 0.7) * 0.001;
        });

        // Pulse particle size
        const pulse = 0.019 + Math.sin(time * 2.5) * 0.0015;
        particleMaterial.size = pulse;

        // Pulsing lights
        keyLight.intensity = 0.7 + Math.sin(time * 1.8) * 0.15;
        rimLight.intensity = 0.35 + Math.sin(time * 2.2) * 0.1;

        renderer.render(scene, camera);
      }

      animate();

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

// ─── Tab content (same as before) ───────────────────────────────
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
      <div className="pointer-events-none absolute -top-40 -right-32 w-[420px] h-[420px] rounded-full bg-orange-500/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 w-[360px] h-[360px] rounded-full bg-blue-500/[0.04] blur-3xl" />

      <div className="relative max-w-[1200px] mx-auto">

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

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-5 flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square rounded-3xl overflow-hidden
                         border border-stone-800/60 bg-[#080c14]"
            >
              <RealisticDeveloperPortrait />

              <div
                className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.4) 100%)' }}
              />

              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 z-10 pointer-events-none">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-orange-400 opacity-70" />
                  <span className="relative rounded-full h-1.5 w-1.5 bg-orange-500" />
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">
                  Neural Portrait
                </span>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-5 right-5 flex items-center gap-3 px-3.5 py-2.5
                           rounded-2xl bg-white/10 backdrop-blur-md border border-white/20
                           shadow-xl z-10 pointer-events-none"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shrink-0">
                  <Laptop size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/60">Live</p>
                  <p className="text-[11px] font-bold text-white leading-tight">Developer in Action</p>
                </div>
              </motion.div>

              <p className="absolute bottom-5 left-5 text-[9px] font-mono text-white/25 z-10 pointer-events-none">
                move cursor to explore 3D
              </p>
            </motion.div>

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

          <div className="lg:col-span-7 flex flex-col gap-8">
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
