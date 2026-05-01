import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

// Custom SVG Icons built into the component
const Icons = {
  Mic: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
      <path d="M19 10v1a7 7 0 0 1-14 0v-1"/>
      <line x1="12" y1="19" x2="12" y2="22"/>
    </svg>
  ),
  
  Volume2: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 5 6 9H2v6h4l5 4V5Z"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  ),
  
  VolumeX: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 5 6 9H2v6h4l5 4V5Z"/>
      <line x1="23" y1="9" x2="17" y2="15"/>
      <line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  ),
  
  Terminal: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="4 17 10 11 4 5"/>
      <line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  ),
  
  Sparkles: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  ),
  
  Brain: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08A3 3 0 0 1 3 14.5a3.5 3.5 0 0 1 6.5-1.5"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08A3 3 0 0 0 21 14.5a3.5 3.5 0 0 0-6.5-1.5"/>
    </svg>
  ),
  
  Mail: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  
  Command: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>
    </svg>
  ),
  
  ChevronRight: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  ),
  
  RotateCcw: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  ),
  
  CheckCircle: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  
  Clock: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  
  Zap: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  
  User: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  
  Briefcase: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="14" x="2" y="7" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <circle cx="12" cy="14" r="1"/>
    </svg>
  ),
  
  MapPin: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  
  Send: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m22 2-7 20-4-9-9-4Z"/>
      <path d="M22 2 11 13"/>
    </svg>
  ),
  
  Search: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  
  Code: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  
  Phone: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  
  Layers: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
      <path d="m22 12.5-8.58 3.91a2 2 0 0 1-1.66 0L3.17 12.5"/>
      <path d="m22 17-8.58 3.91a2 2 0 0 1-1.66 0L3.17 17"/>
    </svg>
  ),
  
  Wand: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 4V2m0 2v2m0-2h2m-2 0h-2"/>
      <path d="m10.037 8.963-8.47 8.47a1.95 1.95 0 0 0 0 2.76l.24.24a1.95 1.95 0 0 0 2.76 0l8.47-8.471"/>
      <path d="M14 5.5 18.5 10"/>
    </svg>
  ),
  
  X: ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6 6 18"/>
      <path d="m6 6 12 12"/>
    </svg>
  ),
};

const VoiceAssistant = ({ autoOpen, onClose }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  // Enhanced state management
  const [state, setState] = useState({
    isSpeaking: false,
    isListening: false,
    displayText: "",
    isMuted: false,
    searchQuery: "",
    commandHistory: [],
    suggestions: [],
    isProcessing: false,
    voiceMode: 'professional',
    confidence: 0,
    showCommandPalette: false,
    activePanel: 'main',
    conversationContext: [],
    personalityMode: 'helpful',
    typingSpeed: 20,
    glitchEffect: false,
    particleBurst: false,
    lastCommand: null,
  });

  const recognitionRef = useRef(null);
  const commandInputRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Update state helper
  const updateState = useCallback((updates) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Witbri AI Core Knowledge Base
  const knowledgeBase = useMemo(() => ({
    personal: {
      name: "Witness Fabrice",
      title: "Full-Stack Architect & Creative Technologist",
      email: "witnessfabrice@gmail.com",
      phone: "+250 783568337",
      location: "Kirehe, Rwanda",
      tagline: "Building world-class digital solutions from East Africa",
    },
    expertise: {
      frontend: {
        title: "Frontend Mastery",
        skills: ["React Ecosystem", "Vue.js", "Next.js", "Three.js", "WebGL", "Framer Motion"],
        level: "Advanced",
        yearsOfExperience: 4
      },
      backend: {
        title: "Backend Engineering",
        skills: ["Node.js", "Python", "Express", "Django", "GraphQL", "REST APIs"],
        level: "Advanced",
        yearsOfExperience: 3
      },
      database: {
        title: "Data Architecture",
        skills: ["MongoDB", "PostgreSQL", "Redis", "Firebase", "Prisma"],
        level: "Intermediate",
        yearsOfExperience: 3
      },
      devops: {
        title: "DevOps & Cloud",
        skills: ["Docker", "AWS", "CI/CD", "Nginx", "Linux"],
        level: "Intermediate",
        yearsOfExperience: 2
      }
    },
    projects: [
      {
        name: "Market-Kigali",
        category: "E-commerce",
        tech: ["React", "Node.js", "Stripe", "MongoDB"],
        status: "Live",
        impact: "500+ active users",
        description: "Full-featured marketplace with real-time inventory management"
      },
      {
        name: "PSSMS",
        category: "Smart Systems",
        tech: ["Vue.js", "Python", "IoT", "PostgreSQL"],
        status: "Development",
        impact: "Manages 200+ parking slots",
        description: "Intelligent parking management with automated billing"
      },
      {
        name: "KATSS Platform",
        category: "Education",
        tech: ["React", "Express", "MongoDB"],
        status: "Live",
        impact: "1000+ students served",
        description: "Digital learning management system with interactive features"
      },
      {
        name: "Rwanda Explorer",
        category: "Gaming",
        tech: ["Three.js", "WebGL", "React"],
        status: "Beta",
        impact: "4.8/5 user rating",
        description: "3D immersive educational game about Rwanda"
      }
    ],
    education: {
      institution: "Kirehe Technical Secondary School (KATSS)",
      achievements: ["Distinction Graduate", "Best Tech Project", "Leadership Excellence"]
    }
  }), []);

  // Witbri AI Response Templates
  const responseTemplates = useMemo(() => ({
    greeting: (time) => {
      const greetings = {
        morning: [
          "Good morning! Witbri AI neural networks initialized. Ready to showcase Witness's digital universe.",
          "Morning! Systems calibrated and ready. Explore Witness Fabrice's portfolio with me."
        ],
        afternoon: [
          "Good afternoon! Witbri AI at your service. Let me guide you through Witness's innovations.",
          "Afternoon! All systems optimal. Ready to explore Witness's tech ecosystem."
        ],
        evening: [
          "Good evening! Witbri AI evening protocols active. Discover Witness's projects and expertise.",
          "Evening! Neural pathways illuminated. Let's explore Witness's portfolio together."
        ]
      };
      return greetings[time][Math.floor(Math.random() * greetings[time].length)];
    },
    skills: [
      "Witness masters a comprehensive tech ecosystem! Frontend sorcery with {frontend}, backend engineering with {backend}, and database architecture with {database}. What would you like to deep-dive into?",
      "Unlocking tech arsenal: {frontend} for stunning UIs, {backend} for robust backends, and {database} for data mastery. Plus DevOps expertise! Which stack interests you?"
    ],
    projects: [
      "Innovation portfolio loaded! Featuring {count} groundbreaking projects including {featured}. Each one solves real-world problems with elegant code. Which project should we explore?",
      "Project matrix accessed: {count} live innovations powered by cutting-edge tech. {featured} leads the pack with {impact}. Want technical details on any?"
    ],
    contact: [
      "Connection protocols engaged! Reach Witness at {email} or {phone}. I can also help draft a message or schedule a call. What's your preferred channel?",
      "Opening secure communication channels. Direct line: {phone}, Digital portal: {email}. Ready when you are to start a conversation!"
    ]
  }), []);

  // Dynamic typing effect with glitch
  const typewriterEffect = useCallback((text, callback) => {
    let i = 0;
    updateState({ displayText: "" });
    
    const interval = setInterval(() => {
      if (i <= text.length) {
        let char = text.slice(0, i);
        // Random glitch effect
        if (Math.random() > 0.95) {
          char += String.fromCharCode(Math.random() * 26 + 97);
        }
        updateState({ displayText: char });
        i++;
      } else {
        clearInterval(interval);
        callback?.();
      }
    }, state.typingSpeed);
    
    return () => clearInterval(interval);
  }, [state.typingSpeed, updateState]);

  // Advanced TTS with personality
  const speak = useCallback((text, emotion = 'neutral', context = 'general') => {
    if (state.isMuted) return;
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synthRef.current.getVoices();
    
    // Select voice based on context
    const voice = context === 'technical' 
      ? voices.find(v => v.name.includes('Google') && v.name.includes('Male'))
      : voices.find(v => v.name.includes('Samantha') || v.name.includes('Female'));
    
    if (voice) utterance.voice = voice;
    
    // Personality-based adjustments
    const profiles = {
      professional: { rate: 1.0, pitch: 1.0 },
      helpful: { rate: 1.05, pitch: 1.05 },
      enthusiastic: { rate: 1.1, pitch: 1.1 },
      technical: { rate: 0.95, pitch: 0.95 }
    };
    
    const profile = profiles[state.personalityMode] || profiles.helpful;
    utterance.rate = profile.rate;
    utterance.pitch = emotion === 'excited' ? profile.pitch * 1.1 : profile.pitch;
    
    utterance.onstart = () => updateState({ isSpeaking: true });
    utterance.onend = () => updateState({ isSpeaking: false });
    synthRef.current.speak(utterance);
    
    return typewriterEffect(text);
  }, [state.isMuted, state.personalityMode, typewriterEffect, updateState]);

  // Witbri AI Core Command Processor
  const processCommand = useCallback(async (input) => {
    updateState({ isProcessing: true, lastCommand: input });
    
    const processedInput = input.toLowerCase().trim();
    
    // Add to conversation context
    updateState({ 
      commandHistory: prev => [...prev.slice(-5), { 
        cmd: processedInput, 
        timestamp: new Date().toISOString(),
        context: state.activePanel 
      }],
      conversationContext: prev => [...prev, { 
        role: 'user', 
        content: processedInput 
      }]
    });
    
    // Intelligent routing with NLP-like processing
    const routes = {
      greeting: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
      skills: ['skill', 'tech', 'stack', 'technology', 'expertise', 'know', 'code', 'framework'],
      projects: ['project', 'portfolio', 'work', 'build', 'created', 'developed', 'showcase'],
      contact: ['contact', 'email', 'phone', 'hire', 'reach', 'connect', 'message'],
      experience: ['experience', 'work', 'career', 'background', 'history', 'past'],
      education: ['education', 'school', 'study', 'graduate', 'certificate', 'training'],
      location: ['location', 'where', 'based', 'country', 'city', 'address'],
      fun: ['joke', 'fun', 'hobby', 'interest', 'passion', 'like', 'enjoy']
    };
    
    // Find best matching route
    let bestRoute = { route: 'default', score: 0 };
    Object.entries(routes).forEach(([route, keywords]) => {
      const score = keywords.reduce((acc, kw) => 
        acc + (processedInput.includes(kw) ? kw.length : 0), 0);
      if (score > bestRoute.score) bestRoute = { route, score };
    });
    
    let response = '';
    let action = null;
    
    switch(bestRoute.route) {
      case 'skills':
        action = () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        const topSkills = [
          knowledgeBase.expertise.frontend.skills.slice(0, 3).join(', '),
          knowledgeBase.expertise.backend.skills.slice(0, 3).join(', ')
        ];
        response = `Witbri AI Tech Matrix: Frontend mastery includes ${topSkills[0]}. Backend strength in ${topSkills[1]}. Plus database architecture, DevOps, and cloud expertise. What would you like to explore deeper?`;
        break;
        
      case 'projects':
        action = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        const featured = knowledgeBase.projects.slice(0, 3);
        response = `Portfolio loaded! ${knowledgeBase.projects.length} innovations powered by cutting-edge tech. Highlights: ${featured.map(p => `${p.name} - ${p.impact}`).join('; ')}. Which project fascinates you?`;
        break;
        
      case 'contact':
        action = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        response = `Communication nexus established! Direct line: ${knowledgeBase.personal.phone}. Encrypted email: ${knowledgeBase.personal.email}. I can facilitate immediate connection or draft a message. Your choice!`;
        break;
        
      case 'greeting':
        response = `Witbri AI greeting protocols active! I'm your guide to Witness Fabrice's digital universe. How can I enhance your exploration today?`;
        break;
        
      default:
        // Smart default with context
        const suggestions = generateSmartSuggestions(processedInput);
        updateState({ suggestions });
        response = `I processed "{${input}}" but can help better with these suggestions. Or try the quick actions below!`;
    }
    
    updateState({ 
      conversationContext: prev => [...prev, { 
        role: 'assistant', 
        content: response 
      }],
      activePanel: bestRoute.route 
    });
    
    speak(response, 'enthusiastic', bestRoute.route === 'skills' ? 'technical' : 'general');
    action?.();
    
    setTimeout(() => updateState({ isProcessing: false, searchQuery: "" }), 1000);
  }, [knowledgeBase, speak, updateState]);

  // Generate contextual smart suggestions
  const generateSmartSuggestions = useCallback((input) => {
    const suggestions = [
      { text: "Show me Witness's tech stack", icon: 'Code', route: 'skills' },
      { text: "Explore featured projects", icon: 'Zap', route: 'projects' },
      { text: "Connect with Witness", icon: 'Mail', route: 'contact' },
      { text: "What's his background?", icon: 'User', route: 'education' },
      { text: "Where is he based?", icon: 'MapPin', route: 'location' },
      { text: "View work experience", icon: 'Briefcase', route: 'experience' }
    ];
    
    return suggestions
      .filter(s => s.text !== input)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }, []);

  // Advanced Speech Recognition
  const toggleListening = useCallback(() => {
    if (state.isListening) {
      recognitionRef.current?.stop();
      updateState({ isListening: false });
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      speak('Voice input not supported. Please use text commands.');
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 3;
    
    recognition.onstart = () => {
      updateState({ isListening: true, displayText: "Witbri AI listening... 🎯" });
      // Trigger particle effect
      updateState({ particleBurst: true });
      setTimeout(() => updateState({ particleBurst: false }), 2000);
    };
    
    recognition.onresult = (event) => {
      let transcript = '';
      let confidence = 0;
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
        confidence = event.results[i][0].confidence;
      }
      
      updateState({ 
        searchQuery: transcript,
        confidence: Math.round(confidence * 100)
      });
      
      if (event.results[event.results.length - 1].isFinal) {
        processCommand(transcript);
      }
    };
    
    recognition.onerror = (event) => {
      speak(`Witbri AI audio glitch: ${event.error}. Let's try text input instead.`);
      updateState({ isListening: false });
    };
    
    recognition.onend = () => updateState({ isListening: false });
    
    recognitionRef.current = recognition;
    recognition.start();
  }, [state.isListening, processCommand, speak, updateState]);

  // Quick actions with enhanced functionality
  const quickActions = useMemo(() => [
    { 
      icon: 'User', 
      label: 'Profile',
      desc: 'Bio & Background',
      action: () => processCommand("who is witness fabrice"),
      hotkey: '1'
    },
    { 
      icon: 'Zap', 
      label: 'Projects',
      desc: 'Innovation Vault',
      action: () => processCommand("show me projects"),
      hotkey: '2'
    },
    { 
      icon: 'Code', 
      label: 'Tech Stack',
      desc: 'Skills Matrix',
      action: () => processCommand("what technologies"),
      hotkey: '3'
    },
    { 
      icon: 'Mail', 
      label: 'Contact',
      desc: 'Get in Touch',
      action: () => processCommand("how to contact"),
      hotkey: '4'
    },
    { 
      icon: 'Briefcase', 
      label: 'Experience',
      desc: 'Work History',
      action: () => processCommand("work experience"),
      hotkey: '5'
    },
    { 
      icon: 'MapPin', 
      label: 'Location',
      desc: 'Where Based',
      action: () => processCommand("where is witness"),
      hotkey: '6'
    }
  ], [processCommand]);

  // Audio visualizer effect
  useEffect(() => {
    if (!state.isSpeaking && !state.isListening) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const bars = 48;
      const barWidth = canvas.width / bars;
      
      for (let i = 0; i < bars; i++) {
        const frequency = state.isSpeaking ? 
          Math.sin(Date.now() * 0.003 + i * 0.3) * 0.5 + 0.5 :
          Math.random() * (state.isListening ? 1 : 0.3);
        
        const height = frequency * canvas.height * 0.8;
        const x = i * barWidth;
        const y = (canvas.height - height) / 2;
        
        const gradient = ctx.createLinearGradient(0, y, 0, y + height);
        gradient.addColorStop(0, state.isListening ? '#ef4444' : '#3b82f6');
        gradient.addColorStop(0.5, '#8b5cf6');
        gradient.addColorStop(1, '#06b6d4');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x + 1, y, barWidth - 2, height);
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [state.isSpeaking, state.isListening]);

  // Welcome message
  useEffect(() => {
    if (autoOpen) {
      const hour = new Date().getHours();
      const timePeriod = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
      
      const timer = setTimeout(() => {
        speak(responseTemplates.greeting(timePeriod), 'excited');
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [autoOpen, speak, responseTemplates]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        updateState({ showCommandPalette: prev => !prev });
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        updateState({ isMuted: prev => !prev });
      }
      if (e.key === 'Escape') {
        updateState({ showCommandPalette: false });
      }
      // Quick action hotkeys
      if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        const index = parseInt(e.key) - 1;
        quickActions[index]?.action();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [quickActions, updateState]);

  return (
    <AnimatePresence>
      {autoOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
          className="fixed bottom-8 right-6 z-[100] w-full max-w-[500px] px-4 font-sans"
        >
          {/* Particle burst effect */}
          <AnimatePresence>
            {state.particleBurst && (
              <>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      opacity: 1, 
                      scale: 0,
                      x: 0, 
                      y: 0 
                    }}
                    animate={{ 
                      opacity: 0, 
                      scale: 2,
                      x: Math.cos(i * 30 * Math.PI / 180) * 100,
                      y: Math.sin(i * 30 * Math.PI / 180) * 100
                    }}
                    transition={{ duration: 1 }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-blue-500"
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Main Container with holographic border */}
          <div className={`relative p-[2px] rounded-[2rem] overflow-hidden ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 animate-gradient'
              : 'bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 animate-gradient'
          }`}>
            <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-shimmer`} />
            
            {/* Main Interface */}
            <div className={`relative rounded-[2rem] p-6 ${
              theme === 'dark' 
                ? 'bg-slate-900/95 backdrop-blur-2xl'
                : 'bg-white/95 backdrop-blur-2xl'
            }`}>
              
              {/* Header with Witbri AI branding */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {/* Witbri AI Logo */}
                  <div className="relative">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 180, 270, 360]
                      }}
                      transition={{ duration: 8, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-75"
                    />
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center border-2 border-white/20">
                      <Icons.Brain size={24} className="text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <span className={`${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        Witbri AI
                      </span>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Icons.Sparkles size={14} className="text-blue-400" />
                      </motion.div>
                    </h3>
                    <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">
                      Neural OS v4.0 • {state.voiceMode === 'technical' ? 'TECH' : 'PRO'}
                    </p>
                  </div>
                </div>

                {/* Control Panel */}
                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateState({ showCommandPalette: !state.showCommandPalette })}
                    className="p-2 rounded-xl hover:bg-white/10 transition-all relative group"
                    title="Command Palette (Ctrl+K)"
                  >
                    <Icons.Command size={16} />
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Ctrl+K
                    </span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateState({ isMuted: !state.isMuted })}
                    className="p-2 rounded-xl hover:bg-white/10 transition-all relative group"
                    title="Toggle Mute (Ctrl+M)"
                  >
                    {state.isMuted ? <Icons.VolumeX size={16} /> : <Icons.Volume2 size={16} />}
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Ctrl+M
                    </span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2 rounded-xl hover:bg-red-500/20 hover:text-red-500 transition-all"
                  >
                    <Icons.X size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Witbri AI Terminal Display */}
              <div className={`relative rounded-2xl p-5 mb-4 min-h-[140px] border ${
                theme === 'dark' 
                  ? 'bg-black/40 border-white/5'
                  : 'bg-slate-50 border-slate-200'
              }`}>
                {/* Terminal header */}
                <div className="flex items-center gap-2 mb-3 opacity-50">
                  <Icons.Terminal size={12} className="text-blue-400" />
                  <span className="text-[10px] font-mono">witbri@neural:~$</span>
                  
                  {/* Processing indicator */}
                  {state.isProcessing && (
                    <motion.div
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="ml-auto flex items-center gap-1 text-[8px] text-yellow-400"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Icons.RotateCcw size={8} />
                      </motion.div>
                      Processing
                    </motion.div>
                  )}
                </div>
                
                {/* Command history mini */}
                {state.commandHistory.length > 0 && (
                  <div className="mb-2 flex gap-2 overflow-x-auto">
                    {state.commandHistory.map((item, i) => (
                      <span key={i} className="text-[8px] font-mono text-blue-400/40 whitespace-nowrap">
                        {item.cmd.slice(0, 20)}...
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Main display */}
                <div className="relative">
                  <p className={`text-[13px] font-mono leading-relaxed ${
                    theme === 'dark' ? 'text-blue-100' : 'text-slate-700'
                  }`}>
                    <span className="text-blue-500 mr-2">❯</span>
                    {state.displayText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-2.5 h-4 bg-gradient-to-r from-blue-500 to-purple-500 ml-1"
                    />
                  </p>
                  
                  {/* Suggestions popup */}
                  {state.suggestions.length > 0 && !state.isProcessing && (
                    <div className="absolute top-full left-0 right-0 mt-2 space-y-1">
                      {state.suggestions.map((suggestion, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          onClick={() => processCommand(suggestion.text)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-[11px] transition-all ${
                            theme === 'dark'
                              ? 'bg-white/5 hover:bg-blue-500/20 text-slate-400'
                              : 'bg-slate-100 hover:bg-blue-50 text-slate-600'
                          }`}
                        >
                          {suggestion.text}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Witbri AI Audio Visualizer */}
              <canvas
                ref={canvasRef}
                width={400}
                height={60}
                className={`w-full h-12 mb-4 rounded-xl ${
                  theme === 'dark' ? 'bg-black/20' : 'bg-slate-100'
                }`}
              />

              {/* Confidence Meter */}
              <AnimatePresence>
                {state.isListening && state.confidence > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4"
                  >
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="text-blue-400">Neural Confidence</span>
                      <span className={`font-bold ${
                        state.confidence > 80 ? 'text-green-400' :
                        state.confidence > 50 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {state.confidence}%
                      </span>
                    </div>
                    <div className={`h-1 rounded-full bg-white/10 overflow-hidden`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${state.confidence}%` }}
                        className={`h-full rounded-full ${
                          state.confidence > 80 ? 'bg-gradient-to-r from-green-400 to-green-300' :
                          state.confidence > 50 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                          'bg-gradient-to-r from-red-400 to-red-300'
                        }`}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Command Input Bar */}
              <div className="relative mb-4">
                <input
                  ref={commandInputRef}
                  type="text"
                  placeholder={
                    state.isListening 
                      ? "Witbri AI processing your voice..." 
                      : "Ask Witbri AI anything about Witness..."
                  }
                  value={state.searchQuery}
                  onChange={(e) => {
                    updateState({ searchQuery: e.target.value });
                    if (e.target.value.length > 2) {
                      updateState({ 
                        suggestions: generateSmartSuggestions(e.target.value) 
                      });
                    } else {
                      updateState({ suggestions: [] });
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && state.searchQuery) {
                      processCommand(state.searchQuery);
                    }
                    if (e.key === 'Escape') {
                      updateState({ showCommandPalette: false });
                    }
                  }}
                  className={`w-full rounded-2xl py-4 pl-5 pr-12 text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/30'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500/30'
                  }`}
                />
                
                {/* Voice/Send button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleListening}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all ${
                    state.isListening
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/20'
                      : state.isProcessing
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/20'
                  }`}
                >
                  {state.isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Icons.RotateCcw size={18} />
                    </motion.div>
                  ) : state.isListening ? (
                    <Icons.Mic size={18} className="animate-pulse" />
                  ) : (
                    <Icons.Mic size={18} />
                  )}
                </motion.button>
              </div>

              {/* Witbri AI Quick Action Grid */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {quickActions.map((action, i) => {
                  const QuickIcon = Icons[action.icon] || Icons.Command;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={action.action}
                      className={`relative flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl text-xs transition-all group ${
                        theme === 'dark'
                          ? 'bg-white/5 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/5 border border-white/5 hover:border-blue-500/20'
                          : 'bg-slate-50 hover:bg-blue-50 hover:shadow-lg border border-slate-100 hover:border-blue-200'
                      }`}
                    >
                      <QuickIcon size={18} className="text-blue-500" />
                      <span className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        {action.label}
                      </span>
                      <span className="text-[9px] opacity-50">{action.desc}</span>

                      {/* Hotkey indicator */}
                      <span className="absolute top-1 right-1 text-[8px] opacity-0 group-hover:opacity-50 transition-opacity">
                        ⌘{action.hotkey}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Witbri AI Status Footer */}
              <div className="flex items-center justify-between text-[9px] opacity-40 font-mono">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    state.isListening ? 'bg-red-500 animate-pulse' :
                    state.isSpeaking ? 'bg-blue-500 animate-pulse' :
                    'bg-green-500'
                  }`} />
                  <span>
                    {state.isListening ? 'Listening' : 
                     state.isSpeaking ? 'Speaking' : 
                     'Ready'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span>⌘K Palet</span>
                  <span>⌘M Mute</span>
                  <span>⌘1-6 Quick</span>
                </div>
                <span>Witbri AI</span>
              </div>
            </div>
          </div>

          {/* Floating Command Palette */}
          <AnimatePresence>
            {state.showCommandPalette && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className={`absolute bottom-full left-4 right-4 mb-4 rounded-2xl p-2 shadow-2xl border ${
                  theme === 'dark'
                    ? 'bg-slate-900/98 border-white/10'
                    : 'bg-white/98 border-slate-200'
                }`}
              >
                <div className="p-3 border-b border-white/5">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Icons.Command size={16} className="text-blue-400" />
                    Witbri AI Command Palette
                  </div>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {quickActions.map((action, i) => {
                    const QuickIcon = Icons[action.icon] || Icons.Command;
                    return (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => {
                          action.action();
                          updateState({ showCommandPalette: false });
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm transition-all ${
                          theme === 'dark'
                            ? 'hover:bg-white/5 text-slate-300'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <QuickIcon size={18} className="text-blue-500" />
                        <div className="text-left">
                          <div className="font-medium">{action.label}</div>
                          <div className="text-[10px] opacity-50">{action.desc}</div>
                        </div>
                        <span className="ml-auto text-[10px] opacity-30">⌘{action.hotkey}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceAssistant;