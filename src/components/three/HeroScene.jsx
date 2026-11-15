import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useThreeJS } from '../../hooks/useThreeJS';

/**
 * The original portfolio's Three.js hero effect, rebuilt for the current palette:
 * a translucent torus knot with a wireframe shell, orbital rings, a particle field,
 * floating octahedra and a polar grid.
 */
export default function HeroScene() {
  const {
    mountRef,
    isReady,
    error,
    startAnimationLoop,
    handleResize,
  } = useThreeJS('home-hero-3d', {
    cameraPosition: [0, 0, 8],
    fov: 55,
    enableShadows: false,
    fpsLimit: 40,
    onInit: ({ scene, camera }) => {
      scene.add(new THREE.AmbientLight(0xffffff, 0.55));

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.3);
      keyLight.position.set(8, 10, 8);
      scene.add(keyLight);

      const blueLight = new THREE.PointLight(0x3b82f6, 1.6, 30);
      blueLight.position.set(-6, -4, 4);
      scene.add(blueLight);

      const cyanLight = new THREE.PointLight(0x22d3ee, 1.4, 30);
      cyanLight.position.set(6, 5, -2);
      scene.add(cyanLight);

      const group = new THREE.Group();
      scene.add(group);

      // ── Core torus knot + wireframe shell ─────────────────────
      const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.15, 0.22, 100, 14),
        new THREE.MeshPhysicalMaterial({
          color: 0x3b82f6,
          metalness: 0.55,
          roughness: 0.18,
          transparent: true,
          opacity: 0.3,
          emissive: 0x1d4ed8,
          emissiveIntensity: 0.25,
        })
      );
      group.add(knot);

      const shell = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.22, 0.06, 60, 8),
        new THREE.MeshBasicMaterial({
          color: 0x22d3ee,
          wireframe: true,
          transparent: true,
          opacity: 0.16,
        })
      );
      group.add(shell);

      // ── Orbital rings ─────────────────────────────────────────
      const rings = [];
      [
        { radius: 1.75, tube: 0.012, color: 0x3b82f6, rotation: 0.35, speed: 0.35 },
        { radius: 2.15, tube: 0.009, color: 0x22d3ee, rotation: -0.55, speed: -0.28 },
        { radius: 2.55, tube: 0.007, color: 0xe2e8f0, rotation: 0.85, speed: 0.22 },
      ].forEach(({ radius, tube, color, rotation, speed }) => {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(radius, tube, 16, 80),
          new THREE.MeshBasicMaterial({ color,           transparent: true,
          opacity: 0.42
        })
        );
        ring.rotation.x = rotation;
        ring.rotation.y = rotation * 0.5;
        ring.userData.speed = speed;
        rings.push(ring);
        group.add(ring);
      });

      // ── Particle field ────────────────────────────────────────
      const particleCount = 160;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const blue = new THREE.Color(0x3b82f6);
      const cyan = new THREE.Color(0x22d3ee);
      const white = new THREE.Color(0xf8fafc);

      for (let i = 0; i < particleCount; i += 1) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 3 + Math.random() * 4.5;

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
        positions[i * 3 + 2] = radius * Math.cos(phi);

        const mix = Math.random();
        const color = mix < 0.55 ? blue : mix < 0.9 ? cyan : white;
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particles = new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({
          size: 0.03,
          vertexColors: true,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      group.add(particles);

      // ── Floating geometry ─────────────────────────────────────
      const floaters = [];
      for (let i = 0; i < 9; i += 1) {
        const size = 0.06 + Math.random() * 0.12;
        const mesh = new THREE.Mesh(
          new THREE.OctahedronGeometry(size, 0),
          new THREE.MeshStandardMaterial({
            color: i % 3 === 0 ? 0x22d3ee : 0x3b82f6,
            metalness: 0.75,
            roughness: 0.2,
            transparent: true,
            opacity: 0.5,
          })
        );

        const radius = 1.8 + Math.random() * 2.8;
        const angle = Math.random() * Math.PI * 2;
        mesh.position.set(
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 3.6,
          Math.sin(angle) * radius
        );
        mesh.userData = {
          speed: 0.2 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          baseY: mesh.position.y,
        };
        floaters.push(mesh);
        group.add(mesh);
      }

      group.position.set(2.35, 0.15, -1.5);

      // ── Subtle grid ───────────────────────────────────────────
      const grid = new THREE.PolarGridHelper(5, 24, 12, 60, 0x1e3a8a, 0x1e3a8a);
      grid.position.y = -3.1;
      grid.material.transparent = true;
      grid.material.opacity = 0.35;
      scene.add(grid);

      let elapsed = 0;
      startAnimationLoop(() => {
        elapsed += 0.016;

        group.rotation.y += 0.0022;
        group.rotation.x += 0.0009;

        rings.forEach((ring) => {
          ring.rotation.z += ring.userData.speed * 0.003;
          ring.rotation.x += ring.userData.speed * 0.0018;
        });

        floaters.forEach((mesh) => {
          mesh.rotation.x += mesh.userData.rotationSpeed;
          mesh.rotation.y += mesh.userData.rotationSpeed * 0.7;
          mesh.position.y =
            mesh.userData.baseY +
            Math.sin(elapsed * mesh.userData.speed + mesh.userData.phase) * 0.18;
        });

        particles.rotation.y += 0.0004;
        particles.rotation.x += 0.0002;

        const pulse = 1 + Math.sin(elapsed * 0.6) * 0.018;
        shell.scale.setScalar(pulse);

        camera.position.x = Math.sin(elapsed * 0.16) * 0.35;
        camera.position.y = Math.cos(elapsed * 0.12) * 0.18;
        camera.lookAt(0, 0, 0);
      });
    },
  });

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  if (error) return null;

  return <div ref={mountRef} className="h-full w-full" data-hero-3d={isReady ? 'ready' : 'loading'} />;
}
