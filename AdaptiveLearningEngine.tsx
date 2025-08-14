'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EEGData {
  gamma: number;
  beta: number;
  alpha: number;
  theta: number;
  delta: number;
  timestamp: number;
}

interface CognitiveState {
  attention: number;
  workload: number;
  stress: number;
  flow: number;
  fatigue: number;
}

interface AdaptiveLearningEngineProps {
  currentTask: string;
  difficulty: number;
  onDifficultyChange: (newDifficulty: number) => void;
  onRecommendation: (recommendation: string) => void;
}

export default function AdaptiveLearningEngine({ 
  currentTask, 
  difficulty, 
  onDifficultyChange, 
  onRecommendation 
}: AdaptiveLearningEngineProps) {
  const [eegData, setEegData] = useState<EEGData>({
    gamma: 45,
    beta: 65,
    alpha: 78,
    theta: 32,
    delta: 15,
    timestamp: Date.now()
  });

  const [cognitiveState, setCognitiveState] = useState<CognitiveState>({
    attention: 75,
    workload: 60,
    stress: 30,
    flow: 70,
    fatigue: 25
  });

  const [adaptationHistory, setAdaptationHistory] = useState<Array<{
    timestamp: number;
    difficulty: number;
    cognitiveState: CognitiveState;
    adaptation: string;
  }>>([]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentRecommendation, setCurrentRecommendation] = useState<string>('');

  // Simulate real-time EEG data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEegData(prev => ({
        gamma: Math.max(10, Math.min(95, prev.gamma + (Math.random() - 0.5) * 10)),
        beta: Math.max(10, Math.min(95, prev.beta + (Math.random() - 0.5) * 8)),
        alpha: Math.max(10, Math.min(95, prev.alpha + (Math.random() - 0.5) * 6)),
        theta: Math.max(10, Math.min(95, prev.theta + (Math.random() - 0.5) * 12)),
        delta: Math.max(10, Math.min(95, prev.delta + (Math.random() - 0.5) * 4)),
        timestamp: Date.now()
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Advanced cognitive state analysis based on EEG patterns
  const analyzeCognitiveState = useCallback((eeg: EEGData): CognitiveState => {
    // Attention: High gamma + moderate beta, low alpha
    const attention = Math.min(100, (eeg.gamma * 0.6 + eeg.beta * 0.4) - (eeg.alpha * 0.2));
    
    // Cognitive workload: High beta + gamma, moderate theta
    const workload = Math.min(100, (eeg.beta * 0.5 + eeg.gamma * 0.4 + eeg.theta * 0.1));
    
    // Stress: High beta/alpha ratio
    const stress = Math.min(100, (eeg.beta / eeg.alpha) * 30);
    
    // Flow state: Balanced alpha-theta with moderate gamma
    const alphaTheta = (eeg.alpha + eeg.theta) / 2;
    const flow = Math.min(100, alphaTheta * 0.7 + eeg.gamma * 0.3 - stress * 0.2);
    
    // Fatigue: High theta + delta, low gamma + beta
    const fatigue = Math.min(100, (eeg.theta * 0.4 + eeg.delta * 0.6) - (eeg.gamma * 0.3 + eeg.beta * 0.2));

    return {
      attention: Math.max(0, attention),
      workload: Math.max(0, workload),
      stress: Math.max(0, stress),
      flow: Math.max(0, flow),
      fatigue: Math.max(0, fatigue)
    };
  }, []);

  // Adaptive difficulty adjustment algorithm
  const adaptDifficulty = useCallback((state: CognitiveState, currentDiff: number): number => {
    let newDifficulty = currentDiff;
    
    // If attention is high and stress is low, increase difficulty
    if (state.attention > 80 && state.stress < 40 && state.fatigue < 30) {
      newDifficulty = Math.min(100, currentDiff + 5);
    }
    // If stress is high or attention is low, decrease difficulty
    else if (state.stress > 70 || state.attention < 40 || state.fatigue > 60) {
      newDifficulty = Math.max(10, currentDiff - 8);
    }
    // If in flow state, maintain current difficulty with slight increase
    else if (state.flow > 75) {
      newDifficulty = Math.min(100, currentDiff + 2);
    }
    // If workload is too high, decrease difficulty
    else if (state.workload > 85) {
      newDifficulty = Math.max(10, currentDiff - 5);
    }
    
    return Math.round(newDifficulty);
  }, []);

  // Generate personalized recommendations
  const generateRecommendation = useCallback((state: CognitiveState, eeg: EEGData): string => {
    if (state.stress > 60) {
      return "High stress detected. Consider taking a 5-minute breathing break or switching to alpha wave meditation.";
    }
    
    if (state.fatigue > 70) {
      return "Cognitive fatigue detected. Recommend taking a 10-minute break or trying theta wave relaxation.";
    }
    
    if (state.attention < 40) {
      return "Attention levels low. Try gamma wave stimulation or a short physical exercise to boost focus.";
    }
    
    if (state.flow > 80) {
      return "Excellent flow state detected! This is optimal for learning. Continue with current activity.";
    }
    
    if (eeg.gamma > 80 && eeg.beta > 70) {
      return "High cognitive activity detected. Perfect for complex problem-solving tasks.";
    }
    
    if (eeg.alpha > 75 && eeg.theta > 60) {
      return "Relaxed awareness state detected. Great for creative thinking and memory consolidation.";
    }
    
    return "Cognitive state is balanced. Gradually increasing task complexity recommended.";
  }, []);

  // Main adaptation loop
  useEffect(() => {
    setIsAnalyzing(true);
    
    const newCognitiveState = analyzeCognitiveState(eegData);
    setCognitiveState(newCognitiveState);
    
    const newDifficulty = adaptDifficulty(newCognitiveState, difficulty);
    const recommendation = generateRecommendation(newCognitiveState, eegData);
    
    if (newDifficulty !== difficulty) {
      onDifficultyChange(newDifficulty);
      
      // Record adaptation with unique timestamp
      setAdaptationHistory(prev => [
        {
          timestamp: Date.now() + Math.random(), // Add randomness to ensure uniqueness
          difficulty: newDifficulty,
          cognitiveState: newCognitiveState,
          adaptation: `Difficulty adjusted from ${difficulty}% to ${newDifficulty}%`
        },
        ...prev.slice(0, 9)
      ]);
    }
    
    if (recommendation !== currentRecommendation) {
      setCurrentRecommendation(recommendation);
      onRecommendation(recommendation);
    }
    
    setTimeout(() => setIsAnalyzing(false), 800);
  }, [eegData, difficulty, analyzeCognitiveState, adaptDifficulty, generateRecommendation, onDifficultyChange, onRecommendation, currentRecommendation]);

  const getStateColor = (value: number) => {
    if (value >= 80) return '#10b981';
    if (value >= 60) return '#4facfe';
    if (value >= 40) return '#fbbf24';
    return '#ef4444';
  };

  const getStateLabel = (key: string, value: number) => {
    const labels: Record<string, string[]> = {
      attention: ['Poor', 'Low', 'Moderate', 'Good', 'Excellent'],
      workload: ['Minimal', 'Light', 'Moderate', 'High', 'Overload'],
      stress: ['Calm', 'Relaxed', 'Moderate', 'High', 'Critical'],
      flow: ['Blocked', 'Scattered', 'Focused', 'Engaged', 'Flow State'],
      fatigue: ['Fresh', 'Alert', 'Moderate', 'Tired', 'Exhausted']
    };
    
    const index = Math.min(4, Math.floor(value / 20));
    return labels[key]?.[index] || 'Unknown';
  };

  return (
    <motion.div 
      className="adaptive-learning-engine"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="engine-header">
        <div className="engine-title">
          <h3>🧠 EEG Adaptive Learning Engine</h3>
          <div className={`analysis-indicator ${isAnalyzing ? 'analyzing' : ''}`}>
            <div className="pulse-dot"></div>
            <span>{isAnalyzing ? 'Analyzing...' : 'Monitoring'}</span>
          </div>
        </div>
        
        <div className="current-task">
          <span className="task-label">Current Task:</span>
          <span className="task-name">{currentTask}</span>
          <span className="difficulty-badge" style={{ backgroundColor: getStateColor(difficulty) }}>
            {difficulty}% Difficulty
          </span>
        </div>
      </div>

      <div className="engine-content">
        <div className="cognitive-states">
          <h4>Real-time Cognitive Analysis</h4>
          <div className="states-grid">
            {Object.entries(cognitiveState).map(([key, value], index) => (
              <motion.div
                key={`cognitive-${key}-${index}`}
                className="state-item"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="state-header">
                  <span className="state-name">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <span className="state-value" style={{ color: getStateColor(value) }}>
                    {Math.round(value)}%
                  </span>
                </div>
                <div className="state-bar">
                  <motion.div 
                    className="state-fill"
                    style={{ 
                      width: `${value}%`,
                      backgroundColor: getStateColor(value)
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="state-label">{getStateLabel(key, value)}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="eeg-spectrum">
          <h4>Live EEG Brainwave Spectrum</h4>
          <div className="spectrum-grid">
            {Object.entries(eegData).filter(([key]) => key !== 'timestamp').map(([wave, value], index) => (
              <motion.div
                key={`eeg-${wave}-${index}`}
                className="wave-meter"
                whileHover={{ scale: 1.02 }}
              >
                <div className="wave-header">
                  <span className="wave-name">{wave.toUpperCase()}</span>
                  <span className="wave-value">{Math.round(value as number)}%</span>
                </div>
                <div className="wave-spectrum">
                  <motion.div 
                    className="spectrum-bar"
                    style={{ 
                      height: `${value}%`,
                      background: `linear-gradient(180deg, ${getStateColor(value as number)}, ${getStateColor(value as number)}80)`
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${value}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {currentRecommendation && (
            <motion.div 
              className="ai-recommendation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <div className="recommendation-header">
                <span className="recommendation-icon">🎯</span>
                <span className="recommendation-title">AI Recommendation</span>
              </div>
              <p className="recommendation-text">{currentRecommendation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {adaptationHistory.length > 0 && (
          <div className="adaptation-history">
            <h4>Recent Adaptations</h4>
            <div className="history-list">
              {adaptationHistory.slice(0, 3).map((entry, index) => (
                <motion.div
                  key={`adaptation-${entry.timestamp}-${index}`}
                  className="history-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="history-time">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="history-adaptation">{entry.adaptation}</div>
                  <div className="history-metrics">
                    Focus: {Math.round(entry.cognitiveState.attention)}% | 
                    Stress: {Math.round(entry.cognitiveState.stress)}% | 
                    Flow: {Math.round(entry.cognitiveState.flow)}%
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
