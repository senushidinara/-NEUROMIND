'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [memorySequence, setMemorySequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [mathProblem, setMathProblem] = useState({ question: '', answer: 0 });
  const [mathInput, setMathInput] = useState('');
  const [mathScore, setMathScore] = useState(0);
  const [reactionStartTime, setReactionStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [showReactionButton, setShowReactionButton] = useState(false);

  const games = [
    {
      id: 'memory',
      title: 'Memory Sequence',
      description: 'Remember and repeat the sequence of colors',
      icon: '🧠',
      color: '#E6D6F7'
    },
    {
      id: 'math',
      title: 'Quick Math',
      description: 'Solve math problems as fast as you can',
      icon: '🔢',
      color: '#D6E8F7'
    },
    {
      id: 'reaction',
      title: 'Reaction Time',
      description: 'Test your reaction speed',
      icon: '⚡',
      color: '#D6F7E8'
    },
    {
      id: 'focus',
      title: 'Focus Training',
      description: 'Concentrate on the center while ignoring distractions',
      icon: '🎯',
      color: '#F7E8D6'
    }
  ];

  const generateMathProblem = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1 = Math.floor(Math.random() * 20) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;
    let answer = 0;

    switch (operation) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        if (num1 < num2) [num1, num2] = [num2, num1];
        answer = num1 - num2;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 * num2;
        break;
    }

    setMathProblem({
      question: `${num1} ${operation} ${num2}`,
      answer
    });
  };

  const startMemoryGame = () => {
    const newSequence = Array.from({ length: level + 2 }, () => Math.floor(Math.random() * 4));
    setMemorySequence(newSequence);
    setUserSequence([]);
    setIsShowingSequence(true);
    
    setTimeout(() => {
      setIsShowingSequence(false);
    }, (newSequence.length + 1) * 800);
  };

  const handleMemoryClick = (colorIndex: number) => {
    if (isShowingSequence) return;
    
    const newUserSequence = [...userSequence, colorIndex];
    setUserSequence(newUserSequence);
    
    if (newUserSequence.length === memorySequence.length) {
      if (JSON.stringify(newUserSequence) === JSON.stringify(memorySequence)) {
        setGameScore(gameScore + level * 10);
        setLevel(level + 1);
        setTimeout(() => startMemoryGame(), 1000);
      } else {
        alert(`Game Over! Score: ${gameScore}`);
        setGameScore(0);
        setLevel(1);
      }
    }
  };

  const handleMathSubmit = () => {
    if (parseInt(mathInput) === mathProblem.answer) {
      setMathScore(mathScore + 10);
      generateMathProblem();
      setMathInput('');
    } else {
      alert(`Wrong! The answer was ${mathProblem.answer}`);
      setMathScore(Math.max(0, mathScore - 5));
    }
  };

  const startReactionTest = () => {
    setShowReactionButton(false);
    const delay = Math.random() * 3000 + 1000;
    setTimeout(() => {
      setReactionStartTime(Date.now());
      setShowReactionButton(true);
    }, delay);
  };

  const handleReactionClick = () => {
    if (reactionStartTime > 0) {
      const time = Date.now() - reactionStartTime;
      setReactionTime(time);
      setShowReactionButton(false);
      setReactionStartTime(0);
    }
  };

  useEffect(() => {
    generateMathProblem();
  }, []);

  const renderGame = () => {
    switch (selectedGame) {
      case 'memory':
        return (
          <div className="game-container">
            <div className="game-header">
              <h3>Memory Sequence Game</h3>
              <div className="game-stats">
                <span>Score: {gameScore}</span>
                <span>Level: {level}</span>
              </div>
            </div>
            <div className="memory-game">
              <div className="color-grid">
                {[0, 1, 2, 3].map((colorIndex) => (
                  <button
                    key={colorIndex}
                    className={`color-button color-${colorIndex} ${
                      isShowingSequence && memorySequence[Math.floor((Date.now() % (memorySequence.length * 800)) / 800)] === colorIndex ? 'active' : ''
                    }`}
                    onClick={() => handleMemoryClick(colorIndex)}
                    disabled={isShowingSequence}
                  />
                ))}
              </div>
              <button onClick={startMemoryGame} className="start-game-btn">
                {memorySequence.length === 0 ? 'Start Game' : 'New Round'}
              </button>
            </div>
          </div>
        );

      case 'math':
        return (
          <div className="game-container">
            <div className="game-header">
              <h3>Quick Math Challenge</h3>
              <div className="game-stats">
                <span>Score: {mathScore}</span>
              </div>
            </div>
            <div className="math-game">
              <div className="math-problem">
                <span className="problem-text">{mathProblem.question} = ?</span>
              </div>
              <div className="math-input-container">
                <input
                  type="number"
                  value={mathInput}
                  onChange={(e) => setMathInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleMathSubmit()}
                  className="math-input"
                  placeholder="Your answer"
                />
                <button onClick={handleMathSubmit} className="submit-answer-btn">
                  Submit
                </button>
              </div>
            </div>
          </div>
        );

      case 'reaction':
        return (
          <div className="game-container">
            <div className="game-header">
              <h3>Reaction Time Test</h3>
              {reactionTime > 0 && (
                <div className="reaction-result">
                  Your reaction time: {reactionTime}ms
                </div>
              )}
            </div>
            <div className="reaction-game">
              <div className="reaction-area">
                {showReactionButton ? (
                  <button 
                    className="reaction-button active"
                    onClick={handleReactionClick}
                  >
                    CLICK NOW!
                  </button>
                ) : (
                  <button 
                    className="reaction-button"
                    onClick={startReactionTest}
                  >
                    {reactionStartTime === 0 ? 'Start Test' : 'Wait...'}
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      case 'focus':
        return (
          <div className="game-container">
            <div className="game-header">
              <h3>Focus Training</h3>
              <p>Keep your eyes on the center dot. Ignore the moving distractions!</p>
            </div>
            <div className="focus-game">
              <div className="focus-area">
                <div className="center-dot"></div>
                <div className="distraction distraction-1"></div>
                <div className="distraction distraction-2"></div>
                <div className="distraction distraction-3"></div>
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
      <Sidebar activeItem="games" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Brain Training Games</h1>
          <p className="dashboard-subtitle">Enhance your cognitive abilities with fun, interactive exercises</p>
          <div className="section-divider"></div>
        </div>

        {!selectedGame ? (
          <div className="section-card">
            <h2 className="section-title">Choose Your Training</h2>
            <div className="section-divider"></div>
            
            <div className="games-grid">
              {games.map((game) => (
                <div 
                  key={game.id} 
                  className="game-card"
                  onClick={() => setSelectedGame(game.id)}
                  style={{ borderColor: game.color }}
                >
                  <div className="game-icon">{game.icon}</div>
                  <h3 className="game-title">{game.title}</h3>
                  <p className="game-description">{game.description}</p>
                  <button className="play-button">Play Now</button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="section-card">
            <div className="game-nav">
              <button 
                onClick={() => setSelectedGame(null)}
                className="back-button"
              >
                ← Back to Games
              </button>
            </div>
            {renderGame()}
          </div>
        )}
      </main>
    </div>
  );
}
