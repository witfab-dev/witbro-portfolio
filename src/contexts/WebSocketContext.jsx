import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

const WebSocketContext = createContext();

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [connectionError, setConnectionError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeSession, setActiveSession] = useState(null);

  // Initialize WebSocket connection
  useEffect(() => {
    setIsConnecting(true);
    setConnectionError(null);

    // Use relative path when behind Vite proxy, or fallback to explicit URL
    const socketUrl = process.env.NODE_ENV === 'development' ? '/' : 'http://localhost:3001';
    
    const newSocket = io(socketUrl, {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      autoConnect: true,
      forceNew: true,
      withCredentials: false,
      extraHeaders: {
        'X-Client-Type': 'react-portfolio'
      }
    });

    // Connection events
    newSocket.on('connect', () => {
      setIsConnected(true);
      setIsConnecting(false);
      setConnectionError(null);
      console.log('✅ WebSocket connected:', newSocket.id);
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ WebSocket connection error:', error.message);
      setConnectionError(error.message);
      setIsConnecting(false);
      
      // Auto-retry after delay
      setTimeout(() => {
        if (!newSocket.connected) {
          console.log('🔄 Attempting to reconnect...');
          newSocket.connect();
        }
      }, 3000);
    });

    newSocket.on('disconnect', (reason) => {
      setIsConnected(false);
      console.log('⚠️ WebSocket disconnected:', reason);
      
      if (reason === 'io server disconnect') {
        // Server disconnected, try to reconnect
        newSocket.connect();
      }
    });

    newSocket.on('reconnect', (attemptNumber) => {
      console.log(`♻️ Reconnected after ${attemptNumber} attempts`);
      setIsConnected(true);
      setConnectionError(null);
    });

    newSocket.on('reconnect_attempt', (attemptNumber) => {
      console.log(`🔄 Reconnection attempt ${attemptNumber}`);
    });

    newSocket.on('reconnect_error', (error) => {
      console.error('❌ Reconnection error:', error.message);
    });

    newSocket.on('reconnect_failed', () => {
      console.error('❌ Reconnection failed');
      setConnectionError('Failed to reconnect to server');
    });

    // Application events
    newSocket.on('chat-message', (message) => {
      console.log('💬 New message:', message);
      setMessages(prev => [...prev.slice(-99), message]); // Keep last 100 messages
    });

    newSocket.on('user-join', (user) => {
      console.log('👤 User joined:', user);
      setUsers(prev => {
        // Check if user already exists
        if (prev.some(u => u.id === user.id)) return prev;
        return [...prev, user];
      });
    });

    newSocket.on('user-left', (userId) => {
      console.log('👋 User left:', userId);
      setUsers(prev => prev.filter(user => user.id !== userId));
    });

    newSocket.on('code-update', (update) => {
      console.log('📝 Code update received:', update);
      window.dispatchEvent(new CustomEvent('code-update', { detail: update }));
    });

    newSocket.on('session-data', (data) => {
      console.log('📋 Session data received:', data);
      setUsers(data.users || []);
      setMessages(data.messages || []);
    });

    newSocket.on('user-joined', (user) => {
      console.log('👤 New user joined session:', user);
      setUsers(prev => [...prev, user]);
    });

    newSocket.on('session-error', (error) => {
      console.error('❌ Session error:', error);
      setConnectionError(error.message || 'Session error');
    });

    newSocket.on('users-list', (usersList) => {
      setUsers(usersList);
    });

    // Cleanup function
    const cleanup = () => {
      if (newSocket && newSocket.connected) {
        console.log('🧹 Cleaning up WebSocket connection');
        newSocket.off('connect');
        newSocket.off('connect_error');
        newSocket.off('disconnect');
        newSocket.off('reconnect');
        newSocket.off('reconnect_attempt');
        newSocket.off('reconnect_error');
        newSocket.off('reconnect_failed');
        newSocket.off('chat-message');
        newSocket.off('user-join');
        newSocket.off('user-left');
        newSocket.off('code-update');
        newSocket.off('session-data');
        newSocket.off('user-joined');
        newSocket.off('session-error');
        newSocket.off('users-list');
        newSocket.disconnect();
      }
    };

    setSocket(newSocket);

    // Check connection status after 5 seconds
    const connectionTimeout = setTimeout(() => {
      if (!newSocket.connected && isConnecting) {
        console.warn('⏰ Connection timeout - server may not be running');
        setConnectionError('Connection timeout. Make sure the server is running on port 3001.');
        setIsConnecting(false);
      }
    }, 5000);

    return () => {
      clearTimeout(connectionTimeout);
      cleanup();
    };
  }, []);

  const sendMessage = useCallback((data) => {
    if (socket && isConnected && activeSession) {
      console.log('📤 Sending message:', data);
      socket.emit('chat-message', {
        ...data,
        sessionId: activeSession
      });
    } else {
      console.warn('⚠️ Cannot send message - not connected or no active session');
    }
  }, [socket, isConnected, activeSession]);

  const updateCode = useCallback((code) => {
    if (socket && isConnected && activeSession) {
      console.log('📤 Sending code update:', code);
      socket.emit('code-update', {
        sessionId: activeSession,
        code
      });
    } else {
      console.warn('⚠️ Cannot update code - not connected or no active session');
    }
  }, [socket, isConnected, activeSession]);

  const joinSession = useCallback((sessionId, userData = {}) => {
    if (socket && isConnected) {
      console.log('🚀 Joining session:', sessionId);
      setActiveSession(sessionId);
      socket.emit('join-session', {
        sessionId,
        user: {
          id: socket.id,
          name: userData.name || `User_${socket.id.slice(0, 4)}`,
          color: userData.color || `#${Math.floor(Math.random()*16777215).toString(16)}`,
          ...userData
        }
      });
    } else {
      console.warn('⚠️ Cannot join session - not connected');
    }
  }, [socket, isConnected]);

  const leaveSession = useCallback(() => {
    if (socket && isConnected && activeSession) {
      console.log('👋 Leaving session:', activeSession);
      socket.emit('leave-session', activeSession);
      setActiveSession(null);
      setUsers([]);
      setMessages([]);
    }
  }, [socket, isConnected, activeSession]);

  const reconnect = useCallback(() => {
    if (socket) {
      console.log('🔄 Manual reconnection attempt');
      socket.connect();
    }
  }, [socket]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const value = {
    socket,
    isConnected,
    isConnecting,
    connectionError,
    messages,
    users,
    activeSession,
    sendMessage,
    updateCode,
    joinSession,
    leaveSession,
    reconnect,
    clearMessages
  };

  return (
    <WebSocketContext.Provider value={value}>
      {/* Connection status indicator */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 p-2 bg-black/80 text-white text-xs rounded">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : isConnecting ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`} />
          <span>
            {isConnected ? 'Connected' : isConnecting ? 'Connecting...' : 'Disconnected'}
          </span>
          {connectionError && (
            <span className="text-red-300 ml-2">({connectionError})</span>
          )}
        </div>
      )}
      {children}
    </WebSocketContext.Provider>
  );
};