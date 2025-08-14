'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function EEGPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentData, setCurrentData] = useState({
    alpha: 45,
    beta: 32,
    theta: 28,
    gamma: 15,
    delta: 20
  });

  const brainwaves = [
    { name: 'Alpha', frequency: '8-13 Hz', color: '#a855f7', description: 'Relaxed awareness' },
    { name: 'Beta', frequency: '14-30 Hz', color: '#3b82f6', description: 'Active concentration' },
    { name: 'Theta', frequency: '4-8 Hz', color: '#10b981', description: 'Deep meditation' },
    { name: 'Gamma', frequency: '30-100 Hz', color: '#f59e0b', description: 'Peak performance' },
    { name: 'Delta', frequency: '0.5-4 Hz', color: '#ef4444', description: 'Deep sleep' }
  ];

  const toggleRecording = () => {
    console.log('Button clicked! Current recording state:', isRecording);
    setIsRecording(!isRecording);

    // Visual feedback
    if (!isRecording) {
      console.log('Starting recording...');
    } else {
      console.log('Stopping recording...');
    }
  };

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setCurrentData({
          alpha: Math.floor(Math.random() * 40) + 30,
          beta: Math.floor(Math.random() * 40) + 20,
          theta: Math.floor(Math.random() * 30) + 15,
          gamma: Math.floor(Math.random() * 25) + 10,
          delta: Math.floor(Math.random() * 30) + 10
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  return (
    <div className="main-container">
      <Sidebar activeItem="eeg" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">EEG Analysis</h1>
          <p className="dashboard-subtitle">Real-time brainwave monitoring and analysis</p>
          <div className="section-divider"></div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Live Brainwave Monitor</h2>
          <div className="section-divider"></div>
          
          <div className="eeg-controls">
            <button 
              onClick={toggleRecording}
              className={`record-btn ${isRecording ? 'recording' : ''}`}
            >
              {isRecording ? '⏹ Stop Recording' : '▶ Start Recording'}
            </button>
            {isRecording && <div className="recording-indicator">🔴 Recording...</div>}
          </div>

          <div className="brainwave-chart">
            {brainwaves.map((wave) => (
              <div key={wave.name} className="wave-bar-container">
                <div className="wave-info">
                  <span className="wave-name">{wave.name}</span>
                  <span className="wave-frequency">{wave.frequency}</span>
                </div>
                <div className="wave-bar-track">
                  <div 
                    className="wave-bar-fill"
                    style={{ 
                      width: `${currentData[wave.name.toLowerCase() as keyof typeof currentData]}%`,
                      backgroundColor: wave.color 
                    }}
                  ></div>
                </div>
                <span className="wave-value">
                  {currentData[wave.name.toLowerCase() as keyof typeof currentData]}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Analysis Summary</h2>
          <div className="section-divider"></div>
          
          <div className="analysis-grid">
            <div className="analysis-card">
              <h3>Cognitive State</h3>
              <div className="state-indicator">
                <span className="state-icon">🧠</span>
                <span className="state-text">Focused</span>
              </div>
            </div>
            
            <div className="analysis-card">
              <h3>Stress Level</h3>
              <div className="stress-meter">
                <div className="stress-bar" style={{ width: '35%' }}></div>
              </div>
              <span>Low (35%)</span>
            </div>
            
            <div className="analysis-card">
              <h3>Meditation Depth</h3>
              <div className="depth-rings">
                <div className="ring active"></div>
                <div className="ring active"></div>
                <div className="ring"></div>
              </div>
              <span>Medium</span>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Brainwave Guide</h2>
          <div className="section-divider"></div>
          
          <div className="wave-guide">
            {brainwaves.map((wave) => (
              <div key={wave.name} className="guide-item">
                <div className="guide-color" style={{ backgroundColor: wave.color }}></div>
                <div className="guide-content">
                  <h4>{wave.name} Waves ({wave.frequency})</h4>
                  <p>{wave.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
