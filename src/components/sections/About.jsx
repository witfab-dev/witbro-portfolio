// components/sections/About.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
  Layers, Globe, Zap, ShieldCheck, Terminal,
  ArrowUpRight, Sparkles, Coffee, Code2,
  BookOpen, Eye, Lightbulb, User, Laptop, Monitor,
  Cpu, Wifi, Battery,
} from 'lucide-react';

// ─── Complete Developer Workspace 3D Scene ────────────────────────────
function DeveloperWorkspaceScene() {
  const mountRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mountRef.current) return;

    try {
      // --- SETUP SCENE ---
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x050a12);
      scene.fog = new THREE.FogExp2(0x050a12, 0.008);

      const camera = new THREE.PerspectiveCamera(50, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
      camera.position.set(0, 1.5, 5.5);
      camera.lookAt(0, 1.2, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x050a12, 1);
      mountRef.current.appendChild(renderer.domElement);

      // --- LIGHTING SYSTEM ---
      const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.5);
      scene.add(ambientLight);
      
      const mainLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
      mainLight.position.set(5, 8, 3);
      mainLight.castShadow = true;
      scene.add(mainLight);
      
      const fillLight = new THREE.PointLight(0x4466cc, 0.6);
      fillLight.position.set(-3, 2, 4);
      scene.add(fillLight);
      
      const rimLight = new THREE.PointLight(0xff66aa, 0.4);
      rimLight.position.set(2, 2.5, -3);
      scene.add(rimLight);
      
      const screenGlow = new THREE.PointLight(0x44aaff, 0.8);
      screenGlow.position.set(0, 1.3, 0.8);
      scene.add(screenGlow);

      // --- DESK & WORKSPACE ---
      const workspaceGroup = new THREE.Group();
      
      // Desk surface
      const deskMat = new THREE.MeshStandardMaterial({ color: 0x2a1f1a, metalness: 0.3, roughness: 0.6 });
      const deskTop = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.08, 2.2), deskMat);
      deskTop.position.set(0, 0.6, 0);
      deskTop.castShadow = true;
      deskTop.receiveShadow = true;
      workspaceGroup.add(deskTop);
      
      // Desk legs
      const legMat = new THREE.MeshStandardMaterial({ color: 0x1a1210, metalness: 0.7, roughness: 0.4 });
      const legPositions = [[-1.4, 0.3, -0.9], [1.4, 0.3, -0.9], [-1.4, 0.3, 0.8], [1.4, 0.3, 0.8]];
      legPositions.forEach(pos => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.6, 0.1), legMat);
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        workspaceGroup.add(leg);
      });
      
      // Laptop - Base
      const laptopBaseMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8, roughness: 0.3 });
      const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.05, 0.65), laptopBaseMat);
      laptopBase.position.set(0, 0.68, -0.2);
      laptopBase.castShadow = true;
      workspaceGroup.add(laptopBase);
      
      // Laptop - Screen
      const screenMat = new THREE.MeshStandardMaterial({ color: 0x111122, metalness: 0.9, roughness: 0.2, emissive: 0x224466, emissiveIntensity: 0.3 });
      const laptopScreen = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.55, 0.03), screenMat);
      laptopScreen.position.set(0, 0.96, -0.18);
      laptopScreen.castShadow = true;
      workspaceGroup.add(laptopScreen);
      
      // Screen glow effect
      const screenGlowLight = new THREE.PointLight(0x4488ff, 0.5);
      screenGlowLight.position.set(0, 0.96, -0.1);
      workspaceGroup.add(screenGlowLight);
      
      // Keyboard keys effect
      for (let i = -4; i <= 4; i++) {
        for (let j = -2; j <= 2; j++) {
          if (Math.random() > 0.7) {
            const key = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.01, 0.045), new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.5 }));
            key.position.set(i * 0.065, 0.71, j * 0.065 - 0.1);
            workspaceGroup.add(key);
          }
        }
      }
      
      // Mouse
      const mouse = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.6 }));
      mouse.position.set(0.5, 0.7, 0.3);
      mouse.castShadow = true;
      workspaceGroup.add(mouse);
      
      // Coffee mug
      const mugMat = new THREE.MeshStandardMaterial({ color: 0xcc6633, metalness: 0.2 });
      const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.1, 16), mugMat);
      mug.position.set(-0.6, 0.69, 0.4);
      mug.castShadow = true;
      workspaceGroup.add(mug);
      
      // Steam effect (particles)
      const steamCount = 30;
      const steamPositions = new Float32Array(steamCount * 3);
      for (let i = 0; i < steamCount; i++) {
        steamPositions[i * 3] = -0.6 + (Math.random() - 0.5) * 0.1;
        steamPositions[i * 3 + 1] = 0.75 + Math.random() * 0.3;
        steamPositions[i * 3 + 2] = 0.4 + (Math.random() - 0.5) * 0.1;
      }
      const steamGeo = new THREE.BufferGeometry();
      steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));
      const steamMat = new THREE.PointsMaterial({ color: 0x88aaff, size: 0.005, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
      const steam = new THREE.Points(steamGeo, steamMat);
      workspaceGroup.add(steam);
      
      workspaceGroup.position.y = -0.2;
      scene.add(workspaceGroup);

      // --- HUMAN FIGURE (Sitting at desk) ---
      const humanGroup = new THREE.Group();
      
      // Body/Torso (leaning slightly forward)
      const torsoMat = new THREE.MeshStandardMaterial({ color: 0x2a2a3a, metalness: 0.1, roughness: 0.5 });
      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.3, 0.7, 8), torsoMat);
      torso.position.set(0, 0.45, -0.3);
      torso.castShadow = true;
      humanGroup.add(torso);
      
      // Shoulders
      const shoulderMat = new THREE.MeshStandardMaterial({ color: 0x2a2a3a });
      const leftShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), shoulderMat);
      leftShoulder.position.set(-0.4, 0.8, -0.25);
      humanGroup.add(leftShoulder);
      
      const rightShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), shoulderMat);
      rightShoulder.position.set(0.4, 0.8, -0.25);
      humanGroup.add(rightShoulder);
      
      // Arms reaching to keyboard
      const armMat = new THREE.MeshStandardMaterial({ color: 0xd4a574 });
      const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.55, 6), armMat);
      leftArm.position.set(-0.48, 0.65, -0.15);
      leftArm.rotation.z = 0.3;
      leftArm.rotation.x = 0.5;
      leftArm.castShadow = true;
      humanGroup.add(leftArm);
      
      const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.55, 6), armMat);
      rightArm.position.set(0.48, 0.65, -0.15);
      rightArm.rotation.z = -0.3;
      rightArm.rotation.x = 0.5;
      rightArm.castShadow = true;
      humanGroup.add(rightArm);
      
      // Hands
      const handMat = new THREE.MeshStandardMaterial({ color: 0xd4a574 });
      const leftHand = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 6), handMat);
      leftHand.position.set(-0.48, 0.42, 0.1);
      humanGroup.add(leftHand);
      
      const rightHand = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 6), handMat);
      rightHand.position.set(0.48, 0.42, 0.1);
      humanGroup.add(rightHand);
      
      // Head
      const headMat = new THREE.MeshStandardMaterial({ color: 0xd4a574, roughness: 0.3 });
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 32), headMat);
      head.position.set(0, 1.02, -0.25);
      head.castShadow = true;
      humanGroup.add(head);
      
      // Hair
      const hairMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2a });
      const hair = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), hairMat);
      hair.position.set(0, 1.1, -0.28);
      hair.scale.set(1, 0.4, 0.9);
      humanGroup.add(hair);
      
      // Glasses (developer style)
      const glassesMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9 });
      const leftLens = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.03), glassesMat);
      leftLens.position.set(-0.12, 1.02, -0.1);
      humanGroup.add(leftLens);
      
      const rightLens = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.03), glassesMat);
      rightLens.position.set(0.12, 1.02, -0.1);
      humanGroup.add(rightLens);
      
      const glassesBridge = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 0.03), glassesMat);
      glassesBridge.position.set(0, 1.02, -0.1);
      humanGroup.add(glassesBridge);
      
      humanGroup.position.set(0, 0.3, 0.2);
      scene.add(humanGroup);
      
      // --- CHAIR ---
      const chairGroup = new THREE.Group();
      const chairMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2a, metalness: 0.2 });
      
      // Seat
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.08, 0.55), chairMat);
      seat.position.set(0, 0.2, -0.4);
      seat.castShadow = true;
      chairGroup.add(seat);
      
      // Backrest
      const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.5, 0.08), chairMat);
      backrest.position.set(0, 0.5, -0.75);
      backrest.castShadow = true;
      chairGroup.add(backrest);
      
      chairGroup.position.set(0, 0.1, 0);
      scene.add(chairGroup);
      
      // --- FLOATING CODE PARTICLES (Developer aura) ---
      const codeParticleCount = 800;
      const codeParticlesPos = new Float32Array(codeParticleCount * 3);
      const codeParticlesColors = new Float32Array(codeParticleCount * 3);
      for (let i = 0; i < codeParticleCount; i++) {
        codeParticlesPos[i * 3] = (Math.random() - 0.5) * 5;
        codeParticlesPos[i * 3 + 1] = Math.random() * 3;
        codeParticlesPos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
        
        const colorChoice = Math.random();
        if (colorChoice < 0.33) {
          codeParticlesColors[i * 3] = 0.3;
          codeParticlesColors[i * 3 + 1] = 0.8;
          codeParticlesColors[i * 3 + 2] = 0.4;
        } else if (colorChoice < 0.66) {
          codeParticlesColors[i * 3] = 0.9;
          codeParticlesColors[i * 3 + 1] = 0.5;
          codeParticlesColors[i * 3 + 2] = 0.2;
        } else {
          codeParticlesColors[i * 3] = 0.4;
          codeParticlesColors[i * 3 + 1] = 0.6;
          codeParticlesColors[i * 3 + 2] = 0.9;
        }
      }
      const codeParticlesGeo = new THREE.BufferGeometry();
      codeParticlesGeo.setAttribute('position', new THREE.BufferAttribute(codeParticlesPos, 3));
      codeParticlesGeo.setAttribute('color', new THREE.BufferAttribute(codeParticlesColors, 3));
      const codeParticlesMat = new THREE.PointsMaterial({ size: 0.012, vertexColors: true, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
      const codeParticles = new THREE.Points(codeParticlesGeo, codeParticlesMat);
      scene.add(codeParticles);
      
      // --- BACKGROUND TECH GRID ---
      const gridHelper = new THREE.GridHelper(12, 30, 0x3b82f6, 0x1f3a5f);
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.15;
      gridHelper.position.y = -0.5;
      scene.add(gridHelper);
      
      // --- STARFIELD BACKGROUND ---
      const starCount = 1000;
      const starPositions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 30;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      const starMat = new THREE.PointsMaterial({ color: 0x88aaff, size: 0.02, transparent: true, opacity: 0.4 });
      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);
      
      // --- NEURAL NETWORK CONNECTIONS (Spider-web around person) ---
      const neuralPoints = [];
      for (let i = 0; i < 150; i++) {
        const point = new THREE.Vector3(
          (Math.random() - 0.5) * 3.5,
          Math.random() * 2.2,
          (Math.random() - 0.5) * 3 - 0.5
        );
        neuralPoints.push(point);
      }
      
      const neuralConnections = [];
      for (let i = 0; i < neuralPoints.length; i++) {
        for (let j = i + 1; j < neuralPoints.length; j++) {
          const dist = neuralPoints[i].distanceTo(neuralPoints[j]);
          if (dist < 0.6) {
            neuralConnections.push(neuralPoints[i].x, neuralPoints[i].y, neuralPoints[i].z);
            neuralConnections.push(neuralPoints[j].x, neuralPoints[j].y, neuralPoints[j].z);
          }
        }
      }
      const neuralGeo = new THREE.BufferGeometry();
      neuralGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(neuralConnections), 3));
      const neuralMat = new THREE.LineBasicMaterial({ color: 0x44aaff, transparent: true, opacity: 0.15 });
      const neuralNetwork = new THREE.LineSegments(neuralGeo, neuralMat);
      scene.add(neuralNetwork);
      
      // --- FLOATING TECH ICONS (Cube shapes) ---
      const techCubes = [];
      const cubeColors = [0xff4444, 0x44ff44, 0x4444ff, 0xffaa44, 0xff44ff];
      for (let i = 0; i < 40; i++) {
        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 0.06, 0.06),
          new THREE.MeshStandardMaterial({ color: cubeColors[Math.floor(Math.random() * cubeColors.length)], emissiveIntensity: 0.3 })
        );
        cube.position.set(
          (Math.random() - 0.5) * 4,
          Math.random() * 2.5,
          (Math.random() - 0.5) * 3.5 - 1
        );
        cube.userData = { speedX: (Math.random() - 0.5) * 0.005, speedY: (Math.random() - 0.5) * 0.005, rotSpeed: Math.random() * 0.02 };
        scene.add(cube);
        techCubes.push(cube);
      }
      
      // --- ANIMATION LOOP ---
      let time = 0;
      let mouseX = 0, mouseY = 0;
      let targetRotX = 0, targetRotY = 0;
      
      const onMouseMove = (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        targetRotY = mouseX * 0.3;
        targetRotX = mouseY * 0.15;
      };
      
      renderer.domElement.addEventListener('mousemove', onMouseMove);
      
      function animate() {
        requestAnimationFrame(animate);
        time += 0.016;
        
        // Smooth camera follow
        camera.position.x += (targetRotY * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (targetRotX * 0.3 - camera.position.y) * 0.05;
        camera.lookAt(0, 1.2, 0);
        
        // Screen glow pulse
        screenGlow.intensity = 0.7 + Math.sin(time * 3) * 0.2;
        screenGlowLight.intensity = 0.4 + Math.sin(time * 2.5) * 0.15;
        
        // Floating particles rotation
        codeParticles.rotation.y += 0.002;
        codeParticles.rotation.x += 0.001;
        
        // Tech cubes animation
        techCubes.forEach(cube => {
          cube.rotation.x += cube.userData.rotSpeed;
          cube.rotation.y += cube.userData.rotSpeed;
          cube.position.x += Math.sin(time * 0.5) * 0.0005;
          cube.position.y += Math.cos(time * 0.7) * 0.0005;
        });
        
        // Stars rotation
        stars.rotation.y += 0.0002;
        stars.rotation.x += 0.0001;
        
        // Steam animation
        const steamPosAttr = steam.geometry.attributes.position.array;
        for (let i = 0; i < steamCount; i++) {
          steamPosAttr[i * 3 + 1] += 0.003;
          if (steamPosAttr[i * 3 + 1] > 1.1) {
            steamPosAttr[i * 3 + 1] = 0.75;
          }
        }
        steam.geometry.attributes.position.needsUpdate = true;
        
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
  }, []);
  
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
              <DeveloperWorkspaceScene />

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
                  Live Workspace
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
                  <Cpu size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/60">Coding in Progress</p>
                  <p className="text-[11px] font-bold text-white leading-tight">Full-Stack Developer</p>
                </div>
              </motion.div>

              <p className="absolute bottom-5 left-5 text-[9px] font-mono text-white/25 z-10 pointer-events-none">
                drag to explore 3D workspace
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
