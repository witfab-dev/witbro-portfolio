// components/sections/About.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
  Layers, Globe, Zap, ShieldCheck, Terminal,
  ArrowUpRight, Sparkles, Coffee, Code2,
  BookOpen, Eye, Lightbulb, User, Monitor, Cpu,
  Activity, Database, Cloud, Server, Network,
} from 'lucide-react';

// ─── Ultra-Modern Professional Workspace with Advanced Spider-Dot Network ────
function UltraModernWorkspace({ personImageUrl = '/wit.png' }) {
  const mountRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mountRef.current) return;

    try {
      // --- PREMIUM SCENE SETUP ---
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x050a12);
      scene.fog = new THREE.FogExp2(0x050a12, 0.004);

      const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
      camera.position.set(0, 1.3, 5.8);
      camera.lookAt(0, 1.0, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x050a12, 1);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      mountRef.current.appendChild(renderer.domElement);

      // Load professional portrait
      const personTexture = new THREE.TextureLoader().load(personImageUrl);
      
      // --- ADVANCED LIGHTING SYSTEM ---
      const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.48);
      scene.add(ambientLight);
      
      const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.4);
      keyLight.position.set(4, 6, 3);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      scene.add(keyLight);
      
      const fillLight = new THREE.PointLight(0x4466cc, 0.55);
      fillLight.position.set(-3, 2, 4);
      scene.add(fillLight);
      
      const rimLight = new THREE.PointLight(0xff66aa, 0.5);
      rimLight.position.set(2, 2.5, -3.5);
      scene.add(rimLight);
      
      const backLight = new THREE.PointLight(0x3b82f6, 0.4);
      backLight.position.set(0, 1.5, -2.5);
      scene.add(backLight);
      
      const screenGlow = new THREE.PointLight(0x3b82f6, 0.95);
      screenGlow.position.set(0, 1.15, 0.85);
      scene.add(screenGlow);
      
      // Floating accent lights
      const accentColors = [0xf97316, 0x8b5cf6, 0x06b6d4];
      accentColors.forEach((color, i) => {
        const light = new THREE.PointLight(color, 0.3);
        light.position.set(Math.sin(i * 2) * 2, 0.8 + i * 0.5, Math.cos(i * 2) * 2);
        scene.add(light);
      });

      // --- PREMIUM DESK (Glass & Metal) ---
      const deskGroup = new THREE.Group();
      
      // Glass desk surface
      const glassMat = new THREE.MeshPhysicalMaterial({ 
        color: 0x1a1a2a, 
        metalness: 0.95, 
        roughness: 0.25, 
        transparent: true, 
        opacity: 0.85,
        clearcoat: 1,
        clearcoatRoughness: 0.1
      });
      const deskTop = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.05, 2.3), glassMat);
      deskTop.position.set(0, 0.68, 0);
      deskTop.castShadow = true;
      deskTop.receiveShadow = true;
      deskGroup.add(deskTop);
      
      // Premium metal legs
      const metalLegMat = new THREE.MeshStandardMaterial({ color: 0x8a8a8a, metalness: 0.85, roughness: 0.3 });
      const legPositions = [[-1.6, 0.35, -1.0], [1.6, 0.35, -1.0], [-1.6, 0.35, 0.9], [1.6, 0.35, 0.9]];
      legPositions.forEach(pos => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.68, 6), metalLegMat);
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        deskGroup.add(leg);
      });
      
      scene.add(deskGroup);
      
      // --- PREMIUM MONITOR (Ultrawide Curved) ---
      const monitorGroup = new THREE.Group();
      
      // Stand
      const standMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.7 });
      const standBase = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.4), standMat);
      standBase.position.set(0, 0.73, -0.05);
      monitorGroup.add(standBase);
      
      const standNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.18, 8), standMat);
      standNeck.position.set(0, 0.83, -0.05);
      monitorGroup.add(standNeck);
      
      // Curved monitor body
      const monitorBody = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.95, 0.12), new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.85, roughness: 0.2 }));
      monitorBody.position.set(0, 1.2, -0.02);
      monitorBody.castShadow = true;
      monitorGroup.add(monitorBody);
      
      // Screen with professional portrait
      const screenMat = new THREE.MeshStandardMaterial({ 
        map: personTexture,
        emissive: 0x1e3a5f, 
        emissiveIntensity: 0.25,
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.3
      });
      const monitorScreen = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.83, 0.02), screenMat);
      monitorScreen.position.set(0, 1.2, 0.045);
      monitorGroup.add(monitorScreen);
      
      scene.add(monitorGroup);
      
      // --- PREMIUM KEYBOARD (Mechanical, RGB backlit) ---
      const keyboardMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.6 });
      const keyboardBase = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.03, 0.32), keyboardMat);
      keyboardBase.position.set(0, 0.76, -0.45);
      keyboardBase.castShadow = true;
      scene.add(keyboardBase);
      
      // RGB backlit keys
      for (let i = -5; i <= 5; i++) {
        for (let j = -2; j <= 2; j++) {
          const isRGB = Math.random() > 0.7;
          const keyMat = new THREE.MeshStandardMaterial({ 
            color: isRGB ? 0x3b82f6 : 0x555555,
            emissive: isRGB ? 0x3b82f6 : 0x000000,
            emissiveIntensity: isRGB ? 0.25 : 0,
            metalness: 0.4
          });
          const key = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.006, 0.048), keyMat);
          key.position.set(i * 0.074, 0.78, j * 0.058 - 0.45);
          key.castShadow = true;
          scene.add(key);
        }
      }
      
      // --- PREMIUM MOUSE ---
      const mouseMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.7 });
      const mouse = new THREE.Mesh(new THREE.SphereGeometry(0.045, 24, 24), mouseMat);
      mouse.position.set(0.65, 0.76, -0.25);
      mouse.scale.set(1.3, 0.45, 0.9);
      mouse.castShadow = true;
      scene.add(mouse);
      
      // --- PREMIUM PC TOWER (Glass Panel, RGB) ---
      const towerGroup = new THREE.Group();
      const towerMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2a, metalness: 0.85 });
      const towerCase = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.65, 0.55), towerMat);
      towerCase.position.set(1.45, 0.48, 0.55);
      towerCase.castShadow = true;
      towerGroup.add(towerCase);
      
      // Glass panel
      const glassPanel = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.55, 0.02), new THREE.MeshPhysicalMaterial({ color: 0x3b82f6, metalness: 0.95, transparent: true, opacity: 0.2 }));
      glassPanel.position.set(1.45, 0.48, 0.82);
      towerGroup.add(glassPanel);
      
      // RGB LED strip
      const rgbLED = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.02, 0.02), new THREE.MeshStandardMaterial({ color: 0x00ff88, emissive: 0x00ff88, emissiveIntensity: 0.6 }));
      rgbLED.position.set(1.45, 0.18, 0.82);
      towerGroup.add(rgbLED);
      
      scene.add(towerGroup);
      
      // --- PREMIUM OFFICE CHAIR (Ergonomic) ---
      const chairGroup = new THREE.Group();
      const chairMatPremium = new THREE.MeshStandardMaterial({ color: 0x1e1e2e, metalness: 0.3, roughness: 0.6 });
      
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.08, 0.58), chairMatPremium);
      seat.position.set(0, 0.28, -0.9);
      seat.castShadow = true;
      chairGroup.add(seat);
      
      const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.52, 0.08), chairMatPremium);
      backrest.position.set(0, 0.6, -1.22);
      backrest.castShadow = true;
      chairGroup.add(backrest);
      
      const armrestMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.6 });
      const armrestLeft = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.38), armrestMat);
      armrestLeft.position.set(-0.42, 0.52, -0.9);
      chairGroup.add(armrestLeft);
      
      const armrestRight = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.38), armrestMat);
      armrestRight.position.set(0.42, 0.52, -0.9);
      chairGroup.add(armrestRight);
      
      chairGroup.position.set(0, 0.15, 0);
      scene.add(chairGroup);
      
      // --- ADVANCED SPIDER-DOT NETWORK (Quantum Neural Web) ---
      const neuralNodeCount = 280;
      const neuralNodes = [];
      const neuralColors = [0x3b82f6, 0x8b5cf6, 0xf97316, 0x06b6d4];
      
      for (let i = 0; i < neuralNodeCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 2.2 + Math.random() * 2.5;
        const node = new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * radius * (Math.random() - 0.5) * 1.2,
          Math.sin(phi) * Math.sin(theta) * radius * 0.7 + 0.9,
          Math.cos(phi) * radius * (Math.random() - 0.5) * 1.1 - 0.5
        );
        neuralNodes.push({ pos: node, color: neuralColors[Math.floor(Math.random() * neuralColors.length)] });
      }
      
      // Create intelligent connections (spider web with varying distances)
      const connections = [];
      const connectionColors = [];
      
      for (let i = 0; i < neuralNodes.length; i++) {
        for (let j = i + 1; j < neuralNodes.length; j++) {
          const dist = neuralNodes[i].pos.distanceTo(neuralNodes[j].pos);
          const maxDist = 1.1;
          if (dist < maxDist) {
            connections.push(neuralNodes[i].pos.x, neuralNodes[i].pos.y, neuralNodes[i].pos.z);
            connections.push(neuralNodes[j].pos.x, neuralNodes[j].pos.y, neuralNodes[j].pos.z);
            connectionColors.push(neuralNodes[i].color, neuralNodes[j].color);
          }
        }
      }
      
      const neuralGeo = new THREE.BufferGeometry();
      neuralGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(connections), 3));
      const neuralMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.25 });
      const neuralWeb = new THREE.LineSegments(neuralGeo, neuralMat);
      scene.add(neuralWeb);
      
      // Neural nodes (spider dots) with glow
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
      const nodeMat = new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending });
      const neuralNodesPoints = new THREE.Points(nodeGeo, nodeMat);
      scene.add(neuralNodesPoints);
      
      // --- DATA STREAM PARTICLES (Code Rain Premium) ---
      const dataStreamCount = 600;
      const streamPositions = new Float32Array(dataStreamCount * 3);
      const streamColors = new Float32Array(dataStreamCount * 3);
      const streamSpeeds = [];
      
      for (let i = 0; i < dataStreamCount; i++) {
        streamPositions[i * 3] = (Math.random() - 0.5) * 6;
        streamPositions[i * 3 + 1] = Math.random() * 3.2;
        streamPositions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
        
        const colorType = Math.random();
        if (colorType < 0.34) {
          streamColors[i * 3] = 0.2;
          streamColors[i * 3 + 1] = 0.8;
          streamColors[i * 3 + 2] = 0.4;
        } else if (colorType < 0.67) {
          streamColors[i * 3] = 0.9;
          streamColors[i * 3 + 1] = 0.4;
          streamColors[i * 3 + 2] = 0.2;
        } else {
          streamColors[i * 3] = 0.3;
          streamColors[i * 3 + 1] = 0.5;
          streamColors[i * 3 + 2] = 0.9;
        }
        streamSpeeds.push(0.006 + Math.random() * 0.018);
      }
      
      const streamGeo = new THREE.BufferGeometry();
      streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPositions, 3));
      streamGeo.setAttribute('color', new THREE.BufferAttribute(streamColors, 3));
      const streamMat = new THREE.PointsMaterial({ size: 0.007, vertexColors: true, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending });
      const dataStream = new THREE.Points(streamGeo, streamMat);
      scene.add(dataStream);
      
      // --- FLOATING TECH ORBS (Premium) ---
      const techOrbs = [];
      const orbColors = [0x3b82f6, 0x8b5cf6, 0xf97316, 0x06b6d4, 0x10b981];
      for (let i = 0; i < 45; i++) {
        const orbMat = new THREE.MeshStandardMaterial({ 
          color: orbColors[Math.floor(Math.random() * orbColors.length)], 
          emissiveIntensity: 0.3,
          emissive: 0xffffff,
          metalness: 0.8,
          roughness: 0.2
        });
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), orbMat);
        orb.position.set(
          (Math.random() - 0.5) * 5,
          Math.random() * 2.8,
          (Math.random() - 0.5) * 4.5 - 1
        );
        orb.userData = { speed: 0.5 + Math.random() * 1, rotSpeed: Math.random() * 0.02 };
        orb.castShadow = true;
        scene.add(orb);
        techOrbs.push(orb);
      }
      
      // --- PREMIUM STARFIELD (Deep Space) ---
      const starCount = 2000;
      const starPositions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 50;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 15;
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      const starMatPremium = new THREE.PointsMaterial({ color: 0xaaccff, size: 0.01, transparent: true, opacity: 0.35 });
      const stars = new THREE.Points(starGeo, starMatPremium);
      scene.add(stars);
      
      // --- AMBIENT DUST PARTICLES (Mystical) ---
      const dustCount = 800;
      const dustPositions = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i++) {
        dustPositions[i * 3] = (Math.random() - 0.5) * 7;
        dustPositions[i * 3 + 1] = Math.random() * 3;
        dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
      const dustMatPremium = new THREE.PointsMaterial({ color: 0xffaa88, size: 0.004, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending });
      const dust = new THREE.Points(dustGeo, dustMatPremium);
      scene.add(dust);
      
      // --- FLOATING CODE SNIPPETS (Premium) ---
      const codeSnippets = [];
      const snippetPositions = [
        [-1.2, 1.1, 1.2], [1.3, 0.9, 1.3], [-0.8, 1.4, -1.1], [0.9, 1.3, -1.2],
        [-1.5, 0.7, 0.5], [1.6, 0.6, 0.4], [0, 1.5, 1.5], [0, 1.6, -1.4]
      ];
      snippetPositions.forEach((pos, idx) => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, 256, 64);
        ctx.font = 'bold 18px "Fira Code", monospace';
        ctx.fillStyle = '#3b82f6';
        ctx.textAlign = 'center';
        const snippets = ['</>', '{code}', '() =>', 'const', 'import', 'export', 'function', 'return'];
        ctx.fillText(snippets[idx % snippets.length], 128, 35);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.15 });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.set(pos[0], pos[1], pos[2]);
        sprite.scale.set(0.6, 0.15, 1);
        scene.add(sprite);
        codeSnippets.push(sprite);
      });
      
      // --- ANIMATION ENGINE ---
      let time = 0;
      let mouseX = 0, mouseY = 0;
      let targetRotX = 0, targetRotY = 0;
      
      const onMouseMove = (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        targetRotY = mouseX * 0.18;
        targetRotX = mouseY * 0.1;
      };
      
      renderer.domElement.addEventListener('mousemove', onMouseMove);
      
      function animate() {
        requestAnimationFrame(animate);
        time += 0.016;
        
        // Smooth camera rotation
        camera.position.x += (targetRotY * 0.35 - camera.position.x) * 0.055;
        camera.position.y += (targetRotX * 0.25 - camera.position.y) * 0.055;
        camera.lookAt(0, 1.0, 0);
        
        // Dynamic lighting
        screenGlow.intensity = 0.8 + Math.sin(time * 2.2) * 0.25;
        rimLight.intensity = 0.45 + Math.sin(time * 1.8) * 0.12;
        
        // Neural web pulse
        const pulseOpacity = 0.2 + Math.sin(time * 1.5) * 0.08;
        neuralMat.opacity = pulseOpacity;
        nodeMat.size = 0.032 + Math.sin(time * 2) * 0.006;
        
        // Data stream animation
        const streamAttr = dataStream.geometry.attributes.position.array;
        for (let i = 0; i < dataStreamCount; i++) {
          streamAttr[i * 3 + 1] -= streamSpeeds[i];
          if (streamAttr[i * 3 + 1] < -0.5) {
            streamAttr[i * 3 + 1] = 2.8;
            streamAttr[i * 3] = (Math.random() - 0.5) * 6;
          }
        }
        dataStream.geometry.attributes.position.needsUpdate = true;
        
        // Tech orbs animation
        techOrbs.forEach(orb => {
          orb.rotation.x += orb.userData.rotSpeed;
          orb.rotation.y += orb.userData.rotSpeed;
          orb.position.y += Math.sin(time * orb.userData.speed) * 0.0012;
        });
        
        // Dust particles
        dust.rotation.y += 0.0004;
        dust.rotation.x += 0.0002;
        
        // Stars drift
        stars.rotation.y += 0.00015;
        
        // RGB LED pulse
        rgbLED.material.emissiveIntensity = 0.5 + Math.sin(time * 3) * 0.25;
        
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
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#080c14] to-[#0a0f18]">
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#080c14] to-[#0a0f18] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
              <div className="absolute inset-2 rounded-full bg-orange-500/10 animate-pulse" />
            </div>
            <p className="text-[9px] font-mono text-orange-500/60 tracking-widest animate-pulse">INITIALIZING WORKSPACE</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Premium Tab Content ───────────────────────────────────────
const TABS = [
  { id: 'story', label: 'Story', icon: BookOpen },
  { id: 'philosophy', label: 'Philosophy', icon: Lightbulb },
  { id: 'vision', label: 'Vision', icon: Eye },
];

const TAB_CONTENT = {
  story: (
    <div className="space-y-5 text-sm leading-relaxed text-stone-400">
      <p className="relative pl-4 border-l-2 border-orange-500/30">
        I'm a <span className="font-bold text-stone-100">Full-Stack Developer</span> and Level 5 Software Student, bridging the gap between complex logic and fluid user interfaces. My journey started with a deep curiosity for systems — how things connect, communicate, and scale.
      </p>
      <p>
        I mastered the{' '}
        <span className="text-orange-500 font-semibold tracking-wide">
          React, Node.js &amp; MySQL
        </span>{' '}
        stack and have since expanded into cloud infrastructure, 3D web experiences, and AI integrations. Based in{' '}
        <span className="font-semibold text-stone-100 border-b border-orange-500/30">Kigali, Rwanda</span>,
        building products used across six countries.
      </p>
      <p className="italic text-stone-500">
        "Project Archaeology" — digging into the root of a problem before writing a single line of code.
      </p>
    </div>
  ),
  philosophy: (
    <div className="space-y-5 text-sm leading-relaxed text-stone-400">
      <p className="relative pl-4 border-l-2 border-orange-500/30">
        Great software is invisible. It solves problems so naturally that users never have to think about the tool — only the outcome.
      </p>
      <p>
        I build with{' '}
        <span className="font-bold text-stone-100">performance as a constraint</span>,
        not an afterthought. Sub-2.5s LCP, accessible markup, and offline-ready architectures are non-negotiable starting points.
      </p>
      <p>
        Collaboration &gt; isolation. The best products emerge from honest feedback loops and teams that challenge each other respectfully.
      </p>
    </div>
  ),
  vision: (
    <div className="space-y-5 text-sm leading-relaxed text-stone-400">
      <p className="relative pl-4 border-l-2 border-orange-500/30">
        My vision is to help East Africa produce world-class software talent and products. Rwanda's tech ecosystem is growing rapidly.
      </p>
      <p>
        Focused on{' '}
        <span className="font-bold text-stone-100">AI-native product development</span>,
        building tools that lower the barrier to entrepreneurship for local founders.
      </p>
      <p>
        Long-term: a venture-backed product studio operating from Kigali — shipping software that solves real African problems.
      </p>
    </div>
  ),
};

const PILLARS = [
  { icon: Zap, title: 'Performance First', desc: 'Optimising for sub-2.5s LCP. Speed is a feature.', color: '#f97316' },
  { icon: Layers, title: 'Scalable Architecture', desc: 'MERN + API-first design for systems that grow.', color: '#3b82f6' },
  { icon: Code2, title: 'Visual Craft', desc: 'Figma precision + Three.js storytelling.', color: '#8b5cf6' },
];

const STATS = [
  { icon: ShieldCheck, label: 'Proficiency', value: 'Level 5' },
  { icon: Globe, label: 'Impact', value: '6+ Countries' },
  { icon: Code2, label: 'Projects', value: '15+' },
];

export default function About() {
  const [activeTab, setActiveTab] = useState('story');
  const personPhotoUrl = '/wit.png';

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 overflow-hidden bg-[#0c0b0a]">
      {/* Premium ambient effects */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -right-32 w-[500px] h-[500px] rounded-full bg-orange-500/[0.04] blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full bg-blue-500/[0.03] blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/[0.02] blur-3xl" />
      </div>

      <div className="relative max-w-[1200px] mx-auto">
        {/* Premium Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-orange-500 to-transparent" />
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-orange-500">Identity 2026</p>
              <div className="w-12 h-px bg-gradient-to-l from-orange-500 to-transparent" />
            </div>
            <h2 className="text-[clamp(42px,6vw,72px)] font-black leading-[0.92] tracking-tighter text-stone-100">
              Crafting the{' '}
              <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">Next-Gen</span>
              <br />Web Experience
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="text-right">
            <div className="flex items-center justify-end gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[10px] font-mono text-stone-500 tracking-wider">OPERATIONAL</span>
            </div>
            <p className="text-sm leading-relaxed text-stone-500 max-w-xs">
              Based in Rwanda, building worldwide.<br />
              Specialising in robust backend logic and immersive frontend motion.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* LEFT - Premium 3D Workspace */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative aspect-square rounded-2xl overflow-hidden border border-stone-800/40 bg-gradient-to-br from-[#080c14] to-[#0a0f18] shadow-2xl">
              <UltraModernWorkspace personImageUrl={personPhotoUrl} />
              
              {/* Premium overlay effects */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)' }} />
              
              {/* Live badge */}
              <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 z-10">
                <div className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-70" />
                  <span className="relative rounded-full h-1.5 w-1.5 bg-red-500" />
                </div>
                <span className="text-[8px] font-bold uppercase tracking-widest text-white/80">LIVE SESSION</span>
              </div>
              
              {/* Premium floating card */}
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-5 right-5 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-xl z-10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <Cpu size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/50">Active Workspace</p>
                  <p className="text-[10px] font-bold text-white">Full-Stack Development</p>
                </div>
              </motion.div>
              
              <p className="absolute bottom-5 left-5 text-[7px] font-mono text-white/20 z-10">INTERACTIVE 3D • DRAG TO EXPLORE</p>
            </motion.div>

            {/* Premium Stats */}
            <div className="grid grid-cols-3 gap-3">
              {STATS.map(({ icon: Ic, label, value }, i) => (
                <motion.div key={label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group relative p-4 rounded-xl text-center bg-gradient-to-br from-[#161513] to-[#1a1815] border border-stone-800/60 hover:border-orange-500/40 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent transition-all duration-500" />
                  <Ic size={16} className="text-stone-500 group-hover:text-orange-500 transition-colors mx-auto mb-2" />
                  <p className="text-xl font-black text-stone-100">{value}</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-stone-500">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT - Premium Content */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Premium Tabs */}
            <div>
              <div className="flex gap-1 p-1 rounded-xl bg-stone-900/40 w-fit mb-8 backdrop-blur-sm">
                {TABS.map(({ id, label, icon: Ic }) => (
                  <button key={id} onClick={() => setActiveTab(id)} className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-250 ${activeTab === id ? 'text-white' : 'text-stone-500 hover:text-stone-300'}`}>
                    {activeTab === id && <motion.div layoutId="premium-tab-pill" className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg shadow-orange-500/30" transition={{ type: 'spring', stiffness: 400, damping: 35 }} />}
                    <Ic size={12} className="relative z-10" />
                    <span className="relative z-10">{label}</span>
                  </button>
                ))}
              </div>

              <div className="min-h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                    {TAB_CONTENT[activeTab]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Premium Pillars */}
            <div className="grid sm:grid-cols-3 gap-4">
              {PILLARS.map(({ icon: Ic, title, desc, color }, i) => (
                <motion.div key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="group relative p-5 rounded-xl bg-gradient-to-br from-[#161513] to-[#1a1815] border border-stone-800/60 hover:border-orange-500/40 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent transition-all duration-500" />
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                    <Ic size={18} style={{ color }} />
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-stone-100 mb-2">{title}</h4>
                  <p className="text-[10px] leading-relaxed text-stone-500 group-hover:text-stone-400 transition-colors">{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Premium CTA */}
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="relative group p-5 rounded-xl bg-gradient-to-r from-[#161513] to-[#1a1815] border border-stone-800/60 hover:border-orange-500/40 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent transition-all duration-500" />
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="flex -space-x-3">
                  {[Coffee, Coffee, Sparkles].map((Ic, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#161513] bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center shadow-lg">
                      <Ic size={14} className={i === 2 ? 'text-orange-500' : 'text-stone-500'} />
                    </div>
                  ))}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-sm font-black text-stone-100">Available for Opportunities</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">Open to freelance, collaborations, and full-time roles</p>
                </div>
                <a href="#contact" className="group/btn flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-[10px] font-bold uppercase tracking-wider transition-all shadow-lg shadow-orange-500/25">
                  Let's Connect
                  <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
