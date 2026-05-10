// hooks/useThreeJS.js
import { useRef, useEffect, useCallback, useState } from 'react';
import * as THREE from 'three';
import { webGLManager } from './WebGLManager';

/**
 * useThreeJS
 * Manages the full Three.js lifecycle with WebGLManager integration.
 * Requests a context slot before creating the renderer, releases it
 * on unmount, and handles resize + mouse interaction.
 *
 * @param {string} id      - Unique identifier (must be stable, e.g. 'hero-3d-bg')
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
  const mouseCbsRef = useRef([]);
  const mountedRef  = useRef(true); // track if hook is still alive

  const [isReady, setIsReady] = useState(false);
  const [error,   setError]   = useState(null);

  // ── Init ────────────────────────────────────────────────────
  useEffect(() => {
    mountedRef.current = true;
    const el = mountRef.current;
    if (!el) return;

    let renderer = null;

    const init = async () => {
      // ── 1. WebGL capability check ──
      try {
        const testCanvas = document.createElement('canvas');
        const gl =
          testCanvas.getContext('webgl') ||
          testCanvas.getContext('experimental-webgl');
        if (!gl) throw new Error('WebGL not supported on this device.');
      } catch (e) {
        if (mountedRef.current) setError(e.message);
        return;
      }

      // ── 2. Request a context slot from WebGLManager ──
      try {
        await webGLManager.requestContext(id);
      } catch (e) {
        if (mountedRef.current) setError('WebGL context limit reached.');
        return;
      }

      // Component may have unmounted while waiting in queue
      if (!mountedRef.current) {
        webGLManager.releaseContext(id);
        return;
      }

      // ── 3. Create renderer ──
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
          renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }

        el.appendChild(renderer.domElement);

        // Register with manager so it can be force-disposed if needed
        webGLManager.registerContext(id, renderer);
      } catch (e) {
        webGLManager.releaseContext(id);
        if (mountedRef.current) setError(e.message);
        return;
      }

      // ── 4. Scene + Camera ──
      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(fov, W / H, 0.1, 1000);
      camera.position.set(...cameraPosition);

      rendererRef.current = renderer;
      sceneRef.current    = scene;
      cameraRef.current   = camera;

      // ── 5. Run user onInit callback ──
      try {
        if (typeof onInit === 'function') {
          onInit({ scene, camera, renderer });
        }
      } catch (e) {
        console.warn(`[useThreeJS:${id}] onInit error:`, e.message);
        if (mountedRef.current) setError(e.message);
        return;
      }

      if (mountedRef.current) setIsReady(true);

      // ── 6. Mouse tracking ──
      const onMouseMove = (e) => {
        const rect = el.getBoundingClientRect();
        const x =  ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
        const y = -((e.clientY - rect.top)  / rect.height - 0.5) * 2;
        mouseRef.current = { x, y };
        mouseCbsRef.current.forEach(cb => cb({ x, y }));
      };
      el.addEventListener('mousemove', onMouseMove);

      // Store cleanup ref
      el._cleanupMouse = () => el.removeEventListener('mousemove', onMouseMove);
    };

    init();

    // ── Cleanup ──────────────────────────────────────────────
    return () => {
      mountedRef.current = false;

      // Stop animation loop
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      animFnRef.current = null;

      // Remove mouse listener
      if (el._cleanupMouse) {
        el._cleanupMouse();
        delete el._cleanupMouse;
      }
      mouseCbsRef.current = [];

      // Dispose Three.js objects
      const scene = sceneRef.current;
      if (scene) {
        scene.traverse(obj => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach(m => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
          if (obj.texture) obj.texture.dispose();
        });
      }

      // Remove canvas from DOM before renderer.dispose()
      const r = rendererRef.current;
      if (r) {
        if (el.contains(r.domElement)) el.removeChild(r.domElement);
        // WebGLManager.releaseContext calls renderer.dispose() internally
        webGLManager.releaseContext(id);
      }

      rendererRef.current = null;
      sceneRef.current    = null;
      cameraRef.current   = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← intentionally empty: id and options are stable references

  // ── startAnimationLoop ────────────────────────────────────
  const startAnimationLoop = useCallback((tickFn) => {
    animFnRef.current = tickFn;

    const loop = () => {
      frameRef.current = requestAnimationFrame(loop);

      if (typeof animFnRef.current === 'function') {
        animFnRef.current();
      }

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
  // NOTE: call this at component top level (React hook rules apply)
  const useMouseInteraction = useCallback((cb) => {
    useEffect(() => {
      if (!cb) return;
      mouseCbsRef.current.push(cb);
      return () => {
        mouseCbsRef.current = mouseCbsRef.current.filter(fn => fn !== cb);
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
