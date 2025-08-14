'use client';

import Sidebar from '../components/Sidebar';

export default function SoundscapesPage() {
  return (
    <div className="main-container">
      <Sidebar activeItem="soundscapes" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Neural Soundscapes</h1>
          <p className="dashboard-subtitle">Binaural beats and therapeutic audio</p>
          <div className="section-divider"></div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Soundscapes Coming Soon</h2>
          <div className="section-divider"></div>
          <p>This feature is under development.</p>
        </div>
      </main>
    </div>
  );
}
