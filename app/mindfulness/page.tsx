'use client';

import Sidebar from '../components/Sidebar';

export default function MindfulnessPage() {
  return (
    <div className="main-container">
      <Sidebar activeItem="mindfulness" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Mindfulness & Meditation</h1>
          <p className="dashboard-subtitle">Breathing exercises and guided meditation</p>
          <div className="section-divider"></div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Mindfulness Coming Soon</h2>
          <div className="section-divider"></div>
          <p>This feature is under development.</p>
        </div>
      </main>
    </div>
  );
}
