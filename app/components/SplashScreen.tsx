'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}


function AnimatedBrain() {
  return (
    <motion.div
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #4facfe, #ff006e, #8338ec)',
        filter: 'blur(2px)',
        opacity: 0.3
      }}
    />
  );
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showText, setShowText] = useState(false);

  const researchText = "Rooted in years of original research by the app's creator, this isn't just an app — it's the embodiment of data, dreams, and discovery.";
  
  const words = researchText.split(' ');

  useEffect(() => {
    try {
      const timers = [
        setTimeout(() => setCurrentPhase(1), 500),
        setTimeout(() => setCurrentPhase(2), 1000),
        setTimeout(() => setShowText(true), 1200),
        setTimeout(() => setCurrentPhase(3), 3000),
        setTimeout(() => onFinish(), 4500)
      ];

      // Failsafe - force finish after 6 seconds
      const failsafe = setTimeout(() => {
        console.log('Splash screen failsafe triggered');
        onFinish();
      }, 6000);

      return () => {
        timers.forEach(clearTimeout);
        clearTimeout(failsafe);
      };
    } catch (error) {
      console.error('Error in splash screen:', error);
      // If there's any error, immediately finish
      setTimeout(() => onFinish(), 100);
    }
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        className="splash-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #F5F0FF 0%, #F0F8FF 25%, #F0FFF8 50%, #FFFAF0 75%, #FFF0F8 100%)',
          zIndex: 9999
        }}
      >
        {/* Simplified Background */}
        <motion.div
          className="neural-lightning-bg"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        />

        {/* Simplified Neural Visualization */}
        <div
          className="neural-canvas"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}
        >
          <motion.div
            animate={{
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.3))',
              filter: 'blur(20px)'
            }}
          />
        </div>

        {/* Simplified Text with Better Visibility */}
        <motion.div
          className="splash-text-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 10,
            color: '#1A0B2E',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '3rem',
            borderRadius: '20px',
            backdropFilter: 'blur(20px)',
            border: '3px solid #A855F7',
            boxShadow: '0 20px 60px rgba(168, 85, 247, 0.4)'
          }}
        >
          <motion.div
            className="brand-signature"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="brand-name"
              style={{
                fontSize: '4.5rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #A855F7, #3B82F6, #10B981)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1.5rem',
                filter: 'drop-shadow(0 6px 30px rgba(168, 85, 247, 0.5))',
                textShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
              }}
            >
              NEUROMIND PRO
            </div>
            <div
              className="brand-subtitle"
              style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#2D1B3D',
                marginBottom: '2.5rem',
                textShadow: '0 2px 10px rgba(45, 27, 61, 0.3)'
              }}
            >
              Advanced Cognitive Enhancement Platform
            </div>
          </motion.div>

          <motion.div
            className="research-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontSize: '1.3rem',
              lineHeight: 1.7,
              color: '#4A3859',
              fontWeight: 600,
              maxWidth: '700px',
              margin: '0 auto',
              textShadow: '0 1px 5px rgba(74, 56, 89, 0.3)'
            }}
          >
            {researchText}
          </motion.div>
        </motion.div>

        {/* Simple Loading Progress */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            right: '20px',
            height: '4px',
            background: 'linear-gradient(90deg, #A855F7, #3B82F6, #10B981, #F59E0B)',
            borderRadius: '2px',
            zIndex: 10,
            boxShadow: '0 2px 10px rgba(168, 85, 247, 0.4)'
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
