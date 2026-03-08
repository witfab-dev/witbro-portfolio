import React, { useState, useEffect } from 'react';
import { 
  Heart, Coffee, Mail, MapPin, Globe, ExternalLink, Github, Linkedin, 
  Twitter, Instagram, Code2, ArrowUp, Clock, Users, Zap, ChevronRight, 
  Sparkles, Shield, FileText, Smartphone, Laptop, Cloud, Database, 
  Lock, Copy, CheckCircle2
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(1247);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const visitorTimer = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);
    return () => {
      clearInterval(timer);
      clearInterval(visitorTimer);
    };
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('witnessfabrice@example.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/witbri1', icon: Github, color: 'hover:text-[#F0F6FC]' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/witnessfabrice', icon: Linkedin, color: 'hover:text-[#0A66C2]' },
    { name: 'Twitter', url: 'https://twitter.com/witnessfabrice', icon: Twitter, color: 'hover:text-[#1DA1F2]' },
    { name: 'Instagram', url: 'https://instagram.com/witbri1', icon: Instagram, color: 'hover:text-[#E4405F]' }
  ];

  const services = [
    { name: 'Web Architecture', icon: Laptop, tech: 'Next.js • Node' },
    { name: 'Mobile Solutions', icon: Smartphone, tech: 'React Native' },
    { name: 'Cloud & DevOps', icon: Cloud, tech: 'AWS • Docker' },
  ];

  return (
    <footer className="relative bg-[#030712] text-white pt-20 pb-10 overflow-hidden">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Top Section: Brand & Contact Card */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-4xl font-black tracking-tighter mb-4 italic">
                WITNESS<span className="text-blue-500 text-5xl">.</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                Crafting digital ecosystems where <span className="text-white font-medium">design meets performance</span>. 
                Based in Kigali, shipping worldwide.
              </p>
            </div>

            {/* Innovative Contact Trigger */}
            <div className="relative group max-w-sm">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative flex items-center justify-between bg-gray-900/50 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Project Inquiry</p>
                    <p className="text-sm font-medium">witnessfabrice@email.com</p>
                  </div>
                </div>
                <button onClick={copyEmail} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-400" />}
                </button>
              </div>
            </div>
          </div>

          {/* Service Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group">
                <service.icon className="w-8 h-8 text-blue-500 mb-12 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg mb-1">{service.name}</h3>
                <p className="text-xs text-gray-500 font-mono uppercase">{service.tech}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          <div className="col-span-2 md:col-span-1 p-6 rounded-3xl bg-blue-600 flex flex-col justify-between min-h-[160px] hover:rotate-1 transition-transform">
             <Users className="w-6 h-6 text-white/80" />
             <div>
               <p className="text-4xl font-bold">{visitorCount.toLocaleString()}</p>
               <p className="text-sm text-white/70">Global Visitors</p>
             </div>
          </div>
          
          <div className="p-6 rounded-3xl bg-[#111827] border border-white/5 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full uppercase">CAT</span>
            </div>
            <p className="text-2xl font-mono font-bold">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#111827] border border-white/5 flex flex-col justify-between">
            <Zap className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-2xl font-bold">5+</p>
              <p className="text-xs text-gray-500 uppercase">Deployments</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-600 to-blue-600 flex flex-col justify-between shadow-lg shadow-blue-500/10">
            <p className="text-sm font-medium leading-tight">Available for new opportunities 2026</p>
          </div>
        </div>

        {/* Final Footer Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8 items-center">
             {socialLinks.map((link, i) => (
               <a 
                key={i} 
                href={link.url} 
                target="_blank" 
                className={`text-gray-500 ${link.color} transition-all duration-300 transform hover:-translate-y-1`}
               >
                 <link.icon className="w-5 h-5" />
               </a>
             ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 font-mono tracking-tighter">
            <span>©{new Date().getFullYear()}</span>
            <div className="w-1 h-1 rounded-full bg-gray-800"></div>
            <span>KIGALI, RW</span>
            <div className="w-1 h-1 rounded-full bg-gray-800"></div>
            <span className="flex items-center gap-1">
              BUILT BY WITBRI.DEV
            </span>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
          >
            Top <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
