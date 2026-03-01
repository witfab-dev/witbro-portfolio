import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.hasAttribute('data-clickable') ||
        target.closest('a') ||
        target.closest('button');
      
      setIsPointer(isClickable);
      setCursorVariant(isClickable ? 'pointer' : 'default');
    };

    window.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: '#3b82f6'
    },
    pointer: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'transparent',
      border: '2px solid #3b82f6',
      mixBlendMode: 'difference'
    }
  };

  const spring = {
    type: 'spring',
    stiffness: 500,
    damping: 28
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={spring}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-40 border border-blue-400/30"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
        style={{
          width: 40,
          height: 40,
        }}
      />
    </>
  );
};

export default CustomCursor;