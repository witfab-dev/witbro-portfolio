// components/sections/About.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
  Layers, Globe, Zap, ShieldCheck, Terminal,
  ArrowUpRight, Sparkles, Coffee, Code2,
  BookOpen, Eye, Lightbulb, User, Monitor, Cpu,
} from 'lucide-react';

// ─── Complete PC Workspace with Real Person on Screen ────────────────────
function CompletePCWorkspace({ personImageUrl = '/wit.png' }) {
  const mountRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const [textureLoaded, setTextureLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    try {
      // --- SETUP SCENE ---
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x050a12);
      scene.fog = new THREE.FogExp2(0x050a12, 0.006);

      const camera = new THREE.PerspectiveCamera(40, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
      camera.position.set(0, 1.3, 5.2);
      camera.lookAt(0, 1.0, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x050a12, 1);
      renderer.shadowMap.enabled = true;
      mountRef.current.appendChild(renderer.domElement);

      // Load person texture for screen
      const personTexture = new THREE.TextureLoader().load(personImageUrl, () => {
        setTextureLoaded(true);
      });
      
      // --- LIGHTING SYSTEM ---
      const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.55);
      scene.add(ambientLight);
      
      const mainLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
      mainLight.position.set(5, 8, 3);
      mainLight.castShadow = true;
      scene.add(mainLight);
      
      const fillLight = new THREE.PointLight(0x4466cc, 0.5);
      fillLight.position.set(-3, 2, 4);
      scene.add(fillLight);
      
      const rimLight = new THREE.PointLight(0xff66aa, 0.4);
      rimLight.position.set(2, 2.5, -3);
      scene.add(rimLight);
      
      // Screen glow
      const screenGlow = new THREE.PointLight(0x44aaff, 1.0);
      screenGlow.position.set(0, 1.15, 0.9);
      scene.add(screenGlow);
      
      const backLight = new THREE.PointLight(0x88aaff, 0.3);
      backLight.position.set(0, 1.2, -2);
      scene.add(backLight);

      // --- DESK ---
      const deskGroup = new THREE.Group();
      
      // Desk surface (wooden)
      const deskMat = new THREE.MeshStandardMaterial({ color: 0x3a2a1a, metalness: 0.2, roughness: 0.7 });
      const deskTop = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.08, 2.0), deskMat);
      deskTop.position.set(0, 0.65, 0);
      deskTop.castShadow = true;
      deskTop.receiveShadow = true;
      deskGroup.add(deskTop);
      
      // Desk legs
      const legMat = new THREE.MeshStandardMaterial({ color: 0x1a1210, metalness: 0.7, roughness: 0.4 });
      const legPositions = [[-1.4, 0.32, -0.8], [1.4, 0.32, -0.8], [-1.4, 0.32, 0.7], [1.4, 0.32, 0.7]];
      legPositions.forEach(pos => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.65, 0.1), legMat);
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        deskGroup.add(leg);
      });
      
      scene.add(deskGroup);
      
      // --- PC MONITOR (Large Screen) ---
      const monitorGroup = new THREE.Group();
      
      // Monitor stand
      const standMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.6 });
      const standBase = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.05, 0.3), standMat);
      standBase.position.set(0, 0.7, 0);
      standBase.castShadow = true;
      monitorGroup.add(standBase);
      
      const standNeck = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.15, 0.08), standMat);
      standNeck.position.set(0, 0.79, 0);
      standNeck.castShadow = true;
      monitorGroup.add(standNeck);
      
      // Monitor body
      const monitorBodyMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.7, roughness: 0.3 });
      const monitorBody = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.95, 0.08), monitorBodyMat);
      monitorBody.position.set(0, 1.15, 0);
      monitorBody.castShadow = true;
      monitorGroup.add(monitorBody);
      
      // Monitor bezel
      const bezelMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8 });
      const bezel = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.9, 0.02), bezelMat);
      bezel.position.set(0, 1.15, 0.04);
      monitorGroup.add(bezel);
      
      // Monitor SCREEN with Real Person Photo
      const screenMat = new THREE.MeshStandardMaterial({ 
        map: personTexture,
        emissive: 0x4488ff, 
        emissiveIntensity: 0.35,
        color: 0xffffff
      });
      const monitorScreen = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.83, 0.015), screenMat);
      monitorScreen.position.set(0, 1.15, 0.045);
      monitorScreen.castShadow = true;
      monitorGroup.add(monitorScreen);
      
      // Screen reflection effect
      const reflectionMat = new THREE.MeshStandardMaterial({ color: 0x88aaff, transparent: true, opacity: 0.1 });
      const reflection = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.83, 0.005), reflectionMat);
      reflection.position.set(0, 1.15, 0.052);
      monitorGroup.add(reflection);
      
      scene.add(monitorGroup);
      
      // --- KEYBOARD ---
      const keyboardMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.5 });
      const keyboardBase = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.04, 0.28), keyboardMat);
      keyboardBase.position.set(0, 0.73, -0.35);
      keyboardBase.castShadow = true;
      scene.add(keyboardBase);
      
      // Keyboard keys
      for (let i = -5; i <= 5; i++) {
        for (let j = -2; j <= 2; j++) {
          if (Math.random() > 0.6) {
            const key = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.008, 0.045), new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.4 }));
            key.position.set(i * 0.068, 0.75, j * 0.058 - 0.35);
            key.castShadow = true;
            scene.add(key);
          }
        }
      }
      
      // --- MOUSE ---
      const mouseMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.6 });
      const mouse = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), mouseMat);
      mouse.position.set(0.55, 0.73, -0.15);
      mouse.scale.set(1.2, 0.5, 0.8);
      mouse.castShadow = true;
      scene.add(mouse);
      
      // Mouse pad
      const mousePadMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2a, roughness: 0.8 });
      const mousePad = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.01, 0.28), mousePadMat);
      mousePad.position.set(0.55, 0.715, -0.15);
      mousePad.castShadow = true;
      scene.add(mousePad);
      
      // --- PC TOWER (Computer Case) ---
      const towerGroup = new THREE.Group();
      
      const towerMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2a, metalness: 0.8, roughness: 0.3 });
      const towerCase = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.55, 0.45), towerMat);
      towerCase.position.set(1.2, 0.42, 0.45);
      towerCase.castShadow = true;
      towerGroup.add(towerCase);
      
      // Glass side panel
      const glassMat = new THREE.MeshStandardMaterial({ color: 0x4488ff, metalness: 0.9, transparent: true, opacity: 0.3 });
      const glassPanel = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.48, 0.02), glassMat);
      glassPanel.position.set(1.2, 0.42, 0.68);
      towerGroup.add(glassPanel);
      
      // Power button LED
      const ledMat = new THREE.MeshStandardMaterial({ color: 0x00ff88, emissive: 0x00ff88, emissiveIntensity: 0.5 });
      const powerLED = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 8), ledMat);
      powerLED.position.set(1.33, 0.62, 0.48);
      towerGroup.add(powerLED);
      
      scene.add(towerGroup);
      
      // --- SPEAKERS ---
      const speakerMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.5 });
      
      const leftSpeaker = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 0.1), speakerMat);
      leftSpeaker.position.set(-1.2, 0.78, 0.55);
      leftSpeaker.castShadow = true;
      scene.add(leftSpeaker);
      
      const rightSpeaker = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 0.1), speakerMat);
      rightSpeaker.position.set(1.2, 0.78, 0.55);
      rightSpeaker.castShadow = true;
      scene.add(rightSpeaker);
      
      // --- DESK LAMP ---
      const lampMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.7 });
      const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.1, 8), lampMat);
      lampBase.position.set(-1.1, 0.71, -0.55);
      lampBase.castShadow = true;
      scene.add(lampBase);
      
      const lampNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.25, 6), lampMat);
      lampNeck.position.set(-1.1, 0.84, -0.55);
      lampNeck.rotation.x = 0.4;
      lampNeck.castShadow = true;
      scene.add(lampNeck);
      
      const lampLight = new THREE.PointLight(0xffaa66, 0.4);
      lampLight.position.set(-1.1, 0.95, -0.5);
      scene.add(lampLight);
      
      // --- OFFICE CHAIR (Empty, waiting for you) ---
      const chairGroup = new THREE.Group();
      const chairMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2a, metalness: 0.2, roughness: 0.7 });
      
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.08, 0.55), chairMat);
      seat.position.set(0, 0.25, -0.85);
      seat.castShadow = true;
      chairGroup.add(seat);
      
      const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.48, 0.08), chairMat);
      backrest.position.set(0, 0.55, -1.18);
      backrest.castShadow = true;
      chairGroup.add(backrest);
      
      const armrestLeft = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.35), chairMat);
      armrestLeft.position.set(-0.38, 0.48, -0.85);
      chairGroup.add(armrestLeft);
      
      const armrestRight = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.35), chairMat);
      armrestRight.position.set(0.38, 0.48, -0.85);
      chairGroup.add(armrestRight);
      
      chairGroup.position.set(0, 0.12, 0);
      scene.add(chairGroup);
      
      // --- FLOATING CODE PARTICLES (Developer Aura) ---
      const particleCount = 1200;
      const particlePositions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 5;
        particlePositions[i * 3 + 1] = Math.random() * 2.5;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
        
        const choice = Math.random();
        if (choice < 0.33) {
          particleColors[i * 3] = 0.3;
          particleColors[i * 3 + 1] = 0.9;
          particleColors[i * 3 + 2] = 0.4;
        } else if (choice < 0.66) {
          particleColors[i * 3] = 0.9;
          particleColors[i * 3 + 1] = 0.5;
          particleColors[i * 3 + 2] = 0.2;
        } else {
          particleColors[i * 3] = 0.4;
          particleColors[i * 3 + 1] = 0.6;
          particleColors[i * 3 + 2] = 0.9;
        }
      }
      
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
      const particleMat = new THREE.PointsMaterial({ size: 0.008, vertexColors: true, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);
      
      // --- FLOATING TECH ICONS ---
      const techCubes = [];
      const cubeColors = [0xff4444, 0x44ff44, 0x4444ff, 0xffaa44, 0xff44ff];
      for (let i = 0; i < 60; i++) {
        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(0.05, 0.05, 0.05),
          new THREE.MeshStandardMaterial({ color: cubeColors[Math.floor(Math.random() * cubeColors.length)], emissiveIntensity: 0.2 })
        );
        cube.position.set(
          (Math.random() - 0.5) * 4,
          Math.random() * 2.2,
          (Math.random() - 0.5) * 3.5 - 1
        );
        cube.userData = { rotSpeed: Math.random() * 0.02 };
        cube.castShadow = true;
        scene.add(cube);
        techCubes.push(cube);
      }
      
      // --- STARFIELD BACKGROUND ---
      const starCount = 800;
      const starPositions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 30;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      const starMat = new THREE.PointsMaterial({ color: 0x88aaff, size: 0.015, transparent: true, opacity: 0.3 });
      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);
      
      // --- ANIMATION LOOP ---
      let time = 0;
      let mouseX = 0, mouseY = 0;
      let targetRotX = 0, targetRotY = 0;
      
      const onMouseMove = (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        targetRotY = mouseX * 0.2;
        targetRotX = mouseY * 0.1;
      };
      
      renderer.domElement.addEventListener('mousemove', onMouseMove);
      
      function animate() {
        requestAnimationFrame(animate);
        time += 0.016;
        
        // Smooth camera rotation
        camera.position.x += (targetRotY * 0.4 - camera.position.x) * 0.06;
        camera.position.y += (targetRotX * 0.3 - camera.position.y) * 0.06;
        camera.lookAt(0, 1.0, 0);
        
        // Screen glow pulse
        screenGlow.intensity = 0.8 + Math.sin(time * 2.5) * 0.3;
        
        // Power LED blink
        powerLED.material.emissiveIntensity = 0.4 + Math.sin(time * 5) * 0.2;
        
        // Floating particles
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;
        
        // Tech cubes rotation
        techCubes.forEach(cube => {
          cube.rotation.x += cube.userData.rotSpeed;
          cube.rotation.y += cube.userData.rotSpeed;
        });
        
        // Stars drift
        stars.rotation.y += 0.0002;
        
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
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
      };
    } catch (err) {
      console.error('3D Scene Error:', err);
      setError(err);
    }
  }, [personImageUrl]);
  
  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#080c14]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <Code2 size={24} className="text-orange-500 opacity-60" />
          </div>
          <p className="text-[10px] font-mono text-stone-600">3D workspace preview unavailable</p>
        </div>
      </div>
    );
  }
  
  return (
    <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" style={{ touchAction: 'none' }}>
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
      {!textureLoaded && isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#080c14]/80 backdrop-blur-sm z-10">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full border-2 border-orange-500 border-t-transparent animate-spin mx-auto mb-2" />
            <p className="text-[9px] text-orange-500">Loading workspace...</p>
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
  // Replace with your actual photo path
  const personPhotoUrl = '/wit.png';

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
              <CompletePCWorkspace personImageUrl={personPhotoUrl} />

              <div
                className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.4) 100%)' }}
              />

              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 z-10 pointer-events-none">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-70" />
                  <span className="relative rounded-full h-1.5 w-1.5 bg-green-500" />
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">
                  PC Workspace
                </span>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-5 right-5 flex items-center gap-3 px-3.5 py-2.5
                           rounded-2xl bg-black/50 backdrop-blur-md border border-white/20
                           shadow-xl z-10 pointer-events-none"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shrink-0">
                  <Monitor size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/60">Ready to Code</p>
                  <p className="text-[11px] font-bold text-white leading-tight">Full-Stack Developer</p>
                </div>
              </motion.div>

              <p className="absolute bottom-5 left-5 text-[9px] font-mono text-white/25 z-10 pointer-events-none">
                drag to explore 3D setup
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
