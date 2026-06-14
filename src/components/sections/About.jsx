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

// ─── Real Person Developer Workspace 3D Scene ────────────────────────────
function RealPersonWorkspaceScene({ personImageUrl = '/wit.png' }) {
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
      scene.fog = new THREE.FogExp2(0x050a12, 0.008);

      const camera = new THREE.PerspectiveCamera(42, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
      camera.position.set(0, 1.4, 5.5);
      camera.lookAt(0, 1.1, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x050a12, 1);
      renderer.shadowMap.enabled = true;
      mountRef.current.appendChild(renderer.domElement);

      // Load person texture for photo frame and screen
      const personTexture = new THREE.TextureLoader().load(personImageUrl, () => {
        setTextureLoaded(true);
      });
      
      // --- LIGHTING SYSTEM ---
      const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.55);
      scene.add(ambientLight);
      
      const mainLight = new THREE.DirectionalLight(0xfff5e6, 1.3);
      mainLight.position.set(5, 8, 3);
      mainLight.castShadow = true;
      mainLight.receiveShadow = true;
      scene.add(mainLight);
      
      const fillLight = new THREE.PointLight(0x4466cc, 0.6);
      fillLight.position.set(-3, 2, 4);
      scene.add(fillLight);
      
      const rimLight = new THREE.PointLight(0xff66aa, 0.5);
      rimLight.position.set(2, 2.5, -3);
      scene.add(rimLight);
      
      const screenGlow = new THREE.PointLight(0x44aaff, 0.9);
      screenGlow.position.set(0, 1.25, 0.7);
      scene.add(screenGlow);

      const backLight = new THREE.PointLight(0x88aaff, 0.4);
      backLight.position.set(0, 1.5, -2);
      scene.add(backLight);

      // --- DESK ---
      const workspaceGroup = new THREE.Group();
      
      // Desk surface
      const deskMat = new THREE.MeshStandardMaterial({ color: 0x2a1f1a, metalness: 0.25, roughness: 0.65, side: THREE.DoubleSide });
      const deskTop = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.08, 2.4), deskMat);
      deskTop.position.set(0, 0.6, 0);
      deskTop.castShadow = true;
      deskTop.receiveShadow = true;
      workspaceGroup.add(deskTop);
      
      // Desk legs
      const legMat = new THREE.MeshStandardMaterial({ color: 0x1a1210, metalness: 0.7, roughness: 0.4 });
      const legPositions = [[-1.5, 0.3, -1.0], [1.5, 0.3, -1.0], [-1.5, 0.3, 0.9], [1.5, 0.3, 0.9]];
      legPositions.forEach(pos => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.6, 0.12), legMat);
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        workspaceGroup.add(leg);
      });
      
      // --- LAPTOP WITH REAL PERSON PHOTO ON SCREEN ---
      // Laptop Base
      const laptopBaseMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.85, roughness: 0.25 });
      const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.05, 0.75), laptopBaseMat);
      laptopBase.position.set(0, 0.68, -0.25);
      laptopBase.castShadow = true;
      workspaceGroup.add(laptopBase);
      
      // Laptop Screen Frame
      const screenFrameMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.7 });
      const screenFrame = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.68, 0.05), screenFrameMat);
      screenFrame.position.set(0, 1.02, -0.22);
      screenFrame.castShadow = true;
      workspaceGroup.add(screenFrame);
      
      // Laptop Screen (Displaying Real Person)
      const screenMat = new THREE.MeshStandardMaterial({ 
        map: personTexture,
        emissive: 0x224466, 
        emissiveIntensity: 0.25,
        color: 0xffffff
      });
      const laptopScreen = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.6, 0.02), screenMat);
      laptopScreen.position.set(0, 1.02, -0.19);
      laptopScreen.castShadow = true;
      workspaceGroup.add(laptopScreen);
      
      // Keyboard area
      for (let i = -5; i <= 5; i++) {
        for (let j = -2; j <= 2; j++) {
          if (Math.random() > 0.65) {
            const key = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.008, 0.045), new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.5 }));
            key.position.set(i * 0.072, 0.71, j * 0.07 - 0.2);
            workspaceGroup.add(key);
          }
        }
      }
      
      // --- PHOTO FRAME ON DESK (Real Person Picture) ---
      const photoFrameBack = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.03), new THREE.MeshStandardMaterial({ color: 0x8B4513, metalness: 0.3 }));
      photoFrameBack.position.set(-0.9, 0.85, 0.55);
      photoFrameBack.castShadow = true;
      workspaceGroup.add(photoFrameBack);
      
      const photoMat = new THREE.MeshStandardMaterial({ map: personTexture });
      const photoImage = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.54, 0.02), photoMat);
      photoImage.position.set(-0.9, 0.85, 0.565);
      workspaceGroup.add(photoImage);
      
      // Small plant on desk
      const plantPotMat = new THREE.MeshStandardMaterial({ color: 0x4a6741 });
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.08, 0.12, 8), plantPotMat);
      pot.position.set(1.2, 0.68, 0.6);
      pot.castShadow = true;
      workspaceGroup.add(pot);
      
      const plantMat = new THREE.MeshStandardMaterial({ color: 0x5a8f4a });
      for (let i = 0; i < 5; i++) {
        const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.15, 6), plantMat);
        leaf.position.set(1.2 + (Math.random() - 0.5) * 0.1, 0.78 + Math.random() * 0.1, 0.6 + (Math.random() - 0.5) * 0.1);
        leaf.castShadow = true;
        workspaceGroup.add(leaf);
      }
      
      // --- REAL PERSON SILHOUETTE (3D figure with photo texture) ---
      const personGroup = new THREE.Group();
      
      // Body/Torso
      const torsoMat2 = new THREE.MeshStandardMaterial({ color: 0x2a2a3a, metalness: 0.1, roughness: 0.5 });
      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.32, 0.75, 8), torsoMat2);
      torso.position.set(0, 0.48, -0.35);
      torso.castShadow = true;
      personGroup.add(torso);
      
      // Upper body / Chest
      const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.38, 0.4, 8), torsoMat2);
      chest.position.set(0, 0.85, -0.32);
      chest.castShadow = true;
      personGroup.add(chest);
      
      // Head with photo texture
      const headMat = new THREE.MeshStandardMaterial({ map: personTexture, roughness: 0.2 });
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 48, 48), headMat);
      head.position.set(0, 1.12, -0.3);
      head.castShadow = true;
      personGroup.add(head);
      
      // Hair
      const hairMat2 = new THREE.MeshStandardMaterial({ color: 0x1a1a2a });
      const hair = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 24), hairMat2);
      hair.position.set(0, 1.21, -0.33);
      hair.scale.set(1, 0.35, 0.9);
      personGroup.add(hair);
      
      // Glasses frames
      const glassesMat = new THREE.MeshStandardMaterial({ color: 0xccccaa, metalness: 0.9 });
      const leftLens = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.09, 0.03), glassesMat);
      leftLens.position.set(-0.13, 1.12, -0.12);
      personGroup.add(leftLens);
      
      const rightLens = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.09, 0.03), glassesMat);
      rightLens.position.set(0.13, 1.12, -0.12);
      personGroup.add(rightLens);
      
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.04, 0.03), glassesMat);
      bridge.position.set(0, 1.12, -0.12);
      personGroup.add(bridge);
      
      // Arms
      const armMat2 = new THREE.MeshStandardMaterial({ color: 0xd4a574 });
      const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.6, 6), armMat2);
      leftArm.position.set(-0.52, 0.7, -0.18);
      leftArm.rotation.z = 0.35;
      leftArm.rotation.x = 0.45;
      leftArm.castShadow = true;
      personGroup.add(leftArm);
      
      const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.6, 6), armMat2);
      rightArm.position.set(0.52, 0.7, -0.18);
      rightArm.rotation.z = -0.35;
      rightArm.rotation.x = 0.45;
      rightArm.castShadow = true;
      personGroup.add(rightArm);
      
      // Hands on keyboard
      const handMat = new THREE.MeshStandardMaterial({ color: 0xd4a574 });
      const leftHand = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), handMat);
      leftHand.position.set(-0.52, 0.45, 0.05);
      personGroup.add(leftHand);
      
      const rightHand = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), handMat);
      rightHand.position.set(0.52, 0.45, 0.05);
      personGroup.add(rightHand);
      
      personGroup.position.set(0, 0.28, 0.15);
      scene.add(personGroup);
      
      // --- CHAIR ---
      const chairGroup = new THREE.Group();
      const chairMat2 = new THREE.MeshStandardMaterial({ color: 0x1a1a2a, metalness: 0.2, roughness: 0.7 });
      
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.08, 0.6), chairMat2);
      seat.position.set(0, 0.22, -0.45);
      seat.castShadow = true;
      chairGroup.add(seat);
      
      const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.55, 0.08), chairMat2);
      backrest.position.set(0, 0.55, -0.82);
      backrest.castShadow = true;
      chairGroup.add(backrest);
      
      const armrestLeft = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.4), chairMat2);
      armrestLeft.position.set(-0.4, 0.45, -0.45);
      chairGroup.add(armrestLeft);
      
      const armrestRight = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.4), chairMat2);
      armrestRight.position.set(0.4, 0.45, -0.45);
      chairGroup.add(armrestRight);
      
      chairGroup.position.set(0, 0.1, 0);
      scene.add(chairGroup);
      
      // --- FLOATING CODE PARTICLES ---
      const codeParticleCount = 800;
      const codeParticlesPos = new Float32Array(codeParticleCount * 3);
      const codeParticlesColors = new Float32Array(codeParticleCount * 3);
      for (let i = 0; i < codeParticleCount; i++) {
        codeParticlesPos[i * 3] = (Math.random() - 0.5) * 5.5;
        codeParticlesPos[i * 3 + 1] = Math.random() * 3;
        codeParticlesPos[i * 3 + 2] = (Math.random() - 0.5) * 4.5 - 1;
        
        const colorChoice = Math.random();
        if (colorChoice < 0.34) {
          codeParticlesColors[i * 3] = 0.3;
          codeParticlesColors[i * 3 + 1] = 0.85;
          codeParticlesColors[i * 3 + 2] = 0.4;
        } else if (colorChoice < 0.67) {
          codeParticlesColors[i * 3] = 0.95;
          codeParticlesColors[i * 3 + 1] = 0.55;
          codeParticlesColors[i * 3 + 2] = 0.2;
        } else {
          codeParticlesColors[i * 3] = 0.4;
          codeParticlesColors[i * 3 + 1] = 0.65;
          codeParticlesColors[i * 3 + 2] = 0.95;
        }
      }
      const codeParticlesGeo = new THREE.BufferGeometry();
      codeParticlesGeo.setAttribute('position', new THREE.BufferAttribute(codeParticlesPos, 3));
      codeParticlesGeo.setAttribute('color', new THREE.BufferAttribute(codeParticlesColors, 3));
      const codeParticlesMat = new THREE.PointsMaterial({ size: 0.01, vertexColors: true, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending });
      const codeParticles = new THREE.Points(codeParticlesGeo, codeParticlesMat);
      scene.add(codeParticles);
      
      // --- STARFIELD BACKGROUND ---
      const starCount = 1200;
      const starPositions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 35;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 22;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 25 - 12;
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      const starMat2 = new THREE.PointsMaterial({ color: 0x88aaff, size: 0.018, transparent: true, opacity: 0.35 });
      const stars = new THREE.Points(starGeo, starMat2);
      scene.add(stars);
      
      // --- FLOATING TECH CUBES ---
      const techCubes = [];
      const cubeColors = [0xff4444, 0x44ff44, 0x4444ff, 0xffaa44, 0xff44ff, 0x44ffaa];
      for (let i = 0; i < 50; i++) {
        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(0.07, 0.07, 0.07),
          new THREE.MeshStandardMaterial({ color: cubeColors[Math.floor(Math.random() * cubeColors.length)], emissiveIntensity: 0.25 })
        );
        cube.position.set(
          (Math.random() - 0.5) * 4.5,
          Math.random() * 2.8,
          (Math.random() - 0.5) * 4 - 1.5
        );
        cube.userData = { speedX: (Math.random() - 0.5) * 0.008, speedY: (Math.random() - 0.5) * 0.008, rotSpeed: Math.random() * 0.025 };
        cube.castShadow = true;
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
        targetRotY = mouseX * 0.25;
        targetRotX = mouseY * 0.12;
      };
      
      renderer.domElement.addEventListener('mousemove', onMouseMove);
      
      function animate() {
        requestAnimationFrame(animate);
        time += 0.016;
        
        // Smooth camera rotation
        camera.position.x += (targetRotY * 0.4 - camera.position.x) * 0.06;
        camera.position.y += (targetRotX * 0.3 - camera.position.y) * 0.06;
        camera.lookAt(0, 1.1, 0);
        
        // Screen glow pulse
        screenGlow.intensity = 0.7 + Math.sin(time * 2.8) * 0.25;
        
        // Floating particles animation
        codeParticles.rotation.y += 0.002;
        codeParticles.rotation.x += 0.001;
        
        // Tech cubes animation
        techCubes.forEach(cube => {
          cube.rotation.x += cube.userData.rotSpeed;
          cube.rotation.y += cube.userData.rotSpeed;
          cube.rotation.z += cube.userData.rotSpeed;
          cube.position.x += Math.sin(time * 0.6) * 0.0008;
          cube.position.y += Math.cos(time * 0.8) * 0.0008;
        });
        
        // Stars rotation
        stars.rotation.y += 0.0002;
        stars.rotation.x += 0.0001;
        
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
            <div className="w-12 h-12 rounded-full border-2 border-orange-500 border-t-transparent animate-spin mx-auto mb-3" />
            <p className="text-[10px] text-orange-500">Loading your portrait...</p>
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
  // Use your actual photo path - replace with your image URL
  const personPhotoUrl = '/wit.png'; // Update this to your real photo path

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
              <RealPersonWorkspaceScene personImageUrl={personPhotoUrl} />

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
