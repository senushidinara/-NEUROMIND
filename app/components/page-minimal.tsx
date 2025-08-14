'use client';

import { useState } from 'react';

export default function HomePage() {
  const [message, setMessage] = useState('NeuroMind Pro is loading...');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: 'white',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        🧠 NeuroMind Pro
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Advanced Cognitive Enhancement Platform
      </p>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '2rem',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <p>{message}</p>
        <button 
          onClick={() => setMessage('System is now operational!')}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Initialize System
        </button>
      </div>
    </div>
  );
}
