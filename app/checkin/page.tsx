'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function CheckInPage() {
  return (
    <div className="main-container">
      <Sidebar activeItem="checkin" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Daily Neural Check-In</h1>
          <p className="dashboard-subtitle">Track your cognitive wellness and mental state</p>
          <div className="section-divider"></div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Check-In Coming Soon</h2>
          <div className="section-divider"></div>
          <p>This feature is under development.</p>
        </div>
      </main>
    </div>
  );
}
