'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="main-container">
      <Sidebar activeItem="settings" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Settings</h1>
          <p className="dashboard-subtitle">Configure your NeuroMind experience</p>
          <div className="section-divider"></div>
        </div>

        <div className="section-card">
          <h2 className="section-title">General Settings</h2>
          <div className="section-divider"></div>
          
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Notifications</h4>
                <p>Receive reminders and updates</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Dark Mode</h4>
                <p>Switch to dark theme</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Sound Effects</h4>
                <p>Enable audio feedback</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Auto-Save</h4>
                <p>Automatically save your progress</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Account</h2>
          <div className="section-divider"></div>
          
          <div className="account-actions">
            <button className="action-btn primary">Export Data</button>
            <button className="action-btn secondary">Reset Progress</button>
            <button className="action-btn danger">Delete Account</button>
          </div>
        </div>
      </main>
    </div>
  );
}
