'use client';

import { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function SoundscapesPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [volume, setVolume] = useState(70);
  const [activeCategory, setActiveCategory] = useState('binaural');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const soundCategories = [
    { id: 'binaural', name: 'Binaural Beats', icon: '🧠' },
    { id: 'nature', name: 'Nature Sounds', icon: '🌿' },
    { id: 'ambient', name: 'Ambient Music', icon: '🎵' },
    { id: 'focus', name: 'Focus Tracks', icon: '🎯' }
  ];

  const sounds = {
    binaural: [
      {
        id: 'alpha-waves',
        title: 'Alpha Waves (8-13 Hz)',
        description: 'Promotes relaxation and creative thinking',
        duration: '30:00',
        frequency: '10 Hz',
        benefits: ['Relaxation', 'Creativity', 'Learning'],
        color: '#E6D6F7'
      },
      {
        id: 'beta-waves',
        title: 'Beta Waves (14-30 Hz)',
        description: 'Enhances focus and concentration',
        duration: '25:00',
        frequency: '20 Hz',
        benefits: ['Focus', 'Alertness', 'Problem Solving'],
        color: '#D6E8F7'
      },
      {
        id: 'theta-waves',
        title: 'Theta Waves (4-8 Hz)',
        description: 'Deep meditation and memory enhancement',
        duration: '45:00',
        frequency: '6 Hz',
        benefits: ['Deep Meditation', 'Memory', 'Intuition'],
        color: '#D6F7E8'
      },
      {
        id: 'gamma-waves',
        title: 'Gamma Waves (30-100 Hz)',
        description: 'Peak cognitive performance',
        duration: '20:00',
        frequency: '40 Hz',
        benefits: ['Peak Performance', 'Learning', 'Memory'],
        color: '#F7E8D6'
      }
    ],
    nature: [
      {
        id: 'forest-rain',
        title: 'Forest Rain',
        description: 'Gentle rain in a peaceful forest',
        duration: '60:00',
        benefits: ['Stress Relief', 'Sleep', 'Relaxation'],
        color: '#D6F7E8'
      },
      {
        id: 'ocean-waves',
        title: 'Ocean Waves',
        description: 'Rhythmic waves on a quiet beach',
        duration: '45:00',
        benefits: ['Meditation', 'Calm', 'Focus'],
        color: '#D6E8F7'
      },
      {
        id: 'mountain-wind',
        title: 'Mountain Wind',
        description: 'Gentle breeze through mountain peaks',
        duration: '40:00',
        benefits: ['Clarity', 'Fresh Mind', 'Peace'],
        color: '#E6D6F7'
      }
    ],
    ambient: [
      {
        id: 'space-ambient',
        title: 'Cosmic Journey',
        description: 'Ethereal sounds from deep space',
        duration: '50:00',
        benefits: ['Deep Focus', 'Creativity', 'Inspiration'],
        color: '#F7D6E6'
      },
      {
        id: 'crystal-bowls',
        title: 'Crystal Singing Bowls',
        description: 'Healing frequencies from crystal bowls',
        duration: '35:00',
        benefits: ['Healing', 'Balance', 'Harmony'],
        color: '#DCF7D6'
      }
    ],
    focus: [
      {
        id: 'white-noise',
        title: 'Pure White Noise',
        description: 'Consistent background for concentration',
        duration: '∞',
        benefits: ['Deep Focus', 'Block Distractions', 'Study'],
        color: '#F7E0D6'
      },
      {
        id: 'brown-noise',
        title: 'Brown Noise',
        description: 'Lower frequency for deep concentration',
        duration: '∞',
        benefits: ['Intense Focus', 'Relaxation', 'Sleep'],
        color: '#F7DCD6'
      }
    ]
  };

  const playSound = (soundId: string) => {
    if (currentTrack === soundId && isPlaying) {
      // Pause current track
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      // Play new track
      setCurrentTrack(soundId);
      setIsPlaying(true);
      // In a real app, you would load and play the actual audio file here
      console.log(`Playing sound: ${soundId}`);
    }
  };

  const stopAllSounds = () => {
    setIsPlaying(false);
    setCurrentTrack(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  return (
    <div className="main-container">
      <Sidebar activeItem="soundscapes" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Neural Soundscapes</h1>
          <p className="dashboard-subtitle">Binaural beats and therapeutic audio for cognitive enhancement</p>
          <div className="section-divider"></div>
        </div>

        {/* Audio Player Controls */}
        <div className="section-card">
          <h2 className="section-title">Audio Player</h2>
          <div className="section-divider"></div>
          
          <div className="audio-player">
            <div className="player-info">
              {currentTrack ? (
                <div className="now-playing">
                  <span className="playing-indicator">♪</span>
                  <div className="track-info">
                    <h4>Now Playing</h4>
                    <p>{sounds[activeCategory as keyof typeof sounds]?.find(s => s.id === currentTrack)?.title || 'Unknown Track'}</p>
                  </div>
                </div>
              ) : (
                <div className="no-track">
                  <span className="music-icon">🎵</span>
                  <p>Select a track to begin</p>
                </div>
              )}
            </div>

            <div className="player-controls">
              <button 
                onClick={stopAllSounds}
                className="control-btn stop-btn"
                disabled={!currentTrack}
              >
                ⏹
              </button>
              <button 
                onClick={() => currentTrack && playSound(currentTrack)}
                className="control-btn play-pause-btn"
                disabled={!currentTrack}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
            </div>

            <div className="volume-control">
              <span className="volume-icon">🔊</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                className="volume-slider"
              />
              <span className="volume-value">{volume}%</span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="section-card">
          <div className="category-tabs">
            {soundCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              >
                <span className="tab-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sound Library */}
        <div className="section-card">
          <h2 className="section-title">
            {soundCategories.find(c => c.id === activeCategory)?.name} Library
          </h2>
          <div className="section-divider"></div>
          
          <div className="sounds-grid">
            {sounds[activeCategory as keyof typeof sounds]?.map((sound) => (
              <div 
                key={sound.id} 
                className={`sound-card ${currentTrack === sound.id ? 'playing' : ''}`}
                style={{ borderColor: sound.color }}
              >
                <div className="sound-header">
                  <h3 className="sound-title">{sound.title}</h3>
                  {sound.frequency && (
                    <span className="frequency-badge">{sound.frequency}</span>
                  )}
                </div>
                
                <p className="sound-description">{sound.description}</p>
                
                <div className="sound-meta">
                  <div className="duration">
                    <span className="meta-icon">⏱</span>
                    {sound.duration}
                  </div>
                </div>

                <div className="benefits-list">
                  <h4>Benefits:</h4>
                  <div className="benefits-tags">
                    {sound.benefits.map((benefit, index) => (
                      <span key={index} className="benefit-tag">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="sound-actions">
                  <button 
                    onClick={() => playSound(sound.id)}
                    className={`play-sound-btn ${currentTrack === sound.id && isPlaying ? 'playing' : ''}`}
                  >
                    {currentTrack === sound.id && isPlaying ? '⏸ Pause' : '▶ Play'}
                  </button>
                </div>

                {currentTrack === sound.id && (
                  <div className="playing-indicator-wave">
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Information */}
        <div className="section-card">
          <h2 className="section-title">How Neural Soundscapes Work</h2>
          <div className="section-divider"></div>
          
          <div className="benefits-info">
            <div className="info-grid">
              <div className="info-card">
                <div className="info-icon">🧠</div>
                <h3>Binaural Beats</h3>
                <p>When different frequencies are played in each ear, your brain creates a third frequency that can influence brainwave patterns and mental states.</p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">🌊</div>
                <h3>Brainwave Entrainment</h3>
                <p>Regular listening can help train your brain to produce desired frequency patterns, improving focus, relaxation, and cognitive performance.</p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">🎯</div>
                <h3>Targeted States</h3>
                <p>Different frequencies target specific mental states: Alpha for creativity, Beta for focus, Theta for meditation, and Gamma for peak performance.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Tips */}
        <div className="section-card">
          <h2 className="section-title">Usage Tips</h2>
          <div className="section-divider"></div>
          
          <div className="tips-list">
            <div className="tip-item">
              <span className="tip-icon">🎧</span>
              <div className="tip-content">
                <h4>Use Headphones</h4>
                <p>For binaural beats to work effectively, you need stereo headphones or earphones.</p>
              </div>
            </div>
            
            <div className="tip-item">
              <span className="tip-icon">⏰</span>
              <div className="tip-content">
                <h4>Listen for 15-30 Minutes</h4>
                <p>Most benefits occur within 15-30 minutes of consistent listening.</p>
              </div>
            </div>
            
            <div className="tip-item">
              <span className="tip-icon">🔊</span>
              <div className="tip-content">
                <h4>Comfortable Volume</h4>
                <p>Keep volume at a comfortable level - the beats work regardless of volume.</p>
              </div>
            </div>
            
            <div className="tip-item">
              <span className="tip-icon">🧘</span>
              <div className="tip-content">
                <h4>Relax and Focus</h4>
                <p>Find a quiet space and allow yourself to focus on the sounds for best results.</p>
              </div>
            </div>
          </div>
        </div>

        <audio ref={audioRef} />
      </main>
    </div>
  );
}
