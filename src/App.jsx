import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import VoiceAssistant from './components/ui/VoiceAssistant';
import ConfettiCanvas from './components/ui/ConfettiCanvas';
import ThemeToggle from './components/ui/ThemeToggle';
import LanguageSelector from './components/ui/LanguageSelector';
import { 
  Loader2, 
  CheckCircle2, 
  Sparkles, 
  Palette, 
  Rocket, 
  Zap,
  Code2,
  Eye,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Activity,
  Mic
} from 'lucide-react';

// Lazy load sections
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Projects = lazy(() => import('./components/sections/Projects'));
const SkillsGalaxy = lazy(() => import('./components/sections/SkillsGalaxy'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Contact = lazy(() => import('./components/sections/Contact'));

// Handle image import with fallback
let profileImage;
try {
  profileImage = new URL('../images/wit.png', import.meta.url).href;
} catch (e) {
  console.log('Profile image not found, using fallback');
  profileImage = null;
}

// Loading component with profile image and name
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    { icon: Sparkles, text: "Loading interactive features..." },
    { icon: Palette, text: "Applying beautiful themes..." },
    { icon: Rocket, text: "Optimizing performance..." },
    { icon: Zap, text: "Almost ready..." },
    { icon: CheckCircle2, text: "Welcome to my portfolio!" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tipIndex = Math.floor((progress / 100) * tips.length);
    setCurrentTip(Math.min(tipIndex, tips.length - 1));
  }, [progress]);

  const fallbackImage = `https://ui-avatars.com/api/?name=Witness+Fabrice&size=200&background=3b82f6&color=fff&bold=true&length=2`;
  const CurrentTipIcon = tips[currentTip].icon;
  const imageSrc = imageError ? fallbackImage : (profileImage || fallbackImage);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center z-50">
      <div className="text-center px-4 w-full max-w-md">
        {/* Profile Image with Animation */}
        <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 mb-6 group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse opacity-30"></div>
          
          <div className="relative w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
              <img 
                src={imageSrc}
                alt="Witness Fabrice"
                className="w-full h-full object-cover"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </div>
          </div>
          
          {imageLoaded && !imageError && (
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Witness Fabrice
        </h1>

        <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300 mb-8">
          <Code2 className="w-4 h-4" />
          <span className="text-sm sm:text-base">Full-Stack Developer</span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{progress}% loaded</span>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 mt-8">
          <CurrentTipIcon className="w-4 h-4 text-blue-500 animate-pulse" />
          <span className="text-xs sm:text-sm">{tips[currentTip].text}</span>
        </div>

        <div className="mt-12 flex justify-center gap-3">
          {[Github, Linkedin, Twitter, Mail].map((Icon, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center opacity-50"
            >
              <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </div>
          ))}
        </div>

        {/* Voice Assistant Hint */}
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-500 flex items-center justify-center gap-1">
          <Mic className="w-3 h-3" />
          <span>Try saying "Help" or press Ctrl+M</span>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);

  useEffect(() => {
    // Initialize AOS
    import('aos').then((AOS) => {
      AOS.init({
        duration: 800,
        once: true,
        offset: 100,
      });
    });

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Automatically open voice assistant after loading
  useEffect(() => {
    if (!loading) {
      // Check if user has visited before
      const hasVisited = localStorage.getItem('hasVisited');
      
      if (!hasVisited) {
        // First visit - open voice assistant after 1 second
        setTimeout(() => {
          setShowVoiceAssistant(true);
          localStorage.setItem('hasVisited', 'true');
        }, 1000);
      }
    }
  }, [loading]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-primary">
          {/* Optional UI elements */}
          {/* <CustomCursor /> */}
          {/* <ConfettiCanvas /> */}
          
          {/* Voice Assistant - Automatically opens on first visit */}
          <VoiceAssistant 
            autoOpen={showVoiceAssistant} 
            onClose={() => setShowVoiceAssistant(false)}
          />
          
          <Header />

          <main className="relative z-10">
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Loading section...</p>
                </div>
              </div>
            }>
              {/* All sections with proper IDs for navigation */}
              <Hero />
              <About />
              <Projects />
              <SkillsGalaxy />
              <Experience />
              <Contact />
            </Suspense>
          </main>

          <Footer />
          

          {/* Quick voice command hint */}
          <div className="fixed bottom-6 left-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700 z-40 hidden md:block">
            <p className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <Mic className="w-3 h-3 text-blue-500" />
              <span>Try voice commands: "Go to projects", "Show skills", "Contact me"</span>
              <span className="text-gray-400 text-[10px]">(Ctrl+M)</span>
            </p>
          </div>

          {/* Manual voice assistant button (appears when assistant is closed) */}
          {!showVoiceAssistant && (
            <button
              onClick={() => setShowVoiceAssistant(true)}
              className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg z-50 hover:scale-110 transition-transform"
              title="Open Voice Assistant"
            >
              <Mic className="w-6 h-6" />
            </button>
          )}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;