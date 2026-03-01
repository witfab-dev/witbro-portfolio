import React from 'react';

const ParticleBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      {/* Static gradient background - NO MOVING PARTICLES */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-transparent to-purple-50/10 dark:from-blue-900/5 dark:via-transparent dark:to-purple-900/5"></div>
      
      {/* Optional: Static dot pattern */}
      <style>
        {`
          .static-dots {
            background-image: radial-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px);
            background-size: 30px 30px;
          }
          .dark .static-dots {
            background-image: radial-gradient(rgba(96, 165, 250, 0.1) 1px, transparent 1px);
          }
        `}
      </style>
      <div className="absolute inset-0 static-dots opacity-50"></div>
    </div>
  );
};

export default ParticleBackground;