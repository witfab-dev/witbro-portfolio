import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Coffee, Mail, MapPin, Globe, ArrowUp, Clock, 
  Github, Linkedin, Twitter, Instagram, Code2, 
  Copy, CheckCircle2, Terminal, Cpu, Activity
} from 'lucide-react';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copied, setCopied] = useState(false);
  const [systemLoad, setSystemLoad] = useState(24);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const loadTimer = setInterval(() => {
      setSystemLoad(Math.floor(Math.random() * (32 - 18 + 1) + 18));
    }, 3000);
    return () => { clearInterval(timer); clearInterval(loadTimer); };
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('witnessfabrice@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/witbri1', icon: Github, color: 'hover:bg-[#24292e]' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/witnessfabrice', icon: Linkedin, color: 'hover:bg-[#0A66C2]' },
    { name: 'Twitter', url: 'https://twitter.com/witnessfabrice', icon: Twitter, color: 'hover:bg-[#1DA1F2]' },
    { name: 'Instagram', url: 'https://instagram.com/witbri1', icon: Instagram, color: 'hover:bg-[#E4405F]' }
  ];

  return (
    <footer className="relative bg-[#030712] text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          
          {/* BRAND COLUMN */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <motion.h2 
                className="text-5xl font-black tracking-tighter mb-6 italic flex items-center gap-2"
                whileHover={{ skewX: -10 }}
              >
                WITNESS<span className="text-blue-500 animate-pulse">_</span>OS
              </motion.h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Building the future of the web from the heart of <span className="text-white border-b border-blue-500/50 pb-1">Rwanda</span>. 
                Focused on immersive architecture and high-performance ecosystems.
              </p>
            </div>

            {/* NEUMORPHIC CONTACT BOX */}
            <div className="relative group max-w-sm">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-gray-900/80 backdrop-blur-xl p-5 rounded-2xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <Mail size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Encrypted Mail</p>
                    <p className="text-sm font-mono text-blue-100">witnessfabrice@gmail.com</p>
                  </div>
                </div>
                <button 
                  onClick={copyEmail}
                  className="p-2 hover:bg-white/5 rounded-lg transition-all active:scale-90"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <CheckCircle2 size={20} className="text-green-400" />
                      </motion.div>
                    ) : (
                      <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Copy size={20} className="text-gray-400 hover:text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </motion.div>

          {/* SYSTEM STATUS & NAVIGATION COLUMN */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 grid md:grid-cols-2 gap-12"
          >
      

            {/* QUICK LINKS GRID */}
            <div className="grid grid-cols-2 gap-4 text-sm font-medium">
               {['About', 'Projects', 'Vision', 'Mission', 'News', 'Contact'].map((link) => (
                 <motion.a 
                   key={link}
                   href={`#${link.toLowerCase()}`}
                   whileHover={{ x: 5, color: '#3b82f6' }}
                   className="text-gray-500 flex items-center gap-2 group"
                 >
                   <div className="w-1 h-1 bg-gray-800 rounded-full group-hover:bg-blue-500 transition-colors" />
                   {link}
                 </motion.a>
               ))}
            </div>
          </motion.div>
        </div>

        {/* BOTTOM UTILITY BAR */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          
          {/* SOCIALS WITH MAGNETIC FEEL */}
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-gray-400 border border-white/5 bg-white/[0.03] transition-all duration-300 ${link.color} hover:text-white hover:border-white/20`}
              >
                <link.icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* COPYRIGHT & LOCATION */}
          <div className="flex flex-col items-center gap-2">
             <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.3em] text-gray-600 uppercase">
               <span>Kigali</span>
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
               <span>Rwanda</span>
             </div>
             <p className="text-[11px] font-mono text-gray-500">
               ©{new Date().getFullYear()} <span className="text-gray-400">DESIGNED BY WITDEV</span>
             </p>
          </div>

          {/* SCROLL TO TOP */}
          <motion.button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -5 }}
            className="group flex flex-col items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500 transition-colors">
              <ArrowUp size={18} className="text-gray-500 group-hover:text-blue-500 transition-all group-hover:-translate-y-1" />
            </div>
            <span className="text-[10px] font-bold tracking-widest text-gray-600 uppercase group-hover:text-white transition-colors">Execute_Top</span>
          </motion.button>
        </div>
      </div>

      {/* FOOTER WAVE DECORATION */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
    </footer>
  );
};

export default Footer;