import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
  MapPin, Calendar, Briefcase, ChevronDown,
  Star, TrendingUp, Users, Clock, Zap, ArrowUpRight,
} from 'lucide-react';

// ─── Data ──────────────────────────────────────────────────────
const experiences = [
  {
    company: 'Kirehe Adventist TVET School',
    role: 'Junior Developer',
    period: '2023 – 2024',
    location: 'Kigali, Rwanda',
    type: 'Internship',
    current: false,
    description:
      'Built responsive landing pages and managed CMS integrations for international clients across 6 countries. Delivered 20+ production sites on time and under budget.',
    skills: ['JavaScript', 'PHP', 'WordPress', 'MySQL', 'Sass'],
    skillLevels: [85, 78, 82, 80, 75],
    achievements: [
      { icon: TrendingUp, label: 'Sites',     value: '20+' },
      { icon: Users,      label: 'Countries', value: '6'   },
      { icon: Star,       label: 'Rating',    value: '4.9★'},
    ],
    accent: '#8b5cf6',
    highlight: '20+ production sites across 6 countries',
    peakHeight: 0.6, // relative mountain height
  },
  {
    company: 'Kirehe Adventist TVET School',
    role: 'Frontend Engineer',
    period: '2024 – 2025',
    location: 'Kigali, Rwanda',
    type: 'Full-time',
    current: false,
    description:
      'Built interactive data-visualization dashboards processing 100k+ daily records. Pioneered AI voice-command integration, cutting navigation time by 35%.',
    skills: ['TypeScript', 'D3.js', 'Tailwind', 'GraphQL', 'Framer Motion'],
    skillLevels: [88, 75, 92, 80, 85],
    achievements: [
      { icon: TrendingUp, label: 'Records/day', value: '100k+' },
      { icon: Clock,      label: 'Time saved',  value: '35%'   },
      { icon: Users,      label: 'Dashboards',  value: '12'    },
    ],
    accent: '#3b82f6',
    highlight: 'AI voice-command integration',
    peakHeight: 0.78,
  },
  {
    company: 'Kirehe Adventist TVET School',
    role: 'Senior Full-Stack Developer',
    period: '2025 – Present',
    location: 'Kigali, Rwanda',
    type: 'Full-time',
    current: true,
    description:
      'Architecting scalable microservices and leading the frontend migration to Next.js. Improved system performance by 40% through strategic caching and query optimization.',
    skills: ['React', 'Go', 'AWS', 'Docker', 'PostgreSQL', 'Redis'],
    skillLevels: [92, 78, 75, 80, 85, 72],
    achievements: [
      { icon: TrendingUp, label: 'Performance', value: '+40%'  },
      { icon: Clock,      label: 'Uptime',      value: '99.9%' },
      { icon: Users,      label: 'Team',        value: '8 devs'},
    ],
    accent: '#f97316',
    highlight: 'Led full frontend architecture migration',
    peakHeight: 1.0,
  },
];

const FILTERS = ['All', 'Full-time', 'Internship'];

// ─── Mountain 3D scene ─────────────────────────────────────────
function MountainScene({ activeIdx, onPeakClick }) {
  const mountRef = useRef(null);
  const frameRef = useRef(null);
  const peakMeshes = useRef([]);
  const snowCaps   = useRef([]);
  const activeRef  = useRef(activeIdx);

  useEffect(() => { activeRef.current = activeIdx; }, [activeIdx]);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    el.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    // Slight fog for depth
    scene.fog = new THREE.FogExp2(0x0c0b0a, 0.035);

    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);

    // Lights
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

    const COLORS   = [0x8b5cf6, 0x3b82f6, 0xf97316];
    const ACCENTS  = ['#8b5cf6', '#3b82f6', '#f97316'];
    const HEIGHTS  = [2.2, 2.9, 3.8]; // peak heights in world units
    const X_POS    = [-3.2, 0, 3.2];
    const group    = new THREE.Group();

    // ── Ground plane ──
    const groundGeo = new THREE.PlaneGeometry(20, 12, 40, 20);
    // Undulate ground with noise-like displacement
    const gPos = groundGeo.attributes.position;
    for (let i = 0; i < gPos.count; i++) {
      const x = gPos.getX(i), z = gPos.getY(i);
      // Keep center flat, add gentle hills at edges
      const d = Math.sqrt(x * x + z * z) / 8;
      gPos.setZ(i, Math.sin(x * 0.8) * Math.cos(z * 0.6) * 0.15 * d);
    }
    groundGeo.computeVertexNormals();
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x1a1512, metalness: 0.0, roughness: 0.95,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.5;
    ground.receiveShadow = true;
    group.add(ground);

    // ── Grid lines on ground ──
    const gridHelper = new THREE.GridHelper(18, 22, 0xf97316, 0x1f1b16);
    gridHelper.material.opacity = 0.07;
    gridHelper.material.transparent = true;
    gridHelper.position.y = -1.48;
    group.add(gridHelper);

    // ── Mountains ──
    const peaks      = [];
    const snowCapArr = [];
    const glowSph    = [];
    const beams      = [];

    X_POS.forEach((x, i) => {
      const h     = HEIGHTS[i];
      const color = COLORS[i];

      // Main mountain — cone geometry
      const coneGeo = new THREE.ConeGeometry(1.5 - i * 0.1, h, 7, 1);
      // Add slight irregularity to vertices
      const cPos = coneGeo.attributes.position;
      for (let v = 0; v < cPos.count; v++) {
        const vy = cPos.getY(v);
        if (vy < h / 2 - 0.1) { // only warp lower half
          cPos.setX(v, cPos.getX(v) + (Math.random() - 0.5) * 0.18);
          cPos.setZ(v, cPos.getZ(v) + (Math.random() - 0.5) * 0.18);
        }
      }
      coneGeo.computeVertexNormals();

      const coneMat = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.15,
        roughness: 0.85,
        emissive: color,
        emissiveIntensity: 0.05,
      });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.position.set(x, -1.5 + h / 2, 0);
      cone.castShadow = true;
      cone.receiveShadow = true;
      cone.userData = { baseEmissive: 0.05, index: i };
      group.add(cone);
      peaks.push(cone);

      // Wireframe overlay for the mountain
      const wireMat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.06,
      });
      const wireframe = new THREE.Mesh(coneGeo, wireMat);
      wireframe.position.copy(cone.position);
      group.add(wireframe);

      // Snow cap — small white cone at peak
      const snowGeo = new THREE.ConeGeometry(0.32, 0.45, 7, 1);
      const snowMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.08,
        roughness: 0.6,
      });
      const snow = new THREE.Mesh(snowGeo, snowMat);
      snow.position.set(x, -1.5 + h - 0.1, 0);
      group.add(snow);
      snowCapArr.push(snow);

      // Peak glow sphere
      const glowGeo = new THREE.SphereGeometry(0.22, 12, 12);
      const glowMat = new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.2,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.set(x, -1.5 + h + 0.18, 0);
      group.add(glow);
      glowSph.push(glow);

      // Vertical light beam from peak
      const beamGeo = new THREE.CylinderGeometry(0.015, 0.04, 3, 6, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.18, side: THREE.DoubleSide,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(x, -1.5 + h + 1.6, 0);
      group.add(beam);
      beams.push(beam);

      // Orbital ring at peak
      const ringGeo = new THREE.TorusGeometry(0.45, 0.012, 6, 40);
      const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(x, -1.5 + h + 0.18, 0);
      ring.rotation.x = Math.PI / 2.5;
      ring.userData.speed = 0.025 - i * 0.005;
      group.add(ring);
    });

    peakMeshes.current = peaks;
    snowCaps.current   = snowCapArr;

    // ── Background distant mountains ──
    [
      { x: -6.5, h: 1.6, s: 2.2, z: -3 },
      { x: -5,   h: 2.1, s: 1.8, z: -4 },
      { x:  5,   h: 1.8, s: 2.0, z: -3 },
      { x:  6.5, h: 1.4, s: 2.5, z: -4 },
      { x:  1.8, h: 1.3, s: 1.5, z: -5 },
      { x: -1.5, h: 1.1, s: 1.4, z: -5 },
    ].forEach(({ x, h, s, z }) => {
      const m = new THREE.Mesh(
        new THREE.ConeGeometry(s, h, 6, 1),
        new THREE.MeshStandardMaterial({ color: 0x1a1815, roughness: 1, metalness: 0 })
      );
      m.position.set(x, -1.5 + h / 2, z);
      group.add(m);
    });

    // ── Stars above ──
    const sCnt = 250;
    const sPts = new Float32Array(sCnt * 3);
    for (let i = 0; i < sCnt; i++) {
      sPts[i*3]   = (Math.random() - 0.5) * 24;
      sPts[i*3+1] = Math.random() * 8 + 1;
      sPts[i*3+2] = (Math.random() - 0.5) * 14 - 2;
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPts, 3));
    const stars = new THREE.Points(sGeo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.035, transparent: true, opacity: 0.55 })
    );
    group.add(stars);

    // ── Floating particles near peaks ──
    const pCnt = 60;
    const pPts = new Float32Array(pCnt * 3);
    X_POS.forEach((px, mi) => {
      const base = mi * 20;
      for (let i = 0; i < 20; i++) {
        pPts[(base + i)*3]   = px + (Math.random() - 0.5) * 1.5;
        pPts[(base + i)*3+1] = -1.5 + HEIGHTS[mi] * 0.6 + Math.random() * HEIGHTS[mi] * 0.5;
        pPts[(base + i)*3+2] = (Math.random() - 0.5) * 1.5;
      }
    });
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPts, 3));
    const particles = new THREE.Points(pGeo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.4 })
    );
    group.add(particles);

    scene.add(group);

    // Mouse tilt
    let mx = 0, my = 0;
    const onMouse = (e) => {
      const r = el.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      my = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    };
    el.addEventListener('mousemove', onMouse);

    // Click on peaks
    const raycaster = new THREE.Raycaster();
    const mouse2D   = new THREE.Vector2();
    const onClick   = (e) => {
      const r = el.getBoundingClientRect();
      mouse2D.x =  ((e.clientX - r.left) / r.width)  * 2 - 1;
      mouse2D.y = -((e.clientY - r.top)  / r.height) * 2 + 1;
      raycaster.setFromCamera(mouse2D, camera);
      const hits = raycaster.intersectObjects(peaks);
      if (hits.length > 0) onPeakClick(hits[0].object.userData.index);
    };
    el.addEventListener('click', onClick);

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let t = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      t += 0.012;

      // Gentle camera sway + mouse tilt
      camera.position.x += (mx * 0.5 - camera.position.x) * 0.03;
      camera.position.y += (2 + my * 0.3 - camera.position.y) * 0.03;
      camera.lookAt(0, 0.5, 0);

      const ai = activeRef.current;

      // Peak highlight animation
      peaks.forEach((p, i) => {
        const isActive = i === ai;
        // Emissive glow
        const targetE = isActive ? 0.35 : 0.04;
        p.material.emissiveIntensity += (targetE - p.material.emissiveIntensity) * 0.07;
        // Scale pulse for active
        const targetS = isActive ? 1 + Math.sin(t * 2) * 0.015 : 1.0;
        p.scale.setScalar(p.scale.x + (targetS - p.scale.x) * 0.1);

        // Glow sphere
        const glow = glowSph[i];
        const targetO = isActive ? 0.45 + Math.sin(t * 2.5) * 0.15 : 0.12;
        glow.material.opacity += (targetO - glow.material.opacity) * 0.08;
        glow.scale.setScalar(isActive ? 1 + Math.sin(t * 2) * 0.12 : 1);

        // Beam opacity
        beams[i].material.opacity = isActive ? 0.35 + Math.sin(t * 3) * 0.1 : 0.08;

        // Snow cap emissive
        snowCapArr[i].material.emissiveIntensity = isActive ? 0.35 : 0.06;
      });

      // Orbital rings
      group.children.forEach(c => {
        if (c.userData.speed) c.rotation.z += c.userData.speed;
      });

      // Stars slow twinkle via rotation
      stars.rotation.y += 0.0003;

      // Particles drift
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      el.removeEventListener('mousemove', onMouse);
      el.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [onPeakClick]);

  return <div ref={mountRef} className="w-full h-full cursor-pointer" style={{ touchAction: 'none' }} />;
}

// ─── Stat tile ─────────────────────────────────────────────────
const StatTile = ({ icon: Icon, label, value, accent }) => (
  <div className="flex flex-col items-center justify-center p-3 rounded-xl text-center"
    style={{ background: `${accent}0d`, border: `1px solid ${accent}22` }}>
    <Icon size={12} style={{ color: accent }} className="mb-1 opacity-80" />
    <span className="text-lg font-black leading-none" style={{ color: accent }}>{value}</span>
    <span className="text-[8px] text-stone-400 uppercase tracking-widest mt-1 leading-tight">{label}</span>
  </div>
);

// ─── Skill bar ─────────────────────────────────────────────────
const SkillBar = ({ label, level, accent, delay }) => (
  <div className="flex items-center gap-2">
    <span className="text-[10px] font-medium text-stone-500 dark:text-stone-500 w-20 shrink-0 truncate">{label}</span>
    <div className="flex-1 h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${accent}88, ${accent})` }}
      />
    </div>
    <span className="text-[10px] font-bold w-7 text-right shrink-0" style={{ color: accent }}>{level}%</span>
  </div>
);

// ─── Experience card ───────────────────────────────────────────
const ExpCard = ({ exp, index, isActive, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    onClick={onClick}
    whileHover={{ y: -4 }}
    className="group relative rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 flex-1"
    style={{
      border: `1px solid ${isActive ? exp.accent + '55' : ''}`,
      boxShadow: isActive ? `0 0 0 1px ${exp.accent}25, 0 16px 40px ${exp.accent}15` : undefined,
    }}
  >
    <div className="absolute inset-0 rounded-2xl pointer-events-none border border-stone-200 dark:border-stone-800/60 transition-opacity duration-300"
      style={{ opacity: isActive ? 0 : 1 }} />

    {/* Top accent bar */}
    <div className="h-1 w-full" style={{ background: isActive ? exp.accent : `${exp.accent}35` }} />

    {/* Active peak indicator line */}
    {isActive && (
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-px h-5 -translate-y-full"
        style={{ background: `linear-gradient(to top, ${exp.accent}, transparent)` }} />
    )}

    <div className="bg-white dark:bg-[#161513] p-5">
      {/* Step number */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black shrink-0"
          style={{
            background: isActive ? exp.accent : `${exp.accent}15`,
            color: isActive ? 'white' : exp.accent,
            border: `1px solid ${exp.accent}35`,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="flex flex-col items-end gap-1 ml-2">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest"
            style={{ background: `${exp.accent}15`, color: exp.accent }}>
            {exp.type}
          </div>
          {exp.current && (
            <div className="flex items-center gap-1 text-[9px] font-bold text-green-500">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-70" />
                <span className="relative rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              Current
            </div>
          )}
        </div>
      </div>

      <h3 className="font-black text-sm leading-tight text-stone-900 dark:text-stone-100 mb-0.5 transition-colors"
        style={isActive ? { color: exp.accent } : {}}>
        {exp.role}
      </h3>
      <p className="text-[10px] font-semibold mb-2" style={{ color: exp.accent }}>{exp.company}</p>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="flex items-center gap-1 text-[10px] text-stone-400 dark:text-stone-600">
          <Calendar size={9} /> {exp.period}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-stone-400 dark:text-stone-600">
          <MapPin size={9} /> {exp.location}
        </span>
      </div>

      {/* Highlight */}
      <div className="flex items-center gap-1.5 mb-2.5">
        <Zap size={10} style={{ color: exp.accent }} />
        <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-500 italic">{exp.highlight}</span>
      </div>

      <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400 mb-3">{exp.description}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1">
        {exp.skills.slice(0, 4).map(s => (
          <span key={s} className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase"
            style={{ background: `${exp.accent}12`, border: `1px solid ${exp.accent}25`, color: exp.accent }}>
            {s}
          </span>
        ))}
        {exp.skills.length > 4 && (
          <span className="px-2 py-0.5 rounded-md text-[9px] font-bold text-stone-400">+{exp.skills.length - 4}</span>
        )}
      </div>

      {/* Expand */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t space-y-4" style={{ borderColor: `${exp.accent}20` }}>
              {/* Stats */}
              <div>
                <p className="text-[9px] uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-2">Key metrics</p>
                <div className="grid grid-cols-3 gap-2">
                  {exp.achievements.map(a => <StatTile key={a.label} {...a} accent={exp.accent} />)}
                </div>
              </div>
              {/* Skill bars */}
              <div>
                <p className="text-[9px] uppercase tracking-widest text-stone-400 dark:text-stone-600 mb-2">Proficiency</p>
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
          <ChevronDown size={13} style={{ color: exp.accent, opacity: 0.5 }} />
        </motion.div>
      </div>
    </div>
  </motion.div>
);

// ─── Main ──────────────────────────────────────────────────────
export default function Experience() {
  const [activeIdx, setActiveIdx] = useState(2); // default to tallest/current
  const [filter,    setFilter]    = useState('All');

  const handlePeakClick = React.useCallback((i) => {
    setActiveIdx(prev => prev === i ? -1 : i);
  }, []);

  const filtered = useMemo(
    () => filter === 'All' ? experiences : experiences.filter(e => e.type === filter),
    [filter]
  );

  const startYear   = 2023;
  const yearsActive = new Date().getFullYear() - startYear;
  const totalSkills = [...new Set(experiences.flatMap(e => e.skills))].length;

  const STATS = [
    { label: 'Years active',    value: `${yearsActive}+`,  color: '#f97316' },
    { label: 'Roles held',      value: experiences.length, color: '#3b82f6' },
    { label: 'Skills mastered', value: totalSkills,        color: '#8b5cf6' },
    { label: 'Sites delivered', value: '20+',              color: '#10b981' },
  ];

  return (
    <section
      id="experience"
      className="relative py-24 px-4 sm:px-6 overflow-hidden
                 bg-stone-100 dark:bg-[#0c0b0a] transition-colors duration-500"
    >
      <div className="pointer-events-none absolute -top-40 -right-32 w-[420px] h-[420px] rounded-full bg-orange-500/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 w-[360px] h-[360px] rounded-full bg-blue-500/[0.04] blur-3xl" />

      <div className="relative max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
              <span className="block w-5 h-px bg-orange-500" />
              Career path
            </p>
            <h2 className="text-[clamp(38px,5.5vw,64px)] font-black leading-[0.93] tracking-tight text-stone-900 dark:text-stone-100">
              Work <span className="text-orange-500 italic">Experience</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed max-w-xs text-stone-500 dark:text-stone-500">
              Each peak represents a milestone — the higher the mountain, the greater the growth.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="flex gap-2 flex-wrap">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all duration-250
                  ${filter === f
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-transparent border-stone-300 dark:border-stone-700 text-stone-400 dark:text-stone-500 hover:border-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                  }`}>
                {f}
                <span className="ml-1.5 opacity-60 text-[9px]">
                  {f === 'All' ? experiences.length : experiences.filter(e => e.type === f).length}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="flex flex-col items-center py-4 px-3 rounded-2xl bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800/60 text-center">
              <span className="text-2xl font-black leading-none" style={{ color: s.color }}>{s.value}</span>
              <span className="text-[9px] uppercase tracking-widest mt-1.5 text-stone-400 dark:text-stone-600">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Mountain scene ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden border border-stone-800/50 bg-[#080c14] mb-2"
          style={{ height: 340 }}
        >
          <MountainScene activeIdx={activeIdx} onPeakClick={handlePeakClick} />

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.5) 100%)' }} />

          {/* Bottom fade into cards */}
          <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(8,12,20,0.9))' }} />

          {/* Peak labels */}
          <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-5">
            <div className="flex items-end gap-0" style={{ width: '72%', justifyContent: 'space-between' }}>
              {experiences.map((exp, i) => (
                <div key={i} className="flex flex-col items-center gap-1"
                  style={{ width: '33%' }}>
                  <div
                    className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300"
                    style={{
                      background: activeIdx === i ? exp.accent : `${exp.accent}20`,
                      color: activeIdx === i ? 'white' : exp.accent,
                      border: `1px solid ${exp.accent}50`,
                    }}
                  >
                    {exp.period.split(' ')[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top label */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute h-full w-full rounded-full bg-orange-400 opacity-70" />
              <span className="relative rounded-full h-1.5 w-1.5 bg-orange-500" />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">Click a peak to explore</span>
          </div>
        </motion.div>

        {/* Connector dots between scene and cards */}
        <div className="flex justify-around mb-2 px-[14%]">
          {experiences.map((exp, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-px h-3" style={{ background: `linear-gradient(to bottom, ${exp.accent}60, ${exp.accent}20)` }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: exp.accent }} />
              <div className="w-px h-3" style={{ background: `linear-gradient(to bottom, ${exp.accent}20, transparent)` }} />
            </div>
          ))}
        </div>

        {/* ── Experience cards — aligned under each peak ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((exp, idx) => {
              // find original index for activeIdx sync
              const origIdx = experiences.indexOf(exp);
              return (
                <ExpCard
                  key={exp.role + exp.period}
                  exp={exp}
                  index={idx}
                  isActive={activeIdx === origIdx}
                  onClick={() => setActiveIdx(activeIdx === origIdx ? -1 : origIdx)}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* End CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-6 flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#161513] border border-stone-200 dark:border-stone-800/60 hover:border-orange-400 transition-all"
        >
          <motion.div
            animate={{ boxShadow: ['0 0 0 0 rgba(249,115,22,0.4)', '0 0 0 10px rgba(249,115,22,0)', '0 0 0 0 rgba(249,115,22,0)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-500 shrink-0"
          >
            <Star size={14} fill="white" stroke="none" />
          </motion.div>
          <div>
            <p className="text-sm font-black text-stone-900 dark:text-stone-100">What&apos;s Next?</p>
            <p className="text-xs text-stone-400 dark:text-stone-600 mt-0.5">The next peak is yet to be climbed — open to new challenges</p>
          </div>
          <a href="#contact" className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold uppercase tracking-widest transition-all shadow-md shadow-orange-500/20 shrink-0">
            Hire me <ArrowUpRight size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
