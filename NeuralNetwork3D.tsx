'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Trail, Float, MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface NeuralNetwork3DProps {
  cognitiveLoad: number;
  memoryActivity: number;
  focusLevel: number;
}

// Neural Particles Component
function NeuralParticles({ count = 1000 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;

      // Ensure no NaN values
      positions[i * 3] = isNaN(x) ? 0 : x;
      positions[i * 3 + 1] = isNaN(y) ? 0 : y;
      positions[i * 3 + 2] = isNaN(z) ? 0 : z;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      const time = state.clock.elapsedTime;
      const rotX = time * 0.1;
      const rotY = time * 0.05;

      // Ensure rotations are valid numbers
      points.current.rotation.x = isNaN(rotX) ? 0 : rotX;
      points.current.rotation.y = isNaN(rotY) ? 0 : rotY;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#4facfe"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Adaptive Neural Node Component
function NeuralNode({
  position,
  color,
  activity,
  pulseSpeed = 1
}: {
  position: [number, number, number];
  color: string;
  activity: number;
  pulseSpeed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Validate props to prevent errors
  const safePosition: [number, number, number] = [
    isNaN(position[0]) ? 0 : position[0],
    isNaN(position[1]) ? 0 : position[1],
    isNaN(position[2]) ? 0 : position[2]
  ];
  const safeActivity = isNaN(activity) ? 0.5 : Math.max(0, Math.min(1, activity));
  const safePulseSpeed = isNaN(pulseSpeed) ? 1 : Math.max(0.1, pulseSpeed);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const pulse = 1 + Math.sin(time * safePulseSpeed) * 0.3 * safeActivity;
      const validPulse = isNaN(pulse) ? 1 : Math.max(0.1, pulse);

      meshRef.current.scale.setScalar(validPulse);

      if (hovered) {
        const rotX = time * 2;
        const rotY = time * 2;
        meshRef.current.rotation.x = isNaN(rotX) ? 0 : rotX;
        meshRef.current.rotation.y = isNaN(rotY) ? 0 : rotY;
      }
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={safePosition}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[0.15, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.8}
          distort={hovered ? 0.6 : 0.2}
          speed={2}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh position={safePosition}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.2}
        />
      </mesh>
    </Float>
  );
}

// Lightning Connections Component
function LightningConnections({ 
  nodes, 
  activity 
}: { 
  nodes: Array<{ position: [number, number, number]; layer: number; color: string }>;
  activity: number;
}) {
  const connectionsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (connectionsRef.current) {
      connectionsRef.current.children.forEach((connection, index) => {
        if (connection instanceof THREE.Line) {
          const material = connection.material as THREE.LineBasicMaterial;
          const time = state.clock.elapsedTime;
          const opacity = 0.1 + Math.sin(time * 2 + index) * 0.3 * activity;
          const validOpacity = isNaN(opacity) ? 0.1 : Math.max(0, Math.min(1, opacity));
          material.opacity = validOpacity;
        }
      });
    }
  });

  const connections = useMemo(() => {
    const lines: JSX.Element[] = [];
    
    nodes.forEach((node, i) => {
      nodes.forEach((target, j) => {
        if (target.layer === node.layer + 1 && Math.random() > 0.7) {
          // Validate positions to prevent NaN values
          const nodePos = node.position.map(p => isNaN(p) ? 0 : p);
          const targetPos = target.position.map(p => isNaN(p) ? 0 : p);

          lines.push(
            <line key={`${i}-${j}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    ...nodePos,
                    ...targetPos
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color="#4facfe"
                transparent
                opacity={0.3}
              />
            </line>
          );
        }
      });
    });
    
    return lines;
  }, [nodes]);

  return <group ref={connectionsRef}>{connections}</group>;
}

// EEG Wave Visualization
function EEGWaves({ focusLevel }: { focusLevel: number }) {
  const wavesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (wavesRef.current) {
      const time = state.clock.elapsedTime;
      const rotZ = time * 0.5;
      wavesRef.current.rotation.z = isNaN(rotZ) ? 0 : rotZ;

      wavesRef.current.children.forEach((wave, index) => {
        if (wave instanceof THREE.Mesh) {
          const material = wave.material as THREE.MeshBasicMaterial;
          const opacity = 0.3 + Math.sin(time * 3 + index) * 0.2 * (focusLevel / 100);
          const validOpacity = isNaN(opacity) ? 0.3 : Math.max(0, Math.min(1, opacity));
          material.opacity = validOpacity;
        }
      });
    }
  });

  return (
    <group ref={wavesRef}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <torusGeometry args={[2 + i * 0.5, 0.05, 8, 50]} />
          <meshBasicMaterial
            color={`hsl(${200 + i * 30}, 80%, 60%)`}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

// Advanced Brain Visualization
function AdvancedBrain({ cognitiveLoad, memoryActivity, focusLevel }: NeuralNetwork3DProps) {
  const brainRef = useRef<THREE.Group>(null);

  // Validate props locally
  const validCognitiveLoad = isNaN(cognitiveLoad) ? 50 : Math.max(0, Math.min(100, cognitiveLoad));
  const validMemoryActivity = isNaN(memoryActivity) ? 50 : Math.max(0, Math.min(100, memoryActivity));
  const validFocusLevel = isNaN(focusLevel) ? 50 : Math.max(0, Math.min(100, focusLevel));
  
  // Generate neural network nodes
  const nodes = useMemo(() => {
    const nodeArray: Array<{ position: [number, number, number]; color: string; layer: number }> = [];
    const layers = [
      { count: 8, z: -4, color: '#4facfe', name: 'input' },
      { count: 12, z: -1, color: '#00f2fe', name: 'hidden1' },
      { count: 10, z: 2, color: '#ff006e', name: 'hidden2' },
      { count: 6, z: 5, color: '#8338ec', name: 'output' }
    ];

    layers.forEach((layer, layerIndex) => {
      for (let i = 0; i < layer.count; i++) {
        const angle = (i / layer.count) * Math.PI * 2;
        const radius = 2 + layerIndex * 0.3;
        
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = layer.z;

        // Validate positions to prevent NaN values
        const validX = isNaN(x) ? 0 : x;
        const validY = isNaN(y) ? 0 : y;
        const validZ = isNaN(z) ? 0 : z;

        nodeArray.push({
          position: [validX, validY, validZ] as [number, number, number],
          color: layer.color,
          layer: layerIndex
        });
      }
    });
    
    return nodeArray;
  }, []);

  useFrame((state) => {
    if (brainRef.current) {
      const time = state.clock.elapsedTime;
      const rotY = time * 0.2;
      const rotX = Math.sin(time * 0.5) * 0.1;

      // Ensure rotations are valid numbers
      brainRef.current.rotation.y = isNaN(rotY) ? 0 : rotY;
      brainRef.current.rotation.x = isNaN(rotX) ? 0 : rotX;
    }
  });

  return (
    <group ref={brainRef}>
      {/* Neural Nodes */}
      {nodes.map((node, index) => (
        <NeuralNode
          key={index}
          position={node.position}
          color={node.color}
          activity={(validCognitiveLoad + validMemoryActivity + validFocusLevel) / 300}
          pulseSpeed={1 + node.layer * 0.5}
        />
      ))}
      
      {/* Lightning Connections */}
      <LightningConnections 
        nodes={nodes} 
        activity={(validCognitiveLoad + validMemoryActivity + validFocusLevel) / 300} 
      />
      
      {/* Background Particles */}
      <NeuralParticles count={500} />
      
      {/* EEG Waves */}
      <EEGWaves focusLevel={validFocusLevel} />
      
      {/* Central Brain Core */}
      <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#ff006e"
          transparent
          opacity={0.3}
          distort={0.4}
          speed={2}
        />
      </Sphere>
    </group>
  );
}

export default function NeuralNetwork3D({ cognitiveLoad, memoryActivity, focusLevel }: NeuralNetwork3DProps) {
  // Validate props to prevent NaN values
  const validCognitiveLoad = isNaN(cognitiveLoad) ? 50 : Math.max(0, Math.min(100, cognitiveLoad));
  const validMemoryActivity = isNaN(memoryActivity) ? 50 : Math.max(0, Math.min(100, memoryActivity));
  const validFocusLevel = isNaN(focusLevel) ? 50 : Math.max(0, Math.min(100, focusLevel));
  return (
    <motion.div 
      className="neural-network-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className="neural-network-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="neural-title">Advanced Neural Network Visualization</h3>
        <div className="neural-stats">
          <motion.span 
            className="stat"
            whileHover={{ scale: 1.05 }}
            style={{ color: '#4facfe' }}
          >
            Cognitive Load: <strong>{validCognitiveLoad}%</strong>
          </motion.span>
          <motion.span 
            className="stat"
            whileHover={{ scale: 1.05 }}
            style={{ color: '#00f2fe' }}
          >
            Memory: <strong>{validMemoryActivity}%</strong>
          </motion.span>
          <motion.span 
            className="stat"
            whileHover={{ scale: 1.05 }}
            style={{ color: '#ff006e' }}
          >
            Focus: <strong>{validFocusLevel}%</strong>
          </motion.span>
        </div>
      </motion.div>
      
      <motion.div 
        className="neural-canvas"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
          fallback={
            <div className="canvas-fallback">
              <div className="fallback-content">
                <h4>🧠 Neural Visualization Loading...</h4>
                <p>Advanced 3D brain visualization requires WebGL support</p>
              </div>
            </div>
          }
          onError={(error) => {
            console.warn('Canvas error:', error);
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#4facfe" intensity={1} />
          <pointLight position={[-10, -10, 10]} color="#ff006e" intensity={1} />
          <pointLight position={[0, 10, -10]} color="#8338ec" intensity={0.8} />

          <AdvancedBrain
            cognitiveLoad={validCognitiveLoad}
            memoryActivity={validMemoryActivity}
            focusLevel={validFocusLevel}
          />

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </motion.div>
      
      <motion.div 
        className="neural-info"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p>
          Interactive 3D neural network with EEG-adaptive algorithms. 
          Lightning connections pulse based on cognitive activity. 
          Click and drag to explore the neural pathways.
        </p>
        
        <div className="neural-controls">
          <motion.div 
            className="control-indicator"
            whileHover={{ scale: 1.05 }}
          >
            <span className="control-icon">🖱️</span>
            <span>Drag to Rotate</span>
          </motion.div>
          <motion.div 
            className="control-indicator"
            whileHover={{ scale: 1.05 }}
          >
            <span className="control-icon">🔍</span>
            <span>Scroll to Zoom</span>
          </motion.div>
          <motion.div 
            className="control-indicator"
            whileHover={{ scale: 1.05 }}
          >
            <span className="control-icon">⚡</span>
            <span>Hover Nodes</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
