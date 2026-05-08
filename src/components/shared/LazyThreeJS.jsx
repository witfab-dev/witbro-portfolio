// components/shared/LazyThreeJS.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useThreeJS } from '../../hooks/useThreeJS';

export default function LazyThreeJS({ componentId, options, children, fallback }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

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
