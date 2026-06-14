import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { useLanguage } from '../../contexts/LanguageContext';
import { useThreeJS } from '../../hooks/useThreeJS';
import LazyThreeJS from '../shared/LazyThreeJS';
import {
  MapPin, Calendar, Briefcase, ChevronDown,
  Star, TrendingUp, Users, Clock, Zap, ArrowUpRight,
  Loader2, Sparkles, Trophy, Award, Target, Code2,
} from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────
const getExperiences = (t) => [
  {
    company: 'Kirehe Adventist TVET School',
    role: 'Senior Full-Stack Developer',
    period: '2025 – Present',
    location: 'Kigali, Rwanda',
    type: t('fullTime', 'Full-time'),
    current: true,
    description: 'Architecting scalable microservices and leading the frontend migration to Next.js. Improved system performance by 40% through strategic caching and query optimization.',
    skills: ['React', 'Go', 'AWS', 'Docker', 'PostgreSQL', 'Redis'],
    skillLevels: [95, 82, 78, 85, 88, 75],
    achievements: [
      { icon: TrendingUp, label: 'Performance', value: '+40%', color: '#10b981' },
      { icon: Clock, label: 'Uptime', value: '99.9%', color: '#3b82f6' },
      { icon: Users, label: 'Team', value: '8 devs', color: '#f97316' },
    ],
    accent: '#f97316',
    highlight: 'Led full frontend architecture migration',
    peakHeight: 3.8,
  },
  {
    company: 'Kirehe Adventist TVET School',
    role: 'Frontend Engineer',
    period: '2024 – 2025',
    location: 'Kigali, Rwanda',
    type: t('fullTime', 'Full-time'),
    current: false,
    description: 'Built interactive data-visualization dashboards processing 100k+ daily records. Pioneered AI voice-command integration, cutting navigation time by 35%.',
    skills: ['TypeScript', 'D3.js', 'Tailwind CSS', 'GraphQL', 'Framer Motion'],
    skillLevels: [90, 78, 94, 82, 88],
    achievements: [
      { icon: TrendingUp, label: 'Records/day', value: '100k+', color: '#10b981' },
      { icon: Clock, label: 'Time saved', value: '35%', color: '#3b82f6' },
      { icon: Users, label: 'Dashboards', value: '12', color: '#8b5cf6' },
    ],
    accent: '#3b82f6',
    highlight: 'AI voice-command integration',
    peakHeight: 2.9,
  },
  {
    company: 'Kirehe Adventist TVET School',
    role: 'Junior Developer',
    period: '2023 – 2024',
    location: 'Kigali, Rwanda',
    type: t('internship', 'Internship'),
    current: false,
    description: 'Built responsive landing pages and managed CMS integrations for international clients across 6 countries. Delivered 20+ production sites on time and under budget.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MySQL'],
    skillLevels: [88, 85, 90, 85, 78, 75],
    achievements: [
      { icon: TrendingUp, label: 'Sites', value: '20+', color: '#10b981' },
      { icon: Users, label: 'Countries', value: '6', color: '#f97316' },
      { icon: Star, label: 'Rating', value: '4.9★', color: '#8b5cf6' },
    ],
    accent: '#8b5cf6',
    highlight: '20+ production sites across 6 countries',
    peakHeight: 2.2,
  },
];

// ─── 3D Mountain Scene ────────────────────────────────────────
function MountainScene({ experiences, activeIdx, onPeakClick }) {
  const { 
    mountRef, 
    isReady, 
    error,
    startAnimationLoop,
    handleResize,
  } = useThreeJS('experience-mountains', {
    cameraPosition: [0, 2, 10],
    fov: 50,
    enableShadows: true,
    onInit: ({ scene, camera, renderer }) => {
      scene.fog = new THREE.FogExp2(0x0c0b0a, 0.035);
      scene.background = new THREE.Color(0x0c0b0a);

      // Lighting
      scene.add(new THREE.AmbientLight(0xffffff, 0.25));
      
      const sun = new THREE.DirectionalLight(0xfff4e0, 3);
      sun.position.set(6, 10, 5);
      sun.castShadow = true;
      scene.add(sun);
      
      const fillLight = new THREE.DirectionalLight(0x3b82f6, 0.8);
      fillLight.position.set(-8, 2, -3);
      scene.add(fillLight);
      
      const rimLight = new THREE.DirectionalLight(0xf97316, 0.6);
      rimLight.position.set(0, -2, 6);
      scene.add(rimLight);

      const COLORS = [0x8b5cf6, 0x3b82f6, 0xf97316];
      const HEIGHTS = experiences.map(e => e.peakHeight);
      const X_POS = [-3.2, 0, 3.2];
      const group = new THREE.Group();

      // Ground plane
      const groundGeo = new THREE.PlaneGeometry(20, 12, 40, 20);
      const gPos = groundGeo.attributes.position;
      for (let i = 0; i < gPos.count; i++) {
        const x = gPos.getX(i), z = gPos.getY(i);
        const d = Math.sqrt(x * x + z * z) / 8;
        gPos.setZ(i, Math.sin(x * 0.8) * Math.cos(z * 0.6) * 0.15 * d);
      }
      groundGeo.computeVertexNormals();
      const ground = new THREE.Mesh(groundGeo, new THREE.MeshStandardMaterial({
        color: 0x1a1512, metalness: 0.0, roughness: 0.95,
      }));
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -1.5;
      ground.receiveShadow = true;
      group.add(ground);

      const gridHelper = new THREE.GridHelper(18, 22, 0xf97316, 0x1f1b16);
      gridHelper.material.opacity = 0.07;
      gridHelper.material.transparent = true;
      gridHelper.position.y = -1.48;
      group.add(gridHelper);

      // Mountains
      const peaks = [];
      const snowCaps = [];
      const glows = [];
      const beams = [];
      const rings = [];

      X_POS.forEach((x, i) => {
        const h = HEIGHTS[i];
        const color = COLORS[i];

        const coneGeo = new THREE.ConeGeometry(1.5 - i * 0.1, h, 32, 32);
        const cPos = coneGeo.attributes.position;
        for (let v = 0; v < cPos.count; v++) {
          const vy = cPos.getY(v);
          if (vy < h / 2 - 0.1) {
            cPos.setX(v, cPos.getX(v) + (Math.random() - 0.5) * 0.18);
            cPos.setZ(v, cPos.getZ(v) + (Math.random() - 0.5) * 0.18);
          }
        }
        coneGeo.computeVertexNormals();

        const cone = new THREE.Mesh(coneGeo, new THREE.MeshStandardMaterial({
          color, metalness: 0.15, roughness: 0.85,
          emissive: color, emissiveIntensity: 0.05,
        }));
        cone.position.set(x, -1.5 + h / 2, 0);
        cone.castShadow = true;
        cone.receiveShadow = true;
        cone.userData = { index: i };
        group.add(cone);
        peaks.push(cone);

        // Snow cap
        const snow = new THREE.Mesh(
          new THREE.ConeGeometry(0.35, 0.5, 16),
          new THREE.MeshStandardMaterial({
            color: 0xffffff, emissive: 0x88aaff,
            emissiveIntensity: 0.08, roughness: 0.6,
          })
        );
        snow.position.set(x, -1.5 + h - 0.12, 0);
        group.add(snow);
        snowCaps.push(snow);

        // Peak glow
        const glow = new THREE.Mesh(
          new THREE.SphereGeometry(0.25, 16, 16),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.2 })
        );
        glow.position.set(x, -1.5 + h + 0.2, 0);
        group.add(glow);
        glows.push(glow);

        // Light beam
        const beam = new THREE.Mesh(
          new THREE.CylinderGeometry(0.015, 0.04, 3, 6, 1, true),
          new THREE.MeshBasicMaterial({
            color, transparent: true, opacity: 0.18, side: THREE.DoubleSide,
          })
        );
        beam.position.set(x, -1.5 + h + 1.6, 0);
        group.add(beam);
        beams.push(beam);

        // Orbital ring
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.5, 0.012, 16, 60),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.45 })
        );
        ring.position.set(x, -1.5 + h + 0.22, 0);
        ring.rotation.x = Math.PI / 2.5;
        ring.userData = { speed: 0.025 - i * 0.005 };
        group.add(ring);
        rings.push(ring);
      });

      // Background distant mountains
      const bgMountains = [
        { x: -6.5, h: 1.6, s: 2.2, z: -3 },
        { x: -5, h: 2.1, s: 1.8, z: -4 },
        { x: 5, h: 1.8, s: 2.0, z: -3 },
        { x: 6.5, h: 1.4, s: 2.5, z: -4 },
        { x: 1.8, h: 1.3, s: 1.5, z: -5 },
        { x: -1.5, h: 1.1, s: 1.4, z: -5 },
      ];
      bgMountains.forEach(({ x, h, s, z }) => {
        const m = new THREE.Mesh(
          new THREE.ConeGeometry(s, h, 8),
          new THREE.MeshStandardMaterial({ color: 0x1a1815, roughness: 1, metalness: 0 })
        );
        m.position.set(x, -1.5 + h / 2, z);
        group.add(m);
      });

      // Stars
      const starCount = 300;
      const starPositions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 30;
        starPositions[i * 3 + 1] = Math.random() * 10 + 1;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
        color: 0xffffff, size: 0.025, transparent: true, opacity: 0.5,
      }));
      group.add(stars);

      // Floating particles
      const particleCount = 80;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 8;
        particlePositions[i * 3 + 1] = Math.random() * 3.5 - 0.5;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({
        color: 0xffffff, size: 0.015, transparent: true, opacity: 0.3,
      }));
      group.add(particles);

      scene.add(group);

      // Click detection
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      
      const onClick = (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(peaks);
        if (intersects.length > 0) {
          const idx = intersects[0].object.userData.index;
          if (idx !== undefined) onPeakClick(idx);
        }
      };
      
      renderer.domElement.addEventListener('click', onClick);

      let elapsedTime = 0;
      startAnimationLoop(() => {
        elapsedTime += 0.016;

        peaks.forEach((p, i) => {
          const isActive = i === activeIdx;
          p.material.emissiveIntensity += ((isActive ? 0.35 : 0.04) - p.material.emissiveIntensity) * 0.07;
          
          const targetScale = isActive ? 1 + Math.sin(elapsedTime * 2) * 0.015 : 1.0;
          p.scale.setScalar(p.scale.x + (targetScale - p.scale.x) * 0.1);

          if (glows[i]) {
            glows[i].material.opacity += ((isActive ? 0.45 + Math.sin(elapsedTime * 2.5) * 0.15 : 0.12) - glows[i].material.opacity) * 0.08;
            glows[i].scale.setScalar(isActive ? 1 + Math.sin(elapsedTime * 2) * 0.12 : 1);
          }

          if (beams[i]) beams[i].material.opacity = isActive ? 0.35 + Math.sin(elapsedTime * 3) * 0.1 : 0.08;
          if (snowCaps[i]) snowCaps[i].material.emissiveIntensity = isActive ? 0.35 : 0.06;
        });

        rings.forEach(r => { if (r.userData.speed) r.rotation.z += r.userData.speed; });
        stars.rotation.y += 0.0003;
        particles.rotation.y += 0.001;
      });

      return () => {
        renderer.domElement.removeEventListener('click', onClick);
      };
    },
  });

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#080c14]">
        <div className="text-center">
          <div className="text-4xl mb-2">⛰️</div>
          <p className="text-sm font-bold text-white/40">Mountain View</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={mountRef} className="w-full h-full cursor-pointer">
      {!isReady && (
        <div className="w-full h-full flex items-center justify-center bg-[#080c14]">
          <Loader2 size={24} className="animate-spin text-orange-500" />
        </div>
      )}
    </div>
  );
}

// ─── Stat Tile ─────────────────────────────────────────────────
const StatTile = ({ icon: Icon, label, value, accent }) => (
  <div className="flex flex-col items-center justify-center p-3 rounded-xl text-center"
    style={{ background: `${accent}0d`, border: `1px solid ${accent}22` }}>
    <Icon size={12} style={{ color: accent }} className="mb-1" />
    <span className="text-lg font-black leading-none" style={{ color: accent }}>{value}</span>
    <span className="text-[8px] text-stone-500 uppercase tracking-widest mt-1">{label}</span>
  </div>
);

// ─── Skill Bar ─────────────────────────────────────────────────
const SkillBar = ({ label, level, accent, delay }) => (
  <div className="flex items-center gap-2">
    <span className="text-[9px] font-medium text-stone-400 w-20 shrink-0 truncate">{label}</span>
    <div className="flex-1 h-1.5 rounded-full bg-stone-800 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${accent}88, ${accent})` }}
      />
    </div>
    <span className="text-[9px] font-bold w-7 text-right shrink-0" style={{ color: accent }}>{level}%</span>
  </div>
);

// ─── Experience Card ───────────────────────────────────────────
const ExpCard = ({ exp, index, isActive, onClick, t }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    onClick={onClick}
    whileHover={{ y: -4 }}
    className="group relative rounded-2xl cursor-pointer overflow-hidden transition-all duration-300"
    style={{
      border: `1px solid ${isActive ? exp.accent + '60' : 'rgba(255,255,255,0.06)'}`,
      boxShadow: isActive ? `0 8px 32px ${exp.accent}20` : '0 4px 20px rgba(0,0,0,0.2)',
    }}
  >
    <div className="h-1 w-full" style={{ background: isActive ? exp.accent : `${exp.accent}40` }} />

    <div className="bg-[#161513] p-5">
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-black shrink-0"
          style={{
            background: isActive ? exp.accent : `${exp.accent}15`,
            color: isActive ? 'white' : exp.accent,
            border: `1px solid ${exp.accent}35`,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider"
            style={{ background: `${exp.accent}15`, color: exp.accent }}>
            {exp.type}
          </div>
          {exp.current && (
            <div className="flex items-center gap-1 text-[9px] font-bold text-green-500">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-70" />
                <span className="relative rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              {t('current', 'Current')}
            </div>
          )}
        </div>
      </div>

      <h3 className="font-black text-sm leading-tight text-stone-100 mb-0.5"
        style={isActive ? { color: exp.accent } : {}}>
        {exp.role}
      </h3>
      <p className="text-[10px] font-semibold mb-2" style={{ color: exp.accent }}>{exp.company}</p>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="flex items-center gap-1 text-[9px] text-stone-500">
          <Calendar size={8} /> {exp.period}
        </span>
        <span className="flex items-center gap-1 text-[9px] text-stone-500">
          <MapPin size={8} /> {exp.location}
        </span>
      </div>

      <div className="flex items-center gap-1.5 mb-2.5">
        <Zap size={9} style={{ color: exp.accent }} />
        <span className="text-[9px] font-semibold text-stone-400 italic">{exp.highlight}</span>
      </div>

      <p className="text-[11px] leading-relaxed text-stone-400 mb-3">{exp.description}</p>

      <div className="flex flex-wrap gap-1">
        {exp.skills.slice(0, 4).map(s => (
          <span key={s} className="px-2 py-0.5 rounded-md text-[8px] font-bold uppercase"
            style={{ background: `${exp.accent}12`, border: `1px solid ${exp.accent}25`, color: exp.accent }}>
            {s}
          </span>
        ))}
        {exp.skills.length > 4 && (
          <span className="px-2 py-0.5 rounded-md text-[8px] font-bold text-stone-500">+{exp.skills.length - 4}</span>
        )}
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t space-y-4" style={{ borderColor: `${exp.accent}20` }}>
              <div>
                <p className="text-[8px] uppercase tracking-widest text-stone-500 mb-2">Key Metrics</p>
                <div className="grid grid-cols-3 gap-2">
                  {exp.achievements.map((a, i) => (
                    <StatTile key={i} {...a} accent={exp.accent} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-widest text-stone-500 mb-2">Proficiency</p>
                <div className="flex flex-col gap-2">
                  {exp.skills.map((s, i) => (
                    <SkillBar key={s} label={s} level={exp.skillLevels[i]} accent={exp.accent} delay={0.05 + i * 0.06} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end mt-2">
        <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={12} style={{ color: exp.accent, opacity: 0.5 }} />
        </motion.div>
      </div>
    </div>
  </motion.div>
);

// ─── Main Component ────────────────────────────────────────────
export default function Experience() {
  const { t } = useLanguage();
  
  const experiences = getExperiences(t);
  const [activeIdx, setActiveIdx] = useState(0);
  const [filter, setFilter] = useState('all');

  const FILTERS = [
    { key: 'all', label: t('all', 'All') },
    { key: 'fullTime', label: t('fullTime', 'Full-time') },
    { key: 'internship', label: t('internship', 'Internship') },
  ];

  const handlePeakClick = React.useCallback((i) => {
    setActiveIdx(prev => prev === i ? -1 : i);
  }, []);

  const filtered = useMemo(
    () => filter === 'all' 
      ? experiences 
      : experiences.filter(e => e.type === t(filter, filter)),
    [filter, t, experiences]
  );

  const startYear = 2023;
  const yearsActive = new Date().getFullYear() - startYear;
  const totalSkills = [...new Set(experiences.flatMap(e => e.skills))].length;

  const STATS = [
    { label: t('yearsActive', 'Years active'), value: `${yearsActive}+`, color: '#f97316' },
    { label: t('rolesHeld', 'Roles held'), value: experiences.length, color: '#3b82f6' },
    { label: t('skillsMastered', 'Skills mastered'), value: totalSkills, color: '#8b5cf6' },
    { label: t('projectsDelivered', 'Projects'), value: '20+', color: '#10b981' },
  ];

  return (
    <section
      id="experience"
      className="relative py-24 px-4 sm:px-6 overflow-hidden bg-[#0c0b0a]"
    >
      <div className="pointer-events-none absolute -top-40 -right-32 w-[420px] h-[420px] rounded-full bg-orange-500/[0.05] blur-3xl" />
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
              {t('careerPath', 'Career path')}
            </p>
            <h2 className="text-[clamp(38px,5.5vw,64px)] font-black leading-[0.93] tracking-tight text-stone-100">
              {t('work', 'Work')} <span className="text-orange-500 italic">{t('experience', 'Experience')}</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed max-w-xs text-stone-500">
              {t('experienceDesc', 'Each peak represents a milestone — click a mountain to explore.')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 16 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.1 }} 
            className="flex gap-2 flex-wrap"
          >
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all duration-250 ${
                  filter === f.key
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-transparent border-stone-700 text-stone-500 hover:border-stone-500 hover:text-stone-300'
                }`}
              >
                {f.label}
                <span className="ml-1.5 opacity-60 text-[9px]">
                  {f.key === 'all' ? experiences.length : experiences.filter(e => e.type === f.label).length}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
        >
          {STATS.map((s, i) => (
            <motion.div 
              key={s.label} 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.06 }}
              className="flex flex-col items-center py-4 px-3 rounded-2xl bg-[#161513] border border-stone-800/60 text-center"
            >
              <span className="text-2xl font-black leading-none" style={{ color: s.color }}>{s.value}</span>
              <span className="text-[9px] uppercase tracking-widest mt-1.5 text-stone-500">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Mountain Scene */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden border border-stone-800/50 bg-[#080c14] mb-4"
          style={{ height: 380 }}
        >
          <LazyThreeJS
            componentId="experience-mountains"
            fallback={
              <div className="w-full h-full flex items-center justify-center bg-[#080c14]">
                <div className="text-center">
                  <Loader2 size={24} className="animate-spin mx-auto mb-2 text-orange-500" />
                  <p className="text-sm text-white/50">{t('loading', 'Loading mountains...')}</p>
                </div>
              </div>
            }
          >
            <MountainScene 
              experiences={experiences} 
              activeIdx={activeIdx} 
              onPeakClick={handlePeakClick} 
            />
          </LazyThreeJS>

          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.5) 100%)' }} />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {experiences.map((exp, i) => (
              <button
                key={i}
                onClick={() => handlePeakClick(i)}
                className="px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-wider transition-all backdrop-blur-sm"
                style={{
                  background: activeIdx === i ? exp.accent : `${exp.accent}20`,
                  color: activeIdx === i ? 'white' : exp.accent,
                  border: `1px solid ${exp.accent}50`,
                }}
              >
                {exp.period.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute h-full w-full rounded-full bg-orange-400 opacity-70" />
              <span className="relative rounded-full h-1.5 w-1.5 bg-orange-500" />
            </span>
            <span className="text-[8px] font-bold uppercase tracking-widest text-white/60">
              {t('clickPeak', 'Click a peak')}
            </span>
          </div>
        </motion.div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((exp, idx) => {
              const origIdx = experiences.indexOf(exp);
              return (
                <ExpCard
                  key={exp.role + exp.period}
                  exp={exp}
                  index={idx}
                  isActive={activeIdx === origIdx}
                  onClick={() => setActiveIdx(activeIdx === origIdx ? -1 : origIdx)}
                  t={t}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-6 flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-[#161513] border border-stone-800/60 hover:border-orange-400 transition-all"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-500 shrink-0">
            <Star size={14} fill="white" stroke="none" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm font-black text-stone-100">{t('whatsNext', "What's Next?")}</p>
            <p className="text-xs text-stone-500 mt-0.5">
              {t('nextPeak', 'The next peak is yet to be climbed — open to new challenges')}
            </p>
          </div>
          <a 
            href="#contact" 
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold uppercase tracking-widest transition-all shadow-md shadow-orange-500/20 shrink-0"
          >
            {t('hireMe', 'Hire me')} <ArrowUpRight size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
