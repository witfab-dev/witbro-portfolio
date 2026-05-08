// hooks/useThreeJS.js
import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { webGLManager } from './WebGLManager';

/**
 * Custom hook for managing Three.js scenes with WebGL context limits
 * 
 * @param {string} componentId - Unique identifier for this Three.js instance
 * @param {Object} options - Configuration options
 * @param {Array} options.cameraPosition - [x, y, z] camera position
 * @param {number} options.fov - Field of view
 * @param {boolean} options.enableShadows - Enable shadow maps
 * @param {Function} options.onInit - Callback when scene is ready
 * @param {boolean} options.enabled - Whether to initialize Three.js
 * @returns {Object} - References and utility functions
 */
export function useThreeJS(componentId, options = {}) {
  const {
    cameraPosition = [0, 0, 5],
    fov = 45,
    near = 0.1,
    far = 100,
    enableShadows = false,
    onInit = () => {},
    enabled = true,
  } = options;

  const mountRef = useRef(null);
  const frameRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const isActiveRef = useRef(true);
  const animationCallbacksRef = useRef([]);
  const resizeCallbacksRef = useRef([]);
  
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Initialize Three.js scene
   */
  useEffect(() => {
    // Skip if disabled
    if (!enabled) return;
    
    let mounted = true;
    const el = mountRef.current;
    if (!el) return;

    const initThreeJS = async () => {
      try {
        // Check WebGL support
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
          throw new Error('WebGL not supported on this device');
        }

        // Wait for available context slot
        await webGLManager.requestContext(componentId);

        if (!mounted || !isActiveRef.current) {
          webGLManager.releaseContext(componentId);
          return;
        }

        const W = el.clientWidth;
        const H = el.clientHeight;

        // Create renderer with optimizations
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        });

        // Configure renderer
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H);
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;

        if (enableShadows) {
          renderer.shadowMap.enabled = true;
          renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }

        // Append to DOM
        el.appendChild(renderer.domElement);
        rendererRef.current = renderer;
        webGLManager.registerContext(componentId, renderer);

        // Create scene
        const scene = new THREE.Scene();
        scene.background = null; // Transparent
        
        // Optional fog for depth
        // scene.fog = new THREE.FogExp2(0x000000, 0.0001);
        
        sceneRef.current = scene;

        // Create camera
        const camera = new THREE.PerspectiveCamera(fov, W / H, near, far);
        camera.position.set(...cameraPosition);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Mark as ready
        setIsReady(true);

        // Call init callback with Three.js objects
        await onInit({ scene, camera, renderer, THREE });

      } catch (err) {
        console.warn(`[useThreeJS] Initialization failed for "${componentId}":`, err.message);
        setError(err.message);
        webGLManager.releaseContext(componentId);
      }
    };

    initThreeJS();

    // Cleanup function
    return () => {
      mounted = false;
      isActiveRef.current = false;

      // Cancel animation frame
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      // Dispose Three.js resources
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => disposeMaterial(material));
            } else {
              disposeMaterial(object.material);
            }
          }
          if (object.dispose && typeof object.dispose === 'function') {
            object.dispose();
          }
        });
        sceneRef.current.clear();
        sceneRef.current = null;
      }

      // Dispose renderer
      if (rendererRef.current) {
        const domElement = rendererRef.current.domElement;
        rendererRef.current.dispose();
        rendererRef.current = null;
        
        // Remove canvas from DOM
        if (el && domElement && el.contains(domElement)) {
          el.removeChild(domElement);
        }
      }

      // Release WebGL context
      webGLManager.releaseContext(componentId);
    };
  }, [componentId, enabled]); // Re-initialize if enabled changes

  /**
   * Helper to dispose material and its textures
   */
  const disposeMaterial = (material) => {
    if (material.map) material.map.dispose();
    if (material.lightMap) material.lightMap.dispose();
    if (material.bumpMap) material.bumpMap.dispose();
    if (material.normalMap) material.normalMap.dispose();
    if (material.specularMap) material.specularMap.dispose();
    if (material.envMap) material.envMap.dispose();
    if (material.alphaMap) material.alphaMap.dispose();
    if (material.aoMap) material.aoMap.dispose();
    if (material.displacementMap) material.displacementMap.dispose();
    if (material.emissiveMap) material.emissiveMap.dispose();
    if (material.metalnessMap) material.metalnessMap.dispose();
    if (material.roughnessMap) material.roughnessMap.dispose();
    material.dispose();
  };

  /**
   * Start animation loop
   */
  const startAnimationLoop = useCallback((callback) => {
    if (animationCallbacksRef.current.includes(callback)) return;
    
    animationCallbacksRef.current.push(callback);
    
    const animate = () => {
      if (!isActiveRef.current) return;
      
      frameRef.current = requestAnimationFrame(animate);
      
      // Execute all animation callbacks
      animationCallbacksRef.current.forEach(cb => {
        try {
          cb({
            scene: sceneRef.current,
            camera: cameraRef.current,
            renderer: rendererRef.current,
          });
        } catch (err) {
          console.warn('[useThreeJS] Animation callback error:', err);
        }
      });
      
      // Render scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    // Return stop function
    return () => {
      animationCallbacksRef.current = animationCallbacksRef.current.filter(cb => cb !== callback);
    };
  }, []);

  /**
   * Handle window resize
   */
  const handleResize = useCallback(() => {
    const el = mountRef.current;
    if (!el || !cameraRef.current || !rendererRef.current) return;

    const w = el.clientWidth;
    const h = el.clientHeight;

    cameraRef.current.aspect = w / h;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(w, h);

    // Execute resize callbacks
    resizeCallbacksRef.current.forEach(cb => {
      try {
        cb({ width: w, height: h });
      } catch (err) {
        console.warn('[useThreeJS] Resize callback error:', err);
      }
    });
  }, []);

  /**
   * Add resize callback
   */
  const onResize = useCallback((callback) => {
    resizeCallbacksRef.current.push(callback);
    return () => {
      resizeCallbacksRef.current = resizeCallbacksRef.current.filter(cb => cb !== callback);
    };
  }, []);

  // Attach resize listener
  useEffect(() => {
    if (!isReady) return;
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isReady, handleResize]);

  /**
   * Mouse/touch interaction helper
   */
  const useMouseInteraction = useCallback((onMove) => {
    useEffect(() => {
      const el = mountRef.current;
      if (!el) return;

      const handleMouseMove = (e) => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        onMove({ x, y, normalized: { x, y } });
      };

      el.addEventListener('mousemove', handleMouseMove);
      return () => el.removeEventListener('mousemove', handleMouseMove);
    }, [onMove]);
  }, []);

  /**
   * Create a raycaster for click detection
   */
  const useRaycaster = useCallback((objects, onClick) => {
    useEffect(() => {
      const el = mountRef.current;
      if (!el || !cameraRef.current) return;

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const handleClick = (e) => {
        const rect = el.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, cameraRef.current);
        
        const targets = Array.isArray(objects) ? objects : [objects];
        const intersects = raycaster.intersectObjects(targets, true);

        if (intersects.length > 0) {
          onClick(intersects[0]);
        }
      };

      el.addEventListener('click', handleClick);
      return () => el.removeEventListener('click', handleClick);
    }, [objects, onClick]);
  }, []);

  /**
   * Get current dimensions
   */
  const getDimensions = useCallback(() => {
    const el = mountRef.current;
    if (!el) return { width: 0, height: 0 };
    return { width: el.clientWidth, height: el.clientHeight };
  }, []);

  /**
   * Take screenshot of current frame
   */
  const takeScreenshot = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return null;
    
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    return rendererRef.current.domElement.toDataURL('image/png');
  }, []);

  return {
    // Refs
    mountRef,
    frameRef,
    
    // State
    isReady,
    error,
    
    // Three.js objects (only available after isReady)
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    
    // Methods
    startAnimationLoop,
    handleResize,
    onResize,
    useMouseInteraction,
    useRaycaster,
    getDimensions,
    takeScreenshot,
  };
}

export default useThreeJS;
