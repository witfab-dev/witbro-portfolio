import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Code2, Database, Globe, Cpu, 
  Layers, Smartphone, Server, ShieldCheck 
} from 'lucide-react';

const skills = [
  { name: "React", icon: Code2, color: "text-blue-400", size: "text-4xl", x: "-20%", y: "-30%" },
  { name: "Node.js", icon: Server, color: "text-green-500", size: "text-5xl", x: "25%", y: "-20%" },
  { name: "TypeScript", icon: Code2, color: "text-blue-600", size: "text-3xl", x: "-30%", y: "20%" },
  { name: "Tailwind", icon: Layers, color: "text-cyan-400", size: "text-4xl", x: "15%", y: "30%" },
  { name: "MongoDB", icon: Database, color: "text-emerald-600", size: "text-3xl", x: "0%", y: "0%" },
  { name: "Python", icon: Cpu, color: "text-yellow-500", size: "text-4xl", x: "-10%", y: "40%" },
  { name: "Next.js", icon: Globe, color: "text-white", size: "text-5xl", x: "35%", y: "10%" },
  { name: "Cybersecurity", icon: ShieldCheck, color: "text-red-500", size: "text-2xl", x: "-35%", y: "-10%" },
];

const SkillIcon = ({ skill }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      whileHover={{ scale: 1.2, zIndex: 50 }}
      className={`absolute cursor-grab active:cursor-grabbing flex flex-col items-center gap-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]`}
      style={{ left: `calc(50% + ${skill.x})`, top: `calc(50% + ${skill.y})` }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`p-4 glass-panel rounded-2xl border-white/5 bg-white/5 backdrop-blur-md`}
      >
        <skill.icon className={`${skill.size} ${skill.color}`} />
      </motion.div>
      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">
        {skill.name}
      </span>
    </motion.div>
  );
};

const SkillsGalaxy = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="skills" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Galaxy Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
        <motion.div 
          style={{ rotate }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-dashed border-blue-500/10 rounded-full" 
        />
        <motion.div 
          style={{ rotate: rotate, scale: 0.8 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-dashed border-purple-500/10 rounded-full" 
        />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 text-center w-full max-w-6xl">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-gradient inline-block">
            Skills Galaxy
          </h2>
          <p className="text-gray-500 font-mono text-sm mt-4">Interactive Tech Stack Explorer • Drag to Move</p>
        </div>

        {/* The Orbit Container */}
        <div className="relative h-[600px] w-full">
          {skills.map((skill, idx) => (
            <SkillIcon key={idx} skill={skill} />
          ))}
          
          {/* Central Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 glass-panel rounded-full flex items-center justify-center border-blue-500/20">
             <div className="w-16 h-16 bg-blue-500/20 blur-xl absolute rounded-full animate-pulse" />
             <Code2 className="w-10 h-10 text-blue-500" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsGalaxy;