'use client';

import Sidebar from '../components/Sidebar';

export default function GamesPage() {
  return (
    <div className="main-container">
      <Sidebar activeItem="games" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Brain Training Games</h1>
          <p className="dashboard-subtitle">Adaptive neural training exercises</p>
          <div className="section-divider"></div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Games Coming Soon</h2>
          <div className="section-divider"></div>
          <p>This feature is under development.</p>
        </div>
      </main>
    </div>
  );
}
