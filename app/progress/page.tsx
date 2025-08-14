'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function ProgressPage() {
  const [timeframe, setTimeframe] = useState('week');

  const stats = {
    totalSessions: 47,
    averageScore: 8.2,
    improvementRate: 15,
    streakDays: 12
  };

  const weeklyData = [
    { day: 'Mon', mood: 7, focus: 8, energy: 6 },
    { day: 'Tue', mood: 8, focus: 7, energy: 7 },
    { day: 'Wed', mood: 6, focus: 9, energy: 8 },
    { day: 'Thu', mood: 9, focus: 8, energy: 7 },
    { day: 'Fri', mood: 8, focus: 7, energy: 9 },
    { day: 'Sat', mood: 9, focus: 6, energy: 8 },
    { day: 'Sun', mood: 7, focus: 8, energy: 7 }
  ];

  return (
    <div className="main-container">
      <Sidebar activeItem="progress" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Progress Analytics</h1>
          <p className="dashboard-subtitle">Track your cognitive growth and achievements</p>
          <div className="section-divider"></div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Overview Stats</h2>
          <div className="section-divider"></div>
          
          <div className="stats-overview">
            <div className="stat-item">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <div className="stat-value">{stats.totalSessions}</div>
                <div className="stat-label">Total Sessions</div>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <div className="stat-value">{stats.averageScore}</div>
                <div className="stat-label">Average Score</div>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <div className="stat-value">+{stats.improvementRate}%</div>
                <div className="stat-label">Improvement</div>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">🔥</div>
              <div className="stat-content">
                <div className="stat-value">{stats.streakDays}</div>
                <div className="stat-label">Day Streak</div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Weekly Progress</h2>
          <div className="section-divider"></div>
          
          <div className="chart-container">
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color mood"></span>
                <span>Mood</span>
              </div>
              <div className="legend-item">
                <span className="legend-color focus"></span>
                <span>Focus</span>
              </div>
              <div className="legend-item">
                <span className="legend-color energy"></span>
                <span>Energy</span>
              </div>
            </div>
            
            <div className="progress-chart">
              {weeklyData.map((day, index) => (
                <div key={index} className="chart-day">
                  <div className="day-bars">
                    <div 
                      className="progress-bar mood" 
                      style={{ height: `${day.mood * 10}%` }}
                      title={`Mood: ${day.mood}`}
                    ></div>
                    <div 
                      className="progress-bar focus" 
                      style={{ height: `${day.focus * 10}%` }}
                      title={`Focus: ${day.focus}`}
                    ></div>
                    <div 
                      className="progress-bar energy" 
                      style={{ height: `${day.energy * 10}%` }}
                      title={`Energy: ${day.energy}`}
                    ></div>
                  </div>
                  <span className="day-label">{day.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Achievements</h2>
          <div className="section-divider"></div>
          
          <div className="achievements-grid">
            <div className="achievement-item unlocked">
              <div className="achievement-icon">🏆</div>
              <h4>First Steps</h4>
              <p>Complete your first check-in</p>
            </div>
            
            <div className="achievement-item unlocked">
              <div className="achievement-icon">🎯</div>
              <h4>Focus Master</h4>
              <p>Score 9+ on focus for 3 days</p>
            </div>
            
            <div className="achievement-item locked">
              <div className="achievement-icon">🧠</div>
              <h4>Mind Reader</h4>
              <p>Complete 50 brain training sessions</p>
            </div>
            
            <div className="achievement-item locked">
              <div className="achievement-icon">🌟</div>
              <h4>Zen Master</h4>
              <p>Meditate for 30 days straight</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
