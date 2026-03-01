import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useWebSocket } from './WebSocketContext';

const CollaborationContext = createContext();

export const useCollaboration = () => useContext(CollaborationContext);

export const CollaborationProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [code, setCode] = useState(`// Collaborative coding session
// Multiple users can edit simultaneously

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Try editing this code with others!
console.log("Welcome to collaborative coding!");`);
  const [snapshots, setSnapshots] = useState([]);
  
  const { socket, isConnected, sendMessage: wsSendMessage, updateCode: wsUpdateCode } = useWebSocket();

  const startSession = useCallback(() => {
    const newSessionId = `session_${uuidv4().slice(0, 8)}`;
    setSessionId(newSessionId);
    
    const userId = `user_${uuidv4().slice(0, 8)}`;
    const userColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    
    setUsers(prev => [...prev, {
      id: userId,
      color: userColor,
      name: `User ${prev.length + 1}`,
      isCurrent: true
    }]);
    
    // Send system message
    const systemMessage = {
      id: uuidv4(),
      type: 'system',
      content: 'Session started. Invite others to join!',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, systemMessage]);
    
    // Join WebSocket session
    if (socket && isConnected) {
      socket.emit('join-session', newSessionId);
    }
  }, [socket, isConnected]);

  const sendMessage = useCallback((content) => {
    const message = {
      id: uuidv4(),
      type: 'user',
      content,
      user: 'You',
      isCurrentUser: true,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, message]);
    
    // Send via WebSocket
    if (socket && isConnected && sessionId) {
      wsSendMessage({
        sessionId,
        message: content,
        user: 'You'
      });
    }
  }, [socket, isConnected, sessionId, wsSendMessage]);

  const updateCode = useCallback((newCode) => {
    setCode(newCode);
    
    // Broadcast update via WebSocket
    if (socket && isConnected && sessionId) {
      wsUpdateCode({
        sessionId,
        code: newCode
      });
    }
  }, [socket, isConnected, sessionId, wsUpdateCode]);

  const saveSnapshot = useCallback((codeSnapshot) => {
    const snapshot = {
      id: uuidv4(),
      code: codeSnapshot,
      timestamp: new Date().toISOString(),
      user: 'You'
    };
    
    setSnapshots(prev => [snapshot, ...prev.slice(0, 9)]);
  }, []);

  const loadSnapshot = useCallback((snapshotId) => {
    const snapshot = snapshots.find(s => s.id === snapshotId);
    if (snapshot) {
      setCode(snapshot.code);
    }
  }, [snapshots]);

  // Listen for incoming messages
  React.useEffect(() => {
    if (!socket) return;

    const handleChatMessage = (data) => {
      if (data.user !== 'You') {
        setMessages(prev => [...prev, {
          id: uuidv4(),
          type: 'user',
          content: data.message,
          user: data.user,
          isCurrentUser: false,
          timestamp: new Date().toISOString()
        }]);
      }
    };

    socket.on('chat-message', handleChatMessage);

    return () => {
      socket.off('chat-message', handleChatMessage);
    };
  }, [socket]);

  const value = {
    sessionId,
    users,
    messages,
    code,
    snapshots,
    isConnected,
    startSession,
    sendMessage,
    updateCode,
    saveSnapshot,
    loadSnapshot
  };

  return (
    <CollaborationContext.Provider value={value}>
      {children}
    </CollaborationContext.Provider>
  );
};