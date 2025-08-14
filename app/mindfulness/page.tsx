'use client';

import { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';

export default function MindfulnessPage() {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [meditationTimer, setMeditationTimer] = useState(300); // 5 minutes default
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const activities = [
    {
      id: 'breathing',
      title: 'Guided Breathing',
      description: 'Follow the breathing pattern to calm your mind',
      icon: '🫁',
      color: '#D6E8F7',
      duration: '5-10 min'
    },
    {
      id: 'meditation',
      title: 'Timed Meditation',
      description: 'Meditate with a customizable timer',
      icon: '🧘‍♀️',
      color: '#E6D6F7',
      duration: '5-30 min'
    },
    {
      id: 'gratitude',
      title: 'Gratitude Practice',
      description: 'Reflect on things you are grateful for',
      icon: '🙏',
      color: '#D6F7E8',
      duration: '10 min'
    },
    {
      id: 'bodyscan',
      title: 'Body Scan',
      description: 'Progressive relaxation through body awareness',
      icon: '✨',
      color: '#F7E8D6',
      duration: '15 min'
    }
  ];

  const breathingCycle = useRef({
    inhale: 4000,
    hold: 4000,
    exhale: 6000
  });

  useEffect(() => {
    if (isBreathingActive) {
      const cycle = () => {
        setBreathPhase('inhale');
        setTimeout(() => {
          setBreathPhase('hold');
          setTimeout(() => {
            setBreathPhase('exhale');
            setTimeout(() => {
              setBreathCount(prev => prev + 1);
            }, breathingCycle.current.exhale);
          }, breathingCycle.current.hold);
        }, breathingCycle.current.inhale);
      };

      cycle();
      const interval = setInterval(cycle, 
        breathingCycle.current.inhale + 
        breathingCycle.current.hold + 
        breathingCycle.current.exhale
      );

      return () => clearInterval(interval);
    }
  }, [isBreathingActive, breathCount]);

  useEffect(() => {
    if (isTimerActive && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerActive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startBreathing = () => {
    setIsBreathingActive(true);
    setBreathCount(0);
  };

  const stopBreathing = () => {
    setIsBreathingActive(false);
    setBreathPhase('inhale');
  };

  const startMeditation = () => {
    setTimeRemaining(meditationTimer);
    setIsTimerActive(true);
  };

  const pauseMeditation = () => {
    setIsTimerActive(false);
  };

  const resetMeditation = () => {
    setIsTimerActive(false);
    setTimeRemaining(meditationTimer);
  };

  const renderActivity = () => {
    switch (selectedActivity) {
      case 'breathing':
        return (
          <div className="activity-container">
            <div className="activity-header">
              <h3>Guided Breathing Exercise</h3>
              <p>Follow the circle's movement and breathe deeply</p>
            </div>
            
            <div className="breathing-container">
              <div className={`breathing-circle ${breathPhase} ${isBreathingActive ? 'active' : ''}`}>
                <div className="breathing-text">
                  {!isBreathingActive ? 'Ready' : 
                   breathPhase === 'inhale' ? 'Breathe In' :
                   breathPhase === 'hold' ? 'Hold' : 'Breathe Out'}
                </div>
              </div>
              
              <div className="breathing-stats">
                <div className="breath-count">
                  <span>Breaths: {breathCount}</span>
                </div>
                <div className="phase-indicator">
                  <span>Phase: {breathPhase}</span>
                </div>
              </div>

              <div className="breathing-controls">
                {!isBreathingActive ? (
                  <button onClick={startBreathing} className="start-breathing-btn">
                    Start Breathing Exercise
                  </button>
                ) : (
                  <button onClick={stopBreathing} className="stop-breathing-btn">
                    Stop Exercise
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      case 'meditation':
        return (
          <div className="activity-container">
            <div className="activity-header">
              <h3>Timed Meditation</h3>
              <p>Set your timer and meditate in silence</p>
            </div>
            
            <div className="meditation-container">
              <div className="timer-display">
                <div className="time-remaining">{formatTime(timeRemaining)}</div>
                <div className="timer-progress">
                  <div 
                    className="progress-bar"
                    style={{ 
                      width: `${((meditationTimer - timeRemaining) / meditationTimer) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div className="timer-controls">
                <div className="timer-presets">
                  <span>Quick Set:</span>
                  {[300, 600, 900, 1200, 1800].map(time => (
                    <button 
                      key={time}
                      onClick={() => {
                        setMeditationTimer(time);
                        setTimeRemaining(time);
                      }}
                      className="preset-btn"
                    >
                      {time / 60}min
                    </button>
                  ))}
                </div>

                <div className="main-controls">
                  {!isTimerActive ? (
                    <button onClick={startMeditation} className="start-timer-btn">
                      Start Meditation
                    </button>
                  ) : (
                    <button onClick={pauseMeditation} className="pause-timer-btn">
                      Pause
                    </button>
                  )}
                  <button onClick={resetMeditation} className="reset-timer-btn">
                    Reset
                  </button>
                </div>
              </div>

              {timeRemaining === 0 && (
                <div className="meditation-complete">
                  <div className="completion-message">
                    <span className="completion-icon">🎉</span>
                    <h4>Meditation Complete!</h4>
                    <p>Great job on completing your meditation session.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'gratitude':
        return (
          <div className="activity-container">
            <div className="activity-header">
              <h3>Gratitude Practice</h3>
              <p>Take a moment to reflect on what you're grateful for today</p>
            </div>
            
            <div className="gratitude-container">
              <div className="gratitude-prompts">
                <div className="prompt-card">
                  <h4>💫 Today I am grateful for...</h4>
                  <textarea 
                    placeholder="Write about something that brought you joy today..."
                    className="gratitude-input"
                    rows={3}
                  />
                </div>

                <div className="prompt-card">
                  <h4>🌟 A person I appreciate is...</h4>
                  <textarea 
                    placeholder="Think of someone who made a positive impact..."
                    className="gratitude-input"
                    rows={3}
                  />
                </div>

                <div className="prompt-card">
                  <h4>🎯 An achievement I'm proud of...</h4>
                  <textarea 
                    placeholder="Celebrate a recent accomplishment, big or small..."
                    className="gratitude-input"
                    rows={3}
                  />
                </div>
              </div>

              <div className="gratitude-quotes">
                <h4>Daily Inspiration</h4>
                <div className="quote-card">
                  <p>"Gratitude turns what we have into enough."</p>
                  <span>- Anonymous</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'bodyscan':
        return (
          <div className="activity-container">
            <div className="activity-header">
              <h3>Body Scan Meditation</h3>
              <p>Progressive relaxation through mindful body awareness</p>
            </div>
            
            <div className="bodyscan-container">
              <div className="body-diagram">
                <div className="body-outline">
                  <div className="body-part head" data-part="head">Head</div>
                  <div className="body-part shoulders" data-part="shoulders">Shoulders</div>
                  <div className="body-part arms" data-part="arms">Arms</div>
                  <div className="body-part chest" data-part="chest">Chest</div>
                  <div className="body-part abdomen" data-part="abdomen">Abdomen</div>
                  <div className="body-part legs" data-part="legs">Legs</div>
                  <div className="body-part feet" data-part="feet">Feet</div>
                </div>
              </div>

              <div className="bodyscan-instructions">
                <h4>Body Scan Instructions</h4>
                <div className="instruction-steps">
                  <div className="step">
                    <span className="step-number">1</span>
                    <p>Lie down comfortably and close your eyes</p>
                  </div>
                  <div className="step">
                    <span className="step-number">2</span>
                    <p>Start with your head, notice any tension or sensations</p>
                  </div>
                  <div className="step">
                    <span className="step-number">3</span>
                    <p>Slowly move your attention down through each body part</p>
                  </div>
                  <div className="step">
                    <span className="step-number">4</span>
                    <p>Breathe into each area and let it relax</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="main-container">
      <Sidebar activeItem="mindfulness" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Mindfulness & Meditation</h1>
          <p className="dashboard-subtitle">Find peace and clarity through guided mindfulness practices</p>
          <div className="section-divider"></div>
        </div>

        {!selectedActivity ? (
          <div className="section-card">
            <h2 className="section-title">Choose Your Practice</h2>
            <div className="section-divider"></div>
            
            <div className="activities-grid">
              {activities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="activity-card"
                  onClick={() => setSelectedActivity(activity.id)}
                  style={{ borderColor: activity.color }}
                >
                  <div className="activity-icon">{activity.icon}</div>
                  <h3 className="activity-title">{activity.title}</h3>
                  <p className="activity-description">{activity.description}</p>
                  <div className="activity-duration">{activity.duration}</div>
                  <button className="start-activity-btn">Begin Practice</button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="section-card">
            <div className="activity-nav">
              <button 
                onClick={() => setSelectedActivity(null)}
                className="back-button"
              >
                ← Back to Practices
              </button>
            </div>
            {renderActivity()}
          </div>
        )}
      </main>
    </div>
  );
}
