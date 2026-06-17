import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, MicOff, Volume2, VolumeX, X, Send,
  User, Zap, Code2, Mail, Briefcase, MapPin,
  Bot, Loader2, RotateCcw, Sparkles, GraduationCap,
  Lightbulb, Handshake, Coffee, Award, Target, Compass,
  BookOpen, Star, Heart, ThumbsUp, Globe, Cpu, Smile,
} from "lucide-react";

// ─── Enhanced Friendly Knowledge Base ──────────────────────────────────────
const KNOWLEDGE_BASE = {
  personal: {
    name: "Witness Fabrice",
    email: "witnessfabrice@gmail.com",
    phone: "+250 783 568 337",
    location: "Kigali, Rwanda",
    github: "github.com/witfab-dev",
    linkedin: "linkedin.com/in/witness-fabrice",
    title: "Full-Stack Developer",
    level: "Level 5 Software Student",
    bio: "Passionate about building impactful tech solutions for Africa",
    funFacts: [
      "Loves coffee while coding ☕",
      "Started coding at 16",
      "Speaks 3 languages (English, French, Kinyarwanda)",
      "Enjoys teaching and mentoring young developers",
    ],
  },
  education: {
    school: "Kirehe Adventist TVET School (KATSS)",
    distinction: "Graduated with distinction",
    awards: ["Best Tech Project", "Leadership Excellence"],
    focus: "Software Engineering & Web Technologies",
    year: "2023",
  },
  skills: {
    frontend: ["React", "Next.js", "Vue.js", "Three.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express", "Python", "Django", "GraphQL", "REST APIs"],
    databases: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
    infrastructure: ["Docker", "AWS", "Vercel", "Nginx", "CI/CD pipelines"],
    other: ["IoT integration", "WebGL", "WebSockets", "PWA"],
  },
  projects: [
    {
      name: "Market-Kigali",
      description: "E-commerce platform for local Kigali vendors",
      details: "500+ active users | React, Node.js, Stripe, PostgreSQL",
      features: "Real-time inventory, vendor dashboard, mobile-first",
      impact: "Empowered local businesses to sell online",
    },
    {
      name: "KATSS Platform",
      description: "Academic management system for schools",
      details: "1000+ students managed | React, Express.js, MongoDB",
      features: "Grade tracking, attendance, parent portal, notifications",
      impact: "Streamlined school administration across Rwanda",
    },
    {
      name: "Rwanda Explorer",
      description: "Immersive 3D tourism experience",
      details: "4.8★ app store rating | Three.js, WebGL, React",
      features: "360° virtual tours, interactive maps, cultural content",
      impact: "Showcasing Rwanda's beauty to the world",
    },
    {
      name: "PSSMS",
      description: "Parking & Slot Management System",
      details: "200+ slots managed | Vue.js, Python, IoT sensors",
      features: "Real-time availability, automated billing, sensor integration",
      impact: "Reduced parking congestion in Kigali",
    },
  ],
  personality: [
    "Passionate about impactful tech solutions for Africa",
    "Detail-oriented, ships high-quality code with strong UX focus",
    "Collaborative, fast learner, cross-functional team player",
    "Open to freelance, full-time remote, and relocation",
  ],
  achievements: {
    awards: ["Best Tech Project 2023", "Leadership Excellence Award"],
    certifications: ["AWS Certified Developer", "Meta Backend Developer"],
    yearsOfExperience: 3,
    projectsDelivered: 12,
    countriesServed: 6,
  },
};

// ─── Friendly Greeting Generator ──────────────────────────────────────────
const getFriendlyGreeting = () => {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  const greetings = {
    morning: [
      "Good morning! 🌅 What a beautiful day to explore Witness's work!",
      "Morning! ☀️ Ready to discover some amazing tech?",
      "Good morning! Hope you're having a great start to your day!",
    ],
    afternoon: [
      "Good afternoon! 👋 How can I help you today?",
      "Hey there! 🌤️ Great to see you!",
      "Good afternoon! Ready to dive into some impressive projects?",
    ],
    evening: [
      "Good evening! 🌙 Welcome to Witness's portfolio!",
      "Hey! 🌆 Hope you had a great day!",
      "Good evening! 👋 Let me help you explore Witness's work!",
    ],
  };

  const isWeekend = day === 0 || day === 6;
  let timeGreeting;
  if (hour < 12) timeGreeting = greetings.morning;
  else if (hour < 18) timeGreeting = greetings.afternoon;
  else timeGreeting = greetings.evening;

  const greeting = timeGreeting[Math.floor(Math.random() * timeGreeting.length)];
  const weekendMsg = isWeekend ? " Enjoy your weekend! 🎉" : "";
  return greeting + weekendMsg;
};

// ─── Friendly Response Generator ─────────────────────────────────────────
class FriendlyResponseEngine {
  constructor() {
    this.context = [];
    this.sessionStart = Date.now();
    this.userName = null;
    this.conversationCount = 0;
    this.topicsDiscussed = new Set();
    this.funFactIndex = 0;
  }

  addContext(message, role) {
    this.context.push({ message, role, timestamp: Date.now() });
    if (this.context.length > 20) this.context.shift();
    this.conversationCount++;
    
    // Extract topics mentioned
    const topics = ['skills', 'projects', 'education', 'experience', 'achievements', 'location', 'contact', 'hire'];
    topics.forEach(topic => {
      if (message.toLowerCase().includes(topic)) {
        this.topicsDiscussed.add(topic);
      }
    });
  }

  getRecentContext(count = 3) {
    return this.context.slice(-count);
  }

  // ─── Friendly Greetings ──────────────────────────────────────
  handleGreeting(input, recent) {
    const hour = new Date().getHours();
    const isReturning = recent.length > 2;
    
    const greetings = {
      morning: [
        "Morning! 🌅 So glad you're here! What would you like to know about Witness?",
        "Good morning! ☀️ I'm excited to help you discover Witness's amazing work!",
      ],
      afternoon: [
        "Hey there! 👋 How can I make your day better with some cool tech info?",
        "Good afternoon! 🌤️ Ready to explore some awesome projects?",
      ],
      evening: [
        "Evening! 🌙 Great timing — I was just telling someone about Witness's latest project!",
        "Good evening! 👋 Let's dive into Witness's impressive portfolio!",
      ],
    };

    let greeting;
    if (hour < 12) greeting = greetings.morning[Math.floor(Math.random() * greetings.morning.length)];
    else if (hour < 18) greeting = greetings.afternoon[Math.floor(Math.random() * greetings.afternoon.length)];
    else greeting = greetings.evening[Math.floor(Math.random() * greetings.evening.length)];

    if (isReturning) {
      const returnMessages = [
        "Welcome back! 😊 It's always great to see you again!",
        "Hey! You're back! 🙌 What can I help you with today?",
        "Look who's here! 🎉 Ready for more great info about Witness?",
      ];
      return returnMessages[Math.floor(Math.random() * returnMessages.length)] + " " + greeting;
    }

    return greeting;
  }

  // ─── Friendly About Response ─────────────────────────────────
  generateAboutResponse() {
    const p = KNOWLEDGE_BASE.personal;
    const funFact = p.funFacts[Math.floor(Math.random() * p.funFacts.length)];
    const personality = KNOWLEDGE_BASE.personality.slice(0, 2).join(" ");
    
    const responses = [
      `${p.name} is amazing! 🚀 He's a ${p.title} and ${p.level} based in ${p.location}. He ${KNOWLEDGE_BASE.education.distinction} from ${KNOWLEDGE_BASE.education.school}. ${personality}. Did you know? ${funFact} 😊`,
      `Let me tell you about Witness! 🌟 He's a talented ${p.title} from ${p.location}. He's super passionate about building tech that makes a difference in Africa. ${funFact} Want to know more about his skills?`,
      `Witness is such an inspiring developer! 💪 He's a ${p.title} with ${KNOWLEDGE_BASE.achievements.yearsOfExperience}+ years of experience. ${personality} He's also ${funFact} 🎯`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ─── Friendly Skills Response ────────────────────────────────
  generateSkillsResponse(input) {
    const skills = KNOWLEDGE_BASE.skills;
    const frontend = skills.frontend.slice(0, 4).join(", ");
    const backend = skills.backend.slice(0, 3).join(", ");
    
    const responses = [
      `Witness has an awesome tech stack! 🎯 For frontend, he rocks ${frontend}. For backend, he's all about ${backend}. He's basically a full-stack superhero! 🦸‍♂️`,
      `His skills are incredible! ✨ He's mastered ${frontend} on the frontend and ${backend} on the backend. Plus, he's great with databases and cloud stuff. Super versatile! 👨‍💻`,
      `Witness is a tech wizard! 🧙‍♂️ He's got ${frontend} in his frontend toolkit, and ${backend} for backend magic. Seriously, he can build anything! 💻`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ─── Friendly Projects Response ──────────────────────────────
  generateProjectsResponse(input) {
    const projects = KNOWLEDGE_BASE.projects;
    
    // Check for specific project
    for (const project of projects) {
      if (input.includes(project.name.toLowerCase())) {
        const excitement = ['This is so cool!', 'How awesome is this?', 'This one is a favorite!', 'Such a great project!'];
        return `${excitement[Math.floor(Math.random() * excitement.length)} 🎯 "${project.name}" - ${project.description}. ${project.details}. The impact? ${project.impact}! Amazing right? 😊`;
      }
    }
    
    const projectList = projects.map(p => p.name).join(", ");
    const featured = projects[0];
    const responses = [
      `Witness has built ${projects.length} amazing projects! 🚀 Check these out: ${projectList}. His flagship "${featured.name}" is incredible — ${featured.impact}! Which one interests you? 🤔`,
      `Let me tell you about his projects! 💫 ${featured.name} is a standout — ${featured.description}. He's also built ${projectList}. The guy is a machine! 💪 Which one should I tell you more about?`,
      `His portfolio is impressive! 🌟 ${featured.name} serves ${featured.details} and ${featured.impact}. He's also created ${projectList}. So much talent! 🎯`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ─── Friendly Education Response ─────────────────────────────
  generateEducationResponse() {
    const edu = KNOWLEDGE_BASE.education;
    const name = KNOWLEDGE_BASE.personal.name;
    const responses = [
      `${name} is super smart! 🎓 He ${edu.distinction} from ${edu.school} in ${edu.focus}. He even won ${edu.awards.join(" and ")}! Amazing, right? 🌟`,
      `His educational journey is inspiring! 📚 He studied ${edu.focus} at ${edu.school} and graduated ${edu.distinction}. He also earned ${edu.awards.join(" and ")}! 🏆`,
      `Witness really crushed it in school! 💪 He ${edu.distinction} in ${edu.focus} from ${edu.school}. Plus, he got ${edu.awards.join(" and ")}! So impressive! 👏`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ─── Friendly Contact Response ──────────────────────────────
  generateContactResponse(input) {
    const p = KNOWLEDGE_BASE.personal;
    const email = p.email;
    const github = p.github;
    
    const responses = [
      `You can totally reach out to Witness! 💬 Just email him at ${email}. He's super responsive and would love to hear from you! 📧 Also, check his code at ${github} — it's 🔥!`,
      `He's definitely open to connecting! 🤝 Send him a message at ${email}. He's friendly and always happy to talk about projects! 💬 His GitHub is ${github} if you want to see his work!`,
      `Yes! Witness loves new opportunities! 🚀 Reach him at ${email} and he'll get back to you super fast. He's also active on GitHub at ${github}. Can't wait for you to connect! ✨`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ─── Friendly Location Response ──────────────────────────────
  generateLocationResponse() {
    const p = KNOWLEDGE_BASE.personal;
    const responses = [
      `${p.name} is based in beautiful ${p.location}, Rwanda! 🇷🇼 The heart of East Africa. He loves building software that helps the local tech ecosystem grow! 🌍`,
      `Right now, he's coding in ${p.location}, Rwanda! 🏠 It's an amazing place with a growing tech scene. He's open to working with people from anywhere! 🌎`,
      `${p.location}, Rwanda is where he calls home! 🇷🇼 He's building awesome stuff and helping put the African tech scene on the map. So cool! 🌍`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ─── Friendly Experience Response ────────────────────────────
  generateExperienceResponse() {
    const name = KNOWLEDGE_BASE.personal.name;
    const years = KNOWLEDGE_BASE.achievements.yearsOfExperience;
    const projects = KNOWLEDGE_BASE.achievements.projectsDelivered;
    const countries = KNOWLEDGE_BASE.achievements.countriesServed;
    
    const responses = [
      `${name} has been on an amazing journey! 🚀 Over ${years}+ years, he's built ${projects}+ projects serving ${countries} countries. His experience is diverse and impressive! 💪`,
      `What a journey! 🌟 ${name} started at ${KNOWLEDGE_BASE.education.school} and now has ${years}+ years of experience. He's delivered ${projects}+ projects across ${countries} countries! 🎯`,
      `His experience is incredible! ✨ ${years}+ years in tech, ${projects}+ projects delivered, and reaching ${countries} countries. And he's still going strong! 💪`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ─── Friendly Achievement Response ────────────────────────────
  generateAchievementResponse() {
    const awards = KNOWLEDGE_BASE.achievements.awards.join(" and ");
    const certs = KNOWLEDGE_BASE.achievements.certifications.join(" and ");
    
    const responses = [
      `So many achievements! 🏆 He won ${awards} and holds ${certs}. The guy is unstoppable! 💪`,
      `His trophy cabinet is full! 🌟 ${awards} — that's impressive! Plus, he's certified in ${certs}. A true professional! 👏`,
      `Witness is collecting awards like Pokémon! 🎯 He's got ${awards} and certifications in ${certs}. So much dedication! 💫`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ─── Friendly Help Response ──────────────────────────────────
  generateHelpResponse() {
    const topics = [
      "skills (React, Node.js, Three.js)",
      "projects (Market-Kigali, KATSS Platform)",
      "education and background",
      "how to contact him",
      "his achievements and awards",
    ];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const responses = [
      `I'd love to help! 🌟 You can ask me about ${randomTopic}. What sounds interesting to you? 😊`,
      `Oh, I know so much about Witness! 💡 Try asking about ${randomTopic}. Or just tell me what you want to know — I'm here for you! 🤝`,
      `Great question! 🚀 I specialize in talking about ${randomTopic}. What would you like to explore? 🎯`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ─── Friendly Thank You Response ─────────────────────────────
  generateThankYouResponse() {
    const responses = [
      "Aww, you're welcome! 😊 It's been a pleasure chatting with you! Anything else I can help with?",
      "You're so kind! 🙏 I'm happy to help. What else would you like to know about Witness?",
      "Thank you! 🌟 It's always great when people are interested in Witness's work. Let me know if you need anything else!",
      "My pleasure! 😄 I love talking about Witness — he's amazing. Want to hear about something specific?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ─── Friendly Goodbye Response ───────────────────────────────
  generateGoodbyeResponse() {
    const responses = [
      "Bye for now! 👋 It was wonderful chatting with you! Come back anytime — I'll be here! 😊",
      "Take care! 🌟 Thanks for stopping by! If you have more questions later, I'm just a message away. 💬",
      "See you later! 🎉 Remember, you can always reach Witness at witnessfabrice@gmail.com. Have a great day! 🌈",
      "Goodbye! 👋 I hope you learned something awesome about Witness. Feel free to come back anytime! 💫",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ─── Main Response Generator ──────────────────────────────────
  generateResponse(userInput) {
    const input = userInput.toLowerCase().trim();
    
    // Add to context
    this.addContext(userInput, 'user');
    
    // Get conversation context
    const recent = this.getRecentContext(3);
    
    // ─── Greetings ─────────────────────────────────────────────
    const greetings = ['hi', 'hello', 'hey', 'greetings', 'sup', 'howdy', 'good morning', 'good afternoon', 'good evening', 'yo', "what's up"];
    if (greetings.some(g => input.includes(g))) {
      return this.handleGreeting(input, recent);
    }
    
    // ─── About ─────────────────────────────────────────────────
    const about = ['about', 'who is', 'tell me about', 'introduce', 'background', 'bio', 'who are you', 'explain'];
    if (about.some(a => input.includes(a)) && input.match(/\b(witness|fabrice|him|he|developer|programmer|this guy)\b/)) {
      return this.generateAboutResponse();
    }
    
    // ─── Skills ────────────────────────────────────────────────
    const skills = ['skill', 'technologies', 'tech stack', 'programming', 'language', 'framework', 'tool', 'expertise', 'knows', 'use', 'proficient', 'stack'];
    if (skills.some(s => input.includes(s))) {
      return this.generateSkillsResponse(input);
    }
    
    // ─── Projects ──────────────────────────────────────────────
    const projects = ['project', 'built', 'created', 'developed', 'portfolio', 'work', 'made', 'build', 'application', 'app', 'site', 'platform'];
    if (projects.some(p => input.includes(p))) {
      return this.generateProjectsResponse(input);
    }
    
    // ─── Education ─────────────────────────────────────────────
    const edu = ['education', 'study', 'studied', 'school', 'college', 'university', 'degree', 'diploma', 'graduated', 'academic', 'learning', 'course', 'tvet'];
    if (edu.some(e => input.includes(e))) {
      return this.generateEducationResponse();
    }
    
    // ─── Contact ──────────────────────────────────────────────
    const contact = ['contact', 'hire', 'email', 'reach', 'connect', 'work with', 'freelance', 'job', 'opportunity', 'collaborate', 'contract', 'collaboration', 'get in touch', 'message'];
    if (contact.some(c => input.includes(c))) {
      return this.generateContactResponse(input);
    }
    
    // ─── Location ──────────────────────────────────────────────
    const loc = ['location', 'based', 'where', 'city', 'country', 'rwanda', 'kigali', 'live', 'reside', 'from', 'origin'];
    if (loc.some(l => input.includes(l))) {
      return this.generateLocationResponse();
    }
    
    // ─── Experience ─────────────────────────────────────────────
    const exp = ['experience', 'journey', 'career', 'path', 'history', 'started', 'begin', 'worked', 'professional'];
    if (exp.some(e => input.includes(e))) {
      return this.generateExperienceResponse();
    }
    
    // ─── Achievements ───────────────────────────────────────────
    const ach = ['achievement', 'award', 'recognition', 'certification', 'accomplishment', 'won', 'earned', 'honor'];
    if (ach.some(a => input.includes(a))) {
      return this.generateAchievementResponse();
    }
    
    // ─── Help ──────────────────────────────────────────────────
    const help = ['help', 'what can you do', 'capabilities', 'feature', 'function', 'purpose', 'abilities', 'assist'];
    if (help.some(h => input.includes(h))) {
      return this.generateHelpResponse();
    }
    
    // ─── Thank you ─────────────────────────────────────────────
    const thanks = ['thank', 'thanks', 'appreciate', 'grateful', 'awesome', 'great', 'nice', 'cool', 'amazing'];
    if (thanks.some(t => input.includes(t))) {
      return this.generateThankYouResponse();
    }
    
    // ─── Goodbye ───────────────────────────────────────────────
    const bye = ['bye', 'goodbye', 'see you', 'farewell', 'exit', 'quit', 'later', 'cya'];
    if (bye.some(b => input.includes(b))) {
      return this.generateGoodbyeResponse();
    }
    
    // ─── Follow-up / Contextual ────────────────────────────────
    const recentContext = this.getRecentContext(3);
    if (recentContext.length > 1) {
      const allContext = recentContext.map(c => c.message.toLowerCase()).join(' ');
      
      if (allContext.includes("skills") && input.match(/\b(more|else|other|additionally|also|tell)\b/)) {
        const otherSkills = KNOWLEDGE_BASE.skills.other.join(", ");
        const responses = [
          `Beyond his core skills, Witness also works with ${otherSkills}! 🤯 He's super versatile and can handle pretty much anything tech-related.`,
          `Oh, and he also does ${otherSkills}! 🚀 The guy really knows his stuff. Anything else you want to know? 😊`,
          `He's also got experience with ${otherSkills}! 💪 So you can see he's not just a one-trick pony — he's the whole circus! 🎪`,
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
      
      if (allContext.includes("projects") && input.match(/\b(details|more|specific|explain|tell)\b/)) {
        const project = KNOWLEDGE_BASE.projects[0];
        const responses = [
          `Let me tell you more about "${project.name}"! 🎯 ${project.description}. ${project.details}. And get this — ${project.impact}! Pretty cool, right? 😄`,
          `"${project.name}" is amazing! 🌟 ${project.description}. ${project.details}. The impact has been ${project.impact}. Want to hear about another project? 🚀`,
          `So "${project.name}" — ${project.description}. ${project.details}. And ${project.impact}! 🤯 Can you believe it? He's so talented! 💫`,
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
      
      if (allContext.includes("hire") && input.match(/\b(how|process|next|connect)\b/)) {
        const responses = [
          `To hire Witness, just email him at ${KNOWLEDGE_BASE.personal.email}! 📧 He's super responsive and would love to discuss your project. He usually replies within 24 hours! ⚡`,
          `The best way to connect is through email — ${KNOWLEDGE_BASE.personal.email}! 💬 He's friendly and ready to chat about your ideas. Don't hesitate to reach out! 🤝`,
          `Simple! Drop him a message at ${KNOWLEDGE_BASE.personal.email} and he'll get back to you super fast. 🚀 He's actively looking for new opportunities! 🎯`,
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    // ─── Fun / Casual Queries ──────────────────────────────────
    if (input.includes('fun fact') || input.includes('interesting')) {
      const fact = KNOWLEDGE_BASE.personal.funFacts[Math.floor(Math.random() * KNOWLEDGE_BASE.personal.funFacts.length)];
      const responses = [
        `Fun fact about Witness! 🎯 ${fact} Pretty cool, right? 😊`,
        `Here's something interesting! ✨ ${fact} Did you know that? 🧠`,
        `I love this one! 🌟 ${fact} He's full of surprises! 😄`,
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (input.includes('coffee') || input.includes('drink')) {
      const responses = [
        "Oh, Witness loves coffee! ☕ It's basically his coding fuel. He'll probably be sipping one right now while building something awesome! 😄",
        "Coffee is Witness's best friend! ☕ He says it's the secret ingredient to great code. And honestly, I think he's right! 🚀",
        "Witness + Coffee = Magic! ✨ He's always got a cup nearby when he's coding. It's his creative juice! ☕💻",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (input.includes('rwanda') || input.includes('kigali')) {
      const responses = [
        "Rwanda is beautiful! 🇷🇼 And Kigali is such a vibrant city. Witness loves building tech that helps his community grow. 🌍",
        "Kigali, Rwanda! 🇷🇼 It's an amazing place with a booming tech scene. Witness is proud to be part of it. 🚀",
        "Beautiful Rwanda! 🇷🇼 Witness is based in Kigali, working hard to put African tech on the map. So inspiring! 🌟",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // ─── Friendly Default ───────────────────────────────────────
    const defaultResponses = [
      "That's a great question! 😊 I'm here to help you learn about Witness Fabrice. Want to ask about his skills, projects, or how to reach him? What sparks your interest? 🎯",
      "Hmm, interesting! 💭 I know a ton about Witness — his projects, skills, education, and more. What would you like to explore? I'm all ears! 👂✨",
      "I love talking about Witness! 🌟 He's such an inspiring developer. Want to know about his tech stack, his amazing projects, or his journey in tech? Pick your topic! 🚀",
      "Great to see you curious! 😄 I can tell you about Witness's work, his skills, how to hire him, and more. What's on your mind? 💬",
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
}

// ─── Quick Actions ─────────────────────────────────────────────
const QUICK_ACTIONS = [
  { icon: User, label: "About", cmd: "Tell me about Witness Fabrice", color: "#60a5fa" },
  { icon: Code2, label: "Skills", cmd: "What technologies does Witness use?", color: "#34d399" },
  { icon: Sparkles, label: "Projects", cmd: "What projects has Witness built?", color: "#fbbf24" },
  { icon: Mail, label: "Contact", cmd: "How can I contact or hire Witness?", color: "#fb7185" },
  { icon: GraduationCap, label: "Education", cmd: "Tell me about his education", color: "#a78bfa" },
  { icon: MapPin, label: "Location", cmd: "Where is Witness based?", color: "#22d3ee" },
  { icon: Award, label: "Achievements", cmd: "What awards has Witness received?", color: "#f472b6" },
  { icon: Briefcase, label: "Experience", cmd: "What's his work experience?", color: "#34d399" },
];

// ─── Waveform ──────────────────────────────────────────────────
const BAR_PROFILE = Array.from({ length: 28 }, (_, i) => {
  const t = i / 27;
  return 0.12 + 0.76 * Math.sin(t * Math.PI);
});

const Waveform = ({ active, color, volume = 0.5 }) => (
  <div className="flex items-end justify-center gap-[2px]" style={{ height: 28, flex: 1 }}>
    {BAR_PROFILE.map((base, i) => (
      <motion.div
        key={i}
        className="rounded-full origin-bottom"
        style={{ width: 2, height: 28, background: color }}
        animate={
          active
            ? {
                scaleY: [base * 0.25, base * (0.5 + volume * 1.1), base * 0.25],
                opacity: [0.35, 0.95, 0.35],
              }
            : { scaleY: 0.08, opacity: 0.18 }
        }
        transition={
          active
            ? { duration: 0.32 + (i % 5) * 0.07, repeat: Infinity, delay: (i / 28) * 0.28, ease: "easeInOut" }
            : { duration: 0.4 }
        }
      />
    ))}
  </div>
);

// ─── Typing dots ───────────────────────────────────────────────
const TypingDots = () => (
  <div className="flex items-center gap-1 px-3 py-2.5">
    {[0, 0.16, 0.32].map((d, i) => (
      <motion.span
        key={i}
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "#f97316" }}
        animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
        transition={{ duration: 0.65, repeat: Infinity, delay: d, ease: "easeInOut" }}
      />
    ))}
  </div>
);

// ─── Main Component ────────────────────────────────────────────
export default function VoiceAssistant({ autoOpen = true, onClose }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const recognitionRef = useRef(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const volumeTimerRef = useRef(null);
  const hasGreetedRef = useRef(false);
  const responseEngine = useRef(new FriendlyResponseEngine());

  // ── Auto-scroll ───────────────────────────────────────────────
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // ── TTS ───────────────────────────────────────────────────────
  const speak = useCallback((text) => {
    if (muted || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const clean = text.replace(/[*_`#•\-]\b/g, "").replace(/\n+/g, " ").trim();
    const utt = new SpeechSynthesisUtterance(clean);

    const loadVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferred = ["Google UK English Female", "Samantha", "Microsoft Aria", "Karen", "Google US English", "Alex"];
      for (const name of preferred) {
        const v = voices.find(v => v.name.includes(name.split(" ")[0]));
        if (v) { utt.voice = v; break; }
      }
    };
    loadVoice();
    if (!utt.voice) window.speechSynthesis.onvoiceschanged = loadVoice;

    utt.rate = 0.97;
    utt.pitch = 1.05;
    utt.volume = 1;

    utt.onstart = () => {
      setSpeaking(true);
      clearInterval(volumeTimerRef.current);
      volumeTimerRef.current = setInterval(() => setVolume(0.25 + Math.random() * 0.75), 110);
    };
    utt.onend = () => { setSpeaking(false); setVolume(0.5); clearInterval(volumeTimerRef.current); };
    utt.onerror = () => { setSpeaking(false); clearInterval(volumeTimerRef.current); };

    window.speechSynthesis.speak(utt);
  }, [muted]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    setVolume(0.5);
    clearInterval(volumeTimerRef.current);
  }, []);

  // ── Generate Friendly Response ───────────────────────────────
  const getAIResponse = useCallback(async (userText) => {
    // Simulate thinking for natural feel
    const thinkingTime = 400 + Math.random() * 500;
    await new Promise(resolve => setTimeout(resolve, thinkingTime));
    
    const response = responseEngine.current.generateResponse(userText);
    responseEngine.current.addContext(response, 'assistant');
    
    return response;
  }, []);

  // ── Push message ──────────────────────────────────────────────
  const pushMsg = useCallback((id, role, text, done = true) => {
    setMessages(m => {
      const exists = m.find(msg => msg.id === id);
      if (exists) return m.map(msg => msg.id === id ? { ...msg, text, done } : msg);
      return [...m, { id, role, text, done }];
    });
  }, []);

  // ── Process query ─────────────────────────────────────────────
  const process = useCallback(async (query) => {
    const trimmed = query.trim();
    if (!trimmed || loading) return;

    setInput("");
    setError(null);
    setLoading(true);
    stopSpeaking();
    setShowSuggestions(false);

    const userId = `u-${Date.now()}`;
    pushMsg(userId, "user", trimmed);

    const aiId = `a-${Date.now() + 1}`;
    try {
      const aiText = await getAIResponse(trimmed);

      pushMsg(aiId, "ai", "", false);
      let i = 0;
      const STEP = 3;
      const tick = setInterval(() => {
        i += STEP;
        if (i >= aiText.length) {
          clearInterval(tick);
          pushMsg(aiId, "ai", aiText, true);
          speak(aiText);
        } else {
          pushMsg(aiId, "ai", aiText.slice(0, i), false);
        }
      }, 14);
    } catch (err) {
      const msg = "Oops! 😅 Something went wrong. Want to try again? I'm here to help!";
      pushMsg(aiId, "ai", msg, true);
      setError(err.message);
      speak(msg);
    } finally {
      setLoading(false);
    }
  }, [loading, getAIResponse, pushMsg, speak, stopSpeaking]);

  // ── Voice recognition ─────────────────────────────────────────
  const toggleListen = useCallback(() => {
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      process("Voice input isn't supported here — but you can type your question! 😊");
      return;
    }

    stopSpeaking();

    const rec = new SR();
    rec.lang = "en-US";
    rec.continuous = false;
    rec.interimResults = true;

    rec.onstart = () => setListening(true);
    rec.onresult = (e) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join("");
      setInput(t);
      if (e.results[e.results.length - 1].isFinal) {
        setListening(false);
        process(t);
      }
    };
    rec.onerror = () => {
      setListening(false);
      process("I couldn't hear that clearly. Want to type your question? 😊");
    };
    rec.onend = () => setListening(false);

    recognitionRef.current = rec;
    rec.start();
  }, [listening, process, stopSpeaking]);

  // ── Clear chat ────────────────────────────────────────────────
  const clearChat = useCallback(() => {
    setMessages([]);
    responseEngine.current = new FriendlyResponseEngine();
    hasGreetedRef.current = false;
    setShowSuggestions(true);
    stopSpeaking();
    setError(null);
  }, [stopSpeaking]);

  // ─── Friendly Welcome ─────────────────────────────────────────
  useEffect(() => {
    if (!autoOpen || hasGreetedRef.current) return;
    hasGreetedRef.current = true;
    
    const timer = setTimeout(() => {
      const greeting = getFriendlyGreeting();
      const welcomeMsg = `${greeting} 😊 I'm Witbri AI, and I'm here to help you discover Witness Fabrice's amazing work. Want to hear about his skills, projects, or how to connect with him? Let's chat! 💬`;
      const welcomeId = `w-${Date.now()}`;
      pushMsg(welcomeId, "ai", welcomeMsg, true);
      speak(welcomeMsg);
    }, 500);
    return () => clearTimeout(timer);
  }, [autoOpen, pushMsg, speak]);

  // ── Keyboard shortcuts ────────────────────────────────────────
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose?.();
      if ((e.ctrlKey || e.metaKey) && e.key === "m") { e.preventDefault(); setMuted(m => !m); }
      if ((e.ctrlKey || e.metaKey) && e.key === "l") { e.preventDefault(); clearChat(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, clearChat]);

  // ── Cleanup ───────────────────────────────────────────────────
  useEffect(() => () => {
    clearInterval(volumeTimerRef.current);
    window.speechSynthesis?.cancel();
  }, []);

  const statusColor = listening ? "#ef4444" : speaking ? "#f97316" : loading ? "#a78bfa" : "#22c55e";
  const statusLabel = listening ? "Listening…" : speaking ? "Speaking" : loading ? "Thinking…" : "Ready";

  return (
    <AnimatePresence>
      {autoOpen && (
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 340, damping: 30 }}
          className="fixed bottom-28 right-5 z-[998] w-[420px] max-w-[calc(100vw-1.25rem)]"
        >
          {/* Ambient glow */}
          <motion.div
            className="pointer-events-none absolute -inset-10 rounded-[3rem]"
            style={{ background: "radial-gradient(ellipse at 50% 65%, rgba(249,115,22,0.10) 0%, transparent 68%)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4.5, repeat: Infinity }}
          />

          {/* Shell */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(158deg, #1c1917 0%, #0d0c0b 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 28px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(249,115,22,0.10)",
            }}
          >
            {/* Top line accent */}
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent 5%, rgba(249,115,22,0.55) 50%, transparent 95%)" }} />

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative w-9 h-9 shrink-0">
                  <motion.div
                    className="absolute inset-0 rounded-xl blur-md"
                    style={{ background: "rgba(249,115,22,0.38)" }}
                    animate={{ opacity: [0.28, 0.65, 0.28], scale: [0.88, 1.12, 0.88] }}
                    transition={{ duration: 2.6, repeat: Infinity }}
                  />
                  <div className="relative w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(140deg, #f97316, #c2410c)" }}>
                    <Bot size={16} className="text-white" />
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                    style={{ background: statusColor, borderColor: "#0d0c0b", transition: "background 0.3s" }} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-black tracking-tight text-white" style={{ letterSpacing: "-0.025em" }}>
                      Witbri AI
                    </span>
                    <span className="px-1.5 py-[2px] rounded-md text-[8.5px] font-bold uppercase tracking-widest"
                      style={{ background: "rgba(249,115,22,0.13)", color: "#f97316", border: "1px solid rgba(249,115,22,0.22)" }}>
                      Friend
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-[2px]">
                    <motion.span className="w-1.5 h-1.5 rounded-full"
                      style={{ background: statusColor, transition: "background 0.3s" }}
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.1, repeat: Infinity }} />
                    <span className="text-[9px] uppercase tracking-[0.14em] font-semibold" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {statusLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                {[
                  { icon: RotateCcw, action: clearChat, title: "Clear (⌘L)", hoverColor: "#f97316" },
                  { icon: muted ? VolumeX : Volume2, action: () => { setMuted(m => !m); if (speaking) stopSpeaking(); }, title: "Mute (⌘M)", hoverColor: "#f97316", active: muted },
                  { icon: X, action: onClose, title: "Close (Esc)", hoverColor: "#ef4444" },
                ].map(({ icon: Ic, action, title, hoverColor, active }, i) => (
                  <button key={i} onClick={action} title={title}
                    className="w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200"
                    style={{ border: "1px solid rgba(255,255,255,0.08)", color: active ? hoverColor : "rgba(255,255,255,0.28)" }}
                    onMouseEnter={e => { e.currentTarget.style.color = hoverColor; e.currentTarget.style.borderColor = hoverColor + "55"; e.currentTarget.style.background = hoverColor + "12"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = active ? hoverColor : "rgba(255,255,255,0.28)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "transparent"; }}>
                    <Ic size={13} />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Quick Actions ── */}
            {showSuggestions && messages.length <= 1 && (
              <div className="px-4 pt-3 pb-1">
                <p className="text-[9px] text-white/30 mb-2 flex items-center gap-1.5">
                  <Smile size={10} /> Try asking me:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_ACTIONS.slice(0, 6).map(({ icon: Icon, label, cmd, color }) => (
                    <button
                      key={label}
                      onClick={() => process(cmd)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-200 hover:scale-105"
                      style={{
                        background: `${color}15`,
                        border: `1px solid ${color}30`,
                        color: color,
                      }}
                    >
                      <Icon size={10} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Waveform bar ── */}
            <div className="px-5 pt-2 pb-2">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.055)" }}>
                <Waveform active={speaking || listening} color={listening ? "#ef4444" : "#f97316"} volume={volume} />
                <div className="flex flex-col items-end shrink-0 min-w-[48px]">
                  <span className="text-[8.5px] uppercase tracking-widest font-bold" style={{ color: "rgba(255,255,255,0.18)" }}>
                    {listening ? "Input" : speaking ? "Output" : "Standby"}
                  </span>
                  {speaking && (
                    <button onClick={stopSpeaking} className="text-[9px] mt-0.5 font-semibold" style={{ color: "#f97316" }}>
                      Stop ▪
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── Messages ── */}
            <div ref={scrollRef} className="px-4 py-1.5 space-y-2.5 overflow-y-auto" style={{ maxHeight: 232, scrollbarWidth: "none" }}>
              <AnimatePresence initial={false}>
                {messages.length === 0 && !loading && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-6 gap-2"
                  >
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                      style={{ background: "rgba(249,115,22,0.10)", border: "1px solid rgba(249,115,22,0.18)" }}>
                      <Sparkles size={16} style={{ color: "#f97316" }} />
                    </div>
                    <p className="text-[11px] text-center" style={{ color: "rgba(255,255,255,0.28)", maxWidth: 240 }}>
                      Hey! 😊 Ask me anything about Witness — I'm friendly and here to help!
                    </p>
                  </motion.div>
                )}

                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.18 }}
                    className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5"
                      style={msg.role === "ai"
                        ? { background: "rgba(249,115,22,0.13)", border: "1px solid rgba(249,115,22,0.22)" }
                        : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
                      {msg.role === "ai"
                        ? <Bot size={11} style={{ color: "#f97316" }} />
                        : <User size={11} style={{ color: "rgba(255,255,255,0.45)" }} />}
                    </div>

                    <div
                      className="max-w-[78%] px-3 py-2 text-[11.5px] leading-relaxed"
                      style={msg.role === "user"
                        ? { background: "linear-gradient(135deg, #f97316, #c2410c)", color: "white", borderRadius: "14px 3px 14px 14px" }
                        : { background: "rgba(255,255,255,0.055)", color: "rgba(255,255,255,0.82)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "3px 14px 14px 14px" }}
                    >
                      {msg.text}
                      {msg.role === "ai" && !msg.done && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.48, repeat: Infinity }}
                          className="inline-block w-[5px] h-[10px] ml-0.5 align-middle rounded-sm"
                          style={{ background: "#f97316" }}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                  <div className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(249,115,22,0.13)", border: "1px solid rgba(249,115,22,0.22)" }}>
                    <Bot size={11} style={{ color: "#f97316" }} />
                  </div>
                  <div className="rounded-[3px_14px_14px_14px]"
                    style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </div>

            {/* ── Input row ── */}
            <div className="px-4 pt-1 pb-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey && input.trim()) { e.preventDefault(); process(input); } }}
                  placeholder={listening ? "Listening… 🎤" : "Type or click the mic! 🎙️"}
                  disabled={loading}
                  className="flex-1 text-[12px] px-4 py-2.5 rounded-xl transition-all duration-200 outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                />
                <button
                  onClick={toggleListen}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${listening ? "animate-pulse" : ""}`}
                  style={{ background: listening ? "#ef4444" : "rgba(249,115,22,0.85)", border: "none" }}
                >
                  <Mic size={14} className="text-white" />
                </button>
                <button
                  onClick={() => process(input)}
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background: input.trim() && !loading ? "rgba(249,115,22,0.85)" : "rgba(255,255,255,0.08)", border: "none", opacity: input.trim() && !loading ? 1 : 0.4 }}
                >
                  <Send size={13} className={input.trim() && !loading ? "text-white" : "text-gray-500"} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
