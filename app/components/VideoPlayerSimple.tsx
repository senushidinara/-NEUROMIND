'use client';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description: string;
  icon: string;
}

export default function VideoPlayerSimple({ videoId, title, description, icon }: VideoPlayerProps) {
  return (
    <div className="video-card">
      <div className="video-header">
        <span className="video-icon">{icon}</span>
        <div className="video-info">
          <h3 className="video-title">{title}</h3>
          <p className="video-description">{description}</p>
        </div>
      </div>
      
      <div className="video-container">
        <div style={{
          width: '100%',
          height: '315px',
          background: 'rgba(30, 35, 48, 0.8)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(79, 172, 254, 0.2)',
          color: '#94a3b8'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎥</div>
            <div>Video Player</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
              Video ID: {videoId}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
