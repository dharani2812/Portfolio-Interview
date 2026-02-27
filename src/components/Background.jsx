import React from 'react';
import { motion } from 'framer-motion';
import './Background.css';

const Background = () => {
  return (
    <div className="background-container">
      {/* Subtle gradient blobs */}
      <div className="gradient-blob blob-1"></div>
      <div className="gradient-blob blob-2"></div>
      <div className="gradient-blob blob-3"></div>

      {/* SVG Noise Texture Overlay */}
      <svg className="noise-overlay" width="100%" height="100%">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Drifting Grid */}
      <motion.div
        className="grid-layer"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 0.5, 0],
          x: ["0px", "40px"],
          y: ["0px", "-40px"],
        }}
        transition={{
          scale: {
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotate: {
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          },
          x: {
            duration: 30,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          },
          y: {
            duration: 35,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }
        }}
      />

      {/* Light Sweep Effect */}
      <motion.div
        className="light-sweep"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%"],
          opacity: [0, 0.1, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "easeInOut"
        }}
        style={{
          background: 'linear-gradient(60deg, transparent 20%, rgba(99, 102, 241, 0.1) 50%, transparent 80%)',
          backgroundSize: '200% 100%',
        }}
      />

      {/* Vignette Overlay */}
      <div className="vignette" />
    </div>
  );
};

export default Background;
