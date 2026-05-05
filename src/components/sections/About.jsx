import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Sparkles, Rocket, Compass, Target, 
  ShieldCheck, ChevronRight, Zap, Coffee, 
  Terminal, Layers, Cpu, Globe, ArrowUpRight
} from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');

  const stats = [
    { label: 'Technical Proficiency', value: 'Level 5', icon: ShieldCheck },
    { label: 'Current Focus', value: 'Full-Stack / 3D', icon: Zap },
    { label: 'Location', value: 'Kigali, Rwanda', icon: Globe }
  ];

  const pillars = [
    { 
      title: 'Performance First', 
      desc: 'Optimizing for 2.5s LCP. Speed isn’t a feature; it’s a foundation.',
      color: '#f97316' 
    },
    { 
      title: 'Scalable Architecture', 
      desc: 'Building with MERN and API-first design for future-proof growth.',
      color: '#3b82f6' 
    },
    { 
      title: 'Visual Storytelling', 
      desc: 'Bridging Figma precision with Three.js & Framer Motion magic.',
      color: '#10b981' 
    }
  ];

  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden bg-[#0c0b0a] text-stone-100">
      {/* Background Orbital Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Section Header --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">Identity 2026</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85]">
              CRAFTING THE <br />
              <span className="text-orange-500 italic">NEXT-GEN</span> WEB.
            </h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hidden md:block text-right max-w-[300px]"
          >
            <p className="text-stone-500 text-sm font-medium leading-relaxed">
              Based in Rwanda, building worldwide. Specializing in the intersection of robust backend logic and immersive frontend motion.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* --- LEFT: The Interactive Dashboard --- */}
          <div className="lg:col-span-5 space-y-6">
            <div className="group relative aspect-square rounded-[2.5rem] overflow-hidden border border-white/5 bg-stone-900/50 backdrop-blur-sm p-2">
              <img 
                src="/wit.png" 
                alt="Witness Fabrice" 
                className="w-full h-full object-cover rounded-[2rem] grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a] via-transparent to-transparent opacity-60" />
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-8 right-8 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white">
                    <Terminal size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-stone-400">Status</p>
                    <p className="text-xs font-bold text-white tracking-wide">Building "Student Manager v2"</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center group hover:bg-orange-500/5 transition-colors">
                  <stat.icon size={16} className="mx-auto mb-2 text-stone-500 group-hover:text-orange-500 transition-colors" />
                  <p className="text-[9px] font-black uppercase tracking-tighter text-stone-500">{stat.label}</p>
                  <p className="text-[11px] font-bold text-stone-200">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: Content Strategy --- */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Tabbed Bio Switcher */}
            <div className="space-y-6">
              <div className="flex gap-8 border-b border-white/5">
                {['story', 'philosophy', 'vision'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${
                      activeTab === tab ? 'text-orange-500' : 'text-stone-600 hover:text-stone-400'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[160px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'story' && (
                    <motion.div 
                      key="story" 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4 text-stone-400 leading-relaxed text-sm"
                    >
                      <p>
                        I am a <span className="text-white font-bold">Full-Stack Developer</span> and Level 5 Software Student, bridging the gap between complex logic and fluid user interfaces. My journey began with a curiosity for systems, leading me to master the <span className="text-orange-500 underline decoration-orange-500/30 underline-offset-4">React, Node.js, and MySQL</span> stack.
                      </p>
                      <p>
                        Beyond the syntax, I focus on "Project Archaeology"—the process of digging deep into a problem's roots before writing a single line of code. Whether it's an RPG interactive map or a School Management System, my goal is to create software that feels human.
                      </p>
                    </motion.div>
                  )}
                  {/* ... other tabs follow same pattern ... */}
                </AnimatePresence>
              </div>
            </div>

            {/* Pillar Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {pillars.map((pillar, i) => (
                <div key={i} className="group relative p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-orange-500/20 transition-all">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: `${pillar.color}20`, color: pillar.color }}
                  >
                    <Layers size={16} />
                  </div>
                  <h4 className="text-xs font-black uppercase mb-2 tracking-widest">{pillar.title}</h4>
                  <p className="text-[11px] leading-relaxed text-stone-500 group-hover:text-stone-300 transition-colors">{pillar.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA / Contact Strip */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-1 rounded-full bg-white/[0.03] border border-white/5 pr-6 group">
              <div className="flex -space-x-3 p-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0c0b0a] bg-stone-800 flex items-center justify-center text-[10px] font-bold">
                    {i === 3 ? <Sparkles size={14} className="text-orange-500" /> : <Coffee size={14} />}
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold text-stone-400 flex-1">Available for new collaborations and full-stack projects.</p>
              <a href="#contact" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-500 group-hover:translate-x-1 transition-transform">
                Let's Talk <ArrowUpRight size={14} />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
