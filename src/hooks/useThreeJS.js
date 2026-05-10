// hooks/useThreeJS.js
import { useRef, useEffect, useCallback, useState } from 'react';
import * as THREE from 'three';
import { webGLManager } from './WebGLManager';

/**
 * useThreeJS
 * Manages the full Three.js lifecycle with WebGLManager integration.
 *
 * IMPORTANT — useMouseInteraction:
 *   Call it at the TOP LEVEL of a component (React hook rules).
 *   It registers a callback that fires on every mousemove over the canvas.
 *   It returns an unsubscribe function — call it in a cleanup if needed,
 *   though the hook also auto-cleans up on unmount.
 *
 * @param {string} id      - Unique stable identifier, e.g. 'hero-3d-bg'
 * @param {object} options
 *   cameraPosition  [x,y,z]    default [0,0,5]
 *   fov             number      default 60
 *   enableShadows   boolean     default false
 *   onInit          function    ({ scene, camera, renderer }) → void
 */
export function useThreeJS(id = 'threejs', options = {}) {
  const {
    cameraPosition = [0, 0, 5],
    fov            = 60,
    enableShadows  = false,
    onInit,
  } = options;

  const mountRef    = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef    = useRef(null);
  const cameraRef   = useRef(null);
  const frameRef    = useRef(null);
  const animFnRef   = useRef(null);
  const mouseRef    = useRef({ x: 0, y: 0 });
  const mouseCbsRef = useRef([]);   // imperative list — no hooks inside
  const mountedRef  = useRef(true);

  const [isReady, setIsReady] = useState(false);
  const [error,   setError]   = useState(null);

  // ── Init (async to handle WebGLManager queue) ───────────────
  useEffect(() => {
    mountedRef.current = true;
    const el = mountRef.current;
    if (!el) return;

    let renderer = null;

    const init = async () => {
      // 1. Capability check
      try {
        const c  = document.createElement('canvas');
        const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
        if (!gl) throw new Error('WebGL not supported on this device.');
      } catch (e) {
        if (mountedRef.current) setError(e.message);
        return;
      }

      // 2. Request context slot
      try {
        await webGLManager.requestContext(id);
      } catch (e) {
        if (mountedRef.current) setError('WebGL context limit reached.');
        return;
      }

      if (!mountedRef.current) {
        webGLManager.releaseContext(id);
        return;
      }

      // 3. Renderer
      let W = el.clientWidth  || window.innerWidth;
      let H = el.clientHeight || window.innerHeight;

      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H);
        renderer.setClearColor(0x000000, 0);

        if (enableShadows) {
          renderer.shadowMap.enabled = true;
          renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
        }

        el.appendChild(renderer.domElement);
        webGLManager.registerContext(id, renderer);
      } catch (e) {
        webGLManager.releaseContext(id);
        if (mountedRef.current) setError(e.message);
        return;
      }

      // 4. Scene + camera
      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(fov, W / H, 0.1, 1000);
      camera.position.set(...cameraPosition);

      rendererRef.current = renderer;
      sceneRef.current    = scene;
      cameraRef.current   = camera;

      // 5. onInit
      try {
        if (typeof onInit === 'function') onInit({ scene, camera, renderer });
      } catch (e) {
        console.warn(`[useThreeJS:${id}] onInit error:`, e.message);
        if (mountedRef.current) setError(e.message);
        return;
      }

      if (mountedRef.current) setIsReady(true);

      // 6. Mouse tracking (imperative, no hooks)
      const onMouseMove = (e) => {
        const rect = el.getBoundingClientRect();
        const x =  ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
        const y = -((e.clientY - rect.top)  / rect.height - 0.5) * 2;
        mouseRef.current = { x, y };
        // Fire all registered callbacks
        mouseCbsRef.current.forEach(cb => {
          try { cb({ x, y }); } catch {}
        });
      };
      el.addEventListener('mousemove', onMouseMove);
      el._threeCleanupMouse = () => el.removeEventListener('mousemove', onMouseMove);
    };

    init();

    return () => {
      mountedRef.current = false;

      cancelAnimationFrame(frameRef.current);
      frameRef.current  = null;
      animFnRef.current = null;

      if (el._threeCleanupMouse) {
        el._threeCleanupMouse();
        delete el._threeCleanupMouse;
      }
      mouseCbsRef.current = [];

      // Dispose scene objects
      const scene = sceneRef.current;
      if (scene) {
        scene.traverse(obj => {
          obj.geometry?.dispose();
          if (obj.material) {
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            mats.forEach(m => { m.map?.dispose(); m.dispose(); });
          }
        });
      }

      // Remove canvas + release context (manager calls renderer.dispose)
      const r = rendererRef.current;
      if (r) {
        if (el.contains(r.domElement)) el.removeChild(r.domElement);
        webGLManager.releaseContext(id);
      }

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
      animFnRef.current?.();
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
  // This IS a hook — call it at the top level of a component.
  // It registers `cb` into the imperative list; no nested hooks.
  const useMouseInteraction = (cb) => {
    useEffect(() => {
      if (typeof cb !== 'function') return;
      mouseCbsRef.current.push(cb);
      return () => {
        mouseCbsRef.current = mouseCbsRef.current.filter(fn => fn !== cb);
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // cb is expected to be stable (defined inline or wrapped in useCallback)
  };

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
