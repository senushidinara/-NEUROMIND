'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

interface MetricData {
  mood: number;
  energy: number;
  focus: number;
  stress: number;
}

export default function CheckInPage() {
  const [metrics, setMetrics] = useState<MetricData>({
    mood: 5,
    energy: 5,
    focus: 5,
    stress: 5
  });
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleMetricChange = (metric: keyof MetricData, value: number) => {
    setMetrics(prev => ({
      ...prev,
      [metric]: value
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const getMetricColor = (value: number) => {
    if (value <= 3) return '#ef4444';
    if (value <= 6) return '#f59e0b';
    return '#10b981';
  };

  const metricConfig = [
    { key: 'mood' as keyof MetricData, label: 'Mood', icon: '😊', description: 'How are you feeling today?' },
    { key: 'energy' as keyof MetricData, label: 'Energy', icon: '⚡', description: 'Your energy level right now' },
    { key: 'focus' as keyof MetricData, label: 'Focus', icon: '🎯', description: 'Ability to concentrate' },
    { key: 'stress' as keyof MetricData, label: 'Stress', icon: '😰', description: 'Current stress level' }
  ];

  return (
    <div className="main-container">
      <Sidebar activeItem="checkin" />

      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Daily Neural Check-In</h1>
          <p className="dashboard-subtitle">Track your cognitive wellness and mental state</p>
          <div className="section-divider"></div>
        </div>

        {!isSubmitted ? (
          <form className="checkin-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="checkin-grid">
              {metricConfig.map((config) => (
                <div key={config.key} className="metric-slider">
                  <div className="slider-header">
                    <div className="metric-info">
                      <h3>
                        <span className="metric-icon">{config.icon}</span>
                        {config.label}
                      </h3>
                      <p>{config.description}</p>
                    </div>
                    <div
                      className="metric-value"
                      style={{ borderColor: getMetricColor(metrics[config.key]) }}
                    >
                      {metrics[config.key]}/10
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={metrics[config.key]}
                    onChange={(e) => handleMetricChange(config.key, parseInt(e.target.value))}
                    className="range-slider"
                    style={{
                      background: `linear-gradient(to right, ${getMetricColor(metrics[config.key])} 0%, ${getMetricColor(metrics[config.key])} ${metrics[config.key] * 10}%, #e2e8f0 ${metrics[config.key] * 10}%, #e2e8f0 100%)`
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="notes-section">
              <h3>Daily Notes</h3>
              <textarea
                className="notes-textarea"
                placeholder="How are you feeling today? Any thoughts or observations about your mental state..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="checkin-summary">
              <div className="summary-metrics">
                {metricConfig.map((config) => (
                  <div key={config.key} className="summary-item">
                    <div className="summary-label">{config.label}</div>
                    <div
                      className="summary-value"
                      style={{ color: getMetricColor(metrics[config.key]) }}
                    >
                      {metrics[config.key]}/10
                    </div>
                  </div>
                ))}
              </div>
              <button type="submit" className="submit-button">
                Complete Check-In
              </button>
            </div>
          </form>
        ) : (
          <div className="checkin-complete">
            <div className="completion-badge">
              <div className="badge-icon">✅</div>
              <div className="badge-content">
                <h3>Check-In Complete!</h3>
                <p>Your daily wellness data has been recorded.</p>
                <div className="overall-score">
                  Overall Score: {Math.round((metrics.mood + metrics.energy + metrics.focus + (10 - metrics.stress)) / 4)}/10
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
