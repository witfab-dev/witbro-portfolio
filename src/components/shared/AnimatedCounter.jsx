// src/components/shared/AnimatedCounter.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const AnimatedCounter = ({ value, duration = 2000, className = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.5 }
      });

      let start = 0;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration, controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      className={className}
    >
      {count}{suffix}
    </motion.div>
  );
};

export default AnimatedCounter;