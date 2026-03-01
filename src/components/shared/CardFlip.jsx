// src/components/shared/CardFlip.jsx
import React from 'react';
import { motion } from 'framer-motion';

const CardFlip = ({ frontContent, backContent, className = '' }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div 
      className={`relative w-80 h-80 perspective-1000 ${className}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d transition-transform duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden">
          {frontContent}
        </div>
        
        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          {backContent}
        </div>
      </motion.div>
    </div>
  );
};

export default CardFlip;