'use client';

import Sidebar from '../components/Sidebar';

export default function NFTRewardsPage() {
  return (
    <div className="main-container">
      <Sidebar activeItem="nft-rewards" />
      
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">NFT Rewards</h1>
          <p className="dashboard-subtitle">Achievement tokens and rewards</p>
          <div className="section-divider"></div>
        </div>

        <div className="section-card">
          <h2 className="section-title">NFT Rewards Coming Soon</h2>
          <div className="section-divider"></div>
          <p>This feature is under development.</p>
        </div>
      </main>
    </div>
  );
}
