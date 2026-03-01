import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Navigation,
  Home,
  User,
  Code2,
  Briefcase,
  Mail,
  Award,
  Globe,
  HelpCircle,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Zap,
  Search,
  Filter,
  Clock,
  Star,
  Heart,
  Bookmark,
  Share2,
  Download,
  Settings,
  Moon,
  Sun,
  Maximize2,
  Minimize2,
  ChevronUp,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  RefreshCw,
  Info,
  Terminal,
  BookOpen,
  Camera,
  Music,
  Coffee,
  Smile,
  ThumbsUp,
  Bell,
  BellOff,
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  Cpu,
  HardDrive,
  Activity
} from 'lucide-react';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [showAssistant, setShowAssistant] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recentCommands, setRecentCommands] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [confidence, setConfidence] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  const [voicePitch, setVoicePitch] = useState(1);
  const [autoOpen, setAutoOpen] = useState(true);
  const [firstVisit, setFirstVisit] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [pageHistory, setPageHistory] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [systemInfo, setSystemInfo] = useState({});
  const [commandHistory, setCommandHistory] = useState([]);
  const [commandIndex, setCommandIndex] = useState(-1);
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const inputRef = useRef(null);
  const assistantRef = useRef(null);

  // Check if browser supports speech recognition
  const isSpeechSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  
  // Initialize speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = isSpeechSupported ? new SpeechRecognition() : null;

  // Initialize speech synthesis
  const synth = window.speechSynthesis;

  // Comprehensive commands database
  const commands = [
    // Navigation Commands
    { 
      command: ['home', 'go home', 'main page', 'top', 'start'], 
      action: () => navigateTo('hero'),
      response: 'Taking you to the home section',
      icon: Home,
      category: 'navigation',
      keywords: ['home', 'main', 'top', 'start']
    },
    { 
      command: ['about', 'who are you', 'tell me about yourself', 'bio', 'information'], 
      action: () => navigateTo('about'),
      response: 'Here is the about section with my personal information',
      icon: User,
      category: 'navigation',
      keywords: ['about', 'who', 'bio', 'information']
    },
    { 
      command: ['skills', 'what can you do', 'technologies', 'tech stack', 'expertise'], 
      action: () => navigateTo('skills'),
      response: 'Showing my skills and technologies',
      icon: Code2,
      category: 'navigation',
      keywords: ['skills', 'technologies', 'tech', 'expertise']
    },
    { 
      command: ['projects', 'show projects', 'your work', 'portfolio', 'show work'], 
      action: () => navigateTo('projects'),
      response: 'Here are my featured projects',
      icon: Briefcase,
      category: 'navigation',
      keywords: ['projects', 'work', 'portfolio']
    },
    { 
      command: ['experience', 'work history', 'background', 'career', 'jobs'], 
      action: () => navigateTo('experience'),
      response: 'Here is my professional journey',
      icon: Award,
      category: 'navigation',
      keywords: ['experience', 'history', 'career', 'jobs']
    },
    { 
      command: ['contact', 'reach me', 'get in touch', 'email me', 'call me'], 
      action: () => navigateTo('contact'),
      response: 'Here is my contact information',
      icon: Mail,
      category: 'navigation',
      keywords: ['contact', 'reach', 'touch', 'email']
    },

    // Search Commands
    { 
      command: ['search', 'find', 'look for', 'search for'], 
      action: (query) => handleSearch(query),
      response: 'Searching through the portfolio',
      icon: Search,
      category: 'search',
      keywords: ['search', 'find', 'look']
    },
    { 
      command: ['search projects', 'find projects', 'project search'], 
      action: () => handleSearch('projects'),
      response: 'Searching through projects',
      icon: Search,
      category: 'search',
      keywords: ['search projects']
    },
    { 
      command: ['search skills', 'find skills', 'skill search'], 
      action: () => handleSearch('skills'),
      response: 'Searching through skills',
      icon: Search,
      category: 'search'
    },

    // Scroll Commands
    { 
      command: ['scroll up', 'go up', 'move up', 'up'], 
      action: () => window.scrollBy({ top: -500, behavior: 'smooth' }),
      response: 'Scrolling up',
      icon: ChevronUp,
      category: 'navigation'
    },
    { 
      command: ['scroll down', 'go down', 'move down', 'down'], 
      action: () => window.scrollBy({ top: 500, behavior: 'smooth' }),
      response: 'Scrolling down',
      icon: ChevronDown,
      category: 'navigation'
    },
    { 
      command: ['scroll to top', 'back to top', 'top'], 
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      response: 'Going to top',
      icon: ArrowUp,
      category: 'navigation'
    },
    { 
      command: ['scroll to bottom', 'bottom', 'go to bottom'], 
      action: () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
      response: 'Going to bottom',
      icon: ArrowDown,
      category: 'navigation'
    },

    // Theme Commands
    { 
      command: ['theme', 'dark mode', 'light mode', 'change theme', 'switch theme'], 
      action: () => toggleTheme(),
      response: 'Toggling theme',
      icon: Sun,
      category: 'settings'
    },
    { 
      command: ['dark theme', 'dark mode'], 
      action: () => setTheme('dark'),
      response: 'Switching to dark mode',
      icon: Moon,
      category: 'settings'
    },
    { 
      command: ['light theme', 'light mode'], 
      action: () => setTheme('light'),
      response: 'Switching to light mode',
      icon: Sun,
      category: 'settings'
    },

    // Voice Settings
    { 
      command: ['faster', 'speed up', 'increase speed'], 
      action: () => setVoiceSpeed(prev => Math.min(prev + 0.25, 2)),
      response: 'Voice speed increased',
      icon: Zap,
      category: 'settings'
    },
    { 
      command: ['slower', 'slow down', 'decrease speed'], 
      action: () => setVoiceSpeed(prev => Math.max(prev - 0.25, 0.5)),
      response: 'Voice speed decreased',
      icon: Loader2,
      category: 'settings'
    },
    { 
      command: ['higher pitch', 'increase pitch'], 
      action: () => setVoicePitch(prev => Math.min(prev + 0.2, 2)),
      response: 'Voice pitch increased',
      icon: ArrowUp,
      category: 'settings'
    },
    { 
      command: ['lower pitch', 'decrease pitch'], 
      action: () => setVoicePitch(prev => Math.max(prev - 0.2, 0.5)),
      response: 'Voice pitch decreased',
      icon: ArrowDown,
      category: 'settings'
    },

    // Bookmark Commands
    { 
      command: ['bookmark', 'save this', 'add bookmark'], 
      action: () => addBookmark(),
      response: 'Current page bookmarked',
      icon: Bookmark,
      category: 'bookmarks'
    },
    { 
      command: ['show bookmarks', 'my bookmarks', 'saved pages'], 
      action: () => showBookmarks(),
      response: 'Showing your bookmarks',
      icon: Star,
      category: 'bookmarks'
    },
    { 
      command: ['remove bookmark', 'delete bookmark'], 
      action: () => removeBookmark(),
      response: 'Bookmark removed',
      icon: X,
      category: 'bookmarks'
    },

    // Favorite Commands
    { 
      command: ['favorite', 'add to favorites', 'like this'], 
      action: () => addToFavorites(),
      response: 'Added to favorites',
      icon: Heart,
      category: 'favorites'
    },
    { 
      command: ['show favorites', 'my favorites'], 
      action: () => showFavorites(),
      response: 'Showing your favorites',
      icon: Star,
      category: 'favorites'
    },

    // History Commands
    { 
      command: ['back', 'go back', 'previous'], 
      action: () => goBack(),
      response: 'Going back',
      icon: ArrowLeft,
      category: 'navigation'
    },
    { 
      command: ['forward', 'go forward', 'next'], 
      action: () => goForward(),
      response: 'Going forward',
      icon: ArrowRight,
      category: 'navigation'
    },
    { 
      command: ['history', 'show history', 'recent pages'], 
      action: () => showHistory(),
      response: 'Showing page history',
      icon: Clock,
      category: 'history'
    },

    // System Commands
    { 
      command: ['status', 'system status', 'info'], 
      action: () => showSystemInfo(),
      response: 'Showing system information',
      icon: Activity,
      category: 'system'
    },
    { 
      command: ['battery', 'battery level'], 
      action: () => speak(`Battery level is ${batteryLevel} percent`),
      response: `Battery: ${batteryLevel}%`,
      icon: Battery,
      category: 'system'
    },
    { 
      command: ['network', 'connection', 'wifi'], 
      action: () => speak(isOnline ? 'You are online' : 'You are offline'),
      response: isOnline ? 'Online' : 'Offline',
      icon: Wifi,
      category: 'system'
    },

    // Share Commands
    { 
      command: ['share', 'share this', 'share page'], 
      action: () => sharePage(),
      response: 'Sharing current page',
      icon: Share2,
      category: 'share'
    },
    { 
      command: ['share on twitter', 'tweet this'], 
      action: () => shareOnTwitter(),
      response: 'Sharing on Twitter',
      icon: Twitter,
      category: 'share'
    },
    { 
      command: ['share on linkedin'], 
      action: () => shareOnLinkedIn(),
      response: 'Sharing on LinkedIn',
      icon: Linkedin,
      category: 'share'
    },

    // Download Commands
    { 
      command: ['download', 'download resume', 'get resume'], 
      action: () => downloadResume(),
      response: 'Downloading resume',
      icon: Download,
      category: 'download'
    },
    { 
      command: ['download projects', 'get projects'], 
      action: () => downloadProjects(),
      response: 'Downloading projects list',
      icon: Download,
      category: 'download'
    },

    // Notification Commands
    { 
      command: ['notifications', 'show notifications'], 
      action: () => showNotifications(),
      response: 'Showing notifications',
      icon: Bell,
      category: 'notifications'
    },
    { 
      command: ['clear notifications', 'remove notifications'], 
      action: () => clearNotifications(),
      response: 'Notifications cleared',
      icon: BellOff,
      category: 'notifications'
    },

    // Help Commands
    { 
      command: ['help', 'what can you do', 'commands', 'options'], 
      action: () => showHelp(),
      response: 'Here are the available commands',
      icon: HelpCircle,
      category: 'help'
    },
    { 
      command: ['help navigation', 'navigation commands'], 
      action: () => showCommandsByCategory('navigation'),
      response: 'Navigation commands',
      icon: Navigation,
      category: 'help'
    },
    { 
      command: ['help search', 'search commands'], 
      action: () => showCommandsByCategory('search'),
      response: 'Search commands',
      icon: Search,
      category: 'help'
    },
    { 
      command: ['help settings', 'settings commands'], 
      action: () => showCommandsByCategory('settings'),
      response: 'Settings commands',
      icon: Settings,
      category: 'help'
    },

    // Control Commands
    { 
      command: ['stop', 'cancel', 'exit', 'close'], 
      action: () => {
        stopListening();
        setShowAssistant(false);
        speak('Voice assistant closed');
      },
      response: 'Voice assistant closed',
      icon: X,
      category: 'control'
    },
    { 
      command: ['sleep', 'pause'], 
      action: () => {
        stopListening();
        speak('Voice assistant paused');
      },
      response: 'Voice assistant paused',
      icon: Moon,
      category: 'control'
    },
    { 
      command: ['wake', 'wake up', 'resume'], 
      action: () => {
        setShowAssistant(true);
        speak('Voice assistant activated');
      },
      response: 'Voice assistant activated',
      icon: Sun,
      category: 'control'
    },
    { 
      command: ['refresh', 'reload', 'update'], 
      action: () => window.location.reload(),
      response: 'Refreshing page',
      icon: RefreshCw,
      category: 'control'
    },

    // Fun Commands
    { 
      command: ['joke', 'tell me a joke', 'make me laugh'], 
      action: () => tellJoke(),
      response: 'Here is a joke',
      icon: Smile,
      category: 'fun'
    },
    { 
      command: ['fact', 'interesting fact', 'did you know'], 
      action: () => tellFact(),
      response: 'Here is an interesting fact',
      icon: Info,
      category: 'fun'
    },
    { 
      command: ['quote', 'inspirational quote'], 
      action: () => tellQuote(),
      response: 'Here is an inspirational quote',
      icon: BookOpen,
      category: 'fun'
    },
    { 
      command: ['time', 'current time', 'what time is it'], 
      action: () => tellTime(),
      response: new Date().toLocaleTimeString(),
      icon: Clock,
      category: 'fun'
    },
    { 
      command: ['date', 'today\'s date', 'what day is it'], 
      action: () => tellDate(),
      response: new Date().toLocaleDateString(),
      icon: Calendar,
      category: 'fun'
    },
    { 
      command: ['coffee', 'get coffee', 'coffee break'], 
      action: () => coffeeBreak(),
      response: 'Time for a coffee break! ☕',
      icon: Coffee,
      category: 'fun'
    },

    // Page-Specific Commands
    { 
      command: ['show project 1', 'first project'], 
      action: () => navigateToProject(1),
      response: 'Showing first project',
      icon: Briefcase,
      category: 'projects'
    },
    { 
      command: ['show project 2', 'second project'], 
      action: () => navigateToProject(2),
      response: 'Showing second project',
      icon: Briefcase,
      category: 'projects'
    },
    { 
      command: ['show project 3', 'third project'], 
      action: () => navigateToProject(3),
      response: 'Showing third project',
      icon: Briefcase,
      category: 'projects'
    },
    { 
      command: ['show all projects'], 
      action: () => navigateTo('projects'),
      response: 'Showing all projects',
      icon: Briefcase,
      category: 'projects'
    }
  ];

  // Jokes database
  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "Why did the developer go broke? Because he used up all his cache!",
    "What's a programmer's favorite place? The Foo Bar!",
    "Why do Java developers wear glasses? Because they can't C#!",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem!"
  ];

  // Facts database
  const facts = [
    "The first computer virus was created in 1983.",
    "The average developer spends 25% of their time fixing bugs.",
    "There are over 700 programming languages in existence.",
    "The first website is still online at info.cern.ch.",
    "JavaScript was created in just 10 days."
  ];

  // Quotes database
  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Code is like humor. When you have to explain it, it's bad. - Cory House",
    "First, solve the problem. Then, write the code. - John Johnson",
    "Make it work, make it right, make it fast. - Kent Beck",
    "Programming isn't about what you know; it's about what you can figure out. - Chris Pine"
  ];

  // Configure recognition
  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 3;

    recognition.onstart = () => {
      setIsListening(true);
      addNotification('Listening...', 'info');
    };

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.toLowerCase();
      const confidence = event.results[last][0].confidence;
      
      setTranscript(command);
      setConfidence(confidence);
      
      // Show interim results
      if (event.results[last].isFinal) {
        processCommand(command);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setResponse(`Error: ${event.error}. Please try again.`);
      addNotification(`Error: ${event.error}`, 'error');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      addNotification('You are back online', 'success');
    };
    const handleOffline = () => {
      setIsOnline(false);
      addNotification('You are offline', 'warning');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Get battery level
  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(Math.round(battery.level * 100));
        
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      });
    }
  }, []);

  // Track page views
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setCurrentPage(section);
            setPageHistory(prev => {
              const newHistory = [...prev, section];
              return newHistory.slice(-10); // Keep last 10 pages
            });
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-open on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited && autoOpen) {
      setTimeout(() => {
        setShowAssistant(true);
        speak('Welcome to my portfolio! I am your voice assistant. Say help to see what I can do.');
        addNotification('Welcome! Try saying "Help"', 'success');
        localStorage.setItem('hasVisited', 'true');
      }, 3000);
    }
  }, [autoOpen]);

  // Keyboard navigation for command history
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showAssistant) return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCommandIndex(prev => {
          const newIndex = Math.min(prev + 1, commandHistory.length - 1);
          if (newIndex >= 0) {
            setTranscript(commandHistory[newIndex]);
          }
          return newIndex;
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCommandIndex(prev => {
          const newIndex = Math.max(prev - 1, -1);
          if (newIndex >= 0) {
            setTranscript(commandHistory[newIndex]);
          } else {
            setTranscript('');
          }
          return newIndex;
        });
      } else if (e.key === 'Enter' && transcript) {
        processCommand(transcript);
        setCommandHistory(prev => [transcript, ...prev].slice(0, 20));
        setCommandIndex(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAssistant, transcript, commandHistory]);

  // Scroll tracking for current page
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCurrentPage(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Navigate to section
  const navigateTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentPage(sectionId);
      setPageHistory(prev => [...prev, sectionId].slice(-10));
    }
  };

  // Navigate to specific project
  const navigateToProject = (projectId) => {
    navigateTo('projects');
    // Find project card and highlight it
    setTimeout(() => {
      const projectCards = document.querySelectorAll('[data-project-id]');
      if (projectCards[projectId - 1]) {
        projectCards[projectId - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        projectCards[projectId - 1].classList.add('ring-4', 'ring-blue-500', 'scale-105');
        setTimeout(() => {
          projectCards[projectId - 1].classList.remove('ring-4', 'ring-blue-500', 'scale-105');
        }, 2000);
      }
    }, 500);
  };

  // Search functionality
  const handleSearch = (query) => {
    setShowSearchResults(true);
    const results = [];
    
    // Search in all sections
    const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
    
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const text = element.innerText.toLowerCase();
        if (text.includes(query.toLowerCase())) {
          results.push({
            section: sectionId,
            text: element.innerText.substring(0, 100) + '...',
            element: element
          });
        }
      }
    });

    // Search in projects
    const projectElements = document.querySelectorAll('[data-project-title]');
    projectElements.forEach(el => {
      const title = el.getAttribute('data-project-title');
      if (title && title.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          section: 'projects',
          text: `Project: ${title}`,
          element: el
        });
      }
    });

    setSearchResults(results);
    
    if (results.length === 0) {
      setResponse(`No results found for "${query}"`);
      speak(`No results found for ${query}`);
    } else {
      setResponse(`Found ${results.length} results for "${query}"`);
      speak(`Found ${results.length} results for ${query}`);
    }
  };

  // Navigate to search result
  const navigateToResult = (result) => {
    if (result.element) {
      result.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      result.element.classList.add('ring-4', 'ring-green-500');
      setTimeout(() => {
        result.element.classList.remove('ring-4', 'ring-green-500');
      }, 2000);
    }
    setShowSearchResults(false);
  };

  // Bookmark functions
  const addBookmark = () => {
    const bookmark = {
      id: Date.now(),
      page: currentPage,
      title: document.title,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };
    setBookmarks(prev => [...prev, bookmark]);
    localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, bookmark]));
    addNotification('Page bookmarked', 'success');
  };

  const removeBookmark = () => {
    setBookmarks(prev => prev.filter(b => b.page !== currentPage));
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks.filter(b => b.page !== currentPage)));
    addNotification('Bookmark removed', 'info');
  };

  const showBookmarks = () => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarks(savedBookmarks);
    
    if (savedBookmarks.length === 0) {
      speak('You have no bookmarks yet');
    } else {
      speak(`You have ${savedBookmarks.length} bookmarks`);
    }
  };

  // Favorites functions
  const addToFavorites = () => {
    setFavorites(prev => [...prev, currentPage]);
    localStorage.setItem('favorites', JSON.stringify([...favorites, currentPage]));
    addNotification('Added to favorites', 'success');
  };

  const showFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
    
    if (savedFavorites.length === 0) {
      speak('You have no favorites yet');
    } else {
      speak(`You have ${savedFavorites.length} favorites`);
    }
  };

  // History functions
  const goBack = () => {
    if (pageHistory.length > 1) {
      const prevPage = pageHistory[pageHistory.length - 2];
      navigateTo(prevPage);
    }
  };

  const goForward = () => {
    // Implement forward navigation if needed
  };

  const showHistory = () => {
    if (pageHistory.length === 0) {
      speak('No page history');
    } else {
      speak(`You visited ${pageHistory.length} pages`);
    }
  };

  // System info
  const showSystemInfo = () => {
    const info = {
      browser: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      online: isOnline,
      battery: batteryLevel,
      screen: `${window.screen.width}x${window.screen.height}`,
      memory: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'Unknown'
    };
    setSystemInfo(info);
    
    speak(`System info: ${info.platform}, Battery at ${info.battery} percent`);
  };

  // Share functions
  const sharePage = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: 'Check out my portfolio!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addNotification('Link copied to clipboard', 'success');
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent('Check out this amazing portfolio!');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  // Download functions
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Witness_Fabrice_Resume.pdf';
    link.click();
    addNotification('Resume downloaded', 'success');
  };

  const downloadProjects = () => {
    // Create a simple text file with projects
    const projects = document.querySelectorAll('[data-project-title]');
    let content = 'My Projects:\n\n';
    projects.forEach((p, i) => {
      content += `${i + 1}. ${p.getAttribute('data-project-title')}\n`;
    });
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'projects.txt';
    link.click();
    URL.revokeObjectURL(url);
    addNotification('Projects list downloaded', 'success');
  };

  // Notification functions
  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [notification, ...prev].slice(0, 5));
  };

  const showNotifications = () => {
    if (notifications.length === 0) {
      speak('No notifications');
    } else {
      speak(`You have ${notifications.length} notifications`);
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
    addNotification('Notifications cleared', 'info');
  };

  // Fun functions
  const tellJoke = () => {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    setResponse(joke);
    speak(joke);
  };

  const tellFact = () => {
    const fact = facts[Math.floor(Math.random() * facts.length)];
    setResponse(fact);
    speak(fact);
  };

  const tellQuote = () => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    setResponse(quote);
    speak(quote);
  };

  const tellTime = () => {
    const time = new Date().toLocaleTimeString();
    setResponse(`The current time is ${time}`);
    speak(`The current time is ${time}`);
  };

  const tellDate = () => {
    const date = new Date().toLocaleDateString();
    setResponse(`Today's date is ${date}`);
    speak(`Today's date is ${date}`);
  };

  const coffeeBreak = () => {
    setResponse('Time for a coffee break! ☕');
    speak('Time for a coffee break!');
    addNotification('Coffee break! ☕', 'success');
  };

  // Theme functions
  const toggleTheme = () => {
    document.body.classList.toggle('dark');
    addNotification('Theme toggled', 'success');
  };

  const setTheme = (theme) => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    addNotification(`${theme} mode activated`, 'success');
  };

  // Help functions
  const showHelp = () => {
    const categories = [...new Set(commands.map(c => c.category))];
    const helpText = `Available categories: ${categories.join(', ')}. Say "help" followed by a category for specific commands.`;
    setResponse(helpText);
    speak(helpText);
    
    setSuggestions(categories.map(cat => ({
      command: [`help ${cat}`],
      icon: HelpCircle,
      category: cat
    })));
  };

  const showCommandsByCategory = (category) => {
    const categoryCommands = commands.filter(c => c.category === category);
    const commandList = categoryCommands.map(c => c.command[0]).join(', ');
    setResponse(`${category} commands: ${commandList}`);
    speak(`${category} commands: ${commandList}`);
    
    setSuggestions(categoryCommands.slice(0, 5));
  };

  // Process voice command
  const processCommand = (command) => {
    let matched = false;
    
    // Add to recent commands
    setRecentCommands(prev => [command, ...prev].slice(0, 10));
    setCommandHistory(prev => [command, ...prev].slice(0, 20));
    
    // Extract potential search query
    if (command.startsWith('search ') || command.startsWith('find ')) {
      const query = command.replace(/^(search|find)\s+/, '');
      handleSearch(query);
      matched = true;
    } else {
      // Check each command
      for (const cmd of commands) {
        if (cmd.command.some(c => command.includes(c))) {
          cmd.action(command);
          setResponse(cmd.response);
          speak(cmd.response);
          
          // Show suggestions based on category
          showSuggestions(cmd.category);
          
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      setResponse("I didn't understand that command. Say 'help' to see available commands.");
      speak("I didn't understand that command. Say help to see available commands.");
      showSuggestions('help');
    }

    // Auto-hide response after 5 seconds
    setTimeout(() => {
      setResponse('');
    }, 5000);
  };

  // Speak text
  const speak = (text) => {
    if (synth && !isSpeaking) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = voiceSpeed;
      utterance.pitch = voicePitch;
      utterance.volume = 1;
      utterance.lang = 'en-US';
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synth.speak(utterance);
    }
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (synth) {
      synth.cancel();
      setIsSpeaking(false);
    }
  };

  // Start listening
  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript('');
      setResponse('');
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      alert('Speech recognition is not supported in your browser');
    }
  };

  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Show suggestions based on category
  const showSuggestions = (category) => {
    const categoryCommands = commands.filter(c => c.category === category);
    setSuggestions(categoryCommands.slice(0, 5));
    
    setTimeout(() => {
      setSuggestions([]);
    }, 10000);
  };

  // Keyboard shortcut (Ctrl+M) to toggle assistant
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        setShowAssistant(prev => !prev);
      } else if (e.ctrlKey && e.key === 'l' && showAssistant) {
        e.preventDefault();
        startListening();
      } else if (e.key === 'Escape' && showAssistant) {
        setShowAssistant(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAssistant]);

  if (!showAssistant) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowAssistant(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg z-50 group"
        title="Open Voice Assistant (Ctrl+M)"
      >
        <Mic className="w-6 h-6" />
        <span className="absolute -top-8 right-0 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Ctrl+M
        </span>
        {isListening && (
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></span>
        )}
      </motion.button>
    );
  }

  return (
    <motion.div
      ref={assistantRef}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="fixed bottom-6 right-6 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <h3 className="font-semibold">Voice Assistant</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-white/20 px-2 py-1 rounded">
              {isOnline ? <Wifi className="w-3 h-3 inline" /> : <WifiOff className="w-3 h-3 inline" />}
            </span>
            <span className="text-xs bg-white/20 px-2 py-1 rounded">
              <Battery className={`w-3 h-3 inline ${batteryLevel < 20 ? 'text-red-300' : ''}`} />
              {batteryLevel}%
            </span>
            <button
              onClick={() => setShowAssistant(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-white/80">Press Ctrl+M to toggle • Ctrl+L to listen</p>
          <p className="text-xs text-white/80">Current: {currentPage}</p>
        </div>
      </div>

      {/* Status & Transcript */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {isListening ? 'Listening...' : 'Click mic or say "wake" to start'}
          </span>
          {isListening && (
            <span className="text-xs text-gray-500 ml-auto">
              Confidence: {Math.round(confidence * 100)}%
            </span>
          )}
        </div>
        
        {/* Voice Wave Animation */}
        {isListening && (
          <div className="flex justify-center gap-1 my-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 bg-blue-500 rounded-full"
                animate={{ height: [10, 30, 10] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        )}
        
        {transcript && (
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2">
            <p className="text-sm text-gray-800 dark:text-gray-200">
              You said: "{transcript}"
            </p>
          </div>
        )}
        
        {response && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {response}
            </p>
          </div>
        )}
      </div>

      {/* Search Results */}
      <AnimatePresence>
        {showSearchResults && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 border-b border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto"
          >
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
              <Search className="w-3 h-3" />
              Search Results ({searchResults.length})
            </h4>
            <div className="space-y-2">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => navigateToResult(result)}
                  className="w-full text-left p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <p className="text-xs font-medium text-gray-900 dark:text-white">
                    {result.section}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {result.text}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestions */}
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 border-b border-gray-200 dark:border-gray-700"
          >
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Suggested commands:
            </h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => {
                const Icon = suggestion.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (suggestion.command) {
                        processCommand(suggestion.command[0]);
                      }
                    }}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-1"
                  >
                    <Icon className="w-3 h-3" />
                    {suggestion.command ? suggestion.command[0] : suggestion.category}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Stats */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <Clock className="w-4 h-4 mx-auto mb-1 text-blue-500" />
            <p className="text-xs font-medium">{recentCommands.length}</p>
            <p className="text-[10px] text-gray-500">Commands</p>
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <Bookmark className="w-4 h-4 mx-auto mb-1 text-purple-500" />
            <p className="text-xs font-medium">{bookmarks.length}</p>
            <p className="text-[10px] text-gray-500">Bookmarks</p>
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <Heart className="w-4 h-4 mx-auto mb-1 text-red-500" />
            <p className="text-xs font-medium">{favorites.length}</p>
            <p className="text-[10px] text-gray-500">Favorites</p>
          </div>
          <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <Bell className="w-4 h-4 mx-auto mb-1 text-yellow-500" />
            <p className="text-xs font-medium">{notifications.length}</p>
            <p className="text-[10px] text-gray-500">Alerts</p>
          </div>
        </div>
      </div>

      {/* Recent Commands */}
      {recentCommands.length > 0 && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Recent commands:
          </h4>
          <div className="space-y-1 max-h-20 overflow-y-auto">
            {recentCommands.map((cmd, index) => (
              <div key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span className="truncate">{cmd}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Voice Settings */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
          <Settings className="w-3 h-3" />
          Voice Settings
        </h4>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Speed</span>
              <span>{voiceSpeed}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.25"
              value={voiceSpeed}
              onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Pitch</span>
              <span>{voicePitch}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={voicePitch}
              onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={isListening ? stopListening : startListening}
            className={`p-3 rounded-full ${
              isListening 
                ? 'bg-red-500 text-white' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
            }`}
            title={isListening ? 'Stop listening' : 'Start listening'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={isSpeaking ? stopSpeaking : () => speak(response || 'How can I help you?')}
            className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full"
            title={isSpeaking ? 'Stop speaking' : 'Repeat last response'}
          >
            {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full"
            title="Go to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowAssistant(false)}
            className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full"
            title="Close"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* System Info */}
      {Object.keys(systemInfo).length > 0 && (
        <div className="p-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
          <p className="text-[10px] text-gray-500 dark:text-gray-400">
            {systemInfo.platform} • {systemInfo.memory} RAM • {systemInfo.screen}
          </p>
        </div>
      )}

      {/* Status Message */}
      {!isSpeechSupported && (
        <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 text-xs text-center">
          Speech recognition is not supported in your browser
        </div>
      )}
    </motion.div>
  );
};

export default VoiceAssistant;