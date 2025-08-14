'use client';

import Sidebar from '../components/Sidebar';

export default function ProgressPage() {
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
          <h2 className="section-title">Progress Analytics Coming Soon</h2>
          <div className="section-divider"></div>
          <p>This feature is under development.</p>
        </div>
      </main>
    </div>
  );
}
