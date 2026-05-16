import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useThreeJS } from '../../hooks/useThreeJS';
import LazyThreeJS from '../shared/LazyThreeJS';
import {
  Code2, Database, Braces, Terminal, Cpu, Layers,
  Zap, Palette, Box, Globe, Activity, Smartphone,
  Layout, Shield, X, ChevronRight, LayoutGrid, Orbit,
  Loader2, List,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────
const skillsPayload = {
  categories: [
    {
      name: 'Frontend', icon: Layout, color: '#f97316',
      skills: [
        { name: 'React', color: '#61DAFB', level: 95, years: 4 },
        { name: 'TypeScript', color: '#3178C6', level: 88, years: 3 },
        { name: 'Next.js', color: '#a3a3a3', level: 85, years: 3 },
        { name: 'Tailwind CSS', color: '#38BDF8', level: 92, years: 3 },
        { name: 'Three.js', color: '#049EF4', level: 70, years: 2 },
        { name: 'Vue', color: '#42B883', level: 75, years: 2 },
      ],
    },
    {
      name: 'Backend', icon: Terminal, color: '#3b82f6',
      skills: [
        { name: 'Node.js', color: '#68A063', level: 90, years: 4 },
        { name: 'Python', color: '#FFD343', level: 82, years: 3 },
        { name: 'PostgreSQL', color: '#336791', level: 85, years: 3 },
        { name: 'Redis', color: '#DC382D', level: 78, years: 2 },
        { name: 'GraphQL', color: '#E10098', level: 80, years: 2 },
        { name: 'MongoDB', color: '#47A248', level: 76, years: 2 },
      ],
    },
    {
      name: 'DevOps', icon: Activity, color: '#8b5cf6',
      skills: [
        { name: 'Docker', color: '#2496ED', level: 84, years: 3 },
        { name: 'AWS', color: '#FF9900', level: 79, years: 2 },
        { name: 'Git', color: '#F05032', level: 96, years: 5 },
        { name: 'CI/CD', color: '#A259FF', level: 75, years: 2 },
      ],
    },
    {
      name: 'Mobile', icon: Smartphone, color: '#10b981',
      skills: [
        { name: 'Flutter', color: '#54C5F8', level: 80, years: 2 },
        { name: 'React Native', color: '#61DAFB', level: 85, years: 3 },
        { name: 'Dart', color: '#0175C2', level: 78, years: 2 },
      ],
    },
  ],
};

const ICON_MAP = {
  React: Code2, TypeScript: Braces, 'Next.js': Code2,
  'Tailwind CSS': Layers, 'Node.js': Zap, Python: Cpu,
  PostgreSQL: Database, Redis: Database, Flutter: Smartphone,
  'React Native': Smartphone, Docker: Terminal, AWS: Globe,
  Git: Terminal, 'CI/CD': Activity, GraphQL: Globe,
  'Three.js': Box, Vue: Layout, MongoDB: Database,
  Dart: Smartphone, Figma: Palette, 'Cyber Security': Shield,
};

// ─── 3D Orbital Animation System ──────────────────────────────
function ThreeJSOrbitalSystem({ skills, categoryColor, isDark, onSkillClick }) {
  const { 
    mountRef, 
    isReady, 
    error,
    handleResize,
    startAnimationLoop, // ✅ Use this to start the animation
  } = useThreeJS(`skills-orbit-${categoryColor.replace('#', '')}`, {
    cameraPosition: [0, 2, 10],
    fov: 45,
    enableShadows: false,
    onInit: ({ scene, camera, renderer }) => {
      const mainGroup = new THREE.Group();
      scene.add(mainGroup);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(categoryColor, 1, 30);
      pointLight.position.set(0, 0, 0);
      scene.add(pointLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Central core
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 32, 32),
        new THREE.MeshPhongMaterial({ 
          color: categoryColor, 
          emissive: categoryColor, 
          emissiveIntensity: 0.6, 
          transparent: true, 
          opacity: 0.9 
        })
      );
      mainGroup.add(core);

      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.55, 32, 32),
        new THREE.MeshBasicMaterial({ 
          color: categoryColor, 
          transparent: true, 
          opacity: 0.2, 
          side: THREE.BackSide 
        })
      );
      mainGroup.add(glow);

      // Core particles
      const cpCount = 60;
      const cpPos = new Float32Array(cpCount * 3);
      for (let i = 0; i < cpCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.4 + Math.random() * 0.35;
        cpPos[i * 3] = Math.cos(angle) * radius;
        cpPos[i * 3 + 1] = Math.sin(angle) * radius;
        cpPos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      }
      const cpGeo = new THREE.BufferGeometry();
      cpGeo.setAttribute('position', new THREE.BufferAttribute(cpPos, 3));
      const coreParticles = new THREE.Points(cpGeo, new THREE.PointsMaterial({
        color: categoryColor, 
        size: 0.02, 
        transparent: true, 
        opacity: 0.6, 
        blending: THREE.AdditiveBlending,
      }));
      mainGroup.add(coreParticles);

      // Orbital rings
      const rings = [];
      skills.forEach((skill, index) => {
        const radius = 1.5 + index * 0.9;
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(radius, 0.01, 16, 100),
          new THREE.MeshBasicMaterial({ 
            color: skill.color, 
            transparent: true, 
            opacity: 0.25 
          })
        );
        ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
        ring.rotation.y = Math.random() * 0.5;
        ring.userData = { baseRotationSpeed: 0.2 + Math.random() * 0.3 };
        rings.push(ring);
        mainGroup.add(ring);
      });

      // Skill labels via canvas
      const createLabel = (skill) => {
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
        
        // Skill name
        ctx.font = 'bold 20px Inter, system-ui, sans-serif';
        ctx.fillStyle = skill.color; 
        ctx.textAlign = 'center'; 
        ctx.textBaseline = 'middle';
        ctx.fillText(skill.name, 128, 32);
        
        // Skill level
        ctx.font = 'bold 14px Inter, system-ui, sans-serif';
        ctx.fillStyle = `${skill.color}99`;
        ctx.fillText(`${skill.level}%`, 128, 50);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({ 
            map: texture, 
            transparent: true, 
            blending: THREE.NormalBlending,
            depthTest: false,
            depthWrite: false,
          })
        );
        sprite.scale.set(1.8, 0.45, 1);
        return sprite;
      };

      // Skill planets
      const planets = [];
      skills.forEach((skill, index) => {
        const planetGroup = new THREE.Group();
        const planetRadius = 0.1 + (skill.level / 100) * 0.12;
        
        const planet = new THREE.Mesh(
          new THREE.SphereGeometry(planetRadius, 16, 16),
          new THREE.MeshStandardMaterial({ 
            color: skill.color, 
            metalness: 0.6, 
            roughness: 0.2, 
            emissive: skill.color, 
            emissiveIntensity: 0.3 
          })
        );
        planet.name = skill.name;
        planetGroup.add(planet);

        const planetGlow = new THREE.Mesh(
          new THREE.SphereGeometry(planetRadius * 1.8, 16, 16),
          new THREE.MeshBasicMaterial({ 
            color: skill.color, 
            transparent: true, 
            opacity: 0.2, 
            side: THREE.BackSide,
            depthTest: false,
            depthWrite: false,
          })
        );
        planetGroup.add(planetGlow);

        const label = createLabel(skill);
        label.position.y = planetRadius + 0.3;
        planetGroup.add(label);

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
          label 
        };
        
        planets.push(planetGroup);
        mainGroup.add(planetGroup);
      });

      // Stars
      const sCount = 500;
      const sPos = new Float32Array(sCount * 3);
      for (let i = 0; i < sCount; i++) {
        sPos[i * 3] = (Math.random() - 0.5) * 20;
        sPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
        sPos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      }
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
      const stars = new THREE.Points(sGeo, new THREE.PointsMaterial({
        color: 0xffffff, 
        size: 0.03, 
        transparent: true, 
        opacity: 0.5, 
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
      }));
      mainGroup.add(stars);

      // Click detection
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      
      const onClick = (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const planetMeshes = planets.map(p => p.children[0]);
        const intersects = raycaster.intersectObjects(planetMeshes);
        if (intersects.length > 0) {
          const name = intersects[0].object.name;
          const skill = skills.find(s => s.name === name);
          if (skill) onSkillClick(skill);
        }
      };
      
      renderer.domElement.addEventListener('click', onClick);

      // ✅ Start the animation loop with the animation function
      let elapsedTime = 0;
      startAnimationLoop(() => {
        elapsedTime += 0.016;
        
        // Rotate main group
        mainGroup.rotation.y += 0.003;
        
        // Core animations
        core.rotation.y += 0.01;
        core.rotation.x += 0.005;
        
        const corePulse = 1 + Math.sin(elapsedTime * 2) * 0.1;
        core.scale.setScalar(corePulse);
        glow.scale.setScalar(corePulse * 1.2);
        
        coreParticles.rotation.y += 0.02;
        pointLight.intensity = 0.8 + Math.sin(elapsedTime * 3) * 0.3;

        // Rotate orbital rings
        rings.forEach(ring => { 
          ring.rotation.z += 0.002 * ring.userData.baseRotationSpeed; 
        });

        // Animate planets
        planets.forEach(planetGroup => {
          const data = planetGroup.userData;
          data.angle += data.speed * 0.008;
          planetGroup.position.x = Math.cos(data.angle) * data.orbitRadius;
          planetGroup.position.z = Math.sin(data.angle) * data.orbitRadius;
          
          data.planet.rotation.y += 0.02;
          data.planet.rotation.x += 0.01;
          
          const dist = Math.abs(Math.sin(data.angle - mainGroup.rotation.y));
          data.planetGlow.material.opacity = 0.15 + dist * 0.15;
          
          if (data.label) {
            data.label.lookAt(camera.position);
          }
        });

        // Rotate stars
        stars.rotation.y += 0.0005;
      });
      
      // Cleanup function
      return () => {
        renderer.domElement.removeEventListener('click', onClick);
      };
    },
  });

  // Resize
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Error state
  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center" style={{ background: isDark ? '#0c0b0a' : '#f5f3ee' }}>
        <div className="text-center">
          <Orbit size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm font-bold opacity-50">3D View Unavailable</p>
          <p className="text-[10px] opacity-30 mt-1">Switch to grid view</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={mountRef} className="absolute inset-0 cursor-pointer" style={{ minHeight: '500px' }}>
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 size={24} className="animate-spin text-orange-500" />
        </div>
      )}
    </div>
  );
}

// ─── Skill card (grid view) ────────────────────────────────────
const SkillCard = ({ skill, onClick, delay, t }) => {
  const Icon = skill.icon;
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }} 
      onClick={onClick} 
      whileHover={{ y: -4 }}
      className="group relative flex flex-col gap-3 p-4 rounded-2xl border bg-white dark:bg-[#161513] border-stone-200 dark:border-stone-800/60 text-left cursor-pointer hover:border-orange-400 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.3),0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${skill.color}18`, border: `1px solid ${skill.color}30` }}>
        <Icon size={18} style={{ color: skill.color }} />
      </div>
      <div>
        <p className="font-black text-sm text-stone-900 dark:text-stone-100 tracking-tight group-hover:text-orange-500 transition-colors">{skill.name}</p>
        <p className="text-[10px] text-stone-400 dark:text-stone-600 mt-0.5">{skill.years}+ {t('years', 'yrs')}</p>
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
      <span className="absolute top-3 right-3 text-[9px] font-black px-2 py-0.5 rounded-full" style={{ background: `${skill.color}18`, color: skill.color }}>
        {skill.level}%
      </span>
    </motion.button>
  );
};

// ─── Skill detail modal ────────────────────────────────────────
const SkillModal = ({ skill, onClose, t }) => {
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
        className="relative w-full max-w-md bg-white dark:bg-[#161513] rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-2xl"
      >
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }} />
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${skill.color}18`, border: `1px solid ${skill.color}30` }}>
                <Icon size={28} style={{ color: skill.color }} />
              </div>
              <div>
                <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 tracking-tight">{skill.name}</h3>
                <p className="text-[10px] text-stone-400 mt-0.5 uppercase tracking-widest">{skill.years}+ {t('yearsExperience', 'years experience')}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl border border-stone-200 dark:border-stone-800 text-stone-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all">
              <X size={14} />
            </button>
          </div>
          <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400 mb-6">
            {t('deepExpertise', 'Deep expertise in')} {skill.name}, {t('buildingSolutions', 'building high-performance, production-ready solutions')} with modern architectural patterns and best practices.
          </p>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] uppercase tracking-widest text-stone-400">{t('mastery', 'Mastery')}</span>
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
              { labelKey: 'mastery', value: `${skill.level}%` },
              { labelKey: 'experience', value: `${skill.years}+ ${t('years', 'yrs')}` }
            ].map(({ labelKey, value }) => (
              <div key={labelKey} className="px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800">
                <p className="text-[9px] uppercase tracking-widest text-stone-400 mb-1">{t(labelKey)}</p>
                <p className="text-xl font-black text-stone-900 dark:text-stone-100">{value}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={onClose} 
            className="group w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-white transition-all active:scale-95" 
            style={{ background: `linear-gradient(135deg, ${skill.color}dd, ${skill.color}aa)` }}
          >
            {t('close', 'Close')}
            <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Main Component ────────────────────────────────────────────
export default function SkillsGalaxy() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const [activeCategory, setActiveCategory] = useState(skillsPayload.categories[0].name);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const activeCategoryData = useMemo(
    () => skillsPayload.categories.find(c => c.name === activeCategory), 
    [activeCategory]
  );
  
  const visibleSkills = useMemo(
    () => activeCategoryData 
      ? activeCategoryData.skills.map(skill => ({ 
          ...skill, 
          icon: ICON_MAP[skill.name] || Code2 
        })) 
      : [], 
    [activeCategoryData]
  );

  const bg = 'bg-stone-100 dark:bg-[#0c0b0a]';
  const surface = 'bg-white dark:bg-[#161513]';
  const border = 'border-stone-200 dark:border-stone-800/60';
  const ink = 'text-stone-900 dark:text-stone-100';
  const muted = 'text-stone-400 dark:text-stone-600';
  const subtle = 'text-stone-500 dark:text-stone-500';

  return (
    <section id="skills" className={`relative min-h-screen py-24 px-4 sm:px-6 overflow-hidden transition-colors duration-500 ${bg}`}>
      <div className="pointer-events-none absolute -top-40 -right-32 w-[420px] h-[420px] rounded-full bg-orange-500/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 w-[360px] h-[360px] rounded-full bg-blue-500/[0.04] blur-3xl" />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.55 }}
          >
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
              <span className="block w-5 h-px bg-orange-500" />
              {t('technicalSkills', 'Technical skills')}
            </p>
            <h2 className={`text-[clamp(38px,5.5vw,64px)] font-black leading-[0.93] tracking-tight ${ink}`}>
              {t('myTechStack', 'My')}{' '}
              <span className="text-orange-500 italic">{t('techStack', 'Tech')}</span>{' '}
              {t('stack', 'Stack')}
            </h2>
            <p className={`mt-3 text-sm leading-relaxed max-w-xs ${subtle}`}>
              {t('skillsSubtitle', 'Tools and technologies I use to build fast, scalable, and beautiful products.')}
            </p>
          </motion.div>
          
          {/* View mode toggle */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border ${surface} ${border}`}>
            {[
              { mode: 'grid', Icon: LayoutGrid, labelKey: 'grid' },
              { mode: '3d', Icon: Orbit, labelKey: '3dOrbit' }
            ].map(({ mode, Icon: Ic, labelKey }) => (
              <button 
                key={mode} 
                onClick={() => setViewMode(mode)} 
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all duration-250 ${
                  viewMode === mode 
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25' 
                    : `${muted} hover:${ink}`
                }`}
              >
                <Ic size={13} /> {t(labelKey, mode === 'grid' ? 'Grid' : '3D Orbit')}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {skillsPayload.categories.map(cat => {
            const CatIcon = cat.icon;
            const active = activeCategory === cat.name;
            return (
              <button 
                key={cat.name} 
                onClick={() => setActiveCategory(cat.name)} 
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest border transition-all duration-250 ${
                  active 
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

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* Grid View */}
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
                  t={t} 
                />
              ))}
            </motion.div>
          )}

          {/* 3D Orbit View */}
          {viewMode === '3d' && (
            <motion.div 
              key={`3d-${activeCategory}`} 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              transition={{ duration: 0.5 }} 
              className="relative"
            >
              <div 
                className="relative w-full rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800/60" 
                style={{ 
                  height: '550px', 
                  background: dark 
                    ? 'radial-gradient(circle at center, #1a1917 0%, #0c0b0a 100%)' 
                    : 'radial-gradient(circle at center, #fafaf9 0%, #f5f3ee 100%)' 
                }}
              >
                <LazyThreeJS 
                  componentId={`skills-orbit-${activeCategory}`} 
                  fallback={
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Loader2 size={24} className="animate-spin mx-auto mb-2 text-orange-500" />
                        <p className="text-sm opacity-50">{t('loading3D', 'Loading 3D view...')}</p>
                      </div>
                    </div>
                  }
                >
                  <ThreeJSOrbitalSystem 
                    skills={visibleSkills} 
                    categoryColor={activeCategoryData?.color || '#f97316'} 
                    isDark={dark} 
                    onSkillClick={(skill) => setActiveSkill(skill)} 
                  />
                </LazyThreeJS>
                
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
                      🖱️ Click planets to explore
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Skill legend */}
              <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-2xl mx-auto">
                {visibleSkills.map(skill => { 
                  const Icon = skill.icon; 
                  return (
                    <button 
                      key={skill.name} 
                      onClick={() => setActiveSkill(skill)} 
                      onMouseEnter={() => setHoveredSkill(skill.name)} 
                      onMouseLeave={() => setHoveredSkill(null)} 
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border bg-white dark:bg-[#161513] border-stone-200 dark:border-stone-800/60 hover:border-orange-400 hover:shadow-md hover:scale-105" 
                      style={{ 
                        borderColor: hoveredSkill === skill.name ? skill.color : undefined, 
                        boxShadow: hoveredSkill === skill.name ? `0 0 12px ${skill.color}30` : undefined 
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

        {/* Stats footer */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5, delay: 0.2 }} 
          className={`mt-14 p-5 rounded-2xl border ${surface} ${border} flex flex-wrap items-center justify-between gap-4`}
        >
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${muted} mb-1`}>
              {t('totalSkills', 'Total skills')}
            </p>
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
                style={{ 
                  background: `${cat.color}12`, 
                  color: cat.color, 
                  border: `1px solid ${cat.color}25` 
                }}
              >
                <cat.icon size={11} />
                {cat.name} · {cat.skills.length}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Skill Modal */}
      <AnimatePresence>
        {activeSkill && (
          <SkillModal 
            skill={activeSkill} 
            onClose={() => setActiveSkill(null)} 
            t={t} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
