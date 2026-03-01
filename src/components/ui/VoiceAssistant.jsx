import React, { useState, useEffect, useCallback } from 'react';
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
  Zap
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

  // Check if browser supports speech recognition
  const isSpeechSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  
  // Initialize speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = isSpeechSupported ? new SpeechRecognition() : null;

  // Initialize speech synthesis
  const synth = window.speechSynthesis;

  // Available commands
  const commands = [
    { 
      command: ['home', 'go home', 'main page'], 
      action: () => scrollToSection('hero'),
      response: 'Taking you to the home section',
      icon: Home,
      category: 'navigation'
    },
    { 
      command: ['about', 'who are you', 'tell me about yourself'], 
      action: () => scrollToSection('about'),
      response: 'Here is the about section',
      icon: User,
      category: 'navigation'
    },
    { 
      command: ['skills', 'what can you do', 'technologies'], 
      action: () => scrollToSection('skills'),
      response: 'Showing my skills and technologies',
      icon: Code2,
      category: 'navigation'
    },
    { 
      command: ['projects', 'show projects', 'your work'], 
      action: () => scrollToSection('projects'),
      response: 'Here are my featured projects',
      icon: Briefcase,
      category: 'navigation'
    },
    { 
      command: ['experience', 'work history', 'background'], 
      action: () => scrollToSection('experience'),
      response: 'Here is my professional journey',
      icon: Award,
      category: 'navigation'
    },
    { 
      command: ['contact', 'reach me', 'get in touch'], 
      action: () => scrollToSection('contact'),
      response: 'Here is my contact information',
      icon: Mail,
      category: 'navigation'
    },
    { 
      command: ['scroll up', 'go up', 'back to top'], 
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      response: 'Scrolling to top',
      icon: Navigation,
      category: 'navigation'
    },
    { 
      command: ['scroll down', 'go down'], 
      action: () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
      response: 'Scrolling to bottom',
      icon: Navigation,
      category: 'navigation'
    },
    { 
      command: ['theme', 'dark mode', 'light mode', 'change theme'], 
      action: () => toggleTheme(),
      response: 'Toggling theme',
      icon: Sparkles,
      category: 'settings'
    },
    { 
      command: ['help', 'what can you do', 'commands'], 
      action: () => showHelp(),
      response: 'Here are the available commands',
      icon: HelpCircle,
      category: 'help'
    },
    { 
      command: ['stop', 'cancel', 'exit'], 
      action: () => {
        stopListening();
        speak('Voice assistant deactivated');
      },
      response: 'Voice assistant deactivated',
      icon: MicOff,
      category: 'control'
    }
  ];

  // Configure recognition
  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      const confidence = event.results[0][0].confidence;
      setTranscript(command);
      setConfidence(confidence);
      processCommand(command);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setResponse(`Error: ${event.error}. Please try again.`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }

  // Toggle theme function (if you have theme context)
  const toggleTheme = () => {
    // Implement your theme toggle logic here
    document.body.classList.toggle('dark');
  };

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Process voice command
  const processCommand = (command) => {
    let matched = false;
    
    // Add to recent commands
    setRecentCommands(prev => [command, ...prev].slice(0, 5));

    // Check each command
    for (const cmd of commands) {
      if (cmd.command.some(c => command.includes(c))) {
        cmd.action();
        setResponse(cmd.response);
        speak(cmd.response);
        
        // Show suggestions based on category
        showSuggestions(cmd.category);
        
        matched = true;
        break;
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
      utterance.rate = 1;
      utterance.pitch = 1;
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
    if (recognition) {
      setTranscript('');
      setResponse('');
      setIsListening(true);
      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser');
    }
  };

  // Stop listening
  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  // Show suggestions based on category
  const showSuggestions = (category) => {
    const categoryCommands = commands.filter(c => c.category === category);
    setSuggestions(categoryCommands.slice(0, 3));
    
    // Clear suggestions after 10 seconds
    setTimeout(() => {
      setSuggestions([]);
    }, 10000);
  };

  // Show help
  const showHelp = () => {
    const allCommands = commands.map(c => c.command[0]).join(', ');
    setResponse(`Available commands: ${allCommands}`);
  };

  // Keyboard shortcut (Ctrl+M) to toggle assistant
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        setShowAssistant(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="fixed bottom-6 right-6 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <h3 className="font-semibold">Voice Assistant</h3>
          </div>
          <button
            onClick={() => setShowAssistant(false)}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-white/80 mt-1">Press Ctrl+M to toggle</p>
      </div>

      {/* Status & Transcript */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {isListening ? 'Listening...' : 'Click mic to start'}
          </span>
          {isListening && (
            <span className="text-xs text-gray-500 ml-auto">
              Confidence: {Math.round(confidence * 100)}%
            </span>
          )}
        </div>
        
        {transcript && (
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg mb-2">
            <p className="text-sm text-gray-800 dark:text-gray-200">
              You said: "{transcript}"
            </p>
          </div>
        )}
        
        {response && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {response}
            </p>
          </div>
        )}
      </div>

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
                      suggestion.action();
                      setResponse(suggestion.response);
                      speak(suggestion.response);
                    }}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-1"
                  >
                    <Icon className="w-3 h-3" />
                    {suggestion.command[0]}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Commands */}
      {recentCommands.length > 0 && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Recent commands:
          </h4>
          <div className="space-y-1">
            {recentCommands.map((cmd, index) => (
              <div key={index} className="text-xs text-gray-600 dark:text-gray-400">
                • {cmd}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Commands Grid */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 max-h-40 overflow-y-auto">
        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
          Quick commands:
        </h4>
        <div className="grid grid-cols-2 gap-1">
          {commands.slice(0, 6).map((cmd, index) => {
            const Icon = cmd.icon;
            return (
              <button
                key={index}
                onClick={() => {
                  cmd.action();
                  setResponse(cmd.response);
                  speak(cmd.response);
                }}
                className="px-2 py-1 bg-gray-50 dark:bg-gray-700/50 rounded text-xs text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
              >
                <Icon className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{cmd.command[0]}</span>
              </button>
            );
          })}
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
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={showHelp}
          className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full"
          title="Help"
        >
          <HelpCircle className="w-5 h-5" />
        </motion.button>
      </div>

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