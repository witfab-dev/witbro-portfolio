// src/components/shared/Typewriter.jsx
import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 50, delay = 1000, className = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Start deleting after delay
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        if (currentIndex > 0) {
          setDisplayText(text.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          setIsDeleting(false);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, text, speed, delay]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default Typewriter;