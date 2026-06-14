// components/sections/About.jsx
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';
import {
  Layers, Globe, Zap, ShieldCheck, Terminal,
  ArrowUpRight, Sparkles, Coffee, Code2,
  BookOpen, Eye, Lightbulb, User, Monitor, Cpu,
  Activity, Database, Cloud, Server, Network,
  Rocket, Star, Award, TrendingUp, Heart
} from 'lucide-react';

// ─── Advanced Particle System Hook ─────────────────────────────
const useParticleSystem = (count, radius, center) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * radius * 2,
      y: (Math.random() - 0.5) * radius * 1.5 + center.y,
      z: (Math.random() - 0.5) * radius * 2,
      speed: 0.2 + Math.random() * 1,
      size: 0.02 + Math.random() * 0.03,
      color: [0x3b82f6, 0x8b5cf6, 0xf97316][Math.floor(Math.random() * 3)]
    }));
  }, [count, radius, center]);
  return particles;
};

// ─── Cinematic 3D Workspace with Advanced Spider-Dot Network ────
function CinematicWorkspace({ personImageUrl = '/wit.png' }) {
  const mountRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const [cameraMode, setCameraMode] = useState('orbit');
  const animationFrameRef = useRef();

  useEffect(() => {
    if (!mountRef.current) return;

    try {
      // --- CINEMATIC SCENE SETUP ---
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x02040a);
      scene.fog = new THREE.FogExp2(0x02040a, 0.003);

      const camera = new THREE.PerspectiveCamera(42, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
      camera.position.set(0, 1.4, 6.2);
      camera.lookAt(0, 1.1, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x02040a, 1);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      mountRef.current.appendChild(renderer.domElement);

      // Load professional portrait
      const personTexture = new THREE.TextureLoader().load(personImageUrl);
      
      // --- CINEMATIC LIGHTING SYSTEM ---
      const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.45);
      scene.add(ambientLight);
      
      // Key light with animated intensity
      const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.5);
      keyLight.position.set(4, 6, 3);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 2048;
      keyLight.shadow.mapSize.height = 2048;
      keyLight.shadow.bias = -0.0001;
      scene.add(keyLight);
      
      // Fill lights with colors
      const fillLightBlue = new THREE.PointLight(0x3b82f6, 0.6);
      fillLightBlue.position.set(-3, 2, 4);
      scene.add(fillLightBlue);
      
      const fillLightPurple = new THREE.PointLight(0x8b5cf6, 0.5);
      fillLightPurple.position.set(2, 1.5, 3);
      scene.add(fillLightPurple);
      
      const rimLight = new THREE.PointLight(0xff66aa, 0.55);
      rimLight.position.set(2, 2.5, -3.8);
      scene.add(rimLight);
      
      const backLight = new THREE.PointLight(0x06b6d4, 0.5);
      backLight.position.set(0, 1.5, -2.8);
      scene.add(backLight);
      
      const screenGlow = new THREE.PointLight(0x3b82f6, 1.1);
      screenGlow.position.set(0, 1.15, 0.85);
      scene.add(screenGlow);
      
      // Floating orbs with rotating lights
      const orbLights = [];
      const orbPositions = [
        [-2.5, 1.2, 1.8], [2.5, 1.0, 1.9], [-2.0, 0.5, -2.0], [2.2, 0.6, -2.1], [0, 2.0, 2.0]
      ];
      orbPositions.forEach((pos, i) => {
        const light = new THREE.PointLight(i % 2 === 0 ? 0xf97316 : 0x8b5cf6, 0.4);
        light.position.set(pos[0], pos[1], pos[2]);
        scene.add(light);
        orbLights.push(light);
      });
      
      // --- PREMIUM GLASS DESK ---
      const deskGroup = new THREE.Group();
      
      const glassMat = new THREE.MeshPhysicalMaterial({ 
        color: 0x1a1a2e, 
        metalness: 0.96, 
        roughness: 0.2, 
        transparent: true, 
        opacity: 0.88,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        reflectivity: 0.5
      });
      const deskTop = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.05, 2.4), glassMat);
      deskTop.position.set(0, 0.68, 0);
      deskTop.castShadow = true;
      deskTop.receiveShadow = true;
      deskGroup.add(deskTop);
      
      // Premium metal legs with gradient
      const legMaterials = [
        new THREE.MeshStandardMaterial({ color: 0x8a8a8a, metalness: 0.9, roughness: 0.25 }),
        new THREE.MeshStandardMaterial({ color: 0x9a9a9a, metalness: 0.92, roughness: 0.22 })
      ];
      const legPositions = [[-1.65, 0.35, -1.1], [1.65, 0.35, -1.1], [-1.65, 0.35, 1.0], [1.65, 0.35, 1.0]];
      legPositions.forEach((pos, idx) => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.68, 8), legMaterials[idx % 2]);
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        deskGroup.add(leg);
      });
      
      scene.add(deskGroup);
      
      // --- CINEMATIC MONITOR (Curved Ultrawide) ---
      const monitorGroup = new THREE.Group();
      
      const standMat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.75, roughness: 0.3 });
      const standBase = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.04, 0.42), standMat);
      standBase.position.set(0, 0.73, -0.05);
      monitorGroup.add(standBase);
      
      const standNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.2, 8), standMat);
      standNeck.position.set(0, 0.84, -0.05);
      monitorGroup.add(standNeck);
      
      // Monitor body with brushed metal
      const monitorBodyMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.88, roughness: 0.18 });
      const monitorBody = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.98, 0.12), monitorBodyMat);
      monitorBody.position.set(0, 1.22, -0.02);
      monitorBody.castShadow = true;
      monitorGroup.add(monitorBody);
      
      // Screen with person
      const screenMat = new THREE.MeshStandardMaterial({ 
        map: personTexture,
        emissive: 0x1e3a5f, 
        emissiveIntensity: 0.3,
        color: 0xffffff,
        metalness: 0.05,
        roughness: 0.25
      });
      const monitorScreen = new THREE.Mesh(new THREE.BoxGeometry(1.56, 0.86, 0.02), screenMat);
      monitorScreen.position.set(0, 1.22, 0.045);
      monitorGroup.add(monitorScreen);
      
      // Screen reflection
      const reflectionMat = new THREE.MeshStandardMaterial({ color: 0x88aaff, transparent: true, opacity: 0.08 });
      const reflection = new THREE.Mesh(new THREE.BoxGeometry(1.56, 0.86, 0.005), reflectionMat);
      reflection.position.set(0, 1.22, 0.052);
      monitorGroup.add(reflection);
      
      scene.add(monitorGroup);
      
      // --- RGB MECHANICAL KEYBOARD ---
      const keyboardGroup = new THREE.Group();
      const keyboardBase = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.03, 0.34), new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.65 }));
      keyboardBase.position.set(0, 0.76, -0.48);
      keyboardBase.castShadow = true;
      keyboardGroup.add(keyboardBase);
      
      // RGB keys with animation
      const keys = [];
      for (let i = -5; i <= 5; i++) {
        for (let j = -2; j <= 2; j++) {
          const isRGB = Math.random() > 0.65;
          const keyMat = new THREE.MeshStandardMaterial({ 
            color: isRGB ? 0x3b82f6 : 0x555555,
            emissive: isRGB ? 0x3b82f6 : 0x000000,
            emissiveIntensity: 0.3,
            metalness: 0.45
          });
          const key = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.006, 0.05), keyMat);
          key.position.set(i * 0.076, 0.78, j * 0.06 - 0.48);
          key.castShadow = true;
          keyboardGroup.add(key);
          if (isRGB) keys.push(key);
        }
      }
      scene.add(keyboardGroup);
      
      // --- PREMIUM PC TOWER WITH RGB ---
      const towerGroup = new THREE.Group();
      const towerMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2a, metalness: 0.88 });
      const towerCase = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.68, 0.58), towerMat);
      towerCase.position.set(1.5, 0.5, 0.6);
      towerCase.castShadow = true;
      towerGroup.add(towerCase);
      
      // Tempered glass
      const glassPanel = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.58, 0.02), new THREE.MeshPhysicalMaterial({ color: 0x3b82f6, metalness: 0.96, transparent: true, opacity: 0.18 }));
      glassPanel.position.set(1.5, 0.5, 0.88);
      towerGroup.add(glassPanel);
      
      // Internal RGB components
      const internalRGB = [];
      for (let i = 0; i < 12; i++) {
        const rgbComp = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.08), new THREE.MeshStandardMaterial({ color: 0x00ff88, emissive: 0x00ff88, emissiveIntensity: 0.5 }));
        rgbComp.position.set(1.5 + (Math.random() - 0.5) * 0.2, 0.4 + Math.random() * 0.5, 0.86);
        towerGroup.add(rgbComp);
        internalRGB.push(rgbComp);
      }
      
      scene.add(towerGroup);
      
      // --- ADVANCED SPIDER-DOT QUANTUM NETWORK ---
      const neuralNodeCount = 450;
      const neuralNodes = [];
      const neuralColors = [0x3b82f6, 0x8b5cf6, 0xf97316, 0x06b6d4, 0x10b981];
      
      // Create 3D spiral formation of nodes
      for (let i = 0; i < neuralNodeCount; i++) {
        const t = i / neuralNodeCount;
        const angle = t * Math.PI * 8;
        const radius = 2.2 + Math.sin(t * Math.PI) * 1.5;
        const yOffset = Math.sin(angle * 1.5) * 0.8;
        const node = new THREE.Vector3(
          Math.cos(angle) * radius * (1 + Math.sin(t * Math.PI) * 0.3),
          Math.sin(angle) * radius * 0.6 + 1.0 + yOffset,
          Math.sin(angle) * radius * 0.8 - 0.3
        );
        neuralNodes.push({ 
          pos: node, 
          color: neuralColors[Math.floor(Math.random() * neuralColors.length)],
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
      
      // Create intelligent connections with varying opacity
      const connections = [];
      const connectionStrengths = [];
      
      for (let i = 0; i < neuralNodes.length; i++) {
        for (let j = i + 1; j < neuralNodes.length; j++) {
          const dist = neuralNodes[i].pos.distanceTo(neuralNodes[j].pos);
          const maxDist = 1.3;
          if (dist < maxDist) {
            const strength = 1 - (dist / maxDist);
            connections.push(neuralNodes[i].pos.x, neuralNodes[i].pos.y, neuralNodes[i].pos.z);
            connections.push(neuralNodes[j].pos.x, neuralNodes[j].pos.y, neuralNodes[j].pos.z);
            connectionStrengths.push(strength);
          }
        }
      }
      
      const neuralGeo = new THREE.BufferGeometry();
      neuralGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(connections), 3));
      const neuralMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.22 });
      const neuralWeb = new THREE.LineSegments(neuralGeo, neuralMat);
      scene.add(neuralWeb);
      
      // Glowing neural nodes
      const nodeGeo = new THREE.BufferGeometry();
      const nodePositions = new Float32Array(neuralNodes.length * 3);
      const nodeColors = new Float32Array(neuralNodes.length * 3);
      neuralNodes.forEach((node, i) => {
        nodePositions[i * 3] = node.pos.x;
        nodePositions[i * 3 + 1] = node.pos.y;
        nodePositions[i * 3 + 2] = node.pos.z;
        
        const color = new THREE.Color(node.color);
        nodeColors[i * 3] = color.r;
        nodeColors[i * 3 + 1] = color.g;
        nodeColors[i * 3 + 2] = color.b;
      });
      nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
      nodeGeo.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));
      const nodeMat = new THREE.PointsMaterial({ size: 0.038, vertexColors: true, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending });
      const neuralNodesPoints = new THREE.Points(nodeGeo, nodeMat);
      scene.add(neuralNodesPoints);
      
      // --- HOLOGRAPHIC CODE RAIN (Advanced) ---
      const hologramCount = 850;
      const hologramPositions = new Float32Array(hologramCount * 3);
      const hologramColors = new Float32Array(hologramCount * 3);
      const hologramSpeeds = [];
      const hologramSizes = [];
      
      for (let i = 0; i < hologramCount; i++) {
        hologramPositions[i * 3] = (Math.random() - 0.5) * 7;
        hologramPositions[i * 3 + 1] = Math.random() * 3.5;
        hologramPositions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
        
        const colorType = Math.random();
        if (colorType < 0.34) {
          hologramColors[i * 3] = 0.2;
          hologramColors[i * 3 + 1] = 0.9;
          hologramColors[i * 3 + 2] = 0.3;
        } else if (colorType < 0.67) {
          hologramColors[i * 3] = 0.95;
          hologramColors[i * 3 + 1] = 0.45;
          hologramColors[i * 3 + 2] = 0.2;
        } else {
          hologramColors[i * 3] = 0.3;
          hologramColors[i * 3 + 1] = 0.55;
          hologramColors[i * 3 + 2] = 0.95;
        }
        hologramSpeeds.push(0.008 + Math.random() * 0.025);
        hologramSizes.push(0.006 + Math.random() * 0.008);
      }
      
      const hologramGeo = new THREE.BufferGeometry();
      hologramGeo.setAttribute('position', new THREE.BufferAttribute(hologramPositions, 3));
      hologramGeo.setAttribute('color', new THREE.BufferAttribute(hologramColors, 3));
      const hologramMat = new THREE.PointsMaterial({ size: 0.008, vertexColors: true, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });
      const hologramRain = new THREE.Points(hologramGeo, hologramMat);
      scene.add(hologramRain);
      
      // --- FLOATING TECH SPHERES (Neural Orbs) ---
      const neuralOrbs = [];
      for (let i = 0; i < 35; i++) {
        const orbMat = new THREE.MeshStandardMaterial({ 
          color: neuralColors[Math.floor(Math.random() * neuralColors.length)], 
          emissiveIntensity: 0.4,
          emissive: 0xffffff,
          metalness: 0.85,
          roughness: 0.15
        });
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.065, 24, 24), orbMat);
        const angle = Math.random() * Math.PI * 2;
        const radius = 2.5 + Math.random() * 2;
        orb.position.set(
          Math.cos(angle) * radius,
          0.8 + Math.random() * 2,
          Math.sin(angle) * radius
        );
        orb.userData = { 
          speed: 0.3 + Math.random() * 0.8, 
          rotSpeed: Math.random() * 0.03,
          radius: radius,
          angle: angle,
          ySpeed: 0.5 + Math.random() * 1
        };
        orb.castShadow = true;
        scene.add(orb);
        neuralOrbs.push(orb);
      }
      
      // --- CINEMATIC STARFIELD (Parallax effect) ---
      const starLayers = [];
      const starCounts = [800, 600, 400];
      const starColors = [0xaaccff, 0x88aaff, 0x6688cc];
      
      starCounts.forEach((count, layer) => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          positions[i * 3] = (Math.random() - 0.5) * (50 + layer * 20);
          positions[i * 3 + 1] = (Math.random() - 0.5) * (30 + layer * 15);
          positions[i * 3 + 2] = (Math.random() - 0.5) * (40 + layer * 15) - (10 + layer * 5);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const mat = new THREE.PointsMaterial({ color: starColors[layer], size: 0.008 + layer * 0.003, transparent: true, opacity: 0.25 + layer * 0.05 });
        const stars = new THREE.Points(geo, mat);
        scene.add(stars);
        starLayers.push(stars);
      });
      
      // --- ENERGY PARTICLES (Floating dust with glow) ---
      const energyCount = 1200;
      const energyPositions = new Float32Array(energyCount * 3);
      for (let i = 0; i < energyCount; i++) {
        energyPositions[i * 3] = (Math.random() - 0.5) * 8;
        energyPositions[i * 3 + 1] = Math.random() * 3.5;
        energyPositions[i * 3 + 2] = (Math.random() - 0.5) * 7 - 1;
      }
      const energyGeo = new THREE.BufferGeometry();
      energyGeo.setAttribute('position', new THREE.BufferAttribute(energyPositions, 3));
      const energyMat = new THREE.PointsMaterial({ color: 0xffaa88, size: 0.0035, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending });
      const energyParticles = new THREE.Points(energyGeo, energyMat);
      scene.add(energyParticles);
      
      // --- FLOATING CODE SNIPPETS (Holographic) ---
      const codeHolograms = [];
      const snippetTexts = ['const', 'function', '=>', '{}', '[]', '</>', 'import', 'export', 'return', 'async', 'await'];
      const snippetPositions = [
        [-1.8, 1.4, 1.5], [1.9, 1.3, 1.6], [-1.5, 1.8, -1.3], [1.6, 1.7, -1.4],
        [-2.0, 0.9, 0.8], [2.1, 0.8, 0.9], [0, 2.0, 1.8], [0, 2.1, -1.7],
        [-1.2, 2.2, 0.2], [1.3, 2.1, 0.1]
      ];
      
      snippetPositions.forEach((pos, idx) => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, 512, 128);
        ctx.font = 'bold 28px "Fira Code", "Courier New", monospace';
        ctx.fillStyle = `rgba(59, 130, 246, ${0.15 + Math.random() * 0.1})`;
        ctx.textAlign = 'center';
        ctx.fillText(snippetTexts[idx % snippetTexts.length], 256, 65);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.set(pos[0], pos[1], pos[2]);
        sprite.scale.set(0.8, 0.2, 1);
        scene.add(sprite);
        codeHolograms.push(sprite);
      });
      
      // --- GROUND REFLECTION (Glass floor effect) ---
      const groundPlaneMat = new THREE.MeshStandardMaterial({ color: 0x050a12, metalness: 0.95, roughness: 0.1, transparent: true, opacity: 0.3 });
      const groundPlane = new THREE.Mesh(new THREE.PlaneGeometry(8, 6), groundPlaneMat);
      groundPlane.rotation.x = -Math.PI / 2;
      groundPlane.position.y = -0.5;
      groundPlane.receiveShadow = true;
      scene.add(groundPlane);
      
      // --- ANIMATION ENGINE ---
      let time = 0;
      let mouseX = 0, mouseY = 0;
      let targetRotX = 0, targetRotY = 0;
      let cameraZoom = 5.8;
      let targetZoom = 5.8;
      
      const onMouseMove = (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        targetRotY = mouseX * 0.22;
        targetRotX = mouseY * 0.12;
        targetZoom = 5.6 + Math.abs(mouseX) * 0.4;
      };
      
      const onWheel = (event) => {
        targetZoom += event.deltaY * 0.005;
        targetZoom = Math.max(4.5, Math.min(7.5, targetZoom));
      };
      
      renderer.domElement.addEventListener('mousemove', onMouseMove);
      renderer.domElement.addEventListener('wheel', onWheel);
      
      function animate() {
        animationFrameRef.current = requestAnimationFrame(animate);
        time += 0.016;
        
        // Smooth camera movement
        camera.position.x += (targetRotY * 0.4 - camera.position.x) * 0.055;
        camera.position.y += (targetRotX * 0.3 - camera.position.y) * 0.055;
        cameraZoom += (targetZoom - cameraZoom) * 0.05;
        camera.position.z = cameraZoom;
        camera.lookAt(0, 1.0, 0);
        
        // Dynamic lighting with sine waves
        screenGlow.intensity = 0.85 + Math.sin(time * 2.2) * 0.3;
        rimLight.intensity = 0.5 + Math.sin(time * 1.6) * 0.15;
        fillLightBlue.intensity = 0.55 + Math.sin(time * 1.2) * 0.1;
        fillLightPurple.intensity = 0.45 + Math.sin(time * 1.4) * 0.12;
        backLight.intensity = 0.45 + Math.sin(time * 0.9) * 0.1;
        
        // Orb lights rotation
        orbLights.forEach((light, idx) => {
          light.position.x = orbPositions[idx][0] + Math.sin(time * 0.5 + idx) * 0.15;
          light.position.y = orbPositions[idx][1] + Math.cos(time * 0.7 + idx) * 0.1;
          light.intensity = 0.35 + Math.sin(time * 1.8 + idx) * 0.15;
        });
        
        // Neural web pulse effect
        const neuralPulse = 0.18 + Math.sin(time * 1.2) * 0.08;
        neuralMat.opacity = neuralPulse;
        nodeMat.size = 0.035 + Math.sin(time * 2.5) * 0.008;
        
        // Keyboard RGB pulse
        keys.forEach((key, idx) => {
          key.material.emissiveIntensity = 0.25 + Math.sin(time * 3 + idx * 0.1) * 0.2;
        });
        
        // Internal RGB components pulse
        internalRGB.forEach((comp, idx) => {
          comp.material.emissiveIntensity = 0.4 + Math.sin(time * 4 + idx) * 0.3;
        });
        
        // Hologram rain animation
        const hologramAttr = hologramRain.geometry.attributes.position.array;
        for (let i = 0; i < hologramCount; i++) {
          hologramAttr[i * 3 + 1] -= hologramSpeeds[i];
          if (hologramAttr[i * 3 + 1] < -0.5) {
            hologramAttr[i * 3 + 1] = 3.2;
            hologramAttr[i * 3] = (Math.random() - 0.5) * 7;
            hologramAttr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
          }
        }
        hologramRain.geometry.attributes.position.needsUpdate = true;
        
        // Neural orbs animation
        neuralOrbs.forEach(orb => {
          orb.rotation.x += orb.userData.rotSpeed;
          orb.rotation.y += orb.userData.rotSpeed;
          orb.userData.angle += 0.005;
          orb.position.x = Math.cos(orb.userData.angle) * orb.userData.radius;
          orb.position.z = Math.sin(orb.userData.angle) * orb.userData.radius;
          orb.position.y += Math.sin(time * orb.userData.ySpeed) * 0.002;
        });
        
        // Star layers parallax
        starLayers.forEach((layer, idx) => {
          layer.rotation.y += 0.0001 * (idx + 1);
          layer.rotation.x += 0.00005 * (idx + 1);
        });
        
        // Energy particles
        energyParticles.rotation.y += 0.0003;
        energyParticles.rotation.x += 0.00015;
        
        // Code holograms fade in/out
        codeHolograms.forEach((hologram, idx) => {
          hologram.material.opacity = 0.15 + Math.sin(time * 0.8 + idx) * 0.08;
        });
        
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
        renderer.domElement.removeEventListener('wheel', onWheel);
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
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
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#02040a] to-[#050a12]">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500/15 to-orange-600/5 border border-orange-500/20 flex items-center justify-center">
            <Monitor size={32} className="text-orange-500/60" />
          </div>
          <p className="text-[11px] font-mono text-stone-500">Premium 3D workspace unavailable</p>
        </div>
      </div>
    );
  }
  
  return (
    <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" style={{ touchAction: 'none' }}>
      {!isReady && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#02040a] to-[#050a12] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-3 border-orange-500/20 border-t-orange-500 animate-spin" />
              <div className="absolute inset-2 rounded-full bg-orange-500/10 animate-pulse" />
              <div className="absolute inset-4 rounded-full bg-orange-500/5" />
            </div>
            <div className="space-y-2 text-center">
              <p className="text-[10px] font-mono text-orange-500/60 tracking-widest animate-pulse">INITIALIZING CINEMATIC WORKSPACE</p>
              <div className="flex gap-1 justify-center">
                {[0, 0.15, 0.3, 0.45].map(d => (
                  <motion.div
                    key={d}
                    className="w-1 h-1 rounded-full bg-orange-500/40"
                    animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: d }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Premium Animated Tab Content ───────────────────────────────
const TABS = [
  { id: 'story', label: 'Story', icon: BookOpen, gradient: 'from-blue-500 to-cyan-500' },
  { id: 'philosophy', label: 'Philosophy', icon: Lightbulb, gradient: 'from-orange-500 to-yellow-500' },
  { id: 'vision', label: 'Vision', icon: Eye, gradient: 'from-purple-500 to-pink-500' },
];

const TAB_CONTENT = {
  story: (
    <div className="space-y-5">
      <motion.p className="relative pl-5 border-l-2 border-orange-500/40 text-sm leading-relaxed text-stone-400">
        <span className="absolute left-0 top-0 w-2 h-2 rounded-full bg-orange-500 -translate-x-1" />
        I'm a <span className="font-bold text-stone-100 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Full-Stack Developer</span> and Level 5 Software Student, bridging the gap between complex logic and fluid user interfaces.
      </motion.p>
      <motion.p className="text-sm leading-relaxed text-stone-400">
        I mastered the{' '}
        <span className="relative inline-block group">
          <span className="absolute inset-0 bg-orange-500/20 blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative text-orange-500 font-semibold tracking-wide">React, Node.js &amp; MySQL</span>
        </span>{' '}
        stack and have since expanded into cloud infrastructure, 3D web experiences, and AI integrations. Based in{' '}
        <span className="font-semibold text-stone-100 border-b border-orange-500/40">Kigali, Rwanda</span>,
        building products used across six countries.
      </motion.p>
      <motion.div className="flex items-center gap-2 text-stone-500 italic text-sm">
        <Sparkles size={14} className="text-orange-500" />
        <span>"Project Archaeology" — digging into the root of a problem before writing a single line of code.</span>
      </motion.div>
    </div>
  ),
  philosophy: (
    <div className="space-y-5">
      <motion.p className="relative pl-5 border-l-2 border-orange-500/40 text-sm leading-relaxed text-stone-400">
        <span className="absolute left-0 top-0 w-2 h-2 rounded-full bg-orange-500 -translate-x-1" />
        Great software is invisible. It solves problems so naturally that users never have to think about the tool — only the outcome.
      </motion.p>
      <motion.p className="text-sm leading-relaxed text-stone-400">
        I build with{' '}
        <span className="font-bold text-stone-100 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">performance as a constraint</span>,
        not an afterthought. Sub-2.5s LCP, accessible markup, and offline-ready architectures are non-negotiable starting points.
      </motion.p>
      <motion.div className="flex flex-wrap gap-3 pt-2">
        {['Performance', 'Accessibility', 'Scalability', 'Security'].map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-stone-800 to-stone-900 text-[9px] font-bold uppercase tracking-wider text-stone-300 border border-stone-700/50"
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </div>
  ),
  vision: (
    <div className="space-y-5">
      <motion.p className="relative pl-5 border-l-2 border-orange-500/40 text-sm leading-relaxed text-stone-400">
        <span className="absolute left-0 top-0 w-2 h-2 rounded-full bg-orange-500 -translate-x-1" />
        My vision is to help East Africa produce world-class software talent and products. Rwanda's tech ecosystem is growing rapidly.
      </motion.p>
      <motion.p className="text-sm leading-relaxed text-stone-400">
        Focused on{' '}
        <span className="font-bold text-stone-100 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI-native product development</span>,
        building tools that lower the barrier to entrepreneurship for local founders.
      </motion.p>
      <motion.div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 border border-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 animate-pulse" />
        <p className="text-xs leading-relaxed text-stone-300 text-center">
          🚀 Long-term: a venture-backed product studio operating from Kigali — shipping software that solves real African problems.
        </p>
      </motion.div>
    </div>
  ),
};

const PILLARS = [
  { icon: Zap, title: 'Performance First', desc: 'Optimising for sub-2.5s LCP. Speed is a feature.', color: '#f97316', gradient: 'from-orange-500 to-red-500' },
  { icon: Layers, title: 'Scalable Architecture', desc: 'MERN + API-first design for systems that grow.', color: '#3b82f6', gradient: 'from-blue-500 to-cyan-500' },
  { icon: Code2, title: 'Visual Craft', desc: 'Figma precision + Three.js storytelling.', color: '#8b5cf6', gradient: 'from-purple-500 to-pink-500' },
];

const STATS = [
  { icon: ShieldCheck, label: 'Proficiency', value: 'Level 5', trend: '+2' },
  { icon: Globe, label: 'Impact', value: '6+', suffix: 'Countries', trend: '+3' },
  { icon: Code2, label: 'Projects', value: '15+', suffix: 'Completed', trend: '+4' },
];

// ─── Main Component with Scroll Animations ─────────────────────
export default function About() {
  const [activeTab, setActiveTab] = useState('story');
  const [hoveredStat, setHoveredStat] = useState(null);
  const personPhotoUrl = '/wit.png';
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 1, 1]);
  
  return (
    <>
      {/* Scroll progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 z-50 origin-left"
        style={{ scaleX, opacity }}
      />
      
      <section id="about" className="relative py-32 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#0c0b0a] to-[#050a12]">
        {/* Premium animated background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full bg-orange-500/[0.03] blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full bg-blue-500/[0.02] blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-purple-500/[0.01] blur-3xl" />
          </div>
          <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-[1200px] mx-auto">
          {/* Animated Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-5">
                <motion.div 
                  className="w-10 h-px bg-gradient-to-r from-orange-500 to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  transition={{ duration: 0.8 }}
                />
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-orange-500">Identity 2026</p>
                <motion.div 
                  className="w-16 h-px bg-gradient-to-l from-orange-500 to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <motion.h2 
                className="text-[clamp(44px,7vw,80px)] font-black leading-[0.92] tracking-tighter text-stone-100"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Crafting the{' '}
                <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent animate-gradient">Next-Gen</span>
                <br />Web Experience
              </motion.h2>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-right"
            >
              <div className="flex items-center justify-end gap-2 mb-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative flex h-2 w-2"
                >
                  <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative rounded-full h-2 w-2 bg-green-500" />
                </motion.div>
                <span className="text-[10px] font-mono text-stone-500 tracking-wider">OPERATIONAL</span>
              </div>
              <p className="text-sm leading-relaxed text-stone-500 max-w-xs">
                Based in Rwanda, building worldwide.<br />
                Specialising in robust backend logic and immersive frontend motion.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* LEFT - Cinematic 3D Workspace */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <motion.div 
                initial={{ opacity: 0, scale: 0.96, rotateY: -10 }} 
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                className="relative aspect-square rounded-2xl overflow-hidden border border-stone-800/40 bg-gradient-to-br from-[#02040a] to-[#050a12] shadow-2xl shadow-orange-500/5"
              >
                <CinematicWorkspace personImageUrl={personPhotoUrl} />
                
                {/* Premium overlay effects */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.6) 100%)' }} />
                
                {/* Animated live badge */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 z-10"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="relative flex h-1.5 w-1.5"
                  >
                    <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-70" />
                    <span className="relative rounded-full h-1.5 w-1.5 bg-red-500" />
                  </motion.div>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-white/80">LIVE SESSION</span>
                </motion.div>
                
                {/* Premium floating card */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }} 
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} 
                  className="absolute bottom-5 right-5 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-xl z-10"
                >
                  <motion.div 
                    className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Cpu size={14} className="text-white" />
                  </motion.div>
                  <div>
                    <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/50">Active Workspace</p>
                    <p className="text-[10px] font-bold text-white">Full-Stack Development</p>
                  </div>
                </motion.div>
                
                <p className="absolute bottom-5 left-5 text-[7px] font-mono text-white/20 z-10">INTERACTIVE 3D • DRAG TO EXPLORE</p>
              </motion.div>

              {/* Animated Stats with hover effects */}
              <div className="grid grid-cols-3 gap-3">
                {STATS.map(({ icon: Ic, label, value, suffix, trend }, i) => (
                  <motion.div 
                    key={label} 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    onMouseEnter={() => setHoveredStat(i)}
                    onMouseLeave={() => setHoveredStat(null)}
                    className="group relative p-4 rounded-xl text-center bg-gradient-to-br from-[#161513] to-[#1a1815] border border-stone-800/60 hover:border-orange-500/40 transition-all duration-300 overflow-hidden"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-transparent transition-all duration-500"
                      animate={{ opacity: hoveredStat === i ? 1 : 0 }}
                    />
                    <Ic size={18} className="text-stone-500 group-hover:text-orange-500 transition-colors mx-auto mb-2" />
                    <p className="text-2xl font-black text-stone-100">
                      {value}
                      {trend && <motion.span 
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-green-500 text-sm ml-1"
                      >
                        ↑{trend}
                      </motion.span>}
                    </p>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-stone-500">{label}</p>
                    {suffix && <p className="text-[7px] text-stone-600 mt-0.5">{suffix}</p>}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT - Premium Animated Content */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Premium Animated Tabs */}
              <div>
                <div className="flex gap-1 p-1 rounded-xl bg-stone-900/40 w-fit mb-8 backdrop-blur-sm">
                  {TABS.map(({ id, label, icon: Ic, gradient }) => (
                    <button 
                      key={id} 
                      onClick={() => setActiveTab(id)} 
                      className={`relative flex items-center gap-2 px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-250 overflow-hidden ${activeTab === id ? 'text-white' : 'text-stone-500 hover:text-stone-300'}`}
                    >
                      {activeTab === id && (
                        <motion.div 
                          layoutId="premium-tab-pill" 
                          className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-lg shadow-lg`}
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                      <Ic size={12} className="relative z-10" />
                      <span className="relative z-10">{label}</span>
                    </button>
                  ))}
                </div>

                <div className="min-h-[220px]">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeTab} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -20 }} 
                      transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
                    >
                      {TAB_CONTENT[activeTab]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Premium Pillars with animated gradients */}
              <div className="grid sm:grid-cols-3 gap-4">
                {PILLARS.map(({ icon: Ic, title, desc, gradient }, i) => (
                  <motion.div 
                    key={title} 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative p-5 rounded-xl bg-gradient-to-br from-[#161513] to-[#1a1815] border border-stone-800/60 hover:border-orange-500/40 transition-all duration-300 overflow-hidden"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/8 group-hover:to-transparent transition-all duration-500"
                      whileHover={{ opacity: 1 }}
                    />
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br" style={{ background: `${gradient.split(' ')[1]?.split('-')[1] || 'orange'}15` }}>
                      <Ic size={18} className="text-orange-500" />
                    </div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-stone-100 mb-2">{title}</h4>
                    <p className="text-[10px] leading-relaxed text-stone-500 group-hover:text-stone-400 transition-colors">{desc}</p>
                    <motion.div 
                      className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowUpRight size={10} className="text-orange-500" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Premium Animated CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.01 }}
                className="relative group p-5 rounded-xl bg-gradient-to-r from-[#161513] to-[#1a1815] border border-stone-800/60 hover:border-orange-500/40 transition-all duration-300 overflow-hidden"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="flex -space-x-3">
                    {[Coffee, Coffee, Sparkles].map((Ic, i) => (
                      <motion.div 
                        key={i} 
                        className="w-10 h-10 rounded-full border-2 border-[#161513] bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Ic size={14} className={i === 2 ? 'text-orange-500' : 'text-stone-500'} />
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-sm font-black text-stone-100">Available for Opportunities</p>
                    <p className="text-[10px] text-stone-500 mt-0.5">Open to freelance, collaborations, and full-time roles</p>
                  </div>
                  <motion.a 
                    href="#contact" 
                    className="group/btn flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-[10px] font-bold uppercase tracking-wider transition-all shadow-lg shadow-orange-500/25"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Let's Connect
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
          </div>
        </div>
      </section>
    </>
  );
}
