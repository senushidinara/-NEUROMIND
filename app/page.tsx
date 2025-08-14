'use client';

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import EmotionalTagging from './components/EmotionalTagging';

interface CheckInData {
  mood: number;
  focus: number;
  energy: number;
  stress: number;
  memory: number;
  notes: string;
  timestamp: Date;
  emotionalState?: {
    primary: string;
    intensity: number;
    valence: number;
    arousal: number;
  };
  hormoneAlerts?: Array<{
    hormone: string;
    message: string;
    severity: 'low' | 'medium' | 'high';
  }>;
}

export default function CheckInPage() {
  const [mood, setMood] = useState(7);
  const [focus, setFocus] = useState(7);
  const [energy, setEnergy] = useState(7);
  const [stress, setStress] = useState(3);
  const [memory, setMemory] = useState(7);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkInHistory, setCheckInHistory] = useState<CheckInData[]>([]);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [currentEmotionalState, setCurrentEmotionalState] = useState<any>(null);
  const [hormoneAlerts, setHormoneAlerts] = useState<Array<{
    hormone: string;
    message: string;
    severity: 'low' | 'medium' | 'high';
  }>>([]);

  useEffect(() => {
    // Load check-in history from localStorage
    const history = localStorage.getItem('checkin-history');
    if (history) {
      const parsedHistory = JSON.parse(history).map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }));
      setCheckInHistory(parsedHistory);
      
      // Check if user already checked in today
      const today = new Date().toDateString();
      const todayCheckIn = parsedHistory.find((item: CheckInData) => 
        item.timestamp.toDateString() === today
      );
      setHasCheckedInToday(!!todayCheckIn);
    }
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newCheckIn: CheckInData = {
      mood,
      focus,
      energy,
      stress,
      memory,
      notes,
      timestamp: new Date()
    };

    const updatedHistory = [newCheckIn, ...checkInHistory.slice(0, 29)]; // Keep last 30 entries
    setCheckInHistory(updatedHistory);
    
    // Save to localStorage
    localStorage.setItem('checkin-history', JSON.stringify(updatedHistory));
    
    setHasCheckedInToday(true);
    setIsSubmitting(false);
  };

  const getMoodEmoji = (value: number) => {
    if (value >= 9) return '🤩';
    if (value >= 8) return '😄';
    if (value >= 7) return '😊';
    if (value >= 6) return '🙂';
    if (value >= 5) return '😐';
    if (value >= 4) return '😕';
    if (value >= 3) return '😞';
    if (value >= 2) return '😢';
    return '😭';
  };

  const getStressEmoji = (value: number) => {
    if (value >= 9) return '😰';
    if (value >= 7) return '😟';
    if (value >= 5) return '😐';
    if (value >= 3) return '😌';
    return '😊';
  };

  const getMetricColor = (value: number) => {
    if (value >= 8) return '#10b981';
    if (value >= 6) return '#4facfe';
    if (value >= 4) return '#fbbf24';
    return '#ef4444';
  };

  const calculateOverallScore = () => {
    return Math.round((mood + focus + energy + memory + (10 - stress)) / 5);
  };

  return (
    <div className="main-container">
      <Sidebar activeItem="checkin" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Daily Neural Check-In</h1>
          <p className="dashboard-subtitle">Track your cognitive wellness and mental state</p>
          <div className="section-divider"></div>
        </div>

        {hasCheckedInToday ? (
          <div className="section-card">
            <h2 className="section-title">✅ Today's Check-In Complete</h2>
            <div className="section-divider"></div>
            
            <div className="checkin-complete">
              <div className="completion-badge">
                <div className="badge-icon">🎯</div>
                <div className="badge-content">
                  <h3>Cognitive Assessment Complete</h3>
                  <p>Your neural wellness data has been recorded for today</p>
                  <div className="overall-score">
                    Overall Score: <span style={{ color: getMetricColor(calculateOverallScore()) }}>
                      {calculateOverallScore()}/10
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="section-card">
            <h2 className="section-title">Today's Assessment</h2>
            <div className="section-divider"></div>
            
            <div className="checkin-form">
              <div className="checkin-grid">
                <div className="metric-slider">
                  <div className="slider-header">
                    <span className="metric-icon">{getMoodEmoji(mood)}</span>
                    <div className="metric-info">
                      <h3>Mood</h3>
                      <p>Overall emotional state</p>
                    </div>
                    <span className="metric-value" style={{ color: getMetricColor(mood) }}>
                      {mood}/10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={mood}
                    onChange={(e) => setMood(parseInt(e.target.value))}
                    className="range-slider"
                    style={{ accentColor: getMetricColor(mood) }}
                  />
                </div>

                <div className="metric-slider">
                  <div className="slider-header">
                    <span className="metric-icon">🎯</span>
                    <div className="metric-info">
                      <h3>Focus</h3>
                      <p>Attention and concentration</p>
                    </div>
                    <span className="metric-value" style={{ color: getMetricColor(focus) }}>
                      {focus}/10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={focus}
                    onChange={(e) => setFocus(parseInt(e.target.value))}
                    className="range-slider"
                    style={{ accentColor: getMetricColor(focus) }}
                  />
                </div>

                <div className="metric-slider">
                  <div className="slider-header">
                    <span className="metric-icon">⚡</span>
                    <div className="metric-info">
                      <h3>Energy</h3>
                      <p>Physical and mental vitality</p>
                    </div>
                    <span className="metric-value" style={{ color: getMetricColor(energy) }}>
                      {energy}/10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={energy}
                    onChange={(e) => setEnergy(parseInt(e.target.value))}
                    className="range-slider"
                    style={{ accentColor: getMetricColor(energy) }}
                  />
                </div>

                <div className="metric-slider">
                  <div className="slider-header">
                    <span className="metric-icon">{getStressEmoji(stress)}</span>
                    <div className="metric-info">
                      <h3>Stress</h3>
                      <p>Tension and anxiety levels</p>
                    </div>
                    <span className="metric-value" style={{ color: getMetricColor(10 - stress) }}>
                      {stress}/10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={stress}
                    onChange={(e) => setStress(parseInt(e.target.value))}
                    className="range-slider"
                    style={{ accentColor: getMetricColor(10 - stress) }}
                  />
                </div>

                <div className="metric-slider">
                  <div className="slider-header">
                    <span className="metric-icon">🧠</span>
                    <div className="metric-info">
                      <h3>Memory</h3>
                      <p>Recall and retention ability</p>
                    </div>
                    <span className="metric-value" style={{ color: getMetricColor(memory) }}>
                      {memory}/10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={memory}
                    onChange={(e) => setMemory(parseInt(e.target.value))}
                    className="range-slider"
                    style={{ accentColor: getMetricColor(memory) }}
                  />
                </div>
              </div>

              <div className="notes-section">
                <h3>Additional Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How are you feeling today? Any specific thoughts or observations about your mental state..."
                  className="notes-textarea"
                  rows={4}
                />
              </div>

              <div className="checkin-summary">
                <div className="summary-metrics">
                  <div className="summary-item">
                    <span className="summary-label">Overall Score:</span>
                    <span className="summary-value" style={{ color: getMetricColor(calculateOverallScore()) }}>
                      {calculateOverallScore()}/10
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Cognitive Load:</span>
                    <span className="summary-value">{Math.round((focus + memory + energy) / 3)}/10</span>
                  </div>
                </div>

                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="submit-button"
                >
                  {isSubmitting ? '📊 Analyzing...' : '✅ Complete Check-In'}
                </button>
              </div>
            </div>
          </div>
        )}

        {checkInHistory.length > 0 && (
          <div className="section-card">
            <h2 className="section-title">Check-In History</h2>
            <div className="section-divider"></div>
            
            <div className="history-grid">
              {checkInHistory.slice(0, 7).map((entry, index) => (
                <div key={index} className="history-entry">
                  <div className="entry-date">
                    {entry.timestamp.toLocaleDateString('en-US', { 
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="entry-metrics">
                    <div className="mini-metric">
                      <span>😊</span>
                      <span>{entry.mood}</span>
                    </div>
                    <div className="mini-metric">
                      <span>🎯</span>
                      <span>{entry.focus}</span>
                    </div>
                    <div className="mini-metric">
                      <span>⚡</span>
                      <span>{entry.energy}</span>
                    </div>
                    <div className="mini-metric">
                      <span>😌</span>
                      <span>{entry.stress}</span>
                    </div>
                    <div className="mini-metric">
                      <span>🧠</span>
                      <span>{entry.memory}</span>
                    </div>
                  </div>
                  {entry.notes && (
                    <div className="entry-notes">
                      {entry.notes.length > 50 ? `${entry.notes.substring(0, 50)}...` : entry.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
