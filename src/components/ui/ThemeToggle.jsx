import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from "../../contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-500 overflow-hidden border ${
        isDark 
          ? 'bg-slate-900 border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]' 
          : 'bg-blue-100 border-slate-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]'
      }`}
      aria-label="Toggle Theme"
    >
      {/* Dynamic Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {isDark ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute inset-0 flex items-center justify-around px-2"
          >
            <div className="w-0.5 h-0.5 bg-white rounded-full animate-pulse" />
            <div className="w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-75" />
            <div className="w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-150" />
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="absolute top-1 right-2 w-2 h-2 bg-yellow-400/20 rounded-full blur-sm" 
          />
        )}
      </div>

      {/* The Sliding Knob */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30
        }}
        className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-md ${
          isDark 
            ? 'bg-gradient-to-tr from-slate-700 to-slate-500 ml-auto' 
            : 'bg-gradient-to-tr from-yellow-400 to-orange-400 ml-0'
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-3.5 h-3.5 text-blue-200 fill-blue-200" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-3.5 h-3.5 text-white fill-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;