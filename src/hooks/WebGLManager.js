// utils/WebGLManager.js

/**
 * Manages WebGL contexts to prevent exceeding browser limits
 * Most browsers limit WebGL contexts to 8-16 per page
 */
class WebGLManager {
  constructor() {
    this.activeContexts = 0;
    this.maxContexts = 8; // ✅ Allow all 5 scenes + buffer
    this.queue = [];
    this.instances = new Map();
    this.contextLimit = this.detectContextLimit();
  }

  /**
   * Detect optimal context limit based on device
   */
  detectContextLimit() {
    // Check if running in browser
    if (typeof navigator === 'undefined') return 8;
    
    // Mobile devices typically have lower limits
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    
    if (isMobile || isLowMemory) {
      return 5; // Allow all 5 on mobile too (modern phones handle it)
    }
    
    return 8; // Allow 8 on desktop (plenty for 5 scenes)
  }

  /**
   * Request permission to create a WebGL context
   * @param {string} id - Unique component identifier
   * @returns {Promise} - Resolves when context can be created
   */
  async requestContext(id) {
    // If already registered, return existing
    if (this.instances.has(id)) {
      console.log(`[WebGLManager] "${id}" already registered, reusing`);
      return this.instances.get(id);
    }

    // Wait if too many contexts are active
    while (this.activeContexts >= this.maxContexts) {
      console.warn(`[WebGLManager] "${id}" waiting for context slot (${this.activeContexts}/${this.maxContexts})...`);
      await new Promise(resolve => this.queue.push(resolve));
    }

    this.activeContexts++;
    console.log(`[WebGLManager] ✅ Context granted to "${id}" (${this.activeContexts}/${this.maxContexts})`);
    return null; // Signal to create new context
  }

  /**
   * Register a created WebGL context
   * @param {string} id - Component identifier
   * @param {THREE.WebGLRenderer} renderer - Three.js renderer
   */
  registerContext(id, renderer) {
    this.instances.set(id, renderer);
    console.log(`[WebGLManager] 📝 Registered "${id}". Total instances: ${this.instances.size}`);
  }

  /**
   * Release a WebGL context
   * @param {string} id - Component identifier
   */
  releaseContext(id) {
    if (this.instances.has(id)) {
      const renderer = this.instances.get(id);
      
      // Force dispose if not already done
      if (renderer && renderer.dispose) {
        try {
          renderer.dispose();
        } catch (e) {
          console.warn(`[WebGLManager] Error disposing renderer for "${id}":`, e);
        }
      }
      
      this.instances.delete(id);
      this.activeContexts = Math.max(0, this.activeContexts - 1);
      
      console.log(`[WebGLManager] 🔴 Context released from "${id}" (${this.activeContexts}/${this.maxContexts})`);
      
      // Process next in queue
      this.processQueue();
    }
  }

  /**
   * Process waiting queue
   */
  processQueue() {
    if (this.queue.length > 0 && this.activeContexts < this.maxContexts) {
      const next = this.queue.shift();
      setTimeout(() => next(), 100); // Small delay for cleanup
    }
  }

  /**
   * Get current status
   */
  getStatus() {
    return {
      activeContexts: this.activeContexts,
      maxContexts: this.maxContexts,
      queueLength: this.queue.length,
      registeredInstances: Array.from(this.instances.keys()),
    };
  }

  /**
   * Force release all contexts
   */
  disposeAll() {
    console.log('[WebGLManager] Disposing all contexts...');
    
    this.instances.forEach((renderer, id) => {
      try {
        if (renderer && renderer.dispose) {
          renderer.dispose();
        }
      } catch (e) {
        console.warn(`[WebGLManager] Error disposing "${id}":`, e);
      }
    });
    
    this.instances.clear();
    this.activeContexts = 0;
    this.queue = [];
    
    console.log('[WebGLManager] All contexts disposed');
  }

  /**
   * Update maximum contexts (useful for responsive behavior)
   */
  setMaxContexts(max) {
    this.maxContexts = Math.max(1, Math.min(max, 16)); // Clamp between 1-16
    console.log(`[WebGLManager] Max contexts updated to ${this.maxContexts}`);
    this.processQueue();
  }
}

// Singleton instance
export const webGLManager = new WebGLManager();

// Export for debugging
if (typeof window !== 'undefined') {
  window.__webGLManager = webGLManager;
}
