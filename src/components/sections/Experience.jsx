import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { useLanguage } from '../../contexts/LanguageContext';
import { useThreeJS } from '../../hooks/useThreeJS';
import LazyThreeJS from '../shared/LazyThreeJS';
import {
  MapPin, Calendar, Briefcase, ChevronDown,
  Star, TrendingUp, Users, Clock, Zap, ArrowUpRight,
  Loader2, Sparkles, Trophy, Award, Target,
} from 'lucide-react';

// ─── Enhanced Data ──────────────────────────────────────────────────────
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
      { icon: TrendingUp, labelKey: 'performance', label: 'Performance', value: '+40%', color: '#10b981' },
      { icon: Clock, labelKey: 'uptime', label: 'Uptime', value: '99.9%', color: '#3b82f6' },
      { icon: Users, labelKey: 'teamSize', label: 'Team', value: '8 devs', color: '#f97316' },
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
      { icon: TrendingUp, labelKey: 'recordsProcessed', label: 'Records/day', value: '100k+', color: '#10b981' },
      { icon: Clock, labelKey: 'timeSaved', label: 'Time saved', value: '35%', color: '#3b82f6' },
      { icon: Users, labelKey: 'dashboardsBuilt', label: 'Dashboards', value: '12', color: '#8b5cf6' },
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
      { icon: TrendingUp, labelKey: 'sitesDelivered', label: 'Sites', value: '20+', color: '#10b981' },
      { icon: Users, labelKey: 'countries', label: 'Countries', value: '6', color: '#f97316' },
      { icon: Star, labelKey: 'rating', label: 'Rating', value: '4.9★', color: '#8b5cf6' },
    ],
    accent: '#8b5cf6',
    highlight: '20+ production sites across 6 countries',
    peakHeight: 2.2,
  },
];

// ─── Enhanced 3D Mountain Scene with Cinematic Effects ─────────────────
function CinematicMountainScene({ experiences, activeIdx, onPeakClick }) {
  const { 
    mountRef, 
    isReady, 
    error,
    startAnimationLoop,
    handleResize,
    useMouseInteraction,
  } = useThreeJS('experience-mountains', {
    cameraPosition: [0, 2.2, 11],
    fov: 48,
    enableShadows: true,
    onInit: ({ scene, camera, renderer }) => {
      // Cinematic fog
      scene.fog = new THREE.FogExp2(0x050a12, 0.028);
      scene.background = new THREE.Color(0x050a12);

      // Advanced Lighting System
      const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.35);
      scene.add(ambientLight);
      
      const sunLight = new THREE.DirectionalLight(0xfff4e0, 3.2);
      sunLight.position.set(6, 12, 5);
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = 2048;
      sunLight.shadow.mapSize.height = 2048;
      scene.add(sunLight);
      
      const fillLight = new THREE.PointLight(0x3b82f6, 0.9);
      fillLight.position.set(-4, 3, -2);
      scene.add(fillLight);
      
      const rimLight = new THREE.PointLight(0xf97316, 0.8);
      rimLight.position.set(2, 3, -5);
      scene.add(rimLight);
      
      const backLight = new THREE.PointLight(0x8b5cf6, 0.6);
      backLight.position.set(0, 2, -4);
      scene.add(backLight);
      
      // Floating particles for atmosphere
      const particleCount = 400;
      const particleGeo = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 20;
        particlePositions[i * 3 + 1] = Math.random() * 6;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      const particleMat = new THREE.PointsMaterial({ color: 0x88aaff, size: 0.025, transparent: true, opacity: 0.3 });
      const atmosphereParticles = new THREE.Points(particleGeo, particleMat);
      scene.add(atmosphereParticles);

      const COLORS = [0x8b5cf6, 0x3b82f6, 0xf97316];
      const HEIGHTS = experiences.map(e => e.peakHeight);
      const X_POS = [-3.5, 0, 3.5];
      const group = new THREE.Group();

      // Enhanced ground with displacement
      const groundGeo = new THREE.PlaneGeometry(22, 14, 60, 40);
      const gPos = groundGeo.attributes.position;
      for (let i = 0; i < gPos.count; i++) {
        const x = gPos.getX(i), z = gPos.getY(i);
        const dist = Math.sqrt(x * x + z * z) / 6;
        gPos.setZ(i, Math.sin(x * 0.6) * Math.cos(z * 0.5) * 0.2 * (1 - dist * 0.3));
      }
      groundGeo.computeVertexNormals();
      const groundMat = new THREE.MeshStandardMaterial({ color: 0x1a1512, metalness: 0.1, roughness: 0.9 });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -1.6;
      ground.receiveShadow = true;
      group.add(ground);

      // Decorative grid
      const gridHelper = new THREE.GridHelper(20, 24, 0xf97316, 0x2a2520);
      gridHelper.material.opacity = 0.08;
      gridHelper.material.transparent = true;
      gridHelper.position.y = -1.55;
      group.add(gridHelper);

      // Mountains with enhanced detail
      const peaks = [];
      const snowCaps = [];
      const glows = [];
      const beams = [];
      const rings = [];

      X_POS.forEach((x, i) => {
        const h = HEIGHTS[i];
        const color = COLORS[i];

        // Main mountain with more segments
        const coneGeo = new THREE.ConeGeometry(1.6 - i * 0.12, h, 12, 2);
        const cPos = coneGeo.attributes.position;
        for (let v = 0; v < cPos.count; v++) {
          const vy = cPos.getY(v);
          if (vy < h / 2) {
            cPos.setX(v, cPos.getX(v) + (Math.random() - 0.5) * 0.15);
            cPos.setZ(v, cPos.getZ(v) + (Math.random() - 0.5) * 0.15);
          }
        }
        coneGeo.computeVertexNormals();

        const mountainMat = new THREE.MeshStandardMaterial({
          color, metalness: 0.2, roughness: 0.75,
          emissive: color, emissiveIntensity: 0.04,
        });
        const mountain = new THREE.Mesh(coneGeo, mountainMat);
        mountain.position.set(x, -1.6 + h / 2, 0);
        mountain.castShadow = true;
        mountain.receiveShadow = true;
        mountain.userData = { index: i };
        group.add(mountain);
        peaks.push(mountain);

        // Wireframe detail
        const wireframe = new THREE.Mesh(coneGeo, new THREE.MeshBasicMaterial({
          color, wireframe: true, transparent: true, opacity: 0.05,
        }));
        wireframe.position.copy(mountain.position);
        group.add(wireframe);

        // Enhanced snow cap
        const snowMat = new THREE.MeshStandardMaterial({
          color: 0xffffff, emissive: 0x88aaff,
          emissiveIntensity: 0.1, roughness: 0.5,
        });
        const snow = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.5, 8), snowMat);
        snow.position.set(x, -1.6 + h - 0.12, 0);
        group.add(snow);
        snowCaps.push(snow);

        // Glow sphere
        const glowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25 });
        const glow = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), glowMat);
        glow.position.set(x, -1.6 + h + 0.2, 0);
        group.add(glow);
        glows.push(glow);

        // Light beam
        const beamMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.15, side: THREE.DoubleSide });
        const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.06, 3.2, 6, 1, true), beamMat);
        beam.position.set(x, -1.6 + h + 1.8, 0);
        group.add(beam);
        beams.push(beam);

        // Orbital ring
        const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.45 });
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.015, 8, 60), ringMat);
        ring.position.set(x, -1.6 + h + 0.22, 0);
        ring.rotation.x = Math.PI / 2.3;
        ring.userData = { speed: 0.03 - i * 0.008, baseY: -1.6 + h + 0.22 };
        group.add(ring);
        rings.push(ring);
      });

      // Distant mountains for depth
      const distantMountains = [
        { x: -7.5, h: 1.8, s: 2.5, z: -4, color: 0x2a2520 },
        { x: -4.5, h: 2.3, s: 2.0, z: -5, color: 0x2f2a25 },
        { x: 5.5, h: 2.0, s: 2.2, z: -4, color: 0x2a2520 },
        { x: 7.2, h: 1.6, s: 2.8, z: -5, color: 0x252020 },
        { x: 2.5, h: 1.5, s: 1.8, z: -6, color: 0x2f2a25 },
        { x: -2.2, h: 1.3, s: 1.6, z: -6, color: 0x2a2520 },
      ];
      distantMountains.forEach(({ x, h, s, z, color }) => {
        const mountain = new THREE.Mesh(
          new THREE.ConeGeometry(s, h, 8),
          new THREE.MeshStandardMaterial({ color, roughness: 0.9, metalness: 0.05 })
        );
        mountain.position.set(x, -1.6 + h / 2, z);
        mountain.castShadow = true;
        group.add(mountain);
      });

      // Enhanced starfield with layers
      const starLayers = [
        { count: 400, size: 0.03, opacity: 0.5, color: 0xffffff, range: 25 },
        { count: 300, size: 0.02, opacity: 0.35, color: 0xaaccff, range: 35 },
        { count: 200, size: 0.015, opacity: 0.25, color: 0x88aaff, range: 45 },
      ];
      starLayers.forEach(layer => {
        const starsGeo = new THREE.BufferGeometry();
        const starsPos = new Float32Array(layer.count * 3);
        for (let i = 0; i < layer.count; i++) {
          starsPos[i * 3] = (Math.random() - 0.5) * layer.range;
          starsPos[i * 3 + 1] = (Math.random() - 0.5) * 12 + 2;
          starsPos[i * 3 + 2] = (Math.random() - 0.5) * 18 - 8;
        }
        starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
        const starsMat = new THREE.PointsMaterial({ color: layer.color, size: layer.size, transparent: true, opacity: layer.opacity });
        const starsPoints = new THREE.Points(starsGeo, starsMat);
        group.add(starsPoints);
      });

      // Floating particles around peaks
      const peakParticles = [];
      X_POS.forEach((x, i) => {
        for (let p = 0; p < 30; p++) {
          const particle = new THREE.Mesh(
            new THREE.SphereGeometry(0.025, 6, 6),
            new THREE.MeshStandardMaterial({ color: COLORS[i], emissive: COLORS[i], emissiveIntensity: 0.2 })
          );
          particle.position.set(
            x + (Math.random() - 0.5) * 1.2,
            -1.6 + HEIGHTS[i] * 0.4 + Math.random() * HEIGHTS[i] * 0.5,
            (Math.random() - 0.5) * 1.2
          );
          particle.userData = { speed: 0.5 + Math.random() * 1, phase: Math.random() * Math.PI * 2, baseY: particle.position.y };
          group.add(particle);
          peakParticles.push(particle);
        }
      });

      scene.add(group);

      // Raycaster for mountain clicks
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

      // Animation variables
      let elapsedTime = 0;
      let mouseX = 0, mouseY = 0;
      let targetRotX = 0, targetRotY = 0;

      const onMouseMove = (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        targetRotY = mouseX * 0.15;
        targetRotX = mouseY * 0.08;
      };
      
      renderer.domElement.addEventListener('mousemove', onMouseMove);

      // Animation loop
      startAnimationLoop(() => {
        elapsedTime += 0.016;
        
        // Smooth camera tilt
        group.rotation.y += (targetRotY - group.rotation.y) * 0.05;
        group.rotation.x += (targetRotX - group.rotation.x) * 0.05;
        
        // Animate mountains
        peaks.forEach((p, i) => {
          const isActive = i === activeIdx;
          const targetIntensity = isActive ? 0.45 : 0.05;
          p.material.emissiveIntensity += (targetIntensity - p.material.emissiveIntensity) * 0.08;
          
          const pulseScale = isActive ? 1 + Math.sin(elapsedTime * 2.5) * 0.02 : 1;
          p.scale.setScalar(p.scale.x + (pulseScale - p.scale.x) * 0.1);
          
          if (glows[i]) {
            const targetOpacity = isActive ? 0.45 + Math.sin(elapsedTime * 2.5) * 0.15 : 0.15;
            glows[i].material.opacity += (targetOpacity - glows[i].material.opacity) * 0.1;
            glows[i].scale.setScalar(isActive ? 1 + Math.sin(elapsedTime * 2) * 0.1 : 1);
          }
          
          if (beams[i]) {
            beams[i].material.opacity = isActive ? 0.35 + Math.sin(elapsedTime * 3) * 0.12 : 0.1;
          }
          
          if (snowCaps[i]) {
            snowCaps[i].material.emissiveIntensity = isActive ? 0.4 : 0.08;
          }
        });
        
        // Animate rings
        rings.forEach(ring => {
          ring.rotation.z += ring.userData.speed;
          ring.position.y = ring.userData.baseY + Math.sin(elapsedTime * 1.5) * 0.03;
        });
        
        // Animate floating particles
        peakParticles.forEach(particle => {
          particle.position.y = particle.userData.baseY + Math.sin(elapsedTime * particle.userData.speed + particle.userData.phase) * 0.04;
        });
        
        // Rotate atmosphere particles
        atmosphereParticles.rotation.y += 0.0005;
        atmosphereParticles.rotation.x += 0.0003;
        
        // Animate lights
        fillLight.intensity = 0.8 + Math.sin(elapsedTime * 1.2) * 0.15;
        rimLight.intensity = 0.7 + Math.sin(elapsedTime * 1.5) * 0.12;
        backLight.intensity = 0.55 + Math.sin(elapsedTime * 0.9) * 0.1;
      });

      return () => {
        renderer.domElement.removeEventListener('click', onClick);
        renderer.domElement.removeEventListener('mousemove', onMouseMove);
      };
    },
  });

  // Mouse interaction for camera tilt
  useMouseInteraction(() => {});

  // Resize handler
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#080c14] to-[#050a12]">
        <div className="text-center">
          <div className="text-5xl mb-3 animate-pulse">🏔️</div>
          <p className="text-sm font-bold text-white/40">Cinematic Mountains</p>
          <p className="text-[10px] text-white/25 mt-1">Click cards below to explore</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" style={{ touchAction: 'none' }}>
      {!isReady && (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#080c14] to-[#050a12]">
          <div className="relative">
            <div className="w-8 h-8 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin" />
            <div className="absolute inset-0 w-8 h-8 rounded-full bg-orange-500/10 animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Enhanced Stat Tile ─────────────────────────────────────────────────
const StatTile = ({ icon: Icon, label, value, accent, color }) => (
  <motion.div 
    className="flex flex-col items-center justify-center p-3 rounded-xl text-center relative overflow-hidden group"
    style={{ background: `${accent}0a`, border: `1px solid ${accent}22` }}
    whileHover={{ scale: 1.05, y: -2 }}
    transition={{ type: 'spring', stiffness: 400 }}
  >
    <motion.div 
      className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5"
      initial={{ x: '-100%' }}
      whileHover={{ x: '100%' }}
      transition={{ duration: 0.6 }}
    />
    <Icon size={14} style={{ color: accent || color }} className="mb-1.5 opacity-80" />
    <motion.span 
      className="text-xl font-black leading-none" 
      style={{ color: accent || color }}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 500 }}
    >
      {value}
    </motion.span>
    <span className="text-[7px] text-stone-500 uppercase tracking-widest mt-1 leading-tight font-bold">{label}</span>
  </motion.div>
);

// ─── Enhanced Skill Bar ─────────────────────────────────────────────────
const SkillBar = ({ label, level, accent, delay }) => (
  <motion.div 
    className="flex items-center gap-2"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
  >
    <span className="text-[9px] font-semibold text-stone-400 w-20 shrink-0 truncate">{label}</span>
    <div className="flex-1 h-1.5 rounded-full bg-stone-800 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 1, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full relative"
        style={{ background: `linear-gradient(90deg, ${accent}88, ${accent})` }}
      >
        <motion.div 
          className="absolute top-0 right-0 h-full w-1 bg-white/30"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </div>
    <span className="text-[9px] font-bold w-7 text-right shrink-0" style={{ color: accent }}>{level}%</span>
  </motion.div>
);

// ─── Enhanced Experience Card ───────────────────────────────────────────
const ExpCard = ({ exp, index, isActive, onClick, t }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 300 }}
    onClick={onClick}
    whileHover={{ y: -6 }}
    className="group relative rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 flex-1"
    style={{
      border: `1px solid ${isActive ? exp.accent + '60' : 'rgba(255,255,255,0.05)'}`,
      boxShadow: isActive ? `0 8px 32px ${exp.accent}20, 0 0 0 1px ${exp.accent}30 inset` : '0 4px 20px rgba(0,0,0,0.2)',
    }}
  >
    <motion.div 
      className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 pointer-events-none"
      animate={{ opacity: isActive ? 0.5 : 0 }}
      transition={{ duration: 0.3 }}
    />
    
    <div className="h-1 w-full relative overflow-hidden" style={{ background: isActive ? exp.accent : `${exp.accent}40` }}>
      {isActive && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>

    {isActive && (
      <motion.div 
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
        style={{ background: exp.accent }}
        layoutId="active-peak-indicator"
      />
    )}

    <div className="bg-gradient-to-br from-[#161513] to-[#1a1815] p-5">
      <div className="flex items-start justify-between mb-3">
        <motion.div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-black shrink-0"
          style={{
            background: isActive ? exp.accent : `${exp.accent}15`,
            color: isActive ? 'white' : exp.accent,
            border: `1px solid ${exp.accent}40`,
          }}
          whileHover={{ scale: 1.05 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>

        <div className="flex flex-col items-end gap-1 ml-2">
          <motion.div 
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-wider"
            style={{ background: `${exp.accent}15`, color: exp.accent, border: `1px solid ${exp.accent}25` }}
            whileHover={{ scale: 1.05 }}
          >
            {exp.type}
          </motion.div>
          {exp.current && (
            <div className="flex items-center gap-1.5 text-[9px] font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-70" />
                <span className="relative rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-green-400">{t('current', 'Current')}</span>
            </div>
          )}
        </div>
      </div>

      <motion.h3 
        className="font-black text-base leading-tight mb-1 transition-colors"
        style={isActive ? { color: exp.accent } : { color: '#e5e5e5' }}
      >
        {exp.role}
      </motion.h3>
      <p className="text-[10px] font-semibold mb-2.5" style={{ color: exp.accent }}>{exp.company}</p>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="flex items-center gap-1 text-[9px] text-stone-500">
          <Calendar size={8} /> {exp.period}
        </span>
        <span className="flex items-center gap-1 text-[9px] text-stone-500">
          <MapPin size={8} /> {exp.location}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Zap size={10} style={{ color: exp.accent }} />
        <span className="text-[9px] font-semibold text-stone-400 italic">{exp.highlight}</span>
      </div>

      <p className="text-[11px] leading-relaxed text-stone-400 mb-3 line-clamp-2">{exp.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {exp.skills.slice(0, 4).map(s => (
          <motion.span 
            key={s} 
            className="px-2 py-0.5 rounded-md text-[8px] font-bold uppercase"
            style={{ background: `${exp.accent}12`, border: `1px solid ${exp.accent}25`, color: exp.accent }}
            whileHover={{ scale: 1.05 }}
          >
            {s}
          </motion.span>
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
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t space-y-4" style={{ borderColor: `${exp.accent}20` }}>
              <div>
                <p className="text-[8px] uppercase tracking-widest text-stone-500 mb-2.5 font-bold">📊 Key Metrics</p>
                <div className="grid grid-cols-3 gap-2">
                  {exp.achievements.map((a, i) => (
                    <StatTile key={i} {...a} accent={exp.accent} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-widest text-stone-500 mb-2.5 font-bold">⚡ Proficiency</p>
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
        <motion.div 
          animate={{ rotate: isActive ? 180 : 0 }} 
          transition={{ duration: 0.3, type: 'spring', stiffness: 400 }}
        >
          <ChevronDown size={12} style={{ color: exp.accent, opacity: 0.6 }} />
        </motion.div>
      </div>
    </div>
  </motion.div>
);

// ─── Main Component ────────────────────────────────────────────
export default function Experience() {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const experiences = getExperiences(t);
  const [activeIdx, setActiveIdx] = useState(0);
  const [filter, setFilter] = useState('all');
  const [hoveredStat, setHoveredStat] = useState(null);

  const FILTERS = [
    { key: 'all', label: t('all', 'All'), icon: Star },
    { key: 'fullTime', label: t('fullTime', 'Full-time'), icon: Briefcase },
    { key: 'internship', label: t('internship', 'Internship'), icon: Users },
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
    { label: t('yearsActive', 'Years active'), value: `${yearsActive}+`, color: '#f97316', icon: Trophy, trend: '+2' },
    { label: t('rolesHeld', 'Roles held'), value: experiences.length, color: '#3b82f6', icon: Briefcase, trend: '+1' },
    { label: t('skillsMastered', 'Skills'), value: totalSkills, color: '#8b5cf6', icon: Code2, trend: '+5' },
    { label: t('projectsDelivered', 'Projects'), value: '20+', color: '#10b981', icon: Target, trend: '+3' },
  ];

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 z-50 origin-left"
        style={{ scaleX }}
      />
      
      <section
        id="experience"
        className="relative py-28 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#0c0b0a] to-[#050a12]"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-[500px] h-[500px] rounded-full bg-orange-500/[0.04] blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full bg-blue-500/[0.03] blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/[0.02] blur-3xl" />
        </div>

        <div className="relative max-w-[1200px] mx-auto">
          {/* Premium Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  className="w-8 h-px bg-gradient-to-r from-orange-500 to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  transition={{ duration: 0.8 }}
                />
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-orange-500">{t('careerPath', 'Career Path')}</p>
                <motion.div 
                  className="w-12 h-px bg-gradient-to-l from-orange-500 to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <h2 className="text-[clamp(42px,6vw,72px)] font-black leading-[0.92] tracking-tighter text-stone-100">
                {t('work', 'Work')}{' '}
                <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
                  {t('experience', 'Experience')}
                </span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed max-w-md text-stone-500">
                {t('experienceDesc', 'Each peak represents a milestone — click a mountain to explore the journey below.')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex gap-2 p-1 rounded-full bg-stone-900/40 backdrop-blur-sm">
                {FILTERS.map(f => {
                  const Icon = f.icon;
                  const isActive = filter === f.key;
                  return (
                    <motion.button
                      key={f.key}
                      onClick={() => setFilter(f.key)}
                      className={`relative px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-250 flex items-center gap-2 overflow-hidden ${
                        isActive ? 'text-white' : 'text-stone-500 hover:text-stone-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="filter-pill"
                          className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                      <Icon size={12} className="relative z-10" />
                      <span className="relative z-10">{f.label}</span>
                      <span className="relative z-10 ml-1 text-[9px] opacity-70">
                        {f.key === 'all' ? experiences.length : experiences.filter(e => e.type === f.label).length}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Premium Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
          >
            {STATS.map((s, i) => (
              <motion.div 
                key={s.label} 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.3 + i * 0.08, type: 'spring' }}
                whileHover={{ y: -5, scale: 1.02 }}
                onMouseEnter={() => setHoveredStat(i)}
                onMouseLeave={() => setHoveredStat(null)}
                className="relative group p-5 rounded-2xl bg-gradient-to-br from-[#161513] to-[#1a1815] border border-stone-800/60 hover:border-orange-500/40 transition-all duration-300 overflow-hidden text-center"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent transition-all duration-500"
                  animate={{ opacity: hoveredStat === i ? 1 : 0 }}
                />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center mx-auto mb-3 border border-stone-700/50 group-hover:border-orange-500/30 transition-all">
                  <s.icon size={18} style={{ color: s.color }} />
                </div>
                <p className="text-3xl font-black leading-none" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[9px] uppercase tracking-widest mt-2 text-stone-500">{s.label}</p>
                <motion.span 
                  className="absolute top-3 right-3 text-[8px] font-bold text-green-500"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ↑{s.trend}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>

          {/* Cinematic 3D Mountain Scene */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden border border-stone-800/40 bg-gradient-to-b from-[#080c14] to-[#050a12] mb-6 shadow-2xl"
            style={{ height: 420 }}
          >
            <LazyThreeJS
              componentId="experience-mountains"
              fallback={
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#080c14] to-[#050a12]">
                  <div className="text-center">
                    <div className="relative w-12 h-12 mx-auto mb-3">
                      <div className="absolute inset-0 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
                      <div className="absolute inset-2 rounded-full bg-orange-500/10 animate-pulse" />
                    </div>
                    <p className="text-xs text-white/40 animate-pulse">{t('loading', 'Loading cinematic mountains...')}</p>
                  </div>
                </div>
              }
            >
              <CinematicMountainScene 
                experiences={experiences} 
                activeIdx={activeIdx} 
                onPeakClick={handlePeakClick} 
              />
            </LazyThreeJS>

            <div className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-4 pb-2">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  className="px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-wider backdrop-blur-sm cursor-pointer"
                  style={{
                    background: activeIdx === i ? exp.accent : `${exp.accent}20`,
                    color: activeIdx === i ? 'white' : exp.accent,
                    border: `1px solid ${exp.accent}50`,
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  onClick={() => handlePeakClick(i)}
                >
                  {exp.period.split(' ')[0]}
                </motion.div>
              ))}
            </div>

            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative flex h-1.5 w-1.5"
              >
                <span className="animate-ping absolute h-full w-full rounded-full bg-orange-400 opacity-70" />
                <span className="relative rounded-full h-1.5 w-1.5 bg-orange-500" />
              </motion.div>
              <span className="text-[8px] font-bold uppercase tracking-widest text-white/70">
                {t('clickPeak', 'Click any peak')}
              </span>
            </div>
          </motion.div>

          {/* Experience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
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

          {/* Premium CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.01 }}
            className="mt-8 p-5 rounded-xl bg-gradient-to-r from-[#161513] to-[#1a1815] border border-stone-800/60 hover:border-orange-500/40 transition-all duration-300 overflow-hidden relative group"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/25"
              >
                <Award size={20} className="text-white" />
              </motion.div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm font-black text-stone-100">{t('whatsNext', "What's Next?")}</p>
                <p className="text-xs text-stone-500 mt-0.5">
                  {t('nextPeak', 'The next peak is yet to be climbed — open to new challenges and opportunities')}
                </p>
              </div>
              <motion.a 
                href="#contact" 
                className="group/btn flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-[10px] font-bold uppercase tracking-wider transition-all shadow-lg shadow-orange-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hireMe', 'Hire Me')}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowUpRight size={12} />
                </motion.div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
