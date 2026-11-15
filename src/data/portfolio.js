// Language-neutral portfolio data. All prose lives in src/i18n (en.js / fr.js).

export const profile = {
  name: 'Witness Fabrice',
  nickname: 'wit.fab',
  brand: 'WIT.FAB',
  email: 'witnessfabrice@gmail.com',
  phoneDisplay: '0783 568 337',
  phoneIntl: '250783568337',
  location: 'Kigali, Rwanda',
  portrait: '/wit.png',
};

export const whatsappUrl = (message) =>
  `https://wa.me/${profile.phoneIntl}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

export const socials = [
  { label: 'GitHub', href: 'https://github.com/witfab-dev', handle: 'witfab-dev' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/witness-fabrice', handle: 'witness-fabrice' },
  { label: 'X / Twitter', href: 'https://twitter.com/wit_fab', handle: '@wit_fab' },
  { label: 'Instagram', href: 'https://instagram.com/witbri1', handle: '@witbri1' },
  { label: 'Email', href: 'mailto:witnessfabrice@gmail.com', handle: 'witnessfabrice@gmail.com' },
];

export const navItems = [
  { id: 'home', path: '/' },
  { id: 'about', path: '/about' },
  { id: 'projects', path: '/projects' },
  { id: 'skills', path: '/skills' },
  { id: 'experience', path: '/experience' },
  { id: 'assistant', path: '/assistant' },
  { id: 'contact', path: '/contact' },
];

export const projectMeta = [
  {
    id: 'market-kigali',
    title: 'Market-Kigali',
    category: 'web',
    year: '2024',
    status: 'completed',
    featured: true,
    accent: '#3B82F6',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    links: {
      demo: 'https://witfab-dev.github.io/ecomerce/',
      github: 'https://github.com/witfab-dev/ecomerce',
    },
  },
  {
    id: 'katss',
    title: 'KATSS Website',
    category: 'web',
    year: '2023',
    status: 'live',
    featured: true,
    accent: '#22D3EE',
    image: '/images/katss.png',
    technologies: ['HTML', 'JavaScript', 'CSS', 'UI/UX'],
    links: {
      demo: 'https://witfab-dev.github.io/katss/public',
      github: 'https://github.com/witfab-dev/katss',
    },
  },
  {
    id: 'portfolio',
    title: 'Portfolio 2025',
    category: 'web',
    year: '2025',
    status: 'live',
    featured: true,
    accent: '#8B5CF6',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&auto=format&fit=crop',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
    links: {
      demo: 'https://witfab-dev.github.io/myportfolio/',
      github: 'https://github.com/witfab-dev/myportfolio',
    },
  },
  {
    id: 'pssms',
    title: 'PSSMS',
    category: 'business',
    year: '2025',
    status: 'live',
    featured: true,
    accent: '#10B981',
    image: '/images/pssms.jpg',
    technologies: ['React', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
    links: {
      demo: 'https://witfab-dev.github.io/PSSMS/',
      github: 'https://github.com/witfab-dev/PSSMS',
    },
  },
  {
    id: 'rwanda-explorer',
    title: 'Rwanda Explorer',
    category: 'experimental',
    year: '2024',
    status: 'live',
    featured: false,
    accent: '#EC4899',
    image: '/images/Screenshot%202026-04-15%20103058.png',
    technologies: ['Vue.js', 'CSS', 'Game Design', 'Animation'],
    links: {
      demo: 'https://rwanda-explorer-game.vercel.app/',
      github: 'https://github.com/witfab-dev/rwanda-explorer-game',
    },
  },
  {
    id: 'devconnect',
    title: 'DevConnect',
    category: 'web',
    year: '2025',
    status: 'development',
    featured: false,
    accent: '#06B6D4',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop',
    technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    links: { demo: null, github: null },
  },
];

export const projectFilters = ['all', 'web', 'business', 'experimental'];

export const skillGroupsMeta = [
  {
    id: 'frontend',
    skills: [
      { name: 'HTML5', color: '#E34F26' },
      { name: 'CSS3', color: '#1572B6' },
      { name: 'JavaScript', color: '#F7DF1E' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'React', color: '#61DAFB' },
      { name: 'Next.js', color: '#E5E7EB' },
      { name: 'Vue', color: '#42B883' },
      { name: 'Tailwind CSS', color: '#38BDF8' },
      { name: 'Framer Motion', color: '#D8B4FE' },
      { name: 'Three.js', color: '#049EF4' },
    ],
  },
  {
    id: 'backend',
    skills: [
      { name: 'Node.js', color: '#68A063' },
      { name: 'Express', color: '#94A3B8' },
      { name: 'Python', color: '#FFD343' },
      { name: 'REST APIs', color: '#3B82F6' },
      { name: 'GraphQL', color: '#E10098' },
      { name: 'WebSockets', color: '#22D3EE' },
    ],
  },
  {
    id: 'mobile',
    skills: [
      { name: 'React Native', color: '#61DAFB' },
      { name: 'Flutter', color: '#54C5F8' },
      { name: 'Dart', color: '#0175C2' },
      { name: 'Firebase', color: '#FFCA28' },
    ],
  },
  {
    id: 'databases',
    skills: [
      { name: 'PostgreSQL', color: '#7CA0C9' },
      { name: 'MySQL', color: '#00758F' },
      { name: 'MongoDB', color: '#47A248' },
      { name: 'Redis', color: '#DC382D' },
    ],
  },
  {
    id: 'tools',
    skills: [
      { name: 'Git', color: '#F05032' },
      { name: 'GitHub', color: '#E5E7EB' },
      { name: 'Docker', color: '#2496ED' },
      { name: 'VS Code', color: '#3B82F6' },
      { name: 'Vite', color: '#A78BFA' },
      { name: 'Vercel', color: '#E5E7EB' },
    ],
  },
  {
    id: 'design',
    skills: [
      { name: 'Figma', color: '#F24E1E' },
      { name: 'UI Design', color: '#8B5CF6' },
      { name: 'UX Thinking', color: '#22D3EE' },
      { name: 'Responsive Design', color: '#34D399' },
      { name: 'Accessibility', color: '#F472B6' },
    ],
  },
  {
    id: 'ai',
    skills: [
      { name: 'AI Integration', color: '#A78BFA' },
      { name: 'TensorFlow.js', color: '#FF6F00' },
      { name: 'WebRTC', color: '#22D3EE' },
      { name: 'PWA', color: '#5A0FC8' },
    ],
  },
];

export const experienceMeta = [
  {
    period: '2025 – Present',
    periodFr: '2025 – Aujourd’hui',
    location: 'Kigali, Rwanda',
    organization: 'Kirehe Adventist TVET School',
    type: 'fullTime',
    current: true,
    tech: ['React', 'Go', 'AWS', 'Docker', 'PostgreSQL', 'Redis'],
  },
  {
    period: '2024 – 2025',
    periodFr: '2024 – 2025',
    location: 'Kigali, Rwanda',
    organization: 'Kirehe Adventist TVET School',
    type: 'fullTime',
    current: false,
    tech: ['TypeScript', 'D3.js', 'Tailwind CSS', 'GraphQL', 'Framer Motion'],
  },
  {
    period: '2023 – 2024',
    periodFr: '2023 – 2024',
    location: 'Kigali, Rwanda',
    organization: 'Kirehe Adventist TVET School',
    type: 'internship',
    current: false,
    tech: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MySQL'],
  },
];

export const educationMeta = [
  { period: 'In progress', periodFr: 'En cours', organization: 'Kirehe Adventist TVET School' },
  { period: '2024 – 2025', periodFr: '2024 – 2025', organization: 'TVET / NESA examinations' },
  { period: 'Ongoing', periodFr: 'En continu', organization: 'Independent projects' },
];
