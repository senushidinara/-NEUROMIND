'use client';

import Sidebar from '../components/Sidebar';

export default function SettingsPage() {
  return (
    <div className="main-container">
      <Sidebar activeItem="settings" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Settings</h1>
          <p className="dashboard-subtitle">Configure your preferences and system settings</p>
          <div className="section-divider"></div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Settings Coming Soon</h2>
          <div className="section-divider"></div>
          <p>This feature is under development.</p>
        </div>
      </main>
    </div>
  );
}
