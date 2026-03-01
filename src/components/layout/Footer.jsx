import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Coffee, 
  Mail, 
  MapPin, 
  Globe, 
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Code2,
  ArrowUp,
  Clock,
  Users,
  Zap,
  ChevronRight,
  Sparkles,
  Shield,
  FileText,
  Smartphone,
  Laptop,
  Server,
  Database,
  Cloud,
  Lock
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(1247);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const visitorTimer = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(visitorTimer);
    };
  }, []);

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/witbri1', icon: Github, color: 'hover:bg-[#333]' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/witnessfabrice', icon: Linkedin, color: 'hover:bg-[#0077b5]' },
    { name: 'Twitter', url: 'https://twitter.com/witnessfabrice', icon: Twitter, color: 'hover:bg-[#1DA1F2]' },
    { name: 'Dev.to', url: 'https://dev.to/witnessfabrice', icon: Code2, color: 'hover:bg-[#0A0A0A]' },
    { name: 'Instagram', url: 'https://instagram.com/witbri1' ,icon:Instagram, color: 'hover:bg-[violet]'}
  ];

  const quickLinks = [
    { label: t('projects'), href: '#projects', icon: Laptop },
    { label: t('skills'), href: '#skills', icon: Zap },
    { label: t('experience'), href: '#experience', icon: Sparkles },
    { label: t('contact'), href: '#contact', icon: Mail },
  ];

  const services = [
    { name: 'Web Development', icon: Laptop, description: 'React, Next.js, Node.js' },
    { name: 'Mobile Apps', icon: Smartphone, description: 'Flutter, React Native' },
    { name: 'Cloud Architecture', icon: Cloud, description: 'AWS, Docker, Kubernetes' },
    { name: 'Database Design', icon: Database, description: 'MongoDB, PostgreSQL' },
  ];

  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Next.js', icon: '▲' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Witness Fabrice
              </h3>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-4"></div>
            </div>
            <p className="text-sm text-blue-100/80 leading-relaxed">
              Building immersive digital experiences with cutting-edge technologies. 
              Specializing in full-stack development, cloud architecture, and interactive web applications.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center 
                             hover:scale-110 transition-all duration-300 hover:shadow-xl group ${social.color}`}
                    title={social.name}
                  >
                    <Icon className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                  </a>
                );
              })}
            </div>

            {/* Contact Badge */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-100">Available for work</p>
                  <p className="text-xs text-blue-100/60">Open to collaborations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-6 text-blue-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-8 h-[2px] bg-gradient-to-r from-blue-400 to-transparent"></span>
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-blue-100/80 hover:text-white transition-all duration-300 flex items-center gap-3 group"
                    >
                      <Icon className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="flex-1">{link.label}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Resources */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-4 text-blue-200 uppercase tracking-wider flex items-center gap-2">
                <span className="w-8 h-[2px] bg-gradient-to-r from-blue-400 to-transparent"></span>
                Resources
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-blue-100/80 hover:text-white transition-colors flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-blue-100/80 hover:text-white transition-colors flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-blue-100/80 hover:text-white transition-colors flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold mb-6 text-blue-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-8 h-[2px] bg-gradient-to-r from-blue-400 to-transparent"></span>
              Services
            </h4>
            <div className="space-y-4">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.name} className="group">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                        <Icon className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-white mb-1">{service.name}</h5>
                        <p className="text-xs text-blue-100/60">{service.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact & Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold mb-6 text-blue-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-8 h-[2px] bg-gradient-to-r from-blue-400 to-transparent"></span>
              Get in Touch
            </h4>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-blue-200/60 mb-1">Email</p>
                  <a href="mailto:witnessfabrice@example.com" className="text-sm text-white hover:text-blue-300 transition-colors">
                    witnessfabrice@example.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-blue-200/60 mb-1">Location</p>
                  <p className="text-sm text-white">Kigali, Rwanda</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Globe className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-blue-200/60 mb-1">Timezone</p>
                  <p className="text-sm text-white">CAT (UTC+2)</p>
                </div>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <h4 className="text-sm font-semibold mb-4 text-blue-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-8 h-[2px] bg-gradient-to-r from-blue-400 to-transparent"></span>
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-blue-400/50 transition-all cursor-default"
                >
                  <span>{tech.icon}</span>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live Stats Section */}
        <div className="relative mb-12">
          {/* Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 blur-xl"></div>
          
          <div className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-xl bg-white/5">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{visitorCount.toLocaleString()}+</div>
                <p className="text-xs text-blue-200/60">Portfolio Views</p>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-white/5">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
                <p className="text-xs text-blue-200/60">Local Time (CAT)</p>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-white/5">
                <Zap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">15+</div>
                <p className="text-xs text-blue-200/60">Projects Completed</p>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-white/5">
                <Sparkles className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">3+</div>
                <p className="text-xs text-blue-200/60">Years Experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-blue-200/60">
              <span>&copy; {currentYear} Witness Fabrice. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" /> and
                <Coffee className="w-4 h-4 text-amber-400" /> in Kigali
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-blue-200/60 hover:text-white transition-colors flex items-center gap-1 group"
              >
                Privacy <Shield className="w-3 h-3 group-hover:rotate-12 transition-transform" />
              </a>
              <span className="text-white/20">|</span>
              <a
                href="#"
                className="text-sm text-blue-200/60 hover:text-white transition-colors flex items-center gap-1 group"
              >
                Terms <FileText className="w-3 h-3 group-hover:rotate-12 transition-transform" />
              </a>
              <span className="text-white/20">|</span>
              <button
                onClick={scrollToTop}
                className="text-sm text-blue-200/60 hover:text-white transition-colors flex items-center gap-2 group"
              >
                Back to Top 
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation keyframes to your global CSS */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </footer>
  );
};

export default Footer;