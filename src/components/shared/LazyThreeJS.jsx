// components/shared/LazyThreeJS.jsx
import React, { useState, useEffect, useRef, useCallback, Component } from 'react';

// ─── WebGL Detection ──────────────────────────────────────────
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

// ─── Loading Spinner ──────────────────────────────────────────
function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-transparent">
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-10 h-10 rounded-full border-2 border-white/10"
          style={{
            borderTopColor: 'rgba(249,115,22,0.75)',
            animation: 'lazyThreeSpin 0.9s linear infinite',
          }}
        />
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

// ─── Error Boundary ───────────────────────────────────────────
class ThreeErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.warn('[LazyThreeJS] 3D scene error:', error.message);
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

// ─── Main Component ───────────────────────────────────────────
/**
 * LazyThreeJS
 * 
 * Only mounts children when the component enters the viewport.
 * Features:
 *   - IntersectionObserver for lazy loading
 *   - WebGL capability check
 *   - Error boundary for runtime errors
 *   - Loading spinner
 *   - Reduced-motion respect
 *
 * @param {string}   componentId - Unique ID for debugging
 * @param {ReactNode} children   - The Three.js scene component
 * @param {ReactNode} fallback   - Shown while loading or on error
 * @param {number}   threshold   - IntersectionObserver threshold (default 0)
 * @param {string}   rootMargin  - IntersectionObserver rootMargin
 * @param {boolean}  respectReducedMotion - Skip 3D for prefers-reduced-motion
 * @param {boolean}  useIdleCallback - Defer init to requestIdleCallback
 * @param {function} onError     - Called when scene throws an error
 * @param {function} onReady     - Called once scene is mounted
 */
export default function LazyThreeJS({
  componentId = 'lazy-three',
  children,
  fallback = null,
  threshold = 0,
  rootMargin = '120px',
  respectReducedMotion = true,
  useIdleCallback = true,
  onError,
  onReady,
}) {
  const containerRef = useRef(null);
  const idleRef = useRef(null);
  const observerRef = useRef(null);

  const [phase, setPhase] = useState('idle'); // idle | loading | ready | error
  const [webGLSupported] = useState(detectWebGL);
  const [reducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  });

  // Skip 3D?
  const skip3D = (respectReducedMotion && reducedMotion) || !webGLSupported;

  // ── Trigger mount ───────────────────────────────────────────
  const triggerMount = useCallback(() => {
    setPhase('loading');

    const doMount = () => {
      setPhase('ready');
      onReady?.();
    };

    if (useIdleCallback && typeof window.requestIdleCallback === 'function') {
      idleRef.current = window.requestIdleCallback(doMount, { timeout: 2000 });
    } else {
      idleRef.current = setTimeout(doMount, 60);
    }
  }, [useIdleCallback, onReady]);

  // ── Intersection Observer ───────────────────────────────────
  useEffect(() => {
    if (skip3D || phase !== 'idle') return;

    const el = containerRef.current;
    if (!el) return;

    // If IntersectionObserver unavailable, mount immediately
    if (typeof IntersectionObserver === 'undefined') {
      triggerMount();
      return;
    }

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

  // ── Cleanup ─────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      if (typeof window.cancelIdleCallback === 'function' && idleRef.current) {
        window.cancelIdleCallback(idleRef.current);
      } else {
        clearTimeout(idleRef.current);
      }
    };
  }, []);

  // ── Render ──────────────────────────────────────────────────
  const rootCls = 'absolute inset-0';

  // Case 1: Skipped (no WebGL or reduced motion)
  if (skip3D) {
    return (
      <div ref={containerRef} className={rootCls} data-lazy-three={componentId} data-state="skipped">
        {fallback}
      </div>
    );
  }

  // Case 2: Not yet visible
  if (phase === 'idle') {
    return (
      <div ref={containerRef} className={rootCls} data-lazy-three={componentId} data-state="idle">
        {fallback}
      </div>
    );
  }

  // Case 3: Loading
  if (phase === 'loading') {
    return (
      <div ref={containerRef} className={rootCls} data-lazy-three={componentId} data-state="loading">
        {fallback}
        <LoadingOverlay />
      </div>
    );
  }

  // Case 4: Ready — mount children inside error boundary
  return (
    <div ref={containerRef} className={rootCls} data-lazy-three={componentId} data-state="ready">
      <ThreeErrorBoundary
        fallback={fallback}
        onError={(err) => {
          setPhase('error');
          onError?.(err);
        }}
      >
        {children}
      </ThreeErrorBoundary>
    </div>
  );
}
