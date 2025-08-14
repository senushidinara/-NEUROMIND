'use client';

import Sidebar from '../components/Sidebar';

export default function EEGPage() {
  return (
    <div className="main-container">
      <Sidebar activeItem="eeg" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">EEG Analysis</h1>
          <p className="dashboard-subtitle">Brainwave monitoring and analysis</p>
          <div className="section-divider"></div>
        </div>

        <div className="section-card">
          <h2 className="section-title">EEG Analysis Coming Soon</h2>
          <div className="section-divider"></div>
          <p>This feature is under development.</p>
        </div>
      </main>
    </div>
  );
}
