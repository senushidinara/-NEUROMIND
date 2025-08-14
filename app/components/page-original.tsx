'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import NeuralNetwork3D from './components/NeuralNetwork3D';
import AdaptiveLearningEngine from './components/AdaptiveLearningEngine';
import MetricCard from './components/MetricCard';
import RecommendationCard from './components/RecommendationCard';
import ActivityItem from './components/ActivityItem';
import CognitiveChart from './components/CognitiveChart';
import AIAgent from './components/AIAgent';
import BrainwaveChart from './components/BrainwaveChart';
import EmotionalTagging from './components/EmotionalTagging';

type DashboardTab = 'overview' | 'neural-3d' | 'ai-coach' | 'analytics' | 'insights';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [cognitiveLoad, setCognitiveLoad] = useState(72);
  const [memoryActivity, setMemoryActivity] = useState(87);
  const [focusLevel, setFocusLevel] = useState(74);
  const [stressLevel, setStressLevel] = useState(28);
  const [currentStreak, setCurrentStreak] = useState(28);
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState(65);
  const [currentTask, setCurrentTask] = useState('Dashboard Monitoring');
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [neuralActivity, setNeuralActivity] = useState({
    gamma: 45,
    beta: 65,
    alpha: 78,
    theta: 32,
    delta: 15
  });
  const [sessionData, setSessionData] = useState({
    duration: '2h 34m',
    completedTasks: 8,
    avgPerformance: 91.5,
    flowStateTime: '45m'
  });
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'achievement', message: 'New personal best in memory training!', time: '2m ago' },
    { id: 2, type: 'insight', message: 'Your focus peaks at 3 PM consistently', time: '15m ago' },
    { id: 3, type: 'warning', message: 'Stress levels elevated - consider meditation', time: '23m ago' }
  ]);

  // Real-time neural activity simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCognitiveLoad(prev => Math.max(20, Math.min(100, prev + (Math.random() - 0.5) * 10)));
      setMemoryActivity(prev => Math.max(20, Math.min(100, prev + (Math.random() - 0.5) * 8)));
      setFocusLevel(prev => Math.max(20, Math.min(100, prev + (Math.random() - 0.5) * 6)));
      setStressLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 4)));
      
      setNeuralActivity(prev => ({
        gamma: Math.max(10, Math.min(95, prev.gamma + (Math.random() - 0.5) * 8)),
        beta: Math.max(10, Math.min(95, prev.beta + (Math.random() - 0.5) * 6)),
        alpha: Math.max(10, Math.min(95, prev.alpha + (Math.random() - 0.5) * 4)),
        theta: Math.max(10, Math.min(95, prev.theta + (Math.random() - 0.5) * 10)),
        delta: Math.max(10, Math.min(95, prev.delta + (Math.random() - 0.5) * 3))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleDifficultyChange = (newDifficulty: number) => {
    setAdaptiveDifficulty(newDifficulty);
  };

  const handleAIRecommendation = (recommendation: string) => {
    setAiRecommendation(recommendation);
  };

  const handleEmotionalStateChange = (state: any) => {
    console.log('Emotional state changed:', state);
  };

  const handleHormoneAlert = (alert: any) => {
    setNotifications(prev => [{
      id: Date.now(),
      type: 'warning',
      message: alert.message,
      time: 'now'
    }, ...prev.slice(0, 4)]);
  };

  const getMetricColor = (value: number) => {
    if (value >= 80) return '#A7F3D0'; // Pastel green
    if (value >= 60) return '#BFDBFE'; // Pastel blue
    if (value >= 40) return '#FDE68A'; // Pastel yellow
    return '#FECACA'; // Pastel red
  };

  const getStressColor = (value: number) => {
    if (value <= 20) return '#A7F3D0'; // Pastel green
    if (value <= 40) return '#FDE68A'; // Pastel yellow
    if (value <= 60) return '#FED7AA'; // Pastel orange
    return '#FECACA'; // Pastel red
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊', description: 'Core metrics and status', color: '#E0F2FE' },
    { id: 'neural-3d', label: '3D Brain', icon: '🧠', description: 'Interactive neural visualization', color: '#F3E8FF' },
    { id: 'ai-coach', label: 'AI Coach', icon: '🤖', description: 'Adaptive learning engine', color: '#ECFDF5' },
    { id: 'analytics', label: 'Analytics', icon: '📈', description: 'Detailed cognitive analysis', color: '#FEF3C7' },
    { id: 'insights', label: 'Insights', icon: '💡', description: 'Personalized recommendations', color: '#FDF2F8' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="tab-content"
          >
            {/* Enhanced Metrics Grid */}
            <div className="metrics-grid enhanced">
              <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <MetricCard
                  icon="🧠"
                  value={`${memoryActivity.toFixed(1)}%`}
                  label="Memory Enhancement"
                  color="#A855F7"
                  gradient={true}
                  pulseEffect={true}
                />
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <MetricCard
                  icon="⚡"
                  value={`${cognitiveLoad.toFixed(1)}%`}
                  label="Cognitive Load"
                  color="#06B6D4"
                  gradient={true}
                  pulseEffect={true}
                />
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <MetricCard
                  icon="🎯"
                  value={`${focusLevel.toFixed(1)}%`}
                  label="Neural Focus"
                  color="#10B981"
                  gradient={true}
                  pulseEffect={true}
                />
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <MetricCard
                  icon="💎"
                  value={`${stressLevel.toFixed(1)}%`}
                  label="Stress Index"
                  color="#F59E0B"
                  gradient={true}
                  pulseEffect={true}
                />
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <MetricCard
                  icon="🔥"
                  value={`${currentStreak}`}
                  label="Neural Streak"
                  color="#EF4444"
                  gradient={true}
                  pulseEffect={true}
                />
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <MetricCard
                  icon="🎮"
                  value={`${adaptiveDifficulty}%`}
                  label="AI Difficulty"
                  color="#8B5CF6"
                  gradient={true}
                  pulseEffect={true}
                />
              </motion.div>
            </div>

            {/* Session Overview */}
            <div className="session-overview">
              <div className="session-card">
                <h3>🎯 Current Session</h3>
                <div className="session-stats">
                  <div className="stat-item">
                    <span className="stat-icon">⏱️</span>
                    <span className="stat-label">Duration</span>
                    <span className="stat-value">{sessionData.duration}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">✅</span>
                    <span className="stat-label">Tasks Completed</span>
                    <span className="stat-value">{sessionData.completedTasks}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">📊</span>
                    <span className="stat-label">Avg Performance</span>
                    <span className="stat-value">{sessionData.avgPerformance}%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">🌊</span>
                    <span className="stat-label">Flow State</span>
                    <span className="stat-value">{sessionData.flowStateTime}</span>
                  </div>
                </div>
              </div>

              <div className="notifications-panel">
                <h3>🔔 Live Notifications</h3>
                <div className="notifications-list">
                  {notifications.map(notification => (
                    <motion.div 
                      key={notification.id}
                      className={`notification-item ${notification.type}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="notification-content">
                        <span className="notification-message">{notification.message}</span>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Visual Wellness Section */}
            <div className="wellness-gallery-section">
              <h3>🌸 Enhanced Wellness Gallery</h3>
              <div className="wellness-image-grid">
                <motion.div className="wellness-card beach-meditation" whileHover={{ scale: 1.03, rotateY: 2 }}>
                  <div className="wellness-image">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F9b90001ae1c14a47bc4e14a3bfb82c86?format=webp&width=800" alt="Beach Calming Exercises" />
                    <div className="wellness-overlay">
                      <h4>Beach Calming Exercises</h4>
                      <p>Find peace by the ocean waves</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="wellness-card garden-calm" whileHover={{ scale: 1.03, rotateY: 2 }}>
                  <div className="wellness-image">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2Fd34426d5181d4262ae18c3c90ec99c72?format=webp&width=800" alt="Garden Environment Calming" />
                    <div className="wellness-overlay">
                      <h4>Garden Tranquility</h4>
                      <p>Natural healing environments</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="wellness-card yoga-practice" whileHover={{ scale: 1.03, rotateY: 2 }}>
                  <div className="wellness-image">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F4b476a2aa31b4e6b93dd9d819a92459e?format=webp&width=800" alt="Yoga Practice" />
                    <div className="wellness-overlay">
                      <h4>Mindful Yoga Practice</h4>
                      <p>Body-mind integration</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="wellness-card breathing-exercise" whileHover={{ scale: 1.03, rotateY: 2 }}>
                  <div className="wellness-image">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F92cc963a742b4ce2819bb087f496bbd5?format=webp&width=800" alt="Breathing Exercises" />
                    <div className="wellness-overlay">
                      <h4>Breathing Therapy</h4>
                      <p>Advanced breathing techniques</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="wellness-card sea-calm" whileHover={{ scale: 1.03, rotateY: 2 }}>
                  <div className="wellness-image">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2Fcdf8312ef9c24614ac780a9d743b8360?format=webp&width=800" alt="Sea Calming Environment" />
                    <div className="wellness-overlay">
                      <h4>Ocean Meditation</h4>
                      <p>Deep sea tranquility</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="wellness-card calming-environments" whileHover={{ scale: 1.03, rotateY: 2 }}>
                  <div className="wellness-image">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F95e4da1601cb4486b22c9b0a6c476714?format=webp&width=800" alt="Calming Environments" />
                    <div className="wellness-overlay">
                      <h4>Peaceful Scenery</h4>
                      <p>Serene natural landscapes</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="wellness-card physical-wellness" whileHover={{ scale: 1.03, rotateY: 2 }}>
                  <div className="wellness-image">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2Ffc717db5127740f78b5e7b0bb16f3c31?format=webp&width=800" alt="Physical Wellness" />
                    <div className="wellness-overlay">
                      <h4>Physical Wellness</h4>
                      <p>Holistic health approach</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="wellness-card aesthetic-meditation" whileHover={{ scale: 1.03, rotateY: 2 }}>
                  <div className="wellness-image">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F195e9cad7cf04de498093c0c90b5db46?format=webp&width=800" alt="Aesthetic Meditation" />
                    <div className="wellness-overlay">
                      <h4>Aesthetic Meditation</h4>
                      <p>Beautiful mindfulness spaces</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="wellness-card garden-meditation" whileHover={{ scale: 1.03, rotateY: 2 }}>
                  <div className="wellness-image">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F00d0d0f6033648dda2cda8370fc4909c?format=webp&width=800" alt="Garden Meditation" />
                    <div className="wellness-overlay">
                      <h4>Garden Meditation</h4>
                      <p>Natural meditation sanctuaries</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Professional Medical Team Section */}
            <div className="medical-team-section">
              <h3>👩‍⚕️ Expert Medical Team</h3>
              <div className="medical-team-grid">
                <motion.div className="medical-card" whileHover={{ scale: 1.03 }}>
                  <div className="medical-image">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2Ffc9bcb5d5dba4362aaab6f087ee70c47?format=webp&width=800" alt="Lady Doctor Charming" />
                    <div className="medical-overlay">
                      <h4>Dr. Sarah Chen</h4>
                      <p>Cognitive Neuroscience Specialist</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="medical-card" whileHover={{ scale: 1.03 }}>
                  <div className="medical-image">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2Fcd644bcfb3d646fd899deac2f5c9c3eb?format=webp&width=800" alt="Medical Professional" />
                    <div className="medical-overlay">
                      <h4>Dr. Emily Rodriguez</h4>
                      <p>Neural Enhancement Expert</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* EEG Technology Section */}
            <div className="eeg-technology-section">
              <h3>��� Advanced EEG Technology</h3>
              <div className="eeg-tech-grid">
                <motion.div className="eeg-card" whileHover={{ scale: 1.02, rotateX: 2 }}>
                  <div className="eeg-image">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2Fc12cdbd17e0041859ceb6237817241cc?format=webp&width=800" alt="EEG System in Use" />
                    <div className="eeg-overlay">
                      <h4>Real-time Brain Monitoring</h4>
                      <p>State-of-the-art EEG headsets</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="eeg-card" whileHover={{ scale: 1.02, rotateX: 2 }}>
                  <div className="eeg-image">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2Fa8326d8c50684144b9da86cc31f7505d?format=webp&width=800" alt="EEG Band Technology" />
                    <div className="eeg-overlay">
                      <h4>Neural Interface Technology</h4>
                      <p>Continuous brain activity tracking</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-section">
              <h3>⚡ Quick Actions</h3>
              <div className="quick-actions-grid">
                <motion.button
                  className="quick-action-card meditation"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setAiRecommendation("Starting 5-minute meditation session...");
                    setTimeout(() => {
                      window.location.href = '/mindfulness';
                    }, 100);
                  }}
                >
                  <div className="action-background">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F50bac31a052b44c79c60d3ef3abbf0cd?format=webp&width=800" alt="" />
                  </div>
                  <div className="action-content">
                    <span className="action-icon">🧘</span>
                    <span className="action-label">Start Meditation</span>
                    <span className="action-description">5-min focus session</span>
                  </div>
                </motion.button>

                <motion.button
                  className="quick-action-card training"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setAiRecommendation("Launching adaptive brain training...");
                    setTimeout(() => {
                      window.location.href = '/games';
                    }, 100);
                  }}
                >
                  <div className="action-background">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F3ce9838954d64f6d9fcd31f69b5e2680?format=webp&width=800" alt="" />
                  </div>
                  <div className="action-content">
                    <span className="action-icon">🎮</span>
                    <span className="action-label">Brain Training</span>
                    <span className="action-description">Adaptive difficulty</span>
                  </div>
                </motion.button>

                <motion.button
                  className="quick-action-card analysis"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setAiRecommendation("Generating comprehensive cognitive analysis...");
                    setTimeout(() => {
                      setActiveTab('analytics');
                    }, 100);
                  }}
                >
                  <div className="action-background">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F7646e3d3eca7489db3cba225c900ecf8?format=webp&width=800" alt="" />
                  </div>
                  <div className="action-content">
                    <span className="action-icon">📊</span>
                    <span className="action-label">Full Analysis</span>
                    <span className="action-description">Cognitive report</span>
                  </div>
                </motion.button>

                <motion.button
                  className="quick-action-card sounds"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setAiRecommendation("Activating neural soundscapes...");
                    setTimeout(() => {
                      window.location.href = '/soundscapes';
                    }, 100);
                  }}
                >
                  <div className="action-background">
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F712cd4a0dc2e460fb348614fd3920960?format=webp&width=800" alt="" />
                  </div>
                  <div className="action-content">
                    <span className="action-icon">🎵</span>
                    <span className="action-label">Neural Sounds</span>
                    <span className="action-description">Binaural beats</span>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        );

      case 'neural-3d':
        return (
          <motion.div
            key="neural-3d"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="tab-content"
          >
            <NeuralNetwork3D
              cognitiveLoad={cognitiveLoad}
              memoryActivity={memoryActivity}
              focusLevel={focusLevel}
            />
            
            <div className="neural-controls-panel">
              <div className="control-section">
                <h3>🎛️ Visualization Controls</h3>
                <div className="neural-3d-controls">
                  <div className="control-group">
                    <label>Neural Network Mode</label>
                    <select className="neural-select">
                      <option>Full Brain Network</option>
                      <option>Memory Centers</option>
                      <option>Attention Networks</option>
                      <option>Emotional Processing</option>
                      <option>Motor Cortex</option>
                      <option>Language Areas</option>
                    </select>
                  </div>
                  
                  <div className="control-group">
                    <label>Animation Speed</label>
                    <input type="range" min="0.1" max="3" step="0.1" defaultValue="1" className="neural-slider" />
                    <span className="range-value">1.0x</span>
                  </div>
                  
                  <div className="control-group">
                    <label>Node Sensitivity</label>
                    <input type="range" min="0.5" max="3" step="0.1" defaultValue="1.5" className="neural-slider" />
                    <span className="range-value">1.5x</span>
                  </div>
                  
                  <div className="control-group">
                    <label>Particle Density</label>
                    <input type="range" min="100" max="2000" step="100" defaultValue="500" className="neural-slider" />
                    <span className="range-value">500</span>
                  </div>
                </div>
              </div>

              <div className="brain-research-showcase">
                <h3>🔬 Advanced Neural Research Lab</h3>
                <div className="research-images">
                  <motion.div className="research-card" whileHover={{ scale: 1.02 }}>
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F3817cb8680b94b9ea0fa53cb28b8c16b?format=webp&width=800" alt="Brain Research Lab" />
                    <div className="research-info">
                      <h4>Advanced Brain Research</h4>
                      <p>Cutting-edge neuroscience laboratory</p>
                    </div>
                  </motion.div>

                  <motion.div className="research-card" whileHover={{ scale: 1.02 }}>
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2Fbbc243c0732f4dd7bbb3995e69263766?format=webp&width=800" alt="Futuristic Neuroscience Lab" />
                    <div className="research-info">
                      <h4>Futuristic Neuroscience</h4>
                      <p>Next-generation brain analysis</p>
                    </div>
                  </motion.div>

                  <motion.div className="research-card" whileHover={{ scale: 1.02 }}>
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2Fed78fd0e8dcc4844a49ef0b14141053f?format=webp&width=800" alt="Neuroscience Research" />
                    <div className="research-info">
                      <h4>Neural Network Analysis</h4>
                      <p>Advanced cognitive research</p>
                    </div>
                  </motion.div>

                  <motion.div className="research-card" whileHover={{ scale: 1.02 }}>
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2Fd290634f4a7d4c35955cb5ff47d16884?format=webp&width=800" alt="Neuroscience Research" />
                    <div className="research-info">
                      <h4>Brain Enhancement Science</h4>
                      <p>Revolutionary neurotechnology</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="neural-insights">
                <h3>🧬 Real-time Neural Insights</h3>
                <div className="insights-grid">
                  <div className="insight-card">
                    <div className="insight-header">
                      <span className="insight-icon">��</span>
                      <span className="insight-title">Gamma Activity</span>
                    </div>
                    <div className="insight-value">{neuralActivity.gamma.toFixed(1)} Hz</div>
                    <div className="insight-description">High-level cognitive processing</div>
                  </div>
                  
                  <div className="insight-card">
                    <div className="insight-header">
                      <span className="insight-icon">🌊</span>
                      <span className="insight-title">Alpha Waves</span>
                    </div>
                    <div className="insight-value">{neuralActivity.alpha.toFixed(1)} Hz</div>
                    <div className="insight-description">Relaxed awareness state</div>
                  </div>
                  
                  <div className="insight-card">
                    <div className="insight-header">
                      <span className="insight-icon">🔥</span>
                      <span className="insight-title">Beta Focus</span>
                    </div>
                    <div className="insight-value">{neuralActivity.beta.toFixed(1)} Hz</div>
                    <div className="insight-description">Active concentration</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'ai-coach':
        return (
          <motion.div
            key="ai-coach"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="tab-content"
          >
            <AdaptiveLearningEngine
              currentTask={currentTask}
              difficulty={adaptiveDifficulty}
              onDifficultyChange={handleDifficultyChange}
              onRecommendation={handleAIRecommendation}
            />
            
            <div className="ai-coach-enhanced">
              <div className="coach-settings">
                <h3>🤖 AI Coach Configuration</h3>
                <div className="settings-grid">
                  <div className="setting-item">
                    <span className="setting-label">Learning Aggressiveness</span>
                    <select className="setting-select">
                      <option>Conservative</option>
                      <option>Moderate</option>
                      <option>Aggressive</option>
                      <option>Extreme</option>
                    </select>
                  </div>
                  
                  <div className="setting-item">
                    <span className="setting-label">Feedback Style</span>
                    <select className="setting-select">
                      <option>Encouraging</option>
                      <option>Analytical</option>
                      <option>Direct</option>
                      <option>Motivational</option>
                    </select>
                  </div>
                  
                  <div className="setting-item">
                    <span className="setting-label">Update Frequency</span>
                    <select className="setting-select">
                      <option>Real-time</option>
                      <option>Every 2 minutes</option>
                      <option>Every 5 minutes</option>
                      <option>On demand</option>
                    </select>
                  </div>
                  
                  <div className="setting-item">
                    <span className="setting-label">Focus Areas</span>
                    <select className="setting-select">
                      <option>All cognitive domains</option>
                      <option>Memory enhancement</option>
                      <option>Attention training</option>
                      <option>Stress management</option>
                    </select>
                  </div>
                </div>
              </div>

              <AIAgent
                cognitiveLoad={cognitiveLoad}
                memoryScore={memoryActivity}
                focusLevel={focusLevel}
                stressLevel={stressLevel}
                advanced={true}
                neuralData={neuralActivity}
              />
            </div>
          </motion.div>
        );

      case 'analytics':
        return (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="tab-content"
          >
            <div className="analytics-dashboard">
              <div className="analytics-header">
                <h3>📊 Advanced Cognitive Analytics</h3>
                <div className="analytics-controls">
                  <select className="analytics-select">
                    <option>Last 24 hours</option>
                    <option>Last week</option>
                    <option>Last month</option>
                    <option>All time</option>
                  </select>
                  <button className="export-btn">📤 Export Data</button>
                </div>
              </div>

              <div className="brainwave-section">
                <h4>🧠 Live Brainwave Analysis</h4>
                <BrainwaveChart data={neuralActivity} />
                
                <div className="brainwave-insights">
                  <div className="insight-card">
                    <h4>Dominant Pattern</h4>
                    <p>Alpha waves at {neuralActivity.alpha.toFixed(1)}Hz - Creative state detected</p>
                  </div>
                  <div className="insight-card">
                    <h4>Coherence Level</h4>
                    <p>High synchronization between hemispheres (87%)</p>
                  </div>
                  <div className="insight-card">
                    <h4>Cognitive State</h4>
                    <p>Optimal for learning and memory consolidation</p>
                  </div>
                </div>
              </div>

              <div className="performance-metrics">
                <h4>📈 Performance Trends</h4>
                <CognitiveChart 
                  advanced={true}
                  neuralData={neuralActivity}
                  cognitiveMetrics={{
                    load: cognitiveLoad,
                    memory: memoryActivity,
                    focus: focusLevel,
                    stress: stressLevel
                  }}
                />
              </div>

              <div className="detailed-analytics">
                <div className="analytics-card">
                  <h4>🎯 Attention Metrics</h4>
                  <div className="metric-details">
                    <div className="metric-row">
                      <span>Sustained Attention</span>
                      <div className="metric-bar">
                        <div className="bar-fill" style={{ width: '78%' }}></div>
                      </div>
                      <span>78%</span>
                    </div>
                    <div className="metric-row">
                      <span>Selective Attention</span>
                      <div className="metric-bar">
                        <div className="bar-fill" style={{ width: '85%' }}></div>
                      </div>
                      <span>85%</span>
                    </div>
                    <div className="metric-row">
                      <span>Divided Attention</span>
                      <div className="metric-bar">
                        <div className="bar-fill" style={{ width: '72%' }}></div>
                      </div>
                      <span>72%</span>
                    </div>
                  </div>
                </div>

                <div className="analytics-card">
                  <h4>🧠 Memory Analysis</h4>
                  <div className="metric-details">
                    <div className="metric-row">
                      <span>Working Memory</span>
                      <div className="metric-bar">
                        <div className="bar-fill" style={{ width: '91%' }}></div>
                      </div>
                      <span>91%</span>
                    </div>
                    <div className="metric-row">
                      <span>Long-term Retention</span>
                      <div className="metric-bar">
                        <div className="bar-fill" style={{ width: '88%' }}></div>
                      </div>
                      <span>88%</span>
                    </div>
                    <div className="metric-row">
                      <span>Recognition Speed</span>
                      <div className="metric-bar">
                        <div className="bar-fill" style={{ width: '94%' }}></div>
                      </div>
                      <span>94%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'insights':
        return (
          <motion.div
            key="insights"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="tab-content"
          >
            <div className="insights-dashboard">
              <div className="recommendations-section">
                <h3>💡 Personalized Insights</h3>
                <div className="recommendations-with-visuals">
                  <div className="health-lifestyle-gallery">
                    <h4>🌟 Comprehensive Lifestyle Recommendations</h4>
                    <div className="lifestyle-grid">
                      <motion.div className="lifestyle-card sleep" whileHover={{ scale: 1.03 }}>
                        <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F54ca1fdff649469296f9e7f29d4d62d7?format=webp&width=800" alt="Sleep and Memory" />
                        <div className="lifestyle-info">
                          <h5>Sleep & Memory Enhancement</h5>
                          <p>Optimize sleep for better cognitive function</p>
                        </div>
                      </motion.div>

                      <motion.div className="lifestyle-card brain-sleep" whileHover={{ scale: 1.03 }}>
                        <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2Fb71dd1d21a9145b484db5443f5056205?format=webp&width=800" alt="How Sleep Affects Brain" />
                        <div className="lifestyle-info">
                          <h5>Brain Health & Sleep</h5>
                          <p>Understanding sleep's impact on cognition</p>
                        </div>
                      </motion.div>

                      <motion.div className="lifestyle-card nutrition" whileHover={{ scale: 1.03 }}>
                        <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F4f6fc5b8461f4af0975e3e852f99741b?format=webp&width=800" alt="Physical Activity and Nutrition" />
                        <div className="lifestyle-info">
                          <h5>Nutrition & Activity</h5>
                          <p>Omega-3 rich foods and optimal exercise</p>
                        </div>
                      </motion.div>

                      <motion.div className="lifestyle-card counseling" whileHover={{ scale: 1.03 }}>
                        <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2Fdea3d033d1e44cc38e38328e1a981388?format=webp&width=800" alt="Evening Counseling Sessions" />
                        <div className="lifestyle-info">
                          <h5>Professional Counseling</h5>
                          <p>Evening therapeutic sessions</p>
                        </div>
                      </motion.div>

                      <motion.div className="lifestyle-card brain-function" whileHover={{ scale: 1.03 }}>
                        <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F8dcc5d871f7e455a95b26083558de3a2?format=webp&width=800" alt="Brain Function Enhancing" />
                        <div className="lifestyle-info">
                          <h5>Brain Enhancement</h5>
                          <p>Advanced cognitive training methods</p>
                        </div>
                      </motion.div>

                      <motion.div className="lifestyle-card memory-activities" whileHover={{ scale: 1.03 }}>
                        <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F5fb29e08bc804ecbb7d7d1e6cc19a847?format=webp&width=800" alt="Memory Enhancing Activities" />
                        <div className="lifestyle-info">
                          <h5>Memory Training</h5>
                          <p>Interactive memory enhancement activities</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="recommendations-grid">
                    <RecommendationCard
                      icon="🧘"
                      title="Optimize Alpha Waves"
                      content="Your alpha activity peaks at 3 PM. Schedule creative work during this time window for maximum neuroplasticity benefits."
                      highlight="3 PM"
                      priority="high"
                      neuralTarget="Posterior Cortex + Default Mode Network"
                    />

                    <RecommendationCard
                      icon="⚡"
                      title="Gamma Enhancement Protocol"
                      content="Detected suboptimal gamma coupling. Try 40Hz binaural beats for 15 minutes to enhance cognitive binding and consciousness integration."
                      highlight="40Hz binaural beats"
                      priority="medium"
                      neuralTarget="Thalamo-Cortical Circuits"
                    />

                    <RecommendationCard
                      icon="🌊"
                      title="Flow State Optimization"
                      content="Your theta-gamma synchrony indicates readiness for flow state. Engage in challenging but achievable tasks for optimal performance."
                      highlight="flow state"
                      priority="optimal"
                      neuralTarget="Frontal-Parietal Network"
                    />
                  </div>
                </div>
              </div>

              <EmotionalTagging
                onEmotionalStateChange={handleEmotionalStateChange}
                onHormoneAlert={handleHormoneAlert}
              />

              <div className="company-showcase">
                <h3>🏢 NeuroMind Pro Global Centers</h3>
                <div className="center-images">
                  <motion.div className="center-card" whileHover={{ scale: 1.02 }}>
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2Fe67b10327a01411bacdafaaa8129b85c?format=webp&width=800" alt="NeuroMind Pro Corporate" />
                    <div className="center-info">
                      <h4>Corporate Headquarters</h4>
                      <p>Leading cognitive health innovation</p>
                    </div>
                  </motion.div>

                  <motion.div className="center-card" whileHover={{ scale: 1.02 }}>
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2Fc5758d8866b24190835457cb6eb3b2af?format=webp&width=800" alt="NeuroMind Pro Front Desk" />
                    <div className="center-info">
                      <h4>Modern Reception</h4>
                      <p>Welcoming environment for all patients</p>
                    </div>
                  </motion.div>

                  <motion.div className="center-card" whileHover={{ scale: 1.02 }}>
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F4ed520a843e14d7a96f9a03b432b21ba?format=webp&width=800" alt="NeuroMind Pro Medical Center" />
                    <div className="center-info">
                      <h4>Medical Facility</h4>
                      <p>State-of-the-art treatment centers</p>
                    </div>
                  </motion.div>

                  <motion.div className="center-card" whileHover={{ scale: 1.02 }}>
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2Fe4daa19df90543d0a12d9df2418fd168?format=webp&width=800" alt="NeuroMind Pro Team" />
                    <div className="center-info">
                      <h4>Expert Team</h4>
                      <p>Dedicated healthcare professionals</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="mindfulness-community">
                <h3>🧘‍♀��� Community Wellness Programs</h3>
                <div className="community-grid">
                  <motion.div className="community-card" whileHover={{ scale: 1.02 }}>
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2Fc14f2a48d2c347a1a082c6b61b63504f?format=webp&width=800" alt="Boys and Girls Mindfulness" />
                    <div className="community-info">
                      <h4>Youth Mindfulness Programs</h4>
                      <p>Teaching mindfulness to the next generation</p>
                    </div>
                  </motion.div>

                  <motion.div className="community-card" whileHover={{ scale: 1.02 }}>
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F1e93dfd37230425eaf9de9e0236ce553?format=webp&width=800" alt="Group Yoga Practice" />
                    <div className="community-info">
                      <h4>Group Yoga Sessions</h4>
                      <p>Community wellness through movement</p>
                    </div>
                  </motion.div>

                  <motion.div className="community-card" whileHover={{ scale: 1.02 }}>
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F99d6c6bd8a4e4c84864dd984d7ff2372?format=webp&width=800" alt="Mixed Group Mindfulness" />
                    <div className="community-info">
                      <h4>Inclusive Wellness</h4>
                      <p>Mindfulness practices for everyone</p>
                    </div>
                  </motion.div>

                  <motion.div className="community-card" whileHover={{ scale: 1.02 }}>
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Fcc8773f43a5c46e1986e144b83b3dcd4%2F740bb6ba436e4e01882415001089b029?format=webp&width=800" alt="Memory Enhancement Activities" />
                    <div className="community-info">
                      <h4>Memory Training Groups</h4>
                      <p>Collaborative cognitive enhancement</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="predictive-insights">
                <h3>🔮 AI Predictions</h3>
                <div className="predictions-grid">
                  <div className="prediction-card">
                    <div className="prediction-header">
                      <span className="prediction-icon">📈</span>
                      <span className="prediction-title">Performance Forecast</span>
                    </div>
                    <div className="prediction-content">
                      <p>Based on current patterns, expect 15% improvement in working memory over next 2 weeks</p>
                      <div className="confidence-score">Confidence: 87%</div>
                    </div>
                  </div>

                  <div className="prediction-card">
                    <div className="prediction-header">
                      <span className="prediction-icon">🧠</span>
                      <span className="prediction-title">Cognitive Peak Times</span>
                    </div>
                    <div className="prediction-content">
                      <p>Your cognitive performance peaks between 2-4 PM and 7-9 PM daily</p>
                      <div className="confidence-score">Confidence: 94%</div>
                    </div>
                  </div>

                  <div className="prediction-card">
                    <div className="prediction-header">
                      <span className="prediction-icon">💊</span>
                      <span className="prediction-title">Supplement Timing</span>
                    </div>
                    <div className="prediction-content">
                      <p>Omega-3 supplements would be most effective if taken at 8 AM based on your circadian rhythm</p>
                      <div className="confidence-score">Confidence: 76%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="main-container pastel-theme"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Sidebar activeItem="dashboard" />

      <main className="main-content">
        {/* Simplified Background Effects */}
        <div className="neural-lightning-overlay">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={`lightning-bolt bolt-${i + 1}`}
              animate={{
                opacity: [0, 0.2, 0],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{
                duration: 0.6,
                delay: Math.random() * 4,
                repeat: Infinity,
                repeatDelay: Math.random() * 6 + 3
              }}
            />
          ))}
        </div>

        <motion.div 
          className="dashboard-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="header-content">
            <h1 className="dashboard-title pastel-gradient">
              <span className="title-icon">🧠</span>
              NeuroMind Pro Dashboard
              <span className="title-glow"></span>
            </h1>
            <p className="dashboard-subtitle">
              Advanced cognitive enhancement with beautiful pastel interface
            </p>
            {aiRecommendation && (
              <motion.div
                className="ai-recommendation-banner"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  background: 'linear-gradient(135deg, #A855F7 0%, #3B82F6 100%)',
                  color: 'white',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  margin: '1rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 600,
                  boxShadow: '0 8px 32px rgba(168, 85, 247, 0.3)'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>🤖</span>
                <span>{aiRecommendation}</span>
              </motion.div>
            )}
            <div className="monitoring-status">
              <div className="status-indicator active">
                <div className="pulse-dot"></div>
                <span>Neural Monitoring Active</span>
              </div>
            </div>
          </div>
          <div className="section-divider neural-divider">
            <div className="divider-lightning"></div>
          </div>
        </motion.div>

        {/* Enhanced Tab Navigation */}
        <motion.div 
          className="dashboard-tabs pastel-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="tabs-container">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id as DashboardTab)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ '--tab-color': tab.color } as any}
              >
                <span className="tab-icon">{tab.icon}</span>
                <div className="tab-content">
                  <span className="tab-label">{tab.label}</span>
                  <span className="tab-description">{tab.description}</span>
                </div>
                {activeTab === tab.id && (
                  <motion.div 
                    className="tab-indicator"
                    layoutId="tab-indicator"
                    style={{ background: `linear-gradient(90deg, ${tab.color}, ${tab.color}CC)` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <div className="tab-content-container">
          <AnimatePresence mode="wait">
            {renderTabContent()}
          </AnimatePresence>
        </div>

        {/* Enhanced Footer */}
        <motion.footer 
          className="neural-footer pastel-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.0 }}
        >
          <div className="footer-content">
            <div className="footer-section">
              <h4>NeuroMind Pro</h4>
              <p>Advanced Cognitive Enhancement Platform</p>
            </div>
            <div className="footer-section">
              <h4>Session Analytics</h4>
              <p>Peak Performance: <span className="status-active">96.7%</span></p>
              <p>Neural Coherence: <span className="status-adaptive">87.3%</span></p>
            </div>
            <div className="footer-section">
              <h4>Cognitive State</h4>
              <p>Flow State: <span className="status-flow">Achieved</span></p>
              <p>Learning Mode: <span className="status-learning">Optimal</span></p>
            </div>
          </div>
        </motion.footer>
      </main>
    </motion.div>
  );
}
