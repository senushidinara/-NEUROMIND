'use client';

import { motion } from 'framer-motion';

interface MetricCardProps {
  icon: string;
  value: string;
  label: string;
  color?: string;
  gradient?: boolean;
  pulseEffect?: boolean;
  neuralData?: {
    trend: 'up' | 'down' | 'stable';
    change: number;
  };
}

export default function MetricCard({ 
  icon, 
  value, 
  label, 
  color = '#4facfe',
  gradient = false,
  pulseEffect = false,
  neuralData
}: MetricCardProps) {
  const gradientStyle = gradient ? {
    background: `linear-gradient(135deg, ${color}20, ${color}40)`,
    border: `1px solid ${color}60`,
    boxShadow: `0 0 20px ${color}20`
  } : {};

  const getTrendIcon = () => {
    if (!neuralData) return null;
    switch (neuralData.trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return null;
    }
  };

  return (
    <motion.div 
      className={`metric-card ${gradient ? 'enhanced' : ''} ${pulseEffect ? 'pulse-effect' : ''}`}
      style={gradientStyle}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        boxShadow: gradient ? `0 10px 40px ${color}30` : undefined
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {pulseEffect && (
        <motion.div 
          className="pulse-ring"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ borderColor: color }}
        />
      )}
      
      <motion.div 
        className="metric-icon"
        style={{ color }}
        animate={pulseEffect ? {
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0]
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {icon}
      </motion.div>
      
      <motion.div 
        className="metric-value" 
        style={{ color }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {value}
      </motion.div>
      
      <motion.div 
        className="metric-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {label}
      </motion.div>

      {neuralData && (
        <motion.div 
          className="neural-trend"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <span className="trend-icon">{getTrendIcon()}</span>
          <span className={`trend-value ${neuralData.trend}`}>
            {neuralData.change > 0 ? '+' : ''}{neuralData.change}%
          </span>
        </motion.div>
      )}

      {gradient && (
        <div className="neural-glow" style={{ 
          background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`
        }} />
      )}
    </motion.div>
  );
}
