'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function NFTRewardsPage() {
  const [activeTab, setActiveTab] = useState('earned');

  const earnedNFTs = [
    {
      id: 1,
      name: 'Neural Pioneer',
      description: 'Complete your first neural assessment',
      image: '🧠',
      rarity: 'Common',
      earned: true,
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Focus Master',
      description: 'Achieve perfect focus score for 7 days',
      image: '🎯',
      rarity: 'Rare',
      earned: true,
      date: '2024-01-20'
    }
  ];

  const availableRewards = [
    {
      id: 3,
      name: 'Meditation Guru',
      description: 'Complete 100 meditation sessions',
      image: '🧘',
      rarity: 'Epic',
      progress: 67,
      requirement: 100
    },
    {
      id: 4,
      name: 'Brain Athlete',
      description: 'Win 50 brain training games',
      image: '🏃‍♂️',
      rarity: 'Legendary',
      progress: 23,
      requirement: 50
    }
  ];

  return (
    <div className="main-container">
      <Sidebar activeItem="nft-rewards" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">NFT Rewards</h1>
          <p className="dashboard-subtitle">Collect unique tokens for your cognitive achievements</p>
          <div className="section-divider"></div>
        </div>

        <div className="section-card">
          <div className="rewards-tabs">
            <button 
              onClick={() => setActiveTab('earned')}
              className={`tab-btn ${activeTab === 'earned' ? 'active' : ''}`}
            >
              🏆 Earned ({earnedNFTs.length})
            </button>
            <button 
              onClick={() => setActiveTab('available')}
              className={`tab-btn ${activeTab === 'available' ? 'active' : ''}`}
            >
              🎯 Available ({availableRewards.length})
            </button>
          </div>

          <div className="rewards-content">
            {activeTab === 'earned' ? (
              <div className="nft-grid">
                {earnedNFTs.map((nft) => (
                  <div key={nft.id} className="nft-card earned">
                    <div className="nft-image">{nft.image}</div>
                    <h3>{nft.name}</h3>
                    <p>{nft.description}</p>
                    <div className="nft-rarity">{nft.rarity}</div>
                    <div className="earned-date">Earned: {nft.date}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="nft-grid">
                {availableRewards.map((reward) => (
                  <div key={reward.id} className="nft-card available">
                    <div className="nft-image locked">{reward.image}</div>
                    <h3>{reward.name}</h3>
                    <p>{reward.description}</p>
                    <div className="nft-rarity">{reward.rarity}</div>
                    <div className="progress-section">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${(reward.progress / reward.requirement) * 100}%` }}
                        ></div>
                      </div>
                      <span>{reward.progress}/{reward.requirement}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
