'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIAgentProps {
  cognitiveLoad: number;
  memoryScore: number;
  focusLevel: number;
  stressLevel: number;
  advanced?: boolean;
  neuralData?: {
    gamma: number;
    beta: number;
    alpha: number;
    theta: number;
    delta: number;
  };
}

interface AIMessage {
  id: string;
  message: string;
  type: 'suggestion' | 'analysis' | 'encouragement' | 'warning' | 'insight' | 'protocol';
  timestamp: Date;
  confidence: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  neuralBasis?: string;
}

interface NeuralInsight {
  pattern: string;
  significance: number;
  recommendation: string;
  brainwaveTarget: string;
}

export default function AIAgent({ 
  cognitiveLoad, 
  memoryScore, 
  focusLevel, 
  stressLevel,
  advanced = false,
  neuralData
}: AIAgentProps) {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [neuralInsights, setNeuralInsights] = useState<NeuralInsight[]>([]);
  const [agentMood, setAgentMood] = useState<'analytical' | 'supportive' | 'focused' | 'concerned'>('analytical');
  const [learningProgress, setLearningProgress] = useState(67);

  // Advanced neural pattern analysis
  const analyzeNeuralPatterns = () => {
    if (!neuralData || !advanced) return [];

    const insights: NeuralInsight[] = [];

    // Gamma-Beta coupling analysis
    if (neuralData.gamma > 70 && neuralData.beta > 60) {
      insights.push({
        pattern: 'High-Performance Cognitive State',
        significance: 0.92,
        recommendation: 'Optimal window for complex problem-solving tasks',
        brainwaveTarget: 'Gamma-Beta Network'
      });
    }

    // Alpha-Theta coherence
    if (neuralData.alpha > 75 && neuralData.theta > 50) {
      insights.push({
        pattern: 'Creative Flow State Detected',
        significance: 0.88,
        recommendation: 'Engage in creative or innovative thinking exercises',
        brainwaveTarget: 'Default Mode Network'
      });
    }

    // Delta wave anomaly
    if (neuralData.delta > 40 && focusLevel > 70) {
      insights.push({
        pattern: 'Paradoxical Delta Activity',
        significance: 0.75,
        recommendation: 'Possible deep processing state - maintain current activity',
        brainwaveTarget: 'Thalamo-Cortical Loop'
      });
    }

    return insights;
  };

  const generateAdvancedAIResponse = (metrics: typeof cognitiveLoad extends number ? {
    cognitiveLoad: number;
    memoryScore: number;
    focusLevel: number;
    stressLevel: number;
  } : never) => {
    const neuralState = neuralData;
    const patterns = analyzeNeuralPatterns();
    
    // Determine agent mood based on overall state
    if (stressLevel > 70) setAgentMood('concerned');
    else if (focusLevel > 80 && cognitiveLoad < 60) setAgentMood('supportive');
    else if (neuralState && neuralState.gamma > 80) setAgentMood('focused');
    else setAgentMood('analytical');

    const advancedResponses = {
      neuralOptimization: [
        `Advanced neural analysis shows ${neuralState?.gamma.toFixed(1)}Hz gamma activity. This indicates high-level cognitive binding. Perfect time for complex reasoning tasks.`,
        `I'm detecting optimal alpha-theta bridging at ${neuralState?.alpha.toFixed(1)}Hz/${neuralState?.theta.toFixed(1)}Hz. Your brain is primed for breakthrough insights.`,
        `Beta wave coherence is at ${neuralState?.beta.toFixed(1)}Hz. Your focused attention networks are highly synchronized. Leverage this for detailed work.`
      ],
      
      protocolRecommendations: [
        'Initiating personalized neuroplasticity protocol: 15-minute gamma entrainment at 40Hz followed by alpha restoration at 10Hz.',
        'Your neural signature suggests responsiveness to theta-gamma coupling. Activating targeted meditation protocol.',
        'Cortical arousal levels optimal. Implementing working memory enhancement sequence with beta-band stimulation.'
      ],
      
      cognitiveInsights: [
        `Neural efficiency index: ${((focusLevel + memoryScore - stressLevel) / 2.5).toFixed(1)}/10. Your cognitive architecture is performing ${focusLevel > 75 ? 'excellently' : 'within normal parameters'}.`,
        `Detecting ${patterns.length > 0 ? 'significant' : 'baseline'} brainwave patterns. Current state suggests ${focusLevel > 80 ? 'peak' : 'standard'} cognitive performance.`,
        `Your neural coherence metrics indicate ${cognitiveLoad < 50 ? 'low cognitive demand' : 'active processing'}. Adjusting recommendations accordingly.`
      ],

      adaptiveGuidance: [
        'Based on your neural profile, I recommend shifting to right-hemisphere dominant tasks for the next 20 minutes to optimize creativity.',
        'Your prefrontal cortex shows signs of high activation. Perfect timing for executive function challenges.',
        'Limbic system arousal detected. Implementing emotion-regulation breathing protocol to optimize decision-making.'
      ]
    };

    const responseCategories = Object.keys(advancedResponses) as Array<keyof typeof advancedResponses>;
    const category = responseCategories[Math.floor(Math.random() * responseCategories.length)];
    const responses = advancedResponses[category];
    const selectedResponse = responses[Math.floor(Math.random() * responses.length)];

    return {
      message: selectedResponse,
      type: category === 'protocolRecommendations' ? 'protocol' as const :
            category === 'cognitiveInsights' ? 'insight' as const :
            category === 'adaptiveGuidance' ? 'suggestion' as const : 'analysis' as const,
      confidence: 0.85 + Math.random() * 0.15,
      priority: cognitiveLoad > 80 ? 'high' as const :
                stressLevel > 60 ? 'medium' as const : 'low' as const,
      neuralBasis: neuralState ? `Gamma: ${neuralState.gamma.toFixed(1)}Hz, Alpha: ${neuralState.alpha.toFixed(1)}Hz, Beta: ${neuralState.beta.toFixed(1)}Hz` : undefined
    };
  };

  const generateBasicAIResponse = (metrics: { cognitiveLoad: number; memoryScore: number; focusLevel: number; stressLevel: number }) => {
    const responses = {
      highLoad: [
        "I notice your cognitive load is elevated at {cognitiveLoad}%. Consider taking a 5-minute breathing break to optimize performance.",
        "Your brain is working hard! Let's reduce task complexity for the next 10 minutes to prevent fatigue.",
        "High cognitive demand detected. I'm adjusting the next exercise difficulty down by 20%."
      ],
      lowFocus: [
        "Your focus level is at {focusLevel}%. Try a quick 2-minute attention training exercise to sharpen concentration.",
        "I'm seeing some attention drift. Would you like me to start a focus-enhancement protocol?",
        "Let's boost that focus! I recommend a brief mindfulness exercise or a change of environment."
      ],
      highStress: [
        "Stress level at {stressLevel}% - let's work on bringing that down. I'll guide you through a stress-reduction technique.",
        "I'm detecting elevated stress. This can impact memory formation. Consider a brief relaxation break.",
        "High stress detected. Your learning efficiency may be compromised. Let's try some calming exercises."
      ],
      goodBalance: [
        "Excellent cognitive balance! Your metrics show optimal performance. This is a great time for challenging tasks.",
        "Your brain is in a fantastic state today. Memory at {memoryScore}%, focus at {focusLevel}% - perfect for learning!",
        "I'm impressed by your cognitive stability. Your neural efficiency is running high today!"
      ]
    };

    let selectedCategory: keyof typeof responses;
    let priority: 'low' | 'medium' | 'high' = 'low';

    if (cognitiveLoad > 75) {
      selectedCategory = 'highLoad';
      priority = 'high';
    } else if (focusLevel < 60) {
      selectedCategory = 'lowFocus';
      priority = 'medium';
    } else if (stressLevel > 60) {
      selectedCategory = 'highStress';
      priority = 'high';
    } else {
      selectedCategory = 'goodBalance';
      priority = 'low';
    }

    const templates = responses[selectedCategory];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    const message = template
      .replace('{cognitiveLoad}', cognitiveLoad.toString())
      .replace('{memoryScore}', memoryScore.toString())
      .replace('{focusLevel}', focusLevel.toString())
      .replace('{stressLevel}', stressLevel.toString());

    return {
      message,
      type: selectedCategory === 'goodBalance' ? 'encouragement' as const : 'suggestion' as const,
      confidence: 0.7 + Math.random() * 0.2,
      priority
    };
  };

  useEffect(() => {
    setIsThinking(true);
    
    const timer = setTimeout(() => {
      const responseData = advanced ? 
        generateAdvancedAIResponse({ cognitiveLoad, memoryScore, focusLevel, stressLevel }) :
        generateBasicAIResponse({ cognitiveLoad, memoryScore, focusLevel, stressLevel });

      const newMessage: AIMessage = {
        id: Date.now().toString(),
        timestamp: new Date(),
        ...responseData
      };

      setMessages(prev => [newMessage, ...prev.slice(0, 4)]);
      setNeuralInsights(analyzeNeuralPatterns());
      setIsThinking(false);
      
      // Update learning progress
      setLearningProgress(prev => Math.min(100, prev + Math.random() * 3));
    }, 1500 + Math.random() * 1000);

    return () => clearTimeout(timer);
  }, [cognitiveLoad, memoryScore, focusLevel, stressLevel, advanced]);

  const getMessageColor = (type: AIMessage['type']) => {
    switch (type) {
      case 'warning': return '#ef4444';
      case 'encouragement': return '#10b981';
      case 'suggestion': return '#4facfe';
      case 'analysis': return '#8338ec';
      case 'insight': return '#ff006e';
      case 'protocol': return '#00f2fe';
      default: return '#4facfe';
    }
  };

  const getPriorityIcon = (priority: AIMessage['priority']) => {
    switch (priority) {
      case 'critical': return '🚨';
      case 'high': return '🔥';
      case 'medium': return '⚡';
      case 'low': return '💡';
      default: return '💡';
    }
  };

  const getAgentAvatar = () => {
    switch (agentMood) {
      case 'analytical': return '🤖';
      case 'supportive': return '🧠';
      case 'focused': return '🎯';
      case 'concerned': return '🚨';
      default: return '🤖';
    }
  };

  return (
    <motion.div 
      className={`ai-agent ${advanced ? 'advanced' : 'basic'}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="agent-header">
        <motion.div 
          className="agent-avatar"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {getAgentAvatar()}
        </motion.div>
        <div className="agent-info">
          <h3>Neural AI Coach</h3>
          <div className="agent-status">
            <span className={`status-indicator ${agentMood}`}>
              {agentMood.charAt(0).toUpperCase() + agentMood.slice(1)} Mode
            </span>
            {advanced && (
              <span className="learning-progress">
                Learning: {learningProgress}%
              </span>
            )}
          </div>
        </div>
      </div>

      {advanced && neuralInsights.length > 0 && (
        <motion.div 
          className="neural-insights-panel"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h4>🧠 Neural Pattern Analysis</h4>
          {neuralInsights.slice(0, 2).map((insight, index) => (
            <motion.div 
              key={index}
              className="insight-item"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="insight-header">
                <span className="pattern-name">{insight.pattern}</span>
                <span className="significance">
                  {(insight.significance * 100).toFixed(0)}% confidence
                </span>
              </div>
              <div className="insight-recommendation">{insight.recommendation}</div>
              <div className="brainwave-target">Target: {insight.brainwaveTarget}</div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="agent-messages">
        <AnimatePresence>
          {isThinking && (
            <motion.div 
              className="thinking-indicator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="thinking-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>Analyzing neural patterns...</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="messages-container">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className={`message-item ${message.type} priority-${message.priority}`}
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{ borderLeftColor: getMessageColor(message.type) }}
              >
                <div className="message-header">
                  <span className="message-icon">{getPriorityIcon(message.priority)}</span>
                  <span className="message-type">{message.type.toUpperCase()}</span>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                  {advanced && (
                    <span className="confidence-score">
                      {(message.confidence * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
                <div className="message-content">{message.message}</div>
                {advanced && message.neuralBasis && (
                  <div className="neural-basis">
                    <span className="basis-label">Neural Basis:</span>
                    <span className="basis-data">{message.neuralBasis}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {advanced && (
        <motion.div 
          className="agent-controls"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button 
            className="control-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎯 Start Protocol
          </motion.button>
          <motion.button 
            className="control-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📊 Full Analysis
          </motion.button>
          <motion.button 
            className="control-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            💊 Supplements
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
