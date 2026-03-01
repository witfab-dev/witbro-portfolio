import { useState } from 'react';

const useParticles = (containerId = 'particles-js', options = {}) => {
  const [isLoaded] = useState(true); // Always "loaded" since no real particles
  
  // Create static particles using CSS instead
  const createStaticParticles = () => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Add static CSS background
    container.style.background = `
      radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
    `;
    container.style.backgroundSize = '100px 100px, 150px 150px, 200px 200px';
  };

  // Initialize on first render
  if (typeof window !== 'undefined') {
    setTimeout(createStaticParticles, 100);
  }

  const updateOptions = (newOptions) => {
    console.log('Update options:', newOptions);
    createStaticParticles(); // Recreate with new options if needed
  };

  return { 
    isLoaded, 
    error: null, 
    updateOptions,
    particlesRef: { current: null }
  };
};

export default useParticles;