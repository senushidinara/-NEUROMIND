import Sidebar from '../components/Sidebar';

export default function MindfulnessPageSimple() {
  return (
    <div className="main-container">
      <Sidebar activeItem="mindfulness" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Mindfulness & Meditation</h1>
          <p className="dashboard-subtitle">Enhance your cognitive wellness through guided meditation, breathing exercises, and yoga</p>
          <div className="section-divider"></div>
        </div>

        <div className="section-card">
          <h2 className="section-title">🧘‍♀️ Guided Meditation Session</h2>
          <div className="section-divider"></div>
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
            Meditation designed to promote relaxation and mental clarity.
          </p>
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
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧘‍♀️</div>
              <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Guided Meditation</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                Video Player Coming Soon
              </div>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">🌬️ Breathing Exercises for Focus</h2>
          <div className="section-divider"></div>
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
            A series of breathing exercises aimed at enhancing focus and reducing stress.
          </p>
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
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌬️</div>
              <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Breathing Exercises</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                Interactive Session Loading...
              </div>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">🧘‍♂️ Full-Body Yoga Routine</h2>
          <div className="section-divider"></div>
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
            A comprehensive yoga session targeting flexibility and strength.
          </p>
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
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧘‍♂️</div>
              <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Yoga Routine</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                Practice Session Preparing...
              </div>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Neural Benefits</h2>
          <div className="section-divider"></div>
          
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🧠</div>
              <h3 className="benefit-title">Enhanced Neuroplasticity</h3>
              <p className="benefit-description">Meditation increases gray matter density and promotes neural connectivity</p>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-icon">⚡</div>
              <h3 className="benefit-title">Gamma Wave Activity</h3>
              <p className="benefit-description">Breathing exercises increase gamma oscillations linked to higher cognition</p>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-icon">🎯</div>
              <h3 className="benefit-title">Attention Networks</h3>
              <p className="benefit-description">Yoga strengthens the anterior cingulate cortex and improves focus</p>
            </div>
            
            <div className="benefit-item">
              <div className="benefit-icon">🌊</div>
              <h3 className="benefit-title">Stress Reduction</h3>
              <p className="benefit-description">Reduces cortisol levels and activates the parasympathetic nervous system</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
