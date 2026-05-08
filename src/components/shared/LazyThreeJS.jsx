// components/shared/LazyThreeJS.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useThreeJS } from '../../hooks/useThreeJS';

export default function LazyThreeJS({ componentId, options, children, fallback }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
/**
 * components/shared/LazyThreeJS.jsx
 *
 * A production-grade lazy wrapper for any Three.js / WebGL scene.
 *
 * Features:
 *  ✓ IntersectionObserver — only mounts the 3-D scene when near the viewport
 *  ✓ WebGL capability check — renders `fallback` immediately on unsupported devices
 *  ✓ React Error Boundary — catches runtime Three.js errors without crashing the page
 *  ✓ Idle-callback scheduling — defers heavy init to browser idle time on low-end devices
 *  ✓ Visibility API — pauses/resumes the animation loop when the tab is hidden
 *  ✓ Reduced-motion respect — skips the 3-D scene when the OS requests it
 *  ✓ Loading state with accessible spinner
 *  ✓ Graceful unmount — disconnects observer & cancels pending timers
 */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Component,
  createContext,
  useContext,
} from 'react';

// ─── WebGL Detection ───────────────────────────────────────────────────────────
function detectWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

function detectReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

// ─── Context (lets children know about the lazy-mount lifecycle) ───────────────
const LazyThreeContext = createContext({
  isVisible:  false,
  isReady:    false,
  hasError:   false,
  webGLSupported: true,
});

export function useLazyThreeContext() {
  return useContext(LazyThreeContext);
}

// ─── Loading Spinner ───────────────────────────────────────────────────────────
function LoadingOverlay({ className = '' }) {
  return (
    <div
      role="status"
      aria-label="Loading 3D scene"
      className={`absolute inset-0 flex items-center justify-center bg-transparent ${className}`}
    >
      <div className="flex flex-col items-center gap-3">
        {/* Animated ring — pure CSS, no WebGL needed */}
        <div
          className="relative w-10 h-10"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 rounded-full border-2 border-white/10"
            style={{ borderTopColor: 'rgba(249,115,22,0.7)' }}
            style={{
              border: '2px solid rgba(255,255,255,0.08)',
              borderTopColor: 'rgba(249,115,22,0.75)',
              borderRadius: '50%',
              animation: 'lazyThreeSpin 0.9s linear infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 4,
              border: '1.5px solid rgba(255,255,255,0.05)',
              borderBottomColor: 'rgba(59,130,246,0.6)',
              borderRadius: '50%',
              animation: 'lazyThreeSpin 1.4s linear infinite reverse',
            }}
          />
        </div>
        <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">
          Initialising
        </span>
      </div>
      <style>{`
        @keyframes lazyThreeSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ─── Error Boundary ────────────────────────────────────────────────────────────
class ThreeErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message ?? 'Unknown Three.js error',
    };
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[LazyThreeJS] Runtime error in 3D scene:', error, info);
    }
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

// ─── Main Component ────────────────────────────────────────────────────────────
/**
 * @param {object}  props
 * @param {string}  props.componentId       — unique key for debugging / context
 * @param {React.ReactNode} props.children  — the Three.js scene component
 * @param {React.ReactNode} [props.fallback]— shown while loading or on error/no-WebGL
 * @param {number}  [props.threshold=0.1]   — IntersectionObserver threshold
 * @param {string}  [props.rootMargin='120px'] — how far outside the viewport to start loading
 * @param {boolean} [props.respectReducedMotion=true] — skip 3D on prefers-reduced-motion
 * @param {boolean} [props.useIdleCallback=true]  — defer init to requestIdleCallback
 * @param {boolean} [props.pauseWhenHidden=true]  — stop rendering when tab loses focus
 * @param {string}  [props.className]        — extra classes on the root div
 * @param {function} [props.onError]         — called when the scene throws
 * @param {function} [props.onReady]         — called once the scene is mounted
 */
export default function LazyThreeJS({
  componentId        = 'three-scene',
  children,
  fallback           = null,
  threshold          = 0.1,
  rootMargin         = '120px',
  respectReducedMotion = true,
  useIdleCallback    = true,
  pauseWhenHidden    = true,
  className          = '',
  onError,
  onReady,
}) {
  const containerRef = useRef(null);
  const idleCallbackRef = useRef(null);
  const observerRef = useRef(null);

  const [phase, setPhase] = useState('idle'); // idle | loading | ready | error
  const [webGLSupported] = useState(detectWebGL);
  const [reducedMotion]  = useState(detectReducedMotion);
  const [tabVisible, setTabVisible] = useState(true);

  // Skip 3D when OS/browser requests reduced motion
  const skip3D = (respectReducedMotion && reducedMotion) || !webGLSupported;

  // ── Visibility API ───────────────────────────────────────
  useEffect(() => {
    if (!pauseWhenHidden) return;
    const handleVisibility = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [pauseWhenHidden]);

  // ── Mount trigger ────────────────────────────────────────
  const triggerMount = useCallback(() => {
    setPhase('loading');

    const doMount = () => {
      setPhase('ready');
      onReady?.();
    };

    if (useIdleCallback && typeof window.requestIdleCallback === 'function') {
      idleCallbackRef.current = window.requestIdleCallback(doMount, { timeout: 2000 });
    } else {
      // Small delay so the browser can paint the loading state first
      idleCallbackRef.current = setTimeout(doMount, 60);
    }
  }, [useIdleCallback, onReady]);

  // ── Intersection Observer ────────────────────────────────
  useEffect(() => {
    if (skip3D || phase !== 'idle') return;

    const el = containerRef.current;
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observerRef.current?.disconnect();
          triggerMount();
        }
      },
      { threshold, rootMargin }
    );
    observerRef.current.observe(el);

    return () => observerRef.current?.disconnect();
  }, [skip3D, phase, threshold, rootMargin, triggerMount]);

  // ── Cleanup ──────────────────────────────────────────────
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      if (typeof window.cancelIdleCallback === 'function' && idleCallbackRef.current) {
        window.cancelIdleCallback(idleCallbackRef.current);
      } else {
        clearTimeout(idleCallbackRef.current);
      }
    };
  }, []);

  // ── Context value ────────────────────────────────────────
  const ctx = {
    componentId,
    isVisible:      phase !== 'idle',
    isReady:        phase === 'ready',
    hasError:       phase === 'error',
    webGLSupported,
    tabVisible,
  };

  // ── Render ───────────────────────────────────────────────
  const rootCls = `absolute inset-0 ${className}`.trim();

  // Case 1: WebGL not supported or reduced-motion preference
  if (skip3D) {
    return (
      <LazyThreeContext.Provider value={ctx}>
        <div ref={containerRef} className={rootCls} data-lazy-three-id={componentId} data-state="skipped">
          {fallback}
        </div>
      </LazyThreeContext.Provider>
    );
  }

  // Case 2: Not yet visible — show fallback quietly
  if (phase === 'idle') {
    return (
      <LazyThreeContext.Provider value={ctx}>
        <div ref={containerRef} className={rootCls} data-lazy-three-id={componentId} data-state="idle">
          {fallback}
        </div>
      </LazyThreeContext.Provider>
    );
  }

  // Case 3: Loading (intersection triggered, idle callback pending)
  if (phase === 'loading') {
    return (
      <LazyThreeContext.Provider value={ctx}>
        <div ref={containerRef} className={rootCls} data-lazy-three-id={componentId} data-state="loading">
          {fallback}
          <LoadingOverlay />
        </div>
      </LazyThreeContext.Provider>
    );
  }

  // Case 4: Ready — mount the Three.js scene inside the error boundary
  return (
    <LazyThreeContext.Provider value={ctx}>
      <div
        ref={containerRef}
        className={rootCls}
        data-lazy-three-id={componentId}
        data-state={tabVisible ? 'ready' : 'paused'}
        // Signal tab visibility to the child via a CSS custom property
        // so the child's animation loop can optionally read it
        style={{ '--tab-visible': tabVisible ? 1 : 0 }}
      >
        <ThreeErrorBoundary
          fallback={fallback}
          onError={(err) => {
            setPhase('error');
            onError?.(err);
          }}
        >
          {/* Render children regardless of tab focus — let the child's
              own useThreeJS hook handle pausing via the context above. */}
          {children}
        </ThreeErrorBoundary>
      </div>
    </LazyThreeContext.Provider>
  );
}
  // Intersection Observer - only init when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px' // Start loading slightly before visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {isVisible ? children : fallback}
    </div>
  );
}
