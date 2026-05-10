// hooks/useThreeJS.js
import { useRef, useEffect, useCallback, useState } from 'react';
import * as THREE from 'three';

/**
 * useThreeJS
 * A reusable hook that handles the full Three.js lifecycle:
 * renderer creation, scene/camera setup, animation loop,
 * resize handling, and cleanup.
 *
 * @param {string} id         - Unique identifier (for debugging)
 * @param {object} options
 *   cameraPosition  [x,y,z]  default [0,0,5]
 *   fov             number    default 60
 *   enableShadows   boolean   default false
 *   onInit          function  ({ scene, camera, renderer }) → void
 */
export function useThreeJS(id = 'threejs', options = {}) {
  const {
    cameraPosition = [0, 0, 5],
    fov            = 60,
    enableShadows  = false,
    onInit,
  } = options;

  const mountRef      = useRef(null);
  const rendererRef   = useRef(null);
  const sceneRef      = useRef(null);
  const cameraRef     = useRef(null);
  const frameRef      = useRef(null);
  const animFnRef     = useRef(null);
  const mouseRef      = useRef({ x: 0, y: 0 });
  const mouseCbsRef   = useRef([]);

  const [isReady, setIsReady] = useState(false);
  const [error,   setError]   = useState(null);

  // ── Init ────────────────────────────────────────────────────
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // WebGL capability check
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) throw new Error('WebGL not supported');
    } catch (e) {
      setError(e.message);
      return;
    }

    let W = el.clientWidth;
    let H = el.clientHeight;
    if (W === 0) W = window.innerWidth;
    if (H === 0) H = window.innerHeight;

    // Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);
      if (enableShadows) {
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      }
      el.appendChild(renderer.domElement);
    } catch (e) {
      setError(e.message);
      return;
    }

    // Scene + Camera
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(fov, W / H, 0.1, 1000);
    camera.position.set(...cameraPosition);

    rendererRef.current = renderer;
    sceneRef.current    = scene;
    cameraRef.current   = camera;

    // Run user init
    try {
      if (typeof onInit === 'function') {
        onInit({ scene, camera, renderer });
      }
    } catch (e) {
      console.warn(`[useThreeJS:${id}] onInit error:`, e.message);
      setError(e.message);
    }

    setIsReady(true);

    // Mouse tracking
    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x =  ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      const y = -((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      mouseRef.current = { x, y };
      mouseCbsRef.current.forEach(cb => cb({ x, y }));
    };
    el.addEventListener('mousemove', onMouseMove);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current);
      el.removeEventListener('mousemove', onMouseMove);
      mouseCbsRef.current = [];

      // Dispose all scene objects
      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });

      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      rendererRef.current = null;
      sceneRef.current    = null;
      cameraRef.current   = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── startAnimationLoop ────────────────────────────────────
  const startAnimationLoop = useCallback((tickFn) => {
    animFnRef.current = tickFn;

    const loop = () => {
      frameRef.current = requestAnimationFrame(loop);
      if (typeof animFnRef.current === 'function') animFnRef.current();
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    loop();
  }, []);

  // ── handleResize ──────────────────────────────────────────
  const handleResize = useCallback(() => {
    const el = mountRef.current;
    if (!el || !rendererRef.current || !cameraRef.current) return;
    const W = el.clientWidth  || window.innerWidth;
    const H = el.clientHeight || window.innerHeight;
    cameraRef.current.aspect = W / H;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(W, H);
  }, []);

  // ── useMouseInteraction ───────────────────────────────────
  const useMouseInteraction = useCallback((cb) => {
    useEffect(() => {
      mouseCbsRef.current.push(cb);
      return () => {
        mouseCbsRef.current = mouseCbsRef.current.filter(fn => fn !== cb);
      };
    }, [cb]);
  }, []);

  return {
    mountRef,
    isReady,
    error,
    scene:    sceneRef,
    camera:   cameraRef,
    renderer: rendererRef,
    mouse:    mouseRef,
    startAnimationLoop,
    handleResize,
    useMouseInteraction,
  };
}
