'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CollaborationUser {
  id: string;
  name: string;
  avatar: string;
  cognitiveScore: number;
  status: 'online' | 'in-game' | 'offline';
  brainwaveData: {
    focus: number;
    stress: number;
    flow: number;
  };
}

interface MemoryChallenge {
  id: string;
  title: string;
  type: 'sequence' | 'pattern' | 'spatial' | 'verbal';
  difficulty: number;
  participants: string[];
  status: 'active' | 'completed' | 'waiting';
  startTime?: number;
  scores: Record<string, number>;
}

interface MultiUserCollaborationProps {
  currentUserId: string;
  userName: string;
  onChallengeStart: (challenge: MemoryChallenge) => void;
}

export default function MultiUserCollaboration({ 
  currentUserId, 
  userName, 
  onChallengeStart 
}: MultiUserCollaborationProps) {
  const [connectedUsers, setConnectedUsers] = useState<CollaborationUser[]>([]);
  const [activeChallenges, setActiveChallenges] = useState<MemoryChallenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<MemoryChallenge | null>(null);
  const [isCreatingChallenge, setIsCreatingChallenge] = useState(false);
  const [realTimeChat, setRealTimeChat] = useState<Array<{
    id: string;
    userId: string;
    userName: string;
    message: string;
    timestamp: number;
    type: 'message' | 'challenge' | 'achievement';
  }>>([]);
  const [chatMessage, setChatMessage] = useState('');

  // Simulate connected users
  useEffect(() => {
    const simulatedUsers: CollaborationUser[] = [
      {
        id: 'user1',
        name: 'Dr. Sarah Chen',
        avatar: '👩‍🔬',
        cognitiveScore: 1247,
        status: 'online',
        brainwaveData: { focus: 89, stress: 23, flow: 92 }
      },
      {
        id: 'user2',
        name: 'Marcus Rodriguez',
        avatar: '🧑‍💻',
        cognitiveScore: 1156,
        status: 'in-game',
        brainwaveData: { focus: 76, stress: 34, flow: 81 }
      },
      {
        id: 'user3',
        name: 'Elena Kowalski',
        avatar: '👩‍🎓',
        cognitiveScore: 1324,
        status: 'online',
        brainwaveData: { focus: 94, stress: 18, flow: 88 }
      },
      {
        id: 'user4',
        name: 'Dr. James Park',
        avatar: '👨‍⚕️',
        cognitiveScore: 1189,
        status: 'offline',
        brainwaveData: { focus: 0, stress: 0, flow: 0 }
      }
    ];

    setConnectedUsers(simulatedUsers);

    // Simulate initial challenges
    const initialChallenges: MemoryChallenge[] = [
      {
        id: 'challenge1',
        title: 'Synchronized Memory Palace',
        type: 'spatial',
        difficulty: 75,
        participants: ['user1', 'user2'],
        status: 'active',
        startTime: Date.now() - 300000,
        scores: { user1: 847, user2: 723 }
      },
      {
        id: 'challenge2',
        title: 'Pattern Recognition Relay',
        type: 'pattern',
        difficulty: 60,
        participants: ['user3'],
        status: 'waiting',
        scores: {}
      }
    ];

    setActiveChallenges(initialChallenges);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setConnectedUsers(prev => prev.map(user => ({
        ...user,
        brainwaveData: {
          focus: Math.max(10, Math.min(100, user.brainwaveData.focus + (Math.random() - 0.5) * 10)),
          stress: Math.max(0, Math.min(100, user.brainwaveData.stress + (Math.random() - 0.5) * 8)),
          flow: Math.max(10, Math.min(100, user.brainwaveData.flow + (Math.random() - 0.5) * 6))
        }
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const challengeTypes = [
    {
      type: 'sequence' as const,
      title: 'Sequence Memory Challenge',
      description: 'Collaborative sequence memorization with EEG synchronization',
      icon: '🔗',
      minParticipants: 2,
      maxParticipants: 4
    },
    {
      type: 'pattern' as const,
      title: 'Neural Pattern Recognition',
      description: 'Shared pattern recognition with brainwave correlation',
      icon: '🧩',
      minParticipants: 2,
      maxParticipants: 6
    },
    {
      type: 'spatial' as const,
      title: '3D Memory Palace Collaboration',
      description: 'Build shared memory palaces in virtual reality',
      icon: '🏛️',
      minParticipants: 2,
      maxParticipants: 8
    },
    {
      type: 'verbal' as const,
      title: 'Linguistic Memory Networks',
      description: 'Collaborative word association and memory chains',
      icon: '💬',
      minParticipants: 3,
      maxParticipants: 10
    }
  ];

  const createNewChallenge = useCallback((type: MemoryChallenge['type']) => {
    const challengeType = challengeTypes.find(ct => ct.type === type);
    if (!challengeType) return;

    const newChallenge: MemoryChallenge = {
      id: `challenge_${Date.now()}`,
      title: challengeType.title,
      type,
      difficulty: 50,
      participants: [currentUserId],
      status: 'waiting',
      scores: {}
    };

    setActiveChallenges(prev => [...prev, newChallenge]);
    setSelectedChallenge(newChallenge);
    setIsCreatingChallenge(false);

    // Add to chat
    setRealTimeChat(prev => [...prev, {
      id: `chat_${Date.now()}`,
      userId: currentUserId,
      userName,
      message: `Created new challenge: ${challengeType.title}`,
      timestamp: Date.now(),
      type: 'challenge'
    }]);
  }, [currentUserId, userName, challengeTypes]);

  const joinChallenge = useCallback((challengeId: string) => {
    setActiveChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId && !challenge.participants.includes(currentUserId)
        ? { ...challenge, participants: [...challenge.participants, currentUserId] }
        : challenge
    ));

    const challenge = activeChallenges.find(c => c.id === challengeId);
    if (challenge) {
      setRealTimeChat(prev => [...prev, {
        id: `chat_${Date.now()}`,
        userId: currentUserId,
        userName,
        message: `Joined challenge: ${challenge.title}`,
        timestamp: Date.now(),
        type: 'challenge'
      }]);
    }
  }, [currentUserId, userName, activeChallenges]);

  const startChallenge = useCallback((challenge: MemoryChallenge) => {
    const updatedChallenge = {
      ...challenge,
      status: 'active' as const,
      startTime: Date.now()
    };

    setActiveChallenges(prev => prev.map(c => 
      c.id === challenge.id ? updatedChallenge : c
    ));

    onChallengeStart(updatedChallenge);

    setRealTimeChat(prev => [...prev, {
      id: `chat_${Date.now()}`,
      userId: 'system',
      userName: 'System',
      message: `Challenge "${challenge.title}" has started!`,
      timestamp: Date.now(),
      type: 'challenge'
    }]);
  }, [onChallengeStart]);

  const sendChatMessage = useCallback(() => {
    if (!chatMessage.trim()) return;

    setRealTimeChat(prev => [...prev, {
      id: `chat_${Date.now()}`,
      userId: currentUserId,
      userName,
      message: chatMessage,
      timestamp: Date.now(),
      type: 'message'
    }]);

    setChatMessage('');
  }, [chatMessage, currentUserId, userName]);

  const getStatusColor = (status: CollaborationUser['status']) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'in-game': return '#f59e0b';
      case 'offline': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getBrainwaveColor = (value: number) => {
    if (value >= 80) return '#10b981';
    if (value >= 60) return '#4facfe';
    if (value >= 40) return '#fbbf24';
    return '#ef4444';
  };

  return (
    <motion.div 
      className="multi-user-collaboration"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="collaboration-header">
        <h3>🌐 Multi-User Neural Collaboration</h3>
        <p>Connect with other users for synchronized cognitive training</p>
      </div>

      <div className="collaboration-content">
        <div className="collaboration-main">
          <div className="connected-users">
            <h4>Connected Users ({connectedUsers.filter(u => u.status !== 'offline').length})</h4>
            <div className="users-grid">
              {connectedUsers.map(user => (
                <motion.div 
                  key={user.id}
                  className="user-card"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="user-header">
                    <div className="user-avatar">{user.avatar}</div>
                    <div className="user-info">
                      <div className="user-name">{user.name}</div>
                      <div className="user-score">Score: {user.cognitiveScore}</div>
                    </div>
                    <div 
                      className="user-status"
                      style={{ backgroundColor: getStatusColor(user.status) }}
                    >
                      {user.status}
                    </div>
                  </div>
                  
                  {user.status !== 'offline' && (
                    <div className="user-brainwaves">
                      <div className="brainwave-item">
                        <span>Focus</span>
                        <div className="brainwave-bar">
                          <div 
                            className="brainwave-fill"
                            style={{ 
                              width: `${user.brainwaveData.focus}%`,
                              backgroundColor: getBrainwaveColor(user.brainwaveData.focus)
                            }}
                          />
                        </div>
                        <span>{user.brainwaveData.focus}%</span>
                      </div>
                      <div className="brainwave-item">
                        <span>Stress</span>
                        <div className="brainwave-bar">
                          <div 
                            className="brainwave-fill"
                            style={{ 
                              width: `${user.brainwaveData.stress}%`,
                              backgroundColor: getBrainwaveColor(100 - user.brainwaveData.stress)
                            }}
                          />
                        </div>
                        <span>{user.brainwaveData.stress}%</span>
                      </div>
                      <div className="brainwave-item">
                        <span>Flow</span>
                        <div className="brainwave-bar">
                          <div 
                            className="brainwave-fill"
                            style={{ 
                              width: `${user.brainwaveData.flow}%`,
                              backgroundColor: getBrainwaveColor(user.brainwaveData.flow)
                            }}
                          />
                        </div>
                        <span>{user.brainwaveData.flow}%</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="memory-challenges">
            <div className="challenges-header">
              <h4>Active Memory Challenges</h4>
              <motion.button 
                className="create-challenge-btn"
                onClick={() => setIsCreatingChallenge(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                + Create Challenge
              </motion.button>
            </div>

            <div className="challenges-list">
              {activeChallenges.map(challenge => {
                const challengeType = challengeTypes.find(ct => ct.type === challenge.type);
                return (
                  <motion.div 
                    key={challenge.id}
                    className={`challenge-card ${challenge.status}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="challenge-header">
                      <div className="challenge-icon">{challengeType?.icon}</div>
                      <div className="challenge-info">
                        <h5>{challenge.title}</h5>
                        <p>Difficulty: {challenge.difficulty}% | Participants: {challenge.participants.length}</p>
                      </div>
                      <div className={`challenge-status ${challenge.status}`}>
                        {challenge.status}
                      </div>
                    </div>

                    <div className="challenge-participants">
                      {challenge.participants.map(participantId => {
                        const participant = connectedUsers.find(u => u.id === participantId);
                        return participant ? (
                          <div key={participantId} className="participant">
                            <span className="participant-avatar">{participant.avatar}</span>
                            <span className="participant-name">{participant.name}</span>
                            {challenge.scores[participantId] && (
                              <span className="participant-score">{challenge.scores[participantId]}</span>
                            )}
                          </div>
                        ) : null;
                      })}
                    </div>

                    <div className="challenge-actions">
                      {!challenge.participants.includes(currentUserId) && challenge.status === 'waiting' && (
                        <motion.button 
                          className="join-btn"
                          onClick={() => joinChallenge(challenge.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Join Challenge
                        </motion.button>
                      )}
                      
                      {challenge.participants.includes(currentUserId) && challenge.status === 'waiting' && (
                        <motion.button 
                          className="start-btn"
                          onClick={() => startChallenge(challenge)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Start Challenge
                        </motion.button>
                      )}

                      {challenge.status === 'active' && challenge.participants.includes(currentUserId) && (
                        <div className="active-indicator">
                          <div className="pulse-dot"></div>
                          <span>In Progress</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="collaboration-chat">
          <h4>Real-time Chat</h4>
          <div className="chat-messages">
            {realTimeChat.slice(-10).map(msg => (
              <motion.div 
                key={msg.id}
                className={`chat-message ${msg.type}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="message-header">
                  <span className="message-user">{msg.userName}</span>
                  <span className="message-time">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="message-content">{msg.message}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="chat-input">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
              placeholder="Type a message..."
              className="chat-text-input"
            />
            <motion.button 
              onClick={sendChatMessage}
              className="chat-send-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCreatingChallenge && (
          <motion.div 
            className="create-challenge-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h4>Create New Memory Challenge</h4>
              <div className="challenge-types-grid">
                {challengeTypes.map(type => (
                  <motion.div 
                    key={type.type}
                    className="challenge-type-card"
                    onClick={() => createNewChallenge(type.type)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="type-icon">{type.icon}</div>
                    <h5>{type.title}</h5>
                    <p>{type.description}</p>
                    <div className="type-meta">
                      {type.minParticipants}-{type.maxParticipants} players
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.button 
                className="modal-close"
                onClick={() => setIsCreatingChallenge(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
