import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
  Code2, Database, Braces, Terminal, Cpu, Layers,
  Zap, Palette, Box, Globe, Activity, Smartphone,
  Layout, Shield, X, ChevronRight, LayoutGrid, Orbit,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────
const skillsPayload = {
  categories: [
    {
      name: 'Frontend',
      icon: Layout,
      color: '#f97316',
      skills: [
        { name: 'React',        color: '#61DAFB', level: 95, years: 4 },
        { name: 'TypeScript',   color: '#3178C6', level: 88, years: 3 },
        { name: 'Next.js',      color: '#a3a3a3', level: 85, years: 3 },
        { name: 'Tailwind CSS', color: '#38BDF8', level: 92, years: 3 },
        { name: 'Three.js',     color: '#049EF4', level: 70, years: 2 },
        { name: 'Vue',          color: '#42B883', level: 75, years: 2 },
      ],
    },
    {
      name: 'Backend',
      icon: Terminal,
      color: '#3b82f6',
      skills: [
        { name: 'Node.js',    color: '#68A063', level: 90, years: 4 },
        { name: 'Python',     color: '#FFD343', level: 82, years: 3 },
        { name: 'PostgreSQL', color: '#336791', level: 85, years: 3 },
        { name: 'Redis',      color: '#DC382D', level: 78, years: 2 },
        { name: 'GraphQL',    color: '#E10098', level: 80, years: 2 },
        { name: 'MongoDB',    color: '#47A248', level: 76, years: 2 },
      ],
    },
    {
      name: 'DevOps',
      icon: Activity,
      color: '#8b5cf6',
      skills: [
        { name: 'Docker', color: '#2496ED', level: 84, years: 3 },
        { name: 'AWS',    color: '#FF9900', level: 79, years: 2 },
        { name: 'Git',    color: '#F05032', level: 96, years: 5 },
        { name: 'CI/CD',  color: '#A259FF', level: 75, years: 2 },
      ],
    },
    {
      name: 'Mobile',
      icon: Smartphone,
      color: '#10b981',
      skills: [
        { name: 'Flutter',      color: '#54C5F8', level: 80, years: 2 },
        { name: 'React Native', color: '#61DAFB', level: 85, years: 3 },
        { name: 'Dart',         color: '#0175C2', level: 78, years: 2 },
      ],
    },
  ],
};

const ICON_MAP = {
  React: Code2,       TypeScript: Braces,    'Next.js': Code2,
  'Tailwind CSS': Layers, 'Node.js': Zap,    Python: Cpu,
  PostgreSQL: Database,   Redis: Database,   Flutter: Smartphone,
  'React Native': Smartphone, Docker: Terminal, AWS: Globe,
  Git: Terminal,      'CI/CD': Activity,     GraphQL: Globe,
  'Three.js': Box,    Vue: Layout,           MongoDB: Database,
  Dart: Smartphone,   Figma: Palette,        'Cyber Security': Shield,
};

// ─── 3D Orbital Animation System ──────────────────────────────
function ThreeJSOrbitalSystem({ skills, categoryColor, isDark, onSkillClick }) {
  const mountRef = useRef(null);
  const frameRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth;
    const H = el.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);

    // Raycaster for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(categoryColor, 1, 30);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Main group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Central glowing core
    const coreGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const coreMat = new THREE.MeshPhongMaterial({
      color: categoryColor,
      emissive: categoryColor,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.9,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(core);

    // Core glow
    const glowGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: categoryColor,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    mainGroup.add(glow);

    // Core particles
    const coreParticlesGeo = new THREE.BufferGeometry();
    const coreParticlesCount = 60;
    const corePositions = new Float32Array(coreParticlesCount * 3);
    for (let i = 0; i < coreParticlesCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.4 + Math.random() * 0.35;
      corePositions[i * 3] = Math.cos(angle) * radius;
      corePositions[i * 3 + 1] = Math.sin(angle) * radius;
      corePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    coreParticlesGeo.setAttribute('position', new THREE.BufferAttribute(corePositions, 3));
    const coreParticlesMat = new THREE.PointsMaterial({
      color: categoryColor,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const coreParticles = new THREE.Points(coreParticlesGeo, coreParticlesMat);
    mainGroup.add(coreParticles);

    // Orbital rings
    const rings = [];
    skills.forEach((skill, index) => {
      const radius = 1.5 + index * 0.9;
      const ringGeo = new THREE.TorusGeometry(radius, 0.01, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: skill.color,
        transparent: true,
        opacity: 0.25,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
      ring.rotation.y = Math.random() * 0.5;
      ring.userData = {
        baseRotationSpeed: 0.2 + Math.random() * 0.3,
      };
      rings.push(ring);
      mainGroup.add(ring);
    });

    // Create canvas for text labels
    const createSkillLabel = (skill) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      
      // Background glow
      const gradient = ctx.createRadialGradient(128, 32, 0, 128, 32, 120);
      gradient.addColorStop(0, `${skill.color}40`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 64);
      
      // Text
      ctx.font = 'bold 20px Inter, system-ui, sans-serif';
      ctx.fillStyle = skill.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(skill.name, 128, 32);
      
      // Level indicator
      ctx.font = 'bold 14px Inter, system-ui, sans-serif';
      ctx.fillStyle = `${skill.color}99`;
      ctx.fillText(`${skill.level}%`, 128, 50);
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        blending: THREE.NormalBlending,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(1.8, 0.45, 1);
      return sprite;
    };

    // Skill planets
    const planets = [];
    skills.forEach((skill, index) => {
      const planetGroup = new THREE.Group();
      
      // Planet sphere
      const radius = 0.1 + (skill.level / 100) * 0.12;
      const planetGeo = new THREE.SphereGeometry(radius, 16, 16);
      const planetMat = new THREE.MeshStandardMaterial({
        color: skill.color,
        metalness: 0.6,
        roughness: 0.2,
        emissive: skill.color,
        emissiveIntensity: 0.3,
      });
      const planet = new THREE.Mesh(planetGeo, planetMat);
      planet.name = skill.name; // For raycasting
      planetGroup.add(planet);

      // Glow effect
      const planetGlowGeo = new THREE.SphereGeometry(radius * 1.8, 16, 16);
      const planetGlowMat = new THREE.MeshBasicMaterial({
        color: skill.color,
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide,
      });
      const planetGlow = new THREE.Mesh(planetGlowGeo, planetGlowMat);
      planetGroup.add(planetGlow);

      // Label sprite
      const label = createSkillLabel(skill);
      label.position.y = radius + 0.3;
      planetGroup.add(label);

      // Position in orbit
      const orbitRadius = 1.5 + index * 0.9;
      const angle = (index / skills.length) * Math.PI * 2;
      planetGroup.position.set(
        Math.cos(angle) * orbitRadius,
        0,
        Math.sin(angle) * orbitRadius
      );

      planetGroup.userData = {
        orbitRadius,
        angle,
        speed: 0.3 + Math.random() * 0.5,
        skill,
        planet,
        planetGlow,
        label,
      };

      planets.push(planetGroup);
      mainGroup.add(planetGroup);
    });

    // Background stars
    const starsGeo = new THREE.BufferGeometry();
    const starsCount = 500;
    const starsPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      starsPositions[i * 3] = (Math.random() - 0.5) * 20;
      starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starsGeo, starsMat);
    mainGroup.add(stars);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (event) => {
      const rect = el.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Update mouse for raycasting
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onClick = (event) => {
      raycaster.setFromCamera(mouse, camera);
      
      const planetMeshes = planets.map(p => p.children[0]); // Get planet meshes
      const intersects = raycaster.intersectObjects(planetMeshes);
      
      if (intersects.length > 0) {
        const clickedPlanet = intersects[0].object;
        const planetGroup = planets.find(p => p.children[0] === clickedPlanet);
        if (planetGroup && onSkillClick) {
          onSkillClick(planetGroup.userData.skill);
        }
      }
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('click', onClick);

    // Resize handler
    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetRotationX += (mouseY * 0.5 - targetRotationX) * 0.05;
      targetRotationY += (mouseX * 0.5 - targetRotationY) * 0.05;

      mainGroup.rotation.x = targetRotationX * 0.3;
      mainGroup.rotation.y += 0.003;
      mainGroup.rotation.y += targetRotationY * 0.002;

      // Animate core
      core.rotation.y += 0.01;
      core.rotation.x += 0.005;
      const corePulse = 1 + Math.sin(elapsedTime * 2) * 0.1;
      core.scale.setScalar(corePulse);
      glow.scale.setScalar(corePulse * 1.2);
      coreParticles.rotation.y += 0.02;
      coreParticles.rotation.x += 0.01;
      pointLight.intensity = 0.8 + Math.sin(elapsedTime * 3) * 0.3;

      // Animate rings
      rings.forEach(ring => {
        ring.rotation.z += 0.002 * ring.userData.baseRotationSpeed;
        ring.rotation.x += 0.001 * ring.userData.baseRotationSpeed;
      });

      // Animate planets
      planets.forEach(planetGroup => {
        const data = planetGroup.userData;
        data.angle += data.speed * 0.008;
        planetGroup.position.x = Math.cos(data.angle) * data.orbitRadius;
        planetGroup.position.z = Math.sin(data.angle) * data.orbitRadius;
        
        // Planet rotation
        data.planet.rotation.y += 0.02;
        data.planet.rotation.x += 0.01;

        // Pulse glow
        const frontAngle = mainGroup.rotation.y;
        const distanceFromFront = Math.abs(Math.sin(data.angle - frontAngle));
        data.planetGlow.material.opacity = 0.15 + distanceFromFront * 0.15;

        // Make labels always face camera
        if (data.label) {
          data.label.lookAt(camera.position);
        }
      });

      // Rotate stars
      stars.rotation.y += 0.0005;
      stars.rotation.x += 0.0003;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, [skills, categoryColor, isDark, onSkillClick]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 cursor-pointer"
      style={{ minHeight: '500px' }}
    />
  );
}

// ─── Skill card (grid view) ────────────────────────────────────
const SkillCard = ({ skill, onClick, delay }) => {
  const Icon = skill.icon;
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      onClick={onClick}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col gap-3 p-4 rounded-2xl border bg-white dark:bg-[#161513]
                 border-stone-200 dark:border-stone-800/60 text-left cursor-pointer
                 hover:border-orange-400 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.3),0_12px_32px_rgba(0,0,0,0.08)]
                 transition-all duration-300"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${skill.color}18`, border: `1px solid ${skill.color}30` }}
      >
        <Icon size={18} style={{ color: skill.color }} />
      </div>

      <div>
        <p className="font-black text-sm text-stone-900 dark:text-stone-100 tracking-tight group-hover:text-orange-500 transition-colors">
          {skill.name}
        </p>
        <p className="text-[10px] text-stone-400 dark:text-stone-600 mt-0.5">{skill.years}+ yrs</p>
      </div>

      <div className="w-full h-1 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 0.8, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})` }}
        />
      </div>

      <span
        className="absolute top-3 right-3 text-[9px] font-black px-2 py-0.5 rounded-full"
        style={{ background: `${skill.color}18`, color: skill.color }}
      >
        {skill.level}%
      </span>
    </motion.button>
  );
};

// ─── Skill detail modal ────────────────────────────────────────
const SkillModal = ({ skill, onClose }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, y: 32, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-md bg-white dark:bg-[#161513] rounded-3xl overflow-hidden
                   border border-stone-200 dark:border-stone-800 shadow-2xl"
      >
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }} />

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${skill.color}18`, border: `1px solid ${skill.color}30` }}
              >
                <Icon size={28} style={{ color: skill.color }} />
              </div>
              <div>
                <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 tracking-tight">{skill.name}</h3>
                <p className="text-[10px] text-stone-400 mt-0.5 uppercase tracking-widest">{skill.years}+ years experience</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl border border-stone-200 dark:border-stone-800
                         text-stone-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all"
            >
              <X size={14} />
            </button>
          </div>

          <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400 mb-6">
            Deep expertise in {skill.name}, building high-performance, production-ready solutions
            with modern architectural patterns and best practices.
          </p>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] uppercase tracking-widest text-stone-400">Mastery</span>
              <span className="text-sm font-black text-stone-900 dark:text-stone-100">{skill.level}%</span>
            </div>
            <div className="h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { label: 'Mastery',    value: `${skill.level}%` },
              { label: 'Experience', value: `${skill.years}+ yrs` },
            ].map(({ label, value }) => (
              <div key={label} className="px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-800/40
                                          border border-stone-100 dark:border-stone-800">
                <p className="text-[9px] uppercase tracking-widest text-stone-400 mb-1">{label}</p>
                <p className="text-xl font-black text-stone-900 dark:text-stone-100">{value}</p>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="group w-full py-3.5 rounded-2xl flex items-center justify-center gap-2
                       text-xs font-black uppercase tracking-widest text-white transition-all active:scale-95"
            style={{ background: `linear-gradient(135deg, ${skill.color}dd, ${skill.color}aa)` }}
          >
            Close
            <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Main Component ────────────────────────────────────────────
export default function SkillsGalaxy() {
  const [activeCategory, setActiveCategory] = useState(skillsPayload.categories[0].name);
  const [hoveredSkill,   setHoveredSkill]   = useState(null);
  const [activeSkill,    setActiveSkill]    = useState(null);
  const [viewMode,       setViewMode]       = useState('3d'); // Default to 3D view

  const activeCategoryData = useMemo(
    () => skillsPayload.categories.find(c => c.name === activeCategory),
    [activeCategory]
  );

  const visibleSkills = useMemo(() => {
    if (!activeCategoryData) return [];
    return activeCategoryData.skills.map(skill => ({
      ...skill,
      icon: ICON_MAP[skill.name] || Code2,
    }));
  }, [activeCategoryData]);

  const dark = typeof document !== 'undefined'
    ? document.documentElement.classList.contains('dark')
    : false;

  const bg      = 'bg-stone-100 dark:bg-[#0c0b0a]';
  const surface = 'bg-white dark:bg-[#161513]';
  const border  = 'border-stone-200 dark:border-stone-800/60';
  const ink     = 'text-stone-900 dark:text-stone-100';
  const muted   = 'text-stone-400 dark:text-stone-600';
  const subtle  = 'text-stone-500 dark:text-stone-500';

  const handleSkillClick = (skill) => {
    setActiveSkill(skill);
  };

  return (
    <section
      id="skills"
      className={`relative min-h-screen py-24 px-4 sm:px-6 overflow-hidden transition-colors duration-500 ${bg}`}
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-40 -right-32 w-[420px] h-[420px] rounded-full bg-orange-500/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 w-[360px] h-[360px] rounded-full bg-blue-500/[0.04] blur-3xl" />

      <div className="relative max-w-[1200px] mx-auto">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
              <span className="block w-5 h-px bg-orange-500" />
              Technical skills
            </p>
            <h2 className={`text-[clamp(38px,5.5vw,64px)] font-black leading-[0.93] tracking-tight ${ink}`}>
              My <span className="text-orange-500 italic">Tech</span> Stack
            </h2>
            <p className={`mt-3 text-sm leading-relaxed max-w-xs ${subtle}`}>
              Click on any planet to explore skill details in the interactive 3D orbit.
            </p>
          </motion.div>

          {/* View toggle */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border ${surface} ${border}`}>
            {[
              { mode: 'grid',  Icon: LayoutGrid, label: 'Grid'  },
              { mode: '3d',    Icon: Orbit,      label: '3D Orbit' },
            ].map(({ mode, Icon: Ic, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all duration-250
                  ${viewMode === mode
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : `${muted} hover:${ink}`
                  }`}
              >
                <Ic size={13} /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Category tabs ────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {skillsPayload.categories.map(cat => {
            const CatIcon = cat.icon;
            const active  = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest border transition-all duration-250
                  ${active
                    ? 'text-white border-transparent shadow-lg'
                    : `bg-transparent ${border} ${muted} hover:border-stone-300 dark:hover:border-stone-600`
                  }`}
                style={active ? { background: cat.color, boxShadow: `0 8px 20px ${cat.color}35` } : {}}
              >
                <CatIcon size={13} />
                {cat.name}
                <span className="opacity-60 text-[9px]">{cat.skills.length}</span>
              </button>
            );
          })}
        </div>

        {/* ── Content area ─────────────────────────────────────── */}
        <AnimatePresence mode="wait">

          {/* GRID VIEW */}
          {viewMode === 'grid' && (
            <motion.div
              key={`grid-${activeCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3"
            >
              {visibleSkills.map((skill, i) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  delay={i * 0.04}
                  onClick={() => setActiveSkill(skill)}
                />
              ))}
            </motion.div>
          )}

          {/* 3D ORBIT VIEW */}
          {viewMode === '3d' && (
            <motion.div
              key={`3d-${activeCategory}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative w-full rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800/60"
                   style={{ height: '550px', background: dark ? 'radial-gradient(circle at center, #1a1917 0%, #0c0b0a 100%)' : 'radial-gradient(circle at center, #fafaf9 0%, #f5f3ee 100%)' }}>
                
                <ThreeJSOrbitalSystem 
                  skills={visibleSkills} 
                  categoryColor={activeCategoryData?.color || '#f97316'} 
                  isDark={dark}
                  onSkillClick={handleSkillClick}
                />

                {/* Overlay UI */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">
                        {activeCategoryData?.name || ''} Orbit
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-[10px] text-white/50 uppercase tracking-widest">
                      🖱️ Drag to rotate • Click planets to explore
                    </div>
                  </div>
                </div>
              </div>

              {/* Skill Legend */}
              <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-2xl mx-auto">
                {visibleSkills.map(skill => {
                  const Icon = skill.icon;
                  return (
                    <button
                      key={skill.name}
                      onClick={() => setActiveSkill(skill)}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border
                        bg-white dark:bg-[#161513] border-stone-200 dark:border-stone-800/60
                        hover:border-orange-400 hover:shadow-md hover:scale-105`}
                      style={{
                        borderColor: hoveredSkill === skill.name ? skill.color : undefined,
                        boxShadow: hoveredSkill === skill.name ? `0 0 12px ${skill.color}30` : undefined,
                      }}
                    >
                      <Icon size={11} style={{ color: skill.color }} />
                      <span style={{ color: skill.color }}>{skill.name}</span>
                      <span className="text-stone-400">{skill.level}%</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── All skills summary strip ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-14 p-5 rounded-2xl border ${surface} ${border} flex flex-wrap items-center justify-between gap-4`}
        >
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${muted} mb-1`}>Total skills</p>
            <p className={`text-2xl font-black ${ink}`}>
              {skillsPayload.categories.reduce((a, c) => a + c.skills.length, 0)}
              <span className="text-orange-500">+</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillsPayload.categories.map(cat => (
              <div
                key={cat.name}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold"
                style={{ background: `${cat.color}12`, color: cat.color, border: `1px solid ${cat.color}25` }}
              >
                <cat.icon size={11} />
                {cat.name} · {cat.skills.length}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeSkill && <SkillModal skill={activeSkill} onClose={() => setActiveSkill(null)} />}
      </AnimatePresence>
    </section>
  );
}
