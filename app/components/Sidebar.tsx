'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface SidebarProps {
  activeItem: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  color: string;
  description: string;
  isNew?: boolean;
  notifications?: number;
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '🧠',
    href: '/',
    color: '#E6D6F7',
    description: 'Neural command center',
    notifications: 3
  },
  {
    id: 'checkin',
    label: 'Daily Check-In',
    icon: '✅',
    href: '/checkin',
    color: '#D6F7E8',
    description: 'Cognitive wellness tracking'
  },
  {
    id: 'games',
    label: 'Brain Training',
    icon: '🎮',
    href: '/games',
    color: '#D6E8F7',
    description: 'Adaptive neural games',
    isNew: true
  },
  {
    id: 'mindfulness',
    label: 'Mindfulness',
    icon: '🧘',
    href: '/mindfulness',
    color: '#F7E8D6',
    description: 'Meditation & breathing'
  },
  {
    id: 'soundscapes',
    label: 'Neural Sounds',
    icon: '🎵',
    href: '/soundscapes',
    color: '#F7D6E6',
    description: 'Binaural beats therapy'
  },
  {
    id: 'eeg',
    label: 'EEG Analysis',
    icon: '📈',
    href: '/eeg',
    color: '#E8D6F7',
    description: 'Brainwave monitoring'
  },
  {
    id: 'nft-rewards',
    label: 'NFT Rewards',
    icon: '🏆',
    href: '/nft-rewards',
    color: '#F7E0D6',
    description: 'Achievement tokens',
    notifications: 1
  },
  {
    id: 'progress',
    label: 'Progress',
    icon: '📊',
    href: '/progress',
    color: '#D6F7DE',
    description: 'Growth analytics'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    href: '/settings',
    color: '#DCF7D6',
    description: 'System preferences'
  },
];

export default function Sidebar({ activeItem }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.div 
      className={`sidebar pastel-sidebar ${isCollapsed ? 'collapsed' : ''}`}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <motion.div 
          className="sidebar-brand"
          whileHover={{ scale: 1.05 }}
        >
          <div className="brand-icon">🧠</div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="brand-text"
              >
                <h1 className="brand-title">NEUROMIND</h1>
                <span className="brand-subtitle">PRO</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <motion.button
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className={`collapse-icon ${isCollapsed ? 'collapsed' : ''}`}>
            {isCollapsed ? '→' : '←'}
          </span>
        </motion.button>
      </div>

      {/* User Profile Section */}
      <div className="user-profile">
        <div className="profile-avatar">
          <div className="avatar-ring">
            <div className="avatar-inner">👤</div>
          </div>
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="profile-info"
            >
              <h3 className="profile-name">Neural Explorer</h3>
              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-icon">🔥</span>
                  <span className="stat-value">28</span>
                  <span className="stat-label">day streak</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">🎯</span>
                  <span className="stat-value">94%</span>
                  <span className="stat-label">accuracy</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Items */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.h4 
                className="nav-section-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                COGNITIVE TOOLS
              </motion.h4>
            )}
          </AnimatePresence>
          
          <div className="nav-items">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <motion.div
                    className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                    style={{ '--item-color': item.color } as any}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="nav-item-content">
                      <div className="nav-icon-wrapper">
                        <span className="nav-icon">{item.icon}</span>
                        {item.notifications && (
                          <motion.div 
                            className="notification-badge"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.2 }}
                          >
                            {item.notifications}
                          </motion.div>
                        )}
                        {item.isNew && (
                          <motion.div 
                            className="new-badge"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            NEW
                          </motion.div>
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {!isCollapsed && (
                          <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="nav-text"
                          >
                            <span className="nav-label">{item.label}</span>
                            <span className="nav-description">{item.description}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Active Indicator */}
                    {activeItem === item.id && (
                      <motion.div
                        className="active-indicator"
                        layoutId="activeIndicator"
                        style={{ backgroundColor: item.color }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Hover Tooltip for Collapsed State */}
                    <AnimatePresence>
                      {isCollapsed && hoveredItem === item.id && (
                        <motion.div
                          className="nav-tooltip"
                          initial={{ opacity: 0, x: -10, scale: 0.8 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -10, scale: 0.8 }}
                          style={{ borderLeftColor: item.color }}
                        >
                          <div className="tooltip-title">{item.label}</div>
                          <div className="tooltip-description">{item.description}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </nav>

      {/* Neural Activity Indicator */}
      <div className="neural-activity">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="activity-content"
            >
              <h4 className="activity-title">Neural Activity</h4>
              <div className="activity-visualization">
                <div className="activity-waves">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="activity-wave"
                      animate={{
                        height: [`${20 + Math.random() * 40}%`, `${20 + Math.random() * 40}%`],
                      }}
                      transition={{
                        duration: 1 + Math.random(),
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      style={{ backgroundColor: navItems[i % navItems.length].color }}
                    />
                  ))}
                </div>
                <div className="activity-status">
                  <span className="status-dot"></span>
                  <span className="status-text">Optimal State</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="footer-content"
            >
              <div className="version-info">
                <span className="version-label">Version</span>
                <span className="version-number">2.1.0</span>
              </div>
              <div className="connection-status">
                <span className="connection-dot"></span>
                <span className="connection-text">Neural Link Active</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
