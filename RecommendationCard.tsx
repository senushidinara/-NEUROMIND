'use client';

import { motion } from 'framer-motion';

interface RecommendationCardProps {
  icon: string;
  title: string;
  content: string;
  highlight?: string;
  priority?: 'low' | 'medium' | 'high' | 'optimal';
  neuralTarget?: string;
  expectedImpact?: number;
}

export default function RecommendationCard({ 
  icon, 
  title, 
  content, 
  highlight,
  priority = 'medium',
  neuralTarget,
  expectedImpact
}: RecommendationCardProps) {
  const formatContent = (text: string, highlightText?: string) => {
    if (!highlightText) return text;
    
    const parts = text.split(highlightText);
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <span className="highlight">{highlightText}</span>
        )}
      </span>
    ));
  };

  const getPriorityColor = () => {
    switch (priority) {
      case 'optimal': return '#10b981';
      case 'high': return '#f59e0b';
      case 'medium': return '#4facfe';
      case 'low': return '#6b7280';
      default: return '#4facfe';
    }
  };

  const getPriorityLabel = () => {
    switch (priority) {
      case 'optimal': return '🎯 OPTIMAL';
      case 'high': return '🔥 HIGH';
      case 'medium': return '⚡ MEDIUM';
      case 'low': return '📝 LOW';
      default: return '⚡ MEDIUM';
    }
  };

  return (
    <motion.div 
      className={`recommendation-item enhanced priority-${priority}`}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        boxShadow: `0 10px 30px ${getPriorityColor()}20`
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="neural-indicator"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ borderColor: getPriorityColor() }}
      />

      <div className="recommendation-header">
        <motion.span 
          className="recommendation-icon"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {icon}
        </motion.span>
        
        <div className="header-content">
          <h3 className="recommendation-title">{title}</h3>
          <div className="recommendation-meta">
            <span 
              className="priority-badge"
              style={{ backgroundColor: getPriorityColor() }}
            >
              {getPriorityLabel()}
            </span>
            {expectedImpact && (
              <span className="impact-score">
                Impact: +{expectedImpact}%
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="recommendation-content">
        {formatContent(content, highlight)}
      </div>

      {neuralTarget && (
        <motion.div 
          className="neural-target"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="target-header">
            <span className="target-icon">🎯</span>
            <span className="target-label">Neural Target:</span>
          </div>
          <span className="target-area">{neuralTarget}</span>
        </motion.div>
      )}

      <motion.div 
        className="recommendation-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <motion.button 
          className="action-btn primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ backgroundColor: getPriorityColor() }}
        >
          Start Protocol
        </motion.button>
        
        <motion.button 
          className="action-btn secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </motion.div>

      <motion.div 
        className="neural-waves"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="wave"
            style={{ 
              animationDelay: `${i * 0.3}s`,
              borderColor: getPriorityColor()
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
