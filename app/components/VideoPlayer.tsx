'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  videoId?: string;
  videoUrl?: string;
  title: string;
  description: string;
  icon: string;
  thumbnail?: string;
  duration?: string;
  category?: string;
}

export default function VideoPlayer({ 
  videoId, 
  videoUrl, 
  title, 
  description, 
  icon,
  thumbnail,
  duration,
  category
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setTotalDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Determine video source
  const getVideoSource = () => {
    if (videoUrl) return videoUrl;
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    return '';
  };

  const isYouTube = videoId && !videoUrl;
  const isDirectVideo = videoUrl;

  return (
    <motion.div 
      ref={containerRef}
      className="video-player-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="video-container">
        {isYouTube ? (
          <iframe
            className="video-iframe"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : isDirectVideo ? (
          <div className="custom-video-player">
            <video
              ref={videoRef}
              className="video-element"
              src={videoUrl}
              poster={thumbnail}
              preload="metadata"
            />
            
            {/* Custom Video Controls */}
            <div className="video-controls-overlay">
              <div className="video-header">
                <span className="video-category">{category}</span>
                <span className="video-duration">{duration || formatTime(totalDuration)}</span>
              </div>

              <div className="video-center-controls">
                <motion.button
                  className="play-button"
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </motion.button>
              </div>

              <div className="video-bottom-controls">
                <div className="progress-controls">
                  <input
                    type="range"
                    min="0"
                    max={totalDuration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="progress-slider"
                  />
                  <div className="time-display">
                    {formatTime(currentTime)} / {formatTime(totalDuration)}
                  </div>
                </div>

                <div className="control-buttons">
                  <div className="volume-control">
                    <span className="volume-icon">🔊</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="volume-slider"
                    />
                  </div>
                  
                  <motion.button
                    className="fullscreen-button"
                    onClick={toggleFullscreen}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isFullscreen ? '📉' : '📈'}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="video-placeholder">
            <div className="placeholder-icon">{icon}</div>
            <div className="placeholder-text">Video Preview</div>
          </div>
        )}
      </div>

      <div className="video-info">
        <div className="video-header-info">
          <span className="video-icon">{icon}</span>
          <div className="video-title-section">
            <h3 className="video-title">{title}</h3>
            {category && <span className="video-category-badge">{category}</span>}
          </div>
          {duration && <span className="video-duration-badge">{duration}</span>}
        </div>
        
        <p className="video-description">{description}</p>
        
        <div className="video-actions">
          <motion.button 
            className="action-button primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ▶️ Watch Now
          </motion.button>
          
          <motion.button 
            className="action-button secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⭐ Favorite
          </motion.button>
          
          <motion.button 
            className="action-button secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📤 Share
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
