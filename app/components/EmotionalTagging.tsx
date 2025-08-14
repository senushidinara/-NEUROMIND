'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmotionalState {
  primary: string;
  secondary: string[];
  intensity: number;
  valence: number; // positive/negative scale
  arousal: number; // energy/activation level
  timestamp: number;
}

interface HormoneLevel {
  name: string;
  level: number;
  unit: string;
  status: 'optimal' | 'elevated' | 'low' | 'critical';
  trend: 'increasing' | 'decreasing' | 'stable';
  predictedChange: number;
}

interface StressMarker {
  type: 'cortisol' | 'adrenaline' | 'norepinephrine' | 'dopamine' | 'serotonin' | 'oxytocin';
  value: number;
  normalRange: [number, number];
  correlatedEmotions: string[];
}

interface EmotionalTaggingProps {
  onEmotionalStateChange: (state: EmotionalState) => void;
  onHormoneAlert: (alert: { hormone: string; message: string; severity: 'low' | 'medium' | 'high' }) => void;
}

export default function EmotionalTagging({ 
  onEmotionalStateChange, 
  onHormoneAlert 
}: EmotionalTaggingProps) {
  const [currentEmotionalState, setCurrentEmotionalState] = useState<EmotionalState>({
    primary: 'neutral',
    secondary: [],
    intensity: 5,
    valence: 0,
    arousal: 5,
    timestamp: Date.now()
  });

  const [hormoneProfile, setHormoneProfile] = useState<HormoneLevel[]>([
    { name: 'Cortisol', level: 12.5, unit: 'μg/dL', status: 'optimal', trend: 'stable', predictedChange: 0 },
    { name: 'Adrenaline', level: 45, unit: 'pg/mL', status: 'optimal', trend: 'stable', predictedChange: 0 },
    { name: 'Dopamine', level: 2.8, unit: 'ng/mL', status: 'optimal', trend: 'increasing', predictedChange: 5 },
    { name: 'Serotonin', level: 180, unit: 'ng/mL', status: 'optimal', trend: 'stable', predictedChange: 0 },
    { name: 'Norepinephrine', level: 320, unit: 'pg/mL', status: 'elevated', trend: 'increasing', predictedChange: 15 },
    { name: 'Oxytocin', level: 8.2, unit: 'pg/mL', status: 'optimal', trend: 'stable', predictedChange: 0 }
  ]);

  const [emotionalHistory, setEmotionalHistory] = useState<EmotionalState[]>([]);
  const [predictiveInsights, setPredictiveInsights] = useState<string[]>([]);
  const [activeStressMarkers, setActiveStressMarkers] = useState<StressMarker[]>([]);

  const emotions = {
    positive: [
      { name: 'joy', color: '#fbbf24', icon: '😊' },
      { name: 'excitement', color: '#f59e0b', icon: '🤩' },
      { name: 'calm', color: '#10b981', icon: '😌' },
      { name: 'confident', color: '#4facfe', icon: '😎' },
      { name: 'grateful', color: '#8338ec', icon: '🙏' },
      { name: 'curious', color: '#06d6a0', icon: '🤔' },
      { name: 'focused', color: '#00f2fe', icon: '🎯' },
      { name: 'energized', color: '#ff006e', icon: '⚡' }
    ],
    negative: [
      { name: 'stressed', color: '#ef4444', icon: '😰' },
      { name: 'anxious', color: '#f97316', icon: '😨' },
      { name: 'frustrated', color: '#dc2626', icon: '😤' },
      { name: 'overwhelmed', color: '#991b1b', icon: '😵' },
      { name: 'sad', color: '#1e40af', icon: '😢' },
      { name: 'tired', color: '#6b7280', icon: '😴' },
      { name: 'irritated', color: '#be123c', icon: '😠' },
      { name: 'confused', color: '#7c3aed', icon: '😕' }
    ],
    neutral: [
      { name: 'neutral', color: '#64748b', icon: '😐' },
      { name: 'thoughtful', color: '#475569', icon: '🤨' },
      { name: 'observant', color: '#334155', icon: '👁️' },
      { name: 'waiting', color: '#1e293b', icon: '⏳' }
    ]
  };

  // Simulate real-time hormone monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setHormoneProfile(prev => prev.map(hormone => {
        const variation = (Math.random() - 0.5) * 0.2;
        const newLevel = Math.max(0, hormone.level + (hormone.level * variation));
        
        // Determine status based on simulated normal ranges
        let status: HormoneLevel['status'] = 'optimal';
        let trend: HormoneLevel['trend'] = 'stable';
        let predictedChange = 0;

        if (hormone.name === 'Cortisol') {
          if (newLevel > 20) status = 'elevated';
          else if (newLevel < 5) status = 'low';
          if (newLevel > hormone.level) {
            trend = 'increasing';
            predictedChange = Math.round((newLevel - hormone.level) / hormone.level * 100);
          } else if (newLevel < hormone.level) {
            trend = 'decreasing';
            predictedChange = Math.round((newLevel - hormone.level) / hormone.level * 100);
          }
        } else if (hormone.name === 'Norepinephrine') {
          if (newLevel > 400) status = 'elevated';
          else if (newLevel < 150) status = 'low';
          if (newLevel > hormone.level) {
            trend = 'increasing';
            predictedChange = Math.round((newLevel - hormone.level) / hormone.level * 100);
          }
        }

        // Generate alerts for significant changes
        if (Math.abs(predictedChange) > 20) {
          onHormoneAlert({
            hormone: hormone.name,
            message: `${hormone.name} levels ${trend} by ${Math.abs(predictedChange)}%`,
            severity: Math.abs(predictedChange) > 30 ? 'high' : 'medium'
          });
        }

        return {
          ...hormone,
          level: newLevel,
          status,
          trend,
          predictedChange
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [onHormoneAlert]);

  // Generate predictive insights based on hormone levels and emotional state
  useEffect(() => {
    const generateInsights = () => {
      const insights: string[] = [];
      
      const cortisol = hormoneProfile.find(h => h.name === 'Cortisol');
      const norepinephrine = hormoneProfile.find(h => h.name === 'Norepinephrine');
      const serotonin = hormoneProfile.find(h => h.name === 'Serotonin');
      const dopamine = hormoneProfile.find(h => h.name === 'Dopamine');

      if (cortisol && cortisol.status === 'elevated') {
        insights.push('Elevated cortisol detected. Consider stress-reduction techniques or meditation.');
      }

      if (norepinephrine && norepinephrine.trend === 'increasing') {
        insights.push('Rising norepinephrine suggests increased alertness. Monitor for potential anxiety.');
      }

      if (serotonin && serotonin.level < 150) {
        insights.push('Low serotonin levels may affect mood. Consider light therapy or social connection.');
      }

      if (dopamine && dopamine.trend === 'increasing' && currentEmotionalState.primary === 'focused') {
        insights.push('Optimal dopamine and focus state detected. Ideal time for challenging tasks.');
      }

      // Emotional pattern analysis
      if (emotionalHistory.length >= 3) {
        const recentEmotions = emotionalHistory.slice(-3);
        const stressEmotions = recentEmotions.filter(e => 
          ['stressed', 'anxious', 'overwhelmed', 'frustrated'].includes(e.primary)
        );
        
        if (stressEmotions.length >= 2) {
          insights.push('Stress pattern detected in recent emotional states. Recommend relaxation protocol.');
        }
      }

      setPredictiveInsights(insights.slice(0, 3)); // Keep top 3 insights
    };

    generateInsights();
  }, [hormoneProfile, currentEmotionalState, emotionalHistory]);

  const handleEmotionSelection = useCallback((emotion: string, category: 'positive' | 'negative' | 'neutral') => {
    const newState: EmotionalState = {
      primary: emotion,
      secondary: currentEmotionalState.secondary,
      intensity: currentEmotionalState.intensity,
      valence: category === 'positive' ? 1 : category === 'negative' ? -1 : 0,
      arousal: currentEmotionalState.arousal,
      timestamp: Date.now()
    };

    setCurrentEmotionalState(newState);
    setEmotionalHistory(prev => [...prev.slice(-9), newState]);
    onEmotionalStateChange(newState);

    // Update stress markers based on emotion
    updateStressMarkers(emotion);
  }, [currentEmotionalState, onEmotionalStateChange]);

  const updateStressMarkers = useCallback((emotion: string) => {
    const markers: StressMarker[] = [];
    
    if (['stressed', 'anxious', 'overwhelmed'].includes(emotion)) {
      markers.push({
        type: 'cortisol',
        value: 18.5,
        normalRange: [5, 15],
        correlatedEmotions: ['stressed', 'anxious']
      });
      
      markers.push({
        type: 'norepinephrine',
        value: 450,
        normalRange: [150, 350],
        correlatedEmotions: ['anxious', 'overwhelmed']
      });
    }

    if (['sad', 'tired'].includes(emotion)) {
      markers.push({
        type: 'serotonin',
        value: 120,
        normalRange: [150, 300],
        correlatedEmotions: ['sad', 'tired']
      });
    }

    if (['joy', 'excited', 'confident'].includes(emotion)) {
      markers.push({
        type: 'dopamine',
        value: 3.5,
        normalRange: [2.0, 3.0],
        correlatedEmotions: ['joy', 'excited']
      });
    }

    setActiveStressMarkers(markers);
  }, []);

  const getStatusColor = (status: HormoneLevel['status']) => {
    switch (status) {
      case 'optimal': return '#10b981';
      case 'elevated': return '#f59e0b';
      case 'low': return '#3b82f6';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getTrendIcon = (trend: HormoneLevel['trend']) => {
    switch (trend) {
      case 'increasing': return '↗️';
      case 'decreasing': return '↘️';
      case 'stable': return '→';
      default: return '→';
    }
  };

  return (
    <motion.div 
      className="emotional-tagging"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="emotional-tagging-header">
        <h3>🧠💭 Advanced Emotional Intelligence & Hormonal Analysis</h3>
        <p>AI-powered emotional state tracking with real-time stress hormone predictions</p>
      </div>

      <div className="emotional-content">
        <div className="emotion-selector">
          <h4>Current Emotional State</h4>
          
          {Object.entries(emotions).map(([category, emotionList]) => (
            <div key={category} className="emotion-category">
              <h5 className={`category-title ${category}`}>
                {category.charAt(0).toUpperCase() + category.slice(1)} Emotions
              </h5>
              <div className="emotions-grid">
                {emotionList.map((emotion) => (
                  <motion.button
                    key={emotion.name}
                    className={`emotion-button ${currentEmotionalState.primary === emotion.name ? 'active' : ''}`}
                    onClick={() => handleEmotionSelection(emotion.name, category as any)}
                    style={{ 
                      '--emotion-color': emotion.color,
                      borderColor: currentEmotionalState.primary === emotion.name ? emotion.color : 'transparent'
                    } as any}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="emotion-icon">{emotion.icon}</span>
                    <span className="emotion-name">{emotion.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}

          <div className="emotion-details">
            <div className="intensity-slider">
              <label>Emotional Intensity</label>
              <input
                type="range"
                min="1"
                max="10"
                value={currentEmotionalState.intensity}
                onChange={(e) => setCurrentEmotionalState(prev => ({
                  ...prev,
                  intensity: parseInt(e.target.value)
                }))}
                className="slider"
              />
              <span className="intensity-value">{currentEmotionalState.intensity}/10</span>
            </div>

            <div className="arousal-slider">
              <label>Energy Level</label>
              <input
                type="range"
                min="1"
                max="10"
                value={currentEmotionalState.arousal}
                onChange={(e) => setCurrentEmotionalState(prev => ({
                  ...prev,
                  arousal: parseInt(e.target.value)
                }))}
                className="slider"
              />
              <span className="arousal-value">{currentEmotionalState.arousal}/10</span>
            </div>
          </div>
        </div>

        <div className="hormone-analysis">
          <h4>Real-time Hormone Profile</h4>
          <div className="hormones-grid">
            {hormoneProfile.map((hormone) => (
              <motion.div 
                key={hormone.name}
                className="hormone-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="hormone-header">
                  <h5>{hormone.name}</h5>
                  <div 
                    className="hormone-status"
                    style={{ backgroundColor: getStatusColor(hormone.status) }}
                  >
                    {hormone.status}
                  </div>
                </div>
                
                <div className="hormone-value">
                  <span className="value">{hormone.level.toFixed(1)}</span>
                  <span className="unit">{hormone.unit}</span>
                  <span className="trend">{getTrendIcon(hormone.trend)}</span>
                </div>

                {hormone.predictedChange !== 0 && (
                  <div className="predicted-change">
                    <span className={hormone.predictedChange > 0 ? 'increase' : 'decrease'}>
                      {hormone.predictedChange > 0 ? '+' : ''}{hormone.predictedChange}% predicted
                    </span>
                  </div>
                )}

                <div className="hormone-bar">
                  <div 
                    className="hormone-fill"
                    style={{
                      width: `${Math.min(100, (hormone.level / (hormone.level * 1.5)) * 100)}%`,
                      backgroundColor: getStatusColor(hormone.status)
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {activeStressMarkers.length > 0 && (
        <div className="stress-markers">
          <h4>🚨 Active Stress Biomarkers</h4>
          <div className="markers-grid">
            {activeStressMarkers.map((marker, index) => (
              <motion.div 
                key={index}
                className="stress-marker"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="marker-header">
                  <h5>{marker.type.charAt(0).toUpperCase() + marker.type.slice(1)}</h5>
                  <div className="marker-status">
                    {marker.value > marker.normalRange[1] ? 'ELEVATED' : 'LOW'}
                  </div>
                </div>
                <div className="marker-details">
                  <span>Current: {marker.value}</span>
                  <span>Normal: {marker.normalRange[0]}-{marker.normalRange[1]}</span>
                </div>
                <div className="correlated-emotions">
                  {marker.correlatedEmotions.join(', ')}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {predictiveInsights.length > 0 && (
        <div className="predictive-insights">
          <h4>🔮 AI Predictive Insights</h4>
          <div className="insights-list">
            <AnimatePresence>
              {predictiveInsights.map((insight, index) => (
                <motion.div 
                  key={insight}
                  className="insight-item"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="insight-icon">🤖</div>
                  <div className="insight-text">{insight}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {emotionalHistory.length > 0 && (
        <div className="emotional-timeline">
          <h4>📊 Emotional Pattern Analysis</h4>
          <div className="timeline">
            {emotionalHistory.slice(-6).map((state, index) => (
              <motion.div 
                key={state.timestamp}
                className="timeline-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="timeline-time">
                  {new Date(state.timestamp).toLocaleTimeString()}
                </div>
                <div className="timeline-emotion">
                  <span className="emotion-primary">{state.primary}</span>
                  <span className="emotion-intensity">({state.intensity}/10)</span>
                </div>
                <div className={`timeline-valence ${state.valence > 0 ? 'positive' : state.valence < 0 ? 'negative' : 'neutral'}`}>
                  {state.valence > 0 ? '🔼' : state.valence < 0 ? '🔽' : '➖'}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
